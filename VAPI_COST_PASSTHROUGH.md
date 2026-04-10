# Vapi Cost Pass-Through System

## Overview
We pass through 100% of Vapi's actual costs to customers. No markup, no fixed rates.

## How It Works

### 1. **Vapi Sends Cost in Webhook**
When a call ends, Vapi sends:
```json
{
  "type": "end-of-call-report",
  "call": {
    "id": "abc123",
    "cost": 0.60,  // ← The actual cost we pay
    "costBreakdown": {
      "stt": 0.05,
      "llm": 0.09,
      "tts": 0.21,
      "vapi": 0.25
    }
  }
}
```

### 2. **We Store the Exact Cost**
Our webhook (`/api/webhooks/vapi`) extracts:
- `call.cost` → stored in `calls.cost` column
- `call.costBreakdown` → stored in `calls.metadata.cost_breakdown`

### 3. **Customer Sees Real Cost**
In their dashboard (`/dashboard`), they see:
- Exact cost per call (from Vapi)
- Total cost (sum of all call costs)
- Cost breakdown (if they click details)

## Database Schema

```sql
CREATE TABLE calls (
  ...
  cost DECIMAL(10, 4) DEFAULT 0,  -- Actual Vapi cost (NOT calculated)
  ...
);
```

**Old (WRONG):**
```sql
cost DECIMAL(10, 4) GENERATED ALWAYS AS (CEIL(duration_seconds::decimal / 60) * 0.10) STORED
```
This hardcoded $0.10/min and you'd lose money.

**New (CORRECT):**
```sql
cost DECIMAL(10, 4) DEFAULT 0
```
This stores whatever Vapi charges.

## Cost Range

Based on testing:
- **Simple calls:** $0.08-0.10/min (short responses, basic questions)
- **Complex calls:** $0.12-0.15/min (long AI responses, detailed explanations)
- **Average:** ~$0.12/min

### Why It Varies:
- **TTS (35%):** More AI talking = higher cost
- **LLM (14%):** Longer context = more tokens = higher cost
- **Vapi Platform (42%):** Fixed per-minute fee
- **STT (8%):** Customer talking (relatively cheap)

## Customer Communication

We tell customers:
> "Calls cost approximately **$0.10-0.15 per minute** (varies by call complexity). You only pay for actual usage. Billed at Vapi's exact cost with no markup."

## Migration

If you already ran the old schema:
1. Run `supabase-migration-fix-cost.sql` to fix the `cost` column
2. Old calls will show $0 cost (we didn't capture real cost yet)
3. New calls (after this fix) will show actual Vapi cost

## Testing

Test call results:
- **Duration:** 5 minutes
- **Vapi charged us:** $0.60
- **Per-minute rate:** $0.12/min
- **Customer sees:** $0.60 (exact pass-through)

✅ **No money lost on your end!**
