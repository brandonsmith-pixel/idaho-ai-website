# AI Receptionist Demo - Testing Checklist

## ✅ What's Been Deployed (Latest: 516b2ea)

### 1. Voice Selection - EXPANDED
- **18 Professional ElevenLabs Voices** (was 10)
  - 7 Female
  - 10 Male  
  - 1 Neutral
- **Voice Cloning Feature Added**
  - Purple upload section at top
  - Upload audio file (MP3/WAV, max 10MB)
  - Creates "Your Voice (Cloned)" option

### 2. Phone Number Formatting - AUTO +1
- Business phone: shows `+1` prefix
- Test phone: shows `+1` prefix
- Backend automatically adds +1 to all numbers
- Users just type digits

### 3. Vapi Integration - TRANSIENT ASSISTANT
- Changed from persistent to transient (inline) assistant
- Should make calls immediately
- Uses phone number: `+18664978716` (Twilio Outbound Line)

### 4. Google Sheets Integration
- Saves all form data to Google Sheets
- Web app URL configured

---

## 🧪 Manual Testing Steps

### Test 1: Form Submission
1. Go to: https://tetongroup.ai/ai-receptionist
2. Fill out all 5 steps:
   - Step 1: Choose industry
   - Step 2: Business info
   - Step 3: Knowledge base (FAQs, services, etc.)
   - Step 4: Voice selection (pick one or clone)
   - Step 5: Enter test phone number
3. Click "CALL ME NOW"
4. Should see success screen

**Expected:** Success message appears

### Test 2: Google Sheets
1. After submitting form
2. Check Google Sheet: "AI Receptionist Demo Requests"
3. Should see new row with all data

**Expected:** New row appears with timestamp

### Test 3: Vapi Demo Call
1. After form submission
2. Wait 10-30 seconds
3. Should receive phone call from +18664978716
4. AI should introduce itself
5. Ask questions about the business you entered

**Expected:** Phone rings with AI demo call

---

## 🔍 Debugging If Calls Don't Work

### Check 1: Vercel Logs
```bash
cd /Users/brandonsmith/projects/tetongroup
vercel logs --since=5m
```

Look for:
- `✅ Created assistant:`
- `✅ Initiated demo call:`
- Any error messages

### Check 2: Vapi Dashboard
1. Go to Vapi dashboard
2. Check "Calls" section
3. Look for recent outbound calls
4. Check call status/errors

### Check 3: Test API Directly
```bash
curl -X POST https://tetongroup.ai/api/vapi-demo \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Business",
    "businessPhone": "+12085551234",
    "testPhone": "+1YOUR_PHONE_HERE",
    "industry": "restaurant",
    "services": "Test services",
    "voiceProvider": "11labs",
    "voiceId": "EXAVITQu4vr4xnSDxMaL"
  }'
```

### Check 4: Environment Variables
In Vercel dashboard, verify:
- `VAPI_PRIVATE_KEY` is set
- `VAPI_PHONE_NUMBER_ID` is set
- `GOOGLE_SHEET_WEB_APP_URL` is set

---

## 🐛 Known Issues

### Issue: Vapi Dashboard Error
**Error:** `Cannot destructure property 'control' of 'useFormContext(...)'`
**Impact:** Harmless - just a UI bug in Vapi's dashboard
**Fix:** None needed (it's on Vapi's side)

### Issue: Logs Not Appearing Immediately
**Symptom:** `vercel logs` shows "No logs found"
**Cause:** Logs take 1-2 minutes to propagate
**Fix:** Wait 2-3 minutes after submission, then check again

---

## ✅ Success Criteria

A fully working demo call means:
1. ✅ Form submits successfully
2. ✅ Data appears in Google Sheet
3. ✅ Phone rings within 30 seconds
4. ✅ AI answers with business name
5. ✅ AI can answer questions from knowledge base
6. ✅ Voice matches selected voice

---

## 📞 Test Phone Number Format

**User enters:** `2085551234` or `(208) 555-1234`
**System sends:** `+12085551234`
**Vapi receives:** `+12085551234`

All US numbers automatically get +1 prefix.

---

## 🚀 Current Status

**Deployment:** ✅ Live at tetongroup.ai
**Build:** ✅ Passing (commit 516b2ea)
**Voice Library:** ✅ 18 voices + cloning
**Phone Formatting:** ✅ Auto +1
**Google Sheets:** ✅ Configured
**Vapi Integration:** ⚠️ Needs testing with real phone call

**Next Step:** Submit a real demo request and verify the call comes through.
