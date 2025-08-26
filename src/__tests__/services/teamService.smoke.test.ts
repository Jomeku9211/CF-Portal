/**
 * LIVE smoke test for Team creation
 * Run with (requires a valid token):
 *   LIVE_API=1 AUTH_TOKEN=your_token [ORGANIZATION_ID=org_id] npm test -- teamService.smoke.test.ts
 */

import { organizationService } from '../../services/organizationService';
import { teamService } from '../../services/teamService';

const LIVE = process.env.LIVE_API === '1' || process.env.LIVE_API === 'true';
const AUTH_TOKEN = process.env.AUTH_TOKEN || '';
const ORGANIZATION_ID = process.env.ORGANIZATION_ID || '';

describe('teamService LIVE smoke', () => {
  let originalLocalStorage: any;
  let originalFetch: any;

  beforeAll(() => {
    if (!LIVE) return;

    // Inject token into localStorage shim
    const store: Record<string, string> = {};
    originalLocalStorage = (global as any).localStorage;
    (global as any).localStorage = {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => { store[k] = v; },
      removeItem: (k: string) => { delete store[k]; },
      clear: () => { for (const k of Object.keys(store)) delete store[k]; },
      key: (i: number) => Object.keys(store)[i] || null,
      length: 0,
    } as any;
    if (AUTH_TOKEN) {
      localStorage.setItem('authToken', AUTH_TOKEN);
    }

    // Provide global fetch from node-fetch for Node environment
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    originalFetch = (global as any).fetch;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    (global as any).fetch = require('node-fetch');
  });

  afterAll(() => {
    if (!LIVE) return;
    if (originalLocalStorage) (global as any).localStorage = originalLocalStorage;
    if (originalFetch) (global as any).fetch = originalFetch;
  });

  (LIVE ? it : it.skip)('creates a team under an existing organization', async () => {
    expect(AUTH_TOKEN).toBeTruthy();

    let organizationId = ORGANIZATION_ID;
    if (!organizationId) {
      const orgRes = await organizationService.getUserOrganizations();
      expect(orgRes.success).toBe(true);
      expect(orgRes.organizations && orgRes.organizations.length).toBeGreaterThan(0);
      organizationId = orgRes.organizations![0].id as string;
    }

    const res = await teamService.createTeam({
      organization_id: organizationId,
      name: `Smoke Team ${Date.now()}`,
      structure_preference: 'Flat',
      pace_of_work: 'Fast-paced',
      autonomy: 'High',
      initiative_level: 'Proactive',
      decision_making_style: 'Consensus',
      attention_to_detail: 'High',
      team_age_composition: 'Mixed',
      team_gender_composition: 'Mixed',
      multitasking_ability: 'High',
      working_hours_energy_flow: 'Flexible',
      preferred_communication_style: 'Async-first',
      cultural_diversity_alignment: 'Inclusive',
    });

    expect(res.success).toBe(true);
    expect(res.team?.id).toBeTruthy();
  });
});




