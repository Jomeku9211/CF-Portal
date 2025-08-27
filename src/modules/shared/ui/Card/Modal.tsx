import { forwardRef } from 'react';
import { X } from 'lucide-react';
import { cn } from './utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  'data-id'?: string;
}

interface ModalComponent extends React.FC<ModalProps> {
  Header: React.ForwardRefExoticComponent<ModalHeaderProps & React.RefAttributes<HTMLDivElement>>;
  Footer: React.ForwardRefExoticComponent<ModalFooterProps & React.RefAttributes<HTMLDivElement>>;
}

export const Modal: ModalComponent = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  'data-id': dataId
}) => {
  if (!isOpen) return null;
  const sizeStyles = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl'
  };
  return <div className="fixed inset-0 z-50 overflow-y-auto" data-id={dataId}>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        <div className={cn('relative w-full bg-white rounded-lg shadow-xl', sizeStyles[size])}>
          {title && <div className="flex items-center justify-between p-6 border-b border-[#D9D9D9]">
              <h2 className="text-xl font-semibold text-[#020305]">{title}</h2>
              <button onClick={onClose} className="p-1 hover:bg-[#F2F2F2] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[#808182]" />
              </button>
            </div>}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>;
};
interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-id'?: string;
}
Modal.Header = forwardRef<HTMLDivElement, ModalHeaderProps>(({
  className,
  'data-id': dataId,
  ...props
}, ref) => <div ref={ref} className={cn('mb-4', className)} data-id={dataId} {...props} />);
interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-id'?: string;
}
Modal.Footer = forwardRef<HTMLDivElement, ModalFooterProps>(({
  className,
  'data-id': dataId,
  ...props
}, ref) => <div ref={ref} className={cn('flex justify-end space-x-3 mt-6 pt-4 border-t border-[#D9D9D9]', className)} data-id={dataId} {...props} />);