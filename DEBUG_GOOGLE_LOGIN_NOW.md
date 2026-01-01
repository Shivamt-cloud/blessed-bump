# 🔍 Debug Google Login - Step by Step

## 📋 Please Do This:

### **Step 1: Clear Console**
1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Click the **Clear** button (or press Ctrl+L / Cmd+L)
4. Make sure console is empty

### **Step 2: Start Google Login**
1. Click **"Sign in with Google"** button
2. Complete the Google OAuth flow
3. Wait for redirect back to the app

### **Step 3: Watch Console Messages**
**After you come back from Google, look for these messages in console:**

✅ **Good Signs:**
- `Auth state changed: SIGNED_IN Session exists`
- `Auth state changed: INITIAL_SESSION Session exists`
- Navigation shows: `User state changed: Object` with user data

❌ **Problem Signs:**
- `Auth state changed: SIGNED_IN No session`
- `Error syncing profile`
- Network errors in console
- No `SIGNED_IN` event at all

### **Step 4: Check Network Tab**
1. Go to **Network** tab
2. Look for requests to:
   - `supabase.co/auth/v1/callback` → Should be **200 OK**
   - `supabase.co/auth/v1/token` → Should be **200 OK**
   - Any **401, 403, 500** errors → Problem!

### **Step 5: Check localStorage**
**After Google login (while you're on the page):**

1. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
2. Click **Local Storage** → `http://localhost:3000`
3. Look for keys starting with `sb-`:
   - `sb-dxfivbgzrkdkrolfnjdo-auth-token`
   - `sb-dxfivbgzrkdkrolfnjdo-auth-code-verifier`
   - Other `sb-` keys

**Do these keys exist?**
- ✅ Yes → Session is stored, but might not be restored
- ❌ No → Session isn't being saved (this is the problem!)

---

## 📸 What to Share:

1. **ALL console messages** from Step 2 (after clicking Google login)
2. **Network tab** - Status codes for Supabase requests
3. **localStorage** - Do you see any `sb-` keys?
4. **What you see on screen:**
   - Loading screen? How long?
   - Are you logged in after?
   - Does navigation show your name/email?

---

## 🔍 Quick Check:

**Run this in console AFTER Google login (copy/paste):**

```javascript
// Check session
const { data, error } = await window.supabase.auth.getSession();
console.log('=== SESSION CHECK ===');
console.log('Session:', data.session);
console.log('User:', data.session?.user);
console.log('Error:', error);

// Check localStorage
console.log('=== LOCALSTORAGE CHECK ===');
const lsKeys = Object.keys(localStorage).filter(k => k.startsWith('sb-'));
console.log('Supabase keys:', lsKeys);
lsKeys.forEach(key => {
  console.log(key + ':', localStorage.getItem(key)?.substring(0, 100));
});
```

**Share the output!**

