import React, { Component } from 'react';
import { useFormContext } from 'react-hook-form';
import { XIcon, AlertCircleIcon, UploadIcon } from 'lucide-react';
// Text Input Component
export function TextInput({
  label,
  name,
  placeholder = '',
  required = false,
  type = 'text'
}) {
  const {
    register,
    formState: {
      errors
    }
  } = useFormContext();
  return <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-sanjuan-dark mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input id={name} type={type} placeholder={placeholder} {...register(name, {
      required: required ? `${label} is required` : false
    })} className={`w-full px-4 py-2.5 rounded-lg border ${errors[name] ? 'border-red-300 focus:ring-red-500' : 'border-sanjuan-lighter focus:ring-sanjuan-light'} focus:outline-none focus:ring-2 focus:border-transparent transition-colors`} />
      {errors[name] && <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircleIcon className="h-4 w-4 mr-1" />
          {errors[name].message}
        </p>}
    </div>;
}
// Select Dropdown Component
export function SelectInput({
  label,
  name,
  options,
  placeholder = 'Select an option',
  required = false
}) {
  const {
    register,
    formState: {
      errors
    }
  } = useFormContext();
  return <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-sanjuan-dark mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select id={name} {...register(name, {
      required: required ? `${label} is required` : false
    })} className={`w-full px-4 py-2.5 rounded-lg border ${errors[name] ? 'border-red-300 focus:ring-red-500' : 'border-sanjuan-lighter focus:ring-sanjuan-light'} focus:outline-none focus:ring-2 focus:border-transparent transition-colors bg-white`}>
        <option value="">{placeholder}</option>
        {options.map(option => <option key={option.value} value={option.value}>
            {option.label}
          </option>)}
      </select>
      {errors[name] && <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircleIcon className="h-4 w-4 mr-1" />
          {errors[name].message}
        </p>}
    </div>;
}
// Multi-select Checkbox Component
export function CheckboxGroup({
  label,
  name,
  options,
  required = false
}) {
  const {
    register,
    formState: {
      errors
    },
    watch
  } = useFormContext();
  const selectedValues = watch(name) || [];
  return <div className="mb-5">
      <label className="block text-sm font-medium text-sanjuan-dark mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="space-y-2">
        {options.map(option => <div key={option.value} className="flex items-center">
            <input id={`${name}-${option.value}`} type="checkbox" value={option.value} {...register(name, {
          required: required ? `Please select at least one ${label.toLowerCase()}` : false
        })} className="h-4 w-4 text-sanjuan-base focus:ring-sanjuan-light border-sanjuan-lighter rounded" />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 text-sm text-sanjuan-dark">
              {option.label}
            </label>
          </div>)}
      </div>
      {errors[name] && <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircleIcon className="h-4 w-4 mr-1" />
          {errors[name].message}
        </p>}
    </div>;
}
// File Upload Component
export function FileUpload({
  label,
  name,
  accept = '*',
  required = false
}) {
  const {
    register,
    formState: {
      errors
    },
    watch,
    setValue
  } = useFormContext();
  const file = watch(name);
  const handleRemoveFile = () => {
    setValue(name, null);
  };
  return <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-sanjuan-dark mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {!file ? <div className="border-2 border-dashed border-sanjuan-lighter rounded-lg p-4 text-center">
          <input id={name} type="file" accept={accept} className="hidden" {...register(name, {
        required: required ? `${label} is required` : false
      })} />
          <label htmlFor={name} className="cursor-pointer flex flex-col items-center justify-center py-4">
            <UploadIcon className="h-8 w-8 text-sanjuan-base mb-2" />
            <span className="text-sm text-sanjuan-dark font-medium">
              Click to upload
            </span>
            <span className="text-xs text-sanjuan-base mt-1">
              or drag and drop
            </span>
          </label>
        </div> : <div className="flex items-center justify-between bg-sanjuan-lightest rounded-lg p-3">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-md mr-3">
              <UploadIcon className="h-5 w-5 text-sanjuan-base" />
            </div>
            <div className="text-sm truncate">
              <p className="font-medium text-sanjuan-dark truncate">
                {file[0]?.name || 'File uploaded'}
              </p>
              <p className="text-xs text-sanjuan-base">
                {file[0]?.size ? `${Math.round(file[0].size / 1024)} KB` : ''}
              </p>
            </div>
          </div>
          <button type="button" onClick={handleRemoveFile} className="text-sanjuan-base hover:text-sanjuan-dark p-1">
            <XIcon className="h-5 w-5" />
          </button>
        </div>}
      {errors[name] && <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircleIcon className="h-4 w-4 mr-1" />
          {errors[name].message}
        </p>}
    </div>;
}
// Section Title Component
export function SectionTitle({
  title,
  description = ''
}) {
  return <div className="mb-6">
      <h2 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
        {title}
      </h2>
      {description && <p className="mt-1 text-sm text-sanjuan-base">{description}</p>}
    </div>;
}