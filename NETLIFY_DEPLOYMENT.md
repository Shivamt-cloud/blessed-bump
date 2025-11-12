# Netlify Deployment Guide for BlessedBump

## Prerequisites

1. GitHub repository connected to Netlify
2. Supabase project created
3. Supabase Project URL and Anon Key

## Step 1: Set Environment Variables in Netlify

**CRITICAL:** The app requires these environment variables to work properly.

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site (blessed-bump)
3. Go to **Site settings** → **Environment variables**
4. Click **Add variable** and add these two variables:

   ```
   VITE_SUPABASE_URL = your_supabase_project_url
   VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
   ```

   Example:
   ```
   VITE_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. **Save** the variables

## Step 2: Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Select your project (blessed-bump)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use for `VITE_SUPABASE_URL`
   - **anon/public key** → Use for `VITE_SUPABASE_ANON_KEY`

## Step 3: Verify Build Settings

Netlify should automatically detect the build settings from `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18 (or higher)

If not set automatically:
1. Go to **Site settings** → **Build & deploy**
2. Set:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Step 4: Trigger a New Deploy

After setting environment variables:

1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** → **Deploy site**
3. Wait for the build to complete (usually 1-2 minutes)

## Step 5: Verify Deployment

1. Open your Netlify site URL (e.g., https://blessed-bump.netlify.app)
2. Open browser console (F12)
3. Check for any errors:
   - If you see "Supabase environment variables are missing!" → Environment variables are not set correctly
   - If you see other errors → Check the error message

## Troubleshooting

### Issue: Blank page on Netlify

**Possible causes:**
1. Environment variables not set
2. Environment variables have incorrect values
3. Build failed

**Solution:**
1. Check Netlify build logs for errors
2. Verify environment variables are set correctly
3. Check browser console for error messages
4. Ensure Supabase project is active and accessible

### Issue: "Supabase environment variables are missing!"

**Solution:**
1. Go to Netlify → Site settings → Environment variables
2. Verify both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
3. Make sure there are no extra spaces or quotes
4. Trigger a new deploy after adding variables

### Issue: Authentication not working

**Possible causes:**
1. Supabase Auth settings not configured
2. Email provider not enabled in Supabase
3. RLS policies not set up correctly

**Solution:**
1. Check Supabase → Authentication → Providers
2. Ensure Email provider is enabled
3. Check Supabase → Authentication → URL Configuration
4. Verify redirect URLs include your Netlify domain

### Issue: Database connection errors

**Possible causes:**
1. RLS policies blocking access
2. Database tables not created
3. Foreign key relationships not set up

**Solution:**
1. Check Supabase → Database → Tables
2. Verify all tables exist: `profiles`, `topics`, `threads`, `posts`, `fertility_logs`
3. Check RLS policies are enabled and configured correctly
4. Verify foreign key relationships are set up

## Environment Variables Reference

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Supabase Dashboard → Settings → API → anon public |

## Important Notes

- ⚠️ **Never commit `.env.local` file** - It contains sensitive keys
- ✅ Environment variables in Netlify are encrypted and secure
- ✅ Each deploy uses the latest environment variables
- ✅ Changes to environment variables require a new deploy

## Testing Locally

For local development, create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then run:
```bash
npm run dev
```

## Support

If you encounter issues:
1. Check Netlify build logs
2. Check browser console for errors
3. Verify Supabase project is active
4. Ensure all environment variables are set correctly

