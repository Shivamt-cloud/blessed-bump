# 🎯 Set Up Netlify DNS - Step by Step

## ✅ Perfect! You Found It!

You can see 3 options:
1. Edit domain
2. Remove domain
3. **Set up Netlify DNS** ← **Click This One!**

---

## 🚀 Next Steps

### Step 1: Click "Set up Netlify DNS"

1. **Click "Set up Netlify DNS"** (the 3rd option)

2. **Netlify will show you:**
   - Nameservers you need to use
   - Instructions on how to update them
   - DNS configuration details

3. **You'll see nameservers like:**
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
   - **Copy all 4 nameservers!** (You'll need them for Hostinger)

---

### Step 2: Update Nameservers in Hostinger

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
   - **Add** Netlify's nameservers (the 4 you copied from Step 1):
     - Add: `dns1.p01.nsone.net` (use actual nameservers from Netlify)
     - Add: `dns2.p01.nsone.net`
     - Add: `dns3.p01.nsone.net`
     - Add: `dns4.p01.nsone.net`
   - Click **"Save"** or **"Update"**
   - Confirm the changes

---

### Step 3: Wait for DNS Verification

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

### Step 4: Test Your Domain

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

## ✅ Quick Checklist

- [ ] Clicked "Set up Netlify DNS" in Netlify
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

## 🎯 What You'll See After Clicking "Set up Netlify DNS"

Netlify will show you:
- ✅ The nameservers to use
- ✅ Instructions on how to update them
- ✅ DNS configuration status
- ✅ Next steps

**Just follow the instructions Netlify provides!**

---

## 📝 Summary

1. ✅ **Click "Set up Netlify DNS"** (you're about to do this!)
2. ✅ **Copy the 4 nameservers** Netlify shows you
3. ✅ **Update nameservers in Hostinger** (replace parking nameservers)
4. ✅ **Wait for DNS verification** (15 min - 4 hours)
5. ✅ **Test https://blessedbump.in** (your Coming Soon page!)

---

**Click "Set up Netlify DNS" now and copy the nameservers!** 🚀

After you update the nameservers in Hostinger, Netlify will automatically verify and your domain will be live!

Need help with any step? Let me know!

