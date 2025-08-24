import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkTeamsTableStructure() {
  console.log('🔍 Checking teams table structure...');
  
  try {
    // Get a sample record to see the structure
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Cannot access teams table:', error.message);
      return;
    }
    
    if (data && data.length > 0) {
      console.log('📋 Teams table has existing records:');
      console.log('   Sample record:', data[0]);
      console.log('   Available fields:', Object.keys(data[0]));
    } else {
      console.log('📋 Teams table is empty - checking structure by trying to insert...');
      
      // Try to insert a minimal record to see what fields are required
      const minimalTeamData = {
        name: 'Test Team',
        organization_id: '8b1e6625-ac38-489e-8164-c107283531d5' // From our test
      };
      
      console.log('💾 Trying minimal team insert:', minimalTeamData);
      
      const { data: insertData, error: insertError } = await supabase
        .from('teams')
        .insert([minimalTeamData])
        .select();
      
      if (insertError) {
        console.log('❌ Minimal team insert failed:', insertError.message);
        console.log('   Error code:', insertError.code);
        console.log('   Error details:', insertError.details);
        console.log('   Error hint:', insertError.hint);
      } else {
        console.log('✅ Minimal team insert successful:', insertData);
        console.log('   Team structure:', Object.keys(insertData[0]));
        
        // Clean up
        await supabase
          .from('teams')
          .delete()
          .eq('id', insertData[0].id);
        
        console.log('✅ Test team cleaned up');
      }
    }
    
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

checkTeamsTableStructure();
