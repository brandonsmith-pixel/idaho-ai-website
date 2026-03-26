import Link from 'next/link';
import { ArrowLeft, Mountain, CheckCircle, TrendingUp, MessageSquare, BarChart3, Target, Clock } from 'lucide-react';

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Mountain className="w-8 h-8 text-blue-700" />
              <span className="font-bold text-xl">Teton Group</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#projects" className="text-gray-700 hover:text-blue-700 transition font-medium">Projects</Link>
              <Link href="/#process" className="text-gray-700 hover:text-blue-700 transition font-medium">Process</Link>
              <Link href="/#about" className="text-gray-700 hover:text-blue-700 transition font-medium">About</Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-700 transition font-medium">Blog</Link>
              <Link href="/#contact" className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition font-semibold">
                Start Your AI Project
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-blue-700 font-semibold mb-8 hover:text-blue-800 transition">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </Link>

            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
              <div className="mb-8">
                <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Case Studies</span>
                  <span>March 25, 2024</span>
                  <span>•</span>
                  <span>8 min read</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                  5 Ways Idaho Businesses Are Using AI to Cut Costs (Real Examples)
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  AI isn't just for Silicon Valley anymore. From Boise to Coeur d'Alene, Idaho businesses are implementing 
                  practical AI solutions that deliver measurable ROI. Here are five real ways local companies are saving money 
                  and time with AI.
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <MessageSquare className="w-8 h-8 mr-3 text-blue-700" />
                  1. 24/7 Customer Support (Without Hiring Night Shifts)
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>The Challenge:</strong> A regional medical group was missing after-hours calls and patients were 
                  frustrated with long hold times during business hours.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-700 p-6 my-6 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">The Solution:</p>
                  <p className="text-gray-700">
                    We built a custom AI chatbot that handles appointment scheduling, patient triage, and common questions 
                    24/7. It integrates directly with their existing scheduling system.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong className="text-green-600">The Result:</strong> Wait times dropped 85%, patient satisfaction scores 
                  increased, and they avoided hiring three full-time night staff members. Annual savings: $180,000.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <BarChart3 className="w-8 h-8 mr-3 text-blue-700" />
                  2. Predictive Analytics for Agriculture
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>The Challenge:</strong> A regional agricultural co-op was struggling with crop yield predictions 
                  and inventory management, leading to significant waste and overstock costs.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-700 p-6 my-6 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">The Solution:</p>
                  <p className="text-gray-700">
                    We developed an AI system that analyzes historical data, weather patterns, soil conditions, and market 
                    trends to predict crop yields with 92% accuracy.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong className="text-green-600">The Result:</strong> $2.3 million saved in waste reduction over the 
                  first year. Better inventory planning led to improved cash flow and reduced storage costs.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <Target className="w-8 h-8 mr-3 text-blue-700" />
                  3. Smart Lead Qualification for Real Estate
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>The Challenge:</strong> A Coeur d'Alene real estate agency was wasting hours on unqualified leads 
                  while serious buyers went cold waiting for responses.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-700 p-6 my-6 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">The Solution:</p>
                  <p className="text-gray-700">
                    Custom AI that instantly qualifies leads based on budget, timeline, and preferences, then routes hot 
                    prospects to agents immediately via SMS while nurturing colder leads automatically.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong className="text-green-600">The Result:</strong> Response time went from hours to seconds. Closed 
                  deals increased 40% in six months. Agents now spend time with qualified buyers instead of chasing dead ends.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <TrendingUp className="w-8 h-8 mr-3 text-blue-700" />
                  4. Inventory Management for Hospitality
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>The Challenge:</strong> Sun Valley Ski Resort was losing money on equipment rental inventory — 
                  either overstocked with unused gear or scrambling for equipment during peak times.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-700 p-6 my-6 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">The Solution:</p>
                  <p className="text-gray-700">
                    Predictive AI that analyzes historical rental patterns, weather forecasts, local events, and booking 
                    data to optimize inventory levels week by week.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong className="text-green-600">The Result:</strong> Cut overstock costs by 60% while maintaining 99% 
                  availability during peak season. ROI achieved in under four months.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <Clock className="w-8 h-8 mr-3 text-blue-700" />
                  5. Automated Data Entry for Healthcare
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>The Challenge:</strong> A Boise dental practice was spending 20+ hours per week on manual data 
                  entry, insurance verification, and appointment follow-ups.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-700 p-6 my-6 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">The Solution:</p>
                  <p className="text-gray-700">
                    AI system that automatically extracts data from forms, verifies insurance eligibility in real-time, 
                    and sends automated appointment reminders via SMS and email.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong className="text-green-600">The Result:</strong> 20 hours saved per week (equivalent to half a 
                  full-time employee). Error rate dropped to zero. No-show rate decreased by 35% thanks to automated reminders.
                </p>

                <div className="bg-gray-100 rounded-xl p-8 my-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">The Common Thread</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Notice a pattern? These aren't flashy AI demos or experimental projects. They're practical solutions 
                    that solve real business problems:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">They target specific, expensive pain points</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">They integrate with existing systems (no rip-and-replace)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">They deliver measurable ROI in under 6 months</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">They're custom-built for Idaho businesses, not generic SaaS</span>
                    </li>
                  </ul>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">What Could AI Do For Your Business?</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The businesses above aren't tech companies — they're dentists, real estate agents, farmers, and resort 
                  operators. They just recognized that AI could solve expensive problems.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  If you're spending money on repetitive tasks, missing opportunities due to slow response times, or making 
                  decisions based on gut feel instead of data, AI can probably help.
                </p>

                <div className="bg-blue-700 text-white rounded-2xl p-8 my-12">
                  <h3 className="text-2xl font-bold mb-4">Ready to See What's Possible?</h3>
                  <p className="text-blue-100 mb-6">
                    We offer free AI strategy sessions where we'll analyze your business and show you exactly where AI 
                    could save you time and money — with real numbers, not hype.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-block bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition"
                  >
                    Get Your Free Strategy Session
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
