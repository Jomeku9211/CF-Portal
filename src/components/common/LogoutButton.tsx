import React from 'react';
import { LogOut, Power } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LogoutButtonProps {
  variant?: 'default' | 'icon' | 'text';
  className?: string;
  children?: React.ReactNode;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  variant = 'default', 
  className = '',
  children 
}) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      console.log('🔐 LogoutButton: Starting logout process...');
      console.log('🔐 LogoutButton: logout function from useAuth:', typeof logout);
      
      if (typeof logout !== 'function') {
        console.error('❌ LogoutButton: logout is not a function!', logout);
        return;
      }
      
      await logout();
      console.log('🔐 LogoutButton: Logout completed successfully');
    } catch (error) {
      console.error('❌ LogoutButton: Logout error:', error);
      // Try to redirect manually if logout fails
      try {
        window.location.href = '/login';
      } catch (redirectError) {
        console.error('❌ LogoutButton: Redirect also failed:', redirectError);
      }
    }
  };

  const renderButton = () => {
    switch (variant) {
      case 'icon':
        return (
          <button
            onClick={handleLogout}
            className={`p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors ${className}`}
            title="Logout"
          >
            <Power className="w-5 h-5" />
          </button>
        );

      case 'text':
        return (
          <button
            onClick={handleLogout}
            className={`text-red-400 hover:text-red-300 font-medium transition-colors ${className}`}
          >
            {children || 'Logout'}
          </button>
        );

      default:
        return (
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors ${className}`}
          >
            <LogOut className="w-4 h-4" />
            {children || 'Logout'}
          </button>
        );
    }
  };

  return renderButton();
};
