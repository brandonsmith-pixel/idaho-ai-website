import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    // Get session from cookies (Supabase Auth)
    const cookieStore = cookies();
    const authToken = cookieStore.get('sb-access-token');

    if (!authToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Verify session and get user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(authToken.value);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Fetch customer data
    const { data: customer, error } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('email', user.email)
      .single();

    if (error || !customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ customer });

  } catch (error: any) {
    console.error('Customer fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
