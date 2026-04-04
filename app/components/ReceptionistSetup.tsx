import { useState, useEffect } from 'react'
import {
  Building2,
  Clock,
  Phone,
  Volume2,
  Sparkles,
  CheckCircle2,
  Loader2,
  Plus,
  X,
  ArrowRight,
  ArrowLeft,
  Rocket,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { trackReceptionistSetup, trackDemoRequest } from '../lib/analytics'

interface Props {
  onBack: () => void
}

const INDUSTRY_TEMPLATES = {
  restaurant: {
    label: 'Restaurant / Cafe',
    icon: '🍽️',
    defaultHours: { open: '11:00', close: '21:00' },
    sampleQuestions: [
      { q: 'What are your hours?', a: "We're open [business hours]" },
      { q: 'Do you take reservations?', a: 'Yes! Call us or book online at [website]' },
      { q: 'Do you have a kids menu?', a: 'Yes, we have a great kids menu with healthy options' },
    ],
  },
  medical: {
    label: 'Medical / Dental Office',
    icon: '🏥',
    defaultHours: { open: '08:00', close: '17:00' },
    sampleQuestions: [
      { q: 'What are your hours?', a: "We're open [business hours]" },
      {
        q: 'Do you accept my insurance?',
        a: 'We accept most major insurances. Please call with your provider info.',
      },
      { q: 'How do I schedule an appointment?', a: 'Call us or book online at [website]' },
    ],
  },
  retail: {
    label: 'Retail Store',
    icon: '🛍️',
    defaultHours: { open: '10:00', close: '19:00' },
    sampleQuestions: [
      { q: 'What are your hours?', a: "We're open [business hours]" },
      { q: 'Where are you located?', a: '[address]' },
      { q: 'Do you have online shopping?', a: 'Yes! Visit [website]' },
    ],
  },
  salon: {
    label: 'Salon / Spa',
    icon: '💇',
    defaultHours: { open: '09:00', close: '18:00' },
    sampleQuestions: [
      { q: 'What are your hours?', a: "We're open [business hours]" },
      { q: 'Do you take walk-ins?', a: 'We prefer appointments but accept walk-ins when available' },
      { q: 'What services do you offer?', a: '[services]' },
    ],
  },
  other: {
    label: 'Other Business',
    icon: '🏢',
    defaultHours: { open: '09:00', close: '17:00' },
    sampleQuestions: [
      { q: 'What are your hours?', a: "We're open [business hours]" },
      { q: 'Where are you located?', a: '[address]' },
      { q: 'How can I contact you?', a: 'Call us at [phone] or visit [website]' },
    ],
  },
}

const VOICE_OPTIONS = [
  { id: 'jennifer', name: 'Jennifer', personality: 'Professional & Warm', gender: 'Female' },
  { id: 'michael', name: 'Michael', personality: 'Friendly & Approachable', gender: 'Male' },
  { id: 'sophia', name: 'Sophia', personality: 'Calm & Reassuring', gender: 'Female' },
  { id: 'david', name: 'David', personality: 'Confident & Clear', gender: 'Male' },
]

interface FAQ {
  question: string
  answer: string
}

export default function ReceptionistSetup({ onBack }: Props) {
  const [step, setStep] = useState(1)
  const [businessName, setBusinessName] = useState('')
  const [industry, setIndustry] = useState<keyof typeof INDUSTRY_TEMPLATES>('other')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [openTime, setOpenTime] = useState('09:00')
  const [closeTime, setCloseTime] = useState('17:00')
  const [openDays, setOpenDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [selectedVoice, setSelectedVoice] = useState('jennifer')
  const [greeting, setGreeting] = useState('')
  const [testNumber, setTestNumber] = useState('')
  const [testing, setTesting] = useState(false)
  const [deploying, setDeploying] = useState(false)

  useEffect(() => {
    const template = INDUSTRY_TEMPLATES[industry]
    if (template && faqs.length === 0) {
      setFaqs(template.sampleQuestions)
      setOpenTime(template.defaultHours.open)
      setCloseTime(template.defaultHours.close)
    }
  }, [industry])

  useEffect(() => {
    if (businessName) {
      const voiceData = VOICE_OPTIONS.find((v) => v.id === selectedVoice)
      setGreeting(
        `Hi! Thanks for calling ${businessName}. I'm ${voiceData?.name}, your AI assistant. How can I help you today?`
      )
    }
  }, [selectedVoice, businessName])

  const addFAQ = () => setFaqs([...faqs, { question: '', answer: '' }])
  const removeFAQ = (index: number) => setFaqs(faqs.filter((_, i) => i !== index))
  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs]
    updated[index][field] = value
    setFaqs(updated)
  }

  const handleTestCall = async () => {
    if (!testNumber.trim()) {
      alert('Please enter your phone number to test')
      return
    }
    setTesting(true)
    try {
      // Track demo request
      trackDemoRequest(testNumber)
      
      // Save as lead
      await supabase.from('form_submissions').insert({
        form_id: null,
        tenant_id: null, // Public lead, no tenant yet
        data_json: {
          type: 'demo_request',
          business_name: businessName,
          phone: testNumber,
          industry,
          request_type: 'test_call',
        },
        source_url: window.location.href,
      })
      
      alert(`Test call request received! We'll call ${testNumber} shortly to demo your AI receptionist.`)
    } catch (error: any) {
      console.error('Test call error:', error)
      alert(error.message || 'Failed to submit test call request')
    } finally {
      setTesting(false)
    }
  }

  const handleDeploy = async () => {
    if (!businessName || !phone) {
      alert('Please fill in your business name and phone number')
      return
    }
    setDeploying(true)
    try {
      // Track conversion
      trackReceptionistSetup(businessName)
      
      // Save complete receptionist configuration as a lead
      const { data, error } = await supabase.from('form_submissions').insert({
        form_id: null,
        tenant_id: null, // Public lead, no tenant yet
        data_json: {
          type: 'receptionist_setup',
          business_name: businessName,
          industry,
          phone,
          address,
          website,
          hours: {
            open: openTime,
            close: closeTime,
            days: openDays,
          },
          faqs,
          voice: selectedVoice,
          greeting,
        },
        source_url: window.location.href,
      }).select()
      
      if (error) throw error
      
      console.log('Receptionist config saved:', data)
      setStep(5)
    } catch (error: any) {
      console.error('Deploy error:', error)
      alert(error.message || 'Failed to save configuration')
    } finally {
      setDeploying(false)
    }
  }

  const progress = (step / 4) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Set Up Your AI Receptionist</h1>
            <p className="text-lg text-gray-600">5 minutes to never miss a call again ⚡</p>
          </div>
        </div>

        {/* Progress bar */}
        {step < 5 && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">Step {step} of 4</span>
              <span className="text-gray-600">{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Business Info */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold">Tell us about your business</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium mb-2">What's your business name?</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g., Joe's Pizza"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-base font-medium mb-2">What type of business?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(INDUSTRY_TEMPLATES).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => setIndustry(key as keyof typeof INDUSTRY_TEMPLATES)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        industry === key
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{template.icon}</div>
                      <div className="font-medium text-sm">{template.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-2">
                    Website <span className="text-sm text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="www.example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, City, State 12345"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!businessName || !phone}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Hours & FAQs */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold">When are you open?</h2>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium mb-2">Opens at</label>
                  <input
                    type="time"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-2">Closes at</label>
                  <input
                    type="time"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-medium mb-2">Open days</label>
                <div className="flex flex-wrap gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                    (day) => (
                      <button
                        key={day}
                        onClick={() => {
                          if (openDays.includes(day)) {
                            setOpenDays(openDays.filter((d) => d !== day))
                          } else {
                            setOpenDays([...openDays, day])
                          }
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          openDays.includes(day)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Common Questions</h3>
                    <p className="text-sm text-gray-600">
                      Teach your AI how to answer frequently asked questions
                    </p>
                  </div>
                  <button
                    onClick={addFAQ}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                          placeholder="What might customers ask?"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        <button
                          onClick={() => removeFAQ(index)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                        placeholder="How should the AI respond?"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  Continue <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Voice Selection */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Volume2 className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold">Choose your AI's voice</h2>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {VOICE_OPTIONS.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedVoice === voice.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold">{voice.name}</h3>
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mt-1">
                          {voice.gender}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{voice.personality}</p>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-base font-medium mb-2">Greeting Message</label>
                <textarea
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder="What should your AI say when answering?"
                  rows={3}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Keep it short and friendly (2-3 sentences max)
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  Continue <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Test & Deploy */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold">Ready to deploy!</h2>
            </div>

            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Your AI is configured!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Click deploy to make your AI receptionist live. It will start answering calls immediately!
                </p>
              </div>

              <div className="bg-gray-50 border rounded-xl p-6 space-y-3">
                <h4 className="font-semibold mb-4">What happens next:</h4>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Your AI goes live immediately</p>
                    <p className="text-sm text-gray-600">Starts answering calls 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Never miss a call again</p>
                    <p className="text-sm text-gray-600">Even after hours and on weekends</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Edit anytime</p>
                    <p className="text-sm text-gray-600">You can update settings whenever you want</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleDeploy}
                  disabled={deploying}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {deploying ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Rocket className="h-5 w-5" />
                      Deploy Now!
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-4">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-2">🎉 You're All Set!</h2>
                <p className="text-lg text-gray-600">Your AI receptionist is now live and answering calls</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Your AI Phone Number</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">{phone}</div>
                <p className="text-sm text-gray-600">
                  Calls to this number are now handled by {VOICE_OPTIONS.find((v) => v.id === selectedVoice)?.name},
                  your AI assistant
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📞 Test Anytime</h4>
                  <p className="text-sm text-gray-600">Call your number right now to hear it in action</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⚙️ Make Changes</h4>
                  <p className="text-sm text-gray-600">Update hours, questions, or voice whenever you want</p>
                </div>
              </div>

              <button
                onClick={onBack}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
