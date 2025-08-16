import { ChevronDownIcon } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface SelectFieldProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function SelectField({ 
  label, 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option', 
  required = false, 
  className = '' 
}: SelectFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full px-4 py-3 bg-[#1e293b] border border-[#2a3344] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all duration-200 appearance-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      {value && options.find(opt => opt.value === value)?.description && (
        <p className="text-sm text-gray-400 mt-1">
          {options.find(opt => opt.value === value)?.description}
        </p>
      )}
    </div>
  );
}
