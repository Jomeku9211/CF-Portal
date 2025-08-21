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
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
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
