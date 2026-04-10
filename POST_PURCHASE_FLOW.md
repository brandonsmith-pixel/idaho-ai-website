# Post-Purchase Flow Design

## Goal
Make it so simple an 8-year-old or 80-year-old can set up their AI receptionist without confusion.

---

## 🎯 **SELF-SERVE ($99/mo) - DIY Setup**

### **Immediately After Payment:**

#### **Step 1: Success Page (Current)**
✅ "Welcome! Your subscription is active"
❌ Remove: "Check your email" (adds friction)
❌ Remove: "2-4 weeks" (scary!)

#### **Step 2: Instant Redirect to Setup Wizard**
Big obvious button: **"Set Up Your AI Now (5 Minutes)"**

### **Setup Wizard (New - Need to Build):**

#### **Screen 1: Get Your Phone Number**
```
🎉 Your AI Needs a Phone Number!

We'll give you a dedicated phone number that your AI will answer.

[🇺🇸 Get My Phone Number]

⏱️ Takes 30 seconds
```

**What happens:**
- Provision Vapi phone number via API
- Assign to their customer record
- Show them: "Your AI's number: +1 (555) 123-4567"

#### **Screen 2: Tell Your AI About Your Business**
```
📝 Teach Your AI

Answer these quick questions so your AI knows how to help callers:

1. Business Name: [_______]
2. What you do: [_______]
3. Business hours: [dropdown: 24/7 | Mon-Fri 9-5 | Custom]
4. Main phone (for forwarding): [_______]

[Next →]
```

#### **Screen 3: Choose Your AI's Voice**
```
🎤 Pick a Voice

[Preview buttons for 5-6 voices]
○ Sarah (Friendly female)
○ Mike (Professional male)
○ Emma (Warm & upbeat)
...

[Play demo] button for each

[Next →]
```

#### **Screen 4: Test It!**
```
📞 Call Your AI Right Now!

Your AI is ready! Call this number to test it:

📱 +1 (555) 123-4567

[Call Me Instead] ← triggers outbound test call

✅ Sounds good? [I'm Ready to Go Live]
⚙️ Need changes? [Edit Settings]
```

#### **Screen 5: Go Live!**
```
🚀 You're Live!

Your AI receptionist is now answering calls!

Next steps:
1. ☎️ Forward your business calls to: +1 (555) 123-4567
   [Show me how] ← guides for different carriers

2. 📊 Track your calls in your dashboard
   [Go to Dashboard]

3. ⚙️ Edit your AI anytime
   [AI Settings]
```

---

## 👔 **FULL-SERVICE ($500/mo) - White Glove**

### **Immediately After Payment:**

#### **Step 1: Success Page**
```
🎉 Welcome to Full-Service!

You've chosen our premium white-glove setup.
We'll handle everything for you.

What happens next:

1️⃣ Book Your Onboarding Call (Required)
   [📅 Schedule Now] ← Calendly embed

2️⃣ We'll build your AI (1-2 weeks)
   Our team will set up everything

3️⃣ Training & Launch
   We'll train your team and go live

Questions? Call us: +1 (555) 123-4567
```

#### **Step 2: Calendar Booking (Immediate)**
- Embed Calendly inline
- Force them to book before leaving page
- Calendly sends confirmation email
- We get notified

#### **Step 3: Waiting Period Dashboard**
```
⏳ Your AI is Being Built

Status: In Progress

✅ Subscription active
✅ Onboarding call scheduled (Jan 15, 2pm)
⏳ AI setup in progress
⏳ Launch scheduled

Estimated launch: Jan 29, 2026

[View Call Details]
[Contact Your Account Manager]
```

---

## 🔑 **KEY DIFFERENCES:**

| Feature | Self-Serve ($99) | Full-Service ($500) |
|---------|------------------|---------------------|
| **Setup** | DIY wizard (5 min) | We do it (1-2 weeks) |
| **Onboarding call** | Optional | Required (scheduled immediately) |
| **Phone number** | Instant | We provision it |
| **Go live time** | 5 minutes | 1-2 weeks |
| **Support** | Email/docs | Dedicated account manager |

---

## 🎨 **UI/UX Principles:**

### **1. One Clear Action Per Screen**
- No multiple options
- Big obvious button
- "Next" always visible

### **2. Progress Bar**
```
[■■■□□] Step 3 of 5
```

### **3. Estimate Time**
"This takes 2 minutes"

### **4. Visual Feedback**
✅ Checkmarks for completed steps
⏳ Spinner for loading
🎉 Celebration on completion

### **5. Can't Get Lost**
- No "skip" buttons on required steps
- Can't access dashboard until setup complete
- Breadcrumbs: Home → Setup → Voice → Test

---

## 📱 **Phone Number Provisioning (Self-Serve)**

### **Vapi API Call:**
```javascript
POST https://api.vapi.ai/phone-number
{
  "provider": "twilio",
  "areaCode": "555", // or let Vapi choose
  "capabilities": ["inbound", "outbound"]
}
```

**Response:**
```json
{
  "id": "phone_abc123",
  "number": "+15551234567",
  "status": "active"
}
```

**Store in Database:**
```sql
UPDATE customers
SET phone_number = '+15551234567',
    vapi_phone_id = 'phone_abc123'
WHERE stripe_customer_id = 'cus_xyz';
```

---

## 🔄 **Editing After Setup**

### **Portal Dashboard (Already Built):**
- ✅ Edit greeting
- ✅ Change voice
- ✅ Update business info
- ✅ Set business hours
- ✅ View call history

### **Additional Features Needed:**
- [ ] "Test Call" button (trigger outbound demo)
- [ ] "Pause AI" toggle (stop answering calls temporarily)
- [ ] "Change Phone Number" (reassign)

---

## 📧 **Email Flow (Supplemental)**

### **Self-Serve:**
1. **Immediately:** "Welcome! Your AI is ready" (with dashboard link)
2. **Day 3:** "Tips for getting the most from your AI"
3. **Day 7:** "Your first week stats"
4. **Day 30:** "You're doing great! Here's what's working"

### **Full-Service:**
1. **Immediately:** "Welcome! Here's your onboarding call link"
2. **After call:** "Great meeting you! Next steps"
3. **Setup complete:** "Your AI is ready for testing"
4. **Go live:** "You're live! Here's your dashboard"

---

## 🚧 **What We Need to Build:**

### **Priority 1 (Self-Serve Setup Wizard):**
- [ ] `/portal/setup` - Multi-step wizard
- [ ] Phone number provisioning API integration
- [ ] Voice preview/selection UI
- [ ] Test call trigger
- [ ] "Forward your calls" guide

### **Priority 2 (Full-Service Flow):**
- [ ] Calendly embed on success page
- [ ] Status dashboard for "in progress" customers
- [ ] Admin panel to update customer status

### **Priority 3 (Portal Enhancements):**
- [ ] "Test Call" button
- [ ] "Pause AI" toggle
- [ ] Better onboarding tooltips

---

## 🧪 **Success Metrics:**

- **Time to first test call:** <5 minutes (Self-Serve)
- **Setup completion rate:** >90%
- **Support tickets about setup:** <5%
- **User satisfaction:** "How easy was setup?" → 4.5/5 stars

---

**Bottom line:** Self-Serve = 5-minute wizard. Full-Service = schedule call + wait. Both crystal clear, zero confusion.
