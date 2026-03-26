import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Mountain } from 'lucide-react';

const blogPosts = [
  {
    slug: '5-ways-idaho-businesses-use-ai',
    title: '5 Ways Idaho Businesses Are Using AI to Cut Costs (Real Examples)',
    excerpt: 'See how businesses across Idaho are saving money and time with practical AI solutions.',
    date: 'March 25, 2024',
    readTime: '8 min read',
    category: 'Case Studies'
  },
  {
    slug: 'why-local-ai-consulting-beats-big-tech',
    title: 'Why Local AI Consulting Beats Big Tech Solutions for Small Businesses',
    excerpt: 'Discover why Idaho businesses choose local AI expertise over one-size-fits-all software.',
    date: 'March 24, 2024',
    readTime: '6 min read',
    category: 'Strategy'
  },
  {
    slug: 'ai-roi-calculator-guide',
    title: 'AI ROI Calculator: How Much Could Your Business Save?',
    excerpt: 'A step-by-step guide to calculating the real ROI of AI for your business.',
    date: 'March 23, 2024',
    readTime: '10 min read',
    category: 'ROI & Finance'
  },
  {
    slug: 'idaho-business-owners-guide-to-ai',
    title: "The Idaho Business Owner's Guide to AI: Start Here",
    excerpt: 'Everything you need to know about AI for your business, explained in plain English.',
    date: 'March 22, 2024',
    readTime: '12 min read',
    category: 'Getting Started'
  },
  {
    slug: 'case-study-agricultural-ai-success',
    title: 'Case Study: How Idaho Agriculture Saved $2.3M with Custom AI',
    excerpt: 'Deep dive into how a regional agricultural co-op transformed operations with predictive analytics.',
    date: 'March 21, 2024',
    readTime: '9 min read',
    category: 'Case Studies'
  }
];

export default function BlogPage() {
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
              <Link href="/blog" className="text-blue-700 font-medium">Blog</Link>
              <Link href="/#contact" className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition font-semibold">
                Start Your AI Project
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
              AI Insights for <span className="text-blue-700">Idaho Business</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real strategies, case studies, and practical advice from the front lines of AI implementation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="inline-flex items-center space-x-2 text-sm">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-500 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 group-hover:text-blue-700 transition">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 text-lg">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-blue-700 font-semibold group-hover:translate-x-2 transition-transform">
                    Read Article <ArrowRight className="ml-2 w-5 h-5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get a free AI strategy session and see how we can help you save time and money.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center bg-white text-blue-700 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition"
            >
              Get Your Free Strategy Session
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
