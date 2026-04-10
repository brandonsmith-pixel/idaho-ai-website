import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, businessDescription, businessHours, forwardNumber } = body;

    // TODO: Get actual customer ID from session/auth
    const customerId = 'demo-customer';

    // Update receptionist settings
    const { error } = await supabaseAdmin
      .from('receptionist_settings')
      .upsert({
        customer_id: customerId,
        greeting: `Hi, thanks for calling ${businessName}! How can I help you today?`,
        tone: 'Friendly and professional',
        business_hours: businessHours,
        services: businessDescription,
        forward_to_number: forwardNumber,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'customer_id',
      });

    if (error) {
      console.error('Failed to save business info:', error);
      return NextResponse.json(
        { error: 'Failed to save business info' },
        { status: 500 }
      );
    }

    // Also update customer business name
    const { error: customerError } = await supabaseAdmin
      .from('customers')
      .update({
        business_name: businessName,
      })
      .eq('id', customerId);

    if (customerError) {
      console.error('Failed to update customer:', customerError);
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Business info save error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
