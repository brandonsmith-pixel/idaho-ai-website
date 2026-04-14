import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(request: Request) {
  try {
    const { sessionId, areaCode } = await request.json();

    if (!sessionId || !areaCode) {
      return NextResponse.json(
        { error: 'Session ID and area code required' },
        { status: 400 }
      );
    }

    // Validate area code (3 digits)
    if (!/^\d{3}$/.test(areaCode)) {
      return NextResponse.json(
        { error: 'Invalid area code format' },
        { status: 400 }
      );
    }

    // Get customer info from Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customerEmail = session.customer_details?.email || session.customer_email;

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Customer email not found' },
        { status: 404 }
      );
    }

    // Get customer from database
    const { data: customer, error: fetchError } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('email', customerEmail)
      .single();

    if (fetchError || !customer) {
      return NextResponse.json(
        { error: 'Customer not found in database' },
        { status: 404 }
      );
    }

    // Check if phone already provisioned
    if (customer.phone_number) {
      return NextResponse.json({
        success: true,
        phoneNumber: customer.phone_number,
        message: 'Phone number already provisioned',
      });
    }

    // Provision Vapi phone number with area code
    let phoneNumber = null;
    try {
      const vapiResponse = await fetch('https://api.vapi.ai/phone-number', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'twilio',
          name: `${customer.business_name} - Main Line`,
          areaCode: areaCode,
        }),
      });

      if (vapiResponse.ok) {
        const vapiData = await vapiResponse.json();
        phoneNumber = vapiData.number;
        console.log('✅ Provisioned phone number:', phoneNumber, 'with area code:', areaCode);
      } else {
        const errorText = await vapiResponse.text();
        console.error('Vapi phone provisioning failed:', errorText);
        throw new Error('Failed to provision phone number from Vapi');
      }
    } catch (error) {
      console.error('Vapi API error:', error);
      throw error;
    }

    // Update customer with phone number
    const { error: updateError } = await supabaseAdmin
      .from('customers')
      .update({
        phone_number: phoneNumber,
        onboarding_status: 'phone_provisioned',
        updated_at: new Date().toISOString(),
      })
      .eq('id', customer.id);

    if (updateError) {
      console.error('Failed to update customer with phone number:', updateError);
      throw updateError;
    }

    console.log('✅ Customer updated with phone number');

    return NextResponse.json({
      success: true,
      phoneNumber,
      customerId: customer.id,
    });

  } catch (error: any) {
    console.error('Phone provisioning error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to provision phone number' },
      { status: 500 }
    );
  }
}
