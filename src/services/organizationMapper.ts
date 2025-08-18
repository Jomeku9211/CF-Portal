export type NewOrgFormData = {
  // Quick Setup
  name: string;
  website: string;
  size: string;
  fundingStatus: string;
  companyFunction: string;
  revenueStatus: string;
  profitabilityStatus?: string;
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
  industry: string;
  website_url: string;
  organization_size: string;
  creator?: string;
  current_funding_status: string;
  key_investors_backers: string;
  revenue_status: string;
  profitability_status: string;
  why_statement: string;
  origin_story: string;
  core_beliefs_principles: string;
  how_we_live_purpose: string;
  // Additional fields for comprehensive mapping
  vision?: string;
  growth_plans?: string;
  success_metrics?: string;
  who_we_serve?: string;
  core_values_aspirations?: string;
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

const profitabilityMap: Record<string, string> = {
  'not-profitable': 'Not Profitable',
  'breakeven': 'Breakeven',
  'profitable': 'Profitable',
  'highly-profitable': 'Highly Profitable',
};

const industryMap: Record<string, string> = {
  'saas': 'Software & Technology',
  'ecommerce': 'E-commerce & Retail',
  'fintech': 'Financial Services',
  'healthtech': 'Healthcare & Life Sciences',
  'edtech': 'Education & Training',
  'agency': 'Professional Services',
  'other': 'Other Industries',
};

export function buildXanoPayloadFromOrgProfile(form: NewOrgFormData, creatorId?: string): XanoOrganizationPayload {
  return {
    name: (form.name || '').trim(),
    industry: industryMap[form.companyFunction] || form.companyFunction || 'Other Industries',
    website_url: form.website || '',
    organization_size: form.size || '',
    creator: creatorId,
    current_funding_status: fundingMap[form.fundingStatus] || form.fundingStatus || '',
    key_investors_backers: (form.keyInvestors || []).join('; '),
    revenue_status: revenueMap[form.revenueStatus] || form.revenueStatus || '',
    profitability_status: profitabilityMap[form.profitabilityStatus || ''] || 'Not Profitable',
    why_statement: (form.whatWeDo || form.whyJoinUs || '').trim(),
    origin_story: (form.originStory || '').trim(),
    core_beliefs_principles: (form.coreValuesToday || []).join('; '),
    how_we_live_purpose: (form.cultureInAction || []).join('; '),
    // Additional comprehensive fields
    vision: (form.vision || '').trim(),
    growth_plans: (form.growthPlans || '').trim(),
    success_metrics: (form.successMetrics || []).join('; '),
    who_we_serve: (form.whoWeServe || []).join('; '),
    core_values_aspirations: (form.coreValuesAspirations || []).join('; '),
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
  const unmappedFromUI = ['profitability_status'];

  return {
    missingRequired: missing,
    knownUnmappedFromUI: unmappedFromUI,
  };
}


