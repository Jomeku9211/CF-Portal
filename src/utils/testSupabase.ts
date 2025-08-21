import { supabase } from '../config/supabase'

export async function testSupabaseConnection() {
  try {
    console.log('🔌 Testing Supabase connection...')
    
    // Test basic connection
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .limit(1)
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('✅ Supabase connection successful!')
        console.log('⚠️  Table "roles" does not exist yet - this is expected')
        console.log('📋 Next step: Create database tables')
        return { success: true, message: 'Connection successful, tables need to be created' }
      } else {
        console.error('❌ Supabase connection failed:', error)
        return { success: false, message: error.message }
      }
    } else {
      console.log('✅ Supabase connection successful!')
      console.log('✅ Table "roles" exists and is accessible')
      console.log('📊 Data found:', data)
      return { success: true, message: 'Connection successful, tables exist' }
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error)
    return { success: false, message: 'Unexpected error occurred' }
  }
}

// Test function that can be called from browser console
(window as any).testSupabase = testSupabaseConnection
