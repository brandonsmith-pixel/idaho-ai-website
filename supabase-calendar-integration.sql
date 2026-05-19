-- Calendar Integration Schema for Teton Group AI
-- Run this in your Supabase SQL Editor

-- 1. Calendar Connections Table
CREATE TABLE IF NOT EXISTS calendar_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Integration type: 'nylas' or 'calcom'
  integration_type TEXT NOT NULL CHECK (integration_type IN ('nylas', 'calcom')),
  
  -- Nylas-specific fields
  nylas_grant_id TEXT,
  nylas_email TEXT,
  provider TEXT, -- 'google', 'microsoft'
  
  -- Cal.com specific fields
  calcom_user_id TEXT,
  calcom_username TEXT,
  
  -- OAuth tokens (encrypted in production)
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  
  -- Calendar settings
  primary_calendar_id TEXT,
  calendar_name TEXT,
  timezone TEXT DEFAULT 'America/Denver',
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_sync_at TIMESTAMPTZ,
  sync_error TEXT,
  
  UNIQUE(customer_id, integration_type)
);

-- 2. Appointments Table (synced from calendar or created by AI)
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- External calendar reference
  calendar_connection_id UUID REFERENCES calendar_connections(id) ON DELETE SET NULL,
  external_event_id TEXT, -- Nylas or Cal.com event ID
  
  -- Appointment details
  title TEXT NOT NULL DEFAULT 'Appointment',
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  
  -- Attendee info
  attendee_name TEXT,
  attendee_phone TEXT,
  attendee_email TEXT,
  
  -- Status
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')),
  
  -- Source tracking
  created_by TEXT DEFAULT 'ai' CHECK (created_by IN ('ai', 'manual', 'synced', 'import')),
  vapi_call_id TEXT, -- Link back to the call that created this
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ
);

-- 3. Calendar Availability Rules (optional - for custom business hours)
CREATE TABLE IF NOT EXISTS availability_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Day of week (0 = Sunday, 6 = Saturday)
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  
  -- Time ranges (in customer's timezone)
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  
  -- Buffer settings
  buffer_before_minutes INTEGER DEFAULT 0,
  buffer_after_minutes INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  UNIQUE(customer_id, day_of_week, start_time)
);

-- 4. Booking Settings (per customer)
CREATE TABLE IF NOT EXISTS booking_settings (
  customer_id UUID PRIMARY KEY REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Default appointment settings
  default_duration_minutes INTEGER DEFAULT 30,
  min_notice_hours INTEGER DEFAULT 2, -- Minimum time before appointment can be booked
  max_advance_days INTEGER DEFAULT 60, -- How far in advance can people book
  
  -- Buffer settings
  buffer_between_appointments_minutes INTEGER DEFAULT 0,
  
  -- Confirmation settings
  send_confirmation_sms BOOLEAN DEFAULT TRUE,
  send_confirmation_email BOOLEAN DEFAULT TRUE,
  send_reminder_sms BOOLEAN DEFAULT TRUE,
  reminder_hours_before INTEGER DEFAULT 24,
  
  -- Business hours override (if not using calendar availability)
  use_calendar_availability BOOLEAN DEFAULT TRUE,
  
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_calendar_connections_customer ON calendar_connections(customer_id);
CREATE INDEX idx_calendar_connections_active ON calendar_connections(customer_id, is_active);
CREATE INDEX idx_appointments_customer ON appointments(customer_id);
CREATE INDEX idx_appointments_time ON appointments(start_time, end_time);
CREATE INDEX idx_appointments_status ON appointments(customer_id, status);
CREATE INDEX idx_availability_rules_customer ON availability_rules(customer_id, is_active);

-- Row Level Security Policies
ALTER TABLE calendar_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_settings ENABLE ROW LEVEL SECURITY;

-- Calendar connections: customers can only see their own
CREATE POLICY calendar_connections_policy ON calendar_connections
  FOR ALL USING (customer_id IN (
    SELECT id FROM customers WHERE stripe_customer_id = current_setting('request.jwt.claims', true)::json->>'stripe_customer_id'
  ));

-- Appointments: customers can only see their own
CREATE POLICY appointments_policy ON appointments
  FOR ALL USING (customer_id IN (
    SELECT id FROM customers WHERE stripe_customer_id = current_setting('request.jwt.claims', true)::json->>'stripe_customer_id'
  ));

-- Availability rules: customers can only manage their own
CREATE POLICY availability_rules_policy ON availability_rules
  FOR ALL USING (customer_id IN (
    SELECT id FROM customers WHERE stripe_customer_id = current_setting('request.jwt.claims', true)::json->>'stripe_customer_id'
  ));

-- Booking settings: customers can only manage their own
CREATE POLICY booking_settings_policy ON booking_settings
  FOR ALL USING (customer_id IN (
    SELECT id FROM customers WHERE stripe_customer_id = current_setting('request.jwt.claims', true)::json->>'stripe_customer_id'
  ));

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_booking_settings_updated_at
  BEFORE UPDATE ON booking_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
