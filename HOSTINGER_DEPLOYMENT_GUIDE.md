# 🚀 Hostinger Deployment Guide - BlessedBump

## 📋 Overview

This guide will help you deploy your BlessedBump React application to Hostinger using your domain **blessedbump.in**.

---

## ✅ Prerequisites

- ✅ Domain: blessedbump.in (already purchased)
- ✅ Hostinger account
- ✅ Hosting plan activated
- ✅ Access to Hostinger control panel (hPanel)

---

## 🎯 Step-by-Step Instructions

### Step 1: Build Your Application

First, build your React app for production:

```bash
cd "/Users/shivamgarima/Blessed Bump"
npm run build
```

This creates a `dist` folder with all production files.

**Important Files:**
- `dist/index.html` - Main HTML file
- `dist/assets/` - All CSS, JS, and other assets

---

### Step 2: Access Hostinger hPanel

1. Go to **https://www.hostinger.com**
2. Log in to your account
3. Click on **"Manage"** next to your hosting plan
4. Click **"hPanel"** to access the control panel

---

### Step 3: Connect Your Domain

1. In hPanel, go to **"Domains"** section
2. Click **"Manage"** next to blessedbump.in
3. Ensure the domain is connected to your hosting
4. If not connected, click **"Connect Domain"** and follow the prompts

---

### Step 4: Access File Manager

1. In hPanel, find **"Files"** section
2. Click **"File Manager"**
3. Navigate to **`public_html`** folder (this is your website root)

**Note:** If you want blessedbump.in as the main domain:
- Files go in: `public_html/`
- If you have a subdomain or addon domain, it might be in: `public_html/blessedbump.in/`

---

### Step 5: Upload Your Files

#### Option A: Using File Manager (Easiest)

1. In File Manager, navigate to `public_html/`
2. **Delete** any default files (index.html, etc.) if present
3. Click **"Upload"** button
4. Select all files from your `dist` folder:
   - `index.html`
   - `assets/` folder (entire folder)
   - Any other files in `dist/`
5. Wait for upload to complete

#### Option B: Using FTP (Faster for large files)

1. In hPanel, go to **"FTP Accounts"**
2. Note your FTP credentials:
   - **FTP Host**: Usually `ftp.blessedbump.in` or your server IP
   - **Username**: Your FTP username
   - **Password**: Your FTP password
3. Use an FTP client (FileZilla, Cyberduck, etc.)
4. Connect using the credentials
5. Navigate to `public_html/`
6. Upload all files from your `dist` folder

#### Option C: Using Git (Recommended for updates)

1. In hPanel, go to **"Git"** section
2. Create a new repository
3. Connect your GitHub repository
4. Set up auto-deploy (see Step 8 for details)

---

### Step 6: Configure .htaccess for React Router

Since you're using React Router, you need to configure URL rewriting so all routes work correctly.

1. In File Manager, go to `public_html/`
2. Create a new file named **`.htaccess`**
3. Add this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

4. Save the file

**Why this is needed:** React Router uses client-side routing. Without this, direct URLs (like `/dashboard`) will show 404 errors. This file tells the server to serve `index.html` for all routes.

---

### Step 7: Set Up Environment Variables

If you're using Supabase or other services, you need to configure environment variables.

**For Hostinger Shared Hosting:**
Environment variables are typically set in `.htaccess` or through hPanel.

1. Create or edit `.htaccess` in `public_html/`
2. Add environment variables (if needed):

```apache
# Set environment variables (if needed)
SetEnv VITE_SUPABASE_URL "your-supabase-url"
SetEnv VITE_SUPABASE_ANON_KEY "your-supabase-key"
```

**Note:** For Vite apps, environment variables are embedded at build time, so you might not need this if you built with the correct `.env` file.

**Better Approach:**
- Build with environment variables already set
- They get embedded in the JavaScript bundle
- No server-side configuration needed

---

### Step 8: Configure SSL Certificate (HTTPS)

1. In hPanel, go to **"SSL"** section
2. Click **"Manage SSL"**
3. Select **"Let's Encrypt"** (Free SSL)
4. Select your domain: **blessedbump.in**
5. Click **"Install"**
6. Wait for installation (usually 5-10 minutes)
7. Enable **"Force HTTPS"** redirect

**Important:** Always use HTTPS for production!

---

### Step 9: Test Your Website

1. Open your browser
2. Visit **https://blessedbump.in**
3. You should see your Coming Soon page
4. Test navigation and all features
5. Check browser console for any errors

---

### Step 10: Set Up Auto-Deployment (Optional but Recommended)

#### Using GitHub + Hostinger Git

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **In Hostinger hPanel:**
   - Go to **"Git"** section
   - Click **"Create Repository"**
   - Connect your GitHub account
   - Select your repository
   - Set deployment path: `public_html/`
   - Enable **"Auto Deploy"**

3. **Set up build command:**
   - In Git settings, add build command: `npm run build`
   - Set build output directory: `dist`

**Now every time you push to GitHub, Hostinger will automatically:**
- Pull the latest code
- Run `npm run build`
- Deploy to `public_html/`

---

## 🔧 Advanced Configuration

### Custom Build Script for Hostinger

Create a deployment script:

```bash
# deploy.sh
#!/bin/bash
npm install
npm run build
# Then upload dist/ folder to Hostinger
```

### Using Node.js Version Manager (if needed)

If Hostinger supports Node.js:

1. In hPanel, go to **"Node.js"** section
2. Select Node.js version (18.x or 20.x recommended)
3. Set application root: `public_html/`
4. Set startup file: `server.js` (if using SSR)

---

## 📝 Important Notes

### File Permissions

After uploading, ensure correct permissions:
- Files: `644`
- Folders: `755`
- `.htaccess`: `644`

### Database Configuration

If using Supabase (which you are):
- ✅ No database setup needed on Hostinger
- ✅ Supabase handles all database operations
- ✅ Just ensure environment variables are set in your build

### CDN Setup (Optional)

For better performance:
1. In hPanel, go to **"CDN"** section
2. Enable Cloudflare CDN (if available)
3. Or use external CDN like Cloudflare

---

## 🐛 Troubleshooting

### Issue: 404 Errors on Routes

**Solution:** Ensure `.htaccess` file is in `public_html/` with the React Router configuration.

### Issue: White Screen / Blank Page

**Possible Causes:**
1. Check browser console for errors
2. Verify all files uploaded correctly
3. Check file paths in `index.html`
4. Ensure `assets/` folder is uploaded

**Solution:**
- Re-upload all files
- Clear browser cache
- Check file permissions

### Issue: Environment Variables Not Working

**Solution:**
- Rebuild with correct `.env` file
- Environment variables are embedded at build time
- No server configuration needed for Vite apps

### Issue: SSL Certificate Not Working

**Solution:**
1. Wait 24-48 hours for DNS propagation
2. Clear browser cache
3. Try accessing `https://blessedbump.in` directly
4. Check SSL status in hPanel

### Issue: Slow Loading

**Solutions:**
1. Enable GZIP compression (in `.htaccess`)
2. Enable browser caching (in `.htaccess`)
3. Use CDN for static assets
4. Optimize images
5. Enable Cloudflare CDN

---

## ✅ Deployment Checklist

Before going live:

- [ ] Build production version (`npm run build`)
- [ ] Test build locally
- [ ] Upload all files to `public_html/`
- [ ] Create `.htaccess` file with React Router config
- [ ] Set up SSL certificate
- [ ] Test website at https://blessedbump.in
- [ ] Test all routes (/, /calculator, /dashboard, etc.)
- [ ] Check mobile responsiveness
- [ ] Verify environment variables (if any)
- [ ] Test forms and functionality
- [ ] Check browser console for errors
- [ ] Set up auto-deployment (optional)
- [ ] Configure CDN (optional)
- [ ] Update DNS if needed

---

## 🚀 Quick Deployment Commands

```bash
# 1. Build for production
npm run build

# 2. Test build locally
npm run preview

# 3. Upload dist/ folder to Hostinger public_html/

# 4. Create .htaccess file in public_html/

# 5. Test at https://blessedbump.in
```

---

## 📞 Hostinger Support

If you encounter issues:
- **Live Chat**: Available in hPanel
- **Support Tickets**: Submit through hPanel
- **Knowledge Base**: https://support.hostinger.com

---

## 🎯 Next Steps After Deployment

1. **Monitor Performance:**
   - Use Google PageSpeed Insights
   - Monitor with Google Analytics

2. **Set Up Monitoring:**
   - Uptime monitoring
   - Error tracking (Sentry, etc.)

3. **SEO:**
   - Submit sitemap to Google Search Console
   - Verify domain ownership

4. **Security:**
   - Regular backups
   - Keep dependencies updated
   - Monitor for security issues

---

**Your website will be live at https://blessedbump.in!** 🎉

Good luck with your deployment! 🚀

