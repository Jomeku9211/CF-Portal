export type NewOrgFormData = {
  // Quick Setup
  name: string;
  website: string;
  size: string;
  fundingStatus: string;
  companyFunction: string;
  revenueStatus: string;
  keyInvestors: string[];
  // Purpose & Story
  originStory: string;
  whatWeDo: string;
  whoWeServe: string[];
  vision: string;
  whyJoinUs: string;
  // Growth & Success
  growthPlans: string;
  successMetrics: string[];
  // Culture & Values
  coreValuesToday: string[];
  coreValuesAspirations: string[];
  cultureInAction: string[];
};

export type XanoOrganizationPayload = {
  name: string;
  industry: string; // Not present in new UI -> will be empty string
  website_url: string;
  organization_size: string;
  creator?: string;
  current_funding_status: string;
  key_investors_backers: string;
  revenue_status: string;
  profitability_status: string; // Not present in new UI -> will be empty string
  why_statement: string;
  origin_story: string;
  core_beliefs_principles: string;
  how_we_live_purpose: string;
};

const fundingMap: Record<string, string> = {
  'bootstrapped': 'Bootstrapped',
  'pre-seed': 'Pre-Seed',
  'seed': 'Seed Stage',
  'series-a': 'Series A',
  'series-b-plus': 'Series B+',
  'public': 'Public Company',
};

const revenueMap: Record<string, string> = {
  'pre-revenue': 'Pre-revenue',
  'early-revenue': 'Early Revenue',
  'growing-revenue': 'Growing Revenue',
  'scaled-revenue': 'Scaled Revenue',
};

export function buildXanoPayloadFromOrgProfile(form: NewOrgFormData): XanoOrganizationPayload {
  return {
    name: (form.name || '').trim(),
    industry: '',
    website_url: form.website || '',
    organization_size: form.size || '',
    current_funding_status: fundingMap[form.fundingStatus] || form.fundingStatus || '',
    key_investors_backers: (form.keyInvestors || []).join('; '),
    revenue_status: revenueMap[form.revenueStatus] || form.revenueStatus || '',
    profitability_status: '',
    why_statement: (form.whatWeDo || form.whyJoinUs || '').trim(),
    origin_story: (form.originStory || '').trim(),
    core_beliefs_principles: (form.coreValuesToday || []).join('; '),
    how_we_live_purpose: (form.cultureInAction || []).join('; '),
  };
}

export function validateXanoPayload(payload: XanoOrganizationPayload) {
  const required: Array<keyof XanoOrganizationPayload> = [
    'name',
    'website_url',
    'organization_size',
    'current_funding_status',
    'revenue_status',
    'origin_story',
  ];

  const missing: string[] = [];
  for (const key of required) {
    const value = (payload[key] as string) || '';
    if (!value.trim()) missing.push(key);
  }

  // Highlight known unmapped fields from new UI
  const unmappedFromUI = ['industry', 'profitability_status'];

  return {
    missingRequired: missing,
    knownUnmappedFromUI: unmappedFromUI,
  };
}


