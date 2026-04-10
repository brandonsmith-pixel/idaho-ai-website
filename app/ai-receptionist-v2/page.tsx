"use client";

import { useState } from 'react';
import { Phone, CheckCircle, Loader2, ArrowRight, Sparkles, Building2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const ASSISTANT_TYPES = [
  {
    key: 'customer-support',
    label: 'Customer Support Specialist',
    description: 'Answers questions, resolves issues, provides product information',
    icon: '💬',
    prompts: {
      greeting: 'Hi! How can I help you today?',
      tone: 'Friendly and helpful',
      tasks: ['Answer product questions', 'Resolve complaints', 'Provide information'],
    }
  },
  {
    key: 'lead-qualification',
    label: 'Lead Qualification Specialist',
    description: 'Qualifies prospects, gathers requirements, schedules sales calls',
    icon: '🎯',
    prompts: {
      greeting: 'Hi! I\'d love to learn more about your needs.',
      tone: 'Professional and consultative',
      tasks: ['Qualify leads', 'Gather requirements', 'Schedule sales calls'],
    }
  },
  {
    key: 'appointment-scheduler',
    label: 'Appointment Scheduler',
    description: 'Books appointments, manages calendar, sends confirmations',
    icon: '📅',
    prompts: {
      greeting: 'Hi! I can help you schedule an appointment.',
      tone: 'Efficient and organized',
      tasks: ['Check availability', 'Book appointments', 'Send confirmations'],
    }
  },
  {
    key: 'info-collector',
    label: 'Information Collector',
    description: 'Gathers customer data, conducts surveys, collects feedback',
    icon: '📝',
    prompts: {
      greeting: 'Hi! I have a few quick questions for you.',
      tone: 'Polite and clear',
      tasks: ['Collect customer information', 'Conduct surveys', 'Gather feedback'],
    }
  },
  {
    key: 'care-coordinator',
    label: 'Care Coordinator',
    description: 'Coordinates patient care, schedules follow-ups, manages referrals',
    icon: '🏥',
    prompts: {
      greeting: 'Hi! I\'m here to help coordinate your care.',
      tone: 'Caring and professional',
      tasks: ['Schedule appointments', 'Coordinate follow-ups', 'Manage referrals'],
    }
  },
  {
    key: 'feedback-gatherer',
    label: 'Feedback Gatherer',
    description: 'Collects reviews, measures satisfaction, gathers testimonials',
    icon: '⭐',
    prompts: {
      greeting: 'Hi! I\'d love to hear about your experience.',
      tone: 'Warm and appreciative',
      tasks: ['Collect feedback', 'Gather reviews', 'Measure satisfaction'],
    }
  },
];

export default function AIReceptionistV2() {
  const [step, setStep] = useState(1);
  const [assistantType, setAssistantType] = useState('');
  const [customGreeting, setCustomGreeting] = useState('');
  const [customTone, setCustomTone] = useState('');
  const [customTasks, setCustomTasks] = useState<string[]>([]);
  const [businessName, setBusinessName] = useState('');

  const selectedAssistant = ASSISTANT_TYPES.find(a => a.key === assistantType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Teton Group
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full mb-6 font-bold shadow-lg">
              <Sparkles className="w-5 h-5" />
              {step === 1 ? 'CHOOSE YOUR ASSISTANT TYPE' : 'CUSTOMIZE YOUR AI'}
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {step === 1 ? 'What Should Your AI Do?' : 'Customize Your Assistant'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {step === 1 
                ? 'Select the type of assistant that best fits your business needs' 
                : 'Fine-tune how your AI assistant behaves and responds'}
            </p>
          </div>

          {/* Step 1: Assistant Type Selection */}
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {ASSISTANT_TYPES.map((type) => (
                <button
                  key={type.key}
                  type="button"
                  onClick={() => {
                    setAssistantType(type.key);
                    setCustomGreeting(type.prompts.greeting);
                    setCustomTone(type.prompts.tone);
                    setCustomTasks(type.prompts.tasks);
                    setStep(2);
                  }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white p-8 text-left hover:scale-105"
                >
                  <div className="text-6xl mb-4">{type.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{type.label}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    Choose this type
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Customize Assistant */}
          {step === 2 && selectedAssistant && (
            <div className="max-w-4xl mx-auto">
              
              {/* Selected Type Badge */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedAssistant.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedAssistant.label}</h3>
                    <p className="text-gray-600">{selectedAssistant.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  Change Type
                </button>
              </div>

              {/* Customization Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                
                <div>
                  <label className="block text-lg font-bold mb-3">Business Name *</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g., Acme Corp"
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    First Message / Greeting
                  </label>
                  <p className="text-sm text-gray-600 mb-3">What should your AI say when it first answers the phone?</p>
                  <textarea
                    value={customGreeting}
                    onChange={(e) => setCustomGreeting(e.target.value)}
                    rows={3}
                    placeholder="Hi! Thanks for calling..."
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold mb-3">Tone & Personality</label>
                  <p className="text-sm text-gray-600 mb-3">How should your AI sound?</p>
                  <input
                    type="text"
                    value={customTone}
                    onChange={(e) => setCustomTone(e.target.value)}
                    placeholder="e.g., Friendly and professional"
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold mb-3">Main Tasks</label>
                  <p className="text-sm text-gray-600 mb-3">What should your AI be able to do?</p>
                  <div className="space-y-3">
                    {customTasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <input
                          type="text"
                          value={task}
                          onChange={(e) => {
                            const updated = [...customTasks];
                            updated[index] = e.target.value;
                            setCustomTasks(updated);
                          }}
                          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setCustomTasks([...customTasks, ''])}
                      className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                    >
                      + Add another task
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => alert('Next: Continue to full demo flow!')}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center gap-2"
                  >
                    Continue to Business Info
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
