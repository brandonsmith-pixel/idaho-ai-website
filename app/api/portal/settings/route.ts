import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    // TODO: Get actual customer ID from session/auth
    const customerId = 'demo-customer';

    const { data: settings, error } = await supabaseAdmin
      .from('receptionist_settings')
      .select('*')
      .eq('customer_id', customerId)
      .single();

    if (error) {
      // Return default settings if not found
      return NextResponse.json({
        success: true,
        settings: {
          greeting: 'Hi! Thanks for calling. How can I help you today?',
          tone: 'Friendly and professional',
          business_hours: '24/7',
          services: '',
          pricing: '',
          voice_id: 'EXAVITQu4vr4xnSDxMaL',
          voice_name: 'Sarah',
          call_forwarding_enabled: false,
          forward_to_number: null,
          calendar_connected: false,
        },
      });
    }

    return NextResponse.json({
      success: true,
      settings,
    });

  } catch (error: any) {
    console.error('Settings API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customerId = 'demo-customer'; // TODO: Get from session

    const { error } = await supabaseAdmin
      .from('receptionist_settings')
      .upsert({
        customer_id: customerId,
        ...body,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'customer_id',
      });

    if (error) {
      console.error('Failed to save settings:', error);
      return NextResponse.json(
        { error: 'Failed to save settings' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Settings save error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
