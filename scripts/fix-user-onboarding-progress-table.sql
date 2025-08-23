-- Fix user_onboarding_progress table structure and RLS policies
-- This follows the OFFICIAL CODERFARM FLOW document exactly

-- Step 1: Add missing columns
ALTER TABLE user_onboarding_progress 
ADD COLUMN IF NOT EXISTS onboarding_flow VARCHAR(50),
ADD COLUMN IF NOT EXISTS completed_steps TEXT[],
ADD COLUMN IF NOT EXISTS onboarding_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS last_activity TIMESTAMP WITH TIME ZONE;

-- Step 2: Set default values (separate UPDATE statements)
UPDATE user_onboarding_progress 
SET onboarding_flow = 'client' 
WHERE onboarding_flow IS NULL;

UPDATE user_onboarding_progress 
SET completed_steps = '{}' 
WHERE completed_steps IS NULL;

UPDATE user_onboarding_progress 
SET onboarding_status = 'in_progress' 
WHERE onboarding_status IS NULL;

UPDATE user_onboarding_progress 
SET last_activity = NOW() 
WHERE last_activity IS NULL;

-- Step 3: Fix RLS policies
-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own onboarding progress" ON user_onboarding_progress;
DROP POLICY IF EXISTS "Users can update their own onboarding progress" ON user_onboarding_progress;
DROP POLICY IF EXISTS "Users can select their own onboarding progress" ON user_onboarding_progress;

-- Create new RLS policies
CREATE POLICY "Users can insert their own onboarding progress" 
ON user_onboarding_progress 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding progress" 
ON user_onboarding_progress 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can select their own onboarding progress" 
ON user_onboarding_progress 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Step 4: Verify table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'user_onboarding_progress' 
ORDER BY ordinal_position;
