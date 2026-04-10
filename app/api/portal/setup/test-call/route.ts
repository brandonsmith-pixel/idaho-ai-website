import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number required' },
        { status: 400 }
      );
    }

    // TODO: Get actual customer ID from session/auth
    const customerId = 'demo-customer';

    // Get customer settings
    const { data: settings } = await supabaseAdmin
      .from('receptionist_settings')
      .select('*')
      .eq('customer_id', customerId)
      .single();

    const { data: customer } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .single();

    if (!settings || !customer) {
      return NextResponse.json(
        { error: 'Customer settings not found' },
        { status: 404 }
      );
    }

    // Format phone number
    let formattedPhone = phoneNumber.replace(/[^\d+]/g, '');
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+1' + formattedPhone.replace(/^\+?1?/, '');
    }

    // Trigger Vapi outbound call
    const vapiKey = process.env.VAPI_PRIVATE_KEY;
    const phoneNumberId = process.env.VAPI_PHONE_NUMBER_ID;

    const systemPrompt = `You are the AI receptionist for ${customer.business_name}.

BUSINESS INFO:
${settings.services || 'No additional info provided'}

YOUR ROLE:
This is a TEST CALL to demonstrate how you work. Greet the customer warmly and ask how you can help them. Answer any questions they have about ${customer.business_name}. Be friendly and professional.`;

    const response = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumberId: phoneNumberId,
        customer: {
          number: formattedPhone,
        },
        assistant: {
          name: `Test: ${customer.business_name}`,
          model: {
            provider: 'openai',
            model: 'gpt-4',
            temperature: 0.7,
            systemPrompt: systemPrompt,
          },
          voice: {
            provider: settings.voice_provider || '11labs',
            voiceId: settings.voice_id || 'EXAVITQu4vr4xnSDxMaL',
          },
          firstMessage: settings.greeting || `Hi, this is a test call from ${customer.business_name}'s AI receptionist. How can I help you?`,
          endCallMessage: 'Thanks for testing! If you have any questions, contact support.',
          maxDurationSeconds: 300,
        },
      }),
    });

    if (!response.ok) {
      console.error('Vapi call failed:', await response.text());
      return NextResponse.json(
        { error: 'Failed to initiate test call' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Test call error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
