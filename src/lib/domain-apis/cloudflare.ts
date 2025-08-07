import type { RegistrarAdapter, RegistrarPrice } from './types'

// Cloudflare Registrar is only available to transfer/hold for CF managed domains.
// We'll mock basic availability and price signals.
export const CloudflareAdapter: RegistrarAdapter = {
  name: 'Cloudflare',
  enabled() {
    return Boolean(process.env.CLOUDFLARE_API_TOKEN)
  },
  async check(domain: string): Promise<RegistrarPrice> {
    try {
      if (!this.enabled()) throw new Error('not_configured')
      return { registrar: this.name, price: 8.03, renewalPrice: 8.03, currency: 'USD', available: Math.random() > 0.5 }
    } catch (e: any) {
      return { registrar: this.name, available: false, error: e.message || 'error' }
    }
  }
}

