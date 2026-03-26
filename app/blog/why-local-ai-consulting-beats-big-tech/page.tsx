import Link from 'next/link';
import { ArrowLeft, Mountain, CheckCircle, X, Users, Handshake, Shield, Zap } from 'lucide-react';

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
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Strategy</span>
                  <span>March 24, 2024</span>
                  <span>•</span>
                  <span>6 min read</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                  Why Local AI Consulting Beats Big Tech Solutions for Small Businesses
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  You've heard the pitch: "Just use our AI platform!" But here's why Idaho businesses get better results 
                  with local consultants who build custom solutions instead of selling subscriptions.
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">The Big Tech Promise vs. Reality</h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  Big Tech wants you to believe AI is plug-and-play. Sign up, pay monthly, and watch the magic happen. 
                  Except it rarely works that way for small businesses.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Here's what actually happens: You pay $199-$999/month for software that kind of solves your problem, 
                  mostly works with your existing tools (after expensive integrations), and requires your team to adapt 
                  to how the platform wants things done.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">The Local Consultant Difference</h2>

                <div className="grid md:grid-cols-2 gap-6 my-12">
                  <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50">
                    <div className="flex items-center mb-4">
                      <X className="w-6 h-6 text-red-600 mr-2" />
                      <h3 className="text-xl font-bold text-gray-900">Big Tech SaaS</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li>• One-size-fits-all features</li>
                      <li>• Monthly fees forever</li>
                      <li>• Support via ticket system</li>
                      <li>• Vendor lock-in</li>
                      <li>• You adapt to their system</li>
                      <li>• Generic templates</li>
                      <li>• No ownership of code/data</li>
                    </ul>
                  </div>

                  <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                      <h3 className="text-xl font-bold text-gray-900">Local AI Consulting</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li>• Built for your exact needs</li>
                      <li>• One-time project cost</li>
                      <li>• Face-to-face meetings</li>
                      <li>• You own everything</li>
                      <li>• System adapts to you</li>
                      <li>• Custom workflows</li>
                      <li>• Full code & IP ownership</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <Users className="w-8 h-8 mr-3 text-blue-700" />
                  1. We Actually Understand Your Business
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  When you call a 1-800 support line, you get someone reading a script. When you work with local consultants, 
                  you get people who understand Idaho business.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  We know the seasonal challenges of tourism in Sun Valley. We understand agricultural cycles. We get that 
                  Boise businesses compete differently than Denver or Seattle companies.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-700 p-6 my-6 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">Real Example:</p>
                  <p className="text-gray-700">
                    A national CRM platform told a real estate client they should "just use the standard follow-up sequence." 
                    We built custom AI that understood Idaho's market timing, seasonal buyers, and local preferences. Result: 
                    40% more closed deals.
                  </p>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <Handshake className="w-8 h-8 mr-3 text-blue-700" />
                  2. Face-to-Face Support When You Need It
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Try getting the CEO of a big SaaS company to meet you for coffee. With local consultants? That's Tuesday.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  When something breaks or you need a change, you don't submit a ticket and wait three days. You text us, 
                  or we drive to your office. We're not support agents — we're partners invested in your success.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <Shield className="w-8 h-8 mr-3 text-blue-700" />
                  3. You Own Everything (No Hostage Situations)
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Here's the ugly truth about SaaS: Stop paying, and your system stops working. Your data is stuck in their 
                  platform. Want to export? Good luck — if they even allow it, you'll get a messy CSV.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  With custom AI from local consultants:
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>You own the code.</strong> All of it. Forever.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>You own the data.</strong> It lives on your servers or your chosen cloud.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>You own the IP.</strong> No licensing restrictions.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>No monthly fees.</strong> Pay once, use forever.
                    </span>
                  </li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-6">
                  If we get hit by a bus tomorrow, you can hire any developer to maintain your system. Try doing that 
                  with proprietary SaaS platforms.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <Zap className="w-8 h-8 mr-3 text-blue-700" />
                  4. Built for Your Workflow, Not Theirs
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  SaaS platforms make you change how you work to fit their system. Custom AI does the opposite — we build 
                  the system around how you already work.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  No forcing your team to learn new interfaces. No "Sorry, that feature isn't available in your tier." 
                  Just solutions that slot into your existing processes and make them better.
                </p>

                <div className="bg-gray-100 rounded-xl p-8 my-12">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">When Does SaaS Make Sense?</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To be fair, SaaS isn't always wrong. It makes sense when:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• You need a commodity tool (email, accounting, basic CRM)</li>
                    <li>• Your process is truly generic and standard</li>
                    <li>• You're testing something before committing</li>
                    <li>• The monthly cost is negligible to your revenue</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    But when AI is core to your competitive advantage? When you're spending $500+/month on a platform? 
                    When your needs are unique? That's when custom local AI wins.
                  </p>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">The Real Cost Comparison</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Let's do the math on a typical AI solution:
                </p>

                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <p className="font-bold text-gray-900 mb-3">Big Tech SaaS Option:</p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>• $499/month subscription</li>
                    <li>• $2,000 setup/integration</li>
                    <li>• $5,988/year ongoing</li>
                    <li>• <strong>3-year cost: $19,964</strong></li>
                  </ul>
                  <p className="text-sm text-gray-600 italic">And you own nothing at the end.</p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 mb-6">
                  <p className="font-bold text-gray-900 mb-3">Local Custom AI:</p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>• $12,000-18,000 one-time build</li>
                    <li>• $100-200/month hosting (optional)</li>
                    <li>• $1,200-2,400/year maintenance (optional)</li>
                    <li>• <strong>3-year cost: $15,600-24,000</strong></li>
                  </ul>
                  <p className="text-sm text-gray-600 italic">And you own everything forever.</p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Similar costs, but one gives you a commodity tool and the other gives you a competitive advantage 
                  you own outright.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">The Bottom Line</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Big Tech SaaS platforms are great for commodity needs. But when you need AI that truly transforms your 
                  business, gives you a competitive edge, and adapts to how you work — local consulting wins every time.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  You get better results, own everything, pay less over time, and have a partner who understands your 
                  business because they live and work in Idaho too.
                </p>

                <div className="bg-blue-700 text-white rounded-2xl p-8 my-12">
                  <h3 className="text-2xl font-bold mb-4">Want to See the Difference Yourself?</h3>
                  <p className="text-blue-100 mb-6">
                    We'll show you exactly what custom AI could do for your business — no generic demos, just solutions 
                    built around your actual needs.
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
