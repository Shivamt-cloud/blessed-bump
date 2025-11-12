# How to Find Your Supabase Credentials

## Step-by-Step Guide

### 1. Go to Supabase Dashboard
- Visit: https://app.supabase.com
- Log in to your account

### 2. Select Your Project
- Click on your project: **blessed-bump**
- If you don't see it, make sure you're in the correct organization

### 3. Get Your Project URL
1. In the left sidebar, click **Settings** (gear icon at the bottom)
2. Click **API** in the settings menu
3. Under **Project URL**, you'll see something like:
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
4. **Copy this entire URL** - this is your `VITE_SUPABASE_URL`

### 4. Get Your Anon Key
1. Still in **Settings** → **API**
2. Scroll down to **Project API keys**
3. Find the **anon** or **public** key
4. It will look like:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NzE2ODAwMCwiZXhwIjoxOTYyNzQ0MDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
5. **Copy this entire key** - this is your `VITE_SUPABASE_ANON_KEY`

### 5. Add to Netlify
1. Go back to Netlify
2. Navigate to: **Project configuration** → **Environment variables**
3. Add both variables:
   - `VITE_SUPABASE_URL` = (paste the URL from step 3)
   - `VITE_SUPABASE_ANON_KEY` = (paste the key from step 4)

## Important Notes

⚠️ **Security:**
- The **anon key** is safe to use in frontend code (it's public)
- Never share your **service_role** key (keep it secret)
- The anon key has Row Level Security (RLS) protection

✅ **What You Need:**
- **Project URL** - Your Supabase project endpoint
- **anon/public key** - For client-side authentication

❌ **What You DON'T Need:**
- service_role key (server-side only, keep secret)
- JWT secret (internal use only)

## Quick Checklist

- [ ] Opened Supabase Dashboard
- [ ] Selected blessed-bump project
- [ ] Went to Settings → API
- [ ] Copied Project URL
- [ ] Copied anon/public key
- [ ] Added both to Netlify environment variables
- [ ] Triggered a new deploy in Netlify

