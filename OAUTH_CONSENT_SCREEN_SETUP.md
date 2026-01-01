# 📝 OAuth Consent Screen Setup - Step-by-Step

You're on the right page! This is the OAuth Consent Screen configuration. Here's how to fill it out:

---

## Step 1: App Information

### App name
**What to enter:**
```
BlessedBump
```
- This is the name users will see when they log in with Google
- Keep it simple and clear
- This will appear in the Google login popup

### User support email
**What to enter:**
- Select your email from the dropdown
- OR click "Add" if you need to add a different email
- This is the email users can contact if they have questions about the login consent

**Example:**
- Your email: `your-email@gmail.com` (or whatever email you use for Google account)

### App logo (Optional)
- You can skip this for now
- Or upload your BlessedBump logo if you have one
- Recommended size: 120x120 pixels

### App domain (Optional)
- Skip this for now (not required for development)

### Authorized domains (Optional)
- Skip this for now (not required for development)

### Developer contact information
- Usually auto-filled with your email
- This is where Google will contact you if needed

---

## After Filling Step 1

Click **"Save and Continue"** or **"Next"** button at the bottom

---

## Step 2: Scopes

On the next screen, you'll see "Scopes"

### What to do:
1. Click **"Add or Remove Scopes"** button
2. You'll see a list of scopes
3. Check these scopes (select them):
   - ✅ `.../auth/userinfo.email`
   - ✅ `.../auth/userinfo.profile`
   - ✅ `openid`
   
   OR simply select:
   - ✅ `email`
   - ✅ `profile`
   - ✅ `openid`

4. Click **"Update"** or **"Add to Table"**
5. Click **"Save and Continue"** or **"Next"**

---

## Step 3: Test Users (Optional)

On this screen:
- You can skip this step for now
- Test users are only needed if your app is in "Testing" mode
- Click **"Save and Continue"** or **"Next"**

---

## Step 4: Summary

Review your settings:
- App name: BlessedBump
- Email: Your email
- Scopes: email, profile, openid

Click **"Back to Dashboard"** or **"Save"**

---

## 📋 Quick Fill-Out Guide

### Step 1: App Information
```
App name: BlessedBump
User support email: [Select your email from dropdown]
App logo: [Skip for now]
App domain: [Skip]
Authorized domains: [Skip]
Developer contact: [Auto-filled]
```
→ Click **"Save and Continue"**

### Step 2: Scopes
```
Click "Add or Remove Scopes"
Select:
- email
- profile  
- openid
Click "Update"
```
→ Click **"Save and Continue"**

### Step 3: Test Users
```
[Skip this step]
```
→ Click **"Save and Continue"**

### Step 4: Summary
```
Review and confirm
```
→ Click **"Back to Dashboard"**

---

## ✅ What You Should Enter Right Now

**On the current page (Step 1):**

1. **App name:**
   ```
   BlessedBump
   ```

2. **User support email:**
   - Click the dropdown
   - Select your email address
   - (The one you use for your Google account)

3. **Everything else:**
   - Leave optional fields empty for now
   - You can add logo and domain later

4. **Click "Save and Continue"** button at the bottom

---

## 🎯 Visual Guide

```
OAuth Consent Screen - Step 1
├── App name: [Type: BlessedBump]
├── User support email: [Select from dropdown]
├── App logo: [Skip - Optional]
├── App domain: [Skip - Optional]
├── Authorized domains: [Skip - Optional]
└── Developer contact: [Auto-filled]
    
    [Save and Continue] ← Click this button
```

---

## 💡 Tips

1. **App name** can be changed later, so don't worry too much
2. **Email** must be valid - Google may send notifications here
3. **Logo** is optional - you can add it later
4. **Don't overthink** - you can edit these settings anytime

---

## ✅ After Completing

Once you finish all steps and click "Back to Dashboard", you'll be ready for the next step:

**Next Step: Create OAuth 2.0 Credentials**
- Go to: **APIs & Services** → **Credentials**
- Click: **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**

---

**Fill in "BlessedBump" and your email, then click "Save and Continue"!** 🚀

