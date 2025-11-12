# Netlify Support Request Template

## Subject
Disable secret scanning or allow VITE_ environment variables for Vite React app

## Message to Send

Hi Netlify Support,

I'm experiencing build failures due to Netlify's secret scanning detecting my `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables in the build output.

**Context:**
- I'm using Vite (a frontend build tool) for my React app
- Vite requires environment variables to be prefixed with `VITE_` to be included in the client bundle
- These variables are intentionally embedded in the JavaScript bundle (this is how Vite works)
- My site: blessed-bump.netlify.app
- Repository: github.com/Shivamt-cloud/blessed-bump

**Why these are safe:**
- `VITE_SUPABASE_ANON_KEY` is the anon/public key from Supabase - it's **designed** to be used in client-side code
- `VITE_SUPABASE_URL` is my public Supabase project URL
- Both are protected by Row Level Security (RLS) policies in Supabase
- This is a standard pattern for Vite/React apps using Supabase

**Error:**
```
Your build failed because we found potentially exposed secrets.
VITE_SUPABASE_ANON_KEY
VITE_SUPABASE_URL
```

**Request:**
Could you please either:
1. Disable secret scanning for my site (blessed-bump), OR
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to an allowed list for secret scanning

This is blocking my deployments. My previous deploy (commit d93b6d9) worked fine, so this seems to be a recent change in Netlify's scanning behavior.

Thank you!

---

## How to Contact Netlify Support

1. Go to: https://www.netlify.com/support/
2. Click "Contact Support" or "Get Help"
3. Fill out the form with the message above
4. Include your site URL: blessed-bump.netlify.app

## Alternative: Community Forum

You can also post in the Netlify Community:
- https://answers.netlify.com/
- Tag: #secret-scanning or #vite

