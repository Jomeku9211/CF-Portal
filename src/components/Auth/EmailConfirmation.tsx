import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader, AlertCircle } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../contexts/AuthContext';

export const EmailConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the access_token and refresh_token from URL params
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const type = searchParams.get('type');

        console.log('Email confirmation callback received:', { type, hasAccessToken: !!accessToken });

        if (type === 'signup' && accessToken && refreshToken) {
          // Set the session manually
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error('Error setting session:', error);
            setStatus('error');
            setMessage('Failed to confirm email. Please try logging in manually.');
            return;
          }

          if (data.session && data.user) {
            console.log('Email confirmed successfully, user:', data.user.email);
            setStatus('success');
            setMessage('Email confirmed successfully! Logging you in...');

            // Auto-login the user
            try {
              const loginResult = await login(data.user.email || '', '');
              if (loginResult.success) {
                // Redirect to role selection after a short delay
                setTimeout(() => {
                  navigate('/role-selection', { replace: true });
                }, 2000);
              } else {
                // If auto-login fails, redirect to login
                setTimeout(() => {
                  navigate('/login', { 
                    state: { message: 'Email confirmed! Please sign in with your password.' },
                    replace: true 
                  });
                }, 2000);
              }
            } catch (loginError) {
              console.error('Auto-login error:', loginError);
              // Redirect to login with success message
              setTimeout(() => {
                navigate('/login', { 
                  state: { message: 'Email confirmed! Please sign in with your password.' },
                  replace: true 
                });
              }, 2000);
            }
          }
        } else if (type === 'recovery') {
          // Handle password recovery
          setStatus('success');
          setMessage('Password reset link confirmed! Redirecting to password reset...');
          setTimeout(() => {
            navigate('/reset-password', { 
              state: { accessToken, refreshToken },
              replace: true 
            });
          }, 2000);
        } else {
          // Invalid or missing parameters
          setStatus('error');
          setMessage('Invalid confirmation link. Please try again or contact support.');
        }
      } catch (error) {
        console.error('Email confirmation error:', error);
        setStatus('error');
        setMessage('An error occurred during email confirmation. Please try again.');
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate, login]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <Loader className="w-16 h-16 text-blue-400 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Confirming your email...</h2>
            <p className="text-gray-400">Please wait while we verify your email address.</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Email Confirmed!</h2>
            <p className="text-gray-400 mb-4">{message}</p>
            <div className="animate-pulse">
              <div className="w-4 h-4 bg-blue-400 rounded-full mx-auto"></div>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Confirmation Failed</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Go to Login
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center p-4">
      <div className="bg-[#1a2234] rounded-xl p-8 border border-[#2a3344] w-full max-w-md">
        {renderContent()}
      </div>
    </div>
  );
};
