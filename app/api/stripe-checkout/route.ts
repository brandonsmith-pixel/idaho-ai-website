import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { priceId, customerEmail, customerName } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      metadata: {
        customerName: customerName || '',
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tetongroup.ai'}/ai-receptionist/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tetongroup.ai'}/ai-receptionist?canceled=true`,
      allow_promotion_codes: true,
    });

    console.log('✅ Stripe checkout session created:', session.id);

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url,
    });

  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
