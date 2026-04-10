# Supabase Setup Guide

Complete setup for call tracking, analytics, and customer dashboard.

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up or log in
4. Click "New Project"
5. Fill in:
   - **Name:** `tetongroup-ai` (or whatever you want)
   - **Database Password:** (generate a strong one, save it!)
   - **Region:** Choose closest to you (US West for Idaho)
6. Click "Create new project" (takes 1-2 minutes)

---

## Step 2: Run Database Schema

1. Once project is ready, click "SQL Editor" in the left sidebar
2. Click "+ New query"
3. Copy/paste the ENTIRE contents of `supabase-schema.sql`
4. Click "Run" (bottom right)
5. You should see: "Success. No rows returned"

---

## Step 3: Get API Keys

1. Click "Settings" (gear icon) in left sidebar
2. Click "API" under Project Settings
3. Copy these THREE keys:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**anon public key:** (long string starting with `eyJ...`)
```
eyJhbGciOi...
```

**service_role key:** (long string starting with `eyJ...`)
```
eyJhbGciOi...
```

---

## Step 4: Add to Vercel

Run these commands:

```bash
# Project URL
echo "https://xxxxxxxxxxxxx.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production

# Anon key (public)
echo "eyJhbGciOi..." | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Service key (secret - DO NOT SHARE)
echo "eyJhbGciOi..." | vercel env add SUPABASE_SERVICE_KEY production
```

---

## Step 5: Add to .env.local

Add to `/Users/brandonsmith/projects/tetongroup/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_KEY=eyJhbGciOi...
```

---

## Step 6: Configure Vapi Webhook

1. Go to Vapi dashboard: https://dashboard.vapi.ai
2. Click "Settings" → "Webhooks"
3. Add webhook URL:
   ```
   https://tetongroup.ai/api/webhooks/vapi
   ```
4. Select events:
   - ☑️ `call-started`
   - ☑️ `call-ended`
   - ☑️ `end-of-call-report`
5. Save

---

## Step 7: Test It

1. Deploy the changes:
   ```bash
   vercel --prod
   ```

2. Make a test call using the demo form

3. Check Supabase:
   - Go to "Table Editor"
   - Click "calls" table
   - You should see your test call!

4. View dashboard:
   - Go to: https://tetongroup.ai/dashboard
   - You should see call stats and recordings

---

## ✅ What You Get

### Customer Dashboard (`/dashboard`)
- Total calls, minutes, cost
- Filterable call history (7/30/90 days, all time)
- Play recordings
- Download transcripts
- Phone number tracking
- Inbound/outbound direction

### Automatic Tracking
- Every call logged to database
- Duration rounded up to nearest minute
- Cost calculated at $0.10/min
- Recordings saved
- Transcripts stored

### For Each Customer
- See only their own calls
- Filter by date range
- Export data
- Monitor AI performance

---

## 🔐 Security

- Row Level Security (RLS) enabled
- Customers can only see their own data
- Service role for backend API
- API keys encrypted in Vercel

---

## 💡 Next Steps

1. Add Stripe webhook to create customer records
2. Link calls to customers via phone number
3. Add authentication (Stripe customer portal?)
4. Email weekly usage reports
5. Usage alerts (high cost warnings)

---

## 🐛 Troubleshooting

**Calls not appearing?**
- Check Vapi webhook is configured
- Check Vercel logs: `vercel logs --since=10m`
- Verify env vars: `vercel env ls`

**Dashboard shows 0 calls?**
- Customer ID needs to match
- Check `calls` table in Supabase directly
- Look for errors in browser console

**Recording not playing?**
- Vapi needs to have recording enabled
- Check `recording_url` in database
- CORS might block playback (rare)
