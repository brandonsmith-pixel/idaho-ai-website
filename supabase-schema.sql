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
  cost DECIMAL(10, 4) GENERATED ALWAYS AS (CEIL(duration_seconds::decimal / 60) * 0.10) STORED,
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
