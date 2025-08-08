type CacheEntry<T> = { value: T; expiresAt: number }

class TTLCache {
  private store = new Map<string, CacheEntry<any>>()

  constructor(private defaultTtlMs = 60_000) {}

  get<T>(key: string): T | undefined {
    const entry = this.store.get(key)
    if (!entry) return undefined
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return undefined
    }
    return entry.value as T
  }

  set<T>(key: string, value: T, ttlMs?: number) {
    const expiresAt = Date.now() + (ttlMs ?? this.defaultTtlMs)
    this.store.set(key, { value, expiresAt })
  }
}

export const cache = new TTLCache(2 * 60_000) // 2 minutes default TTL

