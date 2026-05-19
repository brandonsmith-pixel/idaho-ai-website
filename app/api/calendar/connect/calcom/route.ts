import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// Connect Cal.com account
export async function POST(request: Request) {
  try {
    const { apiKey, username } = await request.json();
    
    if (!apiKey || !username) {
      return NextResponse.json(
        { error: 'API key and username are required' },
        { status: 400 }
      );
    }

    // Verify Cal.com API key by fetching user info
    const verifyResponse = await fetch('https://api.cal.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { error: 'Invalid Cal.com API key' },
        { status: 401 }
      );
    }

    const userData = await verifyResponse.json();
    const calcomUserId = userData.id;

    // Get customer ID from session
    const supabase = createClient();
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const customerId = sessionData.session.user.id;

    // Store in database (encrypt API key in production)
    const { error: dbError } = await supabase
      .from('calendar_connections')
      .upsert({
        customer_id: customerId,
        integration_type: 'calcom',
        calcom_user_id: calcomUserId,
        calcom_username: username,
        access_token: apiKey, // TODO: Encrypt in production
        calendar_name: `Cal.com (${username})`,
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

    console.log('✅ Cal.com connected successfully:', username);

    return NextResponse.json({ 
      success: true,
      message: 'Cal.com connected successfully',
      username,
    });

  } catch (error: any) {
    console.error('Cal.com connection error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to connect Cal.com' },
      { status: 500 }
    );
  }
}
