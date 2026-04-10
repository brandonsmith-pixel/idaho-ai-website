-- Supabase Schema for AI Receptionist Call Tracking
-- Run this in your Supabase SQL Editor

-- Create customers table (linked to Stripe subscriptions)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_customer_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('self-serve', 'full-service')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create calls table (all call records)
CREATE TABLE IF NOT EXISTS calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  vapi_call_id TEXT UNIQUE NOT NULL,
  phone_number TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  status TEXT NOT NULL,
  duration_seconds INT DEFAULT 0,
  duration_minutes DECIMAL(10, 2) GENERATED ALWAYS AS (CEIL(duration_seconds::decimal / 60)) STORED,
  cost DECIMAL(10, 4) DEFAULT 0,  -- Store actual Vapi cost (not calculated)
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  recording_url TEXT,
  transcript TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_calls_customer_id ON calls(customer_id);
CREATE INDEX IF NOT EXISTS idx_calls_started_at ON calls(started_at);
CREATE INDEX IF NOT EXISTS idx_calls_vapi_call_id ON calls(vapi_call_id);
CREATE INDEX IF NOT EXISTS idx_customers_stripe_id ON customers(stripe_customer_id);

-- Create view for customer dashboard stats
CREATE OR REPLACE VIEW customer_call_stats AS
SELECT 
  c.customer_id,
  cu.business_name,
  cu.email,
  COUNT(*) as total_calls,
  SUM(c.duration_seconds) as total_seconds,
  SUM(c.duration_minutes) as total_minutes,
  SUM(c.cost) as total_cost,
  MAX(c.started_at) as last_call_at
FROM calls c
JOIN customers cu ON c.customer_id = cu.id
WHERE c.status = 'completed'
GROUP BY c.customer_id, cu.business_name, cu.email;

-- Create function to update customer updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for customers table
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

-- Create policies (customers can only see their own data)
CREATE POLICY "Customers can view their own data"
ON customers FOR SELECT
USING (auth.uid()::text = id::text);

CREATE POLICY "Customers can view their own calls"
ON calls FOR SELECT
USING (customer_id IN (SELECT id FROM customers WHERE auth.uid()::text = id::text));

-- Grant access to service role (for backend API)
GRANT ALL ON customers TO service_role;
GRANT ALL ON calls TO service_role;
GRANT SELECT ON customer_call_stats TO service_role;

COMMENT ON TABLE customers IS 'Customer accounts linked to Stripe subscriptions';
COMMENT ON TABLE calls IS 'Individual call records from Vapi';
COMMENT ON COLUMN calls.duration_minutes IS 'Rounds up to nearest minute (billing basis)';
COMMENT ON COLUMN calls.cost IS 'Calculated at $0.10 per minute (rounded up)';

-- Add active column to customers (for subscription status)
ALTER TABLE customers ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Add index for active customers
CREATE INDEX IF NOT EXISTS idx_customers_active ON customers(active) WHERE active = true;

-- Add phone_number to customers table
ALTER TABLE customers ADD COLUMN IF NOT EXISTS phone_number TEXT;
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone_number);

-- Visitor tracking tables
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  first_seen_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  device_type TEXT,
  browser TEXT,
  country TEXT,
  total_pageviews INT DEFAULT 1,
  total_time_seconds INT DEFAULT 0,
  converted BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS pageviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT,
  time_on_page_seconds INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  step INT NOT NULL,
  form_data JSONB DEFAULT '{}',
  completed BOOLEAN DEFAULT false,
  demo_called BOOLEAN DEFAULT false,
  converted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_visitors_session ON visitors(session_id);
CREATE INDEX IF NOT EXISTS idx_pageviews_session ON pageviews(session_id);
CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_name ON events(event_name);
CREATE INDEX IF NOT EXISTS idx_form_submissions_session ON form_submissions(session_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_converted ON form_submissions(converted) WHERE converted = true;

-- Views for analytics
CREATE OR REPLACE VIEW conversion_funnel AS
SELECT 
  COUNT(DISTINCT v.session_id) as total_visitors,
  COUNT(DISTINCT CASE WHEN fs.step >= 1 THEN fs.session_id END) as started_form,
  COUNT(DISTINCT CASE WHEN fs.step >= 3 THEN fs.session_id END) as completed_business_info,
  COUNT(DISTINCT CASE WHEN fs.demo_called THEN fs.session_id END) as demo_calls,
  COUNT(DISTINCT CASE WHEN fs.converted THEN fs.session_id END) as conversions
FROM visitors v
LEFT JOIN form_submissions fs ON v.session_id = fs.session_id;

CREATE OR REPLACE VIEW demo_dropoffs AS
SELECT
  fs.step,
  COUNT(*) as dropoff_count,
  jsonb_object_agg(
    key, value
  ) as last_data
FROM form_submissions fs
WHERE fs.completed = false
GROUP BY fs.step, fs.form_data;

COMMENT ON TABLE visitors IS 'Track unique visitors with session data';
COMMENT ON TABLE pageviews IS 'Every page view with time on page';
COMMENT ON TABLE events IS 'Custom events (clicks, form interactions, etc)';
COMMENT ON TABLE form_submissions IS 'Incomplete and complete form submissions';

-- Receptionist settings table
CREATE TABLE IF NOT EXISTS receptionist_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID UNIQUE REFERENCES customers(id) ON DELETE CASCADE,
  greeting TEXT DEFAULT 'Hi! Thanks for calling. How can I help you today?',
  tone TEXT DEFAULT 'Friendly and professional',
  business_hours TEXT DEFAULT '24/7',
  services TEXT,
  pricing TEXT,
  voice_id TEXT DEFAULT 'EXAVITQu4vr4xnSDxMaL',
  voice_name TEXT DEFAULT 'Sarah',
  call_forwarding_enabled BOOLEAN DEFAULT false,
  forward_to_number TEXT,
  calendar_connected BOOLEAN DEFAULT false,
  calendar_provider TEXT,
  calendar_credentials JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_receptionist_settings_customer ON receptionist_settings(customer_id);

COMMENT ON TABLE receptionist_settings IS 'Customer-editable AI receptionist configuration';
