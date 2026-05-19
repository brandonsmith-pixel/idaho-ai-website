import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// Get customer's calendar connections
export async function GET(request: Request) {
  try {
    const supabase = createClient();
    
    // Get customer ID from session
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const customerId = sessionData.session.user.id;

    // Fetch calendar connections
    const { data: connections, error } = await supabase
      .from('calendar_connections')
      .select('id, integration_type, provider, calendar_name, nylas_email, calcom_username, is_active, connected_at')
      .eq('customer_id', customerId)
      .order('connected_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      throw new Error('Failed to fetch calendar connections');
    }

    return NextResponse.json({
      success: true,
      connections: connections || [],
    });

  } catch (error: any) {
    console.error('Fetch connections error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch connections' },
      { status: 500 }
    );
  }
}
