import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// This is a temporary endpoint for a one-time check.
// It should be deleted after use.

export async function GET(request: Request) {
    
    // Basic security: check for a secret header or query param.
    // In a real app, this would be proper authentication.
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.INTERNAL_API_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const fourDaysAgo = new Date();
        fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
        const fourDaysAgoISO = fourDaysAgo.toISOString();

        // 1. Check for new paid customers
        const { data: customers, error: customerError } = await supabaseAdmin
            .from('customers')
            .select('email, business_name, plan, created_at')
            .gte('created_at', fourDaysAgoISO)
            .order('created_at', { ascending: false });

        if (customerError) {
            console.error('Error fetching customers:', customerError);
            throw new Error('Failed to fetch new customers.');
        }

        // 2. Check for new demo requests
        const { data: demos, error: demoError } = await supabaseAdmin
            .from('events')
            .select('created_at, event_data')
            .eq('event_name', 'demo_call_started')
            .gte('created_at', fourDaysAgoISO)
            .order('created_at', { ascending: false });

        if (demoError) {
            console.error('Error fetching demos:', demoError);
            throw new Error('Failed to fetch demo requests.');
        }

        return NextResponse.json({
            success: true,
            new_signups: customers,
            demo_requests: demos,
        });

    } catch (error: any) {
        console.error('Admin check error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
