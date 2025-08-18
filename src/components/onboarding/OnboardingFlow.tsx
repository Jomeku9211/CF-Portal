import { useState } from 'react';
import { organizationService } from '../../services/organizationService';
// Replace legacy organization onboarding with the new consolidated UI
// Use latest external Organization Profile UI
import { OrganizationProfile as OrgProfileV2 } from '../../../new-v2222onboarding/src/components/onboarding/OrganizationProfile';
import { Button } from '../common';
import { TeamOnboarding } from './TeamOnboarding';
import { HiringIntent } from './HiringIntent';
import { JobPersonaCreation } from './JobPersonaCreation';
import { MainProgressBar } from '../common/MainProgressBar';
import { StepNavigation } from '../common/StepNavigation';

interface FormData {
  organization: {
    name: string;
    purpose: string;
    teamSize: string;
    workingStyle: string;
    culture: string;
  };
  jobPersona: {
    title: string;
    expectations: string;
    criteria: string;
    skills: string[];
  };
  organizationOnboarding: {
    basicInfo: {
      name: string;
      industry: string;
      website: string;
      size: string;
    };
    financials: {
      fundingStatus: string;
      investors: string;
      revenueStatus: string;
      profitabilityStatus: string;
    };
    purpose: {
      whyStatement: string;
      originStory: string;
      coreBeliefs: string[];
      practices: string[];
    };
  };
  team: any;
}

export function OnboardingFlow() {
  const [currentMainStep, setCurrentMainStep] = useState(1);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    organization: {
      name: '',
      purpose: '',
      teamSize: '',
      workingStyle: '',
      culture: ''
    },
    jobPersona: {
      title: '',
      expectations: '',
      criteria: '',
      skills: []
    },
    organizationOnboarding: {
      basicInfo: {
        name: '',
        industry: '',
        website: '',
        size: ''
      },
      financials: {
        fundingStatus: '',
        investors: '',
        revenueStatus: '',
        profitabilityStatus: ''
      },
      purpose: {
        whyStatement: '',
        originStory: '',
        coreBeliefs: [],
        practices: []
      }
    },
    team: {}
  });

  // Define main onboarding steps
  const mainSteps = [
    {
      id: 1,
      name: 'Onboarding Organization',
      completed: currentMainStep > 1,
      active: currentMainStep === 1,
      subSteps: 5, // Welcome, Basic Info, Financials, Purpose, Success
      currentSubStep: currentSubStep
    },
    {
      id: 2,
      name: 'Onboarding Team',
      completed: currentMainStep > 2,
      active: currentMainStep === 2,
      subSteps: 3, // Team Basics, Workstyle, Culture
      currentSubStep: currentSubStep
    },
    {
      id: 3,
      name: 'Hiring Intent',
      completed: currentMainStep > 3,
      active: currentMainStep === 3,
      subSteps: 1, // Single step
      currentSubStep: currentSubStep
    },
    {
      id: 4,
      name: 'Job Persona Creation',
      completed: currentMainStep > 4,
      active: currentMainStep === 4,
      subSteps: 1, // Placeholder for now
      currentSubStep: currentSubStep
    }
  ];

  // Define sub-steps for each main step
  const subSteps = {
    organization: [
      // Single consolidated step for the new Organization Profile UI
      { id: 'orgProfile', title: 'Organization Profile', component: OrgProfileV2 },
    ],
    team: [
      { id: 'team', title: 'Team Building', component: TeamOnboarding }
    ],
    hiringIntent: [
      { id: 'hiringIntent', title: 'Hiring Intent', component: HiringIntent }
    ],
    jobPersona: [
      { id: 'jobPersona', title: 'Job Persona Creation', component: JobPersonaCreation }
    ]
  };

  const getCurrentSubSteps = () => {
    switch (currentMainStep) {
      case 1:
        return subSteps.organization;
      case 2:
        return subSteps.team;
      case 3:
        return subSteps.hiringIntent;
      case 4:
        return subSteps.jobPersona;
      default:
        return subSteps.organization;
    }
  };

  const currentSubSteps = getCurrentSubSteps();

  const handleMainStepClick = (stepId: number) => {
    if (stepId < currentMainStep) {
      setCurrentMainStep(stepId);
      setCurrentSubStep(0);
    }
  };

  const handleNext = () => {
    if (currentMainStep === 1) {
      // Organization onboarding
      if (currentSubStep < currentSubSteps.length - 1) {
        setCurrentSubStep(currentSubStep + 1);
        window.scrollTo(0, 0);
      } else {
        // Finalize organization onboarding → create organization in backend
        const basic = formData.organizationOnboarding.basicInfo;
        const fin = formData.organizationOnboarding.financials;
        const pur = formData.organizationOnboarding.purpose;

        console.log('Form data before creating payload:', {
          basic,
          fin,
          pur
        });

        // Validate required fields
        if (!basic.name?.trim()) {
          alert('Organization name is required');
          return;
        }
        if (!basic.industry) {
          alert('Industry is required');
          return;
        }
        if (!basic.website) {
          alert('Website is required');
          return;
        }
        if (!basic.size) {
          alert('Organization size is required');
          return;
        }
        if (!fin.fundingStatus) {
          alert('Funding status is required');
          return;
        }
        if (!fin.revenueStatus) {
          alert('Revenue status is required');
          return;
        }
        if (!fin.profitabilityStatus) {
          alert('Profitability status is required');
          return;
        }
        if (!pur.whyStatement?.trim()) {
          alert('Why statement is required');
          return;
        }
        if (!pur.originStory?.trim()) {
          alert('Origin story is required');
          return;
        }
        if (!pur.coreBeliefs?.length) {
          alert('At least one core belief is required');
          return;
        }
        if (!pur.practices?.length) {
          alert('At least one key practice is required');
          return;
        }

        // Map UI values to API-enum friendly values expected by Xano
        const fundingMap: Record<string, string> = {
          'bootstrapped': 'Bootstrapped',
          'seed': 'Seed Stage',
          'series-a': 'Series A',
          'series-b': 'Series B',
          'series-c': 'Series C+',
          'public': 'Public Company',
          'profitable': 'Profitable',
        };
        const revenueMap: Record<string, string> = {
          'pre-revenue': 'Pre-revenue',
          'early-revenue': 'Early Revenue',
          'growing': 'Growing Revenue',
          'established': 'Established Revenue',
          'scaled': 'Scaled Revenue',
        };
        const profitabilityMap: Record<string, string> = {
          'not-profitable': 'Not Profitable',
          'breakeven': 'Breakeven',
          'profitable': 'Profitable',
          'highly-profitable': 'Highly Profitable',
        };

        const payload = {
          name: basic.name.trim(),
          industry: basic.industry,
          website_url: basic.website,
          organization_size: basic.size,
          current_funding_status: fundingMap[fin.fundingStatus] || fin.fundingStatus,
          key_investors_backers: fin.investors || '',
          revenue_status: revenueMap[fin.revenueStatus] || fin.revenueStatus,
          profitability_status: profitabilityMap[fin.profitabilityStatus] || fin.profitabilityStatus,
          why_statement: pur.whyStatement.trim(),
          origin_story: pur.originStory.trim(),
          core_beliefs_principles: pur.coreBeliefs.join('; '),
          how_we_live_purpose: pur.practices.join('; '),
        };

        console.log('Creating organization with payload:', payload);

        (async () => {
          const res = await organizationService.createOrganization(payload);
          if (!res.success) {
            alert(res.message || 'Failed to create organization');
            return;
          }
          // Move to next main step after successful creation
          setCurrentMainStep(2);
          setCurrentSubStep(0);
          window.scrollTo(0, 0);
        })();
      }
    } else if (currentMainStep === 2) {
      // Team onboarding - handled by TeamOnboarding component
      // This will be called when team onboarding is complete
    } else if (currentMainStep === 3) {
      // Job persona creation - handled by JobPersonaCreation component
      // This will be called when job persona creation is complete
    }
  };

  const handleBack = () => {
    if (currentMainStep === 1) {
      // Organization onboarding
      if (currentSubStep > 0) {
        setCurrentSubStep(currentSubStep - 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const updateFormData = (section: string | number | symbol, data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  const handleTeamComplete = () => {
    setCurrentMainStep(3);
    setCurrentSubStep(0);
    window.scrollTo(0, 0);
  };

  const handleJobPersonaComplete = () => {
    // Navigate to success or next step
    console.log('All onboarding steps completed!');
  };

  const renderCurrentContent = () => {
    if (currentMainStep === 1) {
      const CurrentStepComponent = currentSubSteps[currentSubStep].component;
      return (
        <CurrentStepComponent 
          formData={formData} 
          updateFormData={updateFormData}
          onComplete={() => {}}
          onCompleted={() => {
            setCurrentMainStep(2);
            setCurrentSubStep(0);
            window.scrollTo(0, 0);
          }}
          onNext={() => {
            if (currentSubStep < currentSubSteps.length - 1) {
              setCurrentSubStep(currentSubStep + 1);
            } else {
              setCurrentMainStep(2);
              setCurrentSubStep(0);
            }
            window.scrollTo(0, 0);
          }}
          onBack={() => {
            if (currentSubStep > 0) {
              setCurrentSubStep(currentSubStep - 1);
            } else {
              setCurrentMainStep(1);
              setCurrentSubStep(0);
            }
            window.scrollTo(0, 0);
          }}
        />
      );
    } else if (currentMainStep === 2) {
      return (
        <TeamOnboarding
          formData={formData}
          updateFormData={updateFormData}
          onComplete={handleTeamComplete}
        />
      );
    } else if (currentMainStep === 3) {
      return (
        <HiringIntent
          onNext={() => {
            setCurrentMainStep(4);
            setCurrentSubStep(0);
            window.scrollTo(0, 0);
          }}
          onBack={() => {
            setCurrentMainStep(2);
            setCurrentSubStep(0);
            window.scrollTo(0, 0);
          }}
        />
      );
    } else if (currentMainStep === 4) {
      return (
        <JobPersonaCreation
          formData={formData}
          updateFormData={updateFormData}
          onComplete={handleJobPersonaComplete}
        />
      );
    }
  };

  const isFirstStep = currentMainStep === 1 && currentSubStep === 0;
  const isLastStep = currentMainStep === 4;

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        <div className="mb-6">
          <div className="text-sm text-gray-400">
            <span className="hover:text-blue-400 cursor-pointer" onClick={() => window.history.back()}>Select Role</span>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Onboarding</span>
          </div>
        </div>
        
        {/* Main Progress Bar - 4 Main Steps */}
        <div className="mb-8 w-full">
          <MainProgressBar 
            steps={mainSteps} 
            currentMainStep={currentMainStep} 
            onStepClick={handleMainStepClick} 
          />
        </div>

        {/* Sub Progress Bar - Only show for organization onboarding when multiple sub-steps exist */}
        {currentMainStep === 1 && currentSubSteps.length > 1 && (
          <div className="mb-8 w-full">
            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-blue-400">
                  Step {currentSubStep + 1} of {currentSubSteps.length}
                </span>
                <div className="ml-4 w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentSubStep + 1) / currentSubSteps.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center">
                {currentSubSteps.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-6 h-6 rounded-full flex items-center justify-center mx-1 ${
                      currentSubStep > index 
                        ? 'bg-green-500 text-white' 
                        : currentSubStep === index 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {currentSubStep > index ? (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex-grow bg-[#1a2234] rounded-xl shadow-md p-6 md:p-8 transition-all duration-300 ease-out border border-[#2a3344]">
          {renderCurrentContent()}
        </div>
        
        {/* Navigation - Only show for organization onboarding when multiple sub-steps exist */}
        {currentMainStep === 1 && currentSubSteps.length > 1 && (
          <StepNavigation 
            currentStep={currentSubStep} 
            totalSteps={currentSubSteps.length} 
            onBack={handleBack} 
            onNext={handleNext} 
            isFirstStep={isFirstStep} 
            isLastStep={isLastStep} 
          />
        )}
      </div>
    </div>
  );
}
