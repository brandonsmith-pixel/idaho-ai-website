"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Mountain,
  Briefcase,
  Building2,
  Wheat,
  Stethoscope,
  Home,
  Scale,
  ShoppingBag,
  ChevronRight
} from 'lucide-react';

export default function IdahoLanding() {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    challenge: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'idaho-landing-page',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const idahoProjects = [
    {
      icon: <Wheat className="w-8 h-8" />,
      title: "Agricultural Analytics",
      location: "Eastern Idaho Co-op",
      challenge: "Manual crop yield tracking across 50+ farms",
      solution: "AI-powered prediction system analyzing soil data, weather patterns, and historical yields",
      results: [
        "92% prediction accuracy",
        "$2.3M saved in waste reduction",
        "Real-time alerts for optimal harvest timing"
      ],
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Medical Scheduling AI",
      location: "Boise Medical Group",
      challenge: "Missed appointments costing $80K annually",
      solution: "24/7 AI receptionist handling calls, bookings, and patient reminders",
      results: [
        "No-show rate dropped from 22% to 4%",
        "$67K recovered revenue first year",
        "Staff freed to focus on patient care"
      ],
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Mountain className="w-8 h-8" />,
      title: "Tourism Optimization",
      location: "Sun Valley Ski Resort",
      challenge: "Peak season staffing and guest experience gaps",
      solution: "AI chatbot handling 70% of common inquiries, dynamic pricing recommendations",
      results: [
        "15% increase in off-peak bookings",
        "Guest satisfaction up 28%",
        "Staffing costs reduced by $120K/season"
      ],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Real Estate Lead Nurturing",
      location: "Coeur d'Alene Real Estate",
      challenge: "Leads going cold due to slow response times",
      solution: "AI-powered instant response system with personalized property matching",
      results: [
        "Response time: 2 days → 30 seconds",
        "Conversion rate up 340%",
        "Closed 12 extra homes in 6 months"
      ],
      color: "from-orange-500 to-red-600"
    },
  ];

  const industries = [
    { icon: <Wheat className="w-6 h-6" />, name: "Agriculture & Ranching" },
    { icon: <Stethoscope className="w-6 h-6" />, name: "Healthcare" },
    { icon: <Mountain className="w-6 h-6" />, name: "Tourism & Hospitality" },
    { icon: <Scale className="w-6 h-6" />, name: "Legal Services" },
    { icon: <Home className="w-6 h-6" />, name: "Real Estate" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Retail" },
    { icon: <Building2 className="w-6 h-6" />, name: "Manufacturing" },
    { icon: <Briefcase className="w-6 h-6" />, name: "Professional Services" },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Mountain className="w-8 h-8 text-blue-700" />
            <span className="text-2xl font-bold text-gray-900">Teton Group</span>
          </Link>
          <div className="flex gap-6 items-center">
            <a href="#projects" className="text-gray-700 hover:text-gray-900 font-medium hidden md:inline">Projects</a>
            <a href="#industries" className="text-gray-700 hover:text-gray-900 font-medium hidden md:inline">Industries</a>
            <a 
              href="tel:+12087897053"
              className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-18099790158/phone_click'
                  });
                }
              }}
            >
              <Phone className="w-5 h-5" />
              (208) 789-7053
            </a>
            <a href="#contact" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Idaho Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <MapPin className="w-4 h-4" />
              Proudly Serving Idaho Businesses
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              AI Solutions Built for<br/>
              <span className="text-blue-600">Idaho Businesses</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              From Boise to Coeur d'Alene, Idaho Falls to Twin Falls — we help local businesses automate operations, reduce costs, and grow faster with custom AI solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="#contact" className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg">
                Schedule Free Consultation
              </a>
              <a href="#projects" className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-800 text-lg font-semibold rounded-lg hover:border-gray-400 transition">
                See Idaho Success Stories
              </a>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold">Idaho-Based Team</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold">No Long-Term Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold">30-Day Guarantee</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Idaho Projects */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Results from Real Idaho Businesses
            </h2>
            <p className="text-lg text-gray-600">
              These aren't hypothetical case studies — they're your neighbors, seeing real ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {idahoProjects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition">
                
                {/* Header */}
                <div className={`bg-gradient-to-r ${project.color} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                      {project.icon}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-500 mb-2">THE CHALLENGE</p>
                    <p className="text-gray-700">{project.challenge}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-500 mb-2">OUR SOLUTION</p>
                    <p className="text-gray-700">{project.solution}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-3">RESULTS</p>
                    <ul className="space-y-2">
                      {project.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Industries We Serve */}
      <section id="industries" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Idaho Industries We Serve
            </h2>
            <p className="text-lg text-gray-600">
              Every Idaho business is unique. We build AI solutions tailored to your industry.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {industries.map((industry, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition border-2 border-gray-100">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4 text-blue-600">
                  {industry.icon}
                </div>
                <p className="font-semibold text-gray-900">{industry.name}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose Teton Group */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Idaho Businesses Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Local & Accessible</h3>
              <p className="text-gray-600">
                We're based in Idaho. Need a meeting? We'll drive to you. Need support? We're in your timezone.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">ROI-Focused</h3>
              <p className="text-gray-600">
                We don't build AI for the sake of AI. Every solution is designed to save you money or make you money.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Implementation</h3>
              <p className="text-gray-600">
                Most projects live within 30-60 days. No endless consultations — we build, test, and deploy quickly.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          
          <div className="max-w-3xl mx-auto">
            
            {!submitted ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-xl text-blue-100">
                    Schedule a free 30-minute consultation. No sales pitch — just an honest conversation about what AI can do for your business.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.business}
                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                        placeholder="(208) 555-1234"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                        placeholder="john@acmecorp.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What's your biggest challenge? *
                    </label>
                    <textarea
                      required
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                      rows={4}
                      placeholder="e.g., We're spending too much time on manual data entry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    Schedule Free Consultation
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    We'll respond within 24 hours. Usually faster.
                  </p>
                </form>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Thanks! We'll Be In Touch Soon.
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We'll review your info and reach out within 24 hours to schedule your free consultation.
                </p>
                <p className="text-gray-600">
                  Questions? Call us: <a 
                    href="tel:+12087897053" 
                    className="text-blue-600 hover:underline font-semibold"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'conversion', {
                          'send_to': 'AW-18099790158/phone_click'
                        });
                      }
                    }}
                  >(208) 789-7053</a>
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="w-6 h-6 text-blue-400" />
            <span className="text-white font-bold text-xl">Teton Group</span>
          </div>
          <p className="mb-4">Custom AI Solutions for Idaho Businesses</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/ai-receptionist" className="hover:text-white">AI Receptionist</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/" className="hover:text-white">Home</Link>
          </div>
          <p className="text-sm mt-6">© 2026 Teton Group. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
