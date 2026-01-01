# 🔍 Google Login Debugging Steps

## 🐛 Issue: Session Not Persisting After Google Login

**Symptom:** After Google OAuth, loading screen shows too long, and after refresh user is back at login page.

---

## 🔍 Debug Steps (Please Run These):

### **Step 1: Check Browser Console**

1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Clear console (clear icon)
4. Try Google login again
5. **Copy ALL console messages** and share them

**Look for:**
- `Auth state changed: SIGNED_IN` ✅ Good
- `Auth state changed: INITIAL_SESSION` ✅ Good
- `Session exists` ✅ Good
- Any error messages ❌ Problem

---

### **Step 2: Check Network Tab**

1. Developer Tools → **Network** tab
2. Clear network log
3. Try Google login
4. Look for these requests:

**Check these URLs:**
- `supabase.co/auth/v1/callback` → Status should be **200 OK**
- `supabase.co/auth/v1/token` → Status should be **200 OK**

**If you see 401/403/500:** There's an authentication error
**If you see 200:** Request succeeded, but session might not be saved

---

### **Step 3: Check URL After Google Redirect**

**After clicking "Sign in with Google" and coming back:**

1. Check the URL in address bar
2. **Does it have `#access_token=...` in it?**
   - ✅ Yes → Good, session should be detected
   - ❌ No → Problem with OAuth callback

3. **After a few seconds, does the URL clean up?**
   - ✅ Yes → Good
   - ❌ No → URL cleanup might not be working

---

### **Step 4: Check localStorage**

1. Developer Tools → **Application** tab (Chrome) or **Storage** tab (Firefox)
2. Click **Local Storage** → `http://localhost:3000`
3. Look for keys starting with `sb-`:
   - `sb-dxfivbgzrkdkrolfnjdo-auth-token`
   - Other `sb-` keys

**After Google login:**
- ✅ Keys exist → Session is stored, but might not be restored
- ❌ No keys → Session isn't being saved

---

### **Step 5: Manual Session Check**

**Run this in browser console (F12 → Console):**

```javascript
// Check if Supabase is available
console.log('Supabase:', typeof window.supabase !== 'undefined' ? 'Available' : 'Not found');

// Check current session
const { data, error } = await window.supabase.auth.getSession();
console.log('Session:', data.session);
console.log('Session User:', data.session?.user);
console.log('Error:', error);

// Check localStorage
console.log('LocalStorage keys:', Object.keys(localStorage).filter(k => k.startsWith('sb-')));
```

**Share the output!**

---

### **Step 6: Check Supabase Dashboard**

1. Go to Supabase Dashboard
2. **Authentication** → **Users**
3. **Is a new user created** with your Google email?
   - ✅ Yes → User was created, but session issue
   - ❌ No → OAuth callback failed

---

## 🛠️ Common Issues & Fixes

### **Issue 1: Supabase Site URL Not Set**

**Check:**
- Supabase Dashboard → Authentication → URL Configuration
- **Site URL:** Should be `http://localhost:3000` (for dev)
- **Redirect URLs:** Should include `http://localhost:3000/**`

**Fix:**
1. Set Site URL to `http://localhost:3000`
2. Add redirect URL: `http://localhost:3000/**`
3. Save
4. Try login again

---

### **Issue 2: Google OAuth Redirect URI Mismatch**

**Check:**
- Google Cloud Console → Credentials
- Your OAuth Client ID
- **Authorized redirect URIs** should include:
  - `https://dxfivbgzrkdkrolfnjdo.supabase.co/auth/v1/callback`

---

### **Issue 3: Session Not Being Saved**

**Possible causes:**
- Browser blocking cookies/localStorage
- Private/Incognito mode
- Browser extensions blocking storage

**Fix:**
- Try in normal (non-incognito) mode
- Disable browser extensions
- Check browser settings for cookie/storage permissions

---

## ✅ What I've Fixed:

1. ✅ Added timeout to OAuth callback loader (max 8-10 seconds)
2. ✅ Increased session fetch timeout (5s → 8s)
3. ✅ Increased initialization timeout (10s → 15s)
4. ✅ Better error handling

---

## 📋 Please Share:

1. **Console messages** (all of them after trying Google login)
2. **Network tab** - Status codes for Supabase requests
3. **URL after redirect** - What does it look like?
4. **localStorage** - Are there any `sb-` keys?
5. **Supabase Dashboard** - Is user created?

**This will help me identify the exact issue!** 🔍

