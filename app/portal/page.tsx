"use client";

import { useState, useEffect } from 'react';
import { Phone, Settings, Calendar, Clock, Edit2, Save, Mic, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface CustomerData {
  business_name: string;
  email: string;
  plan: string;
  phone_number: string | null;
  active: boolean;
}

interface ReceptionistSettings {
  greeting: string;
  tone: string;
  business_hours: string;
  services: string;
  pricing: string;
  voice_id: string;
  voice_name: string;
  call_forwarding_enabled: boolean;
  forward_to_number: string | null;
  calendar_connected: boolean;
}

export default function CustomerPortal() {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [settings, setSettings] = useState<ReceptionistSettings | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadCustomerData();
    loadReceptionistSettings();
  }, []);

  const loadCustomerData = async () => {
    // TODO: Get actual customer ID from auth
    const customerId = 'demo-customer';
    
    try {
      const response = await fetch(`/api/portal/customer?id=${customerId}`);
      const data = await response.json();
      if (data.success) {
        setCustomer(data.customer);
      }
    } catch (error) {
      console.error('Failed to load customer:', error);
    }
  };

  const loadReceptionistSettings = async () => {
    try {
      const response = await fetch('/api/portal/settings');
      const data = await response.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/portal/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setEditing(false);
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (!customer || !settings) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Teton Group AI
            </Link>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
              <span className="text-sm font-semibold text-purple-700">
                {customer.plan === 'full-service' ? '⭐ Full-Service' : '🔧 Self-Serve'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{customer.email}</span>
            <Link 
              href="/portal/settings"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-2">Welcome back, {customer.business_name}! 👋</h1>
            <p className="text-gray-600">Manage your AI receptionist and view performance</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab('receptionist')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'receptionist'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🤖 Edit Receptionist
            </button>
            <button
              onClick={() => setActiveTab('calls')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'calls'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📞 Call History
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'integrations'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🔗 Integrations
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Calls This Month</span>
                  </div>
                  <p className="text-3xl font-black">0</p>
                  <p className="text-sm text-gray-500 mt-1">No calls yet</p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-600">AI Active</span>
                  </div>
                  <p className="text-3xl font-black text-green-600">
                    {settings.call_forwarding_enabled ? 'ON' : 'OFF'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {settings.business_hours || '24/7'}
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Mic className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Voice</span>
                  </div>
                  <p className="text-2xl font-black">{settings.voice_name}</p>
                  <p className="text-sm text-gray-500 mt-1">Current voice</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">🚀 Quick Actions</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveTab('receptionist')}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl p-4 text-left transition"
                  >
                    <p className="font-semibold mb-1">✏️ Edit AI Greeting</p>
                    <p className="text-sm opacity-75">Change what your AI says</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('integrations')}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl p-4 text-left transition"
                  >
                    <p className="font-semibold mb-1">📅 Connect Calendar</p>
                    <p className="text-sm opacity-75">Allow appointment booking</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('calls')}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl p-4 text-left transition"
                  >
                    <p className="font-semibold mb-1">📞 View Call Logs</p>
                    <p className="text-sm opacity-75">Listen to recordings</p>
                  </button>
                  <button
                    className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl p-4 text-left transition"
                  >
                    <p className="font-semibold mb-1">⚙️ Business Hours</p>
                    <p className="text-sm opacity-75">Set when AI answers</p>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Edit Receptionist Tab */}
          {activeTab === 'receptionist' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Edit Your AI Receptionist</h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(false)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveSettings}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                
                {/* Greeting */}
                <div>
                  <label className="block text-lg font-bold mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    First Message / Greeting
                  </label>
                  <p className="text-sm text-gray-600 mb-3">What your AI says when it answers the phone</p>
                  <textarea
                    value={settings.greeting}
                    onChange={(e) => setSettings({...settings, greeting: e.target.value})}
                    disabled={!editing}
                    rows={4}
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                {/* Tone */}
                <div>
                  <label className="block text-lg font-bold mb-3">Tone & Personality</label>
                  <input
                    type="text"
                    value={settings.tone}
                    onChange={(e) => setSettings({...settings, tone: e.target.value})}
                    disabled={!editing}
                    placeholder="e.g., Friendly and professional"
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                {/* Services */}
                <div>
                  <label className="block text-lg font-bold mb-3">Services You Offer</label>
                  <textarea
                    value={settings.services}
                    onChange={(e) => setSettings({...settings, services: e.target.value})}
                    disabled={!editing}
                    rows={4}
                    placeholder="List your main services..."
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                {/* Pricing */}
                <div>
                  <label className="block text-lg font-bold mb-3">Pricing Information</label>
                  <textarea
                    value={settings.pricing}
                    onChange={(e) => setSettings({...settings, pricing: e.target.value})}
                    disabled={!editing}
                    rows={3}
                    placeholder="Your pricing structure..."
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

              </div>
            </div>
          )}

          {/* Call History Tab */}
          {activeTab === 'calls' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Call History</h2>
              <div className="text-center py-12">
                <Phone className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-xl font-semibold text-gray-600 mb-2">No calls yet</p>
                <p className="text-gray-500">Your call history will appear here once your AI receptionist starts answering calls</p>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              
              {/* Calendar Integration */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">📅 Calendar Integration</h3>
                    <p className="text-gray-600">Allow your AI to schedule appointments</p>
                  </div>
                  {settings.calendar_connected ? (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                      ✓ Connected
                    </span>
                  ) : (
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                      Connect Google Calendar
                    </button>
                  )}
                </div>
              </div>

              {/* Call Forwarding */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">☎️ Call Forwarding</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Enable Call Forwarding</p>
                      <p className="text-sm text-gray-600">Forward calls to your number when needed</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.call_forwarding_enabled}
                        onChange={(e) => setSettings({...settings, call_forwarding_enabled: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {settings.call_forwarding_enabled && (
                    <div>
                      <label className="block font-semibold mb-2">Forward to Number</label>
                      <input
                        type="tel"
                        value={settings.forward_to_number || ''}
                        onChange={(e) => setSettings({...settings, forward_to_number: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">⏰ Business Hours</h3>
                <div>
                  <label className="block font-semibold mb-2">When should the AI answer?</label>
                  <select
                    value={settings.business_hours}
                    onChange={(e) => setSettings({...settings, business_hours: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="24/7">24/7 - Always active</option>
                    <option value="business_hours">Business hours only (9 AM - 5 PM)</option>
                    <option value="after_hours">After hours only (5 PM - 9 AM)</option>
                    <option value="custom">Custom schedule</option>
                  </select>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
