"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Processing your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>

            <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Welcome to Teton Group AI! 🎉
            </h1>

            <p className="text-xl text-gray-700 mb-8">
              Your subscription is now active. We're excited to work with you!
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 text-left">
              <h2 className="font-bold text-lg mb-4">What happens next?</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">1️⃣</span>
                  <div>
                    <p className="font-semibold">Check your email</p>
                    <p className="text-sm text-gray-600">You'll receive a confirmation with next steps</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">2️⃣</span>
                  <div>
                    <p className="font-semibold">Schedule your onboarding call</p>
                    <p className="text-sm text-gray-600">We'll send a calendar link to get started</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">3️⃣</span>
                  <div>
                    <p className="font-semibold">Go live in 2-4 weeks</p>
                    <p className="text-sm text-gray-600">Your AI receptionist will be answering calls!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 mb-6">
              <p className="text-xl font-black text-green-700 mb-2">💯 7-Day Money-Back Guarantee</p>
              <p className="text-gray-700 text-sm">
                Not happy? Get a full refund within 7 days. No questions asked. We're confident you'll love it!
              </p>
            </div>

            <div className="space-y-4">
              <Link 
                href="/portal"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition"
              >
                Go to Your Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>

              <p className="text-sm text-gray-500">
                Questions? Email us at <a href="mailto:support@tetongroup.ai" className="text-blue-600 hover:underline">support@tetongroup.ai</a>
              </p>
            </div>

            {sessionId && (
              <div className="mt-8 pt-8 border-t">
                <p className="text-xs text-gray-400">
                  Session ID: {sessionId}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
