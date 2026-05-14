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

    // Skip website scraping for instant demo calls
    // Website content slows down the call by 2-3 minutes
    let websiteContent = '';
    if (website) {
      websiteContent = `Website: ${website} (Visit their website for full details)`;
    }

    // Build system prompt
    const systemPrompt = `You are the AI receptionist for ${businessName}.

BUSINESS DETAILS:
- Business Name: ${businessName}
${businessPhone ? `- Phone: ${businessPhone}` : ''}
- Industry: ${industry}
${website ? `- Website: ${website}` : ''}
${address ? `- Address: ${address}` : ''}
${hours ? `- Hours: ${hours}` : ''}

${websiteContent ? `WEBSITE CONTENT:\n${websiteContent}\n` : ''}

${services ? `SERVICES WE OFFER:\n${services}\n` : ''}
${pricing ? `PRICING:\n${pricing}\n` : ''}
${bookingProcess ? `BOOKING/SCHEDULING:\n${bookingProcess}\n` : ''}
${faqs ? `COMMON QUESTIONS:\n${faqs}\n` : ''}
${additionalInfo ? `ADDITIONAL INFO:\n${additionalInfo}\n` : ''}

YOUR ROLE:
You are demonstrating what ${businessName}'s AI receptionist will sound like to their customers. Be professional, friendly, and helpful. Answer questions based on the information provided above. If asked something you don't know, politely say you'll have someone follow up with more details.

This is a DEMO CALL to show how the AI receptionist works. Be natural and conversational.`;

    const firstMessage = `Hi! This is the AI receptionist demo for ${businessName}. Go ahead and ask me questions like you're a customer calling the business!`;

    // Make the Vapi call
    const callPayload = {
      phoneNumberId: phoneNumberId,
      customer: {
        number: formattedPhone,
      },
      assistant: {
        name: `Demo: ${businessName}`,
        model: {
          provider: 'openai',
          model: 'gpt-4o-mini', // Faster and cheaper than GPT-4
          temperature: 0.7,
          maxTokens: 150, // Keep responses short
          systemPrompt: systemPrompt,
        },
        voice: {
          provider: voiceProvider,
          voiceId: voiceId,
        },
        firstMessage: firstMessage,
        endCallFunctionEnabled: false,
        serverUrl: 'https://tetongroup.ai/api/webhooks/vapi',
        maxDurationSeconds: 300, // Hard 5-minute cutoff for free demos
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
