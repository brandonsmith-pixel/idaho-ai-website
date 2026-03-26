import Link from 'next/link';
import { ArrowLeft, Mountain, CheckCircle, Lightbulb, AlertTriangle, Rocket, Brain } from 'lucide-react';

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
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Getting Started</span>
                  <span>March 22, 2024</span>
                  <span>•</span>
                  <span>12 min read</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                  The Idaho Business Owner's Guide to AI: Start Here
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Cut through the hype. This is everything you need to know about AI for your business, 
                  explained in plain English — no computer science degree required.
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">What Is AI, Really?</h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  Forget the sci-fi stuff. For business purposes, AI is software that learns patterns from data and makes 
                  decisions without being explicitly programmed for every scenario.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Think of it like training an employee: You show them examples, they learn the patterns, and eventually 
                  they can handle new situations on their own. Except AI doesn't call in sick, doesn't need sleep, and 
                  works 24/7.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <Brain className="w-8 h-8 mr-3 text-blue-700" />
                  The Three Types of AI You'll Actually Use
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">1. Conversational AI (Chatbots & Assistants)</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>What it does:</strong> Talks to customers, answers questions, schedules appointments, 
                      qualifies leads.
                    </p>
                    <p className="text-gray-700 mb-3">
                      <strong>Best for:</strong> Customer service, appointment scheduling, FAQ handling, lead capture.
                    </p>
                    <p className="text-gray-700">
                      <strong>Real example:</strong> Medical clinic uses AI to book appointments 24/7 and answer common 
                      patient questions, saving 15 hours per week.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">2. Predictive AI (Analytics & Forecasting)</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>What it does:</strong> Analyzes historical data to predict future outcomes — sales, 
                      inventory needs, customer churn, equipment maintenance.
                    </p>
                    <p className="text-gray-700 mb-3">
                      <strong>Best for:</strong> Inventory management, demand forecasting, risk assessment, pricing optimization.
                    </p>
                    <p className="text-gray-700">
                      <strong>Real example:</strong> Agricultural co-op predicts crop yields with 92% accuracy, 
                      saving $2.3M in waste.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">3. Automation AI (Process & Document Handling)</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>What it does:</strong> Reads documents, extracts data, processes forms, generates reports, 
                      handles repetitive workflows.
                    </p>
                    <p className="text-gray-700 mb-3">
                      <strong>Best for:</strong> Data entry, invoice processing, document classification, report generation.
                    </p>
                    <p className="text-gray-700">
                      <strong>Real example:</strong> Dental practice automates insurance verification and data entry, 
                      eliminating 20 hours of manual work weekly.
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <Lightbulb className="w-8 h-8 mr-3 text-blue-700" />
                  How to Know If AI Can Help Your Business
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  AI works best for tasks that are:
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>Repetitive:</strong> Done the same way over and over (data entry, scheduling, common questions)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>Time-consuming:</strong> Taking 10+ hours per week away from higher-value work
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>Pattern-based:</strong> Follows rules or examples (if X, then Y)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      <strong>Data-driven:</strong> Requires analyzing information to make decisions
                    </span>
                  </li>
                </ul>

                <div className="bg-blue-50 border-l-4 border-blue-700 p-6 my-8 rounded-r-lg">
                  <p className="font-semibold text-gray-900 mb-3">Quick Test: Is Your Task AI-Ready?</p>
                  <p className="text-gray-700 mb-2">Ask yourself:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Could I train a smart high school student to do this task?</li>
                    <li>• Does it follow a process or pattern?</li>
                    <li>• Am I spending more than 10 hours per week on it?</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    If yes to all three → AI can probably help.
                  </p>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">Common AI Use Cases for Idaho Businesses</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">For Retail & E-commerce</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Inventory demand forecasting</li>
                      <li>• Personalized product recommendations</li>
                      <li>• Automated customer support</li>
                      <li>• Dynamic pricing optimization</li>
                      <li>• Chatbots for order tracking</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">For Healthcare & Dental</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Appointment scheduling & reminders</li>
                      <li>• Insurance verification automation</li>
                      <li>• Patient intake form processing</li>
                      <li>• Medical records data entry</li>
                      <li>• Billing & claims automation</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">For Real Estate</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Lead qualification & routing</li>
                      <li>• Automated follow-up sequences</li>
                      <li>• Property valuation models</li>
                      <li>• Virtual showing scheduling</li>
                      <li>• Market trend analysis</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">For Agriculture</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Crop yield prediction</li>
                      <li>• Weather-based planning</li>
                      <li>• Soil analysis & recommendations</li>
                      <li>• Inventory & supply optimization</li>
                      <li>• Equipment maintenance forecasting</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">For Hospitality & Tourism</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Dynamic booking management</li>
                      <li>• Guest communication automation</li>
                      <li>• Revenue optimization</li>
                      <li>• Demand forecasting</li>
                      <li>• Review response automation</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">For Professional Services</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Client intake & qualification</li>
                      <li>• Document generation & templates</li>
                      <li>• Meeting scheduling automation</li>
                      <li>• Report & proposal creation</li>
                      <li>• Invoice & billing automation</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <AlertTriangle className="w-8 h-8 mr-3 text-blue-700" />
                  What AI Can't Do (Yet)
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  AI is powerful, but it's not magic. Here's what it struggles with:
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="text-gray-700">
                    <strong>Complex human judgment:</strong> Nuanced decisions requiring empathy, ethics, or creativity 
                    still need humans.
                  </li>
                  <li className="text-gray-700">
                    <strong>Completely novel situations:</strong> If there's no historical data or pattern, AI can't learn.
                  </li>
                  <li className="text-gray-700">
                    <strong>Physical tasks:</strong> AI can tell you what to do, but can't physically do things 
                    (unless paired with robotics).
                  </li>
                  <li className="text-gray-700">
                    <strong>High-stakes unstructured decisions:</strong> Strategic business pivots, major investments, 
                    hiring key people — these need human judgment.
                  </li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Think of AI as a really capable assistant, not a replacement for leadership and strategic thinking.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 flex items-center">
                  <Rocket className="w-8 h-8 mr-3 text-blue-700" />
                  Your AI Implementation Roadmap
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Identify Your Pain Points</h3>
                      <p className="text-gray-700">
                        Spend a week tracking where your team wastes time. What repetitive tasks take 10+ hours per week? 
                        Where are you missing opportunities due to slow response times?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Calculate Potential ROI</h3>
                      <p className="text-gray-700">
                        Use our <Link href="/blog/ai-roi-calculator-guide" className="text-blue-700 underline">ROI calculator</Link> to 
                        estimate savings. If payback is under 12 months, it's probably worth exploring.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Get Expert Input</h3>
                      <p className="text-gray-700">
                        Talk to an AI consultant (like us) who can assess whether AI is right for your specific situation. 
                        Get a realistic timeline and cost estimate.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Start with a Proof of Concept</h3>
                      <p className="text-gray-700">
                        Don't commit to a massive project. Build a small working prototype in 2-4 weeks using real data. 
                        See actual results before going all-in.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Build, Test, Launch</h3>
                      <p className="text-gray-700">
                        Once the POC proves value, build the production system. Test thoroughly with your team, then 
                        launch with training and support.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">6</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Measure & Expand</h3>
                      <p className="text-gray-700">
                        Track the actual time/money saved. Once the first AI project proves itself, look for the next 
                        opportunity. Most businesses find 3-5 areas where AI delivers ROI.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">The Biggest Mistake Business Owners Make</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  It's not implementing AI wrong. It's <strong>waiting too long to start</strong>.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Every month you delay, you're burning money on manual processes while your competitors get faster, 
                  cheaper, and more responsive. AI isn't the future — it's already here, and Idaho businesses are using 
                  it to win.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The second biggest mistake? Going too big too fast. Start with one pain point, prove the ROI, then expand.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">FAQ: Your Burning Questions Answered</h2>

                <div className="space-y-6 mb-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Q: How much does AI cost?</h3>
                    <p className="text-gray-700">
                      Custom AI projects for small-to-medium businesses typically run $12,000-30,000 for the initial build. 
                      Ongoing costs are usually under $500/month (hosting, maintenance). Most projects pay for themselves 
                      in 4-8 months.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Q: How long does it take?</h3>
                    <p className="text-gray-700">
                      Proof of concept: 2-4 weeks. Full implementation: 6-12 weeks. You'll start seeing results within 
                      the first month.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Q: Will I need to hire technical staff?</h3>
                    <p className="text-gray-700">
                      No. We build systems your current team can use. They'll need basic training (usually 1-2 hours), 
                      but no technical expertise required.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Q: What if the AI makes mistakes?</h3>
                    <p className="text-gray-700">
                      Every system includes monitoring and safeguards. For critical tasks, we build in human review 
                      steps. AI reduces errors — it doesn't eliminate human oversight entirely.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Q: What happens if you (the consultant) disappear?</h3>
                    <p className="text-gray-700">
                      You own all the code and documentation. Any competent developer can maintain or modify the system. 
                      No vendor lock-in, ever.
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900">Ready to Get Started?</h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  You don't need to become an AI expert. You just need to know:
                </p>

                <ol className="space-y-2 mb-6 text-gray-700 list-decimal list-inside">
                  <li>What tasks are wasting your time</li>
                  <li>How much those tasks cost you</li>
                  <li>Whether AI can realistically help</li>
                </ol>

                <p className="text-gray-700 leading-relaxed mb-6">
                  That's where we come in.
                </p>

                <div className="bg-blue-700 text-white rounded-2xl p-8 my-12">
                  <h3 className="text-2xl font-bold mb-4">Get Your Free AI Strategy Session</h3>
                  <p className="text-blue-100 mb-6">
                    We'll walk through your business, identify where AI makes sense, and show you the potential ROI — 
                    with real numbers, no sales pitch.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-block bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition"
                  >
                    Schedule Your Free Session
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
