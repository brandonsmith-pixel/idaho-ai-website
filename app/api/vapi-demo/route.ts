import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('Received vapi-demo request:', JSON.stringify(body, null, 2));

    const vapiKey = process.env.VAPI_PRIVATE_KEY?.trim();
    const phoneNumberId = process.env.VAPI_PHONE_NUMBER_ID?.trim();

    console.log('Environment check:', {
      hasVapiKey: !!vapiKey,
      vapiKeyLength: vapiKey?.length,
      hasPhoneNumberId: !!phoneNumberId,
      phoneNumberIdValue: phoneNumberId,
      phoneNumberIdLength: phoneNumberId?.length,
    });

    if (!vapiKey || !phoneNumberId) {
      console.error('Missing credentials:', { vapiKey: !!vapiKey, phoneNumberId: !!phoneNumberId });
      throw new Error('Vapi credentials not configured');
    }

    // Extract data with defaults
    const businessName = body.businessName || 'Demo Business';
    const businessPhone = body.businessPhone || '';
    const testPhone = body.testPhone || body.phone;
    const industry = body.industry || 'business';
    const website = body.website || '';
    const address = body.address || '';
    const hours = body.hours || '';
    const services = body.services || '';
    const pricing = body.pricing || '';
    const bookingProcess = body.bookingProcess || '';
    const faqs = body.faqs || '';
    const additionalInfo = body.additionalInfo || '';
    const voiceProvider = body.voiceProvider || '11labs';
    const voiceId = body.voiceId || 'EXAVITQu4vr4xnSDxMaL';

    // Validate and format phone number to E.164
    if (!testPhone) {
      throw new Error('testPhone is required');
    }

    // Ensure E.164 format: +1XXXXXXXXXX
    let formattedPhone = testPhone.toString().replace(/[^\d+]/g, '');
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+1' + formattedPhone.replace(/^\+?1?/, '');
    }

    console.log('Formatted phone:', formattedPhone);

    // Build custom context for the assistant
    const customPrompt = `You are the AI receptionist for ${businessName}, a ${industry} business.${website ? ` Website: ${website}.` : ''}${faqs ? `\n\nCOMMON QUESTIONS:\n${faqs}` : ''}\n\nBe brief, professional, and helpful. If asked something you don't know, say you'll have someone follow up.`;

    const firstMessage = `Hi! This is the AI receptionist demo for ${businessName}. Ask me anything!`;

    // Use pre-existing assistant for INSTANT calls
    const callPayload = {
      phoneNumberId: phoneNumberId,
      customer: {
        number: formattedPhone,
      },
      assistantId: 'fb6a783d-3cbc-4763-b71a-d22d3a18d49f', // Pre-created fast template
      assistantOverrides: {
        firstMessage: firstMessage,
        model: {
          systemPrompt: customPrompt,
        },
        voice: {
          provider: voiceProvider,
          voiceId: voiceId,
        },
      },
    };

    console.log('Calling Vapi with:', JSON.stringify(callPayload, null, 2));

    const callResponse = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(callPayload),
    });

    const responseText = await callResponse.text();
    console.log('Vapi response:', callResponse.status, responseText);

    if (!callResponse.ok) {
      throw new Error(`Vapi API error (${callResponse.status}): ${responseText}`);
    }

    const call = JSON.parse(responseText);
    console.log('✅ Demo call initiated:', call.id);

    return NextResponse.json({
      success: true,
      callId: call.id,
      status: call.status,
      message: 'Demo call initiated! You should receive a call shortly.',
    });

  } catch (error: any) {
    console.error('Vapi demo error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to initiate demo call',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
