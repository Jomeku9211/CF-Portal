import React from 'react';
interface RadioOption {
  value: string;
  label: string;
}
interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helperText?: string;
  className?: string;
}
export function RadioGroup({
  options,
  name,
  value,
  onChange,
  label,
  helperText,
  className = ''
}: RadioGroupProps) {
  return <div className={`mb-1 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>}
      <div className="flex flex-wrap gap-3">
        {options.map(option => <label key={option.value} className={`flex items-center justify-center px-5 py-2.5 rounded-full cursor-pointer transition-all duration-200 ${value === option.value ? 'bg-[#3b82f6] text-white shadow-md' : 'bg-[#111827] border border-[#374151] text-gray-300 hover:bg-[#1e293b] hover:shadow'}`}>
            <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} className="sr-only" />
            <span className="text-sm font-medium">{option.label}</span>
          </label>)}
      </div>
      {helperText && <p className="mt-2 text-sm text-gray-400">{helperText}</p>}
    </div>;
}