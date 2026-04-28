'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Phone, CheckCircle2 } from 'lucide-react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const businessName = searchParams.get('business') || 'your business';
  const phone = searchParams.get('phone') || '';

  useEffect(() => {
    // Fire Google Ads conversion for demo form submission on page load
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // Lead form submission conversion
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18099790158/XcdjCJfJ9aMcEM7C07ZD'
      });
      
      // Additional event for better tracking
      (window as any).gtag('event', 'generate_lead', {
        'event_category': 'engagement',
        'event_label': 'demo_form_submitted'
      });

      // Track demo call started
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18099790158/demo_call_started'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Your AI Is Calling You Now! 📞
        </h1>

        <p className="text-lg text-gray-600 text-center mb-8">
          We trained your AI receptionist on <strong className="text-blue-600">{businessName}</strong> and it's 
          calling <strong className="text-blue-600">{phone}</strong> right now.
        </p>

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Phone className="w-6 h-6 text-blue-600" />
            What to Do Next:
          </h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span><strong>Answer the call</strong> from your AI receptionist</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span><strong>Pretend you're a customer</strong> calling {businessName}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span><strong>Ask questions</strong> about your services, pricing, or availability</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span><strong>Try to book an appointment</strong> to see calendar integration in action</span>
            </li>
          </ol>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Love what you hear? Get started with your AI receptionist today.
          </p>
          <a 
            href="/ai-receptionist#pricing" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:shadow-lg transition"
          >
            Choose Your Plan
          </a>
        </div>

        {/* Contact */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-2">Questions about what you just heard?</p>
          <a 
            href="tel:+12087897053" 
            className="text-blue-600 hover:underline font-semibold text-lg"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'conversion', {
                  'send_to': 'AW-18099790158/phone_call_lead'
                });
                (window as any).gtag('event', 'phone_call_clicked', {
                  'event_category': 'engagement',
                  'event_label': 'demo_thank_you_phone_click'
                });
              }
            }}
          >
            Call us at (208) 789-7053
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DemoThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
