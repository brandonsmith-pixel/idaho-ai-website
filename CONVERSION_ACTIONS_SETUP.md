# Google Ads Conversion Actions - Setup Guide

## Overview
All conversion tracking code is implemented. You need to create these conversion actions in Google Ads.

---

## 1️⃣ Lead Form Submission (Demo Request)

**Status:** ✅ Code Ready
**Conversion Name:** "Submit lead form"  
**Event Code in Site:** `XcdjCJfJ9aMcEM7C07ZD`  
**Already configured per your document** ✅

**Fires when:** User submits demo request form on `/ai-receptionist#demo`

---

## 2️⃣ Demo Call Started

**Status:** ⚠️ Needs Google Ads Setup
**Conversion Name:** "Demo Call Started"  
**Event Code in Site:** `demo_call_started`

**How to create:**
1. Go to Google Ads → Goals → Conversions
2. Click "+ New conversion action"
3. Select "Website"
4. Action name: "Demo Call Started"
5. Category: "Submit lead form"
6. Value: Don't use a value
7. Count: One
8. Click-through window: 30 days
9. Google will provide a conversion label → Replace `demo_call_started` in code with that label

**Fires when:** AI receptionist successfully initiates call to prospect's phone

**Code locations:**
- `app/ai-receptionist/page.tsx` line ~121

---

## 3️⃣ Phone Call Lead (Click-to-Call)

**Status:** ⚠️ Needs Google Ads Setup
**Conversion Name:** "Phone Call Lead"  
**Event Code in Site:** `phone_call_lead`

**How to create:**
1. Go to Google Ads → Goals → Conversions
2. Click "+ New conversion action"
3. Select "Website" → "Phone calls" → "Clicks on phone number on website"
4. Action name: "Phone Call Lead"
5. Value: Don't use a value (or set to $10 estimated value)
6. Count: Every
7. Click-through window: 30 days
8. Google will provide a conversion label → Replace `phone_call_lead` in code with that label

**Fires when:** User clicks any phone number link

**Code locations (5 places):**
- `app/ai-receptionist/page.tsx` - Header phone (line ~158)
- `app/ai-receptionist/success/page.tsx` - Success page phone (line ~316)
- `app/idaho/page.tsx` - Header phone (line ~142)
- `app/idaho/page.tsx` - Contact success phone (line ~472)
- `app/page.tsx` - Homepage footer phone (line ~641)

---

## 4️⃣ Purchase Completed

**Status:** ⚠️ Needs Google Ads Setup  
**Conversion Name:** "Purchase Completed"  
**Event Code in Site:** `purchase_completed`

**How to create:**
1. Go to Google Ads → Goals → Conversions
2. Click "+ New conversion action"
3. Select "Website" → "Purchase"
4. Action name: "Purchase Completed"
5. Category: "Purchase"
6. Value: ✅ Use different values for each conversion
7. Count: One
8. Click-through window: 90 days
9. Google will provide a conversion label → Replace `purchase_completed` in code with that label

**Fires when:** User completes Stripe checkout (self-serve $99 or full-service $500)

**Code locations:**
- `app/ai-receptionist/success/page.tsx` line ~39

**Includes:**
- Transaction value ($99 or $500)
- Currency (USD)
- Transaction ID (Stripe session ID)
- Product details

---

## Quick Setup Checklist

Follow these steps in order:

### Step 1: Create Conversion Actions
- [ ] "Demo Call Started" (get label, replace in code)
- [ ] "Phone Call Lead" (get label, replace in code)  
- [ ] "Purchase Completed" (get label, replace in code)

### Step 2: Update Code
Replace placeholder labels with real ones from Google Ads:
```bash
# Find and replace in code:
demo_call_started → [YOUR_LABEL_FROM_GOOGLE]
phone_call_lead → [YOUR_LABEL_FROM_GOOGLE]
purchase_completed → [YOUR_LABEL_FROM_GOOGLE]
```

### Step 3: Deploy Changes
```bash
git add -A
git commit -m "Update conversion labels from Google Ads"
git push
vercel --prod
```

### Step 4: Test
1. Submit demo form → Check for "Submit lead form" conversion
2. Wait for AI call → Check for "Demo Call Started" conversion
3. Click phone number → Check for "Phone Call Lead" conversion
4. Complete checkout → Check for "Purchase Completed" conversion

---

## Additional Tracking Implemented

Beyond conversion actions, we also fire standard Google Analytics events:

- `generate_lead` - When demo form submitted
- `phone_call_clicked` - When phone clicked (with location labels)
- `purchase` - Enhanced e-commerce purchase event

These help with audience building and don't require conversion action setup.

---

## Current Status Summary

| Conversion | Code Ready | Google Ads Setup | Label to Replace |
|------------|-----------|------------------|------------------|
| Lead Form Submit | ✅ | ✅ (from document) | XcdjCJfJ9aMcEM7C07ZD |
| Demo Call Started | ✅ | ⚠️ Needed | `demo_call_started` |
| Phone Call Lead | ✅ | ⚠️ Needed | `phone_call_lead` |
| Purchase Completed | ✅ | ⚠️ Needed | `purchase_completed` |

Once you create the 3 conversion actions in Google Ads and give me the labels, I'll update the code and deploy!
