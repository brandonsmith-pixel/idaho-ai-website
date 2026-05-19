import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// Disconnect a calendar
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const connectionId = searchParams.get('id');

    if (!connectionId) {
      return NextResponse.json(
        { error: 'Connection ID required' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    
    // Get customer ID from session
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const customerId = sessionData.session.user.id;

    // Delete connection (RLS policy ensures they can only delete their own)
    const { error } = await supabase
      .from('calendar_connections')
      .delete()
      .eq('id', connectionId)
      .eq('customer_id', customerId);

    if (error) {
      console.error('Database error:', error);
      throw new Error('Failed to disconnect calendar');
    }

    console.log('✅ Calendar disconnected:', connectionId);

    return NextResponse.json({
      success: true,
      message: 'Calendar disconnected successfully',
    });

  } catch (error: any) {
    console.error('Disconnect error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to disconnect calendar' },
      { status: 500 }
    );
  }
}
