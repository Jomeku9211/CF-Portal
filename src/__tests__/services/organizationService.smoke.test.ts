/**
 * Real API smoke test (opt-in)
 * Run with: LIVE_API=1 AUTH_TOKEN=your_token npm test -- organizationService.smoke.test.ts
 */

import { organizationService } from '../../services/organizationService';

const LIVE = process.env.LIVE_API === '1' || process.env.LIVE_API === 'true';
const AUTH_TOKEN = process.env.AUTH_TOKEN || '';

describe('organizationService LIVE smoke', () => {
  const originalLocalStorage = global.localStorage;

  beforeAll(() => {
    if (!LIVE) return;
    // Inject token into localStorage shim
    // @ts-expect-error
    const store: Record<string, string> = {};
    // @ts-expect-error
    global.localStorage = {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => { store[k] = v; },
      removeItem: (k: string) => { delete store[k]; },
      clear: () => { for (const k of Object.keys(store)) delete store[k]; },
      key: (i: number) => Object.keys(store)[i] || null,
      length: 0,
    } as any;
    localStorage.setItem('authToken', AUTH_TOKEN);
  });

  afterAll(() => {
    if (!LIVE) return;
    // @ts-expect-error
    global.localStorage = originalLocalStorage;
  });

  (LIVE ? it : it.skip)('creates an organization with minimal valid payload', async () => {
    const res = await organizationService.createOrganization({
      name: 'Smoke Test Org',
      industry: '',
      website_url: 'https://example.com',
      organization_size: '1-10',
      current_funding_status: 'Bootstrapped',
      revenue_status: 'Pre-revenue',
      profitability_status: '',
      why_statement: 'Test',
      origin_story: 'Test',
      core_beliefs_principles: 'Test',
      how_we_live_purpose: 'Test',
    });
    expect(res.success).toBe(true);
    expect(res.organization?.id).toBeTruthy();
  });
});


