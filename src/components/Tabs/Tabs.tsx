import React, { useState } from 'react';
export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
}
export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  'data-id'?: string;
}
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  className = '',
  'data-id': dataId
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const handleTabClick = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };
  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;
  return <div className={className} data-id={dataId}>
      <nav className="-mb-px flex space-x-8">
        {tabs.map(tab => <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-sanjuan-base text-sanjuan-base' : 'border-transparent text-neutral-base hover:text-neutral-darker hover:border-neutral-light'}`} role="tab" aria-selected={activeTab === tab.id} aria-controls={`tabpanel-${tab.id}`}>
            {tab.label}
          </button>)}
      </nav>
      {activeTabContent && <div id={`tabpanel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="mt-6">
          {activeTabContent}
        </div>}
    </div>;
};