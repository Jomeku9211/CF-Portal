import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import QuickSetup from './OrganizationProfileSteps/QuickSetup';
import { PurposeStory } from './OrganizationProfileSteps/PurposeStory';
import { GrowthSuccess } from './OrganizationProfileSteps/GrowthSuccess';
import { CultureValues } from './OrganizationProfileSteps/CultureValues';
import { buildXanoPayloadFromOrgProfile, validateXanoPayload } from '@/services/organizationMapper';
import { organizationService } from '@/services/organizationService';
import { userService } from '@/services/userService';
import { useAuth } from '@/contexts/AuthContext';

type OrganizationProfileStep = 'quick-setup' | 'purpose-story' | 'growth-success' | 'culture-values';

export function OrganizationProfile({ onSubmitSuccess }: { onSubmitSuccess?: () => void }) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<OrganizationProfileStep>('quick-setup');
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    size: '',
    fundingStatus: '',
    industry: '',
    companyFunction: 'Idea Stage',
    revenueStatus: '',
    keyInvestors: [],
    originStory: '',
    whatWeDo: '',
    whoWeServe: [],
    vision: '',
    whyJoinUs: '',
    growthPlans: '',
    successMetrics: [],
    coreValuesToday: [],
    coreValuesAspirations: [],
    cultureInAction: []
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const steps = [
    { id: 'quick-setup', label: 'Organisation Profile' },
    { id: 'purpose-story', label: 'Purpose & Story' },
    { id: 'growth-success', label: 'Growth & Success' },
    { id: 'culture-values', label: 'Culture & Values' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as OrganizationProfileStep);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as OrganizationProfileStep);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please log in before submitting your organization.');
      return;
    }

    console.log('User ID for creator:', user?.id);
    console.log('User object:', user);
    console.log('Complete formData:', formData);
    
    const payload = buildXanoPayloadFromOrgProfile(formData as any, user?.id ? String(user.id) : undefined);
    console.log('Organization payload:', payload);
    
    const validation = validateXanoPayload(payload);

    if (validation.missingRequired.length > 0) {
      alert(`Please fill required fields: ${validation.missingRequired.join(', ')}`);
      return;
    }

    let result: any;
    try {
      result = await organizationService.createOrganization(payload);
    } catch (err) {
      console.error('Organization creation network error', err);
      alert('Network error');
      return;
    }
    if (!result.success) {
      console.error('Organization creation failed', result);
      alert(result.message || 'Failed to create organization');
      return;
    }

    // Persist organization id for subsequent team creation
    if (result.organization?.id) {
      try { 
        localStorage.setItem('lastOrganizationId', String(result.organization.id));
        // Also store organization name for display
        if (result.organization.name) {
          localStorage.setItem('organizationName', result.organization.name);
        }
      } catch {}
    }

    // Update user's onboarding_stage to 'team_creation'
    if (user?.id) {
      try {
        await userService.updateUserById(String(user.id), { onboarding_stage: 'team_creation' });
        
        // Update local cache to reflect the change
        try {
          const rawUser = localStorage.getItem('currentUser');
          if (rawUser) {
            const parsedUser = JSON.parse(rawUser);
            localStorage.setItem('currentUser', JSON.stringify({ 
              ...parsedUser, 
              onboarding_stage: 'team_creation' 
            }));
          }
        } catch {}
      } catch (error) {
        console.error('Failed to update user onboarding stage', error);
      }
    }

    if (onSubmitSuccess) onSubmitSuccess();
  };

  return (
    <div className="w-full m-0 p-0">
      <div className="mb-6">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-blue-400">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <div className="ml-4 w-32 bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-full flex items-center justify-center mx-1 ${
                  currentStepIndex > index
                    ? 'bg-green-500 text-white'
                    : currentStepIndex === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {currentStepIndex > index ? '✓' : <span className="text-xs">{index + 1}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-gradient-to-b from-[#1e293b] to-[#111827] rounded-xl p-6 md:p-8 mb-0 shadow-lg transition-all duration-300 ease-in-out hover:shadow-[#3b82f6]/10">
        {currentStep === 'quick-setup' && (
          <QuickSetup formData={formData} updateFormData={updateFormData} />
        )}
        {currentStep === 'purpose-story' && (
          <PurposeStory formData={formData} updateFormData={updateFormData} />
        )}
        {currentStep === 'growth-success' && (
          <GrowthSuccess formData={formData} updateFormData={updateFormData} />
        )}
        {currentStep === 'culture-values' && (
          <CultureValues formData={formData} updateFormData={updateFormData} />
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStepIndex === 0}
          icon={<ArrowLeftIcon size={16} />}
          iconPosition="left"
          className="border-[#374151] text-white hover:bg-[#374151] transition-all duration-200"
        >
          Back
        </Button>

        {currentStepIndex < steps.length - 1 ? (
          <Button
            onClick={goToNextStep}
            icon={<ArrowRightIcon size={16} />}
            iconPosition="right"
            className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            icon={<ArrowRightIcon size={16} />}
            iconPosition="right"
            className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}


