import React from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from './utils';
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  onClose?: () => void;
  'data-id'?: string;
}
export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  onClose,
  className,
  children,
  'data-id': dataId,
  ...props
}) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };
  const variantStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };
  const iconStyles = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600'
  };
  const Icon = icons[variant];
  return <div className={cn('rounded-lg border p-4 flex items-start space-x-3', variantStyles[variant], className)} data-id={dataId} {...props}>
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconStyles[variant])} />
      <div className="flex-1">
        {title && <h4 className="text-sm font-semibold mb-1">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && <button onClick={onClose} className="flex-shrink-0 ml-auto pl-3">
          <X className="w-4 h-4" />
        </button>}
    </div>;
};