-- =====================================================
-- UPDATE ONBOARDING SCHEMA FOR CLIENT SUPPORT
-- =====================================================

-- Make experience_level_id nullable to support clients who don't need experience levels
ALTER TABLE public.user_onboarding_progress 
ALTER COLUMN experience_level_id DROP NOT NULL;

-- Add a comment explaining the change
COMMENT ON COLUMN public.user_onboarding_progress.experience_level_id IS 
'Experience level ID for service providers/developers. NULL for clients who do not need experience levels.';

-- Update existing records for clients to have NULL experience_level_id
-- This is a safety measure in case there are existing client records
UPDATE public.user_onboarding_progress 
SET experience_level_id = NULL 
WHERE onboarding_flow = 'client' AND experience_level_id IS NOT NULL;

-- Verify the change
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'user_onboarding_progress'
  AND column_name = 'experience_level_id';

-- Show updated table structure
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'user_onboarding_progress'
ORDER BY ordinal_position;
