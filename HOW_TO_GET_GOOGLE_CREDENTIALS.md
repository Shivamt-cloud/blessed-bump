# 🔑 How to Get Google OAuth Credentials (Client ID & Client Secret)

This is a step-by-step guide to get your Google OAuth credentials for Google login.

---

## 📋 Step-by-Step Instructions

### Step 1: Go to Google Cloud Console

1. Open your browser
2. Go to: **https://console.cloud.google.com/**
3. Sign in with your Google account

---

### Step 2: Create or Select a Project

**Option A: Create New Project (Recommended)**
1. Click the **project dropdown** at the top (next to "Google Cloud")
2. Click **"New Project"**
3. Enter project name: `BlessedBump` (or any name you prefer)
4. Click **"Create"**
5. Wait a few seconds for project to be created
6. Select the newly created project from the dropdown

**Option B: Select Existing Project**
1. Click the **project dropdown** at the top
2. Select your existing project from the list

---

### Step 3: Enable Google+ API (Required)

1. In the left sidebar, click **"APIs & Services"** → **"Library"**
   - (If you don't see it, click the ☰ menu icon first)
2. In the search box, type: **"Google+ API"** or **"Google Identity Services API"**
3. Click on **"Google+ API"** from the results
4. Click the blue **"Enable"** button
5. Wait for it to enable (you'll see a checkmark)

**Note:** Google Identity Services API is the newer version. Either one works.

---

### Step 4: Configure OAuth Consent Screen

This is required before you can create OAuth credentials.

1. In the left sidebar, click **"APIs & Services"** → **"OAuth consent screen"**
2. You'll see a form. Fill it out:

   **User Type:**
   - Select **"External"** (for testing/development)
   - Click **"Create"**

   **App Information:**
   - **App name**: `BlessedBump`
   - **User support email**: Select your email from dropdown (or add one)
   - **App logo**: (Optional - you can skip this)
   - Click **"Save and Continue"**

   **Scopes:**
   - Click **"Add or Remove Scopes"**
   - Check these scopes:
     - ✅ `email`
     - ✅ `profile`
     - ✅ `openid`
   - Click **"Update"**
   - Click **"Save and Continue"**

   **Test users:** (Optional for now)
   - You can skip this step
   - Click **"Save and Continue"**

   **Summary:**
   - Review your settings
   - Click **"Back to Dashboard"**

---

### Step 5: Create OAuth 2.0 Credentials

This is where you'll get your Client ID and Client Secret!

1. In the left sidebar, click **"APIs & Services"** → **"Credentials"**
2. Click the blue **"+ CREATE CREDENTIALS"** button at the top
3. Select **"OAuth client ID"** from the dropdown

   If you see a warning about OAuth consent screen, you need to complete Step 4 first.

4. **Application type:** Select **"Web application"**

5. **Name:** Enter `BlessedBump Web` (or any name)

6. **Authorized JavaScript origins:**
   Click **"+ ADD URI"** and add:
   ```
   http://localhost:3000
   ```
   (Add your production domain later when you deploy)

7. **Authorized redirect URIs:**
   Click **"+ ADD URI"** and add these:
   
   **For Development:**
   ```
   http://localhost:3000
   ```
   
   **For Supabase (IMPORTANT):**
   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```
   
   ⚠️ **Replace `YOUR_PROJECT_REF` with your actual Supabase project reference**
   
   **How to find your Supabase project reference:**
   - Go to [Supabase Dashboard](https://app.supabase.com/)
   - Select your project
   - Go to **Settings** → **API**
   - Look at **Project URL**: `https://abcdefghijklmnop.supabase.co`
   - The part `abcdefghijklmnop` is your project reference
   - So your redirect URI should be: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`

8. Click **"Create"** button

---

### Step 6: Copy Your Credentials! 🎉

After clicking "Create", a popup will appear with your credentials:

**What you'll see:**
```
Your Client ID
123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com

Your Client Secret
GOCSPX-abcdefghijklmnopqrstuvwxyz123456
```

**⚠️ IMPORTANT:**
1. **Copy both values** (Client ID and Client Secret)
2. **Save them somewhere safe** (password manager, notes app, etc.)
3. You can close the popup (you can view them again later if needed)

**You'll need these in the next step (Supabase configuration)!**

---

### Step 7: View Credentials Again (If Needed)

If you closed the popup and need to see your credentials again:

1. Go to **"APIs & Services"** → **"Credentials"**
2. Find your OAuth 2.0 Client ID (the name you gave it, e.g., "BlessedBump Web")
3. Click on it to view details
4. You can see:
   - **Client ID**: Click the copy icon to copy
   - **Client Secret**: Click "Show" next to it, then copy

---

## 📝 Quick Summary

1. ✅ Go to Google Cloud Console
2. ✅ Create/Select project
3. ✅ Enable Google+ API
4. ✅ Configure OAuth consent screen
5. ✅ Create OAuth 2.0 Client ID (Web application)
6. ✅ Add redirect URIs (including Supabase callback)
7. ✅ **Copy Client ID and Client Secret**
8. ✅ Use them in Supabase (next step)

---

## 🔒 Security Notes

- **Never share** your Client Secret publicly
- **Never commit** credentials to Git
- Keep them in environment variables or secure storage
- The Client ID is safe to share (it's public)
- The Client Secret must be kept private

---

## 🐛 Troubleshooting

### "OAuth consent screen is not configured"
**Solution:** Complete Step 4 (Configure OAuth Consent Screen) first.

### "Invalid redirect URI"
**Solution:** 
- Make sure the redirect URI in Google Console matches exactly
- Must include: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
- No extra spaces or characters
- Case-sensitive

### Can't find "APIs & Services"
**Solution:** 
- Click the ☰ (hamburger menu) icon in the top left
- Look for "APIs & Services" in the menu

### Don't see "Credentials" option
**Solution:**
- Make sure you're in the correct project
- The menu might be collapsed - click to expand

---

## ✅ Next Step

Once you have your **Client ID** and **Client Secret**:

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Google** and enable it
5. Paste your **Client ID** and **Client Secret**
6. Click **Save**

Then Google login will work! 🚀

---

## 📸 Visual Guide Locations

**Google Cloud Console Navigation:**
```
Google Cloud Console
├── ☰ Menu
│   └── APIs & Services
│       ├── Library (for enabling APIs)
│       ├── OAuth consent screen (required setup)
│       └── Credentials (where you create/get credentials)
```

---

**Need Help?**
- [Google Cloud Console Help](https://cloud.google.com/docs)
- [OAuth 2.0 Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- Check the console for any error messages

