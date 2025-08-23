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
        this.checkTable(TABLES.USERS),
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

  // Create user record manually if needed
  async ensureUserRecord(userId: string, email: string, fullName?: string, avatarUrl?: string): Promise<SetupResult> {
    try {
      console.log('🔧 Ensuring user record exists...');
      
      // Check if user record exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();
      
      if (checkError && checkError.code === 'PGRST116') {
        // User doesn't exist, create them
        console.log('🆕 Creating user record...');
        
        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            id: userId,
            email: email,
            full_name: fullName || '',
            avatar_url: avatarUrl || ''
          }]);
        
        if (insertError) {
          console.error('❌ Error creating user record:', insertError);
          return {
            success: false,
            message: 'Failed to create user record',
            details: insertError
          };
        }
        
        console.log('✅ User record created successfully');
        return {
          success: true,
          message: 'User record created successfully'
        };
      } else if (existingUser) {
        console.log('✅ User record already exists');
        return {
          success: true,
          message: 'User record already exists'
        };
      } else if (checkError) {
        console.error('❌ Error checking user record:', checkError);
        return {
          success: false,
          message: 'Error checking user record',
          details: checkError
        };
      }
      
      return {
        success: true,
        message: 'User record check completed'
      };
      
    } catch (error) {
      console.error('❌ Error ensuring user record:', error);
      return {
        success: false,
        message: 'Error ensuring user record',
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
      
      // Create users table and sync function first
      const usersSetupResult = await this.setupUsersTable();
      if (!usersSetupResult.success) {
        return usersSetupResult;
      }

      // Try to insert data, but handle existing data gracefully
      try {
        const rolesResult = await this.insertRoles();
        if (rolesResult.success) {
          console.log('✅ Roles setup completed');
        } else {
          console.log('⚠️ Roles setup failed (may already exist):', rolesResult.message);
        }
      } catch (error) {
        console.log('⚠️ Roles setup error (may already exist):', error);
      }

      try {
        const categoriesResult = await this.insertRoleCategories();
        if (categoriesResult.success) {
          console.log('✅ Categories setup completed');
        } else {
          console.log('⚠️ Categories setup failed (may already exist):', categoriesResult.message);
        }
      } catch (error) {
        console.log('⚠️ Categories setup error (may already exist):', error);
      }

      try {
        const levelsResult = await this.insertExperienceLevels();
        if (levelsResult.success) {
          console.log('✅ Experience levels setup completed');
        } else {
          console.log('⚠️ Experience levels setup failed (may already exist):', levelsResult.message);
        }
      } catch (error) {
        console.log('⚠️ Experience levels setup error (may already exist):', error);
      }

      console.log('✅ Sample data insertion completed');
      return {
        success: true,
        message: 'Sample data insertion completed'
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

  // Setup users table and auth sync
  private async setupUsersTable(): Promise<SetupResult> {
    try {
      console.log('🔧 Setting up users table and auth sync...');
      
      // Try to create users table directly using SQL
      const { error: createTableError } = await supabase
        .from('users')
        .select('id')
        .limit(1);
      
      if (createTableError && createTableError.code === '42P01') {
        // Table doesn't exist, create it
        console.log('🆕 Users table does not exist, creating it...');
        
        // Use a simple approach: try to insert a dummy record to trigger table creation
        // This is a fallback since we can't execute DDL directly from the client
        console.log('⚠️ Cannot create table from client, please create manually in Supabase dashboard');
        console.log('📋 Required SQL:');
        console.log(`
          CREATE TABLE public.users (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            email TEXT UNIQUE NOT NULL,
            full_name TEXT,
            avatar_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          -- Create index for better performance
          CREATE INDEX users_email_idx ON public.users(email);
          
          -- Enable RLS
          ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
          
          -- Create RLS policies
          CREATE POLICY "Users can view own profile" ON public.users
            FOR SELECT USING (auth.uid() = id);
          
          CREATE POLICY "Users can update own profile" ON public.users
            FOR UPDATE USING (auth.uid() = id);
          
          CREATE POLICY "Users can insert own profile" ON public.users
            FOR INSERT WITH CHECK (auth.uid() = id);
          
          -- Create trigger function
          CREATE OR REPLACE FUNCTION public.handle_new_user()
          RETURNS TRIGGER AS $$
          BEGIN
            INSERT INTO public.users (id, email, full_name, avatar_url)
            VALUES (
              NEW.id,
              NEW.email,
              COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
              COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
            )
            ON CONFLICT (id) DO UPDATE SET
              email = EXCLUDED.email,
              full_name = EXCLUDED.full_name,
              avatar_url = EXCLUDED.avatar_url,
              updated_at = NOW();
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql SECURITY DEFINER;
          
          -- Create trigger
          CREATE TRIGGER on_auth_user_created
            AFTER INSERT OR UPDATE ON auth.users
            FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
        `);
        
        return {
          success: false,
          message: 'Users table needs to be created manually in Supabase dashboard',
          details: 'Please run the SQL commands shown in the console'
        };
      }
      
      // Table exists, try to sync existing auth users
      console.log('✅ Users table exists, syncing auth users...');
      
      try {
        // Get current user from auth context
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Check if user exists in public.users
          const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('id')
            .eq('id', user.id)
            .single();
          
          if (checkError && checkError.code === 'PGRST116') {
            // User doesn't exist in public.users, create them
            console.log('🆕 Creating user record in public.users...');
            
            const { error: insertError } = await supabase
              .from('users')
              .insert([{
                id: user.id,
                email: user.email || '',
                full_name: user.user_metadata?.full_name || '',
                avatar_url: user.user_metadata?.avatar_url || ''
              }]);
            
            if (insertError) {
              console.error('❌ Error creating user record:', insertError);
              return {
                success: false,
                message: 'Failed to create user record',
                details: insertError
              };
            }
            
            console.log('✅ User record created successfully');
          } else if (existingUser) {
            console.log('✅ User record already exists');
          }
        }
      } catch (syncError) {
        console.error('❌ Error syncing user:', syncError);
        // Continue anyway, this is not critical
      }
      
      console.log('✅ Users table setup completed');
      return {
        success: true,
        message: 'Users table setup completed'
      };
      
    } catch (error) {
      console.error('❌ Error setting up users table:', error);
      return {
        success: false,
        message: 'Error setting up users table',
        details: error
      };
    }
  }

  private async insertRolesIfNeeded(): Promise<SetupResult> {
    try {
      // Check if roles already exist
      const { count: existingCount, error: checkError } = await supabase
        .from(TABLES.ROLES)
        .select('*', { count: 'exact', head: true });

      if (checkError) {
        console.error('❌ Error checking existing roles:', checkError);
        return {
          success: false,
          message: 'Error checking existing roles',
          details: checkError
        };
      }

      if (existingCount && existingCount > 0) {
        console.log('✅ Roles already exist, skipping insertion');
        return { success: true, message: 'Roles already exist' };
      }

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
        // Check if it's a duplicate key error
        if (error.code === '23505' || error.message.includes('duplicate key')) {
          console.log('✅ Roles already exist, skipping insertion');
          return {
            success: true,
            message: 'Roles already exist'
          };
        }
        
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

  private async insertRoles(): Promise<SetupResult> {
    return this.insertRolesIfNeeded();
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
        // Check if it's a duplicate key error
        if (error.code === '23505' || error.message.includes('duplicate key')) {
          console.log('✅ Role categories already exist, skipping insertion');
          return {
            success: true,
            message: 'Role categories already exist'
          };
        }
        
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
        // Check if it's a duplicate key error
        if (error.code === '23505' || error.message.includes('duplicate key')) {
          console.log('✅ Experience levels already exist, skipping insertion');
          return {
            success: true,
            message: 'Experience levels already exist'
          };
        }
        
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
      
      // Always try to insert sample data (it will handle existing data gracefully)
      console.log('📝 Inserting sample data...');
      const insertResult = await this.insertSampleData();
      
      if (insertResult.success) {
        console.log('✅ Database setup completed successfully');
        return {
          success: true,
          message: 'Database setup completed successfully'
        };
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
