import React from 'react';
interface StepperOption {
  value: string;
  label: string;
}
interface StepperProps {
  options: StepperOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helperText?: string;
  className?: string;
}
export function Stepper({
  options,
  value,
  onChange,
  label,
  helperText,
  className = ''
}: StepperProps) {
  const currentIndex = options.findIndex(option => option.value === value);
  return <div className={`mb-1 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>}
      <div className="space-y-3">
        {options.map((option, index) => {
        const isActive = option.value === value;
        const isPast = index < currentIndex;
        return <div key={option.value} className={`flex items-center p-3.5 rounded-lg cursor-pointer border transition-all duration-200 min-h-[56px] ${isActive ? 'border-[#3b82f6] bg-[#1e3a8a]/20 shadow-md' : isPast ? 'border-[#10b981] bg-[#065f46]/20' : 'border-[#374151] hover:bg-[#1e293b] hover:shadow'}`} onClick={() => onChange(option.value)}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-xs font-medium transition-colors duration-200 ${isActive ? 'bg-[#3b82f6] text-white' : isPast ? 'bg-[#10b981] text-white' : 'bg-[#374151] text-gray-300'}`}>
                <span className="flex items-center">
                  <span className="inline-flex items-center justify-center w-3 h-3 mr-1 rounded bg-white text-[#1e293b] text-[9px]">#</span>
                  {index + 1}
                </span>
              </div>
              <span className={`font-medium ${isActive ? 'text-[#60a5fa]' : isPast ? 'text-[#34d399]' : 'text-gray-300'}`}>
                {option.label}
              </span>
            </div>;
      })}
      </div>
      {helperText && <p className="mt-2 text-sm text-gray-400">{helperText}</p>}
    </div>;
}