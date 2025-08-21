import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  maxLength?: number;
  showCharacterCount?: boolean;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  startAdornment,
  endAdornment,
  size = 'medium',
  maxLength,
  showCharacterCount,
  disabled,
  readOnly,
  type = 'text',
  className,
  value,
  defaultValue,
  onChange,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };
  const sizeClasses = {
    small: 'h-8 text-sm',
    medium: 'h-10 text-base',
    large: 'h-12 text-lg'
  };
  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;
  const characterCount = String(inputValue).length;
  return <div className="w-full">
        {label && <label className={`block mb-1 text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
            {label}
          </label>}
        <div className="relative">
          {startAdornment && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {startAdornment}
            </div>}
          <input {...props} ref={ref} type={currentType} value={value} onChange={handleChange} disabled={disabled} readOnly={readOnly} maxLength={maxLength} className={`
              w-full
              ${sizeClasses[size]}
              px-3
              border
              rounded-md
              outline-none
              transition-colors
              ${startAdornment ? 'pl-10' : ''}
              ${endAdornment || isPassword ? 'pr-10' : ''}
              ${error ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}
              ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}
              ${readOnly ? 'bg-gray-50 cursor-default' : ''}
              focus:border-gray-900
              focus:ring-1
              focus:ring-gray-900
              ${className || ''}
            `} aria-invalid={!!error} aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined} />
          {(endAdornment || isPassword) && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {isPassword ? <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-1 hover:text-gray-700" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button> : endAdornment}
            </div>}
        </div>
        <div className="mt-1 flex justify-between">
          {(error || helperText) && <span id={error ? `${props.id}-error` : `${props.id}-helper`} className={`text-sm ${error ? 'text-gray-900' : 'text-gray-500'}`}>
              {error || helperText}
            </span>}
          {showCharacterCount && maxLength && <span className="text-sm text-gray-500">
              {characterCount}/{maxLength}
            </span>}
        </div>
      </div>;
});
Input.displayName = 'Input';