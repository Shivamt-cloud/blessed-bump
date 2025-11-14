# Logout Timeout Summary for BlessedBump

## 🔐 When Users Get Logged Out

### Automatic Logout Times

1. **Refresh Token Expiration: 30 Days**
   - Users are automatically logged out after **30 days of inactivity**
   - This is Supabase's default refresh token lifetime
   - After 30 days, users must log in again

2. **Access Token Expiration: 1 Hour** (Auto-refreshed)
   - Access tokens expire every 1 hour
   - **BUT** Supabase automatically refreshes them in the background
   - Users don't get logged out due to access token expiration
   - This happens transparently

### Manual Logout

Users can log out immediately by clicking the "Logout" button in the navigation.

### Other Logout Scenarios

- **Session Revoked:** Admin revokes session in Supabase dashboard
- **Browser Data Cleared:** User clears localStorage/cookies
- **Token Invalid:** JWT token becomes corrupted or invalid

---

## ⏱️ Current Timeout Settings

### Session Duration
- **Maximum:** 30 days (refresh token lifetime)
- **Minimum:** Until user clicks logout
- **Idle Timeout:** None configured

### API Request Timeouts (Not Logout Related)
- Session initialization: 20 seconds
- Session fetch: 10 seconds  
- Profile fetch: 8 seconds
- Realtime connection: 20 seconds

---

## 📊 Summary Table

| Event | Time | Action |
|-------|------|--------|
| Access Token Expires | 1 hour | Auto-refreshed (no logout) |
| Refresh Token Expires | 30 days | User logged out automatically |
| User Clicks Logout | Immediate | User logged out immediately |
| Browser Data Cleared | Immediate | User logged out immediately |
| Session Revoked | Immediate | User logged out immediately |

---

## 💡 Key Points

✅ **Users stay logged in for up to 30 days** of inactivity
✅ **No idle timeout** - users won't be logged out for being inactive
✅ **Access tokens auto-refresh** - users don't notice token refreshes
✅ **Only explicit logout or 30-day expiration** will log users out

---

## 🔧 To Change Logout Time

If you want to change the 30-day expiration:

1. Go to Supabase Dashboard
2. Navigate to Authentication → Settings
3. Adjust "JWT expiry" or "Refresh token expiry" settings
4. Changes will apply to new sessions

**Note:** Current sessions will continue with their original expiration time.

