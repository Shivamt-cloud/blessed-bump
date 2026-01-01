# 🔑 Complete OAuth Configuration for BlessedBump

## Production URL: https://blessedbump.in

Here's your complete configuration for Google OAuth credentials:

---

## 📋 Step-by-Step Form Fill-Out

### 1. Application type
```
Select: Web application
```

### 2. Name
```
Enter: BlessedBump Web
```

### 3. Authorized JavaScript origins

Click **"+ ADD URI"** and add **BOTH**:

```
http://localhost:3000
https://blessedbump.in
```

**How to add:**
1. Click "+ ADD URI" button
2. Type: `http://localhost:3000`
3. Click "+ ADD URI" again
4. Type: `https://blessedbump.in`

---

### 4. Authorized redirect URIs

Click **"+ ADD URI"** and add **ALL THREE**:

```
http://localhost:3000
https://blessedbump.in
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

**How to add:**
1. Click "+ ADD URI" button
2. Type: `http://localhost:3000`
3. Click "+ ADD URI" again
4. Type: `https://blessedbump.in`
5. Click "+ ADD URI" again
6. Type: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   - ⚠️ Replace `YOUR_PROJECT_REF` with your actual Supabase project reference

---

## ✅ Complete Configuration Summary

```
Application type: Web application
Name: BlessedBump Web

Authorized JavaScript origins:
✓ http://localhost:3000
✓ https://blessedbump.in

Authorized redirect URIs:
✓ http://localhost:3000
✓ https://blessedbump.in
✓ https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

---

## 🔍 How to Find Your Supabase Project Reference

If you don't know your Supabase project reference yet:

1. Go to: [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to: **Settings** → **API**
4. Look at **Project URL**: It will look like:
   ```
   https://abcdefghijklmnop.supabase.co
   ```
5. The part `abcdefghijklmnop` is your project reference
6. So your redirect URI should be:
   ```
   https://abcdefghijklmnop.supabase.co/auth/v1/callback
   ```

---

## 📝 Exact URLs to Copy-Paste

### Authorized JavaScript origins:
```
http://localhost:3000
https://blessedbump.in
```

### Authorized redirect URIs:
```
http://localhost:3000
https://blessedbump.in
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```
(Replace YOUR_PROJECT_REF with your actual value)

---

## ✅ After Filling the Form

1. **Click "Create"** button at the bottom
2. **Copy your credentials** from the popup:
   - Client ID
   - Client Secret
3. **Save them** - you'll need them for Supabase configuration

---

## 🎯 Quick Checklist

- [ ] Application type: Web application
- [ ] Name: BlessedBump Web
- [ ] JavaScript origins: `http://localhost:3000` ✓
- [ ] JavaScript origins: `https://blessedbump.in` ✓
- [ ] Redirect URI: `http://localhost:3000` ✓
- [ ] Redirect URI: `https://blessedbump.in` ✓
- [ ] Redirect URI: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback` ✓
- [ ] Clicked "Create"
- [ ] Copied Client ID
- [ ] Copied Client Secret

---

## 🚀 Next Steps

After you get your credentials:

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. **Authentication** → **Providers** → **Google**
3. Enable Google provider
4. Paste your **Client ID** and **Client Secret**
5. Click **Save**

Then Google login will work on both:
- ✅ `http://localhost:3000` (development)
- ✅ `https://blessedbump.in` (production)

---

**Fill out the form with the URLs above, then click "Create"!** 🎯

