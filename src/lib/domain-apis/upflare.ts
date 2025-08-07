import type { RegistrarAdapter, RegistrarPrice } from './types'

// Upflare: placeholder adapter (treat like generic registrar)
export const UpflareAdapter: RegistrarAdapter = {
  name: 'Upflare',
  enabled() {
    return Boolean(process.env.UPFLARE_API_KEY)
  },
  async check(domain: string): Promise<RegistrarPrice> {
    try {
      if (!this.enabled()) throw new Error('not_configured')
      return { registrar: this.name, price: 10.49, renewalPrice: 12.49, currency: 'USD', available: Math.random() > 0.45 }
    } catch (e: any) {
      return { registrar: this.name, available: false, error: e.message || 'error' }
    }
  }
}

