import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    // Get conversion funnel data
    const { data: funnel, error: funnelError } = await supabaseAdmin
      .from('conversion_funnel')
      .select('*')
      .single();

    if (funnelError) {
      console.error('Failed to fetch funnel:', funnelError);
    }

    const analytics = {
      totalVisitors: funnel?.total_visitors || 0,
      startedForm: funnel?.started_form || 0,
      completedBusinessInfo: funnel?.completed_business_info || 0,
      demoCalls: funnel?.demo_calls || 0,
      conversions: funnel?.conversions || 0,
      conversionRate: funnel?.total_visitors 
        ? (funnel.conversions / funnel.total_visitors) * 100 
        : 0,
    };

    return NextResponse.json({
      success: true,
      analytics,
    });

  } catch (error: any) {
    console.error('Admin analytics API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
