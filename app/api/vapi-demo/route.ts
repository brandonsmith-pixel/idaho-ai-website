import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      businessName,
      businessPhone,
      testPhone,
      industry,
      website,
      address,
      hours,
      services,
      pricing,
      bookingProcess,
      faqs,
      additionalInfo,
    } = body;

    const vapiKey = process.env.VAPI_PRIVATE_KEY;
    const phoneNumberId = process.env.VAPI_PHONE_NUMBER_ID;

    if (!vapiKey || !phoneNumberId) {
      throw new Error('Vapi credentials not configured');
    }

    // Build comprehensive system prompt with all business info
    const systemPrompt = `You are the AI receptionist for ${businessName}.

BUSINESS DETAILS:
- Business Name: ${businessName}
- Phone: ${businessPhone}
- Industry: ${industry}
${website ? `- Website: ${website}` : ''}
${address ? `- Address: ${address}` : ''}
${hours ? `- Hours: ${hours}` : ''}

${services ? `SERVICES WE OFFER:\n${services}\n` : ''}
${pricing ? `PRICING:\n${pricing}\n` : ''}
${bookingProcess ? `BOOKING/SCHEDULING:\n${bookingProcess}\n` : ''}
${faqs ? `COMMON QUESTIONS:\n${faqs}\n` : ''}
${additionalInfo ? `ADDITIONAL INFO:\n${additionalInfo}\n` : ''}

YOUR ROLE:
You are demonstrating what ${businessName}'s AI receptionist will sound like to their customers. Be professional, friendly, and helpful. Answer questions based on the information provided above. If asked something you don't know, politely say you'll have someone follow up.

This is a DEMO CALL to show how the AI receptionist works. Be natural and conversational.`;

    // First message for the demo call
    const firstMessage = `Hi! Thanks for trying out the AI receptionist demo for ${businessName}. I'm an AI assistant that can answer questions about the business. Go ahead and ask me anything you'd like to know - like hours, services, pricing, or how to book an appointment!`;

    // Create Vapi assistant
    const assistantResponse = await fetch('https://api.vapi.ai/assistant', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `Demo: ${businessName}`,
        model: {
          provider: 'openai',
          model: 'gpt-4',
          temperature: 0.7,
          systemPrompt,
        },
        voice: {
          provider: 'openai',
          voiceId: 'nova', // Professional, friendly female voice
        },
        firstMessage,
        endCallFunctionEnabled: false,
        recordingEnabled: false,
      }),
    });

    if (!assistantResponse.ok) {
      const error = await assistantResponse.text();
      console.error('Failed to create assistant:', error);
      throw new Error('Failed to create Vapi assistant');
    }

    const assistant = await assistantResponse.json();
    console.log('✅ Created assistant:', assistant.id);

    // Trigger outbound call
    const callResponse = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId: assistant.id,
        phoneNumberId: phoneNumberId,
        customer: {
          number: testPhone,
        },
      }),
    });

    if (!callResponse.ok) {
      const error = await callResponse.text();
      console.error('Failed to initiate call:', error);
      throw new Error('Failed to initiate demo call');
    }

    const call = await callResponse.json();
    console.log('✅ Initiated demo call:', call.id);

    return NextResponse.json({
      success: true,
      callId: call.id,
      assistantId: assistant.id,
      message: 'Demo call initiated! You should receive a call shortly.',
    });

  } catch (error: any) {
    console.error('Vapi demo error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to initiate demo call' 
      },
      { status: 500 }
    );
  }
}
