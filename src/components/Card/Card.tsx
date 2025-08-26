import { forwardRef } from 'react';
import { cn } from './utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'feature' | 'pricing' | 'testimonial';
  hover?: boolean;
  selected?: boolean;
  'data-id'?: string;
}

interface CardComponent extends React.FC<CardProps> {
  Header: React.ForwardRefExoticComponent<CardHeaderProps & React.RefAttributes<HTMLDivElement>>;
  Title: React.ForwardRefExoticComponent<CardTitleProps & React.RefAttributes<HTMLHeadingElement>>;
  Content: React.ForwardRefExoticComponent<CardContentProps & React.RefAttributes<HTMLDivElement>>;
  Footer: React.ForwardRefExoticComponent<CardFooterProps & React.RefAttributes<HTMLDivElement>>;
}

export const Card: CardComponent = ({
  variant = 'default',
  hover = false,
  selected = false,
  className,
  children,
  'data-id': dataId,
  ...props
}) => {
  const baseStyles = 'rounded-lg border transition-all duration-200';
  const variantStyles = {
    default: 'bg-white border-[#D9D9D9] p-6',
    feature: 'bg-white border-[#D9D9D9] p-8 text-center',
    pricing: 'bg-white border-[#2C426B] p-8 relative',
    testimonial: 'bg-[#F2F2F2] border-[#D9D9D9] p-6'
  };
  const interactiveStyles = hover ? 'hover:shadow-lg hover:border-[#2C426B] cursor-pointer' : '';
  const selectedStyles = selected ? 'border-[#2C426B] shadow-md' : '';
  return <div className={cn(baseStyles, variantStyles[variant], interactiveStyles, selectedStyles, className)} data-id={dataId} {...props}>
      {children}
    </div>;
};
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-id'?: string;
}
Card.Header = forwardRef<HTMLDivElement, CardHeaderProps>(({
  className,
  'data-id': dataId,
  ...props
}, ref) => <div ref={ref} className={cn('mb-4', className)} data-id={dataId} {...props} />);
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  'data-id'?: string;
}
Card.Title = forwardRef<HTMLHeadingElement, CardTitleProps>(({
  className,
  'data-id': dataId,
  ...props
}, ref) => <h3 ref={ref} className={cn('text-xl font-semibold text-[#020305] mb-2', className)} data-id={dataId} {...props} />);
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-id'?: string;
}
Card.Content = forwardRef<HTMLDivElement, CardContentProps>(({
  className,
  'data-id': dataId,
  ...props
}, ref) => <div ref={ref} className={cn('text-base font-normal text-[#4D4E50]', className)} data-id={dataId} {...props} />);
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-id'?: string;
}
Card.Footer = forwardRef<HTMLDivElement, CardFooterProps>(({
  className,
  'data-id': dataId,
  ...props
}, ref) => <div ref={ref} className={cn('mt-6 pt-4 border-t border-[#D9D9D9]', className)} data-id={dataId} {...props} />);