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
  // Additional comprehensive fields
  vision?: string;
  growth_plans?: string;
  success_metrics?: string;
  who_we_serve?: string;
  core_values_aspirations?: string;
}

export interface CreateOrganizationData {
  name: string;
  industry?: string;
  website_url: string;
  organization_size: string;
  creator?: string;
  current_funding_status?: string;
  key_investors_backers?: string;
  revenue_status?: string;
  profitability_status?: string;
  why_statement?: string;
  what_we_do?: string;
  why_join_us?: string;
  origin_story?: string;
  core_beliefs_principles?: string;
  how_we_live_purpose?: string;
  // Additional comprehensive fields
  vision?: string;
  growth_plans?: string;
  success_metrics?: string;
  who_we_serve?: string;
  core_values_aspirations?: string;
  core_value_aspiration?: string;
  company_function?: string;
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
    console.log('Auth token for organization service:', token ? 'Present' : 'Missing');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async createOrganization(data: CreateOrganizationData): Promise<OrganizationResponse> {
    try {
      console.log('Sending request to:', `${XANO_BASE_URL}/organization`);
      console.log('Request headers:', this.getAuthHeaders());
      console.log('Request body:', JSON.stringify(data, null, 2));
      
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
        // Safely gather as much error info as possible
        let errorData: any = null;
        let rawBody = '';
        try {
          rawBody = await response.clone().text();
        } catch {}
        try {
          errorData = await response.json();
        } catch {}
        console.error('Organization creation failed:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          rawBody,
          requestPayload: data
        });
        // Fallback: If industry enum is rejected, retry once without industry
        const errorText = `${errorData?.message || ''} ${Array.isArray(errorData?.errors) ? errorData.errors.join(', ') : ''} ${rawBody}`.toLowerCase();
        const looksLikeIndustryEnumError = response.status === 400 && (errorText.includes('industry') && errorText.includes('allowable values'));
        if (looksLikeIndustryEnumError) {
          const retryPayload = { ...data } as any;
          delete retryPayload.industry;
          console.warn('Retrying createOrganization without industry due to enum validation error');
          const retryRes = await fetch(`${XANO_BASE_URL}/organization`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(retryPayload),
          });
          if (retryRes.ok) {
            const organization = await retryRes.json();
            return { success: true, organization };
          }
        }

        const extractedMessage =
          (errorData && (errorData.message || errorData.error || errorData.detail)) ||
          (Array.isArray(errorData?.errors) ? errorData.errors.join(', ') : '') ||
          (rawBody || '').slice(0, 300) ||
          'Failed to create organization';
        return {
          success: false,
          message: `${extractedMessage} (${response.status})`,
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
