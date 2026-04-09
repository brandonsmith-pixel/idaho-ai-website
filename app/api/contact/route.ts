import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Log for debugging
    console.log('New contact form submission:', {
      name,
      email,
      phone,
      timestamp: new Date().toISOString()
    });

    // Try to write to Google Sheets
    try {
      const sheetsClient = await getGoogleSheetsClient();
      const sheetId = process.env.GOOGLE_SHEET_ID;

      if (!sheetId) {
        console.error('GOOGLE_SHEET_ID not configured');
      } else {
        // Parse the message to extract structured data
        const data = parseContactMessage(message, name, phone, email);
        
        // Append row to sheet
        await sheetsClient.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: 'Sheet1!A:N',
          valueInputOption: 'RAW',
          requestBody: {
            values: [[
              new Date().toISOString(),
              data.businessName,
              data.businessPhone,
              data.testPhone,
              data.industry,
              data.website,
              data.address,
              data.hours,
              data.services,
              data.pricing,
              data.bookingProcess,
              data.faqs,
              data.additionalInfo,
              data.files,
            ]],
          },
        });

        console.log('✅ Successfully saved to Google Sheets');
      }
    } catch (sheetError) {
      console.error('Google Sheets error (continuing anyway):', sheetError);
      // Don't fail the request if sheets fails
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

// Initialize Google Sheets client
async function getGoogleSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!email || !key) {
    throw new Error('Google credentials not configured');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
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
