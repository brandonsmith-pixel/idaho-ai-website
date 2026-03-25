import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, business, email, phone, message } = body;

    // Here you would typically:
    // 1. Send an email notification
    // 2. Save to a database
    // 3. Add to a CRM
    // For now, we'll just log it

    console.log('New contact form submission:', {
      name,
      business,
      email,
      phone,
      message,
      timestamp: new Date().toISOString()
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ll be in touch within 24 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}