"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Calendar, Loader2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<'self-serve' | 'full-service' | null>(null);

  useEffect(() => {
    // Fetch customer plan from Stripe session
    const fetchPlan = async () => {
      if (sessionId) {
        try {
          const response = await fetch(`/api/stripe-session?session_id=${sessionId}`);
          const data = await response.json();
          setPlan(data.plan);
        } catch (error) {
          console.error('Failed to fetch plan:', error);
        }
      }
      setLoading(false);
    };

    fetchPlan();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-green-600" />
          <p className="text-xl text-gray-600">Processing your subscription...</p>
        </div>
      </div>
    );
  }

  // SELF-SERVE FLOW
  if (plan === 'self-serve') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>

              <h1 className="text-4xl font-black mb-4">
                Welcome! 🎉
              </h1>

              <p className="text-xl text-gray-700 mb-8">
                Your Self-Serve subscription is active!<br/>
                Let's get your AI receptionist set up.
              </p>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
                <p className="text-lg font-bold text-blue-900 mb-2">
                  ⚡ Quick Setup - Takes 5 Minutes
                </p>
                <p className="text-gray-700">
                  Answer a few questions and your AI will be ready to answer calls!
                </p>
              </div>

              <button
                onClick={() => router.push('/portal/setup')}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-xl hover:shadow-lg transition flex items-center justify-center gap-3 mb-6"
              >
                Set Up Your AI Now
                <ArrowRight className="w-6 h-6" />
              </button>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4">
                <p className="text-sm font-semibold text-green-700">
                  💯 7-Day Money-Back Guarantee • No questions asked
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // FULL-SERVICE FLOW
  if (plan === 'full-service') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            
            <div className="bg-white rounded-3xl shadow-2xl p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-6">
                  <CheckCircle className="w-16 h-16 text-purple-600" />
                </div>

                <h1 className="text-4xl font-black mb-4">
                  Welcome to Full-Service! 👔
                </h1>

                <p className="text-xl text-gray-700">
                  You've chosen our premium white-glove service.<br/>
                  We'll handle everything for you.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">📋 Your Onboarding Process</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-white rounded-lg p-4 border-2 border-purple-300">
                    <span className="text-3xl">1️⃣</span>
                    <div className="flex-1">
                      <p className="font-bold text-lg mb-1">Book Your Onboarding Call (Required)</p>
                      <p className="text-gray-600 mb-3">Meet with your account manager to discuss your needs</p>
                      <button
                        onClick={() => window.open('https://calendly.com/tetongroup', '_blank')}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                      >
                        <Calendar className="w-5 h-5" />
                        Schedule Now
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white rounded-lg p-4 opacity-60">
                    <span className="text-3xl">2️⃣</span>
                    <div>
                      <p className="font-bold text-lg mb-1">We Build Your AI (1-2 Weeks)</p>
                      <p className="text-gray-600">Our team handles all the setup and customization</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white rounded-lg p-4 opacity-60">
                    <span className="text-3xl">3️⃣</span>
                    <div>
                      <p className="font-bold text-lg mb-1">Training & Go Live</p>
                      <p className="text-gray-600">We'll train your team and launch your AI receptionist</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 mb-6">
                <p className="text-lg font-black text-green-700 mb-2">💯 7-Day Money-Back Guarantee</p>
                <p className="text-gray-700">
                  Not happy? Get a full refund within 7 days. No questions asked.
                </p>
              </div>

              <div className="text-center space-y-4">
                <Link 
                  href="/portal"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition"
                >
                  Go to Your Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <p className="text-sm text-gray-500">
                  Questions? Call us: <a href="tel:+18664978716" className="text-purple-600 hover:underline font-semibold">+1 (866) 497-8716</a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // FALLBACK (shouldn't happen)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-gray-600 mb-4">Unable to determine subscription plan</p>
        <Link href="/portal" className="text-blue-600 hover:underline font-semibold">
          Go to Dashboard →
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-green-600" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
