# Calendar Integration - Complete Setup Guide

## Overview

The calendar integration allows your AI receptionist to:
- ✅ Check real-time availability in Google Calendar or Outlook
- ✅ Book appointments automatically during calls
- ✅ Sync appointments to customer calendars
- ✅ Support Cal.com as an alternative booking platform

---

## 🚀 Quick Start

### 1. Set Up Nylas (for Google Calendar & Outlook)

#### Create Nylas Account:
1. Go to: https://dashboard.nylas.com/register
2. Sign up for **Free tier** (up to 5 accounts)
3. Create a new application

#### Get Credentials:
1. In Nylas dashboard, go to **Applications → Your App → OAuth**
2. Copy these values:
   - **Client ID**
   - **Client Secret**
   - **API Key** (from API Keys section)

#### Configure OAuth Redirects:
Add these redirect URIs in Nylas dashboard:
```
http://localhost:3000/api/calendar/callback/nylas
https://tetongroup.ai/api/calendar/callback/nylas
```

#### Enable Providers:
In Nylas dashboard → **Connectors**, enable:
- ✅ **Google** (for Gmail/Google Calendar)
- ✅ **Microsoft** (for Outlook/Office 365)

---

### 2. Set Up Cal.com (Optional Alternative)

#### Create Cal.com Account:
1. Go to: https://cal.com/signup
2. Create account (free tier available)

#### Get API Key:
1. Go to: https://cal.com/settings/developer/api-keys
2. Click "Create New API Key"
3. Copy the generated key (starts with `cal_live_...`)

#### Get Username:
1. Go to: https://cal.com/settings/my-account/profile
2. Copy your username

---

### 3. Add Environment Variables

Edit `.env.local` and add:

```bash
# Nylas Calendar Integration (Google + Outlook)
NYLAS_CLIENT_ID=your_nylas_client_id_here
NYLAS_CLIENT_SECRET=your_nylas_client_secret_here
NYLAS_API_KEY=your_nylas_api_key_here

# Cal.com Integration (Optional - customers provide their own keys)
# Not needed in .env unless you want a default integration
```

**Note:** Cal.com credentials are customer-specific. Each customer provides their own API key in the portal UI.

---

### 4. Run Database Migration

In your Supabase SQL Editor, run:

```bash
# File: supabase-calendar-integration.sql
```

This creates:
- `calendar_connections` table
- `appointments` table
- `availability_rules` table
- `booking_settings` table
- RLS policies for data isolation

---

### 5. Deploy to Production

#### Option A: Git Push (Vercel auto-deploys)
```bash
git add .
git commit -m "feat: Add calendar integration with Nylas and Cal.com"
git push
```

#### Option B: Manual Vercel Deploy
1. Go to Vercel dashboard
2. Add environment variables:
   - `NYLAS_CLIENT_ID`
   - `NYLAS_CLIENT_SECRET`
   - `NYLAS_API_KEY`
3. Redeploy

---

## 📋 How Customers Use It

### Step 1: Navigate to Calendar Tab
1. Customer logs into portal: `https://tetongroup.ai/portal`
2. Clicks **Calendar** tab

### Step 2: Choose Integration Method

**Option A: OAuth (Google or Outlook)**
- Click "Connect Google Calendar" or "Connect Outlook"
- Authorize access via OAuth popup
- Calendar automatically syncs

**Option B: Cal.com**
- Get API key from https://cal.com/settings/developer/api-keys
- Enter Cal.com username + API key in portal
- Click "Connect Cal.com"

### Step 3: AI Automatically Uses Calendar
Once connected, the AI receptionist will:
- Check availability when customers ask for appointments
- Offer available time slots
- Book appointments after verbal confirmation
- Add events to the customer's calendar automatically

---

## 🔧 API Endpoints Created

### Calendar Connection
- `POST /api/calendar/connect/nylas` - Initiate Google/Outlook OAuth
- `GET /api/calendar/callback/nylas` - OAuth callback handler
- `POST /api/calendar/connect/calcom` - Connect Cal.com with API key
- `GET /api/calendar/connections` - List connected calendars
- `DELETE /api/calendar/disconnect?id=<id>` - Remove connection

### Appointment Management
- `POST /api/calendar/availability` - Check free/busy times
- `POST /api/calendar/book` - Create appointment in calendar

---

## 🤖 Vapi Integration (AI Booking)

To enable the AI to book appointments during calls, you'll need to:

### 1. Create Vapi Function Tool

In your Vapi assistant configuration, add a function:

```json
{
  "type": "function",
  "function": {
    "name": "check_availability",
    "description": "Check customer's calendar availability for a given date/time range",
    "parameters": {
      "type": "object",
      "properties": {
        "start_date": {
          "type": "string",
          "description": "Start date/time in ISO format"
        },
        "end_date": {
          "type": "string",
          "description": "End date/time in ISO format"
        }
      },
      "required": ["start_date", "end_date"]
    }
  },
  "server": {
    "url": "https://tetongroup.ai/api/calendar/availability",
    "secret": "YOUR_WEBHOOK_SECRET"
  }
}
```

### 2. Create Booking Function

```json
{
  "type": "function",
  "function": {
    "name": "book_appointment",
    "description": "Book an appointment in the customer's calendar",
    "parameters": {
      "type": "object",
      "properties": {
        "start_time": { "type": "string" },
        "end_time": { "type": "string" },
        "attendee_name": { "type": "string" },
        "attendee_phone": { "type": "string" },
        "attendee_email": { "type": "string" },
        "description": { "type": "string" }
      },
      "required": ["start_time", "end_time"]
    }
  },
  "server": {
    "url": "https://tetongroup.ai/api/calendar/book",
    "secret": "YOUR_WEBHOOK_SECRET"
  }
}
```

### 3. Update System Prompt

Add to your Vapi assistant's system prompt:

```
You have access to the customer's calendar. When someone asks to book an appointment:

1. Ask for their preferred date/time
2. Use check_availability to see open slots
3. Suggest available times
4. Once they confirm, use book_appointment to schedule it
5. Confirm the booking with the appointment details

Always get verbal confirmation before booking.
```

---

## 💰 Pricing & Limits

### Nylas
- **Free:** Up to 5 connected accounts
- **Starter:** $9/month for 10 accounts, $0.90 per additional account
- **Scale:** Custom pricing for 100+ accounts

### Cal.com
- **Free:** Basic scheduling features
- **Essentials:** $12/month (optional, per customer)
- **Professional:** $29/month (optional, per customer)

**For your customers:** No additional charge. Nylas costs are covered in your SaaS pricing.

---

## 🐛 Troubleshooting

### "Calendar connection failed"
- Check Nylas credentials in `.env.local`
- Verify redirect URIs match exactly (including http/https)
- Ensure Google/Microsoft connectors are enabled in Nylas dashboard

### "OAuth callback error"
- Check Nylas API Key is correct
- Verify webhook endpoints are publicly accessible
- Look at Vercel logs for detailed error messages

### "Cal.com invalid API key"
- Ensure customer is using correct API key format (`cal_live_...`)
- Verify API key is not expired
- Check username matches Cal.com profile

### "Appointment not appearing in calendar"
- Check `primary_calendar_id` was set correctly
- Verify Nylas grant is still active
- Look at `/api/calendar/book` logs for errors

---

## 📊 Database Schema Overview

### calendar_connections
Stores customer calendar OAuth tokens and settings

### appointments
All booked appointments (synced or AI-created)

### availability_rules
Custom business hours per customer

### booking_settings
Per-customer appointment preferences (duration, buffer times, etc.)

---

## 🔐 Security Notes

- **Access tokens are stored in plain text** for MVP
- **Production TODO:** Encrypt tokens using `crypto` or AWS KMS
- **RLS policies** ensure customers only see their own data
- **OAuth tokens** refresh automatically via Nylas

---

## ✅ Testing Checklist

- [ ] Nylas credentials added to `.env.local`
- [ ] Database migration run in Supabase
- [ ] Google Calendar connection works in portal
- [ ] Outlook connection works in portal
- [ ] Cal.com connection works in portal
- [ ] Calendar disconnection works
- [ ] Availability check API returns correct free/busy data
- [ ] Booking API creates appointment successfully
- [ ] Appointment appears in external calendar (Google/Outlook/Cal.com)
- [ ] Vapi function tools integrated (if using AI booking)

---

## 📞 Support

Questions? Check:
- Nylas docs: https://developer.nylas.com/docs
- Cal.com API: https://cal.com/docs/api-reference
- Vapi functions: https://docs.vapi.ai/functions

---

**Status:** ✅ Calendar integration complete and ready for testing!
