"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Phone, DollarSign, Eye, MousePointer } from 'lucide-react';
import Link from 'next/link';

interface Analytics {
  totalVisitors: number;
  startedForm: number;
  completedBusinessInfo: number;
  demoCalls: number;
  conversions: number;
  conversionRate: number;
  dropoffs: any[];
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      const data = await response.json();
      
      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Teton Group AI - Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin/analytics" className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold">
              Analytics
            </Link>
            <Link href="/admin/customers" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Customers
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-2">Marketing Analytics</h1>
            <p className="text-gray-600">Track visitor behavior and conversion funnel</p>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Conversion Funnel</h2>
            
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">1. Visitors</span>
                    <span className="text-2xl font-black">{analytics?.totalVisitors || 0}</span>
                  </div>
                  <div className="h-8 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">2. Started Form</span>
                    <span className="text-2xl font-black">{analytics?.startedForm || 0}</span>
                  </div>
                  <div className="h-8 bg-purple-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-600" 
                      style={{ 
                        width: `${analytics?.totalVisitors ? (analytics.startedForm / analytics.totalVisitors) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {analytics?.totalVisitors ? ((analytics.startedForm / analytics.totalVisitors) * 100).toFixed(1) : 0}% conversion
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">3. Completed Info</span>
                    <span className="text-2xl font-black">{analytics?.completedBusinessInfo || 0}</span>
                  </div>
                  <div className="h-8 bg-green-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-600" 
                      style={{ 
                        width: `${analytics?.totalVisitors ? (analytics.completedBusinessInfo / analytics.totalVisitors) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {analytics?.totalVisitors ? ((analytics.completedBusinessInfo / analytics.totalVisitors) * 100).toFixed(1) : 0}% conversion
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">4. Demo Calls</span>
                    <span className="text-2xl font-black">{analytics?.demoCalls || 0}</span>
                  </div>
                  <div className="h-8 bg-yellow-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-600" 
                      style={{ 
                        width: `${analytics?.totalVisitors ? (analytics.demoCalls / analytics.totalVisitors) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {analytics?.totalVisitors ? ((analytics.demoCalls / analytics.totalVisitors) * 100).toFixed(1) : 0}% conversion
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">5. Paid Subscriptions 💰</span>
                    <span className="text-2xl font-black text-green-600">{analytics?.conversions || 0}</span>
                  </div>
                  <div className="h-8 bg-emerald-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600" 
                      style={{ 
                        width: `${analytics?.totalVisitors ? (analytics.conversions / analytics.totalVisitors) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {analytics?.totalVisitors ? ((analytics.conversions / analytics.totalVisitors) * 100).toFixed(1) : 0}% conversion
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Total Visitors</span>
              </div>
              <p className="text-3xl font-black">{analytics?.totalVisitors || 0}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <MousePointer className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Started Form</span>
              </div>
              <p className="text-3xl font-black">{analytics?.startedForm || 0}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Demo Calls</span>
              </div>
              <p className="text-3xl font-black">{analytics?.demoCalls || 0}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-gray-600">Conversion Rate</span>
              </div>
              <p className="text-3xl font-black">
                {analytics?.conversionRate ? analytics.conversionRate.toFixed(1) : 0}%
              </p>
            </div>
          </div>

          {/* Google Ads ROI Calculator */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">📊 Google Ads ROI</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm opacity-75 mb-1">Cost Per Visitor (est.)</p>
                <p className="text-3xl font-black">$2.50</p>
              </div>
              <div>
                <p className="text-sm opacity-75 mb-1">Cost Per Conversion</p>
                <p className="text-3xl font-black">
                  ${analytics?.conversionRate ? (250 / analytics.conversionRate).toFixed(0) : '∞'}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-75 mb-1">Customer LTV (12mo)</p>
                <p className="text-3xl font-black">$1,188</p>
                <p className="text-xs opacity-75">$99/mo avg</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
