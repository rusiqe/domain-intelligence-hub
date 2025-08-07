'use client'

import { useState } from 'react'
import { Search, Brain, Bitcoin, Zap, Globe, BarChart3 } from 'lucide-react'

interface Suggestion {
  domain: string
  confidence: number
  reasoning: string
  category: string
  pricing: { registrar: string; price: number; currency: string; renewalPrice: number }[]
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<Suggestion[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResults([])
    if (!searchQuery.trim()) return
    try {
      setLoading(true)
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords: searchQuery.split(/[,\s]+/).filter(Boolean) }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Search failed')
      setResults(data.data.suggestions)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Domain Intelligence Hub</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          AI-Powered Domain 
          <span className="text-blue-600"> Intelligence</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover, analyze, and acquire premium domains with artificial intelligence. 
          Compare prices across registrars and pay with Bitcoin for ultimate privacy.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter keywords, business description, or domain ideas..."
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Search className="h-6 w-6" />
            </button>
          </div>
        </form>

        {loading && <div className="text-gray-600">Searching suggestions...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {results.length > 0 && (
          <div className="max-w-3xl mx-auto text-left">
            <h3 className="text-2xl font-semibold mb-4">Suggestions</h3>
            <ul className="space-y-4">
              {results.map((s) => (
                <li key={s.domain} className="p-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{s.domain}</div>
                      <div className="text-sm text-gray-600">{s.reasoning}</div>
                    </div>
                    <div className="text-sm text-gray-500">Confidence: {(s.confidence * 100).toFixed(0)}%</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">10,000+</div>
            <div className="text-gray-600">Domains Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">$2.5M+</div>
            <div className="text-gray-600">Value Assessed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">50+</div>
            <div className="text-gray-600">Registrars Compared</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Intelligent Domain Discovery
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Search */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold">AI-Powered Search</h3>
              </div>
              <p className="text-gray-600">
                Advanced LangChain agents analyze your business needs and generate intelligent domain suggestions tailored to your brand.
              </p>
            </div>

            {/* Price Comparison */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-semibold">Price Comparison</h3>
              </div>
              <p className="text-gray-600">
                Real-time pricing across 50+ registrars including Namecheap, GoDaddy, Porkbun, and more to find the best deals.
              </p>
            </div>

            {/* Bitcoin Payments */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Bitcoin className="h-8 w-8 text-orange-500" />
                <h3 className="text-xl font-semibold">Bitcoin Payments</h3>
              </div>
              <p className="text-gray-600">
                Secure, private domain purchases using Bitcoin and Lightning Network for instant, low-fee transactions.
              </p>
            </div>

            {/* Domain Analysis */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-8 w-8 text-yellow-500" />
                <h3 className="text-xl font-semibold">Domain Analysis</h3>
              </div>
              <p className="text-gray-600">
                Comprehensive SEO analysis, brandability scores, and market valuation using machine learning algorithms.
              </p>
            </div>

            {/* Bulk Processing */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
                <h3 className="text-xl font-semibold">Bulk Processing</h3>
              </div>
              <p className="text-gray-600">
                Check availability and analyze hundreds of domains simultaneously with our high-performance processing engine.
              </p>
            </div>

            {/* Market Insights */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-8 w-8 text-red-500" />
                <h3 className="text-xl font-semibold">Market Insights</h3>
              </div>
              <p className="text-gray-600">
                AI-driven market trend analysis and domain investment recommendations based on historical data and patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Perfect Domain?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses using AI to discover premium domains
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Free Search
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="h-6 w-6" />
              <span className="text-lg font-semibold">Domain Intelligence Hub</span>
            </div>
            <div className="text-sm text-gray-400">
              Built with ❤️ and AI • Powered by LangChain & Vercel
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
