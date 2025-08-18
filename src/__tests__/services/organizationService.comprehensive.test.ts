import { organizationService } from '@/services/organizationService';

// This test requires LIVE_API=1 and AUTH_TOKEN environment variables to be set
// Run with: LIVE_API=1 AUTH_TOKEN=your_token npm test -- organizationService.comprehensive.test.ts

describe('Organization Service - Comprehensive Smoke Test', () => {
  const testOrgData = {
    name: 'Test Organization Smoke Test',
    website: 'https://testorg-smoke.com',
    size: '10-50',
    fundingStatus: 'seed',
    companyFunction: 'saas',
    revenueStatus: 'early-revenue',
    keyInvestors: ['Test Investor 1', 'Test Investor 2'],
    originStory: 'This is a comprehensive test organization created during smoke testing to verify all fields are properly mapped and submitted.',
    whatWeDo: 'We provide comprehensive testing solutions for organization onboarding flows.',
    whoWeServe: ['Startups', 'Scale-ups', 'Enterprise'],
    vision: 'To become the leading testing platform for organization onboarding processes.',
    whyJoinUs: 'Join us to revolutionize how organizations test their onboarding flows.',
    growthPlans: 'Expand to 100+ clients within the next 12 months and launch enterprise features.',
    successMetrics: ['Client satisfaction > 95%', 'Monthly recurring revenue growth', 'Team expansion'],
    coreValuesToday: ['Quality', 'Innovation', 'Customer Focus'],
    coreValuesAspirations: ['Excellence', 'Global Impact', 'Sustainability'],
    cultureInAction: ['Daily standups', 'Weekly retrospectives', 'Monthly team building']
  };

  beforeAll(() => {
    // Set up auth token for the test
    const authToken = process.env.AUTH_TOKEN;
    if (!authToken) {
      console.warn('AUTH_TOKEN not set - test will fail');
      return;
    }
    localStorage.setItem('authToken', authToken);
    console.log('Auth token set for smoke test');
  });

  afterAll(() => {
    localStorage.removeItem('authToken');
    console.log('Auth token cleaned up');
  });

  it('should create organization with all fields populated', async () => {
    // Skip if not running live API test
    if (process.env.LIVE_API !== '1') {
      console.log('Skipping live API test - set LIVE_API=1 to run');
      return;
    }

    const authToken = process.env.AUTH_TOKEN;
    if (!authToken) {
      console.log('Skipping test - AUTH_TOKEN not provided');
      return;
    }

    console.log('🚀 Starting comprehensive organization creation smoke test...');
    console.log('📝 Test data:', JSON.stringify(testOrgData, null, 2));

    try {
      // Create the organization using the service
      const result = await organizationService.createOrganization({
        name: testOrgData.name,
        industry: 'Software & Technology', // Mapped from 'saas'
        website_url: testOrgData.website,
        organization_size: testOrgData.size,
        creator: 'test-user-id', // This will be the logged-in user's ID
        current_funding_status: 'Seed Stage', // Mapped from 'seed'
        key_investors_backers: testOrgData.keyInvestors.join('; '),
        revenue_status: 'Early Revenue', // Mapped from 'early-revenue'
        profitability_status: 'Not Profitable', // Default value
        why_statement: `${testOrgData.whatWeDo} ${testOrgData.whyJoinUs}`,
        origin_story: testOrgData.originStory,
        core_beliefs_principles: testOrgData.coreValuesToday.join('; '),
        how_we_live_purpose: testOrgData.cultureInAction.join('; '),
        // Additional comprehensive fields
        vision: testOrgData.vision,
        growth_plans: testOrgData.growthPlans,
        success_metrics: testOrgData.successMetrics.join('; '),
        who_we_serve: testOrgData.whoWeServe.join('; '),
        core_values_aspirations: testOrgData.coreValuesAspirations.join('; ')
      });

      console.log('📤 API Response:', result);

      if (result.success) {
        console.log('✅ Organization created successfully!');
        console.log('🆔 Organization ID:', result.organization?.id);
        console.log('📅 Created at:', result.organization?.created_at);
        console.log('🏢 Name:', result.organization?.name);
        console.log('🌐 Website:', result.organization?.website_url);
        console.log('👥 Size:', result.organization?.organization_size);
        console.log('💰 Funding Status:', result.organization?.current_funding_status);
        console.log('🎯 Revenue Status:', result.organization?.revenue_status);
        console.log('📖 Origin Story:', result.organization?.origin_story);
        console.log('👁️ Vision:', result.organization?.vision);
        console.log('📈 Growth Plans:', result.organization?.growth_plans);
        console.log('🎯 Success Metrics:', result.organization?.success_metrics);
        console.log('👥 Who We Serve:', result.organization?.who_we_serve);
        console.log('💎 Core Values (Today):', result.organization?.core_beliefs_principles);
        console.log('🌟 Core Values (Aspirations):', result.organization?.core_values_aspirations);
        console.log('🏃 Culture in Action:', result.organization?.how_we_live_purpose);
        
        expect(result.success).toBe(true);
        expect(result.organization).toBeDefined();
        expect(result.organization?.name).toBe(testOrgData.name);
        expect(result.organization?.website_url).toBe(testOrgData.website);
        expect(result.organization?.organization_size).toBe(testOrgData.size);
        expect(result.organization?.current_funding_status).toBe('Seed Stage');
        expect(result.organization?.revenue_status).toBe('Early Revenue');
        expect(result.organization?.origin_story).toBe(testOrgData.originStory);
        expect(result.organization?.vision).toBe(testOrgData.vision);
        expect(result.organization?.growth_plans).toBe(testOrgData.growthPlans);
        expect(result.organization?.success_metrics).toBe(testOrgData.successMetrics.join('; '));
        expect(result.organization?.who_we_serve).toBe(testOrgData.whoWeServe.join('; '));
        expect(result.organization?.core_beliefs_principles).toBe(testOrgData.coreValuesToday.join('; '));
        expect(result.organization?.core_values_aspirations).toBe(testOrgData.coreValuesAspirations.join('; '));
        expect(result.organization?.how_we_live_purpose).toBe(testOrgData.cultureInAction.join('; '));
      } else {
        console.error('❌ Organization creation failed:', result.message);
        console.error('🔍 Full error details:', result);
        expect(result.success).toBe(true); // This will fail the test
      }
    } catch (error) {
      console.error('💥 Test execution failed:', error);
      throw error;
    }
  }, 30000); // 30 second timeout for API calls
});
