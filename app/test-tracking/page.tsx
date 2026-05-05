'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TestTrackingPage() {
  const [tests, setTests] = useState<any[]>([]);

  const addTest = (name: string, result: string, details?: string) => {
    setTests(prev => [...prev, { name, result, details, time: new Date().toLocaleTimeString() }]);
  };

  useEffect(() => {
    // Test 1: Check if gtag is loaded
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        if ((window as any).gtag) {
          addTest('gtag Loaded', 'PASS', 'window.gtag is defined');
        } else {
          addTest('gtag Loaded', 'FAIL', 'window.gtag is undefined - Google Ads tags not loading');
        }

        // Test 2: Check if dataLayer exists
        if ((window as any).dataLayer) {
          addTest('dataLayer Exists', 'PASS', `dataLayer has ${(window as any).dataLayer.length} events`);
        } else {
          addTest('dataLayer Exists', 'FAIL', 'window.dataLayer is undefined');
        }

        // Test 3: Check conversion IDs in page source
        const hasOldId = document.documentElement.innerHTML.includes('AW-17943114805');
        const hasNewId = document.documentElement.innerHTML.includes('AW-18099790158');
        
        if (hasOldId && hasNewId) {
          addTest('Conversion IDs Present', 'PASS', 'Both AW-17943114805 and AW-18099790158 found');
        } else {
          addTest('Conversion IDs Present', 'FAIL', `Old: ${hasOldId}, New: ${hasNewId}`);
        }
      }
    }, 500);
  }, []);

  const testConversion = (label: string) => {
    if ((window as any).gtag) {
      console.log(`Testing conversion: ${label}`);
      (window as any).gtag('event', 'conversion', {
        'send_to': `AW-18099790158/${label}`
      });
      addTest(`Manual Test: ${label}`, 'FIRED', 'Check Network tab for google-analytics.com requests');
    } else {
      addTest(`Manual Test: ${label}`, 'FAIL', 'gtag not available');
    }
  };

  const testPhoneClick = () => {
    if ((window as any).gtag) {
      console.log('Testing phone click conversion');
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18099790158/phone_call_lead'
      });
      addTest('Phone Click Test', 'FIRED', 'phone_call_lead conversion sent');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Google Ads Conversion Tracking Test</h1>
          <p className="text-gray-600 mb-6">This page helps diagnose conversion tracking issues.</p>

          {/* Navigation */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-semibold mb-2">Quick Links:</p>
            <div className="flex gap-4">
              <Link href="/ai-receptionist" className="text-blue-600 hover:underline">
                AI Receptionist Page
              </Link>
              <Link href="/ai-receptionist/demo-thank-you?business=Test&phone=555-1234" className="text-blue-600 hover:underline">
                Demo Thank-You Page
              </Link>
              <Link href="/" className="text-blue-600 hover:underline">
                Home
              </Link>
            </div>
          </div>

          {/* Auto Tests */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Automatic Tests</h2>
            <div className="space-y-2">
              {tests.map((test, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-lg border-2 ${
                    test.result === 'PASS' ? 'bg-green-50 border-green-500' : 
                    test.result === 'FAIL' ? 'bg-red-50 border-red-500' : 
                    'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold">{test.name}</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${
                        test.result === 'PASS' ? 'bg-green-600 text-white' : 
                        test.result === 'FAIL' ? 'bg-red-600 text-white' : 
                        'bg-blue-600 text-white'
                      }`}>
                        {test.result}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{test.time}</span>
                  </div>
                  {test.details && (
                    <p className="text-sm text-gray-600 mt-1">{test.details}</p>
                  )}
                </div>
              ))}
              {tests.length === 0 && (
                <p className="text-gray-500 italic">Running tests...</p>
              )}
            </div>
          </div>

          {/* Manual Tests */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Manual Conversion Tests</h2>
            <p className="text-sm text-gray-600 mb-4">
              Open DevTools → Network tab, then click these buttons to fire test conversions.
              Look for requests to <code className="bg-gray-100 px-1 rounded">google-analytics.com</code> or <code className="bg-gray-100 px-1 rounded">google.com/pagead</code>
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => testConversion('XcdjCJfJ9aMcEM7C07ZD')}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Test Lead Form Conversion
              </button>
              <button
                onClick={() => testConversion('demo_call_started')}
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
              >
                Test Demo Call Started
              </button>
              <button
                onClick={testPhoneClick}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                Test Phone Click
              </button>
              <button
                onClick={() => testConversion('purchase_completed')}
                className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
              >
                Test Purchase Conversion
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
            <h3 className="font-bold text-yellow-900 mb-2">📋 How to Verify Tracking:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-900">
              <li>All automatic tests above should show "PASS"</li>
              <li>Open DevTools (F12) → Network tab</li>
              <li>Filter by "google" or "analytics"</li>
              <li>Click a manual test button above</li>
              <li>You should see a new request appear with "conversion" in the URL</li>
              <li>If you see the requests, tracking is working!</li>
            </ol>
          </div>

          {/* Debug Info */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Debug Information:</h3>
            <div className="text-xs font-mono space-y-1">
              <p>gtag available: {typeof window !== 'undefined' && (window as any).gtag ? 'YES' : 'NO'}</p>
              <p>dataLayer available: {typeof window !== 'undefined' && (window as any).dataLayer ? 'YES' : 'NO'}</p>
              <p>User Agent: {typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A'}</p>
              <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
