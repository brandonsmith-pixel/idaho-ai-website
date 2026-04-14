"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Settings, BarChart3, LogOut, Loader2, CheckCircle } from 'lucide-react';

interface Customer {
  id: string;
  business_name: string;
  email: string;
  phone_number: string | null;
  plan: string;
  onboarding_status: string;
  active: boolean;
}

export default function PortalDashboard() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch customer data
    const fetchCustomer = async () => {
      try {
        const response = await fetch('/api/portal/customer');
        if (response.ok) {
          const data = await response.json();
          setCustomer(data.customer);
        } else {
          // Not logged in, redirect to login
          router.push('/login');
        }
      } catch (error) {
        console.error('Failed to fetch customer:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!customer) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {customer.business_name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{customer.email}</span>
            <button
              onClick={() => {
                // TODO: Implement logout
                router.push('/login');
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Phone Number Banner */}
        {customer.phone_number && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-700 mb-1">
                  📞 Your AI Receptionist Phone Number
                </p>
                <p className="text-3xl font-bold text-green-900">
                  {customer.phone_number}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Forward your business line to this number or share it directly with customers
                </p>
              </div>
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>
        )}

        {/* Status Banner - Self-Serve */}
        {customer.plan === 'self-serve' && customer.onboarding_status === 'phone_provisioned' && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-2">
              ⚡ Complete Your Setup
            </h2>
            <p className="text-gray-700 mb-4">
              Your phone number is ready! Now let's train your AI to answer calls perfectly.
            </p>
            <button
              onClick={() => router.push('/portal/train')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Train Your AI Now →
            </button>
          </div>
        )}

        {/* Status Banner - Full-Service */}
        {customer.plan === 'full-service' && (
          <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-purple-900 mb-2">
              👔 White-Glove Setup In Progress
            </h2>
            <p className="text-gray-700 mb-4">
              Our team is building your custom AI receptionist. We'll email you when it's ready!
            </p>
            {customer.phone_number && (
              <p className="text-sm text-gray-600">
                Your dedicated phone number has been provisioned and will be configured during setup.
              </p>
            )}
          </div>
        )}

        {/* Main Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/portal/train')}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition text-left border-2 border-transparent hover:border-blue-500"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Train AI</h3>
            <p className="text-gray-600">
              Customize responses, add FAQs, and configure your AI assistant
            </p>
          </button>

          <button
            onClick={() => router.push('/portal/calls')}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition text-left border-2 border-transparent hover:border-purple-500"
          >
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Call History</h3>
            <p className="text-gray-600">
              Review transcripts and recordings of all customer calls
            </p>
          </button>

          <button
            onClick={() => router.push('/portal/analytics')}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition text-left border-2 border-transparent hover:border-green-500"
          >
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-gray-600">
              Track call volume, response times, and customer satisfaction
            </p>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Quick Stats</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Calls</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Duration</p>
              <p className="text-3xl font-bold">0:00</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Success Rate</p>
              <p className="text-3xl font-bold">--%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Plan</p>
              <p className="text-xl font-bold capitalize">{customer.plan.replace('-', ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
