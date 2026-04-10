import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // TODO: Get actual customer ID from session/auth
    const customerId = 'demo-customer';

    // Mark setup as completed
    const { error } = await supabaseAdmin
      .from('customers')
      .update({
        setup_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', customerId);

    if (error) {
      console.error('Failed to mark setup complete:', error);
      return NextResponse.json(
        { error: 'Failed to complete setup' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Complete setup error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
