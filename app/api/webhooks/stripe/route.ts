import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-03-25.dahlia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('Stripe webhook received:', event.type);

    // Handle subscription created/updated
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Determine plan from price ID
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const priceId = lineItems.data[0]?.price?.id;
      const plan = priceId === 'price_1TKhlTLCkw1qIwMpIUHImoHB' ? 'full-service' : 'self-serve';

      // Call internal provisioning endpoint
      try {
        const provisionResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/stripe/provision-account`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerEmail: session.customer_details?.email || session.customer_email,
            stripeCustomerId: session.customer as string,
            businessName: session.metadata?.businessName || 'New Customer',
            plan,
            sessionId: session.id,
          }),
        });

        if (provisionResponse.ok) {
          const result = await provisionResponse.json();
          console.log('✅ Account provisioned:', result);
        } else {
          console.error('Provisioning failed:', await provisionResponse.text());
        }
      } catch (error) {
        console.error('Failed to call provisioning endpoint:', error);
      }
    }

    // Handle subscription cancelled
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;

      // Mark customer as inactive (or delete)
      const { error } = await supabaseAdmin
        .from('customers')
        .update({ 
          active: false,
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_customer_id', subscription.customer as string);

      if (error) {
        console.error('Failed to deactivate customer:', error);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
