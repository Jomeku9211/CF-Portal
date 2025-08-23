import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabaseRoleService } from '../../services/supabaseRoleService';

const EmailConfirmationHandler: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        if (user) {
          console.log('🎉 User is authenticated after email confirmation');

          // Determine next destination based on whether the user has roles
          const { data: userRole, success } = await supabaseRoleService.getUserRole(user.id);
          if (success && userRole) {
            console.log('✅ User already has a role → redirecting to dashboard');
            navigate('/dashboard', { replace: true });
            return;
          }

          console.log('ℹ️ No roles found → redirecting to role selection');
          navigate('/role-selection', { replace: true });
          return;
        } else {
          console.log('⚠️ User not authenticated after email confirmation - redirecting to login');
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error handling email confirmation:', error);
        navigate('/login', { replace: true });
      } finally {
        setIsProcessing(false);
      }
    };

    const timer = setTimeout(handleEmailConfirmation, 400);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Finalizing your account...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default EmailConfirmationHandler;
