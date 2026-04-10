# Simple Onboarding Plan - Built for Ages 8-80

## What I Just Created

### 1. **Smart Success Page** (`/ai-receptionist/success-new`)
After payment, customers see different flows based on their plan:

#### **Self-Serve ($99/mo):**
```
🎉 Welcome!

⚡ Quick Setup - Takes 5 Minutes

[Set Up Your AI Now →]
  Big obvious button
  Routes to /portal/setup
```

#### **Full-Service ($500/mo):**
```
👔 Welcome to Full-Service!

Your Onboarding Process:
1️⃣ Book Your Onboarding Call (Required)
   [📅 Schedule Now] ← Calendly link

2️⃣ We Build Your AI (1-2 weeks)
3️⃣ Training & Go Live

[Go to Your Dashboard]
```

### 2. **Plan Detection API** (`/api/stripe-session`)
- Fetches Stripe session
- Determines if customer bought $99 or $500 plan
- Returns plan type to success page

### 3. **Complete Flow Documentation** (`POST_PURCHASE_FLOW.md`)
- Detailed wireframes for both flows
- Step-by-step wizard design for Self-Serve
- UX principles (one action per screen, progress bars, etc.)

---

## What Still Needs to Be Built

### **Priority 1: Self-Serve Setup Wizard** (`/portal/setup`)

This is the 5-minute setup flow for $99 customers:

#### **Step 1: Get Phone Number**
```
🎉 Your AI Needs a Phone Number!

[Get My Phone Number]
```
- Call Vapi API to provision number
- Store in database
- Show customer their new number

#### **Step 2: Business Info**
```
📝 Teach Your AI

1. Business Name: [_______]
2. What you do: [_______]
3. Hours: [24/7 | Mon-Fri 9-5 | Custom]
4. Forward complex calls to: [_______]

[Next →]
```

#### **Step 3: Choose Voice**
```
🎤 Pick a Voice

○ Sarah (Friendly female) [▶ Preview]
○ Mike (Professional male) [▶ Preview]
○ Emma (Warm & upbeat) [▶ Preview]

[Next →]
```

#### **Step 4: Test It**
```
📞 Call Your AI Right Now!

Your number: +1 (555) 123-4567

[Call This Number to Test]
or
[Have the AI Call Me]

✅ [Sounds Good - I'm Ready!]
⚙️ [Edit Settings]
```

#### **Step 5: Go Live**
```
🚀 You're Live!

Your AI is now answering calls!

Next: Forward your business calls
[Show Me How] ← guides for AT&T, Verizon, etc.

[Go to Dashboard]
```

### **Priority 2: Forward Instructions**
Simple guides for each carrier:
- AT&T: Dial *21*15551234567# from your phone
- Verizon: Dial *72 + 15551234567
- T-Mobile: #004# then call setup
- etc.

### **Priority 3: Full-Service Status Dashboard**
For $500 customers waiting for setup:
```
⏳ Your AI is Being Built

Status: In Progress

✅ Subscription active
✅ Onboarding call scheduled (Jan 15, 2pm)
⏳ AI setup in progress
⏳ Launch: Jan 29, 2026

[Reschedule Call]
[Contact Account Manager]
```

---

## Key Design Principles Applied

### 1. **One Big Button Per Screen**
- No confusion about what to do next
- Can't get lost

### 2. **Progress Bar**
```
[■■■□□] Step 3 of 5
```
Shows exactly where they are

### 3. **Time Estimates**
- "Takes 5 minutes"
- "Step 3 of 5"
- "You're 60% done!"

### 4. **Can't Skip Required Steps**
- Wizard is linear
- Must complete each step
- Can go back, but not forward without completing

### 5. **Big Fonts, Simple Language**
- 18px+ text
- No jargon
- "Call this number" not "Initiate telephonic communication"

### 6. **Visual Feedback**
- ✅ Green checkmarks for done
- ⏳ Orange spinner for in-progress
- 🎉 Celebration animation on completion

---

## Technical Requirements

### **Vapi Phone Number Provisioning:**
```javascript
POST https://api.vapi.ai/phone-number
{
  "provider": "twilio",
  "areaCode": "555" // optional
}
```

### **Database Changes Needed:**
```sql
ALTER TABLE customers ADD COLUMN phone_number TEXT;
ALTER TABLE customers ADD COLUMN vapi_phone_id TEXT;
ALTER TABLE customers ADD COLUMN setup_completed BOOLEAN DEFAULT false;
ALTER TABLE customers ADD COLUMN onboarding_call_scheduled TIMESTAMPTZ;
```

### **New API Endpoints:**
- `/api/portal/setup/phone` - Provision Vapi number
- `/api/portal/setup/business` - Save business info
- `/api/portal/setup/voice` - Save voice selection
- `/api/portal/setup/test-call` - Trigger outbound test
- `/api/portal/setup/complete` - Mark setup done

---

## Success Metrics

**Self-Serve:**
- Time to first test call: <5 minutes
- Setup completion rate: >90%
- Support tickets: <5%

**Full-Service:**
- Onboarding call booked: >95% (within 24 hours)
- Customer satisfaction: 4.5/5 stars

---

## Next Steps

1. **Build setup wizard** (`/portal/setup`)
2. **Test with Vapi phone provisioning**
3. **Create forwarding instructions**
4. **Add Calendly embed for Full-Service**
5. **Create status dashboard for waiting customers**

**Estimate: 1-2 days of focused development**
