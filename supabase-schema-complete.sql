-- COMPLETE SUPABASE SCHEMA FOR TETON GROUP AI
-- Run this in a fresh database (delete all tables first if needed)

-- ============================================
-- CUSTOMERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_customer_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('self-serve', 'full-service')),
  phone_number TEXT,
  vapi_phone_id TEXT,
  setup_completed BOOLEAN DEFAULT false,
  onboarding_call_scheduled TIMESTAMPTZ,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_stripe_id ON customers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone_number ON customers(phone_number);
CREATE INDEX IF NOT EXISTS idx_customers_setup_completed ON customers(setup_completed);
CREATE INDEX IF NOT EXISTS idx_customers_active ON customers(active);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- CALLS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  vapi_call_id TEXT UNIQUE NOT NULL,
  phone_number TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  status TEXT NOT NULL,
  duration_seconds INT DEFAULT 0,
  duration_minutes DECIMAL(10, 2) GENERATED ALWAYS AS (CEIL(duration_seconds::decimal / 60)) STORED,
  cost DECIMAL(10, 4) DEFAULT 0,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  recording_url TEXT,
  transcript TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_calls_customer_id ON calls(customer_id);
CREATE INDEX IF NOT EXISTS idx_calls_started_at ON calls(started_at);
CREATE INDEX IF NOT EXISTS idx_calls_vapi_call_id ON calls(vapi_call_id);

-- ============================================
-- RECEPTIONIST SETTINGS TABLE
-- ============================================
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
  voice_provider TEXT DEFAULT '11labs',
  call_forwarding_enabled BOOLEAN DEFAULT false,
  forward_to_number TEXT,
  calendar_connected BOOLEAN DEFAULT false,
  calendar_provider TEXT,
  calendar_credentials JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_receptionist_settings_customer ON receptionist_settings(customer_id);

CREATE TRIGGER update_receptionist_settings_updated_at BEFORE UPDATE ON receptionist_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ANALYTICS TABLES
-- ============================================

-- Visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  device_type TEXT,
  browser TEXT,
  first_visit TIMESTAMPTZ DEFAULT NOW(),
  last_visit TIMESTAMPTZ DEFAULT NOW(),
  total_pageviews INT DEFAULT 0,
  total_time_seconds INT DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_visitors_session_id ON visitors(session_id);
CREATE INDEX IF NOT EXISTS idx_visitors_utm_source ON visitors(utm_source);
CREATE INDEX IF NOT EXISTS idx_visitors_first_visit ON visitors(first_visit);

-- Pageviews table
CREATE TABLE IF NOT EXISTS pageviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID REFERENCES visitors(id) ON DELETE CASCADE,
  page_path TEXT NOT NULL,
  referrer TEXT,
  time_on_page_seconds INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pageviews_visitor_id ON pageviews(visitor_id);
CREATE INDEX IF NOT EXISTS idx_pageviews_page_path ON pageviews(page_path);
CREATE INDEX IF NOT EXISTS idx_pageviews_created_at ON pageviews(created_at);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID REFERENCES visitors(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_visitor_id ON events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_events_event_name ON events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);

-- Form submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID REFERENCES visitors(id) ON DELETE CASCADE,
  form_step INT NOT NULL,
  form_data JSONB NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_form_submissions_visitor_id ON form_submissions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_completed ON form_submissions(completed);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at);

-- ============================================
-- VIEWS FOR ANALYTICS
-- ============================================

-- Customer call stats view
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

-- Conversion funnel view
CREATE OR REPLACE VIEW conversion_funnel AS
SELECT
  COUNT(DISTINCT v.id) as total_visitors,
  COUNT(DISTINCT CASE WHEN fs.form_step >= 1 THEN fs.visitor_id END) as started_form,
  COUNT(DISTINCT CASE WHEN fs.form_step >= 2 THEN fs.visitor_id END) as completed_business_info,
  COUNT(DISTINCT CASE WHEN e.event_name = 'demo_call_started' THEN e.visitor_id END) as demo_calls,
  COUNT(DISTINCT c.id) as conversions
FROM visitors v
LEFT JOIN form_submissions fs ON v.id = fs.visitor_id
LEFT JOIN events e ON v.id = e.visitor_id
LEFT JOIN customers c ON v.session_id = c.stripe_customer_id;

-- Demo dropoffs view
CREATE OR REPLACE VIEW demo_dropoffs AS
SELECT 
  form_step,
  COUNT(*) as dropoff_count,
  form_data
FROM form_submissions
WHERE completed = false
GROUP BY form_step, form_data
ORDER BY form_step, dropoff_count DESC;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE receptionist_settings ENABLE ROW LEVEL SECURITY;

-- Customers can only see their own data
CREATE POLICY customers_isolation_policy ON customers
  FOR ALL
  USING (id = current_setting('app.current_customer_id')::uuid);

CREATE POLICY calls_isolation_policy ON calls
  FOR ALL
  USING (customer_id = current_setting('app.current_customer_id')::uuid);

CREATE POLICY receptionist_settings_isolation_policy ON receptionist_settings
  FOR ALL
  USING (customer_id = current_setting('app.current_customer_id')::uuid);

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE customers IS 'Customer accounts linked to Stripe subscriptions';
COMMENT ON TABLE calls IS 'All phone calls handled by AI receptionist';
COMMENT ON TABLE receptionist_settings IS 'Customer-editable AI receptionist configuration';
COMMENT ON TABLE visitors IS 'Website visitor tracking (analytics)';
COMMENT ON TABLE pageviews IS 'Individual page views per visitor';
COMMENT ON TABLE events IS 'Custom events (form progress, demo calls, etc)';
COMMENT ON TABLE form_submissions IS 'Form data (partial and complete submissions)';

COMMENT ON COLUMN customers.phone_number IS 'Vapi phone number assigned to customer';
COMMENT ON COLUMN customers.vapi_phone_id IS 'Vapi phone number ID for API calls';
COMMENT ON COLUMN customers.setup_completed IS 'True if customer finished setup wizard';
COMMENT ON COLUMN calls.cost IS 'Actual cost from Vapi (pass-through billing)';
COMMENT ON COLUMN calls.duration_minutes IS 'Duration rounded up to nearest minute';
