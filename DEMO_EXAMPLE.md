# Example: What Gets Captured When Someone Submits

## Real Example Form Submission:

### Step 1: Industry Selection
**Selected:** Medical / Dental (with professional clinic photo)

### Step 2: Business Info
```
Business Name: Mountain View Dental
Phone: +1 (555) 123-4567
Website: https://mountainviewdental.com
Address: 1234 Main Street, Denver, CO 80202
Hours: Monday-Friday 8 AM - 6 PM, Saturday 9 AM - 2 PM

Services: 
General dentistry, teeth cleaning, whitening, crowns, bridges, 
root canals, cosmetic dentistry, Invisalign, emergency care

Pricing:
New patient exam + cleaning: $199
Teeth whitening: $399
Crowns: $1,200-$1,500
Insurance accepted, payment plans available

Booking:
Call or book online at mountainviewdental.com/book
24-hour cancellation notice required
```

### Step 3: Knowledge Base
```
Q1: Do you accept my insurance?
A1: We accept Delta Dental, MetLife, Cigna, Aetna, and United Healthcare

Q2: Do you see children?
A2: Yes, we see patients ages 3+. Kid-friendly approach.

Q3: Do you offer emergency appointments?
A3: Yes, same-day slots available. Call immediately for emergencies.

Additional Info:
15 years serving Denver. Digital X-rays. Dr. Johnson and Dr. Martinez, 
board-certified.

Files Uploaded:
- insurance-list.pdf
- services-brochure.pdf
```

### Final Step:
**Test Phone:** +1 (555) 987-6543

---

## What Happens When They Click "CALL ME NOW":

### Current Behavior:
```javascript
POST /api/contact
{
  name: "Mountain View Dental",
  email: "demo@tetongroup.ai",
  phone: "+1 (555) 987-6543",
  message: "🎯 AI RECEPTIONIST DEMO REQUEST...\n\n[all the info above]"
}

Response: { success: true }
```

### What SHOULD Happen:

**Option 1 (Email Only):**
```
→ Email sent to your inbox
→ You manually call them
→ You role-play as their AI
→ They see how it works
```

**Option 2 (Vapi Automation):**
```
→ Vapi assistant created with their info
→ Automated call placed to test number
→ Real AI demonstrates receptionist
→ No manual work needed
```

---

## Test It Yourself:

1. Go to: `tetongroup.ai/ai-receptionist`
2. Fill out the form (use your real phone for test number)
3. Click "CALL ME NOW"
4. Check server logs (currently just logs to console)

---

## What You'll See in Logs:

```
New contact form submission: {
  name: 'Mountain View Dental',
  email: 'demo@tetongroup.ai',
  phone: '+1 (555) 987-6543',
  message: '🎯 AI RECEPTIONIST DEMO REQUEST - PRIORITY\n\n...',
  timestamp: '2026-04-08T19:00:00.000Z'
}
```

---

## Bottom Line:

✅ **Form works perfectly**  
✅ **Data is captured**  
✅ **UI is professional**  
❌ **No email delivery**  
❌ **No automated calls**

**Ready to fix:** Just need API keys!
