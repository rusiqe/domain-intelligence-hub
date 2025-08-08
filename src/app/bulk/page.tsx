"use client"

import { useState } from 'react'

interface BulkResult {
  domain: string
  available: boolean
  bestPrice: { registrar: string; price: number; currency: string } | null
  registrars: { registrar: string; price?: number; renewalPrice?: number; available: boolean; currency?: string; error?: string }[]
}

export default function BulkPage() {
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<BulkResult[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResults([])

    try {
      setLoading(true)
      let res: Response

      if (file) {
        const form = new FormData()
        form.append('file', file)
        if (text.trim()) form.append('text', text)
        res = await fetch('/api/availability/bulk', { method: 'POST', body: form })
      } else if (text.trim()) {
        res = await fetch('/api/availability/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        })
      } else {
        throw new Error('Provide a file or paste domains/text')
      }

      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Bulk search failed')
      setResults(data.data.results)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Bulk Domain Search</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Paste domains or text</label>
          <textarea
            className="w-full min-h-[140px] p-3 border rounded-md"
            placeholder="example.com\nmybrand.io\nawesome.ai"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Or upload a file (CSV/TXT)</label>
          <input type="file" accept=".txt,.csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-md bg-blue-600 text-white disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Domains'}
        </button>

        {error && <div className="text-red-600">{error}</div>}
      </form>

      {results.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <div className="space-y-3">
            {results.map((r) => (
              <div key={r.domain} className="p-4 bg-white border rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{r.domain}</div>
                    <div className="text-sm text-gray-600">{r.available ? 'Available' : 'Unavailable'}</div>
                  </div>
                  <div className="text-sm">
                    {r.bestPrice ? (
                      <span>
                        Best: {r.bestPrice.currency} {r.bestPrice.price.toFixed(2)} @ {r.bestPrice.registrar}
                      </span>
                    ) : (
                      <span className="text-gray-400">No pricing</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

