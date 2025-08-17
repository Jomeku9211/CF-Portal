import React, { useState } from 'react';
import { TechnicalRequirements } from './job-persona/TechnicalRequirements';
import { RoleContext } from './job-persona/RoleContext';
import { TeamFit } from './job-persona/TeamFit';
export function JobPersona({
  onNext,
  onBack
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState('technical');
  return <div>
      <h2 className="text-2xl font-bold mb-6">Job Persona Creation</h2>
      <p className="text-gray-400 mb-6">
        Define the details of your ideal candidate for this role.
      </p>
      <div className="border-b border-gray-700 mb-6">
        <div className="flex space-x-4">
          <button onClick={() => setActiveTab('technical')} className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'technical' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300'}`}>
            Role & Technical Requirements
          </button>
          <button onClick={() => setActiveTab('context')} className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'context' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300'}`}>
            Role Context & Responsibilities
          </button>
          <button onClick={() => setActiveTab('teamfit')} className={`py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'teamfit' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300'}`}>
            Team Fit & Interview Flow
          </button>
        </div>
      </div>
      <div className="mt-6">
        {activeTab === 'technical' && <TechnicalRequirements />}
        {activeTab === 'context' && <RoleContext />}
        {activeTab === 'teamfit' && <TeamFit />}
      </div>
    </div>;
}