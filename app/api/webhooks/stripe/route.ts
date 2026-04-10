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

      // Create customer record
      const { error } = await supabaseAdmin
        .from('customers')
        .insert({
          stripe_customer_id: session.customer as string,
          email: session.customer_details?.email || '',
          business_name: session.metadata?.businessName || 'New Customer',
          plan: session.metadata?.plan || 'self-serve',
        });

      if (error) {
        console.error('Failed to create customer:', error);
      } else {
        console.log('✅ Customer created:', session.customer);
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
