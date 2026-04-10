"use client";

import { useState, useEffect } from 'react';
import { Phone, CheckCircle, Loader2, ArrowRight, Sparkles, Building2, Globe, Clock, MessageSquare, Upload, Plus, X, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import VoiceSelector from '../components/VoiceSelector';
import { Voice } from '../types/voice';
import { trackPageView, trackFormProgress, trackDemoStart } from '@/lib/analytics';

const INDUSTRIES = [
  { 
    key: 'restaurant', 
    label: 'Restaurant / Cafe',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
  },
  { 
    key: 'medical', 
    label: 'Medical / Dental',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop',
  },
  { 
    key: 'retail', 
    label: 'Retail Store',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
  },
  { 
    key: 'salon', 
    label: 'Salon / Spa',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
  },
  { 
    key: 'professional', 
    label: 'Professional Services',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
  },
  { 
    key: 'other', 
    label: 'Other Business',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
  },
];

interface FAQ {
  question: string;
  answer: string;
}

export default function AIReceptionistDemo() {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [hours, setHours] = useState('');
  const [address, setAddress] = useState('');
  const [services, setServices] = useState('');
  const [pricing, setPricing] = useState('');
  const [bookingProcess, setBookingProcess] = useState('');
  const [faqs, setFAQs] = useState<FAQ[]>([{ question: '', answer: '' }]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [voiceCloneFile, setVoiceCloneFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  // Track page view on mount
  useEffect(() => {
    trackPageView('/ai-receptionist');
  }, []);

  // Track form progress whenever step or key fields change
  useEffect(() => {
    if (step > 1) {
      trackFormProgress(step, {
        industry,
        businessName,
        phone,
        website,
        voiceSelected: selectedVoice?.name,
      });
    }
  }, [step, industry, businessName, phone, website, selectedVoice]);

  const handleCheckout = async (plan: 'self-serve' | 'full-service') => {
    setCheckoutLoading(plan);
    
    try {
      const priceId = plan === 'self-serve' 
        ? 'price_1TKhlTLCkw1qIwMp5LHR6uDG'
        : 'price_1TKhlTLCkw1qIwMpIUHImoHB';

      const response = await fetch('/api/stripe-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          customerEmail: '', // Can collect email in a modal first
          customerName: '',
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
      setCheckoutLoading(null);
    }
  };

  const addFAQ = () => {
    setFAQs([...faqs, { question: '', answer: '' }]);
  };

  const removeFAQ = (index: number) => {
    setFAQs(faqs.filter((_, i) => i !== index));
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFAQs(updated);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleVoiceClone = (audioFile: File) => {
    setVoiceCloneFile(audioFile);
    // Create a custom voice object for the cloned voice
    const clonedVoice: Voice = {
      id: 'custom-clone',
      name: 'Your Voice (Cloned)',
      provider: '11labs',
      voiceId: 'cloned',
      gender: 'Custom',
      description: `Cloned from ${audioFile.name}`,
      previewUrl: URL.createObjectURL(audioFile),
    };
    setSelectedVoice(clonedVoice);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phone || !testPhone || !industry) return;

    // Track demo start
    trackDemoStart(testPhone, businessName);

    setLoading(true);
    try {
      const faqText = faqs
        .filter(f => f.question && f.answer)
        .map((f, i) => `Q${i + 1}: ${f.question}\nA${i + 1}: ${f.answer}`)
        .join('\n\n');

      const fileList = files.map(f => f.name).join(', ');

      // Format phone numbers with +1 prefix
      const formattedBusinessPhone = `+1${phone.replace(/[^\d]/g, '')}`;
      const formattedTestPhone = `+1${testPhone.replace(/[^\d]/g, '')}`;

      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: businessName,
          email: 'demo@tetongroup.ai',
          phone: formattedTestPhone,
          voiceProvider: selectedVoice?.provider || '11labs',
          voiceId: selectedVoice?.voiceId || 'EXAVITQu4vr4xnSDxMaL',
          voiceName: selectedVoice?.name || 'Sarah',
          voiceCloned: voiceCloneFile ? true : false,
          message: `🎯 AI RECEPTIONIST DEMO REQUEST - PRIORITY

BUSINESS INFO:
- Name: ${businessName}
- Phone: ${formattedBusinessPhone}
- Industry: ${industry}
- Website: ${website || 'Not provided'}
- Address: ${address || 'Not provided'}
- Hours: ${hours || 'Not provided'}

VOICE SELECTION:
- Voice: ${selectedVoice?.name || 'Sarah'}
- Provider: ${selectedVoice?.provider || '11labs'}
- Description: ${selectedVoice?.description || 'Professional AI voice'}
- Voice Cloning: ${voiceCloneFile ? `YES - Uploaded: ${voiceCloneFile.name}` : 'NO - Using preset voice'}

SERVICES & OFFERINGS:
${services || 'Not provided'}

PRICING INFO:
${pricing || 'Not provided'}

BOOKING/APPOINTMENT PROCESS:
${bookingProcess || 'Not provided'}

KNOWLEDGE BASE:
${faqText || 'No FAQs provided'}

ADDITIONAL CONTEXT:
${additionalInfo || 'None'}

FILES TO REVIEW:
${fileList || 'None uploaded'}

DEMO CALL:
Call ${formattedTestPhone} to demonstrate the AI receptionist with the ${selectedVoice?.name || 'Nova'} voice.
Use all the information above to train the AI for the demo.
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
          <h1 className="text-4xl font-black mb-4">📞 Your Demo is Ready!</h1>
          <p className="text-xl text-gray-600 mb-8">
            We'll call <strong className="text-blue-600">+1 {testPhone}</strong> shortly to demonstrate your custom AI receptionist
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 text-left space-y-3">
            <h3 className="font-bold text-lg mb-3">When we call:</h3>
            <div className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <p>Answer and say "Hello"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <p>Ask questions based on the info you provided</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <p>Experience exactly what YOUR customers will hear when they call</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Nav */}
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Teton Group
          </Link>
        </div>
      </nav>

      {/* Pricing Section */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Choose Your Plan
              </h2>
              <p className="text-xl text-gray-600">
                Get started in minutes or let us handle everything for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Self-Serve Plan */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 transition hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    SELF-SERVE
                  </div>
                  <div className="text-5xl font-black mb-2">$99<span className="text-2xl text-gray-600">/mo</span></div>
                  <p className="text-gray-600 font-medium">Train it yourself</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700"><strong>You train the AI</strong> - Full control over scripts & knowledge</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700"><strong>Easy-to-use dashboard</strong> - Update anytime, no code needed</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700"><strong>18 professional voices</strong> - Or clone your own</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700"><strong>Unlimited calls</strong> - No per-call fees</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700"><strong>Email & chat support</strong> - We're here to help</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 italic mb-6">
                  Perfect for businesses who want flexibility and enjoy learning new tools
                </p>

                <button
                  onClick={() => handleCheckout('self-serve')}
                  disabled={checkoutLoading === 'self-serve'}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {checkoutLoading === 'self-serve' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Get Started - $99/mo
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                  className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition"
                >
                  Try Demo First ↓
                </button>
              </div>

              {/* Full-Service Plan */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-4 border-purple-400 hover:border-purple-600 transition hover:shadow-2xl relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ MOST POPULAR
                </div>
                
                <div className="text-center mb-6 mt-4">
                  <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    FULL-SERVICE
                  </div>
                  <div className="text-5xl font-black mb-2">$500<span className="text-2xl text-gray-600">/mo</span></div>
                  <p className="text-gray-600 font-medium">We do everything</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700"><strong>We train your AI</strong> - Like hiring a new employee</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700"><strong>Custom voice cloning</strong> - Sounds exactly like you want</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700"><strong>Professional scripts</strong> - We write everything for you</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700"><strong>White-glove onboarding</strong> - Weekly check-ins & updates</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700"><strong>Priority support</strong> - Direct line to our team</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700"><strong>Unlimited revisions</strong> - Perfect it until you love it</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 italic mb-6">
                  Perfect for busy business owners who want a done-for-you solution
                </p>

                <button
                  onClick={() => handleCheckout('full-service')}
                  disabled={checkoutLoading === 'full-service'}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {checkoutLoading === 'full-service' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Get Started - $500/mo
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                  className="w-full py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition"
                >
                  Try Demo First ↓
                </button>
              </div>

            </div>

            <div className="mt-12 text-center space-y-6">
              <p className="text-gray-600 text-lg">
                🎁 <strong>Both plans include:</strong> 6 months FREE ($297-$1,782 value) when you book an AI Strategy Call
              </p>

              {/* Call Cost Disclosure */}
              <div className="max-w-3xl mx-auto bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3 text-blue-900">📞 Per-Call Usage Costs</h3>
                <div className="text-left space-y-2 text-gray-700">
                  <p className="flex items-start gap-2">
                    <span className="font-semibold min-w-[140px]">Cost per call:</span>
                    <span>$0.05-0.10 per minute (rounds up to nearest minute)</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold min-w-[140px]">Example:</span>
                    <span>A 3.5 minute call = 4 minutes × $0.10 = <strong>$0.40</strong></span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold min-w-[140px]">Who pays:</span>
                    <span><strong>These per-call costs are passed through to you</strong> at cost (no markup)</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-semibold min-w-[140px]">Billing:</span>
                    <span>Usage costs billed monthly based on actual call volume</span>
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-300">
                  <p className="text-sm text-gray-600 italic">
                    <strong>Note:</strong> Your monthly subscription ($99 or $500) covers the AI platform, training, and support. 
                    The per-minute costs above cover the actual phone service and voice AI processing infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full mb-6 font-bold shadow-lg">
              <Sparkles className="w-5 h-5" />
              TRAIN YOUR AI • GET A REAL DEMO CALL
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {step === 1 ? 'Choose Your Industry' : 
               step === 2 ? 'Tell Us About Your Business' : 
               step === 3 ? 'Add Your Knowledge Base' :
               'Choose Your AI Voice'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {step === 1 ? 'Choose your industry to customize your AI receptionist' : 
               step === 2 ? 'Tell your AI about your business - take your time, accuracy matters' :
               step === 3 ? 'Add knowledge so your AI can answer real customer questions' :
               'Preview and select the perfect voice for your AI receptionist'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Industry Selection */}
            {step === 1 && (
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.key}
                    type="button"
                    onClick={() => {
                      setIndustry(ind.key);
                      setStep(2);
                    }}
                    className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                      industry === ind.key ? 'ring-4 ring-blue-500' : ''
                    }`}
                  >
                    <div className="relative h-48">
                      <Image
                        src={ind.image}
                        alt={ind.label}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold">{ind.label}</h3>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Business Info */}
            {step === 2 && (
              <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-6">
                
                <div>
                  <label className="block text-lg font-bold mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g., Mountain View Dental"
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold mb-3 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    Business Phone *
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg text-gray-500">+1</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                      placeholder="(555) 123-4567"
                      className="w-full pl-12 pr-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">US phone number (we'll add +1 automatically)</p>
                </div>

                <div>
                  <label className="block text-lg font-bold mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Website (optional)
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourbusiness.com"
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">We'll scan your website to learn about your business</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-bold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Business Hours
                    </label>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      placeholder="Mon-Fri 9 AM - 5 PM"
                      className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-bold mb-3">
                      📍 Physical Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, City, State"
                      className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-bold mb-3">
                    🛠️ Services You Offer
                  </label>
                  <textarea
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    placeholder="List your main services or products. Example: Haircuts, coloring, styling, treatments"
                    rows={3}
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">Help your AI explain what you offer when customers ask</p>
                </div>

                <div>
                  <label className="block text-lg font-bold mb-3">
                    💰 Pricing Information (optional)
                  </label>
                  <textarea
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value)}
                    placeholder="Example: Haircuts start at $45, Color services $120+, Consultations are free"
                    rows={2}
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">Customers often ask about pricing - train your AI to handle this</p>
                </div>

                <div>
                  <label className="block text-lg font-bold mb-3">
                    📅 How to Book/Schedule (optional)
                  </label>
                  <textarea
                    value={bookingProcess}
                    onChange={(e) => setBookingProcess(e.target.value)}
                    placeholder="Example: Call to schedule, or book online at [website]/book. We require 24hr notice for cancellations."
                    rows={2}
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">Teach your AI how to help customers schedule appointments</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!businessName || !phone}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Knowledge Base */}
            {step === 3 && (
              <div className="max-w-4xl mx-auto space-y-6">
                
                {/* FAQs */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                      <div>
                        <h2 className="text-2xl font-bold">Common Questions & Answers</h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Add real questions customers ask - the more specific, the better the demo
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addFAQ}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Question
                    </button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      <strong>💡 Pro tip:</strong> Think about what customers actually ask you. "Do you accept insurance?" 
                      "Can I bring my kids?" "Do you offer payment plans?" The more realistic, the better your demo!
                    </p>
                  </div>

                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFAQ(i, 'question', e.target.value)}
                            placeholder="e.g., What are your hours?"
                            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          {faqs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFAQ(i)}
                              className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        <textarea
                          value={faq.answer}
                          onChange={(e) => updateFAQ(i, 'answer', e.target.value)}
                          placeholder="Your answer..."
                          rows={2}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* File Upload */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold">Upload Documents (optional)</h2>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <label className="cursor-pointer">
                      <span className="text-blue-600 font-semibold hover:text-blue-700">
                        Click to upload
                      </span>
                      {' or drag and drop'}
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PDFs, Word docs, or text files</p>
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, i) => (
                          <div key={i} className="flex items-center justify-center gap-2 text-sm text-gray-700">
                            <FileText className="w-4 h-4" />
                            {file.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold mb-4">Additional Information (optional)</h2>
                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Any other important details about your business, services, policies, etc..."
                    rows={4}
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

                {/* Navigation */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    Continue to Voice Selection
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Voice Selection */}
            {step === 4 && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <VoiceSelector 
                    selectedVoice={selectedVoice}
                    onSelectVoice={setSelectedVoice}
                    onVoiceClone={handleVoiceClone}
                  />
                </div>

                {/* Navigation */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    disabled={!selectedVoice}
                    className="flex-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Demo Call
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Final - Test Phone & Submit */}
            {step === 5 && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-3xl shadow-2xl p-8">
                  <h2 className="text-3xl font-black mb-4 text-center">Ready for Your FREE Demo Call?</h2>
                  <p className="text-center text-lg mb-6 opacity-90">
                    We'll call you with an AI receptionist using the <strong>{selectedVoice?.name}</strong> voice
                  </p>
                  
                  {/* Free Demo Notice */}
                  <div className="bg-white/10 border-2 border-white/30 rounded-xl p-4 mb-6">
                    <p className="text-center font-semibold mb-2">🎁 <strong>FREE 5-Minute Demo Call</strong></p>
                    <p className="text-sm text-center opacity-90">
                      Try your AI receptionist risk-free! Demo calls are limited to 5 minutes 
                      so you can experience the system at no cost. Subscribe to get unlimited calling.
                    </p>
                  </div>
                  
                  <div className="max-w-md mx-auto mb-6">
                    <label className="block text-lg font-bold mb-3">
                      📞 Call me at:
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-500">+1</span>
                      <input
                        type="tel"
                        required
                        value={testPhone}
                        onChange={(e) => setTestPhone(e.target.value.replace(/[^\d]/g, ''))}
                        placeholder="(555) 987-6543"
                        className="w-full pl-12 pr-5 py-4 text-xl text-gray-900 border-2 border-white/30 rounded-xl focus:ring-4 focus:ring-white outline-none"
                      />
                    </div>
                    <p className="text-sm opacity-75 mt-2">US number only - we'll add +1 automatically</p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="flex-1 px-6 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !testPhone}
                      className="flex-2 px-8 py-4 bg-white text-purple-700 rounded-xl text-xl font-black hover:shadow-2xl transition disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Scheduling...
                        </>
                      ) : (
                        <>
                          <Phone className="w-6 h-6" />
                          CALL ME NOW
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
