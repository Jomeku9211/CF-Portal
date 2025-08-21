import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseAuthService } from '../../services/supabaseAuthService';
import { useAuth } from '../../contexts/AuthContext';
import { LogoutButton } from '../common/LogoutButton';
import { supabaseTestService } from '../../services/supabaseTestService';
import { supabaseSetupService } from '../../services/supabaseSetupService';

export const AuthTest: React.FC = () => {
  const { user, isAuthenticated, login, signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        const response = await signup(fullName, email, password);
        if (response.success) {
          // Redirect to email verification page
          navigate('/email-verification', { state: { email } });
        } else {
          setMessage(response.message || 'Signup failed');
        }
      } else {
        const response = await login(email, password);
        setMessage(response.message || 'Login completed');
      }
    } catch (error) {
      setMessage('An error occurred');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };



  const testSupabaseConnection = async () => {
    try {
      setMessage('Testing Supabase connection...');
      const response = await supabaseAuthService.getCurrentSession();
      setMessage(`Connection test: ${response.success ? 'SUCCESS' : 'FAILED'} - ${response.message}`);
    } catch (error) {
      setMessage(`Connection test failed: ${error}`);
    }
  };

  const testDatabaseTables = async () => {
    try {
      setMessage('Testing database tables...');
      const results = await supabaseTestService.runAllTests();
      
      const summary = results.map(result => 
        `${result.success ? '✅' : '❌'} ${result.message}`
      ).join('\n');
      
      setMessage(`Database test results:\n${summary}`);
      console.log('Database test results:', results);
    } catch (error) {
      setMessage(`Database test failed: ${error}`);
    }
  };

  const setupDatabase = async () => {
    try {
      setMessage('Setting up database...');
      const result = await supabaseSetupService.setupDatabase();
      
      if (result.success) {
        setMessage(`Database setup: ${result.message}`);
        // Test the tables after setup
        setTimeout(() => {
          testDatabaseTables();
        }, 1000);
      } else {
        setMessage(`Database setup failed: ${result.message}`);
      }
      
      console.log('Database setup result:', result);
    } catch (error) {
      setMessage(`Database setup failed: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center p-4">
      <div className="bg-[#1a2234] rounded-xl p-8 border border-[#2a3344] w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Supabase Auth Test
        </h1>

        {/* Connection Test */}
        <div className="mb-6 space-y-2">
          <button
            onClick={testSupabaseConnection}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Test Supabase Connection
          </button>
          <button
            onClick={testDatabaseTables}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Test Database Tables
          </button>
          <button
            onClick={setupDatabase}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Setup Database & Insert Sample Data
          </button>
        </div>

        {/* Auth Status */}
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-white font-medium mb-2">Authentication Status:</h3>
          <p className="text-gray-300 text-sm">
            {isAuthenticated ? (
              <>
                ✅ <strong>Authenticated</strong><br />
                Email: {user?.email}<br />
                ID: {user?.id}
              </>
            ) : (
              '❌ Not authenticated'
            )}
          </p>
        </div>

        {/* Auth Form */}
        {!isAuthenticated ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your full name"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>

            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-blue-400 hover:text-blue-300 text-sm"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <LogoutButton variant="default" className="w-full">
              Sign Out
            </LogoutButton>
            <p className="text-gray-400 text-sm">
              You can also test the logout functionality using the button above
            </p>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className="mt-4 p-3 bg-gray-800 border border-gray-600 rounded-lg">
            <p className="text-gray-300 text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};
