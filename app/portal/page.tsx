"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Phone, Settings, BarChart3, LogOut, Loader2, CheckCircle, Calendar, Clock, Link as LinkIcon, AlertCircle } from 'lucide-react';

interface Customer {
  id: string;
  business_name: string;
  email: string;
  phone_number: string | null;
  plan: string;
  onboarding_status: string;
  active: boolean;
}

interface CalendarConnection {
  id: string;
  integration_type: 'nylas' | 'calcom';
  provider?: string;
  calendar_name: string;
  nylas_email?: string;
  calcom_username?: string;
  is_active: boolean;
  connected_at: string;
}

export default function PortalDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [calendarConnections, setCalendarConnections] = useState<CalendarConnection[]>([]);
  const [connectingCalendar, setConnectingCalendar] = useState(false);
  const [calcomApiKey, setCalcomApiKey] = useState('');
  const [calcomUsername, setCalcomUsername] = useState('');

  useEffect(() => {
    // Check if URL has tab parameter
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }

    // Check for calendar connection success
    const calendarConnected = searchParams.get('calendar_connected');
    if (calendarConnected === 'true') {
      alert('Calendar connected successfully!');
      fetchCalendarConnections();
    }

    const calendarError = searchParams.get('calendar_error');
    if (calendarError) {
      alert(`Calendar connection failed: ${calendarError}`);
    }

    fetchCustomer();
    fetchCalendarConnections();
  }, [searchParams]);

  const fetchCustomer = async () => {
    try {
      const response = await fetch('/api/portal/customer');
      if (response.ok) {
        const data = await response.json();
        setCustomer(data.customer);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch customer:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchCalendarConnections = async () => {
    try {
      const response = await fetch('/api/calendar/connections');
      if (response.ok) {
        const data = await response.json();
        setCalendarConnections(data.connections || []);
      }
    } catch (error) {
      console.error('Failed to fetch calendar connections:', error);
    }
  };

  const connectGoogleCalendar = async () => {
    setConnectingCalendar(true);
    try {
      const response = await fetch('/api/calendar/connect/nylas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'google' }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.authUrl;
      } else {
        alert('Failed to initiate Google Calendar connection');
      }
    } catch (error) {
      alert('Error connecting to Google Calendar');
    } finally {
      setConnectingCalendar(false);
    }
  };

  const connectOutlookCalendar = async () => {
    setConnectingCalendar(true);
    try {
      const response = await fetch('/api/calendar/connect/nylas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'microsoft' }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.authUrl;
      } else {
        alert('Failed to initiate Outlook connection');
      }
    } catch (error) {
      alert('Error connecting to Outlook');
    } finally {
      setConnectingCalendar(false);
    }
  };

  const connectCalCom = async () => {
    if (!calcomApiKey || !calcomUsername) {
      alert('Please enter your Cal.com API key and username');
      return;
    }

    setConnectingCalendar(true);
    try {
      const response = await fetch('/api/calendar/connect/calcom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: calcomApiKey,
          username: calcomUsername,
        }),
      });

      if (response.ok) {
        alert('Cal.com connected successfully!');
        fetchCalendarConnections();
        setCalcomApiKey('');
        setCalcomUsername('');
      } else {
        const error = await response.json();
        alert(`Failed to connect Cal.com: ${error.error}`);
      }
    } catch (error) {
      alert('Error connecting to Cal.com');
    } finally {
      setConnectingCalendar(false);
    }
  };

  const disconnectCalendar = async (connectionId: string) => {
    if (!confirm('Are you sure you want to disconnect this calendar?')) {
      return;
    }

    try {
      const response = await fetch(`/api/calendar/disconnect?id=${connectionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Calendar disconnected');
        fetchCalendarConnections();
      } else {
        alert('Failed to disconnect calendar');
      }
    } catch (error) {
      alert('Error disconnecting calendar');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{customer.business_name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{customer.email}</span>
            <button
              onClick={() => router.push('/login')}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium transition ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Overview
              </div>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`py-4 px-2 border-b-2 font-medium transition ${
                activeTab === 'calendar'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Calendar
              </div>
            </button>
            <button
              onClick={() => setActiveTab('train')}
              className={`py-4 px-2 border-b-2 font-medium transition ${
                activeTab === 'train'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Train AI
              </div>
            </button>
            <button
              onClick={() => setActiveTab('calls')}
              className={`py-4 px-2 border-b-2 font-medium transition ${
                activeTab === 'calls'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call History
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
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

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <button
                onClick={() => setActiveTab('train')}
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
                onClick={() => setActiveTab('calendar')}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition text-left border-2 border-transparent hover:border-green-500"
              >
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Calendar</h3>
                <p className="text-gray-600">
                  Connect your calendar so AI can book appointments automatically
                </p>
              </button>

              <button
                onClick={() => setActiveTab('calls')}
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
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
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
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-2">Calendar Integration</h2>
            <p className="text-gray-600 mb-8">
              Connect your calendar so your AI receptionist can check availability and book appointments automatically.
            </p>

            {/* Connected Calendars */}
            {calendarConnections.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Connected Calendars</h3>
                <div className="space-y-4">
                  {calendarConnections.map((conn) => (
                    <div key={conn.id} className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="font-bold">{conn.calendar_name}</p>
                          <p className="text-sm text-gray-600">
                            {conn.integration_type === 'nylas' && (
                              <>
                                {conn.provider === 'google' ? '🟢 Google Calendar' : '🔵 Outlook'}
                                {' · '}{conn.nylas_email}
                              </>
                            )}
                            {conn.integration_type === 'calcom' && (
                              <>📅 Cal.com · {conn.calcom_username}</>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Connected {new Date(conn.connected_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => disconnectCalendar(conn.id)}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        Disconnect
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connection Options */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold mb-6">Connect a Calendar</h3>
              
              {/* Nylas Options (Google & Outlook) */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4 text-gray-700">Option 1: Connect via OAuth</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={connectGoogleCalendar}
                    disabled={connectingCalendar}
                    className="flex items-center justify-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition disabled:opacity-50"
                  >
                    {connectingCalendar ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <span className="text-2xl">🟢</span>
                        <span className="font-semibold">Connect Google Calendar</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={connectOutlookCalendar}
                    disabled={connectingCalendar}
                    className="flex items-center justify-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition disabled:opacity-50"
                  >
                    {connectingCalendar ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <span className="text-2xl">🔵</span>
                        <span className="font-semibold">Connect Outlook</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Cal.com Option */}
              <div className="border-t pt-8">
                <h4 className="font-semibold mb-4 text-gray-700">Option 2: Connect Cal.com</h4>
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold mb-1">Get your Cal.com API Key:</p>
                      <ol className="list-decimal ml-5 space-y-1">
                        <li>Go to <a href="https://cal.com/settings/developer/api-keys" target="_blank" className="text-blue-600 underline">cal.com/settings/developer/api-keys</a></li>
                        <li>Create a new API key</li>
                        <li>Copy the key and paste it below</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Cal.com Username</label>
                    <input
                      type="text"
                      value={calcomUsername}
                      onChange={(e) => setCalcomUsername(e.target.value)}
                      placeholder="your-username"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Cal.com API Key</label>
                    <input
                      type="password"
                      value={calcomApiKey}
                      onChange={(e) => setCalcomApiKey(e.target.value)}
                      placeholder="cal_live_..."
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={connectCalCom}
                    disabled={connectingCalendar || !calcomApiKey || !calcomUsername}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {connectingCalendar ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Connecting...
                      </div>
                    ) : (
                      'Connect Cal.com'
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mt-8">
              <h3 className="font-bold text-lg mb-4">🤖 How Calendar Booking Works</h3>
              <ol className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="font-bold">1.</span>
                  <span>Customer calls your AI receptionist</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">2.</span>
                  <span>AI checks your real-time calendar availability</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">3.</span>
                  <span>AI offers available time slots</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">4.</span>
                  <span>Customer picks a time, AI books it instantly</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">5.</span>
                  <span>Appointment appears in your calendar automatically</span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Train AI Tab */}
        {activeTab === 'train' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Train Your AI</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        )}

        {/* Calls Tab */}
        {activeTab === 'calls' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Call History</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
