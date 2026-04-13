"use client";

import { useState } from 'react';
import { Phone, CheckCircle, Loader2, Star, Users, Award, Shield, Clock } from 'lucide-react';
import Link from 'next/link';
import SampleCallPlayer from '../components/SampleCallPlayer';
import { SAMPLE_CALLS } from '../data/sampleCallTranscripts';

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

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        // Fire conversion tracking
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
            <a href="#demo" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Try Free Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Smith.ai Style */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-current" />
              Trusted by 50+ businesses nationwide
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Never Miss a Call Again
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              24/7 AI receptionists that answer every call, book appointments, and provide instant support—so you never lose another customer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="#demo" className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg">
                Get Free Demo Call
              </a>
              <a href="#sample-calls" className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-800 text-lg font-semibold rounded-lg hover:border-gray-400 transition">
                Listen to Sample Calls
              </a>
            </div>
            
            {/* Trust Bar */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">BBB Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold">4.9/5 Star Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">US-Based Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">50+ Active Businesses</span>
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
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600">Choose the plan that fits your business. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Self-Serve */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Self-Serve</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">$99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for small businesses who want full control.</p>
              <a href="#demo" className="block w-full py-3 bg-gray-900 text-white text-center rounded-lg font-semibold hover:bg-gray-800 transition mb-6">
                Get Started
              </a>
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
              <div className="mb-6">
                <span className="text-5xl font-bold">$500</span>
                <span className="text-blue-100">/month</span>
              </div>
              <p className="text-blue-100 mb-6">We handle everything. You focus on your business.</p>
              <a href="#demo" className="block w-full py-3 bg-white text-blue-600 text-center rounded-lg font-semibold hover:bg-blue-50 transition mb-6">
                Get Started
              </a>
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

          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <p className="text-xl font-bold text-green-900 mb-2">💯 7-Day Money-Back Guarantee</p>
              <p className="text-gray-700">
                Try it risk-free. If you're not satisfied within 7 days, we'll refund you. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Form - Keep Your Interactive Flow */}
      <section id="demo" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Try It Free Right Now</h2>
              <p className="text-lg text-gray-600 mb-3">
                Your <strong className="text-blue-600">AI receptionist</strong> will call you in 60 seconds to demonstrate how it works.
              </p>
              <p className="text-base text-gray-500">
                Experience what your customers will hear. No credit card. No sales pitch. Just the AI.
              </p>
            </div>

            <form onSubmit={handleDemoSubmit} className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
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
                  <p className="text-sm text-gray-500 mt-1">The AI receptionist will call this number to demo itself to you</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Calling You Now...
                    </>
                  ) : (
                    <>
                      <Phone className="w-5 h-5" />
                      Have the AI Call Me Now
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Average demo call duration: 2 minutes
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
