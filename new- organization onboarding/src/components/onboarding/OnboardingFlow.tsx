import React, { useState } from 'react';
import { OnboardingProgress } from './OnboardingProgress';
import { OrganizationProfile } from './OrganizationProfile';
type OnboardingStep = 'organization' | 'team' | 'hiring' | 'persona';
export function OnboardingFlow() {
  const [currentStep] = useState<OnboardingStep>('organization');
  return <div className="w-full min-h-screen flex flex-col items-center py-8 px-4 md:px-6">
      <div className="w-full max-w-4xl">
        <OnboardingProgress currentStep={currentStep} />
        {currentStep === 'organization' && <OrganizationProfile />}
        {/* Other steps will be implemented later */}
        {currentStep === 'team' && <div>Team Onboarding (Coming Soon)</div>}
        {currentStep === 'hiring' && <div>Hiring Intent (Coming Soon)</div>}
        {currentStep === 'persona' && <div>Job Persona Creation (Coming Soon)</div>}
      </div>
    </div>;
}