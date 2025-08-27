import React from 'react';
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}
export function TextArea({
  label,
  helperText,
  error,
  className = '',
  ...props
}: TextAreaProps) {
  return <div className="mb-1">
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>}
      <textarea className={`w-full rounded-lg border transition-all duration-200 ease-in-out ${error ? 'border-red-500' : 'border-[#374151]'} bg-[#111827] px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] ${className}`} {...props} />
      {helperText && !error && <p className="mt-2 text-sm text-gray-400">{helperText}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>;
}


