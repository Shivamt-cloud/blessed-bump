# 📧 New User Email Notification Guide

## 🎯 Goal
Receive an email notification whenever a new user signs up for BlessedBump.

---

## ✅ Yes, This Is Possible!

There are several ways to get notified when new users sign up. Here are the best options:

---

## 🚀 Option 1: Supabase Database Webhooks (Easiest - Recommended)

### **How It Works:**
Supabase can automatically send an HTTP request (webhook) to a service when a new user is created in the `auth.users` table. You can then send an email notification.

### **Setup Steps:**

#### **Step 1: Create a Webhook Service (Choose One):**

**Option A: Use a Free Service (Zapier/Make/n8n)**
1. Sign up for Zapier, Make (Integromat), or n8n (free tier)
2. Create a webhook trigger
3. Add email action (send email when webhook receives data)
4. Copy the webhook URL

**Option B: Use Supabase Edge Functions**
- More control, requires code
- See Option 2 below

**Option C: Use Your Own Server**
- Create an endpoint that receives webhook
- Sends email via service like SendGrid, Mailgun, etc.

#### **Step 2: Configure Supabase Webhook**

1. Go to **Supabase Dashboard** → Your Project
2. Navigate to **Database** → **Webhooks**
3. Click **"Create a new webhook"**

4. **Configure the webhook:**
   - **Name:** "New User Notification"
   - **Table:** `auth.users`
   - **Events:** Select **"INSERT"** (when new user is created)
   - **Type:** HTTP Request
   - **Method:** POST
   - **URL:** Paste your webhook URL from Step 1
   - **Headers:** 
     ```json
     {
       "Content-Type": "application/json",
       "Authorization": "Bearer YOUR_SECRET_KEY"
     }
     ```
   - **HTTP Request:** Enable
   - **Include table columns:** Enable

5. **Test the webhook:**
   - Create a test user
   - Check if webhook receives the data

#### **Step 3: Process the Webhook Data**

The webhook will send data like this:
```json
{
  "type": "INSERT",
  "table": "auth.users",
  "record": {
    "id": "user-uuid",
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00Z",
    "user_metadata": {
      "full_name": "John Doe"
    }
  }
}
```

#### **Step 4: Send Email**

From your webhook service, send an email with:
- Subject: "New User Signed Up - BlessedBump"
- Body: Include user email, signup date, and any metadata

---

## 🔧 Option 2: Supabase Edge Functions (More Control)

### **How It Works:**
Create a Supabase Edge Function that triggers on user creation and sends an email.

### **Setup Steps:**

#### **Step 1: Create Edge Function**

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Initialize Supabase (if not done):
   ```bash
   supabase init
   ```

3. Create new function:
   ```bash
   supabase functions new notify-new-user
   ```

4. Write the function code (`supabase/functions/notify-new-user/index.ts`):
   ```typescript
   import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
   import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

   const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
   const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'blessedbump.co@gmail.com'

   serve(async (req) => {
     try {
       const { record } = await req.json()
      
       const userEmail = record.email
       const userName = record.user_metadata?.full_name || 'User'
       const signupDate = new Date(record.created_at).toLocaleString()

       // Send email using Resend (or your email service)
       const emailResponse = await fetch('https://api.resend.com/emails', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${RESEND_API_KEY}`,
         },
         body: JSON.stringify({
           from: 'BlessedBump <notifications@blessedbump.in>',
           to: ADMIN_EMAIL,
           subject: '🎉 New User Signed Up - BlessedBump',
           html: `
             <h2>New User Registration</h2>
             <p>A new user has signed up for BlessedBump!</p>
             <ul>
               <li><strong>Email:</strong> ${userEmail}</li>
               <li><strong>Name:</strong> ${userName}</li>
               <li><strong>Signup Date:</strong> ${signupDate}</li>
               <li><strong>User ID:</strong> ${record.id}</li>
             </ul>
             <p>Login method: ${record.app_metadata?.provider || 'Email/Password'}</p>
           `,
         }),
       })

       return new Response(JSON.stringify({ success: true }), {
         headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      })
    }
  })
  ```

#### **Step 2: Deploy Function**

```bash
supabase functions deploy notify-new-user
```

#### **Step 3: Set Environment Variables**

In Supabase Dashboard:
- Go to **Project Settings** → **Edge Functions**
- Add secrets:
  - `RESEND_API_KEY`: Your Resend API key
  - `ADMIN_EMAIL`: Your email (blessedbump.co@gmail.com)

#### **Step 4: Create Database Trigger**

Run this SQL in Supabase SQL Editor:

```sql
-- Create function to call Edge Function
CREATE OR REPLACE FUNCTION notify_new_user()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/notify-new-user',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := jsonb_build_object(
        'record', row_to_json(NEW)
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_user();
```

---

## 📧 Option 3: Simple Database Trigger with Email Service

### **How It Works:**
Create a database trigger that calls an external email API directly.

### **Setup Steps:**

#### **Step 1: Choose Email Service**
- **Resend** (recommended, easy setup)
- **SendGrid** (popular, free tier)
- **Mailgun** (reliable, free tier)
- **SMTP** (any email provider)

#### **Step 2: Create Database Function**

Run this SQL in Supabase SQL Editor (using Resend as example):

```sql
-- Enable pg_net extension (for HTTP requests)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to send email notification
CREATE OR REPLACE FUNCTION notify_new_user_signup()
RETURNS TRIGGER AS $$
DECLARE
  email_body TEXT;
  user_email TEXT;
  user_name TEXT;
BEGIN
  user_email := NEW.email;
  user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User');
  
  email_body := format('
    <h2>🎉 New User Signed Up!</h2>
    <p>A new user has registered for BlessedBump.</p>
    <ul>
      <li><strong>Email:</strong> %s</li>
      <li><strong>Name:</strong> %s</li>
      <li><strong>User ID:</strong> %s</li>
      <li><strong>Signup Date:</strong> %s</li>
    </ul>
    <p>You can view all users in your Supabase Dashboard.</p>
  ', 
    user_email,
    user_name,
    NEW.id,
    NEW.created_at
  );

  -- Send HTTP request to Resend API
  PERFORM
    net.http_post(
      url := 'https://api.resend.com/emails',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer YOUR_RESEND_API_KEY'
      ),
      body := jsonb_build_object(
        'from', 'BlessedBump <notifications@blessedbump.in>',
        'to', ARRAY['blessedbump.co@gmail.com'],
        'subject', 'New User Registration - BlessedBump',
        'html', email_body
      )
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_user_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_user_signup();
```

#### **Step 3: Replace API Key**
- Sign up for Resend: https://resend.com
- Get your API key
- Replace `YOUR_RESEND_API_KEY` in the SQL above
- Replace email addresses as needed

---

## 🎯 Recommended Approach: Option 3 (Simplest)

For your use case, **Option 3** is the simplest because:
- ✅ No external services needed (just email API)
- ✅ Direct database trigger
- ✅ Easy to set up
- ✅ Free tier available on email services

---

## 📋 Step-by-Step: Quick Setup (Option 3)

### **1. Sign Up for Resend** (Free tier: 3,000 emails/month)
- Go to: https://resend.com
- Sign up (free)
- Get API key from dashboard

### **2. Verify Your Domain** (Optional but Recommended)
- Add your domain (`blessedbump.in`)
- Add DNS records
- Or use their default domain for testing

### **3. Run SQL in Supabase**

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Enable pg_net extension:
   ```sql
   CREATE EXTENSION IF NOT EXISTS pg_net;
   ```
3. Create the function and trigger (use code from Option 3 above)
4. Replace `YOUR_RESEND_API_KEY` with your actual API key
5. Replace email addresses as needed

### **4. Test It**

1. Create a test user account
2. Check your email inbox
3. You should receive a notification!

---

## 📧 Email Template Example

Here's what the email will look like:

```
Subject: 🎉 New User Signed Up - BlessedBump

🎉 New User Signed Up!

A new user has registered for BlessedBump.

• Email: user@example.com
• Name: John Doe
• User ID: abc123-def456-...
• Signup Date: January 1, 2024, 10:30 AM

You can view all users in your Supabase Dashboard.
```

---

## 🔒 Security Notes

1. **Store API Keys Securely:**
   - Don't hardcode API keys in SQL
   - Use Supabase Vault for secrets (in production)

2. **Rate Limiting:**
   - Email services have rate limits
   - Free tiers usually have daily limits

3. **Error Handling:**
   - Add error handling in functions
   - Log failures for debugging

---

## 💡 Alternative: Use Supabase Auth Hooks (Future)

Supabase is working on Auth Hooks feature that will make this even easier. For now, the database trigger approach works great!

---

## ✅ Summary

**Yes, you can get email notifications when new users sign up!**

**Easiest Way:**
1. Sign up for Resend (free)
2. Get API key
3. Run SQL code in Supabase (Option 3)
4. Done! You'll get emails for each new signup

**Email Services (Free Tiers):**
- Resend: 3,000 emails/month (free)
- SendGrid: 100 emails/day (free)
- Mailgun: 5,000 emails/month (free)

**Would you like me to help you set this up?** I can provide the exact SQL code with your email address! 🚀

