import React, { useState } from 'react';
export interface TabItem {
  id: string;
  label: string;
}
export interface BoxedTabsProps {
  tabs?: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  'data-id'?: string;
}
const defaultTabs: TabItem[] = [{
  id: 'monthly',
  label: 'Monthly'
}, {
  id: 'quarterly',
  label: 'Quarterly'
}, {
  id: 'yearly',
  label: 'Yearly'
}];
export function BoxedTabs({
  tabs = defaultTabs,
  activeTab,
  onTabChange,
  className = '',
  'data-id': dataId
}: BoxedTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');
  const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab;
  const handleTabClick = (tabId: string) => {
    if (activeTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };
  return <nav className={`flex space-x-1 rounded-lg bg-neutral-lightest p-1 ${className}`} aria-label="Tabs" data-id={dataId}>
      {tabs.map(tab => <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`w-full py-2.5 text-sm font-medium rounded-md transition-colors ${currentActiveTab === tab.id ? 'bg-neutral-white text-sanjuan-dark shadow' : 'text-neutral-base hover:text-neutral-darker'}`}>
          {tab.label}
        </button>)}
    </nav>;
}