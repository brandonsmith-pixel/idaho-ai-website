-- Add new columns for setup wizard (only run if they don't exist)

-- Add phone number tracking to customers table
ALTER TABLE customers ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS vapi_phone_id TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS setup_completed BOOLEAN DEFAULT false;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS onboarding_call_scheduled TIMESTAMPTZ;

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_customers_phone_number ON customers(phone_number);
CREATE INDEX IF NOT EXISTS idx_customers_setup_completed ON customers(setup_completed);

COMMENT ON COLUMN customers.phone_number IS 'Vapi phone number assigned to customer';
COMMENT ON COLUMN customers.vapi_phone_id IS 'Vapi phone number ID for API calls';
COMMENT ON COLUMN customers.setup_completed IS 'True if customer finished setup wizard';
