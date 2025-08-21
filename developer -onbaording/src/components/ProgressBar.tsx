import React from 'react';
interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}
export function ProgressBar({
  steps,
  currentStep
}: ProgressBarProps) {
  return <div className="w-full mb-8">
      <div className="hidden md:flex justify-between mb-4">
        {steps.map((step, index) => <div key={index} className={`flex flex-col items-center ${index <= currentStep ? 'text-sanjuan-base' : 'text-neutral-base'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${index < currentStep ? 'bg-sanjuan-base text-neutral-white' : index === currentStep ? 'border-2 border-sanjuan-base text-sanjuan-base' : 'border border-neutral-base text-neutral-base'}`}>
              {index < currentStep ? <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg> : index + 1}
            </div>
            <span className={`text-small-medium ${index <= currentStep ? 'font-medium' : ''}`}>
              {step}
            </span>
          </div>)}
      </div>
      <div className="flex md:hidden mb-4 justify-between">
        <span className="text-small-medium text-sanjuan-base font-medium">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-small-medium text-sanjuan-dark">
          {steps[currentStep]}
        </span>
      </div>
      <div className="relative w-full bg-neutral-lighter rounded-full h-2 overflow-hidden">
        <div className="bg-sanjuan-base h-2 rounded-full transition-all duration-500 ease-in-out" style={{
        width: `${(currentStep + 1) / steps.length * 100}%`
      }}></div>
      </div>
    </div>;
}