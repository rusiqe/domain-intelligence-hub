import type { RegistrarAdapter, RegistrarPrice } from './types'

export const GoDaddyAdapter: RegistrarAdapter = {
  name: 'GoDaddy',
  enabled() {
    return Boolean(process.env.GODADDY_API_KEY && process.env.GODADDY_API_SECRET)
  },
  async check(domain: string): Promise<RegistrarPrice> {
    try {
      if (!this.enabled()) throw new Error('not_configured')
      // Placeholder: call GoDaddy API
      return { registrar: this.name, price: 14.99, renewalPrice: 18.99, currency: 'USD', available: Math.random() > 0.4 }
    } catch (e: any) {
      return { registrar: this.name, available: false, error: e.message || 'error' }
    }
  }
}

