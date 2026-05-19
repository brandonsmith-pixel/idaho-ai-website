import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// Book an appointment
export async function POST(request: Request) {
  try {
    const {
      customerId,
      title,
      description,
      startTime,
      endTime,
      attendeeName,
      attendeePhone,
      attendeeEmail,
      vapiCallId, // Optional: link to Vapi call that created this
    } = await request.json();
    
    if (!customerId || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'customerId, startTime, and endTime are required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Get active calendar connection
    const { data: connection, error: connError } = await supabase
      .from('calendar_connections')
      .select('*')
      .eq('customer_id', customerId)
      .eq('is_active', true)
      .single();

    if (connError || !connection) {
      return NextResponse.json(
        { error: 'No active calendar connection found' },
        { status: 404 }
      );
    }

    let externalEventId = null;

    // Create event in external calendar
    if (connection.integration_type === 'nylas') {
      const nylasApiKey = process.env.NYLAS_API_KEY;
      
      if (!nylasApiKey) {
        throw new Error('Nylas API key not configured');
      }

      const eventPayload = {
        title: title || 'Appointment',
        description: description || '',
        when: {
          start_time: Math.floor(new Date(startTime).getTime() / 1000),
          end_time: Math.floor(new Date(endTime).getTime() / 1000),
        },
        calendar_id: connection.primary_calendar_id,
        participants: attendeeEmail ? [{ email: attendeeEmail, name: attendeeName }] : [],
      };

      const createResponse = await fetch(
        `https://api.us.nylas.com/v3/grants/${connection.nylas_grant_id}/events`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${nylasApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventPayload),
        }
      );

      if (createResponse.ok) {
        const eventData = await createResponse.json();
        externalEventId = eventData.data?.id;
        console.log('✅ Nylas event created:', externalEventId);
      } else {
        const errorText = await createResponse.text();
        console.error('Nylas event creation failed:', errorText);
      }

    } else if (connection.integration_type === 'calcom') {
      const bookingPayload = {
        eventTypeId: 1, // TODO: Make this configurable per customer
        start: startTime,
        responses: {
          name: attendeeName || 'Guest',
          email: attendeeEmail || '',
          notes: description || '',
        },
      };

      const createResponse = await fetch('https://api.cal.com/v1/bookings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${connection.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      if (createResponse.ok) {
        const bookingData = await createResponse.json();
        externalEventId = bookingData.id?.toString();
        console.log('✅ Cal.com booking created:', externalEventId);
      } else {
        const errorText = await createResponse.text();
        console.error('Cal.com booking creation failed:', errorText);
      }
    }

    // Store in our database
    const { data: appointment, error: dbError } = await supabase
      .from('appointments')
      .insert({
        customer_id: customerId,
        calendar_connection_id: connection.id,
        external_event_id: externalEventId,
        title: title || 'Appointment',
        description: description || '',
        start_time: startTime,
        end_time: endTime,
        attendee_name: attendeeName,
        attendee_phone: attendeePhone,
        attendee_email: attendeeEmail,
        status: 'scheduled',
        created_by: vapiCallId ? 'ai' : 'manual',
        vapi_call_id: vapiCallId,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save appointment');
    }

    console.log('✅ Appointment booked:', appointment.id);

    return NextResponse.json({
      success: true,
      appointment,
      externalEventId,
    });

  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to book appointment' },
      { status: 500 }
    );
  }
}
