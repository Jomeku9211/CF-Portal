import React from 'react';

export function Input({ label, icon, className = '', ...props }: any) {
  const inputId = props.id || `${(label || 'input').replace(/\s+/g, '-').toLowerCase()}-input`;
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
        <input
          id={inputId}
          className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} bg-[#1e293b] border border-[#2a3344] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all duration-200`}
          {...props}
        />
      </div>
    </div>
  );
}


