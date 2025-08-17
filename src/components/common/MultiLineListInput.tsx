import React, { useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';

export function MultiLineListInput({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  maxItems = 10
}: {
  label: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
  required?: boolean;
  className?: string;
  maxItems?: number;
}) {
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim() && value.length < maxItems) {
      onChange([...value, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 bg-[#1e293b] border border-[#2a3344] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all duration-200"
        />
        <button
          type="button"
          onClick={addItem}
          disabled={!inputValue.trim() || value.length >= maxItems}
          className="px-4 py-3 bg-[#3b82f6] hover:bg-[#2563eb] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200"
        >
          <PlusIcon size={20} />
        </button>
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-[#1e293b] border border-[#2a3344] rounded-lg px-4 py-2">
              <span className="text-white">{item}</span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                <XIcon size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length >= maxItems && (
        <p className="text-sm text-gray-400">
          Maximum {maxItems} items allowed
        </p>
      )}
    </div>
  );
}



