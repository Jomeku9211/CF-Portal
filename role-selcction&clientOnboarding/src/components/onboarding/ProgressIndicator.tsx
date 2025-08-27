import React from 'react';
interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
}
export function ProgressIndicator({
  totalSteps,
  currentStep
}: ProgressIndicatorProps) {
  return <div className="flex justify-center items-center space-x-2 mb-8">
      {Array.from({
      length: totalSteps
    }).map((_, index) => <div key={index} className="flex items-center">
          <div className={`h-3 w-3 rounded-full ${index < currentStep ? 'bg-tango-base' : index === currentStep ? 'bg-tango-base ring-4 ring-tango-lighter' : 'bg-sanjuan-lighter'}`} />
          {index < totalSteps - 1 && <div className={`h-0.5 w-10 ${index < currentStep ? 'bg-tango-base' : 'bg-sanjuan-lighter'}`} />}
        </div>)}
    </div>;
}