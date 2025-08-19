import { useEffect, useState, useRef } from 'react';
import { ChevronDownIcon } from 'lucide-react';
interface DropdownOption {
  value: string;
  label: string;
  description?: string;
}
interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  className?: string;
}
export function Dropdown({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  helperText,
  className = ''
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.value === value);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return <div className={`mb-1 ${className}`} ref={dropdownRef}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>}
      <div className="relative">
        <button type="button" className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-left text-white focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all duration-200" onClick={() => setIsOpen(!isOpen)}>
          <span className="block truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
          </span>
        </button>
        {isOpen && <div className="absolute z-10 mt-1 w-full bg-[#1e293b] border border-[#374151] shadow-lg rounded-md py-1 text-base overflow-auto focus:outline-none max-h-60 transform transition-all duration-200 ease-in-out">
            {options.map(option => <div key={option.value} className="cursor-pointer select-none relative py-2.5 pl-4 pr-9 hover:bg-[#374151] transition-colors duration-150" onClick={() => {
          onChange(option.value);
          setIsOpen(false);
        }}>
                <div className="flex flex-col">
                  <span className={`block truncate ${value === option.value ? 'font-medium text-[#3b82f6]' : 'font-normal text-white'}`}>
                    {option.label}
                  </span>
                  {option.description && <span className="text-xs text-gray-400 mt-0.5">
                      {option.description}
                    </span>}
                </div>
              </div>)}
          </div>}
      </div>
      {helperText && <p className="mt-2 text-sm text-gray-400">{helperText}</p>}
    </div>;
}


