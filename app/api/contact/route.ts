import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, voiceProvider, voiceId, voiceName } = body;

    // Log for debugging
    console.log('New contact form submission:', {
      name,
      email,
      phone,
      timestamp: new Date().toISOString()
    });

    // Parse the message to extract structured data
    const data = parseContactMessage(message, name, phone, email);

    // Try to save to Google Sheets via Apps Script web app
    const sheetWebAppUrl = process.env.GOOGLE_SHEET_WEB_APP_URL;
    
    if (sheetWebAppUrl) {
      try {
        const response = await fetch(sheetWebAppUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log('✅ Successfully saved to Google Sheets');
        } else {
          console.error('Google Sheets error:', await response.text());
        }
      } catch (sheetError) {
        console.error('Failed to save to Google Sheets:', sheetError);
        // Don't fail the request if sheets fails
      }
    } else {
      console.warn('⚠️ GOOGLE_SHEET_WEB_APP_URL not configured - skipping sheet save');
    }

    // Trigger Vapi demo call
    try {
      const vapiResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://tetongroup.ai'}/api/vapi-demo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          voiceProvider: voiceProvider || 'openai',
          voiceId: voiceId || 'nova',
        }),
      });

      if (vapiResponse.ok) {
        const vapiResult = await vapiResponse.json();
        console.log('✅ Vapi demo call initiated:', vapiResult.callId);
      } else {
        console.error('Failed to initiate Vapi call:', await vapiResponse.text());
      }
    } catch (vapiError) {
      console.error('Vapi call error:', vapiError);
      // Don't fail the request if Vapi fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ll be in touch shortly to schedule your demo call.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// Parse the contact message into structured data
function parseContactMessage(message: string, name: string, phone: string, email: string) {
  const lines = message.split('\n');
  
  const extract = (label: string): string => {
    const line = lines.find(l => l.includes(label));
    if (!line) return '';
    return line.split(':').slice(1).join(':').trim();
  };

  const extractSection = (startLabel: string, endLabel?: string): string => {
    const startIdx = lines.findIndex(l => l.includes(startLabel));
    if (startIdx === -1) return '';
    
    const endIdx = endLabel 
      ? lines.findIndex((l, i) => i > startIdx && l.includes(endLabel))
      : lines.length;
    
    return lines
      .slice(startIdx + 1, endIdx === -1 ? lines.length : endIdx)
      .filter(l => l.trim())
      .join('\n')
      .trim();
  };

  return {
    businessName: extract('Name:') || name,
    businessPhone: extract('Phone:') || phone,
    testPhone: extract('Call') || phone,
    industry: extract('Industry:'),
    website: extract('Website:'),
    address: extract('Address:'),
    hours: extract('Hours:'),
    services: extractSection('SERVICES & OFFERINGS:', 'PRICING INFO:'),
    pricing: extractSection('PRICING INFO:', 'BOOKING/APPOINTMENT PROCESS:'),
    bookingProcess: extractSection('BOOKING/APPOINTMENT PROCESS:', 'KNOWLEDGE BASE:'),
    faqs: extractSection('KNOWLEDGE BASE:', 'ADDITIONAL CONTEXT:'),
    additionalInfo: extractSection('ADDITIONAL CONTEXT:', 'FILES TO REVIEW:'),
    files: extractSection('FILES TO REVIEW:', 'DEMO CALL:'),
  };
}
