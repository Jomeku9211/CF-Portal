import React from 'react';
import { Check } from 'lucide-react';
import { cn } from './utils';
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  'data-id'?: string;
}
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  checked,
  'data-id': dataId,
  ...props
}) => {
  return <div className="flex items-center space-x-3" data-id={dataId}>
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} {...props} />
        <div className={cn('w-5 h-5 border-2 rounded transition-colors duration-200 cursor-pointer flex items-center justify-center', checked ? 'bg-[#2C426B] border-[#2C426B]' : 'bg-white border-[#B3B3B4] hover:border-[#808182]', className)} onClick={() => props.onChange?.({
        target: {
          checked: !checked
        }
      } as any)}>
          {checked && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
      {label && <label className="text-sm font-normal text-[#020305] cursor-pointer" onClick={() => props.onChange?.({
      target: {
        checked: !checked
      }
    } as any)}>
          {label}
        </label>}
    </div>;
};
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  'data-id'?: string;
}
export const Radio: React.FC<RadioProps> = ({
  label,
  className,
  checked,
  'data-id': dataId,
  ...props
}) => {
  return <div className="flex items-center space-x-3" data-id={dataId}>
      <div className="relative">
        <input type="radio" className="sr-only" checked={checked} {...props} />
        <div className={cn('w-5 h-5 border-2 rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center', checked ? 'bg-[#2C426B] border-[#2C426B]' : 'bg-white border-[#B3B3B4] hover:border-[#808182]', className)} onClick={() => props.onChange?.({
        target: {
          checked: !checked
        }
      } as any)}>
          {checked && <div className="w-2 h-2 bg-white rounded-full" />}
        </div>
      </div>
      {label && <label className="text-sm font-normal text-[#020305] cursor-pointer" onClick={() => props.onChange?.({
      target: {
        checked: !checked
      }
    } as any)}>
          {label}
        </label>}
    </div>;
};
interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  'data-id'?: string;
}
export const Toggle: React.FC<ToggleProps> = ({
  label,
  className,
  checked,
  'data-id': dataId,
  ...props
}) => {
  return <div className="flex items-center space-x-3" data-id={dataId}>
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} {...props} />
        <div className={cn('w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer relative', checked ? 'bg-[#2C426B]' : 'bg-[#B3B3B4]', className)} onClick={() => props.onChange?.({
        target: {
          checked: !checked
        }
      } as any)}>
          <div className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200', checked ? 'translate-x-6' : 'translate-x-0.5')} />
        </div>
      </div>
      {label && <label className="text-sm font-normal text-[#020305] cursor-pointer" onClick={() => props.onChange?.({
      target: {
        checked: !checked
      }
    } as any)}>
          {label}
        </label>}
    </div>;
};