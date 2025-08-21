import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import classNames from 'classnames';
type TabsContextType = {
  activeTab: string;
  setActiveTab: (id: string) => void;
  orientation: 'horizontal' | 'vertical';
  variant: 'default' | 'underlined' | 'contained' | 'elevated';
};
const TabsContext = createContext<TabsContextType | null>(null);
export type TabsProps = {
  defaultTab?: string;
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'underlined' | 'contained' | 'elevated';
  scrollable?: boolean;
  className?: string;
};
export function Tabs({
  defaultTab,
  children,
  orientation = 'horizontal',
  variant = 'default',
  scrollable = false,
  className
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || '');
  return <TabsContext.Provider value={{
    activeTab,
    setActiveTab,
    orientation,
    variant
  }}>
      <div className={classNames('w-full', orientation === 'horizontal' ? 'flex flex-col' : 'flex flex-row', className)}>
        {children}
      </div>
    </TabsContext.Provider>;
}
export type TabListProps = {
  children: React.ReactNode;
  className?: string;
};
export function TabList({
  children,
  className
}: TabListProps) {
  const context = useContext(TabsContext);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const {
      scrollLeft,
      scrollWidth,
      clientWidth
    } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => {
      setShowScrollButtons(container.scrollWidth > container.clientWidth);
      handleScroll();
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth / 2;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };
  const containerClasses = classNames('relative flex', context?.orientation === 'vertical' ? 'flex-col' : 'flex-row', context?.variant === 'elevated' && 'shadow-md', context?.variant === 'contained' && 'bg-gray-100 p-1 rounded-lg', className);
  return <div className={containerClasses} role="tablist" aria-orientation={context?.orientation}>
      {showScrollButtons && context?.orientation === 'horizontal' && <button onClick={() => scroll('left')} className={classNames('absolute left-0 z-10 h-full px-1 transition-opacity', !canScrollLeft && 'opacity-0')} aria-hidden="true">
          <ChevronLeft className="h-4 w-4" />
        </button>}
      <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide" onScroll={handleScroll}>
        {children}
      </div>
      {showScrollButtons && context?.orientation === 'horizontal' && <button onClick={() => scroll('right')} className={classNames('absolute right-0 z-10 h-full px-1 transition-opacity', !canScrollRight && 'opacity-0')} aria-hidden="true">
          <ChevronRight className="h-4 w-4" />
        </button>}
    </div>;
}
export type TabProps = {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
};
export function Tab({
  id,
  children,
  disabled,
  icon,
  badge,
  className
}: TabProps) {
  const context = useContext(TabsContext);
  const isActive = context?.activeTab === id;
  const handleClick = () => {
    if (!disabled && context?.setActiveTab) {
      context.setActiveTab(id);
    }
  };
  const tabClasses = classNames('relative flex items-center gap-2 px-4 py-2 transition-all', disabled && 'cursor-not-allowed opacity-50', !disabled && 'cursor-pointer hover:bg-gray-100', context?.variant === 'default' && isActive && 'bg-gray-100 border-b-2 border-gray-900', context?.variant === 'contained' && isActive && 'bg-white rounded', context?.variant === 'elevated' && isActive && 'bg-gray-50', className);
  return <button role="tab" aria-selected={isActive} aria-disabled={disabled} onClick={handleClick} className={tabClasses} tabIndex={isActive ? 0 : -1}>
      {icon && <span className="opacity-75">{icon}</span>}
      <span>{children}</span>
      {badge && <span className="ml-2">{badge}</span>}
      {context?.variant === 'underlined' && isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />}
    </button>;
}
export type TabPanelProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};
export function TabPanel({
  id,
  children,
  className
}: TabPanelProps) {
  const context = useContext(TabsContext);
  const isActive = context?.activeTab === id;
  if (!isActive) return null;
  return <div role="tabpanel" aria-labelledby={id} className={classNames('p-4', className)}>
      {children}
    </div>;
}