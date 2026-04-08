"use client";

import { useState } from 'react';
import { Phone, CheckCircle, Loader2, ArrowRight, Sparkles, Volume2, Building2, Clock, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const INDUSTRIES = {
  restaurant: {
    label: 'Restaurant',
    icon: '🍽️',
    sampleQuestions: [
      'What are your hours?',
      'Do you take reservations?',
      'Do you have a kids menu?',
    ],
    defaultScript: "Hi! Thanks for calling {business_name}. I'm your AI assistant. How can I help you today?",
  },
  medical: {
    label: 'Medical/Dental',
    icon: '🏥',
    sampleQuestions: [
      'What are your hours?',
      'Do you accept my insurance?',
      'How do I schedule an appointment?',
    ],
    defaultScript: "Thank you for calling {business_name}. I'm here to help you schedule appointments and answer questions. How may I assist you?",
  },
  retail: {
    label: 'Retail',
    icon: '🛍️',
    sampleQuestions: [
      'What are your hours?',
      'Where are you located?',
      'Do you have this in stock?',
    ],
    defaultScript: "Thanks for calling {business_name}! I'm your AI shopping assistant. How can I help you today?",
  },
  salon: {
    label: 'Salon/Spa',
    icon: '💇',
    sampleQuestions: [
      'What services do you offer?',
      'Do you take walk-ins?',
      'Can I book an appointment?',
    ],
    defaultScript: "Welcome to {business_name}! I'm here to help you book appointments and answer questions about our services. What can I do for you?",
  },
  other: {
    label: 'Other',
    icon: '🏢',
    sampleQuestions: [
      'What are your hours?',
      'Where are you located?',
      'How can I contact you?',
    ],
    defaultScript: "Hi! Thanks for calling {business_name}. I'm your AI assistant. How can I help you today?",
  },
};

const VOICES = [
  { id: 'jennifer', name: 'Jennifer', personality: 'Professional & Warm', gender: 'Female' },
  { id: 'michael', name: 'Michael', personality: 'Friendly & Approachable', gender: 'Male' },
  { id: 'sophia', name: 'Sophia', personality: 'Calm & Reassuring', gender: 'Female' },
  { id: 'david', name: 'David', personality: 'Confident & Clear', gender: 'Male' },
];

export default function AIReceptionistPage() {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('restaurant');
  const [phone, setPhone] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [hours, setHours] = useState('9 AM - 5 PM, Monday-Friday');
  const [customQuestions, setCustomQuestions] = useState<{q: string, a: string}[]>([]);
  const [voice, setVoice] = useState('jennifer');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [callInitiated, setCallInitiated] = useState(false);

  const selectedIndustry = INDUSTRIES[industry as keyof typeof INDUSTRIES];

  const handleStartDemo = () => {
    if (!businessName || !phone) return;
    const defaultScript = selectedIndustry.defaultScript.replace('{business_name}', businessName);
    setScript(defaultScript);
    setCustomQuestions(selectedIndustry.sampleQuestions.map(q => ({ q, a: `We're open ${hours}` })));
    setStep(2);
  };

  const handleCallMe = async () => {
    if (!testPhone) return;
    
    setLoading(true);
    try {
      // Send demo request
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: businessName,
          email: 'demo-request@tetongroup.ai',
          phone: testPhone,
          message: `AI RECEPTIONIST DEMO REQUEST
          
Business: ${businessName}
Industry: ${industry}
Phone: ${phone}
Website: ${website}
Hours: ${hours}
Voice: ${VOICES.find(v => v.id === voice)?.name}
Test Call To: ${testPhone}

Script: ${script}

Questions to answer:
${customQuestions.map(q => `Q: ${q.q}\nA: ${q.a}`).join('\n\n')}
`,
        }),
      });
      
      setCallInitiated(true);
    } catch (error) {
      console.error('Demo request error:', error);
      alert('Failed to initiate demo call. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <span className="font-bold text-xl">Teton Group</span>
            </Link>
            <Link href="/" className="text-gray-700 hover:text-blue-700 transition font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            
            {!callInitiated ? (
              <>
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 text-sm font-bold">
                    <Sparkles className="h-4 w-4" />
                    Test It FREE • See Results in Real-Time
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {step === 1 ? 'Try Your AI Receptionist' : 'Configure Your Demo'}
                  </h1>
                  
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    {step === 1 
                      ? "We'll call you in 60 seconds with a live AI trained on YOUR business info"
                      : "Customize your AI, then we'll call you to demo it live"
                    }
                  </p>
                </div>

                {/* Step 1: Quick Start */}
                {step === 1 && (
                  <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-base font-semibold mb-3">Your Business Name</label>
                          <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="e.g., Mountain View Dental"
                            className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-base font-semibold mb-3">Business Phone</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-base font-semibold mb-3">Industry</label>
                          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                            {Object.entries(INDUSTRIES).map(([key, ind]) => (
                              <button
                                key={key}
                                onClick={() => setIndustry(key)}
                                className={`p-4 rounded-xl border-2 transition text-center ${
                                  industry === key
                                    ? 'border-blue-600 bg-blue-50 shadow-md'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="text-3xl mb-2">{ind.icon}</div>
                                <div className="text-xs font-medium">{ind.label}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={handleStartDemo}
                          disabled={!businessName || !phone}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-xl text-xl font-bold hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                          <Phone className="h-6 w-6" />
                          Start Demo Setup
                          <ArrowRight className="h-6 w-6" />
                        </button>

                        <p className="text-center text-sm text-gray-500">
                          Takes 2 minutes • No credit card • Get called immediately
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Configuration */}
                {step === 2 && (
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Configuration */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      {/* Business Details */}
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Building2 className="h-6 w-6 text-blue-600" />
                          <h3 className="text-xl font-bold">Business Details</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Website (optional)</label>
                            <input
                              type="url"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              placeholder="https://yourbusiness.com"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Business Hours</label>
                            <input
                              type="text"
                              value={hours}
                              onChange={(e) => setHours(e.target.value)}
                              placeholder="9 AM - 5 PM, Monday-Friday"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Common Questions */}
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <MessageSquare className="h-6 w-6 text-blue-600" />
                          <h3 className="text-xl font-bold">Common Questions</h3>
                        </div>
                        
                        <div className="space-y-3">
                          {customQuestions.map((qa, i) => (
                            <div key={i} className="p-4 bg-gray-50 rounded-lg">
                              <div className="font-medium text-sm text-gray-700 mb-2">Q: {qa.q}</div>
                              <input
                                type="text"
                                value={qa.a}
                                onChange={(e) => {
                                  const updated = [...customQuestions];
                                  updated[i].a = e.target.value;
                                  setCustomQuestions(updated);
                                }}
                                placeholder="Your answer..."
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Voice Selection */}
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Volume2 className="h-6 w-6 text-blue-600" />
                          <h3 className="text-xl font-bold">Choose Voice</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-3">
                          {VOICES.map((v) => (
                            <button
                              key={v.id}
                              onClick={() => setVoice(v.id)}
                              className={`p-4 rounded-lg border-2 transition text-left ${
                                voice === v.id
                                  ? 'border-blue-600 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="font-bold">{v.name}</div>
                              <div className="text-xs text-gray-600">{v.personality}</div>
                              <div className="text-xs text-gray-500 mt-1">{v.gender}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Greeting Script */}
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold mb-4">Greeting Script</h3>
                        <textarea
                          value={script}
                          onChange={(e) => setScript(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                      </div>
                    </div>

                    {/* Right: Call Me Section */}
                    <div className="lg:col-span-1">
                      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-8 sticky top-24">
                        <div className="text-center mb-6">
                          <Phone className="h-16 w-16 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold mb-2">Ready to Test?</h3>
                          <p className="text-blue-100">
                            We'll call you in 60 seconds with your custom AI
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Call me at:</label>
                            <input
                              type="tel"
                              value={testPhone}
                              onChange={(e) => setTestPhone(e.target.value)}
                              placeholder="+1 (555) 987-6543"
                              className="w-full px-4 py-3 text-gray-900 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-white outline-none"
                            />
                            <p className="text-xs text-blue-100 mt-2">
                              We'll call this number to demonstrate your AI
                            </p>
                          </div>

                          <button
                            onClick={handleCallMe}
                            disabled={loading || !testPhone}
                            className="w-full bg-white text-blue-700 py-4 rounded-xl font-bold hover:shadow-2xl transition disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Scheduling Call...
                              </>
                            ) : (
                              <>
                                <Phone className="h-5 w-5" />
                                Call Me Now
                              </>
                            )}
                          </button>

                          <div className="pt-4 border-t border-white/20">
                            <div className="text-xs text-blue-100 space-y-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                <span>Trained on YOUR business info</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                <span>Live call in 60 seconds</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                <span>No credit card required</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Success State */
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white rounded-3xl shadow-2xl p-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  
                  <h2 className="text-3xl font-black mb-4">🎉 Demo Call Scheduled!</h2>
                  
                  <p className="text-xl text-gray-600 mb-6">
                    We'll call <strong>{testPhone}</strong> within the next 60 seconds.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-blue-900 mb-3">When we call:</h3>
                    <div className="text-left space-y-2 text-sm text-blue-800">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>Answer the phone and say "Hello"</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>Ask questions like "What are your hours?" or "Can I book an appointment?"</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>Experience how YOUR AI receptionist will sound</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <p className="text-sm text-yellow-900">
                      <strong>🎁 Love it?</strong> Get 6 months FREE ($1,782 value) when you book an AI Strategy Call to discover how else AI can help your business.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
