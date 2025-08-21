export interface RoleCategory {
  id: string;
  name: string;
  description: string;
  role_id: string;
  metadata?: any; // Add metadata field for additional data
}

export interface RoleCategoryResponse {
  success: boolean;
  data?: RoleCategory[];
  message?: string;
}

class RoleCategoryService {
  async getRoleCategories(roleId: string): Promise<RoleCategoryResponse> {
    try {
      console.log('Fetching role categories for role:', roleId);
      
      // TEMPORARY: Use mock data instead of API call for now
      // TODO: Fix authentication issue with the role categories API
      console.log('Using mock role category data instead of API call');
      
      const mockCategories: RoleCategory[] = [
        // Client categories
        {
          id: 'founder',
          name: 'Founder',
          description: 'Company founder or co-founder looking to build a team',
          role_id: 'client',
          metadata: { companySize: '0-50', fundingStage: 'seed' }
        },
        {
          id: 'hr-recruiter',
          name: 'HR / Recruiter',
          description: 'Human resources professional responsible for hiring',
          role_id: 'client',
          metadata: { companySize: '50+', fundingStage: 'established' }
        },
        {
          id: 'cto',
          name: 'CTO',
          description: 'Chief Technology Officer managing technical team',
          role_id: 'client',
          metadata: { companySize: '100+', fundingStage: 'series-a' }
        },

        // Service Provider categories
        {
          id: 'software-development',
          name: 'Software Development',
          description: 'Programming, coding, and technical implementation',
          role_id: 'freelancer',
          metadata: { skills: ['Programming', 'Problem Solving', 'Technical'] }
        },
        {
          id: 'creative-design',
          name: 'Creative & Design',
          description: 'UI/UX design, visual design, and creative work',
          role_id: 'freelancer',
          metadata: { skills: ['Design', 'Creativity', 'User Research'] }
        },
        {
          id: 'quality-assurance',
          name: 'Quality Assurance',
          description: 'Testing, QA, and quality management',
          role_id: 'freelancer',
          metadata: { skills: ['Testing', 'Quality', 'Analytical'] }
        },
        {
          id: 'product-management',
          name: 'Product Management',
          description: 'Product strategy, project management, and coordination',
          role_id: 'freelancer',
          metadata: { skills: ['Strategy', 'Management', 'Communication'] }
        },

        // Agency categories
        {
          id: 'web-dev-agency',
          name: 'Web Development Agency',
          description: 'Specialized in custom web applications and websites',
          role_id: 'agency',
          metadata: { services: ['Web Development', 'E-commerce', 'CMS'] }
        },
        {
          id: 'mobile-app-agency',
          name: 'Mobile App Agency',
          description: 'Focused on iOS and Android mobile applications',
          role_id: 'agency',
          metadata: { services: ['Mobile Apps', 'Cross-platform', 'Native'] }
        }
      ];

      // Filter categories by role ID
      const filteredCategories = mockCategories.filter(cat => cat.role_id === roleId);
      
      console.log('Role ID requested:', roleId);
      console.log('All mock categories:', mockCategories);
      console.log('Filtered categories for role', roleId, ':', filteredCategories);
      
      if (filteredCategories.length === 0) {
        console.warn('No categories found for role ID:', roleId);
        console.log('Available role IDs in mock data:', [...new Set(mockCategories.map(cat => cat.role_id))]);
      }
      
      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true, data: filteredCategories };

      // ORIGINAL API CALL CODE (commented out for now):
      /*
      const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:jVKJIwcT/role_categories?role_id=${roleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Role categories received:', data);
        return { success: true, data };
      }

      let errorMsg = '';
      try {
        const errorData = await response.json();
        errorMsg = errorData?.message || errorData?.error || '';
        console.error('Error response data:', errorData);
      } catch {}
      
      return { success: false, message: errorMsg || `Failed to fetch role categories (${response.status})` };
      */
    } catch (error) {
      console.error('Network error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  }

  // Test method to verify the service works
  async testService(): Promise<void> {
    console.log('Testing role category service...');
    
    const clientCategories = await this.getRoleCategories('client');
    console.log('Client categories test:', clientCategories);
    
    const freelancerCategories = await this.getRoleCategories('freelancer');
    console.log('Freelancer categories test:', freelancerCategories);
    
    const agencyCategories = await this.getRoleCategories('agency');
    console.log('Agency categories test:', agencyCategories);
  }
}

export const roleCategoryService = new RoleCategoryService();

