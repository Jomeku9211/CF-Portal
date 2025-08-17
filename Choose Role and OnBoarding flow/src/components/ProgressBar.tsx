import React, { Fragment } from 'react';
import { CheckIcon } from 'lucide-react';
export function ProgressBar({
  currentStep
}: {
  currentStep: number;
}) {
  const steps = [{
    id: 1,
    label: 'Organisation Onboarding'
  }, {
    id: 2,
    label: 'Team Onboarding'
  }, {
    id: 3,
    label: 'Hiring Intent'
  }, {
    id: 4,
    label: 'Job Persona Creation'
  }];
  return <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => <Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep > step.id ? 'bg-blue-500' : currentStep === step.id ? 'bg-blue-500' : 'bg-gray-700'} transition-colors`}>
                {currentStep > step.id ? <CheckIcon size={16} className="text-white" /> : <span className="text-sm text-white">{step.id}</span>}
              </div>
              <span className={`mt-2 text-xs ${currentStep >= step.id ? 'text-blue-400' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && <div className="flex-1 mx-2">
                <div className={`h-1 ${currentStep > index + 1 ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
              </div>}
          </Fragment>)}
      </div>
    </div>;
}