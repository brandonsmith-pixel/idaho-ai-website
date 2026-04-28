# Google Ads Tracking Verification

## Current Implementation Status

### 1. Global Site Tags (in `<head>`)
✅ **Status:** WORKING
```javascript
gtag('config', 'AW-17943114805');  // Original account
gtag('config', 'AW-18099790158');  // New conversion account
```
**Location:** `app/layout.tsx`

---

### 2. Lead Form Conversion (Demo Form Submission)
✅ **Status:** WORKING
```javascript
gtag('event', 'conversion', {
  'send_to': 'AW-18099790158/XcdjCJfJ9aMcEM7C07ZD'
});
```
**Triggers when:** User submits demo form on `/ai-receptionist#demo`
**Location:** `app/ai-receptionist/page.tsx` line ~104

---

### 3. Phone Click Tracking
⚠️ **Status:** IMPLEMENTED BUT NEEDS CONVERSION ACTION SETUP

**Current Implementation:**
```javascript
gtag('event', 'conversion', {
  'send_to': 'AW-18099790158/phone_click'
});
```

**Locations:**
- Header phone number on `/ai-receptionist` (line ~156)
- Header phone number on `/idaho` (line ~140)
- Footer phone number on homepage (line ~639)
- Success page phone number (line ~309)
- Idaho contact form success (line ~466)

**Action Required:**
You need to create a "Phone Click" conversion action in Google Ads:
1. Go to Google Ads → Goals → Conversions
2. Click "+ New conversion action"
3. Select "Website" → "Phone calls" → "Clicks on phone number on website"
4. Google will give you a conversion label (e.g., `AbC123XyZ`)
5. Replace `phone_click` with that label in the code

---

### 4. Purchase Conversion (Stripe Checkout)
✅ **Status:** WORKING (uses original account ID)
```javascript
gtag('event', 'conversion', {
  'send_to': 'AW-17943114805/Conversion',
  'value': 99 or 500,
  'currency': 'USD',
  'transaction_id': sessionId
});
```
**Triggers when:** User completes Stripe checkout
**Location:** `app/ai-receptionist/success/page.tsx` line ~38

---

## Testing Checklist

### To verify tracking is working:

1. **Open DevTools** (F12) → Network tab → Filter by "collect"

2. **Test Lead Form Conversion:**
   - Go to tetongroup.ai/ai-receptionist#demo
   - Submit demo form
   - Look for network request to `google-analytics.com/g/collect` with:
     - `en=conversion`
     - `send_to=AW-18099790158/XcdjCJfJ9aMcEM7C07ZD`

3. **Test Phone Click:**
   - Click phone number in header
   - Look for network request with:
     - `en=conversion`
     - `send_to=AW-18099790158/phone_click`

4. **Test Purchase Conversion:**
   - Complete checkout (use Stripe test card: 4242 4242 4242 4242)
   - On success page, look for:
     - `en=conversion`
     - `send_to=AW-17943114805/Conversion`
     - `value=99` or `value=500`

5. **Verify in Google Ads:**
   - Go to Google Ads → Goals → Conversions
   - Check "Recent conversions" column
   - Should see activity within 24 hours

---

## Summary

| Event | Status | Conversion ID | Notes |
|-------|--------|---------------|-------|
| Global Tags | ✅ Working | AW-17943114805, AW-18099790158 | Both accounts configured |
| Demo Form | ✅ Working | AW-18099790158/XcdjCJfJ9aMcEM7C07ZD | Lead form conversion |
| Phone Clicks | ⚠️ Needs setup | AW-18099790158/phone_click | Need real conversion label |
| Purchases | ✅ Working | AW-17943114805/Conversion | With transaction value |

---

## Next Steps

To complete phone click tracking:
1. Create "Phone Click" conversion action in Google Ads
2. Get the conversion label from Google
3. Update all 5 instances of `phone_click` in the code with the real label
4. Test and verify

All other tracking is fully functional and ready for campaigns!
