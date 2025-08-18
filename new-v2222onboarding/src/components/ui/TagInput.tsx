import React, { useState } from 'react';
import { XIcon, PlusIcon } from 'lucide-react';
interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  maxTags?: number;
  className?: string;
}
export function TagInput({
  value,
  onChange,
  label,
  placeholder = 'Add a tag...',
  helperText,
  maxTags,
  className = ''
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const handleAddTag = () => {
    if (inputValue.trim() === '' || maxTags && value.length >= maxTags) return;
    if (!value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
    }
    setInputValue('');
  };
  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };
  return <div className={`mb-1 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>}
      <div className="border border-[#374151] rounded-lg p-3 bg-[#111827] focus-within:ring-2 focus-within:ring-[#3b82f6] focus-within:border-[#3b82f6] transition-all duration-200 ease-in-out">
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map(tag => <div key={tag} className="inline-flex items-center bg-[#1e293b] text-[#60a5fa] rounded-full px-3 py-1.5 text-sm transition-all duration-200 hover:bg-[#2d3748]">
              <span>{tag}</span>
              <button type="button" className="ml-2 text-[#60a5fa] hover:text-[#3b82f6] focus:outline-none" onClick={() => handleRemoveTag(tag)}>
                <XIcon size={14} />
              </button>
            </div>)}
        </div>
        <div className="flex">
          <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={maxTags && value.length >= maxTags ? `Maximum ${maxTags} tags` : placeholder} disabled={maxTags && value.length >= maxTags} className="flex-1 outline-none bg-transparent text-white placeholder-gray-500 text-sm py-1" />
          <button type="button" onClick={handleAddTag} disabled={maxTags && value.length >= maxTags} className="text-gray-400 hover:text-white focus:outline-none disabled:opacity-50 transition-colors duration-200">
            <PlusIcon size={18} />
          </button>
        </div>
      </div>
      {helperText && <p className="mt-2 text-sm text-gray-400">
          {helperText}
          {maxTags && ` (${value.length}/${maxTags})`}
        </p>}
    </div>;
}