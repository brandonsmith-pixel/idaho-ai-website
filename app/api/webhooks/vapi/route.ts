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
      cost: call.cost || 0,  // Store Vapi's actual cost (pass-through)
      recording_url: null,
      transcript: null,
      metadata: {
        assistant_id: call.assistantId,
        org_id: call.orgId,
        cost_breakdown: call.costBreakdown || null,  // Detailed cost info
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
    let customerId = call.metadata?.customerId || null;

    // If no customer ID in metadata, try to match by phone number
    if (!customerId && call.customer?.number) {
      const { data: customer } = await supabaseAdmin
        .from('customers')
        .select('id')
        .eq('phone_number', call.customer.number)
        .eq('active', true)
        .single();

      customerId = customer?.id || null;
    }

    // Handle function calls (booking appointments, transferring calls)
    if (type === 'function-call') {
      const { functionCall } = body;
      
      if (functionCall?.name === 'bookAppointment') {
        const params = functionCall.parameters;
        
        // TODO: Integrate with Google Calendar API
        // For now, just log and save to database
        console.log('📅 Booking appointment:', params);
        
        const { error: apptError } = await supabaseAdmin
          .from('appointments')
          .insert({
            customer_id: customerId,
            customer_name: params.name,
            customer_phone: params.phone,
            customer_email: params.email,
            appointment_date: params.date,
            appointment_time: params.time,
            service: params.service,
            status: 'confirmed',
            created_at: new Date().toISOString(),
          });

        if (apptError) {
          console.error('Failed to save appointment:', apptError);
          return NextResponse.json({
            result: 'I apologize, but I encountered an error booking your appointment. Let me transfer you to someone who can help.',
          });
        }

        return NextResponse.json({
          result: `Perfect! I've booked your appointment for ${params.date} at ${params.time}. You'll receive a confirmation email shortly at ${params.email || 'the number you called from'}.`,
        });
      }
      
      if (functionCall?.name === 'transferCall') {
        console.log('📞 Transferring call:', functionCall.parameters.reason);
        
        // Get customer's forward number
        const { data: settings } = await supabaseAdmin
          .from('receptionist_settings')
          .select('forward_to_number')
          .eq('customer_id', customerId)
          .single();

        if (settings?.forward_to_number) {
          return NextResponse.json({
            result: 'One moment please, I\'m transferring you now.',
            forward: settings.forward_to_number,
          });
        }

        return NextResponse.json({
          result: 'I apologize, but I\'m having trouble transferring your call. Could you please call back and ask for a manager?',
        });
      }
    }

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
