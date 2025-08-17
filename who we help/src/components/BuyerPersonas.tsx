import React, { useState } from 'react';
import { FounderContent } from './FounderContent';
import { TeamLeadContent } from './TeamLeadContent';
import { DeveloperContent } from './DeveloperContent';
import { AgencyContent } from './AgencyContent';
import { motion, AnimatePresence } from 'framer-motion';
type PersonaTab = 'founders' | 'teamLeads' | 'developers' | 'agencies';
export function BuyerPersonas() {
  const [activeTab, setActiveTab] = useState<PersonaTab>('founders');
  const handleTabClick = (tab: PersonaTab) => {
    setActiveTab(tab);
  };
  return <section className="w-full bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Who We Help
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We match the right people with the right opportunities based on
            skills, culture, and purpose alignment.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-100">
            <TabButton label="Founders" isActive={activeTab === 'founders'} onClick={() => handleTabClick('founders')} />
            <TabButton label="Team Leads" isActive={activeTab === 'teamLeads'} onClick={() => handleTabClick('teamLeads')} />
            <TabButton label="Developers" isActive={activeTab === 'developers'} onClick={() => handleTabClick('developers')} />
            <TabButton label="Agencies" isActive={activeTab === 'agencies'} onClick={() => handleTabClick('agencies')} />
          </div>
          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -20
            }} transition={{
              duration: 0.3
            }}>
                {activeTab === 'founders' && <FounderContent />}
                {activeTab === 'teamLeads' && <TeamLeadContent />}
                {activeTab === 'developers' && <DeveloperContent />}
                {activeTab === 'agencies' && <AgencyContent />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>;
}
interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}
function TabButton({
  label,
  isActive,
  onClick
}: TabButtonProps) {
  return <button className={`relative py-5 px-8 text-base font-medium transition-colors duration-200 whitespace-nowrap focus:outline-none
        ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`} onClick={onClick}>
      {label}
      {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" transition={{
      type: 'spring',
      duration: 0.5
    }} />}
    </button>;
}