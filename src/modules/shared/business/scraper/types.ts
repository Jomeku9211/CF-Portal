export interface Prospect {
  fullName: string;
  linkedInUrl: string;
  [key: string]: any;
}

export interface ScrapeStats {
  total: number;
  processed: number;
  inserted: number;
  duplicates: number;
  errors: number;
  rateLimitHits: number;
  lastUrl?: string;
}


