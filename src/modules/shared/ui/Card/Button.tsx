import React from 'react';
import { cn } from './utils';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'large' | 'medium' | 'small';
  children: React.ReactNode;
  'data-id'?: string;
}
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className,
  children,
  disabled,
  'data-id': dataId,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = {
    primary: 'bg-[#2C426B] text-white hover:bg-[#233455] focus:ring-[#2C426B] border border-[#2C426B]',
    secondary: 'bg-white text-[#2C426B] border border-[#2C426B] hover:bg-[#E9ECF0] focus:ring-[#2C426B]',
    tertiary: 'bg-transparent text-[#2C426B] hover:bg-[#E9ECF0] focus:ring-[#2C426B] border border-transparent'
  };
  const sizeStyles = {
    large: 'px-8 py-4 text-lg font-semibold',
    medium: 'px-6 py-3 text-base font-medium',
    small: 'px-4 py-2 text-sm font-medium'
  };
  return <button className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} disabled={disabled} data-id={dataId} {...props}>
      {children}
    </button>;
};