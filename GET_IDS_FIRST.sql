-- ============================================
-- STEP 1: Run this FIRST to get all your IDs
-- ============================================
-- Copy the results and use them in the seed script

-- Get all topic IDs
SELECT 
  id as topic_id,
  name as topic_name,
  slug as topic_slug
FROM topics 
ORDER BY name;

-- Get a user ID to use for seed data
SELECT 
  id as user_id,
  email
FROM auth.users 
LIMIT 1;

-- ============================================
-- After running this, you'll have:
-- - topic_id for each topic (UUID format)
-- - user_id to use as author (UUID format)
-- 
-- Copy these UUIDs and replace in SEED_DATA_COMPLETE.sql
-- ============================================

