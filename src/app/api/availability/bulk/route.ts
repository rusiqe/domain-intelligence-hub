import { NextRequest, NextResponse } from 'next/server'
import { comparePrices } from '@/lib/domain-apis'

function extractDomains(text: string): string[] {
  // Extract domain-like tokens from text (very simple heuristic)
  const tokens = text
    .split(/[\s,;\n\r\t]+/)
    .map(t => t.trim().toLowerCase())
    .filter(Boolean)
  // Basic domain regex: labels + dot + tld
  const re = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/
  const domains = Array.from(new Set(tokens.filter(t => re.test(t))))
  return domains.slice(0, 500) // hard cap
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || ''

    let domains: string[] = []
    if (contentType.includes('application/json')) {
      const body = await req.json()
      if (Array.isArray(body?.domains)) {
        domains = body.domains
          .map((d: any) => String(d || '').trim().toLowerCase())
          .filter(Boolean)
      } else if (typeof body?.text === 'string') {
        domains = extractDomains(body.text)
      }
    } else if (contentType.includes('multipart/form-data')) {
      const form = await req.formData()
      const file = form.get('file') as File | null
      const text = form.get('text') as string | null
      if (file) {
        const content = await file.text()
        domains = extractDomains(content)
      } else if (text) {
        domains = extractDomains(text)
      }
    } else if (contentType.includes('text/plain')) {
      const raw = await req.text()
      domains = extractDomains(raw)
    } else {
      return NextResponse.json({ success: false, error: 'Unsupported content type' }, { status: 400 })
    }

    if (!domains.length) {
      return NextResponse.json({ success: false, error: 'No domains provided' }, { status: 400 })
    }

    // Process in parallel with modest concurrency
    const chunks: string[][] = []
    const concurrency = 8
    for (let i = 0; i < domains.length; i += concurrency) {
      chunks.push(domains.slice(i, i + concurrency))
    }

    const results: any[] = []
    const start = Date.now()

    for (const chunk of chunks) {
      const batch = await Promise.all(
        chunk.map(async (domain) => {
          const prices = await comparePrices(domain)
          const available = prices.some(p => p.available)
          const best = prices
            .filter(p => p.available && typeof p.price === 'number')
            .sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))[0]
          return {
            domain,
            available,
            bestPrice: best ? { registrar: best.registrar, price: best.price, currency: best.currency || 'USD' } : null,
            registrars: prices,
          }
        })
      )
      results.push(...batch)
    }

    return NextResponse.json({
      success: true,
      data: {
        total: domains.length,
        processed: results.length,
        durationMs: Date.now() - start,
        results,
      },
      timestamp: new Date(),
    })
  } catch (e: any) {
    console.error('Bulk availability error', e)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

