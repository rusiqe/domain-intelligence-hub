import { NamecheapAdapter } from './namecheap'
import { GoDaddyAdapter } from './godaddy'
import { PorkbunAdapter } from './porkbun'
import { CloudflareAdapter } from './cloudflare'
import { UpflareAdapter } from './upflare'
import type { RegistrarAdapter, RegistrarPrice } from './types'

export const REGISTRARS: RegistrarAdapter[] = [
  NamecheapAdapter,
  GoDaddyAdapter,
  PorkbunAdapter,
  CloudflareAdapter,
  UpflareAdapter,
]

export async function comparePrices(domain: string): Promise<RegistrarPrice[]> {
  const checks = REGISTRARS.map(async (adapter) => {
    try {
      return await adapter.check(domain)
    } catch (e: any) {
      return { registrar: adapter.name, available: false, error: e.message || 'error' }
    }
  })
  const results = await Promise.all(checks)
  // Bubble available prices first, then unavailable or errored
  return results.sort((a, b) => {
    const aKey = (a.available ? 0 : 1)
    const bKey = (b.available ? 0 : 1)
    if (aKey !== bKey) return aKey - bKey
    const ap = a.price ?? Number.POSITIVE_INFINITY
    const bp = b.price ?? Number.POSITIVE_INFINITY
    return ap - bp
  })
}

