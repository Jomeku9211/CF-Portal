import React from 'react';
// Use the latest code from new-v2222onboarding
import { OrganizationProfile } from '../../../new-v2222onboarding/src/components/onboarding/OrganizationProfile';

export default function OnboardingNew() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        <div className="mb-6">
          <div className="text-sm text-gray-400">
            <span className="hover:text-blue-400 cursor-pointer" onClick={() => window.history.back()}>Select Role</span>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Onboarding</span>
          </div>
        </div>
        <div className="flex-grow bg-[#1a2234] rounded-xl shadow-md p-6 md:p-8 border border-[#2a3344]">
          <OrganizationProfile onCompleted={() => { /* stay on page after completion */ }} />
        </div>
      </div>
    </div>
  );
}


