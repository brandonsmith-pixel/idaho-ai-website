import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customer_id');
    const days = searchParams.get('days') || '30';

    if (!customerId) {
      return NextResponse.json(
        { error: 'customer_id is required' },
        { status: 400 }
      );
    }

    // Calculate date filter
    let dateFilter: Date | null = null;
    if (days !== 'all') {
      dateFilter = new Date();
      dateFilter.setDate(dateFilter.getDate() - parseInt(days));
    }

    // Build query
    let query = supabaseAdmin
      .from('calls')
      .select('*')
      .eq('customer_id', customerId)
      .eq('status', 'completed')
      .order('started_at', { ascending: false });

    if (dateFilter) {
      query = query.gte('started_at', dateFilter.toISOString());
    }

    const { data: calls, error } = await query;

    if (error) {
      console.error('Failed to fetch calls:', error);
      return NextResponse.json(
        { error: 'Failed to fetch calls' },
        { status: 500 }
      );
    }

    // Calculate stats
    const stats = {
      total_calls: calls?.length || 0,
      total_minutes: calls?.reduce((sum, call) => sum + (call.duration_minutes || 0), 0) || 0,
      total_cost: calls?.reduce((sum, call) => sum + (call.cost || 0), 0) || 0,
    };

    return NextResponse.json({
      success: true,
      calls: calls || [],
      stats,
    });

  } catch (error: any) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
