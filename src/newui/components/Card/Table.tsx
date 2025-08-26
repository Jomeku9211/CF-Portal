import React, { forwardRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from './utils';
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  'data-id'?: string;
}
export const Table: React.FC<TableProps> = ({
  striped = false,
  className,
  children,
  'data-id': dataId,
  ...props
}) => {
  return <div className="overflow-x-auto">
      <table className={cn('w-full border-collapse', className)} data-id={dataId} {...props}>
        {children}
      </table>
    </div>;
};
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  'data-id'?: string;
}
Table.Header = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({
  className,
  'data-id': dataId,
  ...props
}, ref) => <thead ref={ref} className={cn('bg-[#F2F2F2] border-b border-[#D9D9D9]', className)} data-id={dataId} {...props} />);
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  striped?: boolean;
  'data-id'?: string;
}
Table.Body = forwardRef<HTMLTableSectionElement, TableBodyProps>(({
  striped = false,
  className,
  'data-id': dataId,
  ...props
}, ref) => <tbody ref={ref} className={cn(striped && 'divide-y divide-[#D9D9D9]', className)} data-id={dataId} {...props} />);
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  striped?: boolean;
  'data-id'?: string;
}
Table.Row = forwardRef<HTMLTableRowElement, TableRowProps>(({
  striped = false,
  className,
  'data-id': dataId,
  ...props
}, ref) => <tr ref={ref} className={cn('border-b border-[#D9D9D9] hover:bg-[#F2F2F2] transition-colors', striped && 'even:bg-[#F2F2F2]', className)} data-id={dataId} {...props} />);
interface TableHeadProps extends React.HTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
  'data-id'?: string;
}
Table.Head = forwardRef<HTMLTableCellElement, TableHeadProps>(({
  sortable = false,
  sortDirection = null,
  onSort,
  className,
  children,
  'data-id': dataId,
  ...props
}, ref) => <th ref={ref} className={cn('px-6 py-4 text-left text-sm font-semibold text-[#020305]', sortable && 'cursor-pointer hover:bg-[#E9ECF0] select-none', className)} onClick={sortable ? onSort : undefined} data-id={dataId} {...props}>
      <div className="flex items-center space-x-2">
        <span>{children}</span>
        {sortable && <div className="flex flex-col">
            <ChevronUp className={cn('w-3 h-3', sortDirection === 'asc' ? 'text-[#2C426B]' : 'text-[#B3B3B4]')} />
            <ChevronDown className={cn('w-3 h-3 -mt-1', sortDirection === 'desc' ? 'text-[#2C426B]' : 'text-[#B3B3B4]')} />
          </div>}
      </div>
    </th>);
interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  'data-id'?: string;
}
Table.Cell = forwardRef<HTMLTableCellElement, TableCellProps>(({
  className,
  'data-id': dataId,
  ...props
}, ref) => <td ref={ref} className={cn('px-6 py-4 text-sm font-normal text-[#4D4E50]', className)} data-id={dataId} {...props} />);