"use client";

import { useState } from 'react';
import { 
  ArrowRight,
  Award,
  BarChart3,
  Bot, 
  BrainCircuit,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  DollarSign,
  Handshake,
  Lightbulb,
  LineChart,
  MapPin,
  MessageSquare,
  Mountain,
  Rocket,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    { number: "300%", label: "Average ROI", subtext: "Within 6 Months" },
    { number: "80%", label: "Cost Reduction", subtext: "On Operations" },
    { number: "24/7", label: "Always Available", subtext: "Never Miss a Lead" },
    { number: "100%", label: "Idaho Owned", subtext: "Local Support" }
  ];

  const projects = [
    {
      title: "Agricultural Analytics",
      client: "Idaho Potato Commission",
      description: "AI-powered crop yield predictions with 92% accuracy",
      result: "Saved $2.3M in waste reduction",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: "Customer Service Bot",
      client: "Boise Medical Group",
      description: "24/7 appointment scheduling and patient triage",
      result: "Reduced wait times by 85%",
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      title: "Inventory Automation",
      client: "Sun Valley Ski Resort",
      description: "Predictive inventory management for equipment rentals",
      result: "Cut overstock costs by 60%",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Lead Qualification",
      client: "Coeur d'Alene Real Estate",
      description: "AI that qualifies and routes leads instantly",
      result: "40% more closed deals",
      icon: <Target className="w-6 h-6" />
    }
  ];

  const processSteps = [
    {
      title: "Idaho Discovery Session",
      description: "We meet in person or virtually to understand your unique business challenges. No cookie-cutter solutions.",
      icon: <Lightbulb className="w-8 h-8" />
    },
    {
      title: "Proof of Concept",
      description: "See real results in 2 weeks. We build a working prototype using your actual data.",
      icon: <Code className="w-8 h-8" />
    },
    {
      title: "Development & Integration",
      description: "Production-ready AI built into your existing systems. You own all the code.",
      icon: <BrainCircuit className="w-8 h-8" />
    },
    {
      title: "Launch & Scale",
      description: "Go live with full training and support. Expand AI across your organization as you grow.",
      icon: <Rocket className="w-8 h-8" />
    }
  ];

  const testimonials = [
    {
      quote: "Idaho AI transformed our entire operation. We're saving 20 hours a week on data entry alone, and our error rate dropped to zero. Best investment we've made.",
      author: "Sarah Mitchell",
      company: "Boise Valley Dental",
      location: "Boise, ID",
      result: "20 hours saved weekly"
    },
    {
      quote: "The AI system handles all our estimates and invoicing. What used to take my team days now happens in minutes. We can actually focus on building instead of paperwork.",
      author: "Mike Rodriguez",
      company: "Sun Valley Construction",
      location: "Sun Valley, ID",
      result: "$180k saved annually"
    },
    {
      quote: "Lead response time went from hours to seconds. Our AI qualifies leads 24/7 and books appointments while we sleep. Revenue is up 40% in just 6 months.",
      author: "Jessica Chen",
      company: "Coeur d'Alene Realty",
      location: "Coeur d'Alene, ID",
      result: "40% revenue increase"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Mountain className="w-8 h-8 text-blue-700" />
              <span className="font-bold text-xl">Idaho AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#projects" className="text-gray-700 hover:text-blue-700 transition font-medium">Projects</a>
              <a href="#process" className="text-gray-700 hover:text-blue-700 transition font-medium">Process</a>
              <a href="#about" className="text-gray-700 hover:text-blue-700 transition font-medium">About</a>
              <a href="#contact" className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition font-semibold">
                Start Your AI Project
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              <span>Proudly Serving Idaho Businesses Since 2019</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 leading-tight">
              We Deploy AI Solutions<br />
              <span className="text-blue-700">Idaho CEOs Brag About</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              From Boise to Coeur d'Alene, we help Idaho businesses slash costs, 
              boost efficiency, and outpace the competition with custom AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="#contact" className="bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-800 transition inline-flex items-center justify-center group">
                Get Your Free AI Strategy
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#projects" className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition border-2 border-gray-300">
                See Idaho Success Stories
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-blue-700">{stat.number}</div>
                  <div className="text-gray-900 font-semibold">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.subtext}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-700" />
              <span className="font-semibold">50+ Idaho Businesses Transformed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-700" />
              <span className="font-semibold">Bank-Level Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-700" />
              <span className="font-semibold">92% Client Retention</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-700" />
              <span className="font-semibold">2-Week First Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
              AI Projects That Actually <span className="text-blue-700">Deliver ROI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real Idaho businesses. No fluff, just proven AI solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-700 group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{project.client}</span>
                      <span className="text-sm font-bold text-green-600">{project.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#contact" className="inline-flex items-center text-blue-700 font-bold hover:text-blue-800 transition group">
              Start Your AI Success Story
              <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 md:py-32 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
              The Idaho AI <span className="text-blue-700">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From idea to implementation in weeks, not months. Our proven process delivers results fast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all h-full">
                  <div className="text-blue-700 mb-4">{step.icon}</div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-12">
              Idaho Businesses Love Their AI
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="mb-8">
                <p className="text-2xl leading-relaxed italic">
                  "{testimonials[activeTestimonial].quote}"
                </p>
              </div>
              
              <div className="mb-8">
                <div className="font-bold text-xl">{testimonials[activeTestimonial].author}</div>
                <div className="text-blue-200">{testimonials[activeTestimonial].company}</div>
                <div className="text-sm text-blue-300">{testimonials[activeTestimonial].location}</div>
              </div>

              <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold">{testimonials[activeTestimonial].result}</span>
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial ? 'bg-white w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                Why Idaho Businesses <br />
                <span className="text-blue-700">Choose Local AI</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  We're not another Silicon Valley tech company trying to sell you 
                  one-size-fits-all software. We're your neighbors, building custom AI 
                  that understands Idaho business.
                </p>
                
                <div className="grid gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Local Understanding:</strong> We know the unique 
                      challenges of Idaho businesses, from agriculture to tourism.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Face-to-Face Support:</strong> Real people, real 
                      meetings. We're here in Idaho when you need us.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Custom Solutions:</strong> No monthly subscriptions 
                      to bloated software. Just AI built for your exact needs.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">You Own Everything:</strong> All code, all data, 
                      all IP. No vendor lock-in, ever.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-100 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-4 rounded-xl">
                    <DollarSign className="w-8 h-8 text-blue-700" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-gray-900">300% Average ROI</div>
                    <div className="text-gray-600">Most clients see payback in under 6 months</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Idaho AI Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Bot className="w-5 h-5 text-blue-700" />
                    <span className="font-medium">Custom Chatbots & Support AI</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <LineChart className="w-5 h-5 text-blue-700" />
                    <span className="font-medium">Predictive Analytics & Forecasting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-blue-700" />
                    <span className="font-medium">Workflow Automation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BrainCircuit className="w-5 h-5 text-blue-700" />
                    <span className="font-medium">Machine Learning Models</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-blue-700" />
                    <span className="font-medium">Lead Qualification & Routing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-blue-700" />
                    <span className="font-medium">Data Analysis & Insights</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-black text-gray-900">5+ Years</div>
                      <div className="text-gray-600">Building AI in Idaho</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-gray-900">50+</div>
                      <div className="text-gray-600">Idaho Businesses Served</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-br from-blue-700 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&h=1080&fit=crop"
            alt="Sawtooth Mountains"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Ready to Transform Your Idaho Business with AI?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-blue-100">
              Get a free AI strategy session. We'll show you exactly how AI can 
              save you time and money — with real numbers.
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">Get Your Free AI Strategy Session</h3>
              
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                
                // Here you would handle the form submission
                alert(`Thanks ${formData.get('name')}! We'll be in touch within 24 hours.`);
              }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                    required
                  />
                  <input
                    type="text"
                    name="business"
                    placeholder="Business Name"
                    className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                    required
                  />
                </div>
                
                <select 
                  name="challenge"
                  className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                  required
                >
                  <option value="">What's your biggest challenge?</option>
                  <option value="customer-service">Too much time on customer service</option>
                  <option value="data-entry">Manual data entry eating up hours</option>
                  <option value="lead-management">Missing or slow to respond to leads</option>
                  <option value="reporting">Need better insights from our data</option>
                  <option value="other">Something else</option>
                </select>
                
                <textarea
                  name="details"
                  placeholder="Tell us more about your business and goals..."
                  rows={4}
                  className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                
                <button
                  type="submit"
                  className="w-full bg-white text-blue-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition transform hover:scale-105"
                >
                  Get My Free AI Strategy Session →
                </button>
              </form>

              <p className="mt-6 text-sm text-blue-100">
                No spam, no obligations. Just honest advice from fellow Idahoans.
              </p>
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="tel:208-555-0100" className="flex items-center space-x-2 hover:text-blue-200 transition">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold">(208) 555-0100</span>
              </a>
              
              <a href="mailto:hello@idaho-ai.com" className="flex items-center space-x-2 hover:text-blue-200 transition">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold">hello@idaho-ai.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Mountain className="w-8 h-8 text-blue-400" />
                <span className="font-bold text-xl">Idaho AI</span>
              </div>
              <p className="text-gray-400">
                Custom AI solutions built by Idahoans, for Idaho businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Custom Chatbots</a></li>
                <li><a href="#" className="hover:text-white transition">Process Automation</a></li>
                <li><a href="#" className="hover:text-white transition">Data Analytics</a></li>
                <li><a href="#" className="hover:text-white transition">Machine Learning</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#projects" className="hover:text-white transition">Case Studies</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">
                Ready to transform your business?
              </p>
              <a href="#contact" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition font-semibold">
                Start Your AI Journey
                <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Idaho AI. All rights reserved. Proudly serving Idaho from Boise.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}