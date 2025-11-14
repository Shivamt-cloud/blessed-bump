# 🎯 Step-by-Step: Add blessedbump.in to Netlify

## 📍 You Are Here
You're on the **Domain management** page in Netlify. You can see:
- ✅ Your Netlify subdomain: `blessed-bump.netlify.app`
- ✅ "Add a domain" button
- ✅ HTTPS section

---

## 🚀 Next Steps

### Step 1: Click "Add a domain"

1. **Click the "Add a domain" button** (you should see this on the page)

2. **Enter your domain:**
   - Type: `blessedbump.in`
   - Click **"Verify"** or **"Add domain"**

3. **Netlify will verify the domain:**
   - It will check if the domain is available
   - It will show you DNS configuration options

---

### Step 2: Choose DNS Configuration Method

After adding the domain, Netlify will show you **two options**:

#### **Option A: Use Netlify Nameservers (Recommended - Easiest)**

This is what we want! Netlify will show you nameservers like:
```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

**What to do:**
- ✅ Select **"Use Netlify DNS"** or **"Netlify Nameservers"**
- ✅ **Copy all 4 nameservers** (you'll need them for Step 3)

#### **Option B: Use DNS Records (Advanced)**

If you can't change nameservers, you can add DNS records instead.

**For now, choose Option A (Nameservers)!**

---

### Step 3: Update Nameservers in Hostinger

Now you need to update your domain's nameservers from parking to Netlify's.

1. **Go to Hostinger:**
   - Visit: https://www.hostinger.com
   - Log in to your account

2. **Navigate to Domain Management:**
   - Click **"Domains"** in the top menu
   - Find **blessedbump.in** in your domain list
   - Click **"Manage"** next to it

3. **Find Nameservers Section:**
   - Look for **"Nameservers"** or **"DNS"** section
   - You'll see current nameservers:
     ```
     ns1.dns-parking.com
     ns2.dns-parking.com
     ```

4. **Update Nameservers:**
   - Click **"Change Nameservers"** or **"Edit"** button
   - **Delete/Remove** the current parking nameservers:
     - Remove: `ns1.dns-parking.com`
     - Remove: `ns2.dns-parking.com`
   - **Add Netlify's nameservers** (the 4 you copied from Step 2):
     - Add: `dns1.p01.nsone.net` (or whatever Netlify showed)
     - Add: `dns2.p01.nsone.net`
     - Add: `dns3.p01.nsone.net`
     - Add: `dns4.p01.nsone.net`
   - Click **"Save"** or **"Update"**
   - Confirm the changes

---

### Step 4: Verify in Netlify

1. **Go back to Netlify Domain Management:**
   - You should see `blessedbump.in` in your domain list
   - It might show status like:
     - ⏳ **"DNS not configured"** - Still waiting for DNS propagation
     - ✅ **"DNS configured correctly"** - Ready!
     - ❌ **"DNS misconfigured"** - Check nameservers

2. **Wait for DNS Propagation:**
   - Usually takes: **15 minutes to 4 hours**
   - Sometimes: **Up to 24-48 hours** (rare)
   - You can check status in Netlify

---

### Step 5: Enable HTTPS (SSL Certificate)

Once DNS is configured:

1. **In Netlify Domain Management:**
   - Find `blessedbump.in` in the list
   - Look for **"HTTPS"** section
   - Click **"Verify DNS configuration"** or **"Provision certificate"**

2. **Netlify will automatically:**
   - Provision a free SSL certificate via Let's Encrypt
   - Enable HTTPS for your domain
   - This usually happens automatically after DNS propagates

3. **Enable Force HTTPS (Optional but Recommended):**
   - In the HTTPS section, enable **"Force HTTPS"**
   - This redirects all HTTP traffic to HTTPS

---

### Step 6: Test Your Domain

After DNS propagates (1-4 hours):

1. **Visit your domain:**
   - Go to: **https://blessedbump.in**
   - You should see your **Coming Soon page**!

2. **Verify HTTPS:**
   - Make sure it shows **https://** (not http://)
   - Check that the SSL certificate is valid (lock icon in browser)

3. **Test Routes:**
   - Try: https://blessedbump.in/calculator
   - All routes should work correctly

---

## 📊 What You'll See in Netlify

After adding the domain, your Domain Management page will show:

```
Production domains
├── blessed-bump.netlify.app (Netlify subdomain)
└── blessedbump.in (Custom domain)
    ├── Status: DNS configured / DNS not configured
    ├── HTTPS: Provisioned / Pending
    └── Options: [Manage] [Delete]
```

---

## ✅ Checklist

- [ ] Clicked "Add a domain" in Netlify
- [ ] Entered `blessedbump.in`
- [ ] Selected "Use Netlify DNS" / "Netlify Nameservers"
- [ ] Copied all 4 Netlify nameservers
- [ ] Updated nameservers in Hostinger
- [ ] Saved changes in Hostinger
- [ ] Waited for DNS propagation (check in Netlify)
- [ ] SSL certificate provisioned (automatic)
- [ ] Tested https://blessedbump.in
- [ ] Coming Soon page displays correctly

---

## 🐛 Common Issues

### Issue: "DNS not configured" in Netlify

**Solution:**
- Wait 1-4 hours for DNS propagation
- Double-check nameservers are correctly updated in Hostinger
- Verify nameservers match exactly what Netlify provided

### Issue: Still seeing parking page

**Solution:**
- DNS hasn't propagated yet (wait longer)
- Clear browser cache
- Try incognito/private window
- Check with: https://www.whatsmydns.net

### Issue: SSL certificate not provisioning

**Solution:**
- Wait for DNS to fully propagate first
- Click "Verify DNS configuration" in Netlify
- SSL usually activates automatically after DNS is configured

---

## 🔍 Check DNS Propagation

While waiting, you can check if DNS is propagating:

1. **Visit:** https://www.whatsmydns.net
2. **Enter:** `blessedbump.in`
3. **Select:** "NS" (Nameservers)
4. **Check:** If nameservers show Netlify's nameservers globally

---

## 📝 Summary

1. ✅ Click "Add a domain" → Enter `blessedbump.in`
2. ✅ Copy Netlify nameservers
3. ✅ Update nameservers in Hostinger (replace parking nameservers)
4. ✅ Wait for DNS propagation (1-4 hours)
5. ✅ SSL will provision automatically
6. ✅ Test: https://blessedbump.in

---

**Your Coming Soon page will be live at https://blessedbump.in!** 🎉

Need help with any step? Let me know!

