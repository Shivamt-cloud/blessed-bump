# 🔐 Google Login Setup Guide

## ✅ Yes, Google/Gmail Login is Possible!

Your app uses **Supabase**, which has built-in OAuth support including Google. This guide will help you set it up.

---

## 📋 Prerequisites

1. **Supabase Account** - You already have this
2. **Google Cloud Console Account** - Free, we'll set this up
3. **Your App Domain** - For production (localhost works for development)

---

## 🔧 Step 1: Set Up Google OAuth in Google Cloud Console

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Name it (e.g., "BlessedBump")
4. Click **"Create"**

### 1.2 Enable Google+ API
1. Go to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"**
3. Click on it and click **"Enable"**

### 1.3 Create OAuth 2.0 Credentials
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
3. If prompted, configure the OAuth consent screen:
   - Choose **"External"** (for testing)
   - Fill in required fields:
     - App name: `BlessedBump`
     - User support email: Your email
     - Developer contact: Your email
   - Click **"Save and Continue"**
   - Add scopes: `email`, `profile`
   - Click **"Save and Continue"**
   - Add test users (optional for now)
   - Click **"Save and Continue"** → **"Back to Dashboard"**

4. Create OAuth Client ID:
   - Application type: **"Web application"**
   - Name: `BlessedBump Web`
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production - add your actual domain)
   - Authorized redirect URIs:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
     - **IMPORTANT**: Also add your Supabase redirect URL:
       - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
       - Replace `YOUR_PROJECT_REF` with your Supabase project reference
   - Click **"Create"**

5. **Copy your credentials:**
   - **Client ID** (looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)
   - **Client Secret** (looks like: `GOCSPX-abcdefghijklmnopqrstuvwxyz`)

---

## 🔧 Step 2: Configure Supabase

### 2.1 Enable Google Provider in Supabase
1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **"Authentication"** → **"Providers"**
4. Find **"Google"** and click to enable it
5. Enter your Google OAuth credentials:
   - **Client ID (for OAuth)**: Paste your Google Client ID
   - **Client Secret (for OAuth)**: Paste your Google Client Secret
6. Click **"Save"**

### 2.2 Get Your Supabase Redirect URL
1. In Supabase Dashboard → **"Authentication"** → **"URL Configuration"**
2. Copy the **"Site URL"** (this should match your app URL)
3. The redirect URL format is: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   - You can find YOUR_PROJECT_REF in your Supabase project settings

---

## ✅ Step 3: Code Implementation

The code has been updated to support Google login! Here's what was added:

### Features Added:
1. ✅ `loginWithGoogle()` function in AuthContext
2. ✅ Google login button in Login page
3. ✅ Google login button in AuthOverlay (modal)
4. ✅ Automatic profile creation for Google users

### How It Works:
- User clicks "Sign in with Google" button
- Redirects to Google OAuth consent screen
- User approves
- Google redirects back to your app via Supabase
- Supabase creates/updates user account
- User is automatically logged in

---

## 🎨 UI Changes

### Login Page (`/login`)
- Added "Sign in with Google" button above the email/password form
- Styled to match your app's design

### Auth Modal (AuthOverlay)
- Added "Sign in with Google" button
- Available in both login and signup views

---

## 🧪 Testing

### Local Development:
1. Make sure your Google OAuth redirect URI includes: `http://localhost:3000`
2. Start your dev server: `npm run dev`
3. Go to login page
4. Click "Sign in with Google"
5. Should redirect to Google → approve → redirect back → logged in!

### Production:
1. Add your production domain to Google OAuth authorized origins
2. Add your Supabase redirect URL to Google OAuth authorized redirect URIs
3. Update Supabase Site URL to your production domain
4. Deploy your app
5. Test Google login on production

---

## 🔒 Security Notes

1. **Never commit** Google Client Secret or Supabase keys to Git
2. Store secrets in environment variables
3. Use HTTPS in production (required for OAuth)
4. Keep your Google Cloud Console credentials secure

---

## 🐛 Troubleshooting

### "redirect_uri_mismatch" Error
- Check that your redirect URI in Google Console matches exactly
- Must include: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

### "unauthorized_client" Error
- Verify Client ID and Client Secret in Supabase match Google Console
- Check that Google+ API is enabled in Google Cloud Console

### User Not Created
- Check Supabase logs in Dashboard → Logs → Auth
- Verify profile creation triggers are set up (should be automatic)

---

## 📚 Additional Resources

- [Supabase OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 Docs](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Auth Help](https://supabase.com/docs/guides/auth)

---

## ✅ Summary

1. ✅ Create Google Cloud Project
2. ✅ Enable Google+ API
3. ✅ Create OAuth 2.0 credentials
4. ✅ Add redirect URIs (including Supabase callback)
5. ✅ Enable Google provider in Supabase
6. ✅ Enter credentials in Supabase
7. ✅ Test login!

**The code is ready - just need to configure Google Cloud Console and Supabase!** 🚀

