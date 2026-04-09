# Google Sheets Integration Setup

## Step 1: Create Google Service Account

1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing): **"Teton Group AI Receptionist"**
3. Enable Google Sheets API:
   - Click "Enable APIs and Services"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create Service Account:
   - Go to "Credentials" in left menu
   - Click "Create Credentials" → "Service Account"
   - Name: `teton-sheets-writer`
   - Role: "Editor"
   - Click "Done"

5. Create Key:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON"
   - Download the file (will be named something like `teton-group-xxxxx.json`)

## Step 2: Create Google Sheet

1. Go to: https://sheets.google.com
2. Create new spreadsheet
3. Name it: **"AI Receptionist Demo Requests"**
4. Add headers in Row 1:
   ```
   A1: Timestamp
   B1: Business Name
   C1: Business Phone
   D1: Test Phone
   E1: Industry
   F1: Website
   G1: Address
   H1: Hours
   I1: Services
   J1: Pricing
   K1: Booking Process
   L1: FAQs
   M1: Additional Info
   N1: Files Uploaded
   ```

5. **IMPORTANT:** Share the sheet with your service account:
   - Click "Share" button
   - Paste the email from your service account JSON file (looks like `teton-sheets-writer@project-name.iam.gserviceaccount.com`)
   - Give "Editor" access
   - Click "Send"

6. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
                                              ^^^^^^^^^^^
   ```

## Step 3: Add Environment Variables to Vercel

1. Go to your Vercel dashboard: https://vercel.com/brandonsmith-pixel/tetongroup
2. Go to Settings → Environment Variables
3. Add these variables:

**GOOGLE_SHEET_ID**
```
[paste your sheet ID here]
```

**GOOGLE_SERVICE_ACCOUNT_EMAIL**
```
[paste the client_email from the JSON file]
```

**GOOGLE_PRIVATE_KEY**
```
[paste the entire private_key from JSON, including -----BEGIN PRIVATE KEY----- and -----END PRIVATE KEY-----]
```

**Note:** Make sure to preserve the line breaks in the private key!

## Step 4: Test Locally (Optional)

Create `.env.local` with the same variables:
```bash
GOOGLE_SHEET_ID="your-sheet-id"
GOOGLE_SERVICE_ACCOUNT_EMAIL="teton-sheets-writer@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqh...
-----END PRIVATE KEY-----"
```

Then run:
```bash
npm run dev
```

Test the form at: http://localhost:3000/ai-receptionist

## Step 5: Deploy to Vercel

```bash
git push origin main
```

Vercel will automatically deploy with the new environment variables.

## What Gets Stored:

Every form submission creates a new row in the Google Sheet:
- Timestamp (automatic)
- All business info
- FAQs (formatted as Q1: ... / A1: ...)
- File names (comma-separated)
- Full context for making demo calls

## Troubleshooting:

**"Permission denied" error:**
- Make sure you shared the sheet with the service account email
- Check that the service account has Editor access

**"Invalid credentials" error:**
- Verify the private key was pasted correctly (with line breaks)
- Check that the service account email matches

**"Sheet not found" error:**
- Double-check the GOOGLE_SHEET_ID environment variable
- Make sure the sheet exists and isn't deleted

---

Ready to implement! Follow the steps above, then I'll deploy the code.
