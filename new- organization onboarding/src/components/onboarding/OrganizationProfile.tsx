import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { QuickSetup } from './OrganizationProfileSteps/QuickSetup';
import { PurposeStory } from './OrganizationProfileSteps/PurposeStory';
import { GrowthSuccess } from './OrganizationProfileSteps/GrowthSuccess';
import { CultureValues } from './OrganizationProfileSteps/CultureValues';
import { CompletionScreen } from './OrganizationProfileSteps/CompletionScreen';
type OrganizationProfileStep = 'quick-setup' | 'purpose-story' | 'growth-success' | 'culture-values' | 'completion';
export function OrganizationProfile() {
  const [currentStep, setCurrentStep] = useState<OrganizationProfileStep>('quick-setup');
  const [formData, setFormData] = useState({
    // Quick Setup
    name: '',
    website: '',
    size: '',
    fundingStatus: '',
    companyFunction: '',
    revenueStatus: '',
    keyInvestors: [],
    // Purpose & Story
    originStory: '',
    whatWeDo: '',
    whoWeServe: [],
    vision: '',
    whyJoinUs: '',
    // Growth & Success
    growthPlans: '',
    successMetrics: [],
    // Culture & Values
    coreValuesToday: [],
    coreValuesAspirations: [],
    cultureInAction: []
  });
  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };
  const steps = [{
    id: 'quick-setup',
    label: 'Organisation Profile'
  }, {
    id: 'purpose-story',
    label: 'Purpose & Story'
  }, {
    id: 'growth-success',
    label: 'Growth & Success'
  }, {
    id: 'culture-values',
    label: 'Culture & Values'
  }];
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as OrganizationProfileStep);
      window.scrollTo(0, 0);
    } else {
      // If we're at the last step, go to completion
      setCurrentStep('completion');
      window.scrollTo(0, 0);
    }
  };
  const goToPreviousStep = () => {
    if (currentStep === 'completion') {
      // If we're at completion, go back to the last form step
      setCurrentStep(steps[steps.length - 1].id as OrganizationProfileStep);
      window.scrollTo(0, 0);
      return;
    }
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as OrganizationProfileStep);
      window.scrollTo(0, 0);
    }
  };
  return <div className="w-full">
      {/* Step title - only show on form steps, not completion */}
      {currentStep !== 'completion' && <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            {steps[currentStepIndex].label}
          </h3>
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>)}
          </div>
        </div>}
      {/* Step content */}
      <div className="bg-gradient-to-b from-[#1e293b] to-[#111827] rounded-xl border border-[#374151] p-6 md:p-8 mb-6 shadow-lg transition-all duration-300 ease-in-out hover:shadow-[#3b82f6]/10">
        {currentStep === 'quick-setup' && <QuickSetup formData={formData} updateFormData={updateFormData} />}
        {currentStep === 'purpose-story' && <PurposeStory formData={formData} updateFormData={updateFormData} />}
        {currentStep === 'growth-success' && <GrowthSuccess formData={formData} updateFormData={updateFormData} />}
        {currentStep === 'culture-values' && <CultureValues formData={formData} updateFormData={updateFormData} />}
        {currentStep === 'completion' && <CompletionScreen formData={formData} />}
      </div>
      {/* Navigation buttons */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={goToPreviousStep} disabled={currentStepIndex === 0 && currentStep !== 'completion'} icon={<ArrowLeftIcon size={16} />} iconPosition="left" className="border-[#374151] text-white hover:bg-[#374151] transition-all duration-200">
          Back
        </Button>
        {currentStep !== 'completion' && <div className="flex items-center text-sm text-[#94a3b8]">
            <span className="text-[#3b82f6] font-medium">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>}
        {currentStep !== 'completion' && <Button onClick={goToNextStep} icon={<ArrowRightIcon size={16} />} iconPosition="right" className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-200 shadow-md hover:shadow-lg">
            {currentStepIndex === steps.length - 1 ? 'Complete' : 'Next'}
          </Button>}
      </div>
    </div>;
}