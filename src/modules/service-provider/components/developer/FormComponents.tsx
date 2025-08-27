import React from 'react';
import { useFormContext } from 'react-hook-form';
import { XIcon, AlertCircleIcon, UploadIcon } from 'lucide-react';

// Text Input Component
export function TextInput({
  label,
  name,
  placeholder = '',
  required = false,
  type = 'text'
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-sanjuan-dark mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label} is required` : false
        })}
        className={`w-full px-4 py-2.5 rounded-lg border ${
          errors[name] 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-sanjuan-lighter focus:ring-sanjuan-light'
        } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircleIcon className="h-4 w-4 mr-1" />
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

// Select Dropdown Component
export function SelectInput({
  label,
  name,
  options,
  placeholder = 'Select an option',
  required = false
}: {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-sanjuan-dark mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        {...register(name, {
          required: required ? `${label} is required` : false
        })}
        className={`w-full px-4 py-2.5 rounded-lg border ${
          errors[name] 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-sanjuan-lighter focus:ring-sanjuan-light'
        } focus:outline-none focus:ring-2 focus:border-transparent transition-colors bg-white`}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircleIcon className="h-4 w-4 mr-1" />
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

// Multi-select Checkbox Component
export function CheckboxGroup({
  label,
  name,
  options,
  required = false
}: {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}) {
  const {
    register,
    formState: { errors },
    watch
  } = useFormContext();

  const selectedValues = watch(name) || [];

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-sanjuan-dark mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="space-y-2">
        {options.map(option => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              type="checkbox"
              value={option.value}
              {...register(name, {
                required: required ? `Please select at least one ${label.toLowerCase()}` : false
              })}
              className="h-4 w-4 text-sanjuan-base focus:ring-sanjuan-light border-sanjuan-lighter rounded"
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 text-sm text-sanjuan-dark">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircleIcon className="h-4 w-4 mr-1" />
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

// File Upload Component
export function FileUpload({
  label,
  name,
  accept = '*/*',
  required = false
}: {
  label: string;
  name: string;
  accept?: string;
  required?: boolean;
}) {
  const {
    register,
    formState: { errors },
    watch
  } = useFormContext();

  const file = watch(name);

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-sanjuan-dark mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={name}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-sanjuan-lighter border-dashed rounded-lg cursor-pointer bg-sanjuan-lightest hover:bg-sanjuan-lighter transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon className="w-8 h-8 mb-2 text-sanjuan-base" />
            <p className="mb-2 text-sm text-sanjuan-dark">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-sanjuan-base">Any file type</p>
          </div>
          <input
            id={name}
            type="file"
            accept={accept}
            className="hidden"
            {...register(name, {
              required: required ? `${label} is required` : false
            })}
          />
        </label>
      </div>
      {file && (
        <div className="mt-2 flex items-center justify-between p-2 bg-sanjuan-lightest rounded-lg">
          <span className="text-sm text-sanjuan-dark">{file[0]?.name}</span>
          <button
            type="button"
            onClick={() => {
              // Clear the file input
              const input = document.getElementById(name) as HTMLInputElement;
              if (input) input.value = '';
            }}
            className="text-sanjuan-base hover:text-sanjuan-dark"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircleIcon className="h-4 w-4 mr-1" />
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

// Section Title Component
export function SectionTitle({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-sanjuan-dark mb-2">{title}</h2>
      <p className="text-sanjuan-base">{description}</p>
    </div>
  );
}
