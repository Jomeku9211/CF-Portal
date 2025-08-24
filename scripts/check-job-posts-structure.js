import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkJobPostsStructure() {
  console.log('🔍 Checking job_posts table structure...');
  
  try {
    // Get a sample record to see the structure
    const { data, error } = await supabase
      .from('job_posts')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Cannot access job_posts table:', error.message);
      return;
    }
    
    if (data && data.length > 0) {
      console.log('📋 Job_posts table has existing records:');
      console.log('   Sample record:', data[0]);
      console.log('   Available fields:', Object.keys(data[0]));
    } else {
      console.log('📋 Job_posts table is empty - checking structure by trying to insert...');
      
      // Try to insert a minimal record to see what fields are required
      const minimalJobData = {
        title: 'Test Job Post',
        organization_id: '0fb16af1-76a3-4b53-9cfb-9d571111d0cb', // From our test
        created_by: '4e28f68c-d6b6-4816-8b10-b3ab451de267' // From our test
      };
      
      console.log('💾 Trying minimal job post insert:', minimalJobData);
      
      const { data: insertData, error: insertError } = await supabase
        .from('job_posts')
        .insert([minimalJobData])
        .select();
      
      if (insertError) {
        console.log('❌ Minimal job post insert failed:', insertError.message);
        console.log('   Error code:', insertError.code);
        console.log('   Error details:', insertError.details);
        console.log('   Error hint:', insertError.hint);
      } else {
        console.log('✅ Minimal job post insert successful:', insertData);
        console.log('   Job post structure:', Object.keys(insertData[0]));
        
        // Clean up
        await supabase
          .from('job_posts')
          .delete()
          .eq('id', insertData[0].id);
        
        console.log('✅ Test job post cleaned up');
      }
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkJobPostsStructure();
