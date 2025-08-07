import type { RegistrarAdapter, RegistrarPrice } from './types'

export const PorkbunAdapter: RegistrarAdapter = {
  name: 'Porkbun',
  enabled() {
    return Boolean(process.env.PORKBUN_API_KEY && process.env.PORKBUN_SECRET_KEY)
  },
  async check(domain: string): Promise<RegistrarPrice> {
    try {
      if (!this.enabled()) throw new Error('not_configured')
      // Placeholder: call Porkbun API
      return { registrar: this.name, price: 9.73, renewalPrice: 10.37, currency: 'USD', available: Math.random() > 0.35 }
    } catch (e: any) {
      return { registrar: this.name, available: false, error: e.message || 'error' }
    }
  }
}

