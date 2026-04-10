-- Add missing columns to existing customers table
ALTER TABLE customers ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS vapi_phone_id TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS setup_completed BOOLEAN DEFAULT false;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS onboarding_call_scheduled TIMESTAMPTZ;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Add missing column to calls table (fix cost calculation)
ALTER TABLE calls DROP COLUMN IF EXISTS cost;
ALTER TABLE calls ADD COLUMN cost DECIMAL(10, 4) DEFAULT 0;

-- Add missing column to receptionist_settings
ALTER TABLE receptionist_settings ADD COLUMN IF NOT EXISTS voice_provider TEXT DEFAULT '11labs';

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_customers_phone_number ON customers(phone_number);
CREATE INDEX IF NOT EXISTS idx_customers_setup_completed ON customers(setup_completed);
CREATE INDEX IF NOT EXISTS idx_customers_active ON customers(active);
