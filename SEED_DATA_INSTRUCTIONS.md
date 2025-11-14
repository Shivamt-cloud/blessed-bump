# Seed Data Instructions - Baby Care, Birth Month Clubs, and Trying to Conceive

## Overview
Three separate SQL files have been created to seed conversations for different community sections. Each file is **fully automated** and requires **no manual replacements**.

## Files Created

1. **`SEED_DATA_BABY_CARE.sql`** - 25 conversations for Baby Care section
2. **`SEED_DATA_BIRTH_MONTH_CLUBS.sql`** - 25 conversations for Birth Month Clubs section
3. **`SEED_DATA_TRYING_TO_CONCEIVE.sql`** - 25 conversations for Trying to Conceive section

## How Each Script Works

Each script automatically:
- ✅ Finds the topic ID by slug (e.g., 'baby-care', 'birth-month-clubs', 'trying-to-conceive')
- ✅ Finds the first available user ID from `auth.users`
- ✅ Inserts threads and posts with realistic conversations
- ✅ Uses proper timestamps (recent dates)
- ✅ Includes both "Ask & Wonder" (questions) and "Share & Uplift" (feedback) thread types

## How to Execute

### Option 1: Run All Three at Once
You can run all three files in sequence in Supabase SQL Editor:

1. Open Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `SEED_DATA_BABY_CARE.sql`
3. Click "Run" or press `Ctrl+Enter`
4. Wait for success message
5. Repeat for `SEED_DATA_BIRTH_MONTH_CLUBS.sql`
6. Repeat for `SEED_DATA_TRYING_TO_CONCEIVE.sql`

### Option 2: Run Separately (Recommended)
Run each file separately to see individual results:

1. **First, run Baby Care:**
   - Open `SEED_DATA_BABY_CARE.sql`
   - Copy entire contents
   - Paste in Supabase SQL Editor
   - Run
   - You should see: `Successfully inserted 25 Baby Care conversations!`

2. **Then, run Birth Month Clubs:**
   - Open `SEED_DATA_BIRTH_MONTH_CLUBS.sql`
   - Copy entire contents
   - Paste in Supabase SQL Editor
   - Run
   - You should see: `Successfully inserted 25 Birth Month Clubs conversations!`

3. **Finally, run Trying to Conceive:**
   - Open `SEED_DATA_TRYING_TO_CONCEIVE.sql`
   - Copy entire contents
   - Paste in Supabase SQL Editor
   - Run
   - You should see: `Successfully inserted 25 Trying to Conceive conversations!`

## What Each Script Includes

### Baby Care (25 conversations)
- **Questions (15 threads):** Newborn sleep, diaper rash, feeding schedules, colic, bathing, babywearing, tummy time, teething, sleep regression, introducing solids, milestones, baby proofing, separation anxiety, sleep training, baby's first cold
- **Feedback (10 threads):** First smile, sleeping through night, first laugh, first tooth, crawling, first word, weaning success, first steps, bedtime routine success, first birthday

### Birth Month Clubs (25 conversations)
- **Questions (15 threads):** Monthly birth clubs (January through December), planning meetups, sharing birth stories, baby name ideas
- **Feedback (10 threads):** Baby arrived, first month celebration, meetup success, community gratitude, first holiday, birthday planning, milestone sharing, photo sharing, advice for new mamas, birth month traditions

### Trying to Conceive (25 conversations)
- **Questions (15 threads):** How long to conceive, ovulation tracking, when to test, prenatal vitamins, stress and conception, fertility apps, when to see specialist, best positions, irregular cycles, PCOS, male fertility, chemical pregnancy, secondary infertility, OPK confusion, TTC after miscarriage
- **Feedback (10 threads):** Positive test, cycle tracking success, community support, first appointment, lifestyle changes, partner support, staying positive, learning about fertility, celebrating small wins, hope and encouragement

## Prerequisites

Before running the scripts, ensure:
- ✅ You have at least one user account created in Supabase (the scripts will use the first available user)
- ✅ The topics table has entries with slugs: 'baby-care', 'birth-month-clubs', 'trying-to-conceive'
- ✅ You have the necessary permissions to insert into `threads` and `posts` tables

## Troubleshooting

### Error: "Topic not found"
- Make sure the topic exists in your `topics` table with the correct slug
- Check: `SELECT * FROM topics WHERE slug IN ('baby-care', 'birth-month-clubs', 'trying-to-conceive');`

### Error: "No users found"
- Create at least one user account first
- The script needs a user ID to assign as the author of threads and posts

### Error: "Permission denied"
- Ensure your Supabase user has INSERT permissions on `threads` and `posts` tables
- Check Row Level Security (RLS) policies if enabled

## Success Indicators

After running each script, you should see:
- ✅ A notice message: `Using user ID: [uuid]`
- ✅ A notice message: `[Topic] topic ID: [uuid]`
- ✅ A success message: `Successfully inserted 25 [Topic] conversations!`

## Next Steps

After running all three scripts:
1. Refresh your Village Voice page
2. Navigate to each section (Baby Care, Birth Month Clubs, Trying to Conceive)
3. You should see 25 active conversations in each section
4. The conversations will appear with realistic timestamps and multiple replies

## Notes

- Each script can be run multiple times, but it will create duplicate conversations
- If you want to start fresh, you can delete existing threads/posts first:
  ```sql
  DELETE FROM posts WHERE thread_id IN (SELECT id FROM threads WHERE topic_id = (SELECT id FROM topics WHERE slug = 'baby-care'));
  DELETE FROM threads WHERE topic_id = (SELECT id FROM topics WHERE slug = 'baby-care');
  ```
- The conversations use realistic, supportive, and helpful content appropriate for a pregnancy/parenting community
