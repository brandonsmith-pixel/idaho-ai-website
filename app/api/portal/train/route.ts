import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { businessHours, services, faqs, bookingUrl, specialInstructions } = await request.json();

    // Get authenticated user
    const cookieStore = await cookies();
    const authToken = cookieStore.get('sb-access-token');

    if (!authToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(authToken.value);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Get customer
    const { data: customer } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('email', user.email)
      .single();

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Update customer training data
    const { error: updateError } = await supabaseAdmin
      .from('customers')
      .update({
        training_data: {
          businessHours,
          services,
          faqs,
          bookingUrl,
          specialInstructions,
          updated_at: new Date().toISOString(),
        },
      })
      .eq('id', customer.id);

    if (updateError) {
      console.error('Training update error:', updateError);
      return NextResponse.json({ error: 'Failed to save training data' }, { status: 500 });
    }

    // TODO: Update Vapi assistant with new training data
    // This would involve calling Vapi API to update the assistant's system prompt

    console.log('✅ Training data saved for customer:', customer.id);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Training API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
