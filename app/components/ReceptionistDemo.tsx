"use client";

import { useState } from 'react';
import { Phone, Building2, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const INDUSTRIES = [
  { key: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { key: 'medical', label: 'Medical', icon: '🏥' },
  { key: 'retail', label: 'Retail', icon: '🛍️' },
  { key: 'salon', label: 'Salon/Spa', icon: '💇' },
  { key: 'other', label: 'Other', icon: '🏢' },
];

const VOICES = [
  { id: 'jennifer', name: 'Jennifer', personality: 'Professional & Warm' },
  { id: 'michael', name: 'Michael', personality: 'Friendly & Clear' },
  { id: 'sophia', name: 'Sophia', personality: 'Calm & Reassuring' },
];

// Google Sheets Web App URL - YOU NEED TO SET THIS UP
const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || '';

export default function ReceptionistDemo() {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [voice, setVoice] = useState('jennifer');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!businessName || !phone || !industry) return;
    
    setLoading(true);
    setError('');
    
    try {
      const timestamp = new Date().toISOString();
      const data = {
        timestamp,
        businessName,
        phone,
        email,
        industry,
        voice,
        source: 'tetongroup_homepage',
        url: typeof window !== 'undefined' ? window.location.href : '',
      };

      // Try Google Sheets first
      if (GOOGLE_SHEETS_URL) {
        const response = await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        console.log('Sent to Google Sheets');
      }

      // Also send to your email via contact form API
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: businessName,
          email: email || 'no-email@provided.com',
          phone,
          message: `AI Receptionist Demo Submission
          
Business: ${businessName}
Industry: ${industry}
Voice Preference: ${VOICES.find(v => v.id === voice)?.name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Source: Homepage Interactive Demo
Timestamp: ${timestamp}`,
        }),
      });

      setSuccess(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2">🎉 You're All Set!</h3>
        <p className="text-gray-600 mb-6">
          We'll contact you within 24 hours to set up your AI receptionist and discuss your free 6-month trial.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setStep(1);
            setBusinessName('');
            setPhone('');
            setEmail('');
            setIndustry('');
          }}
          className="text-blue-700 font-semibold hover:text-blue-800"
        >
          Try Another Demo →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span className="font-medium">Step {step} of 3</span>
          <span>{Math.round((step / 3) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Step 1: Business Info */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold">Tell Us About Your Business</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g., Joe's Pizza"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry *
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.key}
                  type="button"
                  onClick={() => setIndustry(ind.key)}
                  className={`p-3 rounded-lg border-2 transition text-center ${
                    industry === ind.key
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{ind.icon}</div>
                  <div className="text-xs font-medium">{ind.label}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={!businessName || !phone || !industry}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Voice Selection */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold">Choose Your AI Voice</h3>
          </div>

          <div className="space-y-3">
            {VOICES.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVoice(v.id)}
                className={`w-full p-4 rounded-lg border-2 transition text-left ${
                  voice === v.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold">{v.name}</div>
                <div className="text-sm text-gray-600">{v.personality}</div>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold">Review & Get Started</h3>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Business:</span>
              <span className="font-semibold">{businessName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-semibold">{phone}</span>
            </div>
            {email && (
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{email}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Industry:</span>
              <span className="font-semibold capitalize">{industry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Voice:</span>
              <span className="font-semibold">{VOICES.find(v => v.id === voice)?.name}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="font-bold text-blue-900 mb-2">🎁 Special Offer</div>
            <p className="text-sm text-blue-800">
              Get 6 months FREE ($1,782 value) when we discuss how custom AI can transform your business.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4" />
                  Get Started Free
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
