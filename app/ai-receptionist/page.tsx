"use client";

import { useState } from 'react';
import { Phone, CheckCircle, Loader2, Star, Users, Award, Shield, Clock } from 'lucide-react';
import Link from 'next/link';
import SampleCallPlayer from '../components/SampleCallPlayer';
import { SAMPLE_CALLS } from '../data/sampleCallTranscripts';
import { trackEvent } from '../components/Analytics';

const INDUSTRIES = ['Legal', 'Medical', 'Real Estate', 'Home Services', 'Restaurants', 'Retail', 'Professional Services', 'Other'];

export default function AIReceptionistLanding() {
  const [demoForm, setDemoForm] = useState({
    businessName: '',
    website: '',
    phone: '',
    industry: '',
    faqs: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: 'self-serve' | 'full-service') => {
    setCheckoutLoading(plan);
    
    // Track checkout click
    trackEvent('checkout_clicked', { plan });
    
    // Stripe Price IDs (public - safe to expose in client code)
    const priceId = plan === 'self-serve' 
      ? 'price_1TKhlTLCkw1qIwMp5LHR6uDG'  // Self-Serve $99/mo
      : 'price_1TKhlTLCkw1qIwMpIUHImoHB'; // Full-Service $500/mo

    try {
      const response = await fetch('/api/stripe-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          metadata: {
            plan: plan === 'self-serve' ? 'Self-Serve ($99/mo)' : 'Full-Service ($500/mo)',
            source: 'landing_page',
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout failed');
      }

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(`Failed to start checkout: ${error.message}. Please try again.`);
      setCheckoutLoading(null);
    }
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Track demo form submission
    trackEvent('demo_form_submitted', {
      businessName: demoForm.businessName,
      industry: demoForm.industry,
      hasWebsite: !!demoForm.website,
      hasFAQs: !!demoForm.faqs,
    });

    try {
      const response = await fetch('/api/vapi-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: demoForm.businessName,
          website: demoForm.website,
          testPhone: demoForm.phone,
          industry: demoForm.industry,
          faqs: demoForm.faqs,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        
        // Track demo call started
        trackEvent('demo_call_started', {
          businessName: demoForm.businessName,
          industry: demoForm.industry,
        });
        
        // Fire Google Ads conversion tracking
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17943114805/hlTbCMWDzZIcELXo-OtC'
          });
        }
      }
    } catch (error) {
      alert('Failed to start demo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your AI is Calling You Now!</h1>
          <p className="text-lg text-gray-600 mb-4">
            The <strong className="text-blue-600">AI receptionist</strong> is calling <strong className="text-blue-600">+1 {demoForm.phone}</strong> right now.
          </p>
          <p className="text-base text-gray-500 mb-8">
            Answer the phone and talk to the AI just like a customer would. Ask it questions about your business!
          </p>
          <Link href="/" className="text-blue-600 font-semibold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">Teton Group AI</Link>
          <div className="flex gap-6 items-center">
            <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">How It Works</a>
            <a href="#sample-calls" className="text-gray-700 hover:text-gray-900 font-medium">Sample Calls</a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium">Pricing</a>
            <Link href="/login" className="text-gray-700 hover:text-gray-900 font-medium">
              Sign In
            </Link>
            <a href="#demo" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Try Free Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Smith.ai Style */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-current" />
              Trusted by 50+ businesses nationwide
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 drop-shadow-lg">
              Never Miss a Call.<br/>Never Lose a Customer.
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
              Your AI receptionist answers every call 24/7, books appointments directly to your calendar, and forwards important calls—just like a real receptionist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="#demo" className="px-10 py-5 bg-white text-blue-700 text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow-2xl">
                Demo Our AI With Your Business Info →
              </a>
              <a href="#sample-calls" className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-bold rounded-xl hover:bg-white/20 transition">
                Hear Real Calls
              </a>
            </div>
            
            {/* Trust Bar */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Setup in 5 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">4.9/5 Stars</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">Call Forwarding Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Auto Calendar Booking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Bar */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Forward Any Call</h3>
                <p className="text-gray-600 text-sm">
                  Your AI handles screening, then transfers important calls directly to you or your team.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Google Calendar Sync</h3>
                <p className="text-gray-600 text-sm">
                  Appointments booked by AI appear instantly on your calendar—no manual entry needed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">24/7 Availability</h3>
                <p className="text-gray-600 text-sm">
                  After hours? Weekends? Your AI never sleeps—customers always get a real response.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sample Calls Section - Key Smith.ai Feature */}
      <section id="sample-calls" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hear It In Action</h2>
            <p className="text-lg text-gray-600">
              Listen to real AI receptionist calls from businesses like yours. Every call is answered professionally, every time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {SAMPLE_CALLS.map((call, idx) => (
              <SampleCallPlayer
                key={idx}
                industry={call.industry}
                scenario={call.scenario}
                duration={call.duration}
                audioUrl={call.audioUrl}
                transcript={call.transcript}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              <strong>Note:</strong> All sample calls use real AI responses trained on business-specific information.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table - AI vs Hiring */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                AI Receptionist vs Hiring a Person
              </h2>
              <p className="text-xl text-blue-200">
                See why smart businesses are switching to AI
              </p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                
                {/* Feature Column */}
                <div className="p-6 bg-gray-50">
                  <div className="h-16 flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-lg">Feature</span>
                  </div>
                  <ul className="space-y-6 mt-6">
                    <li className="py-3 text-gray-900 font-semibold">Monthly Cost</li>
                    <li className="py-3 text-gray-900 font-semibold">Availability</li>
                    <li className="py-3 text-gray-900 font-semibold">Setup Time</li>
                    <li className="py-3 text-gray-900 font-semibold">Sick Days / PTO</li>
                    <li className="py-3 text-gray-900 font-semibold">Handles Multiple Calls</li>
                    <li className="py-3 text-gray-900 font-semibold">Calendar Integration</li>
                    <li className="py-3 text-gray-900 font-semibold">Call Forwarding</li>
                    <li className="py-3 text-gray-900 font-semibold">Scales Instantly</li>
                  </ul>
                </div>

                {/* AI Receptionist Column */}
                <div className="p-6 bg-blue-50 md:order-3">
                  <div className="h-16 flex flex-col items-center justify-center">
                    <span className="text-blue-700 font-black text-xl">AI Receptionist</span>
                    <span className="text-sm text-blue-600 font-semibold mt-1">✨ Recommended</span>
                  </div>
                  <ul className="space-y-6 mt-6">
                    <li className="py-3 text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="font-bold text-green-600">$99/month</span>
                    </li>
                    <li className="py-3 text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      24/7/365
                    </li>
                    <li className="py-3 text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      5 minutes
                    </li>
                    <li className="py-3 text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      Never
                    </li>
                    <li className="py-3 text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      Unlimited
                    </li>
                    <li className="py-3 text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      Automatic
                    </li>
                    <li className="py-3 text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      Included
                    </li>
                    <li className="py-3 text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      Yes
                    </li>
                  </ul>
                </div>

                {/* Human Receptionist Column */}
                <div className="p-6">
                  <div className="h-16 flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-xl">Human Receptionist</span>
                  </div>
                  <ul className="space-y-6 mt-6 text-gray-600">
                    <li className="py-3 flex items-center gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span className="font-bold text-red-600">$3,000+/month</span>
                    </li>
                    <li className="py-3 flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      Mon-Fri only
                    </li>
                    <li className="py-3 flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      2-4 weeks
                    </li>
                    <li className="py-3 flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      Frequent
                    </li>
                    <li className="py-3 flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      One at a time
                    </li>
                    <li className="py-3 flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      Manual entry
                    </li>
                    <li className="py-3 flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      Optional
                    </li>
                    <li className="py-3 flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      Requires hiring
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
                <p className="text-white text-xl font-bold mb-4">
                  Save $35,000+ per year. Get started in 5 minutes.
                </p>
                <a href="#demo" className="inline-block px-10 py-4 bg-white text-blue-700 text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow-lg">
                  Try It Free Now →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works - Clean & Simple */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Started in Minutes</h2>
            <p className="text-lg text-gray-600">
              No complex setup. No long contracts. Just simple, effective AI phone support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Train Your AI</h3>
              <p className="text-gray-600">
                Provide your website or key business info. Your AI learns everything it needs in seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Test It Live</h3>
              <p className="text-gray-600">
                Get an instant demo call to your phone. Experience what your customers will hear.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Go Live</h3>
              <p className="text-gray-600">
                Forward your business line. Your AI receptionist is now answering calls 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Reviews */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-300" />
                  ))}
                </div>
                <p className="text-lg mb-4">"Our AI receptionist has saved us thousands in labor costs and we never miss a call anymore. It's like having a full-time employee for a fraction of the cost."</p>
                <p className="font-semibold">— Sarah M., Law Firm Owner</p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-300" />
                  ))}
                </div>
                <p className="text-lg mb-4">"Patients love it. They can book appointments 24/7, and the AI is so natural they often don't realize it's not a human."</p>
                <p className="font-semibold">— Dr. James T., Dental Practice</p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-300" />
                  ))}
                </div>
                <p className="text-lg mb-4">"Setup took less than 5 minutes. Now we capture every lead, even when we're closed. Best investment we've made this year."</p>
                <p className="font-semibold">— Mike R., Home Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Transparent */}
      {/* Integrations Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm font-semibold text-gray-500 mb-6">INTEGRATES WITH YOUR FAVORITE TOOLS</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {/* Google Calendar */}
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                  <path fill="#EA4335" d="M7 10h5v5H7z"/>
                </svg>
                <span>Google Calendar</span>
              </div>
              
              {/* Zapier */}
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#FF4A00" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span>Zapier</span>
              </div>
              
              {/* Stripe */}
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#635BFF" d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                </svg>
                <span>Stripe</span>
              </div>
              
              {/* More */}
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm">+20</span>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 mb-2">Choose the plan that fits your business. Cancel anytime.</p>
            <p className="text-xl font-bold text-blue-600">🎉 Start with a 3-Day Free Trial</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Self-Serve */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Self-Serve</h3>
              <div className="mb-2">
                <span className="text-5xl font-bold">$99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-sm text-blue-600 font-semibold mb-4">3-day free trial • No credit card charged until trial ends</p>
              <p className="text-gray-600 mb-6">Perfect for small businesses who want full control.</p>
              <button 
                onClick={() => handleCheckout('self-serve')}
                disabled={checkoutLoading === 'self-serve'}
                className="block w-full py-3 bg-gray-900 text-white text-center rounded-lg font-semibold hover:bg-gray-800 transition mb-6 disabled:opacity-50"
              >
                {checkoutLoading === 'self-serve' ? 'Loading...' : 'Get Started'}
              </button>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">5-minute setup wizard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">18 professional AI voices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email & chat support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Call history dashboard</span>
                </li>
              </ul>
            </div>

            {/* Full-Service */}
            <div className="bg-blue-600 text-white rounded-xl shadow-lg p-8 border-2 border-blue-700 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Full-Service</h3>
              <div className="mb-2">
                <span className="text-5xl font-bold">$500</span>
                <span className="text-blue-100">/month</span>
              </div>
              <p className="text-sm text-yellow-300 font-semibold mb-4">3-day free trial • No credit card charged until trial ends</p>
              <p className="text-blue-100 mb-6">We handle everything. You focus on your business.</p>
              <button
                onClick={() => handleCheckout('full-service')}
                disabled={checkoutLoading === 'full-service'}
                className="block w-full py-3 bg-white text-blue-600 text-center rounded-lg font-semibold hover:bg-blue-50 transition mb-6 disabled:opacity-50"
              >
                {checkoutLoading === 'full-service' ? 'Loading...' : 'Get Started'}
              </button>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">White-glove setup by our team</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Custom voice cloning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Weekly performance reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Priority phone support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
              {/* Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md">
                RISK-FREE GUARANTEE
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-4 mt-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-3xl font-black text-green-900">30-Day Money-Back Guarantee</p>
                  <p className="text-green-700 font-semibold">Plus 3-Day Free Trial</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Try it completely risk-free. Not happy? Get a full refund within 30 days. No questions. No hassle. No risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Form - Keep Your Interactive Flow */}
      <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🎭 Live Demo in 60 Seconds
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Experience Your AI Receptionist
              </h2>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                We'll call you right now as if you're a customer calling <strong className="text-blue-600">your business</strong>. Ask questions, request an appointment—see how your AI handles it.
              </p>
              <div className="bg-white border-2 border-blue-200 rounded-xl p-4 max-w-xl mx-auto">
                <p className="text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 inline text-green-500 mr-1" />
                  No credit card required
                  <span className="mx-2">•</span>
                  <CheckCircle className="w-4 h-4 inline text-green-500 mr-1" />
                  No sales pitch
                  <span className="mx-2">•</span>
                  <CheckCircle className="w-4 h-4 inline text-green-500 mr-1" />
                  Just pure AI demo
                </p>
              </div>
            </div>

            <form onSubmit={handleDemoSubmit} className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl border border-gray-200">
              <div className="space-y-6">
                <div>
                  <label className="block font-semibold text-gray-900 mb-2">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={demoForm.businessName}
                    onChange={e => setDemoForm({...demoForm, businessName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-900 mb-2">Industry *</label>
                  <select
                    required
                    value={demoForm.industry}
                    onChange={e => setDemoForm({...demoForm, industry: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select your industry</option>
                    {INDUSTRIES.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-900 mb-2">Website (optional)</label>
                  <input
                    type="url"
                    value={demoForm.website}
                    onChange={e => setDemoForm({...demoForm, website: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="https://yourwebsite.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">We'll train your AI on your website content</p>
                </div>

                {/* FAQ Section - Collapsible */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowFAQs(!showFAQs)}
                    className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
                  >
                    {showFAQs ? '−' : '+'} Add Common Questions (Optional)
                  </button>
                  {showFAQs && (
                    <div className="mt-3">
                      <textarea
                        value={demoForm.faqs}
                        onChange={e => setDemoForm({...demoForm, faqs: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        rows={6}
                        placeholder="Example:&#10;Q: What are your hours?&#10;A: We're open Mon-Fri 9am-5pm&#10;&#10;Q: Do you take insurance?&#10;A: Yes, we accept most major plans"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Add common questions your customers ask. The AI will use these to give accurate answers during the demo.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-900 mb-2">Your Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={demoForm.phone}
                    onChange={e => setDemoForm({...demoForm, phone: e.target.value.replace(/[^\d]/g, '')})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="555-123-4567"
                  />
                  <p className="text-sm text-gray-500 mt-1">We'll call this number so you can act as a customer calling your business.</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-xl hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Initializing Your AI...
                    </>
                  ) : (
                    <>
                      <Phone className="w-6 h-6" />
                      Have My Custom AI Call Me Now
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Takes &lt; 60 seconds to train and call
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Stop Missing Calls?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 50+ businesses that never miss a customer call. Get started in minutes.
          </p>
          <a href="#demo" className="inline-block px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-50 transition">
            Try Free Demo Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Teton Group AI</h3>
              <p className="text-sm">24/7 AI receptionists for modern businesses.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Sample Calls</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 Teton Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
