'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Phone, CheckCircle2, Calendar, Mountain, Sparkles, Clock, MapPin, ArrowRight, Star } from 'lucide-react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'there';
  const company = searchParams.get('company') || 'your business';

  useEffect(() => {
    // Fire Google Ads conversion for consultation request
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18099790158/consultation_requested'
      });
      
      (window as any).gtag('event', 'generate_lead', {
        'event_category': 'engagement',
        'event_label': 'idaho_consultation_submitted'
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
            <span className="text-2xl font-bold text-gray-900">Teton Group</span>
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
                  'event_label': 'consultation_thank_you_header_phone'
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
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Success Icon with Animation */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <div className="relative w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
                <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 drop-shadow-lg">
              You're All Set, {name}! 🎉
            </h1>

            <p className="text-2xl md:text-3xl text-blue-100 mb-4 leading-relaxed">
              Thanks for reaching out about AI for <strong className="text-white">{company}</strong>
            </p>

            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold mb-8">
              <Clock className="w-5 h-5" />
              We'll contact you within 24 hours
            </div>

            <div className="flex items-center justify-center gap-3 text-white/90">
              <div className="flex gap-1">
                <Star className="w-5 h-5 fill-current text-yellow-300" />
                <Star className="w-5 h-5 fill-current text-yellow-300" />
                <Star className="w-5 h-5 fill-current text-yellow-300" />
                <Star className="w-5 h-5 fill-current text-yellow-300" />
                <Star className="w-5 h-5 fill-current text-yellow-300" />
              </div>
              <span className="font-semibold">Trusted by 50+ Idaho businesses</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What Happens Next
              </h2>
              <p className="text-xl text-gray-600">
                Here's our simple, no-pressure process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 h-full">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-3xl font-black text-white">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">We Review Your Info</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our team will carefully review your business needs and prepare tailored AI solutions for your consultation call.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-blue-300" />
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 h-full">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-3xl font-black text-white">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">We'll Call You</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Within 24 hours, we'll reach out to schedule your free 30-minute consultation at a time that works for you.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-green-300" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 h-full">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-3xl font-black text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Honest Conversation</h3>
                <p className="text-gray-700 leading-relaxed">
                  No sales pitch. Just an honest discussion about what AI can (and can't) do for {company}.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 text-center">
              <p className="text-lg text-gray-700">
                <strong className="text-blue-700">Pro tip:</strong> Think about your biggest time-consuming tasks or repetitive processes. 
                That's where AI shines brightest!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Idaho Business Focus */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Built for Idaho Businesses
              </h2>
              <p className="text-xl text-gray-600">
                We understand Idaho's unique business landscape
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <MapPin className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Local Expertise</h3>
                <p className="text-gray-600 mb-4">
                  From Boise tech startups to Twin Falls agriculture, we've helped Idaho businesses across every industry save time and money with AI.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Agriculture & Farming Operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Healthcare & Medical Practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Real Estate & Property Management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Local Retail & Restaurants</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <Calendar className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast Results</h3>
                <p className="text-gray-600 mb-4">
                  No endless consultations or drawn-out timelines. Most projects go live within 30-60 days.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Week 1-2: Discovery & Planning</p>
                      <p className="text-sm text-gray-600">Understand your needs, design the solution</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Week 3-6: Build & Test</p>
                      <p className="text-sm text-gray-600">Develop your custom AI, test with real data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Week 7-8: Launch & Support</p>
                      <p className="text-sm text-gray-600">Go live and train your team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Can't Wait to Talk?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Give us a call right now. We're here Monday-Friday, 8am-6pm Mountain Time.
            </p>

            <a 
              href="tel:+12087897053" 
              className="inline-flex items-center gap-3 px-12 py-6 bg-white text-blue-700 text-2xl font-bold rounded-2xl hover:bg-blue-50 transition shadow-2xl"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-18099790158/phone_call_lead'
                  });
                  (window as any).gtag('event', 'phone_call_clicked', {
                    'event_category': 'engagement',
                    'event_label': 'consultation_thank_you_cta_phone'
                  });
                }
              }}
            >
              <Phone className="w-8 h-8" />
              (208) 789-7053
            </a>

            <p className="mt-8 text-blue-200">
              Or check out our <Link href="/ai-receptionist" className="underline font-semibold hover:text-white">AI Receptionist</Link> if you need 24/7 phone answering!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Mountain className="w-8 h-8 text-blue-400" />
                  <span className="text-xl font-bold text-white">Teton Group</span>
                </div>
                <p className="text-sm">Custom AI solutions for Idaho businesses</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <p className="text-sm mb-2">
                  <a href="tel:+12087897053" className="hover:text-white transition">
                    (208) 789-7053
                  </a>
                </p>
                <p className="text-sm">Monday-Friday, 8am-6pm MT</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/ai-receptionist" className="hover:text-white transition">
                      AI Receptionist
                    </Link>
                  </li>
                  <li>
                    <Link href="/idaho" className="hover:text-white transition">
                      Custom AI Solutions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm">
              <p>© 2026 Teton Group. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ConsultationThankYouPage() {
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
