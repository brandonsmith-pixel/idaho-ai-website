import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * Called by Stripe webhook after checkout.session.completed
 * Provisions:
 * 1. Vapi phone number
 * 2. Customer account in Supabase
 * 3. Magic link email for login
 */
export async function POST(request: Request) {
  try {
    const { customerEmail, stripeCustomerId, businessName, plan, sessionId } = await request.json();

    console.log('Provisioning account for:', customerEmail);

    // 1. Provision Vapi phone number
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
          name: `${businessName} - Main Line`,
        }),
      });

      if (vapiResponse.ok) {
        const vapiData = await vapiResponse.json();
        phoneNumber = vapiData.number;
        console.log('✅ Provisioned phone number:', phoneNumber);
      } else {
        console.error('Vapi phone provisioning failed:', await vapiResponse.text());
      }
    } catch (error) {
      console.error('Vapi API error:', error);
    }

    // 2. Create/update customer in Supabase with phone number
    const { data: customer, error: customerError } = await supabaseAdmin
      .from('customers')
      .upsert({
        stripe_customer_id: stripeCustomerId,
        email: customerEmail,
        business_name: businessName,
        plan: plan,
        phone_number: phoneNumber,
        onboarding_status: plan === 'self-serve' ? 'phone_provisioned' : 'awaiting_onboarding_call',
        active: true,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (customerError) {
      console.error('Failed to create customer:', customerError);
      throw customerError;
    }

    console.log('✅ Customer record created:', customer.id);

    // 3. Send magic link email for login (using Supabase Auth)
    const { error: authError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: customerEmail,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/portal`,
      },
    });

    if (authError) {
      console.error('Failed to send magic link:', authError);
    } else {
      console.log('✅ Magic link sent to:', customerEmail);
    }

    return NextResponse.json({
      success: true,
      customerId: customer.id,
      phoneNumber,
      message: 'Account provisioned successfully',
    });

  } catch (error: any) {
    console.error('Account provisioning error:', error);
    return NextResponse.json(
      { error: error.message || 'Provisioning failed' },
      { status: 500 }
    );
  }
}
