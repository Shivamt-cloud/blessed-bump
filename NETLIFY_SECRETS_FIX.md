# Fix: Netlify "Exposed Secrets" Error

## Problem
Netlify is detecting `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as exposed secrets and blocking the build.

## Why This Happens
Vite environment variables starting with `VITE_` are embedded in the client-side JavaScript bundle. Netlify's secret scanner detects these and flags them as potentially exposed secrets.

## Why It's Safe
- **VITE_SUPABASE_ANON_KEY**: This is the **anon/public key** - it's **designed** to be used in client-side code
- **VITE_SUPABASE_URL**: This is your public project URL - it's safe to expose
- Both are protected by Row Level Security (RLS) policies in Supabase

## Solution: Configure Netlify to Allow These Variables

### Option 1: Disable Secret Scanning for These Variables (Recommended)

1. Go to **Netlify Dashboard** → Your Site → **Site settings**
2. Navigate to **Build & deploy** → **Environment**
3. Scroll down to **Secret scanning** section
4. Click **Configure secret scanning**
5. Add these to the **Allowed secrets** list:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Save the settings
7. Trigger a new deploy

### Option 2: Disable Secret Scanning Entirely (Not Recommended)

1. Go to **Netlify Dashboard** → Your Site → **Site settings**
2. Navigate to **Build & deploy** → **Environment**
3. Scroll down to **Secret scanning**
4. Toggle **Enable secret scanning** to OFF
5. Save and redeploy

### Option 3: Use Netlify's Build Environment Variables

Instead of using `VITE_` prefix, you could:
1. Use regular environment variables in Netlify
2. Create a build script that injects them during build
3. This is more complex and not recommended for Vite projects

## Recommended Approach

**Use Option 1** - Add the variables to the allowed secrets list. This is the safest approach that maintains security scanning while allowing your legitimate client-side variables.

## Important Notes

- ✅ The **anon key** is safe to expose in client code
- ✅ The **project URL** is public information
- ❌ Never expose the **service_role key** (server-side only)
- ✅ Your data is protected by RLS policies in Supabase

## After Configuration

1. Save the settings in Netlify
2. Go to **Deploys** tab
3. Click **Trigger deploy** → **Deploy site**
4. The build should complete successfully

