'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Phone, CheckCircle2, Clock, Calendar, Headphones, Mountain, Sparkles, ArrowRight, Star } from 'lucide-react';

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
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Mountain className="w-8 h-8 text-blue-700" />
            <span className="text-2xl font-bold text-gray-900">Teton Group AI</span>
          </Link>
          <a 
            href="tel:+12087897053"
            className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'conversion', {
                  'send_to': 'AW-18099790158/phone_call_lead'
                });
                (window as any).gtag('event', 'phone_call_clicked', {
                  'event_category': 'engagement',
                  'event_label': 'thank_you_header_phone_click'
                });
              }
            }}
          >
            <Phone className="w-5 h-5" />
            (208) 789-7053
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Icon with Animation */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Your AI Is Calling<br />
              <span className="text-blue-600">Right Now! 📞</span>
            </h1>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-blue-200">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                We trained your AI receptionist on <strong className="text-blue-600">{businessName}</strong>
              </p>
              <p className="text-lg md:text-xl text-gray-600 mt-2">
                It's calling <strong className="text-blue-700 font-mono">{phone}</strong> this very second
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 text-green-600 font-semibold">
              <div className="flex gap-1">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="text-gray-700">Rated 4.9/5 by 50+ businesses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What to Do Next
              </h2>
              <p className="text-lg text-gray-600">
                Get ready to experience your AI receptionist in action
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl font-black text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Answer the Call</h3>
                <p className="text-gray-700">
                  Your phone should be ringing! Pick up and hear your custom-trained AI receptionist.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl font-black text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pretend You're a Customer</h3>
                <p className="text-gray-700">
                  Act like someone calling <strong>{businessName}</strong> for the first time.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl font-black text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ask Questions</h3>
                <p className="text-gray-700">
                  Test it! Ask about services, pricing, hours, or anything a real customer would ask.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-200">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl font-black text-white">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Try Booking</h3>
                <p className="text-gray-700">
                  Request an appointment to see the Google Calendar integration work in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Why Businesses Love Our AI
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Availability</h3>
                <p className="text-gray-600">
                  Never miss a call again. Your AI works nights, weekends, and holidays — no breaks, no sick days.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Auto Calendar Sync</h3>
                <p className="text-gray-600">
                  Appointments booked by AI appear instantly on your Google Calendar. Zero manual entry.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Headphones className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sounds Human</h3>
                <p className="text-gray-600">
                  Most callers don't realize they're talking to AI. Natural voices, real conversations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Limited Time Offer
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Love What You Heard?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Get your AI receptionist live in just 5 minutes.<br />
              <strong className="text-white">Start with a 3-day free trial</strong> — no credit card charged until you love it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/ai-receptionist#pricing" 
                className="px-10 py-5 bg-white text-blue-700 text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow-2xl inline-flex items-center justify-center gap-2"
              >
                Choose Your Plan
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="tel:+12087897053" 
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-bold rounded-xl hover:bg-white/20 transition inline-flex items-center justify-center gap-2"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'conversion', {
                      'send_to': 'AW-18099790158/phone_call_lead'
                    });
                    (window as any).gtag('event', 'phone_call_clicked', {
                      'event_category': 'engagement',
                      'event_label': 'thank_you_cta_phone_click'
                    });
                  }
                }}
              >
                <Phone className="w-5 h-5" />
                Call (208) 789-7053
              </a>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>3-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Setup in 5 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">© 2026 Teton Group AI. All rights reserved.</p>
          <p className="text-sm mt-2">
            Questions? Call us at{' '}
            <a 
              href="tel:+12087897053" 
              className="text-blue-400 hover:text-blue-300 font-semibold"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-18099790158/phone_call_lead'
                  });
                }
              }}
            >
              (208) 789-7053
            </a>
          </p>
        </div>
      </footer>
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
