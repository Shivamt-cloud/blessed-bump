# Session Timeout Information for BlessedBump

## Current Session Configuration

### Supabase Authentication Timeouts

**Access Token Expiration:**
- **Default:** 1 hour (3600 seconds)
- **Auto-refresh:** Enabled (`autoRefreshToken: true`)
- **Behavior:** Supabase automatically refreshes the access token before it expires

**Refresh Token Expiration:**
- **Default:** 30 days (configurable in Supabase dashboard)
- **Behavior:** As long as the refresh token is valid, users remain logged in

### Current Application Timeouts

These are **API request timeouts**, not session expiration:

1. **Session Initialization Timeout:** 20 seconds
   - Maximum time to wait for initial session check on page load
   - If exceeded, app continues loading but may show loading state

2. **Session Fetch Timeout:** 10 seconds
   - Maximum time to wait when fetching session from Supabase
   - If exceeded, relies on auth state listener for restoration

3. **Profile Fetch Timeout:** 8 seconds
   - Maximum time to wait when fetching user profile from database
   - If exceeded, creates default profile from auth metadata

4. **Realtime Connection Timeout:** 20 seconds
   - Maximum time for realtime connection establishment

### Idle User Behavior

**Currently, there is NO explicit idle timeout configured.**

This means:
- ✅ Users remain logged in indefinitely as long as:
  - The refresh token is valid (default: 30 days)
  - The user doesn't explicitly log out
  - The session isn't revoked in Supabase dashboard
- ✅ Access tokens are automatically refreshed in the background
- ✅ Users can leave the app idle and return later without being logged out

### When Users Get Logged Out

Users will be logged out automatically only if:

1. **Refresh Token Expires:** After 30 days of inactivity (default Supabase setting)
2. **Explicit Logout:** User clicks logout button
3. **Session Revoked:** Admin revokes session in Supabase dashboard
4. **Token Invalid:** JWT token becomes invalid or corrupted
5. **Browser Data Cleared:** User clears browser localStorage/cookies

### Recommendations

If you want to add an **idle timeout** (e.g., log out after 30 minutes of inactivity), you would need to:

1. Track user activity (mouse movements, clicks, keyboard input)
2. Set a timer that resets on activity
3. Log out user after idle period expires

**Current Recommendation:** Keep the current behavior (no idle timeout) because:
- Better user experience (users don't get logged out unexpectedly)
- Supabase handles token refresh automatically
- 30-day refresh token provides good balance of security and convenience
- Users can manually log out if needed

---

## Summary

**Session Duration:** Up to 30 days (refresh token lifetime)
**Access Token:** 1 hour (auto-refreshed)
**Idle Timeout:** None configured
**Auto-logout:** Only on refresh token expiration (30 days) or explicit logout

