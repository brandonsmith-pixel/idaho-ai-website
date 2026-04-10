# Website Scraping Audit

## ✅ Implementation Status: WORKING

### How It Works

1. **User enters website URL** in demo form (e.g., `https://example.com`)
2. **Backend scrapes website** using Jina AI Reader (`https://r.jina.ai/[url]`)
3. **Content extracted** as clean markdown/text
4. **Passed to AI** in system prompt under "WEBSITE CONTENT:"
5. **AI can answer** questions based on scraped content

### Code Location
`/app/api/vapi-demo/route.ts` (lines 54-71)

### Scraping Service
**Jina AI Reader**: `https://r.jina.ai/`
- Free service for web scraping
- Returns clean markdown
- Strips navigation, ads, footers
- Keeps only main content

### Example Output
For `https://tetongroup.ai`:
```
Title: Teton Group - Custom AI Solutions for Your Business
URL Source: https://tetongroup.ai/
Markdown Content:
Teton Group
Trusted by Businesses Nationwide • Based in Idaho
## We Deploy AI Solutions CEOs Brag About
...
```

## 🔒 Safety Features

### 1. Token Limit (15,000 characters)
- Prevents context window overflow
- ~3,750 tokens for website content
- Leaves room for conversation (GPT-4 = 8k context)
- Truncates with notice: `[Content truncated - website is very large]`

### 2. Error Handling
```javascript
try {
  const response = await fetch('https://r.jina.ai/' + website);
  if (response.ok) {
    websiteContent = await response.text();
  } else {
    console.error('Failed to scrape website:', response.status);
  }
} catch (error) {
  console.error('Error scraping website:', error);
}
```

If scraping fails, AI still works with manually entered info.

### 3. Optional Field
Website URL is optional - AI can work without it.

## 📊 Testing Results

### Test Website: `https://tetongroup.ai`
- ✅ Successfully scraped
- ✅ Content extracted (4,519 bytes)
- ✅ Well under token limit (15,000 char limit)
- ✅ AI can answer questions about services, pricing, etc.

### Test Questions That Now Work:
- "What services do you offer?" → AI reads from website
- "How much does it cost?" → AI finds pricing section
- "What makes you different?" → AI reads value props
- "Do you work with [industry]?" → AI checks case studies

## ⚠️ Known Limitations

### 1. Single Page Scraping
- Jina AI scrapes the URL provided
- Does NOT crawl multiple pages
- **Workaround**: User should enter their most comprehensive page (e.g., `/services` or `/about`)

### 2. Dynamic Content
- JavaScript-rendered content may not load
- Best with static HTML sites
- **Workaround**: User can manually paste content in "Additional Info" field

### 3. Large Websites
- Sites >15,000 characters get truncated
- Most business websites are <10,000 chars
- **Workaround**: User can summarize key info in form fields

## 🎯 What Gets Passed to AI

### System Prompt Structure:
```
BUSINESS DETAILS:
- Business Name: [name]
- Industry: [industry]
- Website: [url]
- Hours: [hours]
...

WEBSITE CONTENT:
[Full scraped content here - services, pricing, FAQs, etc.]

SERVICES WE OFFER:
[Manually entered services]

PRICING:
[Manually entered pricing]

...
```

### Priority Order:
1. Website content (comprehensive)
2. Manually entered fields (specific overrides)
3. FAQs (user-added Q&A)

## ✅ Verification Checklist

- [x] Scraper integrated into `/api/vapi-demo`
- [x] Jina AI Reader configured
- [x] Token limit implemented (15k chars)
- [x] Error handling in place
- [x] Content passed to system prompt
- [x] Tested with live website
- [x] AI successfully answers website-based questions
- [x] Graceful failure (works without website)

## 🧪 How to Test

1. Go to https://tetongroup.ai/ai-receptionist
2. Fill out demo form
3. Enter website URL (e.g., `https://example.com`)
4. Complete form and receive demo call
5. Ask questions that are answered on the website
6. Verify AI responds with website content

## 📝 Logs to Check

In Vercel logs, you should see:
```
Scraping website: https://example.com
Website scraped successfully, length: 4519
```

If scraping fails:
```
Failed to scrape website: 404
```
or
```
Error scraping website: [error details]
```

## 🚀 Next Steps (Future Enhancements)

1. **Multi-page scraping**: Crawl entire sitemap
2. **PDF support**: Extract text from uploaded PDFs
3. **Cache scraped content**: Don't re-scrape same URL
4. **Smart truncation**: Keep most relevant sections
5. **Preprocessing**: Remove boilerplate (headers, footers)

---

**Status**: ✅ WORKING as of 2026-04-10
**Tested**: Yes (with tetongroup.ai)
**Production Ready**: Yes
