import React from 'react';

export function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'success';
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  const baseClasses = 'flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a2234]';
  const variantClasses = {
    primary: 'bg-[#3b82f6] hover:bg-[#2563eb] text-white focus:ring-[#3b82f6]',
    outline: 'border border-[#2a3344] hover:bg-[#2a3344] text-gray-300 focus:ring-gray-500',
    success: 'bg-[#22c55e] hover:bg-[#16a34a] text-white focus:ring-[#22c55e]'
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`} 
      onClick={onClick} 
      {...props}
    >
      {children}
    </button>
  );
}

























