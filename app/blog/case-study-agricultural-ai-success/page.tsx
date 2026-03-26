import Link from 'next/link';
import { ArrowLeft, Mountain, TrendingUp, BarChart3, Target, Clock, CheckCircle, DollarSign } from 'lucide-react';

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
                  <span>March 21, 2024</span>
                  <span>•</span>
                  <span>9 min read</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                  Case Study: How Idaho Agriculture Saved $2.3M with Custom AI
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  A regional agricultural co-op was bleeding money on waste and overstock. Here's how we built 
                  predictive AI that transformed their operations — and paid for itself in 8.6 days.
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                {/* Stats Overview */}
                <div className="grid md:grid-cols-4 gap-4 my-12 not-prose">
                  <div className="bg-green-50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-black text-green-700 mb-2">$2.3M</div>
                    <div className="text-gray-700 font-semibold">First Year Savings</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-black text-blue-700 mb-2">92%</div>
                    <div className="text-gray-700 font-semibold">Prediction Accuracy</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-black text-purple-700 mb-2">8.6 days</div>
                    <div className="text-gray-700 font-semibold">Payback Period</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-black text-orange-700 mb-2">5,011%</div>
                    <div className="text-gray-700 font-semibold">1-Year ROI</div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">The Client</h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  A regional agricultural cooperative serving over 200 Idaho farms. They handle everything from crop 
                  purchasing and storage to distribution and market sales. Annual revenue: ~$180 million.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <Target className="w-8 h-8 mr-3 text-blue-700" />
                  The Problem
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The co-op was stuck in a painful cycle:
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      <strong>Over-purchase during harvest:</strong> Fear of shortages led to buying too much inventory. 
                      Result: Spoilage, storage costs, and cash flow problems.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      <strong>Under-stock during demand spikes:</strong> When they got conservative, they ran out during 
                      high-demand periods, losing sales to competitors.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      <strong>Gut-feel forecasting:</strong> Purchasing decisions were based on "what we did last year" 
                      and hunches, not data.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      <strong>Market timing problems:</strong> Selling too early or too late meant missing optimal pricing.
                    </span>
                  </li>
                </ul>

                <div className="bg-red-50 border-l-4 border-red-600 p-6 my-8 rounded-r-lg">
                  <p className="font-bold text-gray-900 mb-2">The Cost of Guessing Wrong:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• $1.8M annual waste from spoilage and damage</li>
                    <li>• $650K in storage costs for excess inventory</li>
                    <li>• ~$400K in lost sales from stock-outs</li>
                    <li>• Strained cash flow from over-purchasing</li>
                  </ul>
                  <p className="mt-4 text-gray-700 font-semibold">
                    Total annual cost: <span className="text-red-600">~$2.85 million</span>
                  </p>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <BarChart3 className="w-8 h-8 mr-3 text-blue-700" />
                  Our Approach
                </h2>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Phase 1: Discovery (2 Weeks)</h3>

                <p className="text-gray-700 leading-relaxed mb-6">
                  We started by understanding their operation:
                </p>

                <ul className="space-y-2 mb-6 text-gray-700">
                  <li>• Interviews with purchasing managers, warehouse staff, and sales team</li>
                  <li>• Analysis of 5 years of historical data (purchases, sales, weather, market prices)</li>
                  <li>• Mapped their decision-making process and pain points</li>
                  <li>• Identified key variables affecting crop yields and demand</li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-6">
                  We discovered patterns they didn't even realize existed — like how rainfall in July correlated strongly 
                  with September demand, or how certain local events predictably spiked sales.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Phase 2: Proof of Concept (4 Weeks)</h3>

                <p className="text-gray-700 leading-relaxed mb-6">
                  We built a working prototype using their actual historical data:
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>Data integration:</strong> Connected to their existing systems (ERP, weather APIs, market data feeds)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>Model training:</strong> Trained AI on 5 years of data to identify patterns in crop yields, 
                      demand, pricing, and spoilage
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>Backtesting:</strong> Tested predictions against the previous year's actual results
                    </span>
                  </li>
                </ul>

                <div className="bg-blue-50 border-l-4 border-blue-700 p-6 my-8 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-2">POC Results:</p>
                  <p className="text-gray-700">
                    The AI predicted crop yields with 89% accuracy and demand patterns with 85% accuracy. If they had 
                    used these predictions the previous year, they would have saved an estimated $1.9 million.
                  </p>
                  <p className="text-gray-700 mt-3 font-semibold">
                    That was enough to greenlight the full build.
                  </p>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Phase 3: Production Build (8 Weeks)</h3>

                <p className="text-gray-700 leading-relaxed mb-6">
                  We built the production system with:
                </p>

                <ul className="space-y-2 mb-6 text-gray-700">
                  <li>• Real-time data feeds (weather, market prices, local events)</li>
                  <li>• Rolling weekly forecasts for crop availability and demand</li>
                  <li>• Optimal pricing recommendations based on market conditions</li>
                  <li>• Inventory management dashboard for warehouse managers</li>
                  <li>• Automated alerts for unusual patterns or stock-out risks</li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The system continuously learns and improves as new data comes in. Three months after launch, 
                  prediction accuracy improved from 89% to 92%.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <TrendingUp className="w-8 h-8 mr-3 text-blue-700" />
                  The Results
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                      <DollarSign className="w-6 h-6 text-green-600 mr-2" />
                      Financial Impact (Year 1)
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Waste reduction:</strong> $1.6M saved (down 89% from previous year)</li>
                      <li><strong>Storage cost savings:</strong> $420K (held less excess inventory)</li>
                      <li><strong>Increased revenue:</strong> $280K (fewer stock-outs during high-demand periods)</li>
                      <li className="text-green-600 font-bold text-lg pt-2 border-t border-gray-200 mt-3">
                        Total Year 1 benefit: $2.3M
                      </li>
                      <li className="text-sm text-gray-600 italic">
                        Project cost: $45,000 | Payback: 8.6 days | ROI: 5,011%
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                      <Clock className="w-6 h-6 text-blue-600 mr-2" />
                      Operational Improvements
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Decision time:</strong> Reduced from days to minutes</li>
                      <li><strong>Forecasting accuracy:</strong> 92% (up from ~60% gut-feel accuracy)</li>
                      <li><strong>Staff time saved:</strong> 12 hours/week on manual forecasting and analysis</li>
                      <li><strong>Cash flow:</strong> Improved by $1.8M due to reduced over-purchasing</li>
                    </ul>
                  </div>

                  <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                      <Target className="w-6 h-6 text-purple-600 mr-2" />
                      Strategic Advantages
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Market timing:</strong> Better pricing decisions led to higher margins</li>
                      <li><strong>Farmer relationships:</strong> More accurate purchase commitments built trust</li>
                      <li><strong>Competitive edge:</strong> Faster response to market changes than competitors</li>
                      <li><strong>Scalability:</strong> System handles growth without adding forecasting staff</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">What Made This Work</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Three things were critical to success:
                </p>

                <ol className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mr-3">1</div>
                    <div>
                      <strong className="text-gray-900 text-lg">They Had Good Data</strong>
                      <p className="text-gray-700 mt-1">
                        Five years of historical records meant the AI had plenty to learn from. If they only had 6 months 
                        of data, results would have been less accurate.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mr-3">2</div>
                    <div>
                      <strong className="text-gray-900 text-lg">Leadership Bought In</strong>
                      <p className="text-gray-700 mt-1">
                        The co-op's leadership trusted the proof of concept and empowered their team to use the AI's 
                        recommendations. They didn't force-fit it; they let it guide decisions.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mr-3">3</div>
                    <div>
                      <strong className="text-gray-900 text-lg">We Started Simple</strong>
                      <p className="text-gray-700 mt-1">
                        We didn't try to predict everything on day one. We focused on the highest-cost problem (waste) 
                        first, proved value, then expanded to pricing and demand forecasting.
                      </p>
                    </div>
                  </li>
                </ol>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">Lessons for Your Business</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  You don't need to be a $180M agriculture co-op to benefit from this approach. The principles apply 
                  to any business facing expensive forecasting or inventory challenges:
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>If you're making purchasing decisions based on gut feel,</strong> AI can probably improve accuracy.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>If you have years of historical data,</strong> it's probably hiding valuable patterns.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>If forecasting errors cost you real money,</strong> AI might pay for itself in weeks.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>If you're scaling,</strong> AI forecasting scales infinitely without adding headcount.
                    </span>
                  </li>
                </ul>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">The Bottom Line</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  This wasn't magic. It was data, smart modeling, and a client willing to trust the results.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The co-op turned a $45,000 investment into $2.3 million in savings — in the first year alone. They 
                  now have a competitive advantage that compounds over time.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  And here's the best part: They own the system. No monthly SaaS fees, no vendor lock-in. Just a tool 
                  that keeps working and getting better.
                </p>

                <div className="bg-gray-100 rounded-xl p-8 my-12">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Want to See What AI Could Do For You?</h3>
                  <p className="text-gray-700 mb-6">
                    Whether you're in agriculture, retail, healthcare, or any industry facing expensive forecasting 
                    challenges — we can help you build something similar.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-700">
                    <li>✓ Free initial consultation to assess feasibility</li>
                    <li>✓ Realistic ROI projections based on your data</li>
                    <li>✓ Proof of concept before committing to full build</li>
                    <li>✓ You own everything — code, models, data</li>
                  </ul>
                </div>

                <div className="bg-blue-700 text-white rounded-2xl p-8 my-12">
                  <h3 className="text-2xl font-bold mb-4">Ready to Stop Guessing and Start Predicting?</h3>
                  <p className="text-blue-100 mb-6">
                    Let's talk about your forecasting challenges. We'll show you what's possible with your data — 
                    no obligations, just honest analysis.
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
