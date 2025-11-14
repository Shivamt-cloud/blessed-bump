# 🎯 Netlify DNS Setup - Complete Guide

## 📍 You Are Here

You're on the "Set up Netlify DNS" page. You can see:
- "Add domain" section
- "Add DNS records" section
- "Activate Netlify DNS" section
- "Add the domain to Netlify" section with a "Verify" button

---

## 🚀 Step-by-Step Instructions

### Step 1: Verify Domain Ownership

1. **In the "Add the domain to Netlify" section:**
   - You should see: `blessedbump.in`
   - Click the **"Verify"** button

2. **Netlify will verify:**
   - That you own the domain
   - That the domain is accessible
   - This might take a few seconds

3. **After verification:**
   - You'll see a success message
   - The domain will be added to Netlify

---

### Step 2: Activate Netlify DNS

1. **After domain is verified:**
   - Look for **"Activate Netlify DNS"** section
   - Click **"Activate Netlify DNS"** button

2. **Netlify will:**
   - Set up DNS management for your domain
   - Show you the nameservers you need to use
   - Configure DNS records automatically

---

### Step 3: Get Netlify Nameservers

After activating Netlify DNS, you'll see:

1. **Nameservers section:**
   - Netlify will display 4 nameservers like:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   - **Copy all 4 nameservers!** (You'll need them)

2. **DNS Records:**
   - Netlify will automatically create necessary DNS records
   - You don't need to manually add records

---

### Step 4: Update Nameservers in Hostinger

Now update your domain's nameservers:

1. **Go to Hostinger:**
   - Visit: https://www.hostinger.com
   - Log in to your account

2. **Navigate to Domain Management:**
   - Click **"Domains"** in the top menu
   - Find **blessedbump.in** in your domain list
   - Click **"Manage"** next to it

3. **Find Nameservers Section:**
   - Look for **"Nameservers"** or **"DNS"** section
   - You should see current nameservers:
     ```
     ns1.dns-parking.com
     ns2.dns-parking.com
     ```

4. **Update Nameservers:**
   - Click **"Change Nameservers"** or **"Edit"** button
   - **Remove** the current parking nameservers:
     - Delete: `ns1.dns-parking.com`
     - Delete: `ns2.dns-parking.com`
   - **Add** Netlify's nameservers (the 4 you copied):
     - Add: `dns1.p01.nsone.net` (use actual nameservers from Netlify)
     - Add: `dns2.p01.nsone.net`
     - Add: `dns3.p01.nsone.net`
     - Add: `dns4.p01.nsone.net`
   - Click **"Save"** or **"Update"**
   - Confirm the changes

---

### Step 5: Wait for DNS Verification

1. **Go back to Netlify:**
   - Return to Domain Management
   - The status will change from:
     - ⏳ **"Pending DNS verification"** → 
     - ✅ **"DNS configured correctly"** or **"Verified"**

2. **DNS Propagation Time:**
   - Usually: **15 minutes to 2 hours**
   - Sometimes: **Up to 4 hours**
   - Rarely: **Up to 24-48 hours**

3. **Netlify will automatically:**
   - Verify DNS configuration
   - Provision SSL certificate (HTTPS)
   - Enable your domain

---

### Step 6: Test Your Domain

Once DNS is verified:

1. **Visit your domain:**
   - Go to: **https://blessedbump.in**
   - You should see your **Coming Soon page**!

2. **Verify HTTPS:**
   - Make sure it shows **https://** (not http://)
   - Check SSL certificate (lock icon in browser)

3. **Test www subdomain:**
   - Go to: **https://www.blessedbump.in**
   - Should automatically redirect to `blessedbump.in`

---

## 📊 What You'll See

### After Clicking "Verify":
- ✅ Domain ownership verified
- ✅ Domain added to Netlify

### After Clicking "Activate Netlify DNS":
- ✅ DNS management activated
- ✅ Nameservers displayed
- ✅ DNS records automatically configured

### After Updating Nameservers in Hostinger:
- ⏳ Status: "Pending DNS verification"
- ⏳ Wait 15 min - 4 hours
- ✅ Status: "DNS configured correctly"
- ✅ SSL certificate provisioned
- ✅ Domain is live!

---

## ✅ Quick Checklist

- [ ] Clicked "Verify" button (domain ownership)
- [ ] Clicked "Activate Netlify DNS" button
- [ ] Copied all 4 Netlify nameservers
- [ ] Updated nameservers in Hostinger
- [ ] Removed parking nameservers (ns1.dns-parking.com, ns2.dns-parking.com)
- [ ] Added Netlify nameservers (all 4)
- [ ] Saved changes in Hostinger
- [ ] Waiting for DNS verification (15 min - 4 hours)
- [ ] Status changed to "Verified" in Netlify
- [ ] Tested https://blessedbump.in
- [ ] Coming Soon page displays correctly

---

## 🎯 Action Items Right Now

1. **Click "Verify"** button (to verify domain ownership)
2. **Click "Activate Netlify DNS"** (to activate DNS management)
3. **Copy the 4 nameservers** Netlify shows you
4. **Update nameservers in Hostinger** (replace parking nameservers)
5. **Wait for DNS verification** (15 min - 4 hours)
6. **Test https://blessedbump.in** (your Coming Soon page!)

---

## 🐛 Troubleshooting

### Issue: "Verify" Button Not Working

**Solution:**
- Make sure you own the domain
- Check that the domain is not locked
- Try refreshing the page
- Contact Netlify support if issues persist

### Issue: Can't See Nameservers After Activation

**Solution:**
- Refresh the page
- Check the "DNS" or "Nameservers" section
- Look for a "View nameservers" or "DNS configuration" link
- Nameservers should be displayed after activation

### Issue: Status Still "Pending" After 4 Hours

**Solution:**
- Double-check nameservers are correctly updated in Hostinger
- Verify all 4 nameservers match exactly what Netlify shows
- Check DNS propagation with: https://www.whatsmydns.net
- Contact Netlify support if still pending after 24 hours

---

## 📝 Summary

**Right Now:**
1. ✅ Click **"Verify"** button
2. ✅ Click **"Activate Netlify DNS"** button
3. ✅ Copy the 4 nameservers
4. ✅ Update nameservers in Hostinger

**Then:**
- ⏳ Wait 15 min - 4 hours for DNS propagation
- ✅ Netlify will automatically verify and provision SSL
- ✅ Your domain will be live!

**Finally:**
- ✅ Test https://blessedbump.in
- ✅ Your Coming Soon page should be live!

---

**Start by clicking "Verify" button now!** 🚀

After verification, click "Activate Netlify DNS" and you'll see the nameservers you need to update in Hostinger.

Need help with any step? Let me know!

