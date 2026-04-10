-- SAFE MIGRATION - Works with existing tables
-- This will add missing columns and tables without deleting data

-- ============================================
-- UPDATE EXISTING CUSTOMERS TABLE
-- ============================================
-- Add new columns if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='customers' AND column_name='phone_number') THEN
        ALTER TABLE customers ADD COLUMN phone_number TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='customers' AND column_name='vapi_phone_id') THEN
        ALTER TABLE customers ADD COLUMN vapi_phone_id TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='customers' AND column_name='setup_completed') THEN
        ALTER TABLE customers ADD COLUMN setup_completed BOOLEAN DEFAULT false;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='customers' AND column_name='onboarding_call_scheduled') THEN
        ALTER TABLE customers ADD COLUMN onboarding_call_scheduled TIMESTAMPTZ;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='customers' AND column_name='active') THEN
        ALTER TABLE customers ADD COLUMN active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_customers_phone_number ON customers(phone_number);
CREATE INDEX IF NOT EXISTS idx_customers_setup_completed ON customers(setup_completed);
CREATE INDEX IF NOT EXISTS idx_customers_active ON customers(active);

-- ============================================
-- UPDATE EXISTING CALLS TABLE
-- ============================================
-- Fix cost column (change from computed to stored value)
DO $$ 
BEGIN
    -- Drop the old computed cost column if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='calls' AND column_name='cost') THEN
        ALTER TABLE calls DROP COLUMN cost;
    END IF;
    
    -- Add new cost column for storing actual Vapi costs
    ALTER TABLE calls ADD COLUMN cost DECIMAL(10, 4) DEFAULT 0;
END $$;

-- ============================================
-- UPDATE EXISTING RECEPTIONIST_SETTINGS TABLE
-- ============================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='receptionist_settings' AND column_name='voice_provider') THEN
        ALTER TABLE receptionist_settings ADD COLUMN voice_provider TEXT DEFAULT '11labs';
    END IF;
END $$;

-- ============================================
-- CREATE ANALYTICS TABLES (if they don't exist)
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
-- CREATE OR REPLACE VIEWS
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
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ Migration complete! All tables and columns are ready.';
END $$;
