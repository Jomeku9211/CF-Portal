const XANO_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:ZqkMXGPF';

export interface Organization {
  id: string;
  created_at: number;
  name: string;
  industry: string;
  website_url: string;
  organization_size: string;
  current_funding_status: string;
  key_investors_backers: string;
  revenue_status: string;
  profitability_status: string;
  why_statement: string;
  origin_story: string;
  core_beliefs_principles: string;
  how_we_live_purpose: string;
  creator: string;
}

export interface CreateOrganizationData {
  name: string;
  industry: string;
  website_url: string;
  organization_size: string;
  current_funding_status?: string;
  key_investors_backers?: string;
  revenue_status?: string;
  profitability_status?: string;
  why_statement?: string;
  origin_story?: string;
  core_beliefs_principles?: string;
  how_we_live_purpose?: string;
}

export interface OrganizationResponse {
  success: boolean;
  message?: string;
  organization?: Organization;
  organizations?: Organization[];
}

class OrganizationService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async createOrganization(data: CreateOrganizationData): Promise<OrganizationResponse> {
    try {
      const response = await fetch(`${XANO_BASE_URL}/organization`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const organization = await response.json();
        return {
          success: true,
          organization,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to create organization',
        };
      }
    } catch (error) {
      console.error('Create organization error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async getUserOrganizations(): Promise<OrganizationResponse> {
    try {
      const response = await fetch(`${XANO_BASE_URL}/organization`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const organizations = await response.json();
        return {
          success: true,
          organizations,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to fetch organizations',
        };
      }
    } catch (error) {
      console.error('Get organizations error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async getOrganizationById(id: string): Promise<OrganizationResponse> {
    try {
      const response = await fetch(`${XANO_BASE_URL}/organization/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const organization = await response.json();
        return {
          success: true,
          organization,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to fetch organization',
        };
      }
    } catch (error) {
      console.error('Get organization error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async updateOrganization(id: string, data: Partial<CreateOrganizationData>): Promise<OrganizationResponse> {
    try {
      const response = await fetch(`${XANO_BASE_URL}/organization/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const organization = await response.json();
        return {
          success: true,
          organization,
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to update organization',
        };
      }
    } catch (error) {
      console.error('Update organization error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async deleteOrganization(id: string): Promise<OrganizationResponse> {
    try {
      const response = await fetch(`${XANO_BASE_URL}/organization/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Organization deleted successfully',
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Failed to delete organization',
        };
      }
    } catch (error) {
      console.error('Delete organization error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }
}

export const organizationService = new OrganizationService();
