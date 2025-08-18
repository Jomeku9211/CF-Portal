import { organizationService } from '../../services/organizationService';

// Mock fetch globally
global.fetch = jest.fn();

describe('OrganizationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createOrganization', () => {
    const mockOrganizationData = {
      name: 'Test Organization',
      industry: 'technology',
      website_url: 'https://test.com',
      organization_size: '1-10',
      current_funding_status: 'bootstrapped',
      key_investors_backers: 'Self-funded',
      revenue_status: 'pre-revenue',
      profitability_status: 'not-profitable',
      why_statement: 'To solve problems',
      origin_story: 'Started as a side project',
      core_beliefs_principles: 'Innovation; Quality',
      how_we_live_purpose: 'Customer first; Agile',
    };

    test('successfully creates organization with valid data', async () => {
      const mockResponse = {
        id: 'org-123',
        created_at: Date.now(),
        ...mockOrganizationData,
        creator: 'user-123'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // Set auth token
      localStorage.setItem('authToken', 'test-token');

      const result = await organizationService.createOrganization(mockOrganizationData);

      expect(result.success).toBe(true);
      expect(result.organization).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:ZqkMXGPF/organization',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: JSON.stringify(mockOrganizationData),
        }
      );
    });

    test('handles API error responses', async () => {
      const errorResponse = {
        message: 'Validation failed',
        errors: ['Name is required', 'Industry is required']
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => errorResponse,
      });

      localStorage.setItem('authToken', 'test-token');

      const result = await organizationService.createOrganization(mockOrganizationData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Validation failed');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('handles network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      localStorage.setItem('authToken', 'test-token');

      const result = await organizationService.createOrganization(mockOrganizationData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Network error occurred');
    });

    test('sends request without auth token when not available', async () => {
      const mockResponse = {
        id: 'org-123',
        created_at: Date.now(),
        ...mockOrganizationData,
        creator: 'user-123'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // Don't set auth token
      const result = await organizationService.createOrganization(mockOrganizationData);

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:ZqkMXGPF/organization',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockOrganizationData),
        }
      );
    });

    test('handles malformed JSON response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      localStorage.setItem('authToken', 'test-token');

      const result = await organizationService.createOrganization(mockOrganizationData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Network error occurred');
    });
  });

  describe('getUserOrganizations', () => {
    test('successfully fetches user organizations', async () => {
      const mockOrganizations = [
        {
          id: 'org-1',
          name: 'Organization 1',
          industry: 'technology',
          website_url: 'https://org1.com',
          organization_size: '1-10',
          current_funding_status: 'bootstrapped',
          key_investors_backers: '',
          revenue_status: 'pre-revenue',
          profitability_status: 'not-profitable',
          why_statement: 'To solve problems',
          origin_story: 'Started as a side project',
          core_beliefs_principles: 'Innovation',
          how_we_live_purpose: 'Customer first',
          creator: 'user-123',
          created_at: Date.now()
        }
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrganizations,
      });

      localStorage.setItem('authToken', 'test-token');

      const result = await organizationService.getUserOrganizations();

      expect(result.success).toBe(true);
      expect(result.organizations).toEqual(mockOrganizations);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:ZqkMXGPF/organization',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
        }
      );
    });
  });

  describe('getOrganizationById', () => {
    test('successfully fetches organization by ID', async () => {
      const mockOrganization = {
        id: 'org-123',
        name: 'Test Organization',
        industry: 'technology',
        website_url: 'https://test.com',
        organization_size: '1-10',
        current_funding_status: 'bootstrapped',
        key_investors_backers: '',
        revenue_status: 'pre-revenue',
        profitability_status: 'not-profitable',
        why_statement: 'To solve problems',
        origin_story: 'Started as a side project',
        core_beliefs_principles: 'Innovation',
        how_we_live_purpose: 'Customer first',
        creator: 'user-123',
        created_at: Date.now()
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrganization,
      });

      localStorage.setItem('authToken', 'test-token');

      const result = await organizationService.getOrganizationById('org-123');

      expect(result.success).toBe(true);
      expect(result.organization).toEqual(mockOrganization);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:ZqkMXGPF/organization/org-123',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
        }
      );
    });
  });

  describe('updateOrganization', () => {
    test('successfully updates organization', async () => {
      const updateData = {
        name: 'Updated Organization Name',
        industry: 'healthcare'
      };

      const mockUpdatedOrganization = {
        id: 'org-123',
        ...updateData,
        website_url: 'https://test.com',
        organization_size: '1-10',
        current_funding_status: 'bootstrapped',
        key_investors_backers: '',
        revenue_status: 'pre-revenue',
        profitability_status: 'not-profitable',
        why_statement: 'To solve problems',
        origin_story: 'Started as a side project',
        core_beliefs_principles: 'Innovation',
        how_we_live_purpose: 'Customer first',
        creator: 'user-123',
        created_at: Date.now()
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUpdatedOrganization,
      });

      localStorage.setItem('authToken', 'test-token');

      const result = await organizationService.updateOrganization('org-123', updateData);

      expect(result.success).toBe(true);
      expect(result.organization).toEqual(mockUpdatedOrganization);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:ZqkMXGPF/organization/org-123',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
          body: JSON.stringify(updateData),
        }
      );
    });
  });

  describe('deleteOrganization', () => {
    test('successfully deletes organization', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Deleted successfully' }),
      });

      localStorage.setItem('authToken', 'test-token');

      const result = await organizationService.deleteOrganization('org-123');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Organization deleted successfully');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:ZqkMXGPF/organization/org-123',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          },
        }
      );
    });
  });
});
