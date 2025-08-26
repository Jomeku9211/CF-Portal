import React from 'react';
import { cn } from './utils';
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  'data-id'?: string;
}
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'medium',
  className,
  'data-id': dataId,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';
  const variantStyles = {
    default: 'bg-[#F2F2F2] text-[#4D4E50]',
    primary: 'bg-[#2C426B] text-white',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };
  const sizeStyles = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  };
  return <span className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} data-id={dataId} {...props} />;
};
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
  fallback?: string;
  'data-id'?: string;
}
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  fallback,
  className,
  'data-id': dataId,
  ...props
}) => {
  const sizeStyles = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };
  return <div className={cn('rounded-full overflow-hidden flex items-center justify-center bg-[#D9D9D9] text-[#4D4E50] font-medium', sizeStyles[size], className)} data-id={dataId} {...props}>
      {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : <span>{fallback || '?'}</span>}
    </div>;
};
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'success' | 'warning' | 'error';
  'data-id'?: string;
}
export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'medium',
  variant = 'default',
  className,
  'data-id': dataId,
  ...props
}) => {
  const percentage = Math.min(Math.max(value / max * 100, 0), 100);
  const sizeStyles = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3'
  };
  const variantStyles = {
    default: 'bg-[#2C426B]',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };
  return <div className={cn('w-full bg-[#D9D9D9] rounded-full overflow-hidden', sizeStyles[size], className)} data-id={dataId} {...props}>
      <div className={cn('h-full transition-all duration-300 ease-in-out', variantStyles[variant])} style={{
      width: `${percentage}%`
    }} />
    </div>;
};