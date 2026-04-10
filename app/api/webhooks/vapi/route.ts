import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('📞 Vapi webhook received:', JSON.stringify(body, null, 2));

    const { type, call } = body;

    if (!call || !call.id) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }

    // Extract call data
    const callData = {
      vapi_call_id: call.id,
      phone_number: call.customer?.number || 'unknown',
      direction: call.type === 'outboundPhoneCall' ? 'outbound' : 'inbound',
      status: call.status || 'unknown',
      started_at: call.startedAt ? new Date(call.startedAt).toISOString() : null,
      ended_at: call.endedAt ? new Date(call.endedAt).toISOString() : null,
      duration_seconds: 0,
      recording_url: null,
      transcript: null,
      metadata: {
        assistant_id: call.assistantId,
        org_id: call.orgId,
        cost: call.cost || 0,
        raw_webhook: body,
      },
    };

    // Calculate duration if call ended
    if (call.startedAt && call.endedAt) {
      const start = new Date(call.startedAt).getTime();
      const end = new Date(call.endedAt).getTime();
      callData.duration_seconds = Math.floor((end - start) / 1000);
    }

    // Try to find customer based on phone number or metadata
    // For now, we'll need to link this later via assistant metadata
    // You can add customer_id to the assistant metadata when creating it
    const customerId = call.metadata?.customerId || null;

    // Handle different webhook types
    switch (type) {
      case 'call-started':
        console.log('📞 Call started:', call.id);
        
        // Insert new call record
        const { error: insertError } = await supabaseAdmin
          .from('calls')
          .insert({
            ...callData,
            customer_id: customerId,
            status: 'in-progress',
          });

        if (insertError) {
          console.error('Failed to insert call:', insertError);
        }
        break;

      case 'call-ended':
      case 'end-of-call-report':
        console.log('📞 Call ended:', call.id);

        // Get recording URL if available
        if (call.recordingUrl) {
          callData.recording_url = call.recordingUrl;
        }

        // Get transcript if available
        if (call.transcript) {
          callData.transcript = JSON.stringify(call.transcript) as any;
        }

        // Update existing call record
        const { error: updateError } = await supabaseAdmin
          .from('calls')
          .update({
            ...callData,
            status: 'completed',
          })
          .eq('vapi_call_id', call.id);

        if (updateError) {
          console.error('Failed to update call:', updateError);
          
          // If update failed, try insert (in case call-started webhook was missed)
          const { error: fallbackInsertError } = await supabaseAdmin
            .from('calls')
            .insert({
              ...callData,
              customer_id: customerId,
              status: 'completed',
            });

          if (fallbackInsertError) {
            console.error('Failed fallback insert:', fallbackInsertError);
          }
        }
        break;

      default:
        console.log('📞 Other webhook type:', type);
    }

    return NextResponse.json({ success: true, received: true });

  } catch (error: any) {
    console.error('Vapi webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
