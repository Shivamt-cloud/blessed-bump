# Quick Start: Seed Community Data

## ✅ Fixed Version - No More UUID Errors!

I've created a simpler script that automatically finds your topic IDs. You only need to provide **ONE** user ID.

## 🚀 3 Simple Steps:

### Step 1: Get Your User ID
Run this in Supabase SQL Editor:
```sql
SELECT id, email FROM auth.users LIMIT 1;
```
Copy the `id` (it will look like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### Step 2: Open the Simple Script
Open the file: **`SEED_DATA_SIMPLE.sql`**

### Step 3: Replace ONE Thing
Find this line (around line 15):
```sql
seed_user_id UUID := 'YOUR_USER_ID_HERE'; -- REPLACE THIS
```

Replace `'YOUR_USER_ID_HERE'` with your actual user ID from Step 1:
```sql
seed_user_id UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'; -- Your actual ID
```

### Step 4: Run the Script
Copy the entire script and paste it into Supabase SQL Editor, then click "Run".

## ✅ That's It!

The script will:
- ✅ Automatically find all topic IDs
- ✅ Create 20 threads for Pregnancy Journey
- ✅ Add 2-3 replies to each thread
- ✅ Use realistic dates (last 15 days)

## 📊 What Gets Created:

- **20 threads** in Pregnancy Journey topic
- **40+ posts** (replies)
- Mix of questions and celebrations
- All with realistic, helpful content

## 🔍 Verify It Worked:

After running, check:
```sql
SELECT COUNT(*) as thread_count FROM threads;
SELECT COUNT(*) as post_count FROM posts;
```

You should see new threads and posts!

## 💡 Need More Topics?

The current script only seeds **Pregnancy Journey**. If you want to seed all 4 topics (Pregnancy Journey, Trying to Conceive, Baby Care, Birth Month Clubs), let me know and I'll create the complete version!

---

**The error is fixed!** The new script uses variables instead of placeholder strings, so no more UUID errors. 🎉

