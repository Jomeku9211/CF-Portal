import React, { createContext, useContext, useId } from 'react';
type Size = 'sm' | 'md' | 'lg';
type Orientation = 'horizontal' | 'vertical';
interface RadioGroupContextType {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size: Size;
  disabled?: boolean;
  error?: boolean;
  orientation: Orientation;
  spacing: string;
}
const RadioGroupContext = createContext<RadioGroupContextType | null>(null);
export interface RadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  size?: Size;
  disabled?: boolean;
  error?: boolean;
  orientation?: Orientation;
  legend?: string;
  spacing?: 'tight' | 'normal' | 'loose';
}
export const RadioGroup = ({
  name: nameProp,
  value,
  defaultValue,
  onChange,
  children,
  size = 'md',
  disabled = false,
  error = false,
  orientation = 'vertical',
  legend,
  spacing = 'normal'
}: RadioGroupProps) => {
  const fallbackName = useId();
  const name = nameProp ?? fallbackName;
  const spacingMap = {
    tight: 'space-y-2 space-x-4',
    normal: 'space-y-4 space-x-6',
    loose: 'space-y-6 space-x-8'
  };
  return <fieldset className={`border border-gray-300 rounded-md p-4 ${error ? 'border-gray-900' : ''}`} disabled={disabled}>
      {legend && <legend className="px-2 text-sm font-medium text-gray-700">
          {legend}
        </legend>}
      <div className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap items-center'} ${orientation === 'vertical' ? spacingMap[spacing].split(' ')[0] : spacingMap[spacing].split(' ')[1]}`} role="radiogroup">
        <RadioGroupContext.Provider value={{
        name,
        value,
        onChange,
        size,
        disabled,
        error,
        orientation,
        spacing
      }}>
          {children}
        </RadioGroupContext.Provider>
      </div>
    </fieldset>;
};
interface RadioProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}
export const Radio = ({
  value,
  children,
  disabled: radioDisabled
}: RadioProps) => {
  const context = useContext(RadioGroupContext);
  if (!context) throw new Error('Radio must be used within a RadioGroup');
  const {
    name,
    onChange,
    size,
    disabled: groupDisabled,
    error
  } = context;
  const isDisabled = radioDisabled || groupDisabled;
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  return <label className={`flex items-center gap-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <input type="radio" name={name} value={value} disabled={isDisabled} onChange={e => onChange?.(e.target.value)} className={`${sizeClasses[size]} border-2 border-gray-400 
          checked:bg-gray-800 checked:border-gray-800
          focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
          ${error ? 'border-gray-900' : ''}
          appearance-none rounded-full
          relative
          before:content-[''] before:block before:w-full before:h-full
          before:checked:bg-gray-100 before:checked:rounded-full before:checked:absolute
          before:checked:top-1/2 before:checked:left-1/2 before:checked:transform before:checked:-translate-x-1/2 before:checked:-translate-y-1/2
          before:checked:w-1/2 before:checked:h-1/2
        `} />
      <span className={`${labelSizeClasses[size]} ${error ? 'text-gray-900' : 'text-gray-700'}`}>
        {children}
      </span>
    </label>;
};