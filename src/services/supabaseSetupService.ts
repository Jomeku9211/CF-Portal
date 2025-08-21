import { supabase, TABLES } from '../config/supabase';

export interface SetupResult {
  success: boolean;
  message: string;
  details?: any;
}

class SupabaseSetupService {
  // Check if tables exist and have data
  async checkTablesStatus(): Promise<SetupResult> {
    try {
      console.log('🔍 Checking database tables status...');
      
      const results = await Promise.all([
        this.checkTable(TABLES.ROLES),
        this.checkTable(TABLES.ROLE_CATEGORIES),
        this.checkTable(TABLES.EXPERIENCE_LEVELS),
        this.checkTable(TABLES.USER_ROLES)
      ]);

      const hasData = results.every(result => result.success && result.count > 0);
      
      if (hasData) {
        return {
          success: true,
          message: 'All tables exist and have data',
          details: results
        };
      } else {
        return {
          success: false,
          message: 'Some tables are missing or empty',
          details: results
        };
      }
    } catch (error) {
      console.error('❌ Error checking tables status:', error);
      return {
        success: false,
        message: 'Error checking tables status',
        details: error
      };
    }
  }

  private async checkTable(tableName: string): Promise<{ success: boolean; count: number; error?: any }> {
    try {
      const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error(`❌ Error checking ${tableName}:`, error);
        return { success: false, count: 0, error };
      }

      return { success: true, count: count || 0 };
    } catch (error) {
      console.error(`❌ Unexpected error checking ${tableName}:`, error);
      return { success: false, count: 0, error };
    }
  }

  // Insert sample data if tables are empty
  async insertSampleData(): Promise<SetupResult> {
    try {
      console.log('🚀 Inserting sample data...');
      
      // First check if we need to insert data
      const status = await this.checkTablesStatus();
      if (status.success) {
        return {
          success: true,
          message: 'Tables already have data, no need to insert'
        };
      }

      // Insert roles
      const rolesResult = await this.insertRoles();
      if (!rolesResult.success) {
        return rolesResult;
      }

      // Insert role categories
      const categoriesResult = await this.insertRoleCategories();
      if (!categoriesResult.success) {
        return categoriesResult;
      }

      // Insert experience levels
      const levelsResult = await this.insertExperienceLevels();
      if (!levelsResult.success) {
        return levelsResult;
      }

      console.log('✅ Sample data inserted successfully');
      return {
        success: true,
        message: 'Sample data inserted successfully'
      };

    } catch (error) {
      console.error('❌ Error inserting sample data:', error);
      return {
        success: false,
        message: 'Error inserting sample data',
        details: error
      };
    }
  }

  private async insertRoles(): Promise<SetupResult> {
    try {
      const roles = [
        {
          name: 'client',
          description: 'I\'m an IT founder or HR looking to hire developers for my company or team.',
          button_label: 'Hire Talent',
          icon: 'users'
        },
        {
          name: 'freelancer',
          description: 'I\'m a developer who wants to list myself and get hired by startups and companies.',
          button_label: 'List Myself',
          icon: 'user'
        },
        {
          name: 'agency',
          description: 'I run a team or agency and want to list my employees for outsourced projects.',
          button_label: 'List My Team',
          icon: 'building'
        }
      ];

      const { error } = await supabase
        .from(TABLES.ROLES)
        .insert(roles);

      if (error) {
        console.error('❌ Error inserting roles:', error);
        return {
          success: false,
          message: `Error inserting roles: ${error.message}`,
          details: error
        };
      }

      console.log('✅ Roles inserted successfully');
      return { success: true, message: 'Roles inserted successfully' };

    } catch (error) {
      console.error('❌ Unexpected error inserting roles:', error);
      return {
        success: false,
        message: 'Unexpected error inserting roles',
        details: error
      };
    }
  }

  private async insertRoleCategories(): Promise<SetupResult> {
    try {
      // First get the role IDs
      const { data: roles, error: rolesError } = await supabase
        .from(TABLES.ROLES)
        .select('id, name');

      if (rolesError || !roles) {
        return {
          success: false,
          message: 'Failed to get roles for categories',
          details: rolesError
        };
      }

      const clientRole = roles.find(r => r.name === 'client');
      const freelancerRole = roles.find(r => r.name === 'freelancer');
      const agencyRole = roles.find(r => r.name === 'agency');

      if (!clientRole || !freelancerRole || !agencyRole) {
        return {
          success: false,
          message: 'Required roles not found'
        };
      }

      const categories = [
        // Client categories
        {
          name: 'founder',
          description: 'Company founder or co-founder looking to build a team',
          role_id: clientRole.id,
          metadata: { companySize: '0-50', fundingStage: 'seed' }
        },
        {
          name: 'hr-recruiter',
          description: 'Human resources professional responsible for hiring',
          role_id: clientRole.id,
          metadata: { companySize: '50+', fundingStage: 'established' }
        },
        {
          name: 'cto',
          description: 'Chief Technology Officer managing technical team',
          role_id: clientRole.id,
          metadata: { companySize: '100+', fundingStage: 'series-a' }
        },

        // Service Provider categories
        {
          name: 'software-development',
          description: 'Programming, coding, and technical implementation',
          role_id: freelancerRole.id,
          metadata: { skills: ['Programming', 'Problem Solving', 'Technical'] }
        },
        {
          name: 'creative-design',
          description: 'UI/UX design, visual design, and creative work',
          role_id: freelancerRole.id,
          metadata: { skills: ['Design', 'Creativity', 'User Research'] }
        },
        {
          name: 'quality-assurance',
          description: 'Testing, QA, and quality management',
          role_id: freelancerRole.id,
          metadata: { skills: ['Testing', 'Quality', 'Analytical'] }
        },
        {
          name: 'product-management',
          description: 'Product strategy, project management, and coordination',
          role_id: freelancerRole.id,
          metadata: { skills: ['Strategy', 'Management', 'Communication'] }
        },

        // Agency categories
        {
          name: 'web-dev-agency',
          description: 'Specialized in custom web applications and websites',
          role_id: agencyRole.id,
          metadata: { services: ['Web Development', 'E-commerce', 'CMS'] }
        },
        {
          name: 'mobile-app-agency',
          description: 'Focused on iOS and Android mobile applications',
          role_id: agencyRole.id,
          metadata: { services: ['Mobile Apps', 'Cross-platform', 'Native'] }
        }
      ];

      const { error } = await supabase
        .from(TABLES.ROLE_CATEGORIES)
        .insert(categories);

      if (error) {
        console.error('❌ Error inserting role categories:', error);
        return {
          success: false,
          message: `Error inserting role categories: ${error.message}`,
          details: error
        };
      }

      console.log('✅ Role categories inserted successfully');
      return { success: true, message: 'Role categories inserted successfully' };

    } catch (error) {
      console.error('❌ Unexpected error inserting role categories:', error);
      return {
        success: false,
        message: 'Unexpected error inserting role categories',
        details: error
      };
    }
  }

  private async insertExperienceLevels(): Promise<SetupResult> {
    try {
      const levels = [
        {
          name: 'junior',
          description: 'Early career professionals building foundational skills',
          years: '0–2 years',
          tagline: 'Potential builders',
          features: ['Learning core technologies', 'Building foundational skills', 'Working under guidance', 'Contributing to team projects']
        },
        {
          name: 'mid-level',
          description: 'Experienced professionals driving development',
          years: '2–6 years',
          tagline: 'Core contributors',
          features: ['Independent project delivery', 'Mentoring junior developers', 'Technical decision making', 'Cross-functional collaboration']
        },
        {
          name: 'senior',
          description: 'Expert professionals leading teams and projects',
          years: '6–10 years',
          tagline: 'Lead developers / team leads',
          features: ['Leading development teams', 'Architectural decision making', 'Project planning & execution', 'Stakeholder communication']
        },
        {
          name: 'principal',
          description: 'Strategic leaders shaping technical direction',
          years: '10+ years',
          tagline: 'Strategic leaders',
          features: ['Technical strategy & vision', 'System architecture design', 'Team leadership & mentoring', 'Business impact focus']
        }
      ];

      const { error } = await supabase
        .from(TABLES.EXPERIENCE_LEVELS)
        .insert(levels);

      if (error) {
        console.error('❌ Error inserting experience levels:', error);
        return {
          success: false,
          message: `Error inserting experience levels: ${error.message}`,
          details: error
        };
      }

      console.log('✅ Experience levels inserted successfully');
      return { success: true, message: 'Experience levels inserted successfully' };

    } catch (error) {
      console.error('❌ Unexpected error inserting experience levels:', error);
      return {
        success: false,
        message: 'Unexpected error inserting experience levels',
        details: error
      };
    }
  }

  // Complete setup - check and insert data if needed
  async setupDatabase(): Promise<SetupResult> {
    try {
      console.log('🚀 Setting up database...');
      
      const status = await this.checkTablesStatus();
      if (status.success) {
        return {
          success: true,
          message: 'Database is already set up with data'
        };
      }

      console.log('📝 Tables are missing or empty, inserting sample data...');
      const insertResult = await this.insertSampleData();
      
      if (insertResult.success) {
        // Verify the setup
        const finalStatus = await this.checkTablesStatus();
        if (finalStatus.success) {
          return {
            success: true,
            message: 'Database setup completed successfully'
          };
        } else {
          return {
            success: false,
            message: 'Database setup failed verification'
          };
        }
      }

      return insertResult;

    } catch (error) {
      console.error('❌ Error setting up database:', error);
      return {
        success: false,
        message: 'Error setting up database',
        details: error
      };
    }
  }
}

export const supabaseSetupService = new SupabaseSetupService();
