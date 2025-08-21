export interface RoleOption {
  id: string;
  name: string;
  description: string;
  buttonLabel: string;
  icon: string;
}

export interface RoleServiceResponse {
  success: boolean;
  data?: RoleOption[];
  message?: string;
}

class RoleService {
  async getRoleOptions(): Promise<RoleServiceResponse> {
    try {
      // TEMPORARY: Use mock data instead of API call for now
      // TODO: Fix authentication issue with the roles API
      console.log('Using mock role data instead of API call');
      
      const mockRoles: RoleOption[] = [
        {
          id: 'client',
          name: 'Client',
          description: 'I\'m an IT founder or HR looking to hire developers for my company or team.',
          buttonLabel: 'Hire Talent',
          icon: 'users'
        },
        {
          id: 'freelancer',
          name: 'Service Provider',
          description: 'I\'m a developer who wants to list myself and get hired by startups and companies.',
          buttonLabel: 'List Myself',
          icon: 'user'
        },
        {
          id: 'agency',
          name: 'Agency Owner',
          description: 'I run a team or agency and want to list my employees for outsourced projects.',
          buttonLabel: 'List My Team',
          icon: 'building'
        }
      ];

      console.log('Mock role options:', mockRoles);
      return { success: true, data: mockRoles };

      // ORIGINAL API CALL CODE (commented out for now):
      /*
      console.log('Making API call to:', 'https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/roles');
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/roles', {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const data = await response.json();
        console.log('Raw API response data:', data);
        return { success: true, data };
      }

      let errorMsg = '';
      try {
        const errorData = await response.json();
        errorMsg = errorData?.message || errorData?.error || '';
        console.error('Error response data:', errorData);
      } catch {}
      
      return { success: false, message: errorMsg || `Failed to fetch roles (${response.status})` };
      */
    } catch (error) {
      console.error('Network error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  }
}

export const roleService = new RoleService();
