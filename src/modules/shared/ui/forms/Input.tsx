import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  helperText?: string;
  error?: string;
}
export function Input({
  label,
  icon,
  helperText,
  error,
  className = '',
  ...props
}: InputProps) {
  return <div className="mb-1">
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>}
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>}
        <input className={`w-full rounded-lg border transition-all duration-200 ease-in-out ${error ? 'border-red-500' : 'border-[#374151]'} bg-[#111827] px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] ${icon ? 'pl-10' : ''} ${className}`} {...props} />
      </div>
      {helperText && !error && <p className="mt-2 text-sm text-gray-400">{helperText}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>;
}


