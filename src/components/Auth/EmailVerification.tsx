import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { supabaseAuthService } from '../../services/supabaseAuthService';
import { useAuth } from '../../contexts/AuthContext';

export const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  
  // Get email from location state or localStorage
  const email = location.state?.email || localStorage.getItem('signupEmail') || 'your email';

  // Check if user is already authenticated and redirect if needed
  useEffect(() => {
    if (isAuthenticated && user) {
      // If user is authenticated and has confirmed email, redirect to role selection
      if ((user as any).email_confirmed_at) {
        console.log('User already confirmed email, redirecting to role selection');
        localStorage.removeItem('signupEmail');
        navigate('/role-selection', { replace: true });
      }
    }

    // If no signup email is found, redirect to signup page
    if (!localStorage.getItem('signupEmail')) {
      console.log('No signup email found, redirecting to signup');
      navigate('/signup', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleResendVerification = async () => {
    setIsResending(true);
    setResendMessage('');

    try {
      if (!email || email === 'your email') {
        setResendMessage('We could not detect your email. Please go back and sign up again.');
        return;
      }

      const response = await supabaseAuthService.resendVerificationEmail(email);
      if (response.success) {
        setResendMessage('Verification email resent! Please check your inbox.');
      } else {
        setResendMessage(response.message || 'Failed to resend verification email. Please try again.');
      }
    } catch (error) {
      setResendMessage('An error occurred. Please try again.');
      console.error('Error resending verification:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleManualVerification = async () => {
    // This is for testing when Supabase emails aren't working
    try {
      const response = await supabaseAuthService.manuallyVerifyEmail(email);
      if (response.success) {
        setResendMessage('Email manually verified for testing. You can now proceed.');
        // Redirect to role selection after a short delay
        setTimeout(() => {
          navigate('/role-selection', { replace: true });
        }, 2000);
      } else {
        setResendMessage(response.message || 'Manual verification failed.');
      }
    } catch (error) {
      setResendMessage('Manual verification error occurred.');
      console.error('Error in manual verification:', error);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleCheckEmail = () => {
    // Open default email client or provide instructions
    const emailProviders = {
      gmail: 'https://mail.google.com',
      outlook: 'https://outlook.live.com',
      yahoo: 'https://mail.yahoo.com',
      protonmail: 'https://mail.proton.me'
    };

    // Try to detect email provider and open it
    if (email.includes('@gmail.com')) {
      window.open(emailProviders.gmail, '_blank');
    } else if (email.includes('@outlook.com') || email.includes('@hotmail.com')) {
      window.open(emailProviders.outlook, '_blank');
    } else if (email.includes('@yahoo.com')) {
      window.open(emailProviders.yahoo, '_blank');
    } else if (email.includes('@protonmail.com')) {
      window.open(emailProviders.protonmail, '_blank');
    } else {
      // Generic email check instructions
      alert('Please check your email inbox and spam folder for the verification email.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a] flex items-center justify-center p-4">
      <div className="bg-[#1a2234] rounded-xl p-8 border border-[#2a3344] w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
          <p className="text-gray-400">
            We've sent a verification link to
          </p>
          <p className="text-blue-400 font-medium break-all mt-1">
            {email}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <p className="font-medium text-blue-400 mb-1">Next Steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-300">
                <li>Check your email inbox</li>
                <li>Click the verification link</li>
                <li>Return here to sign in</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleCheckEmail}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Check Email Now
          </button>
          
          <button
            onClick={handleResendVerification}
            disabled={isResending}
            className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isResending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Resend Verification Email
              </>
            )}
          </button>

          {/* Manual verification button for testing */}
          <button
            onClick={handleManualVerification}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Test: Manual Verification
          </button>
        </div>

        {/* Resend Message */}
        {resendMessage && (
          <div className={`p-3 rounded-lg text-sm mb-4 ${
            resendMessage.includes('successfully') 
              ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {resendMessage}
          </div>
        )}

        {/* Help Section */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <h3 className="text-white font-medium mb-2">Having trouble?</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Check your spam/junk folder</li>
            <li>• Make sure you entered the correct email</li>
            <li>• Wait a few minutes for the email to arrive</li>
            <li>• Try resending the verification email</li>
          </ul>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <button
            onClick={handleBackToLogin}
            className="text-gray-400 hover:text-blue-400 flex items-center gap-1 mx-auto transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
