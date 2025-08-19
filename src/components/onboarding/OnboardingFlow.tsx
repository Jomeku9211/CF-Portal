import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrganizationProfile as OrgProfileV2 } from './OrganizationProfile';
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
  const navigate = useNavigate();
  
  // Check onboarding stage immediately to set initial state
  let initialMainStep = 1;
  let initialSubStep = 0;
  
  try {
    const rawUser = localStorage.getItem('currentUser');
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      console.log('=== INITIAL STATE DEBUG ===');
      console.log('Raw parsed user data:', parsed);
      console.log('User onboarding_stage:', parsed?.onboarding_stage);
      
      const stage = String(parsed?.onboarding_stage || '');
      console.log('Processing stage:', stage);
      
      // Route based on onboarding_stage only
      if (stage.startsWith('team_creation')) {
        initialMainStep = 2;
        console.log('Setting initial step to 2 (Team)');
      } else if (stage === 'hiring_intent') {
        initialMainStep = 3;
        console.log('Setting initial step to 3 (Hiring Intent)');
      } else if (stage.startsWith('job_creation')) {
        initialMainStep = 4;
        console.log('Setting initial step to 4 (Job)');
      } else {
        initialMainStep = 1;
        console.log('Setting initial step to 1 (Organization)');
      }
      
      console.log('=== INITIAL STATE DEBUG END ===');
    }
  } catch (error) {
    console.error('Error setting initial state:', error);
  }
  
  // Start with the correct step based on onboarding stage
  const [currentMainStep, setCurrentMainStep] = useState(initialMainStep);
  const [currentSubStep, setCurrentSubStep] = useState(initialSubStep);
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

  // If user already has an organization, skip directly to Team onboarding
  useEffect(() => {
    // Route purely based on onboarding_stage tag for client role
    try {
      const rawUser = localStorage.getItem('currentUser');
      console.log('=== ONBOARDING FLOW DEBUG ===');
      console.log('1. Raw localStorage data:', rawUser);
      
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        console.log('2. Parsed user data:', parsed);
        console.log('3. User onboarding_stage:', parsed?.onboarding_stage);
        console.log('4. All user fields:', Object.keys(parsed));
        
        const stage = String(parsed?.onboarding_stage || '');
        console.log('5. Processing stage:', stage);
        console.log('6. Current main step before routing:', currentMainStep);
        
        if (stage.startsWith('team_creation') || parsed?.onboarding_status === 'team_pending') {
          console.log('7. Setting to team creation step (step 2)');
          setCurrentMainStep(2);
          setCurrentSubStep(0);
          console.log('8. State updated - currentMainStep should now be 2');
          return;
        }
        if (stage === 'hiring_intent') {
          console.log('9. Setting to hiring intent step (step 3)');
          setCurrentMainStep(3);
          setCurrentSubStep(0);
          return;
        }
        if (stage.startsWith('job_creation')) {
          console.log('10. Setting to job creation step (step 4)');
          setCurrentMainStep(4);
          setCurrentSubStep(0);
          return;
        }
        console.log('11. Keeping at organization creation step (step 1)');
        // organization_creation (default) => keep at step 1
      } else {
        console.log('2. No user data found in localStorage');
      }
      console.log('=== ONBOARDING FLOW DEBUG END ===');
    } catch (error) {
      console.error('Error in OnboardingFlow useEffect:', error);
    }
  }, []); // Remove currentMainStep dependency to prevent infinite loops

  // Monitor currentMainStep changes
  useEffect(() => {
    console.log('=== CURRENT MAIN STEP CHANGED ===');
    console.log('New currentMainStep:', currentMainStep);
    console.log('New currentSubStep:', currentSubStep);
    console.log('=== CURRENT MAIN STEP CHANGED END ===');
  }, [currentMainStep, currentSubStep]);

  // Force routing based on onboarding stage on every render
  useEffect(() => {
    console.log('=== FORCE ROUTING DEBUG START ===');
    console.log('Component rendered, checking onboarding stage...');
    
    try {
      const rawUser = localStorage.getItem('currentUser');
      console.log('Raw user data from localStorage:', rawUser);
      
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        console.log('Parsed user data:', parsed);
        console.log('User onboarding_stage:', parsed?.onboarding_stage);
        
        const stage = String(parsed?.onboarding_stage || '');
        
        console.log('Current stage:', stage);
        console.log('Current main step state:', currentMainStep);
        
        if (stage.startsWith('team_creation')) {
          console.log('=== FORCING TEAM STEP (2) ===');
          setCurrentMainStep(2);
          setCurrentSubStep(0);
        } else if (stage === 'hiring_intent') {
          console.log('=== FORCING HIRING INTENT STEP (3) ===');
          setCurrentMainStep(3);
          setCurrentSubStep(0);
        } else if (stage.startsWith('job_creation')) {
          console.log('=== FORCING JOB STEP (4) ===');
          setCurrentMainStep(4);
          setCurrentSubStep(0);
        } else if (!stage || stage === 'organization_creation') {
          console.log('=== FORCING ORGANIZATION STEP (1) ===');
          setCurrentMainStep(1);
          setCurrentSubStep(0);
        }
      } else {
        console.log('No user data found in localStorage');
      }
    } catch (error) {
      console.error('Error in force routing useEffect:', error);
    }
    
    console.log('=== FORCE ROUTING DEBUG END ===');
  }, []); // Run only once on mount

  // Define main onboarding steps
  const mainSteps = [
    {
      id: 1,
      name: 'Onboarding Organization',
      completed: currentMainStep > 1,
      active: currentMainStep === 1,
      subSteps: 1,
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
      { id: 'orgProfile', title: 'Organization Profile', component: OrgProfileV2 }
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
      // Organization onboarding uses internal navigation; when complete, move to team
      setCurrentMainStep(2);
      setCurrentSubStep(0);
      window.scrollTo(0, 0);
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

  const handleHiringIntentComplete = () => {
    setCurrentMainStep(4);
    setCurrentSubStep(0);
    window.scrollTo(0, 0);
  };

  const handleJobPersonaComplete = () => {
    // Navigate to success or next step
    console.log('All onboarding steps completed!');
  };

  const renderCurrentContent = () => {
    // Always check onboarding stage on every render to handle page refreshes
    try {
      const rawUser = localStorage.getItem('currentUser');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        const stage = String(parsed?.onboarding_stage || '');
        
        console.log('=== RENDER CONTENT DEBUG ===');
        console.log('Current onboarding_stage:', stage);
        console.log('Current main step state:', currentMainStep);
        
        // Don't force routing here - let the useEffect handle it
        // Just log the current state for debugging
        console.log('=== RENDER CONTENT DEBUG END ===');
      }
    } catch (error) {
      console.error('Error checking onboarding stage in renderCurrentContent:', error);
    }
    
    // Render based on currentMainStep state (which should be updated by useEffect)
    if (currentMainStep === 1) {
      // New Organization Onboarding UI (self-contained)
      return <OrgProfileV2 onSubmitSuccess={() => {
        setCurrentMainStep(2);
        setCurrentSubStep(0);
        window.scrollTo(0, 0);
      }} />;
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
            // Stay on the current step; routing is driven by onboarding_stage
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
          onBack={() => {
            setCurrentMainStep(3);
            setCurrentSubStep(0);
            window.scrollTo(0, 0);
          }}
        />
      );
    }
    
    // Default fallback
    return <div>Loading...</div>;
  };

  const isFirstStep = currentMainStep === 1 && currentSubStep === 0;
  const isLastStep = currentMainStep === 4;

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="text-sm text-gray-400">
              <span className="hover:text-blue-400 cursor-pointer" onClick={() => navigate('/role-selection')}>Select Role</span>
              <span className="mx-2">/</span>
              <span className="text-gray-300">Onboarding</span>
            </div>
            <div className="text-sm text-gray-300">
              <span className="mr-4">Organisation: {localStorage.getItem('organizationName') || '—'}</span>
              <span>Team: {localStorage.getItem('teamName') || '—'}</span>
            </div>
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
