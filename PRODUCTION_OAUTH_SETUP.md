# 🚀 Production OAuth Setup Guide

## Understanding Redirect URIs

### ✅ What Works NOW (Development)

For **local development**, you need:

**Authorized JavaScript origins:**
```
http://localhost:3000
```

**Authorized redirect URIs:**
```
http://localhost:3000
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

**The Supabase callback URL works for BOTH development AND production!** ✅

---

## ⚠️ What You Need to ADD for Production

When you deploy your app to production, you need to **ADD** your production domain to Google OAuth settings.

### Step 1: Deploy Your App First

Deploy your BlessedBump app to your hosting provider (Netlify, Vercel, etc.)
- You'll get a production URL like: `https://blessedbump.com` or `https://blessedbump.netlify.app`

### Step 2: Add Production URLs to Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID (e.g., "BlessedBump Web")
4. In **Authorized JavaScript origins**, click **"+ ADD URI"** and add:
   ```
   https://your-production-domain.com
   ```
   (Replace with your actual production domain)

5. In **Authorized redirect URIs**, click **"+ ADD URI"** and add:
   ```
   https://your-production-domain.com
   ```
   (Replace with your actual production domain)

6. **IMPORTANT**: Keep the Supabase callback URL! It's already there:
   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```
   ✅ This one works for both dev AND production - don't remove it!

7. Click **"Save"**

---

## 📋 Complete Redirect URI Configuration

### For Development (Current Setup)

**Authorized JavaScript origins:**
```
http://localhost:3000
```

**Authorized redirect URIs:**
```
http://localhost:3000
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

### For Production (After Deployment)

**Authorized JavaScript origins:**
```
http://localhost:3000
https://your-production-domain.com
```

**Authorized redirect URIs:**
```
http://localhost:3000
https://your-production-domain.com
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

---

## 🔍 Understanding Each URI

### 1. `http://localhost:3000`
- **Purpose**: For local development
- **When**: Only needed when testing locally
- **Keep it?**: Yes (useful for future development)

### 2. `https://your-production-domain.com`
- **Purpose**: Your live production website
- **When**: After you deploy
- **Examples**: 
  - `https://blessedbump.com`
  - `https://blessedbump.netlify.app`
  - `https://blessedbump.vercel.app`

### 3. `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
- **Purpose**: Supabase OAuth callback (required!)
- **When**: ALWAYS needed (both dev and production)
- **Why**: Supabase handles the OAuth flow and redirects back to your app
- **Keep it?**: YES - This is critical and works for both environments!

---

## ✅ What Works in Production

### Current Setup (Development Only)
```
❌ Production website → Google login → Will FAIL
✅ Local development → Google login → Will WORK
```

### After Adding Production Domain
```
✅ Production website → Google login → Will WORK
✅ Local development → Google login → Will WORK
```

---

## 🎯 Quick Answer

**Question:** Will it work in production with current setup?

**Answer:** 
- ❌ **NO** - Your production website won't work with Google login
- ✅ **YES** - The Supabase callback URL works in production
- ⚠️ **BUT** - You still need to add your production domain

**You need to add your production domain URL after you deploy!**

---

## 📝 Step-by-Step: Production Setup

### 1. Deploy Your App
Deploy to Netlify/Vercel/your hosting provider
- Note your production URL: `https://your-domain.com`

### 2. Update Google OAuth Settings
- Go to Google Cloud Console → Credentials
- Edit your OAuth Client ID
- Add production domain to both:
  - Authorized JavaScript origins
  - Authorized redirect URIs
- **Keep** the Supabase callback URL (already there)
- Save

### 3. Update Supabase Site URL (Optional but Recommended)
- Go to Supabase Dashboard
- **Authentication** → **URL Configuration**
- **Site URL**: Update to your production domain
- This helps Supabase know where to redirect after login

### 4. Test Production
- Go to your production website
- Click "Sign in with Google"
- Should redirect to Google → Approve → Redirect back → Logged in! ✅

---

## 🔄 Development vs Production

| Environment | JavaScript Origin | Redirect URI | Supabase Callback |
|------------|-------------------|--------------|-------------------|
| **Development** | `http://localhost:3000` | `http://localhost:3000` | `https://PROJECT.supabase.co/auth/v1/callback` |
| **Production** | `https://yourdomain.com` | `https://yourdomain.com` | `https://PROJECT.supabase.co/auth/v1/callback` |

**Note:** The Supabase callback URL is the SAME for both! ✅

---

## 💡 Pro Tips

1. **Add multiple production URLs** if you have:
   - Main domain: `https://blessedbump.com`
   - www version: `https://www.blessedbump.com`
   - Staging: `https://staging.blessedbump.com`

2. **Keep localhost** even in production - useful for testing

3. **Supabase callback stays the same** - don't change it!

4. **Test after deployment** - always verify Google login works on production

---

## ⚡ Quick Checklist

**Before Deployment (Current):**
- [x] localhost:3000 added
- [x] Supabase callback URL added
- [ ] Production domain (not needed yet)

**After Deployment:**
- [x] localhost:3000 (keep it)
- [x] Supabase callback URL (keep it)
- [ ] Add production domain to Google OAuth
- [ ] Update Supabase Site URL (optional)
- [ ] Test Google login on production

---

## 🎉 Summary

**Current Setup:**
- ✅ Works for local development
- ❌ Won't work in production (yet)

**After Adding Production Domain:**
- ✅ Works for local development
- ✅ Works in production
- ✅ Supabase callback works everywhere

**Action Required:**
1. Deploy your app
2. Add production domain to Google OAuth settings
3. Test!

The Supabase callback URL (`https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`) is the magic URL that works for both development AND production - you only need to add it once! 🚀

