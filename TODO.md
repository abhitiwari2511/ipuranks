# TODO: Keep User Logged In Across Refresh

## Goal
Keep the user logged in when the page refreshes.
Only log out when user explicitly clicks Logout.

## Why refresh is logging out right now
- Result page depends on router state only (`location.state`), which is lost on hard refresh.
- Backend session is deleted immediately after successful login.

## Implementation Checklist

### 1) Persist auth/result data after successful login
File: frontend/src/components/LoginForm.tsx
- [ ] After successful login, save these keys in localStorage:
  - [ ] `ipuranks_logged_in` = `"true"`
  - [ ] `ipuranks_result_data` = `JSON.stringify(response.data.result)`
  - [ ] `ipuranks_session_id` = current captcha session id
- [ ] Keep navigate to `/result`.

### 2) Restore data on refresh in result page
File: frontend/src/pages/ResultPage.tsx
- [ ] Read `resultData` from `location.state?.resultData` first.
- [ ] If missing, read and parse `localStorage.getItem("ipuranks_result_data")`.
- [ ] Use parsed localStorage data when route state is empty.
- [ ] Redirect only when both route state and localStorage data are missing/invalid.

### 3) Do not delete backend session immediately after login
File: backend/src/controllers/user.ts
- [ ] Remove `deleteSession(sessionId)` from successful login flow.
- [ ] Keep session alive after login so refresh can continue as authenticated.

### 4) Send session id in logout request
File: frontend/src/components/StudentInfoHeader.tsx
- [ ] Read `ipuranks_session_id` from localStorage.
- [ ] Call logout API with header `x-session-id`.

### 5) Clear localStorage only on explicit logout
File: frontend/src/components/StudentInfoHeader.tsx
- [ ] On successful (or fallback) logout, remove:
  - [ ] `ipuranks_logged_in`
  - [ ] `ipuranks_result_data`
  - [ ] `ipuranks_session_id`
- [ ] Then navigate user to home/login.

### 6) Keep frontend types aligned with backend response
File: frontend/src/hooks/useLogin.ts
- [ ] Update `LoginResponse` type so `result` matches actual payload type (array/object), not boolean.

### 7) Optional but recommended: session expiry cleanup
File: backend/src/utils/sessionStore.ts
- [ ] Add TTL cleanup for stale sessions (for example 30 to 60 minutes).
- [ ] Prevent in-memory session map from growing indefinitely.

## API Behavior You Want (Target)
- Login -> creates or continues active session.
- Refresh on `/result` -> still shows data from persisted client storage.
- Logout button -> clears server session + local client storage.
- No auto logout on refresh.

## Manual Testing Checklist
- [ ] Login with valid details.
- [ ] Confirm result page opens.
- [ ] Refresh browser on `/result`.
- [ ] Confirm user stays on result page with data intact.
- [ ] Click Logout.
- [ ] Confirm redirect to home/login.
- [ ] Try opening `/result` after logout; confirm redirect (not authenticated).
- [ ] Re-login and verify flow again.

## Nice-to-have follow-ups
- [ ] Add route guard for `/result` using `ipuranks_logged_in`.
- [ ] Replace localStorage with HTTP-only secure cookie based auth for stronger security.
- [ ] Add endpoint like `/user/me` or `/user/session` to verify active session from backend.
