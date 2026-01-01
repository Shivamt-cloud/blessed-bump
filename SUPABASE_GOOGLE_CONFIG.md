# 🔐 Configure Google Login in Supabase

## ✅ You Have Your Google Client ID!

**Your Client ID:**
```
766325689196-gjsipgvj4p7c5k0rhq5vlfg43g5g1c0p.apps.googleusercontent.com
```

---

## ⚠️ Important: Do You Have Your Client Secret?

When you created the OAuth credentials, Google showed you **TWO** things:
1. ✅ **Client ID** (you have this)
2. ⚠️ **Client Secret** (do you have this?)

The Client Secret looks like: `GOCSPX-abcdefghijklmnopqrstuvwxyz123456`

**If you don't have it:**
- Go back to Google Cloud Console → Credentials
- Click on your OAuth Client ID (BlessedBump Web)
- Click "Show" next to Client Secret
- Copy it

---

## 🚀 Step-by-Step: Configure Supabase

### Step 1: Go to Supabase Dashboard

1. Go to: [Supabase Dashboard](https://app.supabase.com/)
2. **Sign in** (if not already)
3. **Select your project** (the one with project reference: `dxfivbgzrkdkrolfnjdo`)

---

### Step 2: Navigate to Authentication Providers

1. In the left sidebar, click **"Authentication"**
2. Click **"Providers"** (in the submenu)
3. You'll see a list of authentication providers

---

### Step 3: Enable Google Provider

1. **Find "Google"** in the list of providers
2. **Toggle it ON** (click the switch/button to enable it)
3. You'll see fields appear for credentials

---

### Step 4: Enter Your Google Credentials

You'll see two fields:

**1. Client ID (for OAuth):**
```
Paste: 766325689196-gjsipgvj4p7c5k0rhq5vlfg43g5g1c0p.apps.googleusercontent.com
```

**2. Client Secret (for OAuth):**
```
Paste: [Your Client Secret from Google]
```

---

### Step 5: Save

1. **Click "Save"** button
2. Wait for confirmation (you might see a success message)
3. Google provider should now show as **"Enabled"**

---

## ✅ Complete Configuration

**In Supabase Dashboard → Authentication → Providers → Google:**

```
☑️ Enabled: ON

Client ID (for OAuth):
766325689196-gjsipgvj4p7c5k0rhq5vlfg43g5g1c0p.apps.googleusercontent.com

Client Secret (for OAuth):
[Your Client Secret - starts with GOCSPX-]
```

---

## 🎯 Quick Checklist

- [ ] Went to Supabase Dashboard
- [ ] Selected correct project
- [ ] Authentication → Providers
- [ ] Found Google provider
- [ ] Enabled Google (toggled ON)
- [ ] Entered Client ID: `766325689196-gjsipgvj4p7c5k0rhq5vlfg43g5g1c0p.apps.googleusercontent.com`
- [ ] Entered Client Secret: `[Your Client Secret]`
- [ ] Clicked Save
- [ ] Saw confirmation/success message

---

## 🧪 Test Google Login

After saving, you can test:

1. **Go to your app:** `http://localhost:3000` (or `https://blessedbump.in`)
2. **Click "Sign in with Google"** button
3. **Should redirect to Google** → Approve → Redirect back → Logged in! ✅

---

## 🐛 Troubleshooting

### "Invalid credentials" error
- Double-check Client ID and Client Secret are correct
- Make sure no extra spaces when copying/pasting
- Verify credentials in Google Cloud Console match

### "redirect_uri_mismatch" error
- Check that redirect URI in Google Console includes:
  - `https://dxfivbgzrkdkrolfnjdo.supabase.co/auth/v1/callback`
- Must match exactly (no trailing slashes)

### Google login button doesn't appear
- Check that you saved in Supabase
- Refresh the page
- Check browser console for errors

---

## 🎉 Summary

**What You Have:**
- ✅ Google Client ID
- ⚠️ Need: Google Client Secret (if you don't have it)

**What to Do:**
1. Get your Client Secret (if needed)
2. Go to Supabase → Authentication → Providers → Google
3. Enable Google
4. Paste Client ID and Client Secret
5. Save
6. Test!

---

**Do you have your Client Secret? If yes, go ahead and configure Supabase! If not, let me know and I'll help you find it.** 🚀

