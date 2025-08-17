import React, { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { RoleSelection } from './RoleSelection';
import { OrganizationOnboarding } from './OrganizationOnboarding';
import { TeamOnboarding } from './TeamOnboarding';
import { HiringIntent } from './HiringIntent';
import { JobPersona } from './JobPersona';
import { CheckIcon } from 'lucide-react';
type Role = 'client' | 'freelancer' | 'agency' | null;
export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0); // Start at step 0 for role selection
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const handleRoleSelection = (role: Role) => {
    setSelectedRole(role);
    setCurrentStep(1); // Move to first onboarding step after role selection
  };
  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };
  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <RoleSelection onContinue={handleRoleSelection} />;
      case 1:
        return <OrganizationOnboarding onNext={goToNextStep} />;
      case 2:
        return <TeamOnboarding onNext={goToNextStep} onBack={goToPreviousStep} />;
      case 3:
        return <HiringIntent onNext={goToNextStep} onBack={goToPreviousStep} />;
      case 4:
        return <JobPersona onNext={goToNextStep} onBack={goToPreviousStep} />;
      default:
        return <RoleSelection onContinue={handleRoleSelection} />;
    }
  };
  return <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Coderfarm</h1>
        <p className="text-gray-400">
          Founder-aligned, fit-first hiring for startups
        </p>
      </div>
      {currentStep > 0 && <ProgressBar currentStep={currentStep} />}
      <div className="mt-8 bg-[#171c33] rounded-lg p-6 shadow-lg">
        {renderStep()}
      </div>
      {currentStep > 0 && <div className="mt-6 flex justify-between">
          {currentStep > 1 && <button onClick={goToPreviousStep} className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-600 rounded-md hover:bg-gray-800 transition-colors">
              ← Back
            </button>}
          {currentStep < 4 ? <button onClick={goToNextStep} className="ml-auto flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              Continue
            </button> : <button className="ml-auto flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              Get Started <CheckIcon size={18} />
            </button>}
        </div>}
    </div>;
}