import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, phoneNumberId, voiceId, voiceProvider } = body;

    // Get customer and their settings
    const { data: customer } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('id', customerId || 'demo-customer')
      .single();

    const { data: settings } = await supabaseAdmin
      .from('receptionist_settings')
      .select('*')
      .eq('customer_id', customerId || 'demo-customer')
      .single();

    if (!customer || !settings) {
      throw new Error('Customer or settings not found');
    }

    // Build AI assistant system prompt with training data
    const systemPrompt = `You are the AI receptionist for ${customer.business_name}.

BUSINESS INFORMATION:
- Business Hours: ${settings.business_hours}
- Services: ${settings.services}

YOUR RESPONSIBILITIES:
1. Answer questions about the business professionally and helpfully
2. Book appointments and add them to the calendar
3. For complex issues or specific requests, transfer the call to: ${settings.forward_to_number}

CALL FORWARDING RULES:
- If the caller needs to speak with a specific person, transfer the call
- If the issue is urgent or complex, transfer the call
- If they explicitly ask to speak to someone, transfer the call
- Otherwise, handle the inquiry yourself

${settings.custom_knowledge ? `ADDITIONAL KNOWLEDGE:\n${settings.custom_knowledge}` : ''}

Be friendly, professional, and efficient. Always confirm appointments and provide clear next steps.`;

    // Create Vapi Assistant
    const assistantPayload = {
      name: `${customer.business_name} - AI Receptionist`,
      model: {
        provider: 'openai',
        model: 'gpt-4',
        temperature: 0.7,
        messages: [{
          role: 'system',
          content: systemPrompt,
        }],
        functions: [
          {
            name: 'bookAppointment',
            description: 'Books an appointment for the caller',
            parameters: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'Customer name' },
                phone: { type: 'string', description: 'Customer phone' },
                email: { type: 'string', description: 'Customer email' },
                date: { type: 'string', description: 'Appointment date (YYYY-MM-DD)' },
                time: { type: 'string', description: 'Appointment time (HH:MM)' },
                service: { type: 'string', description: 'Service requested' },
              },
              required: ['name', 'phone', 'date', 'time'],
            },
          },
          {
            name: 'transferCall',
            description: 'Transfers the call to a human',
            parameters: {
              type: 'object',
              properties: {
                reason: { type: 'string', description: 'Why the call is being transferred' },
              },
              required: ['reason'],
            },
          },
        ],
      },
      voice: {
        provider: voiceProvider || '11labs',
        voiceId: voiceId || 'EXAVITQu4vr4xnSDxMaL',
      },
      firstMessage: settings.greeting || `Hi, thanks for calling ${customer.business_name}! How can I help you today?`,
      serverUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/vapi`,
      endCallFunctionEnabled: false,
    };

    // Create assistant in Vapi
    const vapiKey = process.env.VAPI_PRIVATE_KEY;
    const assistantResponse = await fetch('https://api.vapi.ai/assistant', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assistantPayload),
    });

    if (!assistantResponse.ok) {
      throw new Error(`Vapi assistant creation failed: ${await assistantResponse.text()}`);
    }

    const assistant = await assistantResponse.json();
    console.log('✅ Created Vapi assistant:', assistant.id);

    // Link assistant to phone number
    if (phoneNumberId) {
      const linkResponse = await fetch(`https://api.vapi.ai/phone-number/${phoneNumberId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${vapiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantId: assistant.id,
        }),
      });

      if (!linkResponse.ok) {
        console.error('Failed to link assistant to phone:', await linkResponse.text());
      } else {
        console.log('✅ Linked assistant to phone number');
      }
    }

    // Save assistant ID to database
    await supabaseAdmin
      .from('customers')
      .update({
        vapi_assistant_id: assistant.id,
        setup_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', customerId || 'demo-customer');

    return NextResponse.json({ 
      success: true,
      assistantId: assistant.id,
    });

  } catch (error: any) {
    console.error('Complete setup error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
