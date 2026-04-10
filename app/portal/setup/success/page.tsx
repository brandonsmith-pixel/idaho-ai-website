"use client";

import Link from 'next/link';
import { CheckCircle, ArrowRight, Phone, BarChart } from 'lucide-react';

export default function SetupSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>

            <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Setup Complete! 🎉
            </h1>

            <p className="text-xl text-gray-700 mb-8">
              Your AI receptionist is live and ready to answer calls!
            </p>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8 text-left">
              <h2 className="text-2xl font-bold mb-6 text-center">✨ What's Next?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-bold text-lg">Forward Your Calls</p>
                    <p className="text-gray-600">Set up call forwarding so your AI answers your business line</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-bold text-lg">Test It Out</p>
                    <p className="text-gray-600">Call your AI number and see how it handles different scenarios</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-bold text-lg">Track Performance</p>
                    <p className="text-gray-600">View call history, recordings, and analytics in your dashboard</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Link
                href="/portal/forwarding-guide"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
              >
                <Phone className="w-5 h-5" />
                Forwarding Guide
              </Link>
              
              <Link
                href="/portal"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition"
              >
                <BarChart className="w-5 h-5" />
                View Dashboard
              </Link>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
              <p className="font-bold text-yellow-900 mb-2">💡 Pro Tip</p>
              <p className="text-gray-700 text-sm">
                You can edit your AI's greeting, voice, business info, and more anytime from your dashboard settings.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
