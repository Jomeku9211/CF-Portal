-- ============================================
-- Add missing onboarding_stage column to user_onboarding_progress table
-- ============================================

-- 1. Add the onboarding_stage column
ALTER TABLE public.user_onboarding_progress 
ADD COLUMN IF NOT EXISTS onboarding_stage VARCHAR(50) DEFAULT 'role_selection';

-- 2. Update existing records to have a default stage
UPDATE public.user_onboarding_progress 
SET onboarding_stage = 'role_selection' 
WHERE onboarding_stage IS NULL;

-- 3. Make the column NOT NULL after setting defaults
ALTER TABLE public.user_onboarding_progress 
ALTER COLUMN onboarding_stage SET NOT NULL;

-- 4. Add a check constraint to ensure valid stages
ALTER TABLE public.user_onboarding_progress 
ADD CONSTRAINT check_onboarding_stage 
CHECK (onboarding_stage IN (
    'role_selection',
    'organization_onboarding',
    'team_onboarding', 
    'hiring_intent',
    'job_creation',
    'completed'
));

-- 5. Verify the table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_onboarding_progress' 
    AND column_name = 'onboarding_stage'
ORDER BY ordinal_position;
