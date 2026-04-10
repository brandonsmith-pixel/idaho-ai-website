import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'session_id required' },
        { status: 400 }
      );
    }

    // Fetch session from Stripe with expanded line items
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price'],
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Determine plan based on price ID
    const priceId = session.line_items?.data[0]?.price?.id;
    
    let plan: 'self-serve' | 'full-service' = 'self-serve';
    
    if (priceId === process.env.STRIPE_PRICE_FULL_SERVICE) {
      plan = 'full-service';
    } else if (priceId === process.env.STRIPE_PRICE_SELF_SERVE) {
      plan = 'self-serve';
    }

    return NextResponse.json({
      success: true,
      plan,
      customerEmail: session.customer_email,
      customerId: session.customer,
    });

  } catch (error: any) {
    console.error('Stripe session fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch session' },
      { status: 500 }
    );
  }
}
