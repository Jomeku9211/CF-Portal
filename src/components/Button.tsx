import React from 'react';
type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
};
export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  className = ''
}: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50';
  const variantStyles = {
    primary: 'bg-gradient-to-r from-tango-base to-tango-dark hover:from-tango-dark hover:to-tango-darker text-white shadow-lg hover:shadow-xl focus:ring-tango-light',
    secondary: 'bg-sanjuan-lightest text-sanjuan-base border-2 border-sanjuan-light hover:bg-sanjuan-lighter hover:border-sanjuan-base shadow-md hover:shadow-lg focus:ring-sanjuan-light',
    link: 'text-sanjuan-base hover:text-sanjuan-dark underline decoration-2 underline-offset-4 hover:decoration-sanjuan-dark focus:ring-sanjuan-light'
  };
  const sizeStyles = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-6 text-base',
    large: 'py-4 px-8 text-lg font-bold'
  };
  return <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </button>;
};