"use client";

import { useState } from 'react';
import { Phone, CheckCircle, Loader2, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import Link from 'next/link';

const INDUSTRIES = [
  { key: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { key: 'medical', label: 'Medical', icon: '🏥' },
  { key: 'retail', label: 'Retail', icon: '🛍️' },
  { key: 'salon', label: 'Salon', icon: '💇' },
  { key: 'other', label: 'Other', icon: '🏢' },
];

export default function AIReceptionistDemo() {
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [industry, setIndustry] = useState('restaurant');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phone || !testPhone) return;

    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: businessName,
          email: 'demo@tetongroup.ai',
          phone: testPhone,
          message: `🎯 AI RECEPTIONIST DEMO REQUEST

Business: ${businessName}
Business Phone: ${phone}
Industry: ${industry}
Call This Number: ${testPhone}

URGENT: Call ${testPhone} within 60 seconds to demo the AI receptionist for ${businessName}.
`,
        }),
      });
      setSuccess(true);
    } catch (error) {
      alert('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-black mb-4">📞 We'll Call You in 60 Seconds!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Get ready to answer at <strong className="text-blue-600">{testPhone}</strong>
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 text-left space-y-3">
            <h3 className="font-bold text-lg mb-3">When we call:</h3>
            <div className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <p>Answer and say "Hello"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <p>Ask questions like "What are your hours?" or "Can I book an appointment?"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <p>Experience YOUR AI receptionist in action!</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-600">
              <strong>Love it?</strong> Get 6 months FREE ($1,782 value) when you book an AI Strategy Call.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      {/* Simple Nav */}
      <nav className="py-4 px-6 bg-white/10 backdrop-blur-sm">
        <Link href="/" className="text-white hover:text-blue-100 font-semibold">
          ← Back to Teton Group
        </Link>
      </nav>

      {/* Hero Demo Form */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center text-white mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full mb-6 font-bold animate-pulse">
              <Sparkles className="w-5 h-5" />
              TEST IT FREE • WE'LL CALL YOU IN 60 SECONDS
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Try Your AI Receptionist
            </h1>
            <p className="text-2xl md:text-3xl opacity-90">
              We'll call you right now with an AI trained on YOUR business
            </p>
          </div>

          {/* Demo Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Business Name */}
              <div>
                <label className="block text-lg font-bold mb-3">
                  <Building2 className="inline w-5 h-5 mr-2" />
                  Your Business Name
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g., Mountain View Dental"
                  className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Business Phone */}
              <div>
                <label className="block text-lg font-bold mb-3">
                  <Phone className="inline w-5 h-5 mr-2" />
                  Your Business Phone
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-lg font-bold mb-3">Industry</label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind.key}
                      type="button"
                      onClick={() => setIndustry(ind.key)}
                      className={`p-4 rounded-xl border-2 transition text-center ${
                        industry === ind.key
                          ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <div className="text-4xl mb-2">{ind.icon}</div>
                      <div className="text-sm font-semibold">{ind.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Phone Number */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border-2 border-purple-300">
                <label className="block text-lg font-bold mb-3 text-purple-900">
                  📞 Where Should We Call You?
                </label>
                <input
                  type="tel"
                  required
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  placeholder="+1 (555) 987-6543"
                  className="w-full px-6 py-4 text-xl border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
                <p className="text-sm text-purple-700 mt-3">
                  We'll call this number in 60 seconds to demo your AI receptionist live
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !businessName || !phone || !testPhone}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 rounded-2xl text-2xl font-black hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-8 h-8 animate-spin" />
                    Scheduling Your Demo Call...
                  </>
                ) : (
                  <>
                    <Phone className="w-8 h-8" />
                    CALL ME NOW
                    <ArrowRight className="w-8 h-8" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                No credit card • No commitment • Just a free demo call
              </p>
            </form>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 text-white text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2">Instant Demo</h3>
              <p className="text-sm opacity-90">Call in 60 seconds</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="font-bold text-lg mb-2">6 Months FREE</h3>
              <p className="text-sm opacity-90">$1,782 value</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-bold text-lg mb-2">Your Business</h3>
              <p className="text-sm opacity-90">Trained on your info</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
