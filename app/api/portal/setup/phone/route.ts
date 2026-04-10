import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // TODO: Get actual customer ID from session/auth
    const customerId = 'demo-customer';

    // Call Vapi to provision phone number
    const vapiKey = process.env.VAPI_PRIVATE_KEY;
    
    const response = await fetch('https://api.vapi.ai/phone-number', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: 'twilio',
        // Let Vapi choose an available number
      }),
    });

    if (!response.ok) {
      console.error('Vapi phone provision failed:', await response.text());
      return NextResponse.json(
        { error: 'Failed to provision phone number' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const phoneNumber = data.number;
    const phoneNumberId = data.id;

    // Store in database
    const { error } = await supabaseAdmin
      .from('customers')
      .update({
        phone_number: phoneNumber,
        vapi_phone_id: phoneNumberId,
      })
      .eq('id', customerId);

    if (error) {
      console.error('Failed to save phone number:', error);
      return NextResponse.json(
        { error: 'Failed to save phone number' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      phoneNumber,
      phoneNumberId,
    });

  } catch (error: any) {
    console.error('Phone provisioning error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
