import React, { forwardRef, Children, cloneElement, Fragment, isValidElement } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from './utils';
interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  'data-id'?: string;
}
export const Tabs: React.FC<TabsProps> = ({
  value,
  onValueChange,
  children,
  'data-id': dataId
}) => {
  return <div className="w-full" data-id={dataId}>
      {Children.map(children, child => isValidElement(child) ? cloneElement(child as any, {
      value,
      onValueChange
    }) : child)}
    </div>;
};
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  'data-id'?: string;
}
Tabs.List = forwardRef<HTMLDivElement, TabsListProps>(({
  className,
  value,
  onValueChange,
  'data-id': dataId,
  ...props
}, ref) => <div ref={ref} className={cn('flex border-b border-[#D9D9D9]', className)} data-id={dataId} {...props}>
      {Children.map(props.children, child => isValidElement(child) ? cloneElement(child as any, {
    value,
    onValueChange
  }) : child)}
    </div>);
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  tabValue: string;
  'data-id'?: string;
}
Tabs.Trigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(({
  className,
  value,
  onValueChange,
  tabValue,
  'data-id': dataId,
  ...props
}, ref) => {
  const isActive = value === tabValue;
  return <button ref={ref} className={cn('px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px', isActive ? 'text-[#2C426B] border-[#2C426B]' : 'text-[#808182] border-transparent hover:text-[#4D4E50] hover:border-[#B3B3B4]', className)} onClick={() => onValueChange?.(tabValue)} data-id={dataId} {...props} />;
});
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  tabValue: string;
  'data-id'?: string;
}
Tabs.Content = forwardRef<HTMLDivElement, TabsContentProps>(({
  className,
  value,
  tabValue,
  'data-id': dataId,
  ...props
}, ref) => {
  if (value !== tabValue) return null;
  return <div ref={ref} className={cn('mt-6', className)} data-id={dataId} {...props} />;
});
interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
  'data-id'?: string;
}
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  'data-id': dataId
}) => {
  return <nav className="flex" data-id={dataId}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 text-[#B3B3B4] mx-2" />}
            {item.href ? <a href={item.href} className="text-sm font-normal text-[#2C426B] hover:text-[#233455] transition-colors">
                {item.label}
              </a> : <span className="text-sm font-normal text-[#808182]">
                {item.label}
              </span>}
          </li>)}
      </ol>
    </nav>;
};
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  'data-id'?: string;
}
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  'data-id': dataId
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }
    rangeWithDots.push(...range);
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }
    return rangeWithDots;
  };
  return <nav className="flex items-center justify-center space-x-1" data-id={dataId}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg border border-[#D9D9D9] text-[#808182] hover:bg-[#F2F2F2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <ChevronLeft className="w-4 h-4" />
      </button>
      {getVisiblePages().map((page, index) => <Fragment key={index}>
          {page === '...' ? <span className="px-3 py-2 text-[#808182]">...</span> : <button onClick={() => onPageChange(page as number)} className={cn('px-3 py-2 rounded-lg border text-sm font-medium transition-colors', currentPage === page ? 'bg-[#2C426B] text-white border-[#2C426B]' : 'border-[#D9D9D9] text-[#808182] hover:bg-[#F2F2F2]')}>
              {page}
            </button>}
        </Fragment>)}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-[#D9D9D9] text-[#808182] hover:bg-[#F2F2F2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>;
};