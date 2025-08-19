import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainProgressBar } from '../common/MainProgressBar';
import { OrganizationProfile } from './OrganizationProfile';
import { TeamOnboarding } from './TeamOnboarding';
import { HiringIntent } from './HiringIntent';
import { JobPersonaCreation } from './JobPersonaCreation';

export function Onboarding1() {
  const navigate = useNavigate();
  const [currentMainStep, setCurrentMainStep] = useState(1);

  const mainSteps = [
    { id: 1, name: 'Onboarding Organization', completed: currentMainStep > 1, active: currentMainStep === 1, subSteps: 1, currentSubStep: 0 },
    { id: 2, name: 'Onboarding Team', completed: currentMainStep > 2, active: currentMainStep === 2, subSteps: 3, currentSubStep: 0 },
    { id: 3, name: 'Hiring Intent', completed: currentMainStep > 3, active: currentMainStep === 3, subSteps: 1, currentSubStep: 0 },
    { id: 4, name: 'Job Persona Creation', completed: currentMainStep > 4, active: currentMainStep === 4, subSteps: 1, currentSubStep: 0 },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        <div className="mb-6">
          <div className="text-sm text-gray-400">
            <span className="hover:text-blue-400 cursor-pointer" onClick={() => navigate('/role-selection')}>Select Role</span>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Onboarding</span>
          </div>
        </div>

        <div className="mb-8 w-full">
          <MainProgressBar steps={mainSteps} currentMainStep={currentMainStep} onStepClick={(id) => id < currentMainStep && setCurrentMainStep(id)} />
        </div>

        <div className="flex-grow bg-[#1a2234] rounded-xl shadow-md p-6 md:p-8 border border-[#2a3344]">
          {currentMainStep === 1 && (
            <OrganizationProfile onSubmitSuccess={() => setCurrentMainStep(2)} />
          )}
          {currentMainStep === 2 && (
            <TeamOnboarding updateFormData={() => {}} onComplete={() => setCurrentMainStep(3)} formData={{}} />
          )}
          {currentMainStep === 3 && (
            <HiringIntent onNext={() => setCurrentMainStep(4)} onBack={() => setCurrentMainStep(2)} />
          )}
          {currentMainStep === 4 && (
            <JobPersonaCreation formData={{}} updateFormData={() => {}} onComplete={() => {}} />
          )}
        </div>
      </div>
    </div>
  );
}


