# ✅ Final OAuth Configuration - Complete Setup

## Your Supabase Project Reference: `dxfivbgzrkdkrolfnjdo`

Perfect! Now here's your **complete, exact configuration** for Google OAuth:

---

## 📋 Complete Google OAuth Form Configuration

### 1. Application type
```
Web application
```

### 2. Name
```
BlessedBump Web
```

### 3. Authorized JavaScript origins

Click **"+ ADD URI"** and add these **TWO**:

```
http://localhost:3000
https://blessedbump.in
```

---

### 4. Authorized redirect URIs

Click **"+ ADD URI"** and add these **THREE**:

```
http://localhost:3000
https://blessedbump.in
https://dxfivbgzrkdkrolfnjdo.supabase.co/auth/v1/callback
```

---

## ✅ Complete List (Copy-Paste Ready)

### Authorized JavaScript origins:
```
http://localhost:3000
https://blessedbump.in
```

### Authorized redirect URIs:
```
http://localhost:3000
https://blessedbump.in
https://dxfivbgzrkdkrolfnjdo.supabase.co/auth/v1/callback
```

---

## 🎯 Step-by-Step in Google Cloud Console

1. **Application type:** Select `Web application`

2. **Name:** Type `BlessedBump Web`

3. **Authorized JavaScript origins:**
   - Click "+ ADD URI"
   - Type: `http://localhost:3000`
   - Click "+ ADD URI" again
   - Type: `https://blessedbump.in`

4. **Authorized redirect URIs:**
   - Click "+ ADD URI"
   - Type: `http://localhost:3000`
   - Click "+ ADD URI" again
   - Type: `https://blessedbump.in`
   - Click "+ ADD URI" again
   - Type: `https://dxfivbgzrkdkrolfnjdo.supabase.co/auth/v1/callback`

5. **Click "Create"** button

6. **Copy your credentials:**
   - Client ID
   - Client Secret
   - Save them!

---

## ✅ Checklist

- [ ] Application type: Web application
- [ ] Name: BlessedBump Web
- [ ] JavaScript origin: `http://localhost:3000` ✓
- [ ] JavaScript origin: `https://blessedbump.in` ✓
- [ ] Redirect URI: `http://localhost:3000` ✓
- [ ] Redirect URI: `https://blessedbump.in` ✓
- [ ] Redirect URI: `https://dxfivbgzrkdkrolfnjdo.supabase.co/auth/v1/callback` ✓
- [ ] Clicked "Create"
- [ ] Copied Client ID
- [ ] Copied Client Secret

---

## 🚀 Next Step: Configure Supabase

After you get your Google OAuth credentials:

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to: **Authentication** → **Providers**
4. Find **Google** and click to enable it
5. Enter your credentials:
   - **Client ID (for OAuth):** [Paste your Google Client ID]
   - **Client Secret (for OAuth):** [Paste your Google Client Secret]
6. Click **Save**

Then Google login will work on:
- ✅ `http://localhost:3000` (development)
- ✅ `https://blessedbump.in` (production)

---

## 🎉 Summary

**Your Supabase Project:** `dxfivbgzrkdkrolfnjdo`

**Your OAuth Redirect URI:**
```
https://dxfivbgzrkdkrolfnjdo.supabase.co/auth/v1/callback
```

**Fill out the Google OAuth form with the URLs above, then you're done!** 🚀

