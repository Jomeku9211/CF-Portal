import { supabase, TABLES } from '../config/supabase';

export interface DatabaseTestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

class SupabaseTestService {
  // Test if we can connect to Supabase
  async testConnection(): Promise<DatabaseTestResult> {
    try {
      console.log('🔍 Testing Supabase connection...');
      
      const { data, error } = await supabase
        .from(TABLES.ROLES)
        .select('count')
        .limit(1);

      if (error) {
        console.error('❌ Connection test failed:', error);
        return {
          success: false,
          message: `Connection failed: ${error.message}`,
          error
        };
      }

      console.log('✅ Connection test successful');
      return {
        success: true,
        message: 'Connection successful'
      };
    } catch (error) {
      console.error('❌ Unexpected error during connection test:', error);
      return {
        success: false,
        message: 'Unexpected error during connection test',
        error
      };
    }
  }

  // Test if roles table exists and has data
  async testRolesTable(): Promise<DatabaseTestResult> {
    try {
      console.log('🔍 Testing roles table...');
      
      const { data, error } = await supabase
        .from(TABLES.ROLES)
        .select('*')
        .limit(5);

      if (error) {
        console.error('❌ Roles table test failed:', error);
        return {
          success: false,
          message: `Roles table error: ${error.message}`,
          error
        };
      }

      console.log('✅ Roles table test successful:', data);
      return {
        success: true,
        message: `Found ${data?.length || 0} roles`,
        data
      };
    } catch (error) {
      console.error('❌ Unexpected error testing roles table:', error);
      return {
        success: false,
        message: 'Unexpected error testing roles table',
        error
      };
    }
  }

  // Test if role_categories table exists and has data
  async testRoleCategoriesTable(): Promise<DatabaseTestResult> {
    try {
      console.log('🔍 Testing role_categories table...');
      
      const { data, error } = await supabase
        .from(TABLES.ROLE_CATEGORIES)
        .select('*')
        .limit(5);

      if (error) {
        console.error('❌ Role categories table test failed:', error);
        return {
          success: false,
          message: `Role categories table error: ${error.message}`,
          error
        };
      }

      console.log('✅ Role categories table test successful:', data);
      return {
        success: true,
        message: `Found ${data?.length || 0} role categories`,
        data
      };
    } catch (error) {
      console.error('❌ Unexpected error testing role categories table:', error);
      return {
        success: false,
        message: 'Unexpected error testing role categories table',
        error
      };
    }
  }

  // Test if experience_levels table exists and has data
  async testExperienceLevelsTable(): Promise<DatabaseTestResult> {
    try {
      console.log('🔍 Testing experience_levels table...');
      
      const { data, error } = await supabase
        .from(TABLES.EXPERIENCE_LEVELS)
        .select('*')
        .limit(5);

      if (error) {
        console.error('❌ Experience levels table test failed:', error);
        return {
          success: false,
          message: `Experience levels table error: ${error.message}`,
          error
        };
      }

      console.log('✅ Experience levels table test successful:', data);
      return {
        success: true,
        message: `Found ${data?.length || 0} experience levels`,
        data
      };
    } catch (error) {
      console.error('❌ Unexpected error testing experience levels table:', error);
      return {
        success: false,
        message: 'Unexpected error testing experience levels table',
        error
      };
    }
  }

  // Run all tests
  async runAllTests(): Promise<DatabaseTestResult[]> {
    console.log('🚀 Running all database tests...');
    
    const results = await Promise.all([
      this.testConnection(),
      this.testRolesTable(),
      this.testRoleCategoriesTable(),
      this.testExperienceLevelsTable()
    ]);

    console.log('📊 All tests completed:', results);
    return results;
  }
}

export const supabaseTestService = new SupabaseTestService();
