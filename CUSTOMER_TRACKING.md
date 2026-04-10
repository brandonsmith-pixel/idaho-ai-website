# Customer & Call Tracking System

## How It Works (100+ Customers Supported)

### 1️⃣ **Customer Creation (Stripe Webhook)**
When someone subscribes via Stripe:
```
Stripe Payment → Webhook fires → Creates customer in Supabase
```

Stored data:
- Stripe Customer ID (unique identifier)
- Email
- Business name
- Plan (self-serve or full-service)
- Phone number (added during setup)
- Active status (true/false)

### 2️⃣ **Call Tracking (Vapi Webhook)**
When a call happens:
```
Vapi Call → Webhook fires → Matches customer → Stores call record
```

Matching logic:
1. Check if `customerId` in call metadata
2. If not, match by phone number
3. Link call to customer record

### 3️⃣ **Customer Dashboard**
Each customer sees ONLY their data:
- Go to `/dashboard?customer_id=XXXX`
- Row-level security prevents seeing other customers
- Shows all their calls, recordings, transcripts, costs

### 4️⃣ **Admin Dashboard**
You see ALL customers:
- Go to `/admin/customers`
- Shows all customers with stats
- Click "View Calls" to see any customer's call history
- Filter by plan, active status, etc.

---

## Setup Steps

### 1. Run Updated SQL in Supabase

Go to SQL Editor and run:
```sql
-- Add new columns
ALTER TABLE customers ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_customers_active ON customers(active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone_number);
```

### 2. Configure Stripe Webhook

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://tetongroup.ai/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
4. Copy webhook signing secret
5. Add to Vercel:
   ```bash
   echo "whsec_..." | vercel env add STRIPE_WEBHOOK_SECRET production
   ```

### 3. Test It

1. Complete a Stripe payment
2. Customer automatically appears in Supabase `customers` table
3. Make a demo call
4. Call appears under that customer
5. Go to `/admin/customers` to see all customers

---

## Pages Created

### Customer-Facing
- `/dashboard` - Customer's own call history
- `/ai-receptionist` - Demo signup flow
- `/ai-receptionist/success` - Post-payment success

### Admin-Only
- `/admin/customers` - View all customers
- Can click through to see any customer's calls

---

## How Customers Are Tracked

### Method 1: Stripe Customer ID (Primary)
```
User subscribes → Stripe creates customer → Webhook creates DB record
```

### Method 2: Phone Number (Fallback)
```
Demo call happens → Check phone number → Match to existing customer
```

### Method 3: Metadata (Most Accurate)
```
When creating assistant → Pass customerId in metadata → Direct link
```

---

## Example: 100 Customers

| Customer | Email | Plan | Phone | Status | Calls |
|----------|-------|------|-------|--------|-------|
| Acme Corp | acme@example.com | Full-Service | +12085551234 | Active | 150 calls |
| Bob's Deli | bob@deli.com | Self-Serve | +12085555678 | Active | 50 calls |
| ... | ... | ... | ... | ... | ... |

Each has:
- Unique Stripe Customer ID
- Unique database ID
- Their own call records
- Isolated dashboard (can't see others)

---

## Security

✅ **Row Level Security (RLS)** - Customers can't see each other's data  
✅ **Stripe webhook signature verification** - Only real Stripe events accepted  
✅ **Admin authentication** - TODO: Add auth to `/admin/*` routes  
✅ **API keys encrypted** - All keys stored securely in Vercel

---

## Next Steps

1. ✅ Run SQL updates in Supabase
2. ✅ Configure Stripe webhook
3. ⏳ Add authentication to admin pages
4. ⏳ Create customer portal (let them update phone, view usage)
5. ⏳ Email notifications (weekly usage reports)

---

## Troubleshooting

**Customer not appearing after payment?**
- Check Stripe webhook is configured
- Check Vercel logs: `vercel logs --since=10m`
- Verify `STRIPE_WEBHOOK_SECRET` is set

**Calls not linked to customer?**
- Check phone number matches
- Verify customer has `phone_number` set in database
- Check Vapi webhook is firing

**Can't see customer dashboard?**
- URL should be: `/dashboard?customer_id=THEIR_UUID`
- Check Supabase has records for that customer
