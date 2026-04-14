"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';

export default function TrainAIPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [training, setTraining] = useState({
    businessHours: '',
    services: '',
    faqs: '',
    bookingUrl: '',
    specialInstructions: '',
  });

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);

    try {
      const response = await fetch('/api/portal/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('Failed to save changes');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/portal')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Train Your AI Receptionist</h1>
          <p className="text-lg text-gray-600">
            The more information you provide, the better your AI will respond to customers
          </p>
        </div>

        <div className="space-y-6">
          {/* Business Hours */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">📅 Business Hours</h2>
            <p className="text-gray-600 mb-4">
              When is your business open? Your AI will let callers know your availability.
            </p>
            <textarea
              value={training.businessHours}
              onChange={(e) => setTraining({ ...training, businessHours: e.target.value })}
              placeholder="Monday - Friday: 9am - 5pm&#10;Saturday: 10am - 2pm&#10;Sunday: Closed"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              rows={4}
            />
          </div>

          {/* Services */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">🛠️ Services Offered</h2>
            <p className="text-gray-600 mb-4">
              What services do you provide? This helps your AI answer customer questions.
            </p>
            <textarea
              value={training.services}
              onChange={(e) => setTraining({ ...training, services: e.target.value })}
              placeholder="- Consultation services&#10;- New client intake&#10;- Appointment scheduling&#10;- General inquiries"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              rows={6}
            />
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">❓ Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-4">
              Add common questions and answers. Format: Question? → Answer
            </p>
            <textarea
              value={training.faqs}
              onChange={(e) => setTraining({ ...training, faqs: e.target.value })}
              placeholder="How much do your services cost? → Our consultation starts at $150&#10;&#10;Do you accept insurance? → Yes, we accept most major insurance plans&#10;&#10;What's your cancellation policy? → We require 24 hours notice for cancellations"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              rows={8}
            />
          </div>

          {/* Booking URL */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">🔗 Online Booking (Optional)</h2>
            <p className="text-gray-600 mb-4">
              If you have an online booking system, your AI can direct customers to it
            </p>
            <input
              type="url"
              value={training.bookingUrl}
              onChange={(e) => setTraining({ ...training, bookingUrl: e.target.value })}
              placeholder="https://calendly.com/yourcompany"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Special Instructions */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">🎯 Special Instructions</h2>
            <p className="text-gray-600 mb-4">
              Any specific instructions for how your AI should handle calls?
            </p>
            <textarea
              value={training.specialInstructions}
              onChange={(e) => setTraining({ ...training, specialInstructions: e.target.value })}
              placeholder="- Always ask for caller's email&#10;- Prioritize emergency calls&#10;- Transfer existing clients to ext. 123"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              rows={6}
            />
          </div>

          {/* Save Button (Bottom) */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-xl hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Saving & Training AI...
              </>
            ) : saved ? (
              <>
                <CheckCircle className="w-6 h-6" />
                Changes Saved!
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                Save & Update AI
              </>
            )}
          </button>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
            <p className="text-blue-900 font-semibold">
              💡 Pro Tip: Your AI learns instantly! Changes take effect immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
