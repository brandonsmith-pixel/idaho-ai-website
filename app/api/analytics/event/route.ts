import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, properties } = body;

    const cookieStore = await cookies();
    const sessionId = cookieStore.get('analytics_session')?.value;

    if (!sessionId) {
      return NextResponse.json({ success: false, error: 'No session' }, { status: 400 });
    }

    // Track event
    const { error } = await supabaseAdmin
      .from('events')
      .insert({
        session_id: sessionId,
        event_name: event,
        properties: properties || {},
      });

    if (error) {
      console.error('Failed to track event:', error);
    }

    // If it's form progress, also update form_submissions
    if (event === 'form_progress') {
      const { step, data } = properties;

      await supabaseAdmin
        .from('form_submissions')
        .upsert({
          session_id: sessionId,
          step,
          form_data: data || {},
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'session_id',
        });
    }

    // If it's a demo start, mark demo_called
    if (event === 'demo_started') {
      await supabaseAdmin
        .from('form_submissions')
        .update({
          demo_called: true,
          completed: true,
        })
        .eq('session_id', sessionId);
    }

    // If it's a conversion, mark converted
    if (event === 'conversion') {
      await supabaseAdmin
        .from('form_submissions')
        .update({ converted: true })
        .eq('session_id', sessionId);

      await supabaseAdmin
        .from('visitors')
        .update({ converted: true })
        .eq('session_id', sessionId);
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Event tracking error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
