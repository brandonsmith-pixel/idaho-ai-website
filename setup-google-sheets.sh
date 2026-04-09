#!/bin/bash

# Google Sheets Setup Script for Teton Group AI Receptionist
# This script will help you add credentials to Vercel

set -e

echo "🚀 Teton Group - Google Sheets Setup"
echo "======================================"
echo ""

# Check if service account JSON exists
if [ ! -f "service-account.json" ]; then
    echo "❌ Error: service-account.json not found"
    echo ""
    echo "Please follow these steps:"
    echo "1. Go to: https://console.cloud.google.com/"
    echo "2. Create a new project: 'Teton Group AI Receptionist'"
    echo "3. Enable Google Sheets API"
    echo "4. Create Service Account (role: Editor)"
    echo "5. Download JSON key and save as 'service-account.json' in this directory"
    echo ""
    exit 1
fi

echo "✅ Found service-account.json"
echo ""

# Extract credentials from JSON
EMAIL=$(cat service-account.json | grep -o '"client_email": "[^"]*' | cut -d'"' -f4)
PRIVATE_KEY=$(cat service-account.json | grep -o '"private_key": "[^"]*' | cut -d'"' -f4)

echo "📧 Service Account Email: $EMAIL"
echo ""

# Prompt for Sheet ID
echo "📊 Now create your Google Sheet:"
echo "1. Go to: https://sheets.google.com"
echo "2. Create new sheet: 'AI Receptionist Demo Requests'"
echo "3. Add headers: Timestamp | Business Name | Business Phone | Test Phone | Industry | Website | Address | Hours | Services | Pricing | Booking Process | FAQs | Additional Info | Files"
echo "4. Share with: $EMAIL (give Editor access)"
echo "5. Copy the Sheet ID from the URL"
echo ""
read -p "Enter your Google Sheet ID: " SHEET_ID

echo ""
echo "🔧 Adding environment variables to Vercel..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Add environment variables
vercel env add GOOGLE_SHEET_ID production <<< "$SHEET_ID"
vercel env add GOOGLE_SERVICE_ACCOUNT_EMAIL production <<< "$EMAIL"
vercel env add GOOGLE_PRIVATE_KEY production <<< "$PRIVATE_KEY"

echo ""
echo "✅ Environment variables added to Vercel!"
echo ""
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Done! Your AI Receptionist form is now connected to Google Sheets."
echo ""
echo "📊 View your sheet at:"
echo "https://docs.google.com/spreadsheets/d/$SHEET_ID/edit"
echo ""
