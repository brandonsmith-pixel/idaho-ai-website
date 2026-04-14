import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request) {
  try {
    const { event, visitorId, sessionId, properties } = await request.json();

    // Insert event into Supabase
    const { data, error } = await supabase
      .from('events')
      .insert({
        event_name: event,
        visitor_id: visitorId,
        event_data: {
          ...properties,
          session_id: sessionId
        },
      });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}
