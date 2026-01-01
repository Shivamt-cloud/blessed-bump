# 🔍 How to Find Your Client Secret in Google Cloud Console

## 📍 Step-by-Step Navigation

### Step 1: Go to Google Cloud Console

1. Open: https://console.cloud.google.com/
2. Make sure you're signed in
3. **Select your project** (BlessedBump) from the dropdown at the top

---

### Step 2: Open the Menu

1. Look for the **☰ (three horizontal lines)** icon in the **top-left corner**
2. Click it to open the navigation menu (if it's not already open)

---

### Step 3: Navigate to APIs & Services

1. In the **left sidebar menu**, look for **"APIs & Services"**
2. Click on **"APIs & Services"**
3. A submenu will appear below it

---

### Step 4: Click on Credentials

1. Under "APIs & Services", you'll see options like:
   - Dashboard
   - Library
   - **Credentials** ← Click this one!
   - OAuth consent screen
   - etc.

2. Click on **"Credentials"**

---

### Step 5: Find Your OAuth Client

1. On the Credentials page, you'll see a list
2. Look for your OAuth 2.0 Client ID
3. It should be named: **"BlessedBump Web"** (or whatever name you gave it)
4. You'll see it listed with:
   - Name: BlessedBump Web
   - Type: OAuth 2.0 Client ID
   - Client ID: `766325689196-gjsipgvj4p7c5k0rhq5vlfg43g5g1c0p.apps.googleusercontent.com`

---

### Step 6: View Client Secret

1. **Click on the name** "BlessedBump Web" (or click anywhere on that row)
2. This will open the details page
3. You'll see:
   - **Client ID** (you already have this)
   - **Client Secret** (this is what you need!)
4. Next to Client Secret, click **"Show"** or the eye icon 👁️
5. The Client Secret will be revealed
6. **Copy it** - it starts with `GOCSPX-`

---

## 🎯 Visual Navigation Path

```
Google Cloud Console
│
├── Top Bar
│   ├── ☰ Menu Icon (top-left) ← Click this!
│   └── Project Dropdown (top)
│
└── Left Sidebar Menu
    └── APIs & Services ← Click this!
        ├── Dashboard
        ├── Library
        ├── Credentials ← Click this!
        └── OAuth consent screen
```

Then on Credentials page:
```
Credentials Page
│
└── OAuth 2.0 Client IDs
    └── BlessedBump Web ← Click on this!
        ├── Client ID: [visible]
        └── Client Secret: [Click "Show" to reveal]
```

---

## 🔍 Alternative: If You Don't See the Menu

**If the left sidebar menu is hidden:**

1. Look for the **☰ (hamburger menu)** icon in the top-left
2. Click it to show/hide the menu
3. The menu should appear on the left side

**If you're on a different page:**

1. Look at the top navigation breadcrumb
2. You might see something like: `Home > APIs & Services > ...`
3. Click on "APIs & Services" in the breadcrumb
4. Then click "Credentials"

---

## 📋 Quick Checklist

- [ ] Opened Google Cloud Console
- [ ] Selected correct project (BlessedBump)
- [ ] Clicked ☰ menu icon (top-left)
- [ ] Clicked "APIs & Services" in left sidebar
- [ ] Clicked "Credentials" in submenu
- [ ] Found "BlessedBump Web" in the list
- [ ] Clicked on "BlessedBump Web"
- [ ] Clicked "Show" next to Client Secret
- [ ] Copied the Client Secret

---

## 💡 Pro Tips

1. **The menu might be collapsed** - click the ☰ icon to expand it
2. **Use the search** - In Google Cloud Console, you can search for "Credentials" in the top search bar
3. **Bookmark it** - Once you find it, bookmark the page for easy access
4. **The Client Secret is hidden by default** - You need to click "Show" to see it

---

## 🐛 Troubleshooting

### "I don't see APIs & Services"
- Make sure you're signed in
- Make sure a project is selected (top dropdown)
- Try clicking the ☰ menu icon to show the sidebar

### "I don't see Credentials"
- Make sure you clicked on "APIs & Services" first
- Look for it in the submenu that appears
- Try refreshing the page

### "I don't see my OAuth Client"
- Make sure you're in the correct project
- Check if you created it in a different project
- Look for any OAuth 2.0 Client IDs in the list

### "Client Secret shows as hidden"
- Click the "Show" button or eye icon 👁️
- It will reveal the secret
- Copy it immediately (it might hide again)

---

## ✅ What the Client Secret Looks Like

When revealed, it will look like:
```
GOCSPX-abcdefghijklmnopqrstuvwxyz123456
```

It starts with `GOCSPX-` followed by a long string of characters.

---

**Try clicking the ☰ menu icon (top-left) → APIs & Services → Credentials. Let me know if you can see it now!** 🎯

