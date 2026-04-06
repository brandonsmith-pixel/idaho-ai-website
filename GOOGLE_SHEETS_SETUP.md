# Google Sheets Lead Capture Setup

## Quick Setup (5 minutes)

### Step 1: Create Your Google Sheet

1. Go to https://sheets.google.com
2. Create a new spreadsheet called "AI Receptionist Leads"
3. In the first row, add these headers:
   - A1: `Timestamp`
   - B1: `Business Name`
   - C1: `Phone`
   - D1: `Email`
   - E1: `Industry`
   - F1: `Voice Preference`
   - G1: `Source`
   - H1: `URL`

### Step 2: Create Google Apps Script

1. In your sheet, go to **Extensions → Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.businessName || '',
      data.phone || '',
      data.email || '',
      data.industry || '',
      data.voice || '',
      data.source || '',
      data.url || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (disk icon)
5. Click **Deploy → New deployment**
6. Click the gear icon → Select **Web app**
7. Settings:
   - Description: "Lead Capture"
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy**
9. **Copy the Web app URL** (looks like: `https://script.google.com/macros/s/ABC.../exec`)
10. Click **Done**

### Step 3: Add URL to Vercel

1. Go to your Vercel project: https://vercel.com
2. Go to **Settings → Environment Variables**
3. Add new variable:
   - Name: `NEXT_PUBLIC_GOOGLE_SHEETS_URL`
   - Value: (paste the Web app URL you copied)
4. Click **Save**
5. Go to **Deployments** → click **Redeploy** on latest

---

## Alternative: Email-Only Fallback (Already Working!)

The form now also sends to your existing `/api/contact` endpoint, so you'll receive leads via email even without Google Sheets setup.

Just make sure your contact API is configured with your email address.

---

## Testing

1. After deploying, go to tetongroup.ai
2. Fill out the demo form
3. Check your Google Sheet - new row should appear instantly
4. Check your email - you should also receive an email notification

---

## Troubleshooting

### "Submission failed" error
- Make sure the Apps Script is deployed as **Anyone** can access
- Check that the Web app URL is correct in Vercel env vars
- Redeploy after adding env vars

### Not seeing leads in sheet
- Check the Apps Script execution log (Extensions → Apps Script → Executions)
- Make sure headers match exactly (Timestamp, Business Name, etc.)
- Try the form again

### Still not working?
The email fallback should still work via `/api/contact`. Check your email for submissions.

---

## View Your Leads

Go to: https://sheets.google.com and open "AI Receptionist Leads"

You'll see every submission in real-time with:
- Timestamp
- Business name
- Phone number
- Email
- Industry
- Voice preference
- Source (tetongroup_homepage)
- Full URL

---

## Next: Set Up Email Notifications from Google Sheets

Want to get an email every time someone submits? Add this to your Apps Script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add to sheet
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.businessName || '',
      data.phone || '',
      data.email || '',
      data.industry || '',
      data.voice || '',
      data.source || '',
      data.url || ''
    ]);
    
    // Send email notification
    MailApp.sendEmail({
      to: 'your@email.com',  // CHANGE THIS
      subject: '🚨 New AI Receptionist Lead!',
      body: `New demo submission:
      
Business: ${data.businessName}
Phone: ${data.phone}
Email: ${data.email || 'Not provided'}
Industry: ${data.industry}
Voice: ${data.voice}

View all leads: https://sheets.google.com/your-sheet-url
      `
    });
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Replace `your@email.com` with your actual email, then save and redeploy.
