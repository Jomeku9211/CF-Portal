import React from 'react';
import { CheckIcon } from 'lucide-react';
interface OnboardingStepperProps {
  currentStep: number;
  totalSteps: number;
}
export function OnboardingStepper({
  currentStep,
  totalSteps
}: OnboardingStepperProps) {
  const steps = ['Personal Info', 'Role', 'Skills', 'Preferences', 'Soft Skills', 'Verification', 'Final'];
  return <div className="px-6 sm:px-8 py-4 border-b border-gray-100">
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        return <div key={stepNumber} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${isActive ? 'bg-sanjuan-base text-white' : isCompleted ? 'bg-sanjuan-dark text-white' : 'bg-sanjuan-lightest text-sanjuan-dark'}`}>
                  {isCompleted ? <CheckIcon className="h-4 w-4" /> : stepNumber}
                </div>
                <span className={`mt-1 text-xs ${isActive || isCompleted ? 'text-sanjuan-dark font-medium' : 'text-sanjuan-base'}`}>
                  {step}
                </span>
              </div>
              {stepNumber < totalSteps && <div className={`h-0.5 w-full mx-2 ${stepNumber < currentStep ? 'bg-sanjuan-dark' : 'bg-sanjuan-lightest'}`} style={{
            width: '50px'
          }}></div>}
            </div>;
      })}
      </div>
      <div className="sm:hidden flex items-center justify-between">
        <span className="text-sm font-medium text-sanjuan-dark">
          Step {currentStep} of {totalSteps}: {steps[currentStep - 1]}
        </span>
        <span className="text-sm text-sanjuan-base">
          {Math.round(currentStep / totalSteps * 100)}% Complete
        </span>
      </div>
      <div className="mt-2 sm:hidden w-full bg-sanjuan-lightest rounded-full h-1.5">
        <div className="bg-sanjuan-base h-1.5 rounded-full transition-all duration-300" style={{
        width: `${currentStep / totalSteps * 100}%`
      }}></div>
      </div>
    </div>;
}