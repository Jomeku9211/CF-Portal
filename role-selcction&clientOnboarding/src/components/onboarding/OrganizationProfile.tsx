import React, { useState } from 'react';
import { QuickSetup } from './organization/QuickSetup';
import { PurposeStory } from './organization/PurposeStory';
import { GrowthSuccess } from './organization/GrowthSuccess';
import { CultureValues } from './organization/CultureValues';
import { CheckCircleIcon } from 'lucide-react';
interface OrganizationProfileProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
}
export function OrganizationProfile({
  formData,
  updateFormData,
  onNext
}: OrganizationProfileProps) {
  const [internalStep, setInternalStep] = useState(0);
  const steps = [{
    id: 0,
    name: 'Quick Setup'
  }, {
    id: 1,
    name: 'Purpose & Story'
  }, {
    id: 2,
    name: 'Growth & Success'
  }, {
    id: 3,
    name: 'Culture & Values'
  }];
  const handleInternalNext = () => {
    if (internalStep < 3) {
      setInternalStep(internalStep + 1);
    } else {
      onNext();
    }
  };
  const handleInternalBack = () => {
    if (internalStep > 0) {
      setInternalStep(internalStep - 1);
    }
  };
  const renderInternalStep = () => {
    switch (internalStep) {
      case 0:
        return <QuickSetup formData={formData} updateFormData={updateFormData} onNext={handleInternalNext} />;
      case 1:
        return <PurposeStory formData={formData} updateFormData={updateFormData} onNext={handleInternalNext} onBack={handleInternalBack} />;
      case 2:
        return <GrowthSuccess formData={formData} updateFormData={updateFormData} onNext={handleInternalNext} onBack={handleInternalBack} />;
      case 3:
        return <CultureValues formData={formData} updateFormData={updateFormData} onNext={handleInternalNext} onBack={handleInternalBack} />;
      default:
        return null;
    }
  };
  return <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
          Organization Profile
        </h2>
        <div className="bg-sanjuan-lightest rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row items-start">
            {steps.map((step, index) => <div key={step.id} className="flex items-center w-full md:w-auto">
                <div className="flex items-center">
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 
                      ${index < internalStep ? 'bg-sanjuan-base border-sanjuan-base text-white' : index === internalStep ? 'bg-white border-sanjuan-base text-sanjuan-base' : 'bg-white border-sanjuan-lighter text-sanjuan-light'}`}>
                    {index < internalStep ? <CheckCircleIcon className="w-5 h-5" /> : <span className="text-sm font-medium">{index + 1}</span>}
                  </div>
                  <span className={`ml-3 text-sm font-medium 
                      ${index <= internalStep ? 'text-sanjuan-dark' : 'text-sanjuan-light'}`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && <div className="hidden md:block flex-grow mx-4">
                    <div className={`h-0.5 w-full 
                        ${index < internalStep ? 'bg-sanjuan-base' : 'bg-sanjuan-lighter'}`} />
                  </div>}
              </div>)}
          </div>
        </div>
      </div>
      {renderInternalStep()}
    </div>;
}