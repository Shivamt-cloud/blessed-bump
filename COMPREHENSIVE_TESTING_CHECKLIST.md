# 🧪 Comprehensive Testing Checklist - BlessedBump

## ✅ Pre-Commit Testing Checklist

### **1. Authentication & Login** 🔐

#### **Email/Password Login:**
- [ ] **Test 1.1:** Login with valid email/password
  - ✅ User should be redirected to dashboard
  - ✅ Navigation should show user name/email
  - ✅ "Login/Join" button should disappear

- [ ] **Test 1.2:** Login with invalid credentials
  - ✅ Error message should appear
  - ✅ User should stay on login page

- [ ] **Test 1.3:** Login with empty fields
  - ✅ Validation error should show
  - ✅ Submit should be prevented

#### **Google OAuth Login:**
- [ ] **Test 1.4:** Google login button works
  - ✅ Clicking button shows loading state
  - ✅ Redirects to Google OAuth page
  - ✅ Shows "Redirecting to Google..." message

- [ ] **Test 1.5:** Complete Google OAuth flow
  - ✅ Select Google account
  - ✅ Grant permissions
  - ✅ Redirects back to app
  - ✅ Shows loading screen ("Completing your sign in...")
  - ✅ User is logged in after redirect
  - ✅ Navigation shows user name/email (not "Login/Join")
  - ✅ Session persists on page refresh

- [ ] **Test 1.6:** Google login callback handling
  - ✅ URL parameters are cleaned after login
  - ✅ No errors in console
  - ✅ User profile is created in Supabase

#### **Signup:**
- [ ] **Test 1.7:** Create new account with email/password
  - ✅ Form validation works
  - ✅ Account is created
  - ✅ User is logged in automatically
  - ✅ Profile is created in database

- [ ] **Test 1.8:** Signup with Google (new user)
  - ✅ Google OAuth flow works
  - ✅ New user account is created
  - ✅ Profile is created automatically

#### **Logout:**
- [ ] **Test 1.9:** Logout functionality
  - ✅ Click logout button
  - ✅ User is logged out
  - ✅ Redirected to calculator page
  - ✅ Session is cleared
  - ✅ "Login/Join" button appears again

#### **Session Persistence:**
- [ ] **Test 1.10:** Session persists on page refresh
  - ✅ Login as user
  - ✅ Refresh page (F5)
  - ✅ User should remain logged in
  - ✅ No login modal should appear

- [ ] **Test 1.11:** Protected routes require login
  - ✅ Try to access `/dashboard` without login
  - ✅ Login modal should appear
  - ✅ After login, should redirect to dashboard

---

### **2. Navigation & Routing** 🧭

- [ ] **Test 2.1:** All navigation links work
  - ✅ GlowBoard → `/dashboard`
  - ✅ Journey Keeper → `/tracker`
  - ✅ Due-Date Oracle → `/calculator`
  - ✅ Fertility Oracle → `/fertility`
  - ✅ Village Voice → `/community`
  - ✅ Profile → `/profile`

- [ ] **Test 2.2:** Navigation shows correct user state
  - ✅ Shows "Login/Join" when logged out
  - ✅ Shows user name/email when logged in
  - ✅ Shows logout button when logged in

- [ ] **Test 2.3:** Mobile navigation
  - ✅ Hamburger menu works
  - ✅ Menu opens/closes correctly
  - ✅ All links work in mobile menu

- [ ] **Test 2.4:** Active route highlighting
  - ✅ Current page is highlighted in navigation
  - ✅ Active state is visible

---

### **3. Dashboard Page** 📊

- [ ] **Test 3.1:** Dashboard loads correctly
  - ✅ Shows welcome message with user name
  - ✅ Displays pregnancy data if available
  - ✅ Shows "Calculate Due Date" if no data

- [ ] **Test 3.2:** Install banner
  - ✅ Banner appears at top (if not dismissed)
  - ✅ "Install Now" button works
  - ✅ Dismiss button works
  - ✅ Banner doesn't reappear after dismiss

- [ ] **Test 3.3:** Dashboard cards render
  - ✅ Main card shows current week
  - ✅ Baby Express card appears
  - ✅ LumiMetrics section shows
  - ✅ Pocket Spark section shows
  - ✅ HeartSync section shows

---

### **4. Calculator Page** 🗓️

- [ ] **Test 4.1:** Due date calculation
  - ✅ Enter LMP date
  - ✅ Due date is calculated correctly
  - ✅ Progress percentage shows
  - ✅ Week information displays

- [ ] **Test 4.2:** Calculator works without login
  - ✅ Page is accessible without login
  - ✅ Calculations work
  - ✅ No errors appear

---

### **5. Profile Page** 👤

- [ ] **Test 5.1:** Profile loads user data
  - ✅ All fields populate with user data
  - ✅ Avatar displays if set
  - ✅ Due date shows if set

- [ ] **Test 5.2:** Update profile
  - ✅ Change name
  - ✅ Change email
  - ✅ Update due date
  - ✅ Save profile
  - ✅ Success message appears
  - ✅ Changes persist after refresh

- [ ] **Test 5.3:** Notification settings
  - ✅ Notification section appears
  - ✅ "Enable Notifications" button works
  - ✅ Browser permission prompt appears
  - ✅ Status updates correctly
  - ✅ "Disable Notifications" works

- [ ] **Test 5.4:** Avatar upload (if implemented)
  - ✅ Click avatar opens file picker
  - ✅ Image uploads
  - ✅ Preview shows
  - ✅ Saves correctly

---

### **6. Install Features** 📱

- [ ] **Test 6.1:** Smart install prompt
  - ✅ Appears after 1+ visit (bottom of screen)
  - ✅ "Install Now" button works
  - ✅ "Learn More" button navigates to `/install`
  - ✅ Dismiss button works
  - ✅ Doesn't reappear after dismiss

- [ ] **Test 6.2:** Dashboard install banner
  - ✅ Appears at top of dashboard
  - ✅ "Install Now" button works
  - ✅ Dismiss button works
  - ✅ Doesn't reappear after dismiss

- [ ] **Test 6.3:** Install page (`/install`)
  - ✅ Page loads correctly
  - ✅ Shows device-specific instructions
  - ✅ Device detection works (iOS/Android/Desktop)
  - ✅ Benefits section displays
  - ✅ All content is visible

- [ ] **Test 6.4:** Footer install link
  - ✅ "📱 Download App" link appears
  - ✅ Links to `/install` page
  - ✅ Works correctly

---

### **7. PWA Features** 🔧

- [ ] **Test 7.1:** Service worker registration
  - ✅ Check browser console for "Service Worker registered"
  - ✅ No errors in console
  - ✅ Works offline (cached content)

- [ ] **Test 7.2:** Manifest file
  - ✅ App name is correct
  - ✅ Icons are correct
  - ✅ Theme colors are correct
  - ✅ Display mode is "standalone"

- [ ] **Test 7.3:** App icons
  - ✅ All icon sizes exist
  - ✅ Icons display correctly
  - ✅ Apple touch icon exists

---

### **8. Responsive Design** 📱💻

- [ ] **Test 8.1:** Mobile view (< 768px)
  - ✅ Navigation menu collapses
  - ✅ All pages are readable
  - ✅ Forms are usable
  - ✅ No horizontal scroll

- [ ] **Test 8.2:** Tablet view (768px - 1024px)
  - ✅ Layout adapts correctly
  - ✅ Content is readable
  - ✅ Navigation works

- [ ] **Test 8.3:** Desktop view (> 1024px)
  - ✅ Full layout displays
  - ✅ All features accessible
  - ✅ Proper spacing

---

### **9. Error Handling** ⚠️

- [ ] **Test 9.1:** Network errors
  - ✅ App handles network failures gracefully
  - ✅ Error messages appear
  - ✅ App doesn't crash

- [ ] **Test 9.2:** Invalid routes
  - ✅ 404 handling (if implemented)
  - ✅ Invalid URLs don't crash app

- [ ] **Test 9.3:** Console errors
  - ✅ No major errors in console
  - ✅ Warnings are acceptable (non-critical)
  - ✅ No React errors

---

### **10. Performance** ⚡

- [ ] **Test 10.1:** Page load speed
  - ✅ Pages load quickly
  - ✅ No long loading times
  - ✅ Smooth transitions

- [ ] **Test 10.2:** Image loading
  - ✅ Images load correctly
  - ✅ No broken images
  - ✅ Logo displays

---

### **11. Browser Compatibility** 🌐

- [ ] **Test 11.1:** Chrome/Edge
  - ✅ All features work
  - ✅ Google login works
  - ✅ PWA install works

- [ ] **Test 11.2:** Safari (iOS/Mac)
  - ✅ All features work
  - ✅ Google login works
  - ✅ PWA install works (via Share → Add to Home Screen)

- [ ] **Test 11.3:** Firefox
  - ✅ Core features work
  - ✅ Google login works
  - ⚠️ PWA install may not work (not supported)

---

### **12. Google Login Specific Tests** 🔍

- [ ] **Test 12.1:** Google login from login page
  - ✅ Button appears
  - ✅ Loading state shows
  - ✅ OAuth flow completes
  - ✅ User is logged in

- [ ] **Test 12.2:** Google login from auth modal
  - ✅ Modal shows Google button
  - ✅ Button works
  - ✅ Modal closes after login
  - ✅ User is redirected correctly

- [ ] **Test 12.3:** Google login callback handling
  - ✅ URL has OAuth parameters (briefly)
  - ✅ Parameters are cleaned
  - ✅ Loading screen appears
  - ✅ User session is established
  - ✅ Navigation updates correctly

- [ ] **Test 12.4:** Google login with existing account
  - ✅ Existing user can login with Google
  - ✅ Profile data loads correctly

- [ ] **Test 12.5:** Google login with new account
  - ✅ New account is created
  - ✅ Profile is created automatically
  - ✅ User data is saved

- [ ] **Test 12.6:** Google login error handling
  - ✅ User cancellation is handled
  - ✅ Network errors are handled
  - ✅ Error messages appear

---

### **13. Data Persistence** 💾

- [ ] **Test 13.1:** Profile data saves
  - ✅ Changes persist in database
  - ✅ Data loads on refresh
  - ✅ Data syncs across devices

- [ ] **Test 13.2:** Pregnancy data saves
  - ✅ Due date saves
  - ✅ LMP date saves
  - ✅ Data persists

---

### **14. UI/UX** 🎨

- [ ] **Test 14.1:** Loading states
  - ✅ Loading indicators appear
  - ✅ Buttons show loading state
  - ✅ No blank screens

- [ ] **Test 14.2:** Animations
  - ✅ Smooth transitions
  - ✅ No janky animations
  - ✅ Hover effects work

- [ ] **Test 14.3:** Forms
  - ✅ All inputs work
  - ✅ Validation messages appear
  - ✅ Submit buttons work

---

## 🔍 Code Review Checklist

### **Code Quality:**
- ✅ No linting errors
- ✅ No console errors (check browser console)
- ✅ No unused imports
- ✅ Components are properly structured
- ✅ Error handling is present

### **Security:**
- ✅ API keys are not exposed
- ✅ Environment variables are used correctly
- ✅ User input is validated
- ✅ Authentication checks are in place

### **Performance:**
- ✅ No unnecessary re-renders
- ✅ Images are optimized
- ✅ Code is minified in production

---

## 📋 Quick Test Script

### **Run These Tests:**

1. **Authentication Flow:**
   ```
   1. Logout if logged in
   2. Try to access /dashboard → Should show login modal
   3. Login with email/password → Should redirect to dashboard
   4. Logout → Should return to calculator
   5. Login with Google → Complete OAuth flow → Should be logged in
   ```

2. **Navigation:**
   ```
   1. Click all nav links → Should navigate correctly
   2. Check active state highlighting
   3. Test mobile menu (resize browser)
   ```

3. **Install Features:**
   ```
   1. Visit dashboard → Check for install banner
   2. Scroll to bottom → Check for install prompt
   3. Visit /install → Check page loads
   4. Check footer → Should have install link
   ```

4. **Profile:**
   ```
   1. Go to profile page
   2. Update name → Save → Check persistence
   3. Test notification settings
   4. Check all sections load
   ```

---

## ✅ Testing Status

**Status:** ⏳ Ready for Testing

**Next Steps:**
1. Run through all test cases above
2. Check browser console for errors
3. Test on multiple devices/browsers
4. Fix any issues found
5. Re-test fixed issues
6. Ready for commit!

---

## 🐛 Known Issues to Check

- [ ] Check if InstallPrompt component causes any Router errors
- [ ] Verify Google OAuth callback URL cleaning works
- [ ] Check notification permission request doesn't break flow
- [ ] Verify all navigation links work after Google login

---

## 📝 Notes

- Test on actual devices if possible (especially mobile)
- Test with slow network connection
- Test with browser dev tools open (network throttling)
- Check accessibility (keyboard navigation, screen readers)

---

**Complete this checklist before committing!** ✅

