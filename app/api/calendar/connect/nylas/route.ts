import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// Initiate Nylas OAuth flow
export async function POST(request: Request) {
  try {
    const { provider } = await request.json(); // 'google' or 'microsoft'
    
    if (!provider || !['google', 'microsoft'].includes(provider)) {
      return NextResponse.json(
        { error: 'Invalid provider. Must be "google" or "microsoft"' },
        { status: 400 }
      );
    }

    const nylasClientId = process.env.NYLAS_CLIENT_ID;
    const redirectUri = process.env.NODE_ENV === 'production'
      ? 'https://tetongroup.ai/api/calendar/callback/nylas'
      : 'http://localhost:3000/api/calendar/callback/nylas';

    if (!nylasClientId) {
      throw new Error('Nylas credentials not configured');
    }

    // Get customer ID from session/auth
    // TODO: Add proper auth middleware
    const supabase = createClient();
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Build Nylas OAuth URL
    const authUrl = new URL('https://api.us.nylas.com/v3/connect/auth');
    authUrl.searchParams.set('client_id', nylasClientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('provider', provider);
    authUrl.searchParams.set('access_type', 'offline'); // Get refresh token
    authUrl.searchParams.set('state', JSON.stringify({
      customerId: sessionData.session.user.id,
      provider,
    }));

    // Request calendar scopes
    const scopes = [
      'calendar.read_only',
      'calendar.free_busy',
      'calendar.events',
    ].join(',');
    authUrl.searchParams.set('scope', scopes);

    return NextResponse.json({ authUrl: authUrl.toString() });

  } catch (error: any) {
    console.error('Nylas OAuth init error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initiate OAuth' },
      { status: 500 }
    );
  }
}
