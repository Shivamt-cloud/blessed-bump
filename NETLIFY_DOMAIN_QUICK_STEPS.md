# ⚡ Quick Steps - Connect blessedbump.in to Netlify

## 🎯 Goal
Connect your domain **blessedbump.in** to Netlify so your Coming Soon page displays.

---

## 📝 Step-by-Step (5 Minutes)

### Step 1: Add Domain in Netlify
1. Go to **https://app.netlify.com**
2. Click on your **BlessedBump site**
3. Go to **"Site configuration"** → **"Domain management"**
4. Click **"Add custom domain"**
5. Enter: **`blessedbump.in`**
6. Click **"Verify"** or **"Add domain"**

### Step 2: Get Netlify Nameservers
After adding domain, Netlify will show you nameservers like:
```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```
**Copy all 4 nameservers!**

### Step 3: Update Nameservers in Hostinger
1. Go to **https://www.hostinger.com**
2. Log in → Click **"Domains"**
3. Find **blessedbump.in** → Click **"Manage"**
4. Find **"Nameservers"** section
5. Click **"Change Nameservers"** or **"Edit"**
6. **Replace current nameservers:**
   - ❌ Remove: `ns1.dns-parking.com`
   - ❌ Remove: `ns2.dns-parking.com`
7. **Add Netlify nameservers:**
   - ✅ Add: `dns1.p01.nsone.net` (or what Netlify shows)
   - ✅ Add: `dns2.p01.nsone.net`
   - ✅ Add: `dns3.p01.nsone.net`
   - ✅ Add: `dns4.p01.nsone.net`
8. Click **"Save"** or **"Update"**

### Step 4: Enable SSL in Netlify
1. Back in Netlify → **Domain management**
2. Find **blessedbump.in**
3. Look for **"HTTPS"** section
4. Click **"Verify DNS configuration"** or **"Provision certificate"**
5. Enable **"Force HTTPS"** (optional but recommended)

### Step 5: Wait & Test
1. **Wait:** 15 minutes to 4 hours (DNS propagation)
2. **Check:** https://www.whatsmydns.net (enter blessedbump.in)
3. **Test:** Visit **https://blessedbump.in**
4. **Verify:** You should see your Coming Soon page!

---

## ✅ Checklist

- [ ] Domain added in Netlify
- [ ] Netlify nameservers copied
- [ ] Nameservers updated in Hostinger
- [ ] SSL certificate provisioned in Netlify
- [ ] DNS propagated (check with whatsmydns.net)
- [ ] https://blessedbump.in shows Coming Soon page

---

## 🐛 Troubleshooting

**Domain not working?**
- Wait 1-4 hours for DNS propagation
- Double-check nameservers match exactly
- Clear browser cache
- Try incognito window

**Still seeing parking page?**
- DNS hasn't propagated yet (wait longer)
- Verify nameservers are saved correctly
- Check Netlify domain status

**SSL not working?**
- Wait for DNS to fully propagate first
- Click "Verify DNS configuration" in Netlify
- SSL usually activates automatically after DNS propagates

---

## 📞 Need Help?

- **Netlify Support:** https://www.netlify.com/support/
- **Hostinger Support:** Available in hPanel
- **Check DNS:** https://www.whatsmydns.net

---

**That's it! Your Coming Soon page will be live at https://blessedbump.in** 🎉

