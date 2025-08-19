import { buildXanoPayloadFromOrgProfile } from '../../services/organizationMapper';

describe('organizationMapper smoke (mapping enums)', () => {
  const baseForm = {
    name: 'Smoke Co',
    website: 'https://smoke.example',
    size: '11-50',
    fundingStatus: 'bootstrapped',
    companyFunction: 'saas',
    revenueStatus: 'pre-revenue',
    profitabilityStatus: 'not-profitable',
    keyInvestors: ['Angel A', 'Angel B'],
    originStory: 'Started small',
    whatWeDo: 'We build things',
    whoWeServe: ['SMBs'],
    vision: 'Be great',
    whyJoinUs: 'Great culture',
    growthPlans: 'Expand globally',
    successMetrics: ['ARR', 'NPS'],
    coreValuesToday: ['Integrity'],
    coreValuesAspirations: ['Innovation'],
    cultureInAction: ['Weekly demos']
  } as any;

  test.each([
    { companyFunction: 'saas', expectedIndustry: 'saas' },
    { companyFunction: 'fintech', expectedIndustry: 'fintech' },
    { companyFunction: 'healthtech', expectedIndustry: 'healthtech' },
    { companyFunction: 'edtech', expectedIndustry: 'edtech' },
    { companyFunction: 'agency', expectedIndustry: 'agency' },
    { companyFunction: 'ecommerce', expectedIndustry: 'ecommerce' },
    { companyFunction: 'other', expectedIndustry: 'other' },
  ])('maps companyFunction %p to industry', ({ companyFunction, expectedIndustry }) => {
    const payload = buildXanoPayloadFromOrgProfile({ ...baseForm, companyFunction } as any);
    expect(payload.industry).toBe(expectedIndustry);
  });

  test('builds a minimally valid payload shape', () => {
    const payload = buildXanoPayloadFromOrgProfile(baseForm);
    expect(payload).toMatchObject({
      name: 'Smoke Co',
      website_url: 'https://smoke.example',
      organization_size: '11-50',
      current_funding_status: expect.any(String),
      revenue_status: expect.any(String),
      origin_story: 'Started small',
    });
    expect(typeof payload.core_beliefs_principles).toBe('string');
    expect(typeof payload.how_we_live_purpose).toBe('string');
  });
});


