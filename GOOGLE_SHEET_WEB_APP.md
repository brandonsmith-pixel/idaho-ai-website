# Google Sheets Web App Setup (No Service Account Needed!)

## Step 1: Create the Google Sheet

1. Go to: https://sheets.google.com
2. Create new spreadsheet
3. Name it: **"AI Receptionist Demo Requests"**
4. Add these headers in Row 1:

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

## Step 2: Add Apps Script

1. In your sheet, click **Extensions → Apps Script**
2. Delete any default code
3. Paste this script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add row to sheet
    sheet.appendRow([
      new Date().toISOString(),
      data.businessName || '',
      data.businessPhone || '',
      data.testPhone || '',
      data.industry || '',
      data.website || '',
      data.address || '',
      data.hours || '',
      data.services || '',
      data.pricing || '',
      data.bookingProcess || '',
      data.faqs || '',
      data.additionalInfo || '',
      data.files || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Name it: "AI Receptionist Logger"

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Settings:
   - **Description**: "AI Receptionist Demo Logger"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)
7. Click **Done**

## Step 4: Add URL to Vercel

The web app URL needs to be added as an environment variable. I'll do this part.

**Just paste the Web App URL here and I'll add it to Vercel!**

---

## How It Works:

```
Form Submission
      ↓
POST to Google Apps Script URL
      ↓
Script appends row to Sheet
      ↓
Success response
```

## Benefits vs Service Account:

✅ No JSON credentials needed  
✅ No OAuth setup  
✅ Works instantly  
✅ You control access in Google  
✅ Can edit script anytime  
✅ Free forever  

---

**Once you deploy the script, just give me the Web App URL!**
