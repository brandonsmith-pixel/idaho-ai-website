"use client";

import { useState, useEffect } from 'react';
import { Phone, Building2, Mic, TestTube, Rocket, ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import VoiceSelector from '@/app/components/VoiceSelector';
import { Voice } from '@/app/types/voice';

export default function SetupWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Step 1: Phone number
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberId, setPhoneNumberId] = useState('');
  
  // Step 2: Business info
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [businessHours, setBusinessHours] = useState('24/7');
  const [forwardNumber, setForwardNumber] = useState('');
  
  // Step 3: Voice
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  
  // Step 4: Test
  const [testCallStatus, setTestCallStatus] = useState<'idle' | 'calling' | 'completed'>('idle');
  
  const totalSteps = 5;

  // Step 1: Provision phone number
  const provisionPhoneNumber = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/portal/setup/phone', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPhoneNumber(data.phoneNumber);
        setPhoneNumberId(data.phoneNumberId);
        setTimeout(() => setStep(2), 500);
      } else {
        alert('Failed to get phone number. Please try again.');
      }
    } catch (error) {
      console.error('Phone provisioning error:', error);
      alert('Error getting phone number. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Save business info
  const saveBusinessInfo = async () => {
    if (!businessName || !businessDescription) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/portal/setup/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          businessDescription,
          businessHours,
          forwardNumber,
        }),
      });

      if (response.ok) {
        setStep(3);
      } else {
        alert('Failed to save business info');
      }
    } catch (error) {
      console.error('Save business info error:', error);
      alert('Error saving info. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Save voice selection
  const saveVoice = async () => {
    if (!selectedVoice) {
      alert('Please select a voice');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/portal/setup/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voiceId: selectedVoice.voiceId,
          voiceName: selectedVoice.name,
          voiceProvider: selectedVoice.provider,
        }),
      });

      if (response.ok) {
        setStep(4);
      } else {
        alert('Failed to save voice');
      }
    } catch (error) {
      console.error('Save voice error:', error);
      alert('Error saving voice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Trigger test call
  const triggerTestCall = async () => {
    setTestCallStatus('calling');
    
    try {
      const response = await fetch('/api/portal/setup/test-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: forwardNumber,
        }),
      });

      if (response.ok) {
        setTestCallStatus('completed');
      } else {
        alert('Failed to trigger test call');
        setTestCallStatus('idle');
      }
    } catch (error) {
      console.error('Test call error:', error);
      alert('Error starting test call. Please try again.');
      setTestCallStatus('idle');
    }
  };

  // Step 5: Complete setup
  const completeSetup = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/portal/setup/complete', {
        method: 'POST',
      });

      if (response.ok) {
        window.location.href = '/portal/setup/success';
      }
    } catch (error) {
      console.error('Complete setup error:', error);
      alert('Error completing setup. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-600">
                Step {step} of {totalSteps}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                {Math.round((step / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            
            {/* STEP 1: Get Phone Number */}
            {step === 1 && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                  <Phone className="w-10 h-10 text-blue-600" />
                </div>
                
                <h1 className="text-4xl font-black mb-4">
                  🎉 Your AI Needs a Phone Number!
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  We'll give you a dedicated phone number that your AI receptionist will answer.
                </p>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
                  <p className="text-lg font-semibold text-blue-900 mb-2">
                    What you get:
                  </p>
                  <ul className="text-left space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Your own US phone number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>AI answers 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Forward complex calls to you</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={provisionPhoneNumber}
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-xl hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Getting Your Number...
                    </>
                  ) : (
                    <>
                      Get My Phone Number
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 mt-4">⏱️ Takes 30 seconds</p>
              </div>
            )}

            {/* STEP 2: Business Info */}
            {step === 2 && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full flex-shrink-0">
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-600 font-semibold">Phone number assigned</span>
                    </div>
                    <p className="text-2xl font-black">Your AI's Number: {phoneNumber}</p>
                  </div>
                </div>

                <h1 className="text-4xl font-black mb-4">
                  📝 Teach Your AI About Your Business
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                  Answer these quick questions so your AI knows how to help callers.
                </p>

                <div className="space-y-6">
                  
                  <div>
                    <label className="block font-bold text-lg mb-2">
                      1. Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g., Joe's Pizza"
                      className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-lg mb-2">
                      2. What does your business do? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      placeholder="e.g., We're a family-owned pizza restaurant serving authentic Italian pizza since 1995."
                      rows={4}
                      className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-lg mb-2">
                      3. Business Hours
                    </label>
                    <select
                      value={businessHours}
                      onChange={(e) => setBusinessHours(e.target.value)}
                      className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="24/7">24/7 - Always available</option>
                      <option value="Mon-Fri 9am-5pm">Mon-Fri 9am-5pm (Business hours)</option>
                      <option value="Mon-Fri 8am-6pm">Mon-Fri 8am-6pm</option>
                      <option value="Mon-Sat 10am-8pm">Mon-Sat 10am-8pm</option>
                      <option value="custom">Custom (will configure later)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-lg mb-2">
                      4. Your Phone Number (for forwarding complex calls)
                    </label>
                    <input
                      type="tel"
                      value={forwardNumber}
                      onChange={(e) => setForwardNumber(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <p className="text-sm text-gray-500 mt-2">Optional - The AI can handle most calls on its own</p>
                  </div>

                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold text-lg hover:bg-gray-300 transition flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={saveBusinessInfo}
                    disabled={loading || !businessName || !businessDescription}
                    className="flex-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Next Step
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Voice Selection */}
            {step === 3 && (
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                  <Mic className="w-8 h-8 text-purple-600" />
                </div>

                <h1 className="text-4xl font-black mb-4">
                  🎤 Pick Your AI's Voice
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                  Choose the voice that best represents your business.
                </p>

                <VoiceSelector
                  selectedVoice={selectedVoice}
                  onSelectVoice={setSelectedVoice}
                />

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold text-lg hover:bg-gray-300 transition flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={saveVoice}
                    disabled={loading || !selectedVoice}
                    className="flex-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Next Step
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Test Call */}
            {step === 4 && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <TestTube className="w-10 h-10 text-green-600" />
                </div>

                <h1 className="text-4xl font-black mb-4">
                  📞 Test Your AI Right Now!
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Your AI is configured and ready. Let's make sure it sounds perfect!
                </p>

                <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-8 mb-8">
                  <p className="text-lg font-semibold text-blue-900 mb-4">
                    Your AI's Phone Number:
                  </p>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-5xl font-black text-blue-600 hover:text-blue-700 transition"
                  >
                    {phoneNumber}
                  </a>
                  <p className="text-gray-600 mt-4">
                    Tap the number above to call from your phone
                  </p>
                </div>

                <div className="text-center mb-8">
                  <p className="text-gray-600 mb-4">Or have the AI call you instead:</p>
                  
                  {testCallStatus === 'idle' && (
                    <button
                      onClick={triggerTestCall}
                      disabled={!forwardNumber}
                      className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Call Me at {forwardNumber || 'your number'}
                    </button>
                  )}

                  {testCallStatus === 'calling' && (
                    <div className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-100 border-2 border-yellow-300 rounded-xl">
                      <Loader2 className="w-5 h-5 animate-spin text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Calling your phone...</span>
                    </div>
                  )}

                  {testCallStatus === 'completed' && (
                    <div className="inline-flex items-center gap-3 px-8 py-4 bg-green-100 border-2 border-green-300 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Test call sent!</span>
                    </div>
                  )}

                  {!forwardNumber && (
                    <p className="text-sm text-gray-500 mt-2">
                      (You didn't provide a phone number in step 2)
                    </p>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold text-lg hover:bg-gray-300 transition flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    className="flex-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    Sounds Good - I'm Ready!
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Go Live */}
            {step === 5 && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-bounce">
                  <Rocket className="w-10 h-10 text-green-600" />
                </div>

                <h1 className="text-5xl font-black mb-4">
                  🚀 You're Live!
                </h1>
                
                <p className="text-xl text-gray-700 mb-8">
                  Your AI receptionist is now answering calls at:
                </p>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-8 mb-8">
                  <p className="text-5xl font-black text-green-600 mb-4">
                    {phoneNumber}
                  </p>
                  <p className="text-gray-600">
                    This is your AI's dedicated phone number
                  </p>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8 text-left">
                  <p className="font-bold text-lg mb-3">📱 Next: Forward Your Business Calls</p>
                  <p className="text-gray-700 mb-4">
                    To have your AI answer your business line, forward calls to: <strong>{phoneNumber}</strong>
                  </p>
                  <a
                    href="/portal/forwarding-guide"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold"
                  >
                    Show Me How to Forward Calls
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <button
                  onClick={completeSetup}
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold text-xl hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-3 mb-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Completing Setup...
                    </>
                  ) : (
                    <>
                      Go to My Dashboard
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500">
                  You can edit everything later in your dashboard
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
