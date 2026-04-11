"use client";

import { useState } from 'react';
import { Phone, CheckCircle, Loader2, ArrowRight, Sparkles, Building2, UserCheck, MessageSquare, Briefcase, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function AIReceptionistRedesign() {
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !testPhone) return;

    setLoading(true);
    // Fire Google Ads lead form conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17943114805/hlTbCMWDzZIcELXo-OtC'
      });
    }

    try {
      const response = await fetch('/api/vapi-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          website,
          testPhone,
          // Using default settings for this simplified form
          industry: 'general',
          services: 'Answering questions based on website content.',
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        throw new Error('Failed to start demo call');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to start demo call. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600"/>
                </div>
                <h1 className="text-3xl font-bold mb-4">📞 Your Demo is on the way!</h1>
                <p className="text-lg text-gray-600 mb-8">
                    We'll call <strong className="text-blue-600">+1 {testPhone}</strong> shortly to demonstrate your AI receptionist.
                </p>
                <Link href="/" className="text-blue-600 font-semibold hover:underline">
                    Back to Home
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">
      
      {/* --- HERO SECTION --- */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            24/7 AI-Powered Answering Service
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Never Miss Another Customer Call
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Our AI receptionist answers every call, books appointments, and provides instant support—so you can focus on your business.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#demo-form" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              Try Free Demo
            </a>
            <a href="#pricing" className="px-8 py-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 font-semibold mb-6">Trusted by businesses nationwide</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
              <span className="font-bold text-gray-400 text-lg">50+ Businesses</span>
              <span className="font-bold text-gray-400 text-lg">4.9/5 Star Reviews</span>
              <span className="font-bold text-gray-400 text-lg">BBB Accredited</span>
              <span className="font-bold text-gray-400 text-lg">US-Based Support</span>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Go Live in 3 Simple Steps</h2>
            <p className="text-lg text-gray-600">From setup to live calls in under 5 minutes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8"/>
              </div>
              <h3 className="text-xl font-bold mb-2">1. Train Your AI</h3>
              <p className="text-gray-600">Tell us about your business or give us your website. Your AI learns everything it needs to know in seconds.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8"/>
              </div>
              <h3 className="text-xl font-bold mb-2">2. Get a Demo Call</h3>
              <p className="text-gray-600">We'll call you immediately so you can experience your new AI receptionist from a customer's perspective.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Rocket className="w-8 h-8"/>
              </div>
              <h3 className="text-xl font-bold mb-2">3. Go Live</h3>
              <p className="text-gray-600">Forward your business line to your new AI number. That's it! You're ready to answer every call, 24/7.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENEFITS --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Run Your Business, We’ll Handle the Calls</h2>
            <p className="text-lg text-gray-600">An AI receptionist does more than just answer the phone. It actively grows your business.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center"><CheckCircle className="w-6 h-6"/></div>
              <div>
                <h3 className="font-bold text-xl mb-2">Answer Every Call, 24/7</h3>
                <p className="text-gray-600">Stop sending customers to voicemail. Provide instant, professional support even when you're closed.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center"><Briefcase className="w-6 h-6"/></div>
              <div>
                <h3 className="font-bold text-xl mb-2">Book Appointments Automatically</h3>
                <p className="text-gray-600">Integrates with your calendar to schedule meetings, saving you hours of administrative work.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center"><UserCheck className="w-6 h-6"/></div>
              <div>
                <h3 className="font-bold text-xl mb-2">Qualify Leads Instantly</h3>
                <p className="text-gray-600">Your AI can ask qualifying questions and forward only the high-value leads directly to you.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center"><Building2 className="w-6 h-6"/></div>
              <div>
                <h3 className="font-bold text-xl mb-2">Acts Like a Real Employee</h3>
                <p className="text-gray-600">With natural conversation and custom knowledge, customers will think they're talking to a highly-trained staff member.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DEMO FORM --- */}
      <section id="demo-form" className="py-20">
        <div className="container mx-auto px-6 max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-4">Try It Now—It's Free</h2>
            <p className="text-lg text-gray-600 mb-10">Enter your info and get a live demo call in 60 seconds.</p>
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl border border-gray-200 space-y-6">
                <div>
                    <label className="block text-left font-semibold mb-2">Business Name*</label>
                    <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Company Inc."/>
                </div>
                <div>
                    <label className="block text-left font-semibold mb-2">Website (so the AI can learn about you)</label>
                    <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://yourwebsite.com"/>
                </div>
                <div>
                    <label className="block text-left font-semibold mb-2">Your Phone Number (for the demo call)*</label>
                    <input type="tel" value={testPhone} onChange={e => setTestPhone(e.target.value.replace(/[^\d]/g, ''))} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="555-123-4567"/>
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? <><Loader2 className="animate-spin w-5 h-5"/> Processing...</> : "Call Me With a Demo"}
                </button>
            </form>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
                <p className="text-lg text-gray-600">Choose a plan that works for you. Cancel anytime.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Self-Serve */}
                <div className="border border-gray-200 p-8 rounded-xl">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">Self-Serve</h3>
                        <p className="text-5xl font-bold mb-2">$99<span className="text-xl font-normal text-gray-500">/mo</span></p>
                        <p className="text-gray-600 mb-6">Set it up and manage it yourself.</p>
                        <a href="#" className="block w-full py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
                            Get Started
                        </a>
                    </div>
                    <ul className="mt-8 space-y-3 text-gray-600">
                        <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0"/><span>Easy 5-minute setup</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0"/><span>Full control via dashboard</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0"/><span>18 professional voices</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0"/><span>Email & chat support</span></li>
                    </ul>
                </div>
                {/* Full-Service */}
                <div className="border-2 border-blue-600 p-8 rounded-xl relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        MOST POPULAR
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">Full-Service</h3>
                        <p className="text-5xl font-bold mb-2">$500<span className="text-xl font-normal text-gray-500">/mo</span></p>
                        <p className="text-gray-600 mb-6">We handle everything for you.</p>
                        <a href="#" className="block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                            Get Started
                        </a>
                    </div>
                    <ul className="mt-8 space-y-3 text-gray-600">
                        <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0"/><span>White-glove setup by our team</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0"/><span>Custom voice cloning & scripts</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0"/><span>Weekly check-ins & reports</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0"/><span>Dedicated account manager</span></li>
                        <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0"/><span>Priority phone support</span></li>
                    </ul>
                </div>
            </div>

             <div className="mt-16 text-center max-w-3xl mx-auto">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                    <p className="text-xl font-bold text-green-800 mb-2">💯 7-Day Money-Back Guarantee</p>
                    <p className="text-gray-700">
                    Try it risk-free! If you're not completely satisfied within 7 days, we'll refund you. No questions asked.
                    </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-blue-900 mb-2">📞 Per-Call Usage Costs</h3>
                    <p className="text-gray-700">
                    Your monthly plan covers the platform. Per-call usage costs (~$0.10-0.15/min) are passed through at cost, with no markup.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-20">
          <div className="container mx-auto px-6 text-center max-w-3xl">
              <h2 className="text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
              <p className="text-lg text-gray-600 mb-8">
                  Stop letting missed calls turn into missed opportunities. Get started with your AI receptionist today.
              </p>
              <a href="#demo-form" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                  Try Free Demo
              </a>
          </div>
      </section>

    </div>
  );
}
