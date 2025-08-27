import React from 'react';
import { cn } from './utils';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  'data-id'?: string;
}
export const Input: React.FC<InputProps> = ({
  label,
  error,
  success,
  helper,
  className,
  'data-id': dataId,
  ...props
}) => {
  const inputStyles = cn('w-full px-4 py-3 text-base font-normal border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1', error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : success ? 'border-green-500 focus:ring-green-500 focus:border-green-500' : 'border-[#B3B3B4] focus:ring-[#2C426B] focus:border-[#2C426B] hover:border-[#808182]', 'placeholder:text-[#808182]', className);
  return <div className="w-full" data-id={dataId}>
      {label && <label className="block text-sm font-medium text-[#020305] mb-2">
          {label}
        </label>}
      <input className={inputStyles} {...props} />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
      {helper && !error && !success && <p className="mt-2 text-sm text-[#808182]">{helper}</p>}
    </div>;
};
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  'data-id'?: string;
}
export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  success,
  helper,
  className,
  'data-id': dataId,
  ...props
}) => {
  const textareaStyles = cn('w-full px-4 py-3 text-base font-normal border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 resize-vertical min-h-[120px]', error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : success ? 'border-green-500 focus:ring-green-500 focus:border-green-500' : 'border-[#B3B3B4] focus:ring-[#2C426B] focus:border-[#2C426B] hover:border-[#808182]', 'placeholder:text-[#808182]', className);
  return <div className="w-full" data-id={dataId}>
      {label && <label className="block text-sm font-medium text-[#020305] mb-2">
          {label}
        </label>}
      <textarea className={textareaStyles} {...props} />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
      {helper && !error && !success && <p className="mt-2 text-sm text-[#808182]">{helper}</p>}
    </div>;
};
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  options: {
    value: string;
    label: string;
  }[];
  'data-id'?: string;
}
export const Select: React.FC<SelectProps> = ({
  label,
  error,
  success,
  helper,
  options,
  className,
  'data-id': dataId,
  ...props
}) => {
  const selectStyles = cn('w-full px-4 py-3 text-base font-normal border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-white', error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : success ? 'border-green-500 focus:ring-green-500 focus:border-green-500' : 'border-[#B3B3B4] focus:ring-[#2C426B] focus:border-[#2C426B] hover:border-[#808182]', className);
  return <div className="w-full" data-id={dataId}>
      {label && <label className="block text-sm font-medium text-[#020305] mb-2">
          {label}
        </label>}
      <select className={selectStyles} {...props}>
        {options.map(option => <option key={option.value} value={option.value}>
            {option.label}
          </option>)}
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
      {helper && !error && !success && <p className="mt-2 text-sm text-[#808182]">{helper}</p>}
    </div>;
};