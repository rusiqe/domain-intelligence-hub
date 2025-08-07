// Domain Types
export interface Domain {
  name: string
  tld: string
  available: boolean
  price?: number
  registrar?: string
  expirationDate?: Date
  createdDate?: Date
  updatedDate?: Date
}

export interface DomainAnalysis {
  domain: string
  seoScore: number
  brandabilityScore: number
  marketValue: number
  memorabilityScore: number
  pronunciationScore: number
  lengthScore: number
  keywordRelevance: number
  socialMediaAvailability: {
    twitter: boolean
    facebook: boolean
    instagram: boolean
    linkedin: boolean
  }
  trademarkRisk: 'low' | 'medium' | 'high'
  competitiveAnalysis: {
    similarDomains: string[]
    marketPosition: string
  }
}

export interface DomainSuggestion {
  domain: string
  confidence: number
  reasoning: string
  category: 'exact' | 'brandable' | 'compound' | 'alternative'
  pricing: PricingInfo[]
}

export interface PricingInfo {
  registrar: string
  price: number
  currency: string
  renewalPrice: number
  transferPrice?: number
  promoPrice?: number
  promoEndDate?: Date
}

// Search Types
export interface SearchQuery {
  keywords: string[]
  businessType?: string
  targetAudience?: string
  budget?: number
  preferredTlds?: string[]
  excludeWords?: string[]
  brandable?: boolean
  maxLength?: number
  includeHyphens?: boolean
  includeNumbers?: boolean
}

export interface SearchResult {
  query: SearchQuery
  suggestions: DomainSuggestion[]
  totalResults: number
  searchTime: number
  aiInsights: string
}

// AI Types
export interface AIAgent {
  name: string
  description: string
  model: string
  temperature: number
  maxTokens: number
}

export interface LangChainConfig {
  openaiApiKey: string
  model: string
  temperature: number
  maxTokens: number
  agents: AIAgent[]
}

// Bitcoin/Payment Types
export interface BitcoinPayment {
  id: string
  domain: string
  amount: number
  currency: 'BTC' | 'USD'
  address: string
  paymentHash?: string
  invoice?: string
  status: 'pending' | 'confirmed' | 'failed' | 'expired'
  createdAt: Date
  updatedAt: Date
  confirmations: number
  requiredConfirmations: number
}

export interface LightningInvoice {
  paymentRequest: string
  paymentHash: string
  amount: number
  description: string
  expiresAt: Date
  settled: boolean
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: Date
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Registrar Types
export interface RegistrarConfig {
  name: string
  apiKey: string
  apiSecret?: string
  baseUrl: string
  rateLimit: number
  supportedTlds: string[]
}

export interface DomainAvailability {
  domain: string
  available: boolean
  price?: number
  currency?: string
  registrar: string
  checkedAt: Date
}

// Analytics Types
export interface DomainMetrics {
  domain: string
  traffic: number
  backlinks: number
  domainAuthority: number
  pageAuthority: number
  trustFlow: number
  citationFlow: number
  referringDomains: number
  organicKeywords: number
  estimatedValue: number
}

// User Types (for future authentication)
export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  plan: 'free' | 'pro' | 'enterprise'
  credits: number
  createdAt: Date
  updatedAt: Date
}

export interface UserSession {
  user: User
  expires: Date
  accessToken: string
}
