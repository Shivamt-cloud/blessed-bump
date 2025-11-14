# ⚡ Quick Start - Deploy to Hostinger

## 🚀 5-Minute Deployment

### Step 1: Build Your App
```bash
npm run build
```
This creates a `dist` folder with all production files.

### Step 2: Access Hostinger
1. Go to https://www.hostinger.com
2. Log in → Click "Manage" → Click "hPanel"

### Step 3: Upload Files
1. In hPanel → **Files** → **File Manager**
2. Go to **`public_html/`** folder
3. Delete default files (if any)
4. Click **Upload**
5. Upload everything from your `dist/` folder:
   - `index.html`
   - `assets/` folder (entire folder)

### Step 4: Add .htaccess File
1. In File Manager, go to `public_html/`
2. Create new file: **`.htaccess`**
3. Copy content from the `.htaccess` file in this project
4. Save

### Step 5: Set Up SSL
1. In hPanel → **SSL**
2. Click **"Manage SSL"**
3. Select **"Let's Encrypt"** (Free)
4. Select domain: **blessedbump.in**
5. Click **"Install"**
6. Wait 5-10 minutes

### Step 6: Test
Visit: **https://blessedbump.in**

---

## ✅ That's It!

Your website should now be live!

---

## 📝 Important Files to Upload

From `dist/` folder:
- ✅ `index.html`
- ✅ `assets/` (entire folder with all CSS/JS files)
- ✅ `.htaccess` (copy from project root to `public_html/`)

---

## 🐛 Common Issues

**404 Errors?** → Make sure `.htaccess` is uploaded

**Blank Page?** → Check browser console, verify all files uploaded

**Not HTTPS?** → Wait for SSL certificate to activate (5-10 minutes)

---

**Need detailed instructions?** See `HOSTINGER_DEPLOYMENT_GUIDE.md`

