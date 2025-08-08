import axios from 'axios'
import type { RegistrarAdapter, RegistrarPrice } from './types'
import { cache } from '@/lib/cache'

// Porkbun API docs: https://porkbun.com/api/json/v3/documentation
// We'll use domain/price/retrieve/{tld} to fetch pricing and
a
export const PorkbunAdapter: RegistrarAdapter = {
  name: 'Porkbun',
  enabled() {
    return Boolean(process.env.PORKBUN_API_KEY && process.env.PORKBUN_SECRET_KEY)
  },
  async check(domain: string): Promise<RegistrarPrice> {
    const apiKey = process.env.PORKBUN_API_KEY!
    const secret = process.env.PORKBUN_SECRET_KEY!

    try {
      if (!this.enabled()) throw new Error('not_configured')

      const cached = cache.get<RegistrarPrice>(`porkbun:${domain}`)
      if (cached) return cached

      // Porkbun availability endpoint: domain/check
      // Pricing endpoint is per TLD; for demo we attempt a simple pricing fetch by TLD
      const [sld, ...tldParts] = domain.split('.')
      const tld = tldParts.join('.')

      // Availability
      const availRes = await axios.post(
        'https://porkbun.com/api/json/v3/domain/check',
        { apikey: apiKey, secretapi: secret, domain }
      )

      const available = availRes.data?.status === 'SUCCESS' && availRes.data?.results?.[0]?.status === 'available'

      // Pricing (purchase price). Porkbun has /domain/price/retrieve/{tld}
      let price: number | undefined
      let renewalPrice: number | undefined
      try {
        const priceRes = await axios.post(
          `https://porkbun.com/api/json/v3/domain/price/retrieve/${encodeURIComponent(tld)}`,
          { apikey: apiKey, secretapi: secret }
        )
        if (priceRes.data?.status === 'SUCCESS') {
          const p = priceRes.data?.pricing
          price = Number(p?.registration?.price) || Number(p?.registration) || undefined
          renewalPrice = Number(p?.renewal?.price) || Number(p?.renewal) || price
        }
      } catch (e) {
        // pricing optional; ignore
      }

      const result: RegistrarPrice = {
        registrar: this.name,
        price,
        renewalPrice,
        currency: 'USD',
        available: Boolean(available),
      }

      cache.set(`porkbun:${domain}`, result, 60_000)
      return result
    } catch (e: any) {
      return { registrar: this.name, available: false, error: e.message || 'error' }
    }
  }
}

