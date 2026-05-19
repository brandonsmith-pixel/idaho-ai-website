# Calendar Integration Setup Guide

## 1. Nylas Setup (for Google Calendar & Outlook)

### Create Nylas Account:
1. Go to: https://dashboard.nylas.com/register
2. Sign up for free tier (up to 5 accounts, perfect for testing)
3. Create a new application

### Get OAuth Credentials:
1. Go to: https://dashboard.nylas.com/applications
2. Click your app → "OAuth" tab
3. Copy:
   - **Client ID** → Add to `.env.local` as `NYLAS_CLIENT_ID`
   - **Client Secret** → Add to `.env.local` as `NYLAS_CLIENT_SECRET`
   - **API Key** → Add to `.env.local` as `NYLAS_API_KEY`

### Configure OAuth Redirect URIs:
Add these to Nylas dashboard under "Redirect URIs":
- Development: `http://localhost:3000/api/calendar/callback/nylas`
- Production: `https://tetongroup.ai/api/calendar/callback/nylas`

### Enable Providers:
In Nylas dashboard, enable:
- ✅ Google (Gmail/Google Calendar)
- ✅ Microsoft (Outlook/Office 365)

---

## 2. Cal.com Setup (Alternative Option)

### Create Cal.com Account:
1. Go to: https://cal.com/signup
2. Create free account
3. Go to Settings → Developer → API Keys
4. Generate new API key → Add to `.env.local` as `CALCOM_API_KEY`

### Get your Cal.com username:
- Found at: https://cal.com/settings/my-account/profile
- Add to `.env.local` as `CALCOM_USERNAME`

---

## 3. Environment Variables

Add to `.env.local`:
```bash
# Nylas Calendar Integration
NYLAS_CLIENT_ID=your_client_id
NYLAS_CLIENT_SECRET=your_client_secret
NYLAS_API_KEY=your_api_key

# Cal.com Integration (Alternative)
CALCOM_API_KEY=your_calcom_api_key
CALCOM_USERNAME=your_username
```

---

## 4. Pricing

- **Nylas Free Tier:** Up to 5 connected accounts (good for testing)
- **Nylas Starter:** $9/month for 10 accounts, $0.90/account after
- **Cal.com:** Free for basic features, $12/month Pro (optional)

For production, you'll need Nylas Starter plan once you exceed 5 customers.

---

## Next Steps

Once you've added the environment variables, I'll:
1. Create the database schema
2. Build the OAuth flows
3. Add calendar tab to customer portal
4. Integrate with Vapi for AI booking
