import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// Handle Nylas OAuth callback
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(
        new URL('/portal?calendar_error=oauth_failed', request.url)
      );
    }

    if (!code || !state) {
      throw new Error('Missing code or state parameter');
    }

    const { customerId, provider } = JSON.parse(state);

    // Exchange code for access token
    const nylasClientId = process.env.NYLAS_CLIENT_ID;
    const nylasClientSecret = process.env.NYLAS_CLIENT_SECRET;
    const nylasApiKey = process.env.NYLAS_API_KEY;
    const redirectUri = process.env.NODE_ENV === 'production'
      ? 'https://tetongroup.ai/api/calendar/callback/nylas'
      : 'http://localhost:3000/api/calendar/callback/nylas';

    if (!nylasClientId || !nylasClientSecret || !nylasApiKey) {
      throw new Error('Nylas credentials not configured');
    }

    // Exchange authorization code for grant
    const tokenResponse = await fetch('https://api.us.nylas.com/v3/connect/token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${nylasApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: nylasClientId,
        client_secret: nylasClientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', tokenResponse.status, errorText);
      throw new Error(`Token exchange failed: ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    const { grant_id, email, access_token } = tokenData;

    console.log('Nylas grant obtained:', { grant_id, email, provider });

    // Get calendar list to find primary calendar
    const calendarsResponse = await fetch(
      `https://api.us.nylas.com/v3/grants/${grant_id}/calendars`,
      {
        headers: {
          'Authorization': `Bearer ${nylasApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let primaryCalendarId = null;
    let calendarName = null;

    if (calendarsResponse.ok) {
      const calendarsData = await calendarsResponse.json();
      const primaryCal = calendarsData.data?.find((cal: any) => cal.is_primary) || calendarsData.data?.[0];
      primaryCalendarId = primaryCal?.id;
      calendarName = primaryCal?.name || `${provider} Calendar`;
    }

    // Store in database
    const supabase = createClient();
    
    const { error: dbError } = await supabase
      .from('calendar_connections')
      .upsert({
        customer_id: customerId,
        integration_type: 'nylas',
        nylas_grant_id: grant_id,
        nylas_email: email,
        provider,
        access_token, // TODO: Encrypt in production
        primary_calendar_id: primaryCalendarId,
        calendar_name: calendarName,
        is_active: true,
        connected_at: new Date().toISOString(),
        last_sync_at: new Date().toISOString(),
      }, {
        onConflict: 'customer_id,integration_type',
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save calendar connection');
    }

    console.log('✅ Calendar connected successfully');

    // Redirect back to portal with success message
    return NextResponse.redirect(
      new URL('/portal?calendar_connected=true&tab=calendar', request.url)
    );

  } catch (error: any) {
    console.error('Nylas callback error:', error);
    return NextResponse.redirect(
      new URL(`/portal?calendar_error=${encodeURIComponent(error.message)}`, request.url)
    );
  }
}
