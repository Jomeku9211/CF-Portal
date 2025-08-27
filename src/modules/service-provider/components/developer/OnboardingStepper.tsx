import React from 'react';
import { CheckIcon } from 'lucide-react';

interface OnboardingStepperProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingStepper({ currentStep, totalSteps }: OnboardingStepperProps) {
  const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic information' },
    { id: 2, title: 'Role Selection', description: 'Work preferences' },
    { id: 3, title: 'Skills', description: 'Technical expertise' },
    { id: 4, title: 'Work Preferences', description: 'Team & culture' },
    { id: 5, title: 'Soft Skills', description: 'Personal attributes' },
    { id: 6, title: 'Verification', description: 'Documents & profiles' },
    { id: 7, title: 'Final', description: 'Complete profile' }
  ];

  return (
    <div className="bg-white px-6 sm:px-8 py-6 border-b border-gray-100">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  step.id < currentStep
                    ? 'bg-green-500 border-green-500 text-white'
                    : step.id === currentStep
                    ? 'bg-sanjuan-base border-sanjuan-base text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {step.id < currentStep ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              
              <div className="mt-2 text-center">
                <div
                  className={`text-xs font-medium ${
                    step.id <= currentStep ? 'text-sanjuan-dark' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </div>
                <div
                  className={`text-xs ${
                    step.id <= currentStep ? 'text-sanjuan-base' : 'text-gray-400'
                  }`}
                >
                  {step.description}
                </div>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className="mx-4 w-16 h-0.5 bg-gray-200">
                <div
                  className={`h-full transition-all duration-300 ${
                    step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                  style={{
                    width: step.id < currentStep ? '100%' : '0%'
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
