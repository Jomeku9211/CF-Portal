import React from 'react';
import { CheckIcon } from 'lucide-react';
type OnboardingStep = 'organization' | 'team' | 'hiring' | 'persona';
interface OnboardingProgressProps {
  currentStep: OnboardingStep;
}
export function OnboardingProgress({
  currentStep
}: OnboardingProgressProps) {
  const steps = [{
    id: 'organization',
    label: 'Onboarding Organization',
    number: 1
  }, {
    id: 'team',
    label: 'Onboarding Team',
    number: 2
  }, {
    id: 'hiring',
    label: 'Hiring Intent',
    number: 3
  }, {
    id: 'persona',
    label: 'Job Persona Creation',
    number: 4
  }];
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  return <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = index < currentStepIndex;
        return <div key={step.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2
                  ${isActive ? 'bg-[#3b82f6] text-white' : isCompleted ? 'bg-[#10b981] text-white' : 'bg-[#374151] text-gray-300'}`}>
                {isCompleted ? <CheckIcon size={18} /> : step.number}
              </div>
              <span className={`text-xs text-center max-w-[100px]
                  ${isActive ? 'text-white font-medium' : isCompleted ? 'text-[#10b981]' : 'text-gray-400'}`}>
                {step.label}
              </span>
              {/* Progress dots for the active step */}
              {isActive && <div className="flex space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>)}
                </div>}
            </div>;
      })}
      </div>
      {/* Progress bar */}
      <div className="w-full bg-[#374151] h-1.5 rounded-full">
        <div className="bg-[#3b82f6] h-1.5 rounded-full" style={{
        width: `${currentStepIndex / (steps.length - 1) * 100}%`
      }}></div>
      </div>
      <div className="flex justify-between mt-3 text-sm text-[#94a3b8]">
        <span className="text-[#3b82f6]">
          Step {currentStepIndex + 1} of {steps.length}
        </span>
        <button className="text-[#3b82f6] hover:text-[#60a5fa]">
          Save & continue later
        </button>
      </div>
    </div>;
}