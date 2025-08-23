import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { universalOnboardingService } from '../services/universalOnboardingService';

export function TestFlow() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testRoleSelection = async () => {
    if (!user?.id) {
      addResult('❌ No user authenticated');
      return;
    }

    setIsLoading(true);
    addResult('🧪 Testing role selection flow...');

    try {
      // Test 1: Client role selection
      addResult('📝 Testing client role selection...');
      const clientResult = await universalOnboardingService.getOrCreateOnboardingProgress(
        user.id,
        '550e8400-e29b-41d4-a716-446655440001', // client role ID
        '660e8400-e29b-41d4-a716-446655440003', // founder category ID
        'client',
        undefined // no experience level for clients
      );

      if (clientResult.success) {
        addResult('✅ Client onboarding progress created successfully');
        addResult(`📊 Progress ID: ${clientResult.data?.id}`);
        addResult(`📊 Current Step: ${clientResult.data?.current_step}/${clientResult.data?.total_steps}`);
      } else {
        addResult(`❌ Client onboarding failed: ${clientResult.error}`);
      }

      // Test 2: Service provider role selection
      addResult('📝 Testing service provider role selection...');
      const providerResult = await universalOnboardingService.getOrCreateOnboardingProgress(
        user.id,
        '550e8400-e29b-41d4-a716-446655440002', // service-provider role ID
        '660e8400-e29b-41d4-a716-446655440004', // software-developer category ID
        'developer',
        '770e8400-e29b-41d4-a716-446655440003' // mid experience level ID
      );

      if (providerResult.success) {
        addResult('✅ Service provider onboarding progress created successfully');
        addResult(`📊 Progress ID: ${providerResult.data?.id}`);
        addResult(`📊 Current Step: ${providerResult.data?.current_step}/${providerResult.data?.total_steps}`);
      } else {
        addResult(`❌ Service provider onboarding failed: ${providerResult.error}`);
      }

      // Test 3: Mark steps as completed
      addResult('📝 Testing step completion...');
      const stepResult = await universalOnboardingService.markStepCompleted(user.id, 'role_selection', {
        step_name: 'role_selection',
        step_data: {
          role: 'client',
          category: 'founder',
          specialization: 'not-applicable',
          experience_level: 'not-applicable'
        },
        completed: true
      });

      if (stepResult.success) {
        addResult('✅ Step completion marked successfully');
      } else {
        addResult(`❌ Step completion failed: ${stepResult.error}`);
      }

      addResult('🎉 All tests completed!');

    } catch (error) {
      addResult(`❌ Test error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testOnboardingPersistence = async () => {
    if (!user?.id) {
      addResult('❌ No user authenticated');
      return;
    }

    setIsLoading(true);
    addResult('🧪 Testing onboarding persistence...');

    try {
      // Test 1: Create onboarding progress
      addResult('📝 Creating onboarding progress...');
      const createResult = await universalOnboardingService.getOrCreateOnboardingProgress(
        user.id,
        '550e8400-e29b-41d4-a716-446655440001', // client role ID
        '660e8400-e29b-41d4-a716-446655440003', // founder category ID
        'client'
      );

      if (!createResult.success) {
        addResult(`❌ Failed to create onboarding progress: ${createResult.error}`);
        return;
      }

      addResult('✅ Onboarding progress created');

      // Test 2: Update to step 2 (team onboarding)
      addResult('📝 Updating to step 2 (team onboarding)...');
      const updateResult = await universalOnboardingService.updateOnboardingProgress(user.id, {
        current_step: 2,
        flow_metadata: {
          organization: {
            name: 'Test Organization',
            purpose: 'Testing persistence',
            teamSize: '5-10',
            workingStyle: 'Remote',
            culture: 'Innovative'
          }
        }
      });

      if (updateResult.success) {
        addResult('✅ Updated to step 2 with organization data');
      } else {
        addResult(`❌ Failed to update step: ${updateResult.error}`);
        return;
      }

      // Test 3: Verify persistence by fetching again
      addResult('📝 Verifying persistence...');
      const verifyResult = await universalOnboardingService.getOnboardingProgress(user.id);

      if (verifyResult.success && verifyResult.data) {
        addResult(`✅ Persistence verified! Current step: ${verifyResult.data.current_step}`);
        addResult(`📊 Organization name: ${verifyResult.data.flow_metadata?.organization?.name || 'Not found'}`);
        
        if (verifyResult.data.current_step === 2) {
          addResult('🎉 Onboarding persistence test PASSED!');
        } else {
          addResult('❌ Onboarding persistence test FAILED - step not persisted');
        }
      } else {
        addResult(`❌ Failed to verify persistence: ${verifyResult.error}`);
      }

    } catch (error) {
      addResult(`❌ Test error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testDatabaseConnection = async () => {
    setIsLoading(true);
    addResult('🔧 Testing database connection...');

    try {
      // Test basic connection by trying to get onboarding progress
      const result = await universalOnboardingService.getOnboardingProgress(user?.id || '');
      
      if (result.success) {
        addResult('✅ Database connection successful');
        addResult(`📊 Found ${result.data ? 1 : 0} onboarding progress records`);
      } else {
        addResult(`❌ Database connection failed: ${result.error}`);
      }
    } catch (error) {
      addResult(`❌ Database test error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetOnboardingProgress = async () => {
    if (!user?.id) {
      addResult('❌ No user authenticated');
      return;
    }

    setIsLoading(true);
    addResult('🔄 Resetting onboarding progress...');

    try {
      // Reset to step 1
      const resetResult = await universalOnboardingService.updateOnboardingProgress(user.id, {
        current_step: 1,
        flow_metadata: {},
        completed_steps: []
      });

      if (resetResult.success) {
        addResult('✅ Onboarding progress reset to step 1');
      } else {
        addResult(`❌ Failed to reset progress: ${resetResult.error}`);
      }

    } catch (error) {
      addResult(`❌ Reset error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const renameProfilesTable = async () => {
    setIsLoading(true);
    addResult('🔄 Attempting to rename profiles table to users...');
    
    try {
      // This will show the user what SQL to run in Supabase
      addResult('📝 IMPORTANT: You need to run the CORRECTED SAFE SQL script in Supabase SQL Editor');
      addResult('📁 The script is located at: scripts/safe-profiles-rename-fixed.sql');
      addResult('');
      addResult('⚠️  This script handles:');
      addResult('   • Dropping existing triggers and functions');
      addResult('   • Renaming profiles table to users');
      addResult('   • Updating foreign key constraints');
      addResult('   • Recreating triggers and functions');
      addResult('   • Updating RLS policies');
      addResult('');
      addResult('📋 Copy the entire contents of scripts/complete-profiles-rename.sql');
      addResult('   and paste it into your Supabase SQL Editor, then click Run');
      addResult('');
      addResult('✅ After running this script, all auth sync functionality will work correctly!');
      
    } catch (error) {
      addResult(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1a2234] rounded-xl shadow-lg p-8 border border-[#2a3344]">
          <h1 className="text-3xl font-bold text-white mb-6">🧪 CF Portal Test Flow</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Test Controls</h2>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={testDatabaseConnection}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Testing...' : '🔧 Test Database'}
              </button>
              
              <button
                onClick={testRoleSelection}
                disabled={isLoading}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Testing...' : '🧪 Test Role Selection'}
              </button>
              
              <button
                onClick={testOnboardingPersistence}
                disabled={isLoading}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Testing...' : '💾 Test Persistence'}
              </button>
              
              <button
                onClick={resetOnboardingProgress}
                disabled={isLoading}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Resetting...' : '🔄 Reset Progress'}
              </button>
              
              <button
                onClick={clearResults}
                className="px-4 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700"
              >
                🗑️ Clear Results
              </button>
              
              <button
                onClick={renameProfilesTable}
                disabled={isLoading}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Renaming...' : '🔄 Rename Profiles Table'}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Test Results</h2>
            <div className="bg-[#0f172a] rounded-lg p-4 max-h-96 overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-gray-400 text-center">No test results yet. Run a test to see results.</p>
              ) : (
                testResults.map((result, index) => (
                  <div key={index} className="text-sm text-gray-300 mb-2 font-mono">
                    {result}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Navigation</h2>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/role-selection')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
              >
                🎯 Role Selection
              </button>
              
              <button
                onClick={() => navigate('/onboarding-stage')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700"
              >
                🚀 Client Onboarding
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
              >
                📊 Dashboard
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            <p><strong>Current User:</strong> {user?.email || 'Not authenticated'}</p>
            <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
            <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
          </div>
        </div>
      </div>
    </div>
  );
}