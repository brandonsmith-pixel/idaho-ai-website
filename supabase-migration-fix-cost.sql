-- MIGRATION: Fix cost column to store actual Vapi cost instead of calculating
-- Run this AFTER the initial schema setup

-- Step 1: Drop the computed column
ALTER TABLE calls DROP COLUMN IF EXISTS cost;

-- Step 2: Re-create as a regular column that stores actual values
ALTER TABLE calls ADD COLUMN cost DECIMAL(10, 4) DEFAULT 0;

-- Step 3: Add comment explaining the change
COMMENT ON COLUMN calls.cost IS 'Actual cost from Vapi (pass-through billing)';

-- Step 4: Update any existing records (if you have test data)
-- This sets cost to 0 for old records since we don''t have the real Vapi cost
UPDATE calls SET cost = 0 WHERE cost IS NULL;
