# Conversion Tracking Diagnostic Guide

## Issue Report (2026-05-04)
User reported:
1. Form not redirecting to thank-you page
2. Conversion goals not visible to Google
3. Phone tracking showing as inactive
4. Tags appearing to have "dropped off"

## Quick Diagnostic Steps

### Test 1: Verify Tags Are Loading
1. Go to https://tetongroup.ai/ai-receptionist
2. Open Chrome DevTools (F12)
3. Go to Console tab
4. Type: `window.gtag`
5. **Expected:** Should show `function gtag()`
6. **If undefined:** Tags aren't loading (CRITICAL)

### Test 2: Check Form Submission
1. Stay on /ai-receptionist
2. Open DevTools → Network tab
3. Fill out the demo form with test data:
   - Business: "Test Company"
   - Industry: "Legal"
   - Phone: "555-1234"
4. Click "Have My Custom AI Call Me Now"
5. **Expected:** 
   - Network tab shows POST to `/api/vapi-demo`
   - Response status 200
   - Browser redirects to `/ai-receptionist/demo-thank-you?business=Test%20Company&phone=555-1234`
6. **If form just hangs:** API error (check server logs)
7. **If no redirect:** JavaScript error (check Console for red errors)

### Test 3: Verify Conversion Fires on Thank-You Page
1. Manually go to: https://tetongroup.ai/ai-receptionist/demo-thank-you?business=Test&phone=555
2. Open DevTools → Network tab
3. Filter for "collect" (Google Analytics requests)
4. **Expected:** Should see requests to `google-analytics.com/g/collect` or similar
5. Check request payload for conversion events

### Test 4: Phone Click Tracking
1. Go to https://tetongroup.ai/ai-receptionist
2. Open DevTools → Network tab
3. Click the phone number in the header: "(208) 789-7053"
4. **Expected:** 
   - Network tab shows gtag request
   - Request includes `phone_call_lead`
5. **If no request:** Click handler not attached

## Common Issues & Fixes

### Issue: "Tags not found on site"
**Cause:** Google Tag Assistant runs before React hydrates  
**Fix:** Reload page AFTER it fully loads, then click Tag Assistant icon  
**Verification:** View page source (Ctrl+U) and search for "AW-18099790158"

### Issue: "Form not redirecting"
**Possible Causes:**
1. API endpoint `/api/vapi-demo` returning error
2. JavaScript error preventing redirect
3. CORS or network issue

**Debug Steps:**
```javascript
// In browser console on /ai-receptionist page:
fetch('/api/vapi-demo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    businessName: 'Test',
    website: '',
    testPhone: '5551234',
    industry: 'Legal',
    faqs: ''
  })
}).then(r => r.json()).then(console.log).catch(console.error)
```

### Issue: "Phone tracking inactive"
**Cause:** Conversion action not created in Google Ads dashboard  
**Current Status:** Code uses placeholder `phone_call_lead` - needs real conversion label from Google Ads

## Expected Behavior (When Everything Works)

### Demo Form Flow
1. User fills form on `/ai-receptionist`
2. Clicks submit button
3. `POST /api/vapi-demo` → triggers Vapi to call user
4. **Redirect** to `/ai-receptionist/demo-thank-you?business=X&phone=Y`
5. Thank-you page loads
6. **useEffect hook fires** → sends conversions:
   - `AW-18099790158/XcdjCJfJ9aMcEM7C07ZD` (lead form)
   - `AW-18099790158/demo_call_started` (demo initiated)
   - GA4 `generate_lead` event

### Phone Click Flow
1. User clicks phone number
2. **onClick handler fires** → sends conversion:
   - `AW-18099790158/phone_call_lead`
   - GA4 `phone_call_clicked` with label
3. Browser opens tel: link (call on mobile)

## Files to Check

### Conversion Tracking Implementation
- `/app/ai-receptionist/page.tsx` (lines ~65-95: form submit, ~125: phone click)
- `/app/ai-receptionist/demo-thank-you/page.tsx` (lines ~17-30: conversion firing)
- `/app/idaho/consultation-thank-you/page.tsx` (consultation conversion)
- `/app/page.tsx` (homepage phone tracking)

### API Endpoint
- `/app/api/vapi-demo/route.ts` (handles demo form submission)

### Global Tags
- `/app/layout.tsx` or similar (Google Ads global site tags)

## Verification Checklist

- [ ] Global tags load on every page (`window.gtag` is defined)
- [ ] Form submits successfully (no console errors)
- [ ] Form redirects to thank-you page after submit
- [ ] Thank-you page shows dynamic content (business name, phone)
- [ ] Conversion events fire on thank-you page load (check Network tab)
- [ ] Phone clicks fire conversion events (check Network tab)
- [ ] Google Tag Assistant shows both tag IDs when page is fully loaded

## If Still Broken

### Immediate Actions
1. Check Vercel deployment logs for errors
2. Check browser console for JavaScript errors
3. Test form submission with different browsers
4. Verify API endpoint is responding (test with curl or Postman)

### Nuclear Option (If Tags Really Are Missing)
Re-deploy the global tags:
```bash
cd /Users/brandonsmith/projects/tetongroup
git log --oneline -20  # Find last known good commit
git diff HEAD <commit>  # Check what changed
# Restore if needed, then redeploy
```

## Contact Info for Support
- Website: https://tetongroup.ai
- GitHub: github.com/brandonsmith-pixel/idaho-ai-website
- Last known working: 2026-04-28 20:32 MDT
- Current issue reported: 2026-05-04 17:06 MDT

## Next Steps Based on Test Results

**If tests pass:**
- Issue is with Google Tag Assistant timing
- Wait 24-48 hours for Google Ads to show data
- Create the 4 conversion actions in Google Ads dashboard

**If form redirect fails:**
- Check `/api/vapi-demo` logs
- Look for JavaScript errors in console
- Verify Vapi API credentials are valid

**If tags missing from source:**
- Check git history for accidental deletion
- Restore from last working commit
- Redeploy

**If conversion events don't fire:**
- Check React component mounting (Suspense boundaries)
- Verify useEffect dependencies
- Test in incognito mode (to rule out browser extensions)
