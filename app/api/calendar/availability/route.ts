import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// Check calendar availability
export async function POST(request: Request) {
  try {
    const { customerId, startDate, endDate } = await request.json();
    
    if (!customerId || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'customerId, startDate, and endDate are required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Get active calendar connection
    const { data: connection, error: connError } = await supabase
      .from('calendar_connections')
      .select('*')
      .eq('customer_id', customerId)
      .eq('is_active', true)
      .single();

    if (connError || !connection) {
      return NextResponse.json(
        { error: 'No active calendar connection found' },
        { status: 404 }
      );
    }

    let freeBusyData: any[] = [];

    // Fetch availability based on integration type
    if (connection.integration_type === 'nylas') {
      const nylasApiKey = process.env.NYLAS_API_KEY;
      
      if (!nylasApiKey) {
        throw new Error('Nylas API key not configured');
      }

      // Get free/busy information
      const freeBusyResponse = await fetch(
        `https://api.us.nylas.com/v3/grants/${connection.nylas_grant_id}/calendar/free-busy`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${nylasApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            start_time: Math.floor(new Date(startDate).getTime() / 1000),
            end_time: Math.floor(new Date(endDate).getTime() / 1000),
            emails: [connection.nylas_email],
          }),
        }
      );

      if (freeBusyResponse.ok) {
        const data = await freeBusyResponse.json();
        freeBusyData = data[0]?.time_slots || [];
      }

    } else if (connection.integration_type === 'calcom') {
      // Cal.com uses bookings API to check availability
      const calcomResponse = await fetch(
        `https://api.cal.com/v1/availability?username=${connection.calcom_username}&dateFrom=${startDate}&dateTo=${endDate}`,
        {
          headers: {
            'Authorization': `Bearer ${connection.access_token}`,
          },
        }
      );

      if (calcomResponse.ok) {
        const data = await calcomResponse.json();
        freeBusyData = data.busy || [];
      }
    }

    // Also get existing appointments from our database
    const { data: appointments } = await supabase
      .from('appointments')
      .select('start_time, end_time')
      .eq('customer_id', customerId)
      .eq('status', 'scheduled')
      .gte('start_time', startDate)
      .lte('end_time', endDate);

    return NextResponse.json({
      success: true,
      integration: connection.integration_type,
      busySlots: freeBusyData,
      appointments: appointments || [],
    });

  } catch (error: any) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check availability' },
      { status: 500 }
    );
  }
}
