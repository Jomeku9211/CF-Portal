import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useFloating, offset, flip, size, autoUpdate, useClick, useDismiss, useRole, useInteractions, FloatingFocusManager } from '@floating-ui/react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import clsx from 'clsx';
export type SelectOption = {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
};
export type SelectProps = {
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  required?: boolean;
  className?: string;
};
export const Select = ({
  options,
  value,
  onChange,
  multiple = false,
  disabled = false,
  error,
  label,
  placeholder = 'Select option',
  searchable = false,
  required = false,
  className
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>(multiple ? Array.isArray(value) ? value : [] : value ? [value] : []);
  const {
    refs,
    floatingStyles,
    context
  } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(4), flip(), size({
      apply({
        rects,
        elements
      }) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`
        });
      }
    })],
    whileElementsMounted: autoUpdate
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const {
    getReferenceProps,
    getFloatingProps
  } = useInteractions([click, dismiss, role]);
  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue) ? selectedValues.filter(v => v !== optionValue) : [...selectedValues, optionValue];
      setSelectedValues(newValues);
      onChange?.(newValues);
    } else {
      setSelectedValues([optionValue]);
      onChange?.(optionValue);
      setOpen(false);
    }
  };
  const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()));
  const groupedOptions = filteredOptions.reduce((acc, option) => {
    const group = option.group || '';
    if (!acc[group]) acc[group] = [];
    acc[group].push(option);
    return acc;
  }, {} as Record<string, SelectOption[]>);
  const selectedLabels = selectedValues.map(v => options.find(o => o.value === v)?.label).filter(Boolean);
  return <div className="w-full">
      {label && <label className="block text-sm font-medium mb-1 text-gray-700">
          {label}
          {required && <span className="text-gray-500 ml-1">*</span>}
        </label>}
      <div ref={refs.setReference} {...getReferenceProps()} className={clsx('relative w-full border rounded-md px-3 py-2 text-sm', 'focus:outline-none focus:ring-2 focus:ring-gray-400', {
      'bg-gray-100 cursor-not-allowed': disabled,
      'border-gray-300': !error,
      'border-gray-700': error
    }, className)}>
        <div className="flex flex-wrap gap-1 min-h-[20px]">
          {selectedValues.length > 0 ? multiple ? selectedLabels.map(label => <span key={label} className="bg-gray-200 px-2 py-0.5 rounded-sm text-sm flex items-center gap-1">
                  {label}
                  <button onClick={e => {
            e.stopPropagation();
            handleOptionClick(options.find(o => o.label === label)?.value || '');
          }} className="hover:bg-gray-300 rounded-sm">
                    <X size={14} />
                  </button>
                </span>) : <span>{selectedLabels[0]}</span> : <span className="text-gray-400">{placeholder}</span>}
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <ChevronDown size={18} className={clsx('transition-transform', {
          'rotate-180': open
        })} />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-gray-700">{error}</p>}
      {open && !disabled && <FloatingFocusManager context={context} modal={false}>
          <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className="bg-white border border-gray-300 rounded-md shadow-lg z-50">
            {searchable && <div className="p-2 border-b border-gray-200">
                <div className="relative">
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full px-8 py-1 border border-gray-300 rounded-sm text-sm" placeholder="Search..." />
                  <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <X size={16} />
                    </button>}
                </div>
              </div>}
            <div className="max-h-60 overflow-auto">
              {Object.entries(groupedOptions).map(([group, options]) => <div key={group || 'ungrouped'}>
                  {group && <div className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-50">
                      {group}
                    </div>}
                  {options.map(option => <button key={option.value} onClick={() => handleOptionClick(option.value)} disabled={option.disabled} className={clsx('w-full px-3 py-2 text-sm text-left flex items-center', 'hover:bg-gray-100 focus:bg-gray-100 focus:outline-none', {
              'opacity-50 cursor-not-allowed': option.disabled
            })}>
                      {multiple && <span className="mr-2">
                          {selectedValues.includes(option.value) && <Check size={16} />}
                        </span>}
                      {option.label}
                    </button>)}
                </div>)}
            </div>
          </div>
        </FloatingFocusManager>}
    </div>;
};