# 🔑 Create OAuth 2.0 Credentials - Step-by-Step

You're seeing "You haven't configured any OAuth clients" - this is normal! Now you need to create the credentials.

---

## 📍 Step 1: Go to Credentials

1. **In the left sidebar menu**, look for **"APIs & Services"**
2. Click on **"APIs & Services"**
3. Click on **"Credentials"** (in the submenu)

OR

1. Look for a button that says **"+ CREATE CREDENTIALS"** on the current page
2. Click it

---

## 📍 Step 2: Create OAuth Client ID

1. **Click the blue button:** **"+ CREATE CREDENTIALS"**
2. **Select from dropdown:** **"OAuth client ID"**

If you see a message about OAuth consent screen, that's fine - you already configured it!

---

## 📍 Step 3: Fill Out the Form

### Application type
**Select:** `Web application`

### Name
**Enter:** `BlessedBump Web`
(Or any name you prefer)

### Authorized JavaScript origins
**Click "+ ADD URI"** and add:
```
http://localhost:3000
```

### Authorized redirect URIs
**Click "+ ADD URI"** and add these TWO URLs:

**1. For Development:**
```
http://localhost:3000
```

**2. For Supabase (IMPORTANT!):**
```
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

⚠️ **Replace `YOUR_PROJECT_REF` with your actual Supabase project reference**

**How to find your Supabase project reference:**
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **Settings** → **API**
4. Look at **Project URL**: `https://abcdefghijklmnop.supabase.co`
5. The part `abcdefghijklmnop` is your project reference
6. So your redirect URI should be: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`

---

## 📍 Step 4: Create and Copy Credentials

1. **Click the "Create" button** at the bottom

2. **A popup will appear** with your credentials:

   ```
   Your Client ID
   123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
   
   Your Client Secret
   GOCSPX-abcdefghijklmnopqrstuvwxyz123456
   ```

3. **⚠️ IMPORTANT: Copy both values NOW!**
   - Copy the **Client ID**
   - Copy the **Client Secret**
   - Save them somewhere safe (notes app, password manager, etc.)
   - You'll need these in the next step (Supabase configuration)

4. **Click "OK"** to close the popup

---

## 📋 Complete Form Example

```
Application type: Web application
Name: BlessedBump Web

Authorized JavaScript origins:
- http://localhost:3000

Authorized redirect URIs:
- http://localhost:3000
- https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

---

## ✅ What You'll Get

After clicking "Create", you'll receive:

1. **Client ID** (Public - safe to share)
   - Looks like: `123456789-abc...apps.googleusercontent.com`
   - This is your OAuth Client ID

2. **Client Secret** (Private - keep secret!)
   - Looks like: `GOCSPX-abc...xyz123456`
   - This is your OAuth Client Secret

**Save both!** You'll need them for Supabase configuration.

---

## 🎯 Quick Checklist

- [ ] Clicked "+ CREATE CREDENTIALS"
- [ ] Selected "OAuth client ID"
- [ ] Application type: Web application
- [ ] Name: BlessedBump Web
- [ ] Added: `http://localhost:3000` to JavaScript origins
- [ ] Added: `http://localhost:3000` to redirect URIs
- [ ] Added: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback` to redirect URIs
- [ ] Clicked "Create"
- [ ] Copied Client ID
- [ ] Copied Client Secret
- [ ] Saved credentials somewhere safe

---

## 🔄 Next Step

After you have your Client ID and Client Secret:

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Google** and enable it
5. Paste your **Client ID** and **Client Secret**
6. Click **Save**

Then Google login will work! 🚀

---

## 💡 Pro Tips

1. **Don't close the popup** until you've copied both credentials
2. **Save them immediately** - you can view them again later, but it's easier to copy now
3. **The Supabase redirect URI is critical** - make sure you add it correctly
4. **You can add more redirect URIs later** (for production domain)

---

**Ready? Click "+ CREATE CREDENTIALS" and follow the steps above!** 🎯

