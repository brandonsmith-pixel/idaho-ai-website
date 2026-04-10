import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, referrer } = body;

    // Get or create session ID
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('analytics_session')?.value;
    
    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    // Get UTM params and device info from headers
    const url = new URL(request.url);
    const utmSource = url.searchParams.get('utm_source');
    const utmMedium = url.searchParams.get('utm_medium');
    const utmCampaign = url.searchParams.get('utm_campaign');
    
    const userAgent = request.headers.get('user-agent') || '';
    const deviceType = /mobile/i.test(userAgent) ? 'mobile' : 'desktop';

    // Update or create visitor record
    const { error: visitorError } = await supabaseAdmin
      .from('visitors')
      .upsert({
        session_id: sessionId,
        last_seen_at: new Date().toISOString(),
        referrer: referrer || null,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        device_type: deviceType,
      }, {
        onConflict: 'session_id',
      });

    if (visitorError) {
      console.error('Failed to track visitor:', visitorError);
    }

    // Log pageview
    const { error: pageviewError } = await supabaseAdmin
      .from('pageviews')
      .insert({
        session_id: sessionId,
        path,
        referrer: referrer || null,
      });

    if (pageviewError) {
      console.error('Failed to track pageview:', pageviewError);
    }

    // Return session ID for client to store
    const response = NextResponse.json({ success: true, sessionId });
    response.cookies.set('analytics_session', sessionId, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return response;

  } catch (error: any) {
    console.error('Pageview tracking error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
