import axios from 'axios'
import type { RegistrarAdapter, RegistrarPrice } from './types'

export const NamecheapAdapter: RegistrarAdapter = {
  name: 'Namecheap',
  enabled() {
    return Boolean(process.env.NAMECHEAP_API_KEY && process.env.NAMECHEAP_API_USER)
  },
  async check(domain: string): Promise<RegistrarPrice> {
    try {
      if (!this.enabled()) throw new Error('not_configured')
      // Placeholder: call Namecheap API pricing/availability endpoint here
      // Return mock until configured
      return { registrar: this.name, price: 12.98, renewalPrice: 14.98, currency: 'USD', available: Math.random() > 0.3 }
    } catch (e: any) {
      return { registrar: this.name, available: false, error: e.message || 'error' }
    }
  }
}

