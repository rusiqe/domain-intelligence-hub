export type Currency = 'USD' | 'EUR' | 'GBP' | string;

export interface RegistrarPrice {
  registrar: string;
  price?: number; // purchase price
  renewalPrice?: number;
  transferPrice?: number;
  currency?: Currency;
  promoPrice?: number;
  promoEndDate?: string;
  available: boolean;
  error?: string;
}

export interface RegistrarAdapter {
  name: string;
  enabled(): boolean;
  check(domain: string): Promise<RegistrarPrice>;
}

