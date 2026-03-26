"use client";

import Link from 'next/link';
import { ArrowLeft, Mountain, Calculator, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { useState } from 'react';

export default function BlogPost() {
  const [hoursPerWeek, setHoursPerWeek] = useState('20');
  const [hourlyRate, setHourlyRate] = useState('25');
  const [projectCost, setProjectCost] = useState('15000');
  
  const calculateROI = () => {
    const hours = parseFloat(hoursPerWeek) || 0;
    const rate = parseFloat(hourlyRate) || 0;
    const cost = parseFloat(projectCost) || 0;
    
    const weeklySavings = hours * rate;
    const monthlySavings = weeklySavings * 4.33;
    const annualSavings = monthlySavings * 12;
    const paybackMonths = cost / monthlySavings;
    const threeYearROI = ((annualSavings * 3 - cost) / cost) * 100;
    
    return {
      weeklySavings: weeklySavings.toFixed(0),
      monthlySavings: monthlySavings.toFixed(0),
      annualSavings: annualSavings.toFixed(0),
      paybackMonths: paybackMonths.toFixed(1),
      threeYearROI: threeYearROI.toFixed(0)
    };
  };
  
  const results = calculateROI();

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
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">ROI & Finance</span>
                  <span>March 23, 2024</span>
                  <span>•</span>
                  <span>10 min read</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                  AI ROI Calculator: How Much Could Your Business Save?
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Stop guessing. Here's exactly how to calculate the real ROI of AI for your business, plus an 
                  interactive calculator to see your potential savings.
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                {/* Interactive Calculator */}
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-2xl p-8 my-12 not-prose">
                  <div className="flex items-center mb-6">
                    <Calculator className="w-8 h-8 mr-3" />
                    <h2 className="text-2xl font-bold">Your AI ROI Calculator</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-blue-100">
                        Hours saved per week
                      </label>
                      <input
                        type="number"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-gray-900 font-bold text-lg"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-blue-100">
                        Hourly labor cost ($)
                      </label>
                      <input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-gray-900 font-bold text-lg"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-blue-100">
                        AI project cost ($)
                      </label>
                      <input
                        type="number"
                        value={projectCost}
                        onChange={(e) => setProjectCost(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-gray-900 font-bold text-lg"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-3xl font-black mb-1">${results.monthlySavings}</div>
                        <div className="text-blue-200">Monthly Savings</div>
                      </div>
                      <div>
                        <div className="text-3xl font-black mb-1">${results.annualSavings}</div>
                        <div className="text-blue-200">Annual Savings</div>
                      </div>
                      <div>
                        <div className="text-3xl font-black mb-1">{results.paybackMonths} months</div>
                        <div className="text-blue-200">Payback Period</div>
                      </div>
                      <div>
                        <div className="text-3xl font-black mb-1">{results.threeYearROI}%</div>
                        <div className="text-blue-200">3-Year ROI</div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-blue-100 mt-6">
                    This calculator shows time savings only. Most AI projects also deliver revenue improvements, 
                    error reduction, and better customer experience — making actual ROI even higher.
                  </p>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">How to Calculate AI ROI: The Complete Guide</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Most business owners skip the ROI calculation and either avoid AI entirely or buy solutions blindly. 
                  Both are mistakes. Here's how to do it right.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <Clock className="w-8 h-8 mr-3 text-blue-700" />
                  Step 1: Identify Your Time Sinks
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  For one week, track where your team spends time on repetitive tasks. Common time sinks include:
                </p>

                <ul className="space-y-2 mb-6 text-gray-700">
                  <li>• Data entry and form processing</li>
                  <li>• Answering common customer questions</li>
                  <li>• Scheduling and appointment management</li>
                  <li>• Lead qualification and follow-up</li>
                  <li>• Report generation and analysis</li>
                  <li>• Inventory tracking and ordering</li>
                  <li>• Invoice processing and reconciliation</li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Write down: <strong>"We spend X hours per week on [task]."</strong>
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <DollarSign className="w-8 h-8 mr-3 text-blue-700" />
                  Step 2: Calculate Your True Labor Cost
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Don't just use base salary. Include:
                </p>

                <div className="bg-gray-100 rounded-xl p-6 mb-6">
                  <p className="font-bold text-gray-900 mb-3">True Hourly Cost Formula:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Base hourly wage: $X</li>
                    <li>• Benefits (30-40% of salary): $Y</li>
                    <li>• Overhead (office, equipment, etc.): $Z</li>
                    <li>• <strong>Total: $X + $Y + $Z = True cost per hour</strong></li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4 italic">
                    Example: $20/hr wage + $7/hr benefits + $5/hr overhead = $32/hr true cost
                  </p>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <TrendingUp className="w-8 h-8 mr-3 text-blue-700" />
                  Step 3: Estimate Time Savings from AI
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Be conservative. Most AI projects save 60-80% of time on targeted tasks (not 100%). Here's how to estimate:
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-700 p-6 my-6 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-3">Real Example: Customer Support Bot</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Current: 30 hours/week answering common questions</li>
                    <li>• AI handles 70% of common inquiries</li>
                    <li>• Time saved: 21 hours/week</li>
                    <li>• True cost: $32/hour</li>
                    <li>• <strong>Weekly savings: $672 ($2,909/month)</strong></li>
                  </ul>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">Step 4: Factor in Additional Benefits</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Time savings are just the start. Most AI projects also deliver:
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="text-gray-700">
                    <strong>Revenue improvements:</strong> Faster response times = more closed deals. A real estate 
                    client saw 40% more deals just from responding to leads in seconds instead of hours.
                  </li>
                  <li className="text-gray-700">
                    <strong>Error reduction:</strong> Manual data entry has 1-4% error rates. AI reduces that to near-zero. 
                    For high-volume operations, that's massive savings.
                  </li>
                  <li className="text-gray-700">
                    <strong>Better decisions:</strong> AI analyzes more data faster. Better inventory forecasting, pricing 
                    optimization, and resource allocation all impact your bottom line.
                  </li>
                  <li className="text-gray-700">
                    <strong>Customer satisfaction:</strong> 24/7 availability and instant responses improve retention. 
                    Keeping existing customers is 5-25x cheaper than acquiring new ones.
                  </li>
                </ul>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">Step 5: Calculate Payback Period</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Simple formula: <strong>Project Cost ÷ Monthly Savings = Payback in Months</strong>
                </p>

                <div className="bg-gray-100 rounded-xl p-6 mb-6">
                  <p className="font-bold text-gray-900 mb-3">Typical AI Project Costs:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Basic automation/chatbot: $8,000-15,000</li>
                    <li>• Custom workflow AI: $15,000-30,000</li>
                    <li>• Advanced analytics/ML: $30,000-60,000</li>
                    <li>• Enterprise integration: $60,000+</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4">
                    Most small-to-medium Idaho businesses fall in the $12,000-25,000 range and see payback in 4-8 months.
                  </p>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">Step 6: Don't Forget Ongoing Costs</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Unlike SaaS subscriptions, custom AI has minimal ongoing costs:
                </p>

                <ul className="space-y-2 mb-6 text-gray-700">
                  <li>• Hosting: $50-200/month (often less)</li>
                  <li>• API costs: $0-100/month depending on usage</li>
                  <li>• Maintenance: $100-300/month (optional)</li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Total: Usually under $500/month, often much less.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">Real ROI Examples from Idaho Businesses</h2>

                <div className="space-y-6 mb-8">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Boise Dental Practice</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Time saved:</strong> 20 hours/week on data entry and scheduling</li>
                      <li><strong>Cost per hour:</strong> $28 (admin labor + benefits)</li>
                      <li><strong>Monthly savings:</strong> $2,427</li>
                      <li><strong>Project cost:</strong> $14,000</li>
                      <li><strong>Payback:</strong> 5.8 months</li>
                      <li className="text-green-600 font-bold"><strong>3-year ROI: 420%</strong></li>
                    </ul>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Coeur d'Alene Real Estate</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Time saved:</strong> 15 hours/week on lead qualification</li>
                      <li><strong>Revenue impact:</strong> 40% more deals closed ($280k additional annual revenue)</li>
                      <li><strong>Project cost:</strong> $18,000</li>
                      <li><strong>Payback:</strong> 3.2 weeks (!)</li>
                      <li className="text-green-600 font-bold"><strong>1-year ROI: 1,456%</strong></li>
                    </ul>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Agricultural Co-op</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Waste reduction:</strong> $2.3M saved in first year</li>
                      <li><strong>Project cost:</strong> $45,000</li>
                      <li><strong>Payback:</strong> 8.6 days (!)</li>
                      <li className="text-green-600 font-bold"><strong>1-year ROI: 5,011%</strong></li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">When Does AI Make Financial Sense?</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Use this simple rule of thumb:
                </p>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                  <p className="font-bold text-gray-900 mb-2">AI is a good investment when:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ You can save 10+ hours per week on repetitive tasks</li>
                    <li>✓ Payback period is under 12 months</li>
                    <li>✓ The task is truly repetitive (not creative/strategic)</li>
                    <li>✓ You have at least 6 months of historical data</li>
                  </ul>
                </div>

                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
                  <p className="font-bold text-gray-900 mb-2">AI might not be worth it when:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>✗ Tasks are highly variable and require human judgment</li>
                    <li>✗ You're trying to automate less than 5 hours per week</li>
                    <li>✗ The process changes frequently</li>
                    <li>✗ You don't have data to train the system</li>
                  </ul>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">Your Next Step</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Now that you know how to calculate ROI, the question is: What are you spending money on that AI could fix?
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Take 30 minutes this week to track where your team's time goes. You'll probably find multiple opportunities 
                  where AI could pay for itself in under 6 months.
                </p>

                <div className="bg-blue-700 text-white rounded-2xl p-8 my-12">
                  <h3 className="text-2xl font-bold mb-4">Want Us to Calculate Your ROI?</h3>
                  <p className="text-blue-100 mb-6">
                    We'll analyze your business and show you exactly where AI makes financial sense — with real numbers, 
                    not guesses.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-block bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition"
                  >
                    Get Your Free ROI Analysis
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
