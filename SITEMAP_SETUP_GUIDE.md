# Sitemap Setup Guide for Google Indexing

## 📍 Sitemap Location

Your sitemap is located at:
- **File:** `public/sitemap.xml`
- **URL (after deployment):** `https://yourdomain.com/sitemap.xml`

## 🔧 Step 1: Update Your Domain

Before submitting to Google, you need to replace the placeholder domain with your actual production domain.

### Option A: Manual Update
1. Open `public/sitemap.xml`
2. Find and replace all instances of `https://yourdomain.com` with your actual domain
   - Example: `https://blessedbump.com`
   - Or: `https://your-app-name.netlify.app`

### Option B: Quick Command (if you know your domain)
```bash
# Replace 'your-actual-domain.com' with your real domain
sed -i '' 's|https://yourdomain.com|https://your-actual-domain.com|g' public/sitemap.xml
sed -i '' 's|https://yourdomain.com|https://your-actual-domain.com|g' public/robots.txt
```

## 📤 Step 2: Deploy to Production

After updating the domain:
1. Commit the changes:
   ```bash
   git add public/sitemap.xml public/robots.txt
   git commit -m "Add sitemap and robots.txt for SEO"
   git push origin main
   ```

2. Wait for Netlify to deploy (or deploy manually)

3. Verify the sitemap is accessible:
   - Visit: `https://yourdomain.com/sitemap.xml`
   - You should see the XML sitemap content

## 🔍 Step 3: Submit to Google Search Console

1. **Go to Google Search Console:**
   - Visit: https://search.google.com/search-console

2. **Add Your Property:**
   - Click "Add Property"
   - Enter your website URL (e.g., `https://yourdomain.com`)
   - Verify ownership (DNS, HTML file, or Google Analytics)

3. **Submit Your Sitemap:**
   - In the left sidebar, click "Sitemaps"
   - Enter: `sitemap.xml` (or the full URL: `https://yourdomain.com/sitemap.xml`)
   - Click "Submit"

4. **Verify Submission:**
   - Google will show "Success" status
   - It may take a few hours to days for Google to crawl and index your pages

## 📋 What's Included in the Sitemap

The sitemap includes all public pages:
- ✅ Calculator (Home page)
- ✅ Dashboard
- ✅ Tracker
- ✅ Fertility
- ✅ Community
- ✅ About
- ✅ Contact
- ✅ Privacy Policy
- ✅ Terms of Service
- ✅ Cookie Policy
- ✅ Blog
- ✅ Help Center
- ✅ FAQ
- ✅ And other informational pages

## 🎯 Priority Levels

- **Priority 1.0:** Main entry point (Calculator)
- **Priority 0.9:** Core features (Dashboard, Tracker)
- **Priority 0.8:** Important features (Fertility, Community)
- **Priority 0.7:** Important pages (About, Contact)
- **Priority 0.6:** Content pages (Blog, Help, FAQ)
- **Priority 0.5:** Legal pages (Privacy, Terms, Cookie Policy)
- **Priority 0.4:** Guidelines and policies
- **Priority 0.3:** Less frequently accessed pages

## 🔄 Updating the Sitemap

When you add new pages:
1. Add a new `<url>` entry to `public/sitemap.xml`
2. Update the `<lastmod>` date
3. Commit and deploy

## ✅ Verification Checklist

- [ ] Updated domain in `sitemap.xml`
- [ ] Updated domain in `robots.txt`
- [ ] Committed and pushed to GitHub
- [ ] Deployed to production
- [ ] Verified sitemap is accessible at `https://yourdomain.com/sitemap.xml`
- [ ] Submitted sitemap to Google Search Console
- [ ] Verified robots.txt is accessible at `https://yourdomain.com/robots.txt`

## 📞 Need Help?

If you need assistance:
1. Check Google Search Console documentation
2. Verify your sitemap XML is valid: https://www.xml-sitemaps.com/validate-xml-sitemap.html
3. Test your robots.txt: https://www.google.com/webmasters/tools/robots-testing-tool

---

**Note:** It may take several days to weeks for Google to fully index all your pages. Be patient and monitor the progress in Google Search Console.

