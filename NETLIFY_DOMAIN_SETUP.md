# 🌐 Netlify Domain Setup - blessedbump.in

## 📋 Overview

This guide will help you connect your **blessedbump.in** domain to your Netlify deployment so your Coming Soon page displays on your custom domain.

**Current Status:**
- ✅ Netlify deployment: Already connected via GitHub
- ✅ Domain: blessedbump.in (purchased)
- ✅ Current Nameservers: ns1.dns-parking.com, ns2.dns-parking.com (parking)
- 🎯 Goal: Point domain to Netlify

---

## 🚀 Step-by-Step Instructions

### Step 1: Add Custom Domain in Netlify

1. **Go to Netlify Dashboard:**
   - Visit https://app.netlify.com
   - Log in to your account

2. **Select Your Site:**
   - Click on your BlessedBump site (or find it in your sites list)

3. **Go to Domain Settings:**
   - Click **"Site configuration"** in the left sidebar
   - Click **"Domain management"** (or **"Domains"**)

4. **Add Custom Domain:**
   - Click **"Add custom domain"** button
   - Enter: **`blessedbump.in`**
   - Click **"Verify"** or **"Add domain"**

5. **Netlify will show you DNS configuration:**
   - Note the **nameservers** Netlify provides (you'll need these)
   - They usually look like:
     - `dns1.p01.nsone.net`
     - `dns2.p01.nsone.net`
     - `dns3.p01.nsone.net`
     - `dns4.p01.nsone.net`
   - OR Netlify might show you specific DNS records to add

---

### Step 2: Choose Your DNS Setup Method

Netlify offers two ways to connect your domain:

#### **Option A: Use Netlify Nameservers (Recommended - Easiest)**

This is the simplest method. You'll change your domain's nameservers to Netlify's.

#### **Option B: Use DNS Records (Advanced)**

Keep your current nameservers and add specific DNS records.

**We'll use Option A (Nameservers) as it's easier!**

---

### Step 3: Get Netlify Nameservers

1. **In Netlify Domain Settings:**
   - After adding `blessedbump.in`, Netlify will show you the nameservers
   - They might be displayed as:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   - **Copy all 4 nameservers** (or however many Netlify provides)

2. **Alternative: Check Netlify DNS:**
   - In Domain settings, look for **"Netlify DNS"** section
   - Click **"Use Netlify DNS"** if available
   - This will show you the nameservers

---

### Step 4: Update Nameservers in Your Domain Registrar

You need to update nameservers where you bought the domain (likely Hostinger or another registrar).

#### **If Domain is with Hostinger:**

1. **Log in to Hostinger:**
   - Go to https://www.hostinger.com
   - Log in to your account

2. **Go to Domain Management:**
   - Click **"Domains"** in the top menu
   - Find **blessedbump.in** in your domain list
   - Click **"Manage"** next to it

3. **Update Nameservers:**
   - Look for **"Nameservers"** or **"DNS"** section
   - Click **"Change Nameservers"** or **"Edit"**
   - You'll see current nameservers:
     ```
     ns1.dns-parking.com
     ns2.dns-parking.com
     ```
   - **Replace them** with Netlify's nameservers:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
     (Use the actual nameservers Netlify provided)

4. **Save Changes:**
   - Click **"Save"** or **"Update"**
   - Confirm the changes

#### **If Domain is with Another Registrar:**

1. Log in to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find **blessedbump.in** in your domain list
3. Go to **DNS Settings** or **Nameservers**
4. Change from parking nameservers to Netlify's nameservers
5. Save changes

---

### Step 5: Configure SSL in Netlify

1. **In Netlify Dashboard:**
   - Go to your site → **"Site configuration"** → **"Domain management"**
   - Find **blessedbump.in** in the domain list

2. **Enable HTTPS:**
   - Netlify automatically provisions SSL certificates via Let's Encrypt
   - Look for **"HTTPS"** section
   - Click **"Verify DNS configuration"** or **"Provision certificate"**
   - Netlify will automatically set up SSL once DNS propagates

3. **Force HTTPS (Optional but Recommended):**
   - In Domain settings, enable **"Force HTTPS"**
   - This redirects all HTTP traffic to HTTPS

---

### Step 6: Wait for DNS Propagation

**Important:** DNS changes can take time to propagate.

1. **Propagation Time:**
   - Usually: **15 minutes to 2 hours**
   - Sometimes: **Up to 24-48 hours** (rare)
   - Average: **1-4 hours**

2. **Check Propagation:**
   - Use https://www.whatsmydns.net
   - Enter: `blessedbump.in`
   - Check if nameservers are updated globally

3. **Verify in Netlify:**
   - Go back to Netlify Domain settings
   - Netlify will show status:
     - ✅ **"DNS configured correctly"** - Ready!
     - ⏳ **"DNS not configured"** - Still propagating
     - ❌ **"DNS misconfigured"** - Check nameservers

---

### Step 7: Test Your Domain

Once DNS propagates:

1. **Visit your domain:**
   - Go to **https://blessedbump.in**
   - You should see your Coming Soon page!

2. **Test HTTPS:**
   - Make sure it redirects to HTTPS
   - Check SSL certificate is valid

3. **Test All Routes:**
   - Try: https://blessedbump.in/calculator
   - Try: https://blessedbump.in/dashboard (if logged in)
   - All routes should work!

---

## 🔧 Alternative: Using DNS Records (If Nameservers Don't Work)

If you can't change nameservers, you can use DNS records instead:

### In Netlify:

1. Go to **Domain management**
2. Click on **blessedbump.in**
3. Look for **"DNS configuration"** or **"DNS records"**
4. Netlify will show you records to add:
   - Usually an **A record** pointing to Netlify's IP
   - Or **CNAME records**

### In Your Domain Registrar:

1. Go to DNS settings
2. Add the records Netlify provides:
   - **Type:** A or CNAME
   - **Name:** @ or blessedbump.in
   - **Value:** Netlify's IP or hostname
   - **TTL:** 3600 (or default)

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Nameservers updated in domain registrar
- [ ] Netlify shows domain as "DNS configured correctly"
- [ ] SSL certificate provisioned (HTTPS works)
- [ ] https://blessedbump.in shows Coming Soon page
- [ ] All routes work correctly
- [ ] Force HTTPS enabled (optional)

---

## 🐛 Troubleshooting

### Issue: Domain Not Resolving

**Possible Causes:**
1. DNS hasn't propagated yet (wait 1-4 hours)
2. Nameservers not updated correctly
3. Cached DNS in browser

**Solutions:**
- Wait for DNS propagation
- Double-check nameservers match Netlify's exactly
- Clear browser cache
- Try incognito/private window
- Check with https://www.whatsmydns.net

### Issue: SSL Certificate Not Provisioning

**Solutions:**
1. Wait for DNS to fully propagate
2. In Netlify, click **"Verify DNS configuration"**
3. Make sure domain is correctly added in Netlify
4. Check Netlify's domain status

### Issue: Still Seeing Parking Page

**Solutions:**
1. Clear browser cache
2. Wait for DNS propagation (can take up to 48 hours)
3. Verify nameservers are correctly updated
4. Check Netlify domain status

### Issue: 404 Errors on Routes

**Solutions:**
- Your `netlify.toml` already has redirects configured ✅
- If still having issues, verify redirects in Netlify:
  - Go to **Site configuration** → **Redirects and rewrites**
  - Should have: `/* /index.html 200`

---

## 📝 Current Netlify Configuration

Your `netlify.toml` is already configured correctly:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

This ensures:
- ✅ React Router works correctly
- ✅ All routes redirect to index.html
- ✅ Build uses Node 18

---

## 🎯 Quick Summary

1. **Add domain in Netlify:** blessedbump.in
2. **Get Netlify nameservers** (from Netlify dashboard)
3. **Update nameservers** in Hostinger/registrar:
   - Replace: `ns1.dns-parking.com`, `ns2.dns-parking.com`
   - With: Netlify's nameservers
4. **Wait for DNS propagation** (1-4 hours)
5. **Verify SSL** in Netlify
6. **Test:** https://blessedbump.in

---

## 🚀 After Setup

Once everything is working:

1. **Monitor:**
   - Check Netlify dashboard for deployment status
   - Monitor domain status

2. **Update if Needed:**
   - Any code changes pushed to GitHub will auto-deploy
   - Netlify will automatically rebuild and deploy

3. **Performance:**
   - Netlify CDN automatically serves your site globally
   - SSL is automatically managed

---

**Your Coming Soon page will be live at https://blessedbump.in!** 🎉

Need help with any step? Let me know!

