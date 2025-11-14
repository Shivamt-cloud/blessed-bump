# Village Voice Seed Data - Instructions

## 📋 Overview

This document provides SQL scripts to populate the Village Voice community with sample conversations. This makes the community look active and helps new users understand what to expect.

## ✅ Recommendation: **YES, Add to Database**

**Why this is a good approach:**
- ✅ Makes community look active and welcoming
- ✅ Users can interact with sample posts (reply, learn from them)
- ✅ Common practice in community platforms
- ✅ Helps new users understand the platform
- ✅ Can be filtered or marked later if needed

## 🎯 Topics Structure

The community has 4 main topics:
1. **Pregnancy Journey** (`pregnancy-journey`)
2. **Trying to Conceive** (`trying-to-conceive`)
3. **Baby Care** (`baby-care`)
4. **Birth Month Clubs** (`birth-month-clubs`)

Each topic has 2 thread types:
- **Ask & Wonder** (`question`) - Questions and support
- **Share & Uplift** (`feedback`) - Celebrations and encouragement

## 📝 How to Add Seed Data

### Option 1: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the SQL scripts below
4. Run them one by one

### Option 2: Using a Seed Script

We'll create a utility script you can run once to populate the data.

## ⚠️ Important Notes

1. **Author IDs**: You'll need to replace `'SEED_USER_ID'` with actual user IDs from your `auth.users` table, OR create a system user first
2. **Topic IDs**: Replace `'TOPIC_ID'` with actual topic IDs from your `topics` table
3. **Run Once**: Only run these scripts once to avoid duplicates
4. **Realistic Data**: All conversations are realistic and helpful

## 🔧 Step-by-Step Instructions

### Step 1: Get Your Topic IDs

Run this in Supabase SQL Editor:
```sql
SELECT id, name, slug FROM topics ORDER BY name;
```

Note down the IDs for:
- Pregnancy Journey
- Trying to Conceive
- Baby Care
- Birth Month Clubs

### Step 2: Create a System User (Optional)

If you want seed posts to have a consistent author, create a system user:

```sql
-- This creates a system user for seed data
-- You can skip this if you want to use real user IDs
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'community@blessedbump.in',
  crypt('seed_password_123', gen_salt('bf')),
  now(),
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Create profile for system user
INSERT INTO profiles (
  user_id,
  email,
  display_name,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'community@blessedbump.in',
  'BlessedBump Community',
  now(),
  now()
) ON CONFLICT (user_id) DO NOTHING;
```

### Step 3: Run Seed Data Scripts

Use the SQL scripts provided in the next section. Replace:
- `'SEED_USER_ID'` with your system user ID or real user IDs
- `'TOPIC_ID_PREGNANCY'` with actual topic ID
- `'TOPIC_ID_TTC'` with actual topic ID
- `'TOPIC_ID_BABY'` with actual topic ID
- `'TOPIC_ID_BIRTH_MONTH'` with actual topic ID

---

## 📊 Seed Data Statistics

- **Total Threads**: 60-80 threads (15-20 per topic)
- **Total Posts**: 120-160 posts (2-3 replies per thread)
- **Coverage**: All 4 topics × 2 thread types

---

**Next**: See the SQL scripts in the following files:
- `SEED_DATA_PREGNANCY_JOURNEY.sql`
- `SEED_DATA_TTC.sql`
- `SEED_DATA_BABY_CARE.sql`
- `SEED_DATA_BIRTH_MONTH.sql`

