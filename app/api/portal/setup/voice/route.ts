import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { voiceId, voiceName, voiceProvider } = body;

    // TODO: Get actual customer ID from session/auth
    const customerId = 'demo-customer';

    // Update receptionist settings with voice
    const { error } = await supabaseAdmin
      .from('receptionist_settings')
      .update({
        voice_id: voiceId,
        voice_name: voiceName,
        updated_at: new Date().toISOString(),
      })
      .eq('customer_id', customerId);

    if (error) {
      console.error('Failed to save voice:', error);
      return NextResponse.json(
        { error: 'Failed to save voice' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Voice save error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
