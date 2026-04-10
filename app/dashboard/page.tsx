"use client";

import { useState, useEffect } from 'react';
import { Phone, Clock, DollarSign, Calendar, Play, Download, Filter } from 'lucide-react';
import Link from 'next/link';

interface Call {
  id: string;
  phone_number: string;
  direction: string;
  status: string;
  duration_seconds: number;
  duration_minutes: number;
  cost: number;
  started_at: string;
  recording_url: string | null;
  transcript: string | null;
}

interface Stats {
  total_calls: number;
  total_minutes: number;
  total_cost: number;
}

export default function DashboardPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [stats, setStats] = useState<Stats>({ total_calls: 0, total_minutes: 0, total_cost: 0 });
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('30'); // days
  const customerId = 'demo-customer'; // TODO: Get from auth

  useEffect(() => {
    loadData();
  }, [dateFilter]);

  const loadData = async () => {
    try {
      const response = await fetch(`/api/dashboard/calls?customer_id=${customerId}&days=${dateFilter}`);
      const data = await response.json();
      
      if (data.success) {
        setCalls(data.calls || []);
        setStats(data.stats || { total_calls: 0, total_minutes: 0, total_cost: 0 });
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Nav */}
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Teton Group AI
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Demo Customer</span>
            <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-2">Call Dashboard</h1>
            <p className="text-gray-600">Track your AI receptionist performance and costs</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Calls</p>
                  <p className="text-3xl font-black text-gray-900">{stats.total_calls}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Minutes</p>
                  <p className="text-3xl font-black text-gray-900">{stats.total_minutes.toFixed(0)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Cost</p>
                  <p className="text-3xl font-black text-gray-900">${stats.total_cost.toFixed(2)}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Filter by:</span>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
                <option value="all">All time</option>
              </select>
            </div>
          </div>

          {/* Calls Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Recent Calls</h2>
            </div>
            
            {calls.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Phone className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-xl font-semibold mb-2">No calls yet</p>
                <p>Calls will appear here once your AI receptionist starts answering</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Direction</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cost</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {calls.map((call) => (
                      <tr key={call.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatDate(call.started_at)}
                        </td>
                        <td className="px-6 py-4 text-sm font-mono text-gray-900">
                          {call.phone_number}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            call.direction === 'inbound' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {call.direction}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatDuration(call.duration_seconds)}
                          <span className="text-gray-500 text-xs ml-2">
                            ({call.duration_minutes} min billed)
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          ${call.cost.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {call.recording_url && (
                              <button
                                onClick={() => window.open(call.recording_url!, '_blank')}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                                title="Play recording"
                              >
                                <Play className="w-4 h-4" />
                              </button>
                            )}
                            {call.transcript && (
                              <button
                                onClick={() => {
                                  const blob = new Blob([call.transcript!], { type: 'text/plain' });
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = `transcript-${call.id}.txt`;
                                  a.click();
                                }}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                                title="Download transcript"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
