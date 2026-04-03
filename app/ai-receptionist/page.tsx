"use client";

import { useState } from 'react';
import { Phone, CheckCircle, Clock, MessageSquare, TrendingUp, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function AIReceptionistPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'consulting'>('monthly');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <span className="font-bold text-xl">Teton Group</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-700 transition font-medium">
                Back to Home
              </Link>
              <a href="#pricing" className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition font-semibold">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Never Miss a Call Again
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Your AI Receptionist
              <br />
              Ready in 5 Minutes
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
              An intelligent AI assistant that answers calls 24/7, books appointments, and handles customer questions—so you can focus on what matters.
            </p>
            
            <a href="#pricing" className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl transition">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Phone,
                title: 'Never Miss a Call',
                description: 'Your AI answers every call instantly, even after hours and on weekends',
              },
              {
                icon: Clock,
                title: '24/7 Availability',
                description: 'Always ready to help your customers, no matter when they call',
              },
              {
                icon: MessageSquare,
                title: 'Natural Conversations',
                description: 'Sounds human, understands context, and gives helpful responses',
              },
              {
                icon: TrendingUp,
                title: 'Boost Revenue',
                description: 'Convert more leads by never letting a potential customer go to voicemail',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Get 6 months free when you book a consultation</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Monthly Plan */}
            <div className={`relative bg-white rounded-3xl p-8 border-2 transition-all ${
              billingCycle === 'monthly' ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200 shadow-sm'
            }`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Pay Monthly</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-black">$297</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Billed monthly • Cancel anytime</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  '24/7 AI phone answering',
                  'Up to 500 calls/month',
                  'Appointment booking',
                  'Custom voice & personality',
                  'Common question handling',
                  'SMS notifications',
                  'Call transcripts & analytics',
                  'Email support',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setBillingCycle('monthly')}
                className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition"
              >
                Start 7-Day Free Trial
              </button>
            </div>

            {/* Consulting Plan */}
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl p-8 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold">
                🎁 BEST VALUE
              </div>

              <div className="text-center mb-8 mt-4">
                <h3 className="text-2xl font-bold mb-2">6 Months FREE</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-black">$0</span>
                  <span className="opacity-90">/month</span>
                </div>
                <p className="text-sm opacity-75 mt-2">When you book an AI Strategy Call</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  'Everything in Monthly plan',
                  '6 months completely FREE ($1,782 value)',
                  '1-hour AI Strategy Session',
                  'Custom AI implementation roadmap',
                  'Priority phone support',
                  'Quarterly business reviews',
                  'First access to new features',
                  'Dedicated account manager',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#consultation-form"
                className="block w-full bg-white text-blue-700 py-4 rounded-xl font-bold hover:shadow-2xl transition text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Book Free Consultation
                </div>
              </a>

              <p className="text-xs text-center mt-4 opacity-75">
                After 6 months, continue at $297/month or cancel anytime
              </p>
            </div>
          </div>

          <div className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-gray-600">
              <strong>Why book a consultation?</strong> During your AI Strategy Call, we'll explore how 
              AI can transform your entire business—not just phone answering. Most clients discover 
              3-5 additional AI opportunities that save them thousands monthly.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Set Up in 3 Simple Steps</h2>
            <p className="text-xl text-gray-600">Your AI receptionist will be live in under 5 minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Tell Us About Your Business',
                description: 'Business name, hours, and what you do. Takes 30 seconds.',
              },
              {
                step: '2',
                title: 'Choose Your AI Voice',
                description: 'Pick from professional voices that match your brand personality.',
              },
              {
                step: '3',
                title: 'Go Live!',
                description: 'Test it, then activate. Your AI receptionist starts answering calls immediately.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="consultation-form" className="py-20 bg-gradient-to-br from-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book your free AI Strategy Call and get 6 months of AI Receptionist absolutely free
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-left">
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg text-gray-900"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg text-gray-900"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Business Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg text-gray-900"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg text-gray-900"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg text-gray-900"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What challenges are you facing? (Optional)
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg text-gray-900 resize-none"
                    rows={3}
                    placeholder="Tell us about your biggest business challenges..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-700 py-4 rounded-xl font-bold hover:shadow-2xl transition text-lg"
                >
                  Book My Free Consultation →
                </button>
                <p className="text-xs text-center opacity-75">
                  We'll contact you within 24 hours to schedule your call
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm">
            © 2026 Teton Group. All rights reserved. |{' '}
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            {' '}|{' '}
            <Link href="/blog" className="hover:text-white transition">
              Blog
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
