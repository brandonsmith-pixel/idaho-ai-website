import { supabaseAdmin } from '@/lib/supabase';

async function getActivity() {
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
    const fourDaysAgoISO = fourDaysAgo.toISOString();

    // 1. Check for new paid customers
    const { data: customers, error: customerError } = await supabaseAdmin
        .from('customers')
        .select('email, business_name, plan, created_at')
        .gte('created_at', fourDaysAgoISO)
        .order('created_at', { ascending: false });

    // 2. Check for new demo requests
    const { data: demos, error: demoError } = await supabaseAdmin
        .from('events')
        .select('created_at, event_data')
        .eq('event_name', 'demo_call_started')
        .gte('created_at', fourDaysAgoISO)
        .order('created_at', { ascending: false });

    if (customerError) {
        console.error('Error fetching customers:', customerError);
    }
    if (demoError) {
        console.error('Error fetching demos:', demoError);
    }
    
    return { customers, demos };
}

export default async function ActivityCheckPage() {
    const { customers, demos } = await getActivity();

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h1>Recent Activity (Last 4 Days)</h1>
            
            <h2>New Sign-ups</h2>
            {customers && customers.length > 0 ? (
                <table border="1" cellPadding="5">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Business Name</th>
                            <th>Plan</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c: any) => (
                            <tr key={c.email}>
                                <td>{c.email}</td>
                                <td>{c.business_name}</td>
                                <td>{c.plan}</td>
                                <td>{new Date(c.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No new sign-ups in the last 4 days.</p>
            )}

            <h2 style={{ marginTop: '40px' }}>Demo Requests</h2>
            {demos && demos.length > 0 ? (
                <table border="1" cellPadding="5">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Business Name</th>
                            <th>Test Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {demos.map((d: any) => (
                            <tr key={d.created_at}>
                                <td>{new Date(d.created_at).toLocaleString()}</td>
                                <td>{d.event_data?.businessName || 'N/A'}</td>
                                <td>{d.event_data?.testPhone || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No demo requests in the last 4 days.</p>
            )}
        </div>
    );
}