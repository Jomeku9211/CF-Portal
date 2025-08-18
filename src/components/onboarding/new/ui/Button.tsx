import React from 'react';

export function Button({
  children,
  variant = 'primary',
  className = '',
  icon,
  iconPosition = 'right',
  disabled,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  onClick?: () => void;
  [key: string]: any;
}) {
  const base = 'inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const styles =
    variant === 'outline'
      ? 'border border-[#374151] text-white hover:bg-[#1f2937]'
      : 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white hover:from-[#2563eb] hover:to-[#1d4ed8] shadow-md hover:shadow-lg';

  return (
    <button
      type="button"
      className={`${base} ${styles} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === 'left' ? <span className="mr-2">{icon}</span> : null}
      {children}
      {icon && iconPosition === 'right' ? <span className="ml-2">{icon}</span> : null}
    </button>
  );
}


