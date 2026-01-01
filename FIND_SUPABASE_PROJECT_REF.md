# 🔍 Finding Your Supabase Project Reference

## 📍 You're on the Right Page!

You're looking at **Supabase Dashboard → Settings → API**. Perfect!

---

## 🎯 What to Look For

On this page, you should see a section that says:

### **Project URL**

This will look something like:
```
https://abcdefghijklmnop.supabase.co
```

**The part you need is:** `abcdefghijklmnop` (the part before `.supabase.co`)

---

## 📋 Step-by-Step

1. **Find "Project URL"** section on the page
2. **Look for the URL** that looks like:
   ```
   https://something.supabase.co
   ```
3. **Copy the "something" part** - that's your project reference!

---

## ✅ Example

If your Project URL is:
```
https://xyzabc123def456.supabase.co
```

Then:
- **Your project reference is:** `xyzabc123def456`
- **Your OAuth redirect URI should be:**
  ```
  https://xyzabc123def456.supabase.co/auth/v1/callback
  ```

---

## 🔑 What You Need

**For Google OAuth redirect URI, you need:**

```
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

**Where `YOUR_PROJECT_REF` is the part from your Project URL.**

---

## 📝 Quick Action

1. **Find "Project URL"** on the Supabase Settings → API page
2. **Copy the URL** (it should end with `.supabase.co`)
3. **Take the part before `.supabase.co`** - that's your project reference
4. **Use it in the redirect URI:**
   ```
   https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback
   ```

---

## 💡 Visual Example

**On Supabase Dashboard → Settings → API:**

```
Project URL
└── https://abcdefghijklmnop.supabase.co
              ↑
    This part is your project reference!
```

**For Google OAuth, use:**
```
https://abcdefghijklmnop.supabase.co/auth/v1/callback
```

---

## ✅ Checklist

- [ ] Found "Project URL" on Supabase Settings → API page
- [ ] Identified the part before `.supabase.co`
- [ ] Constructed the redirect URI: `https://[PROJECT_REF].supabase.co/auth/v1/callback`
- [ ] Ready to add it to Google OAuth redirect URIs

---

**Can you see the Project URL? It should be something like `https://something.supabase.co` - share that and I'll help you construct the exact redirect URI!** 🎯

