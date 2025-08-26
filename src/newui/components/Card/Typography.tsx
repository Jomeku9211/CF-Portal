import React from 'react';
import { cn } from './utils';
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  'data-id'?: string;
}
export const Heading: React.FC<HeadingProps> = ({
  level,
  className,
  'data-id': dataId,
  ...props
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const levelStyles = {
    1: 'text-4xl font-extrabold text-[#020305] leading-tight',
    2: 'text-3xl font-bold text-[#020305] leading-tight',
    3: 'text-2xl font-semibold text-[#020305] leading-tight',
    4: 'text-xl font-semibold text-[#020305] leading-tight',
    5: 'text-lg font-medium text-[#020305] leading-tight',
    6: 'text-base font-medium text-[#020305] leading-tight'
  };
  return <Tag className={cn(levelStyles[level], className)} data-id={dataId} {...props} />;
};
interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'large' | 'medium' | 'regular' | 'small' | 'tiny';
  weight?: 'extrabold' | 'bold' | 'semibold' | 'medium' | 'normal' | 'light';
  variant?: 'primary' | 'secondary' | 'muted' | 'placeholder';
  'data-id'?: string;
}
export const Text: React.FC<TextProps> = ({
  size = 'regular',
  weight = 'normal',
  variant = 'primary',
  className,
  'data-id': dataId,
  ...props
}) => {
  const sizeStyles = {
    large: 'text-xl',
    medium: 'text-lg',
    regular: 'text-base',
    small: 'text-sm',
    tiny: 'text-xs'
  };
  const weightStyles = {
    extrabold: 'font-extrabold',
    bold: 'font-bold',
    semibold: 'font-semibold',
    medium: 'font-medium',
    normal: 'font-normal',
    light: 'font-light'
  };
  const variantStyles = {
    primary: 'text-[#020305]',
    secondary: 'text-[#4D4E50]',
    muted: 'text-[#808182]',
    placeholder: 'text-[#B3B3B4]'
  };
  return <p className={cn(sizeStyles[size], weightStyles[weight], variantStyles[variant], 'leading-relaxed', className)} data-id={dataId} {...props} />;
};
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'regular' | 'small';
  required?: boolean;
  'data-id'?: string;
}
export const Label: React.FC<LabelProps> = ({
  size = 'regular',
  required = false,
  className,
  children,
  'data-id': dataId,
  ...props
}) => {
  const sizeStyles = {
    regular: 'text-sm',
    small: 'text-xs'
  };
  return <label className={cn(sizeStyles[size], 'font-medium text-[#020305]', className)} data-id={dataId} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>;
};