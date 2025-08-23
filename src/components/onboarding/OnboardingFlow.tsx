import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrganizationProfile as OrgProfileV2 } from './OrganizationProfile';
import { TeamOnboarding } from './TeamOnboarding';
import { HiringIntent } from './HiringIntent';
import { JobPersonaCreation } from './JobPersonaCreation';
import { MainProgressBar } from '../common/MainProgressBar';
import { StepNavigation } from '../common/StepNavigation';
import { useAuth } from '../../contexts/AuthContext';
import { universalOnboardingService } from '../../services/universalOnboardingService';


interface FormData {
  account: {
    fullName: string;
    phone: string;
    location: string;
  };
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
  const { user } = useAuth();
  // const location = useLocation(); // Unused - keeping for future use
  
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
      
      // Route based on onboarding_stage only - Original 3-step client flow
      if (stage && stage !== '' && stage !== 'null' && stage !== 'undefined') {
        if (stage === 'organization_creation') {
          initialMainStep = 1;
          console.log('Setting initial step to 1 (Organization Creation)');
        } else if (stage === 'team_creation') {
          initialMainStep = 2;
          console.log('Setting initial step to 2 (Team Creation)');
        } else if (stage === 'hiring_intent') {
          initialMainStep = 3;
          console.log('Setting initial step to 3 (Hiring Intent)');
        } else {
          // Unknown stage, start from beginning
          initialMainStep = 1;
          console.log('Unknown onboarding stage, starting from step 1 (Organization Creation)');
        }
      } else {
        // No onboarding stage set yet, start from beginning
        initialMainStep = 1;
        console.log('No onboarding stage set, starting from step 1 (Organization Creation)');
      }
      
      console.log('=== INITIAL STATE DEBUG END ===');
    }
  } catch (error) {
    console.error('Error setting initial state:', error);
  }
  
  // Start with the correct step based on onboarding stage
  const [currentMainStep, setCurrentMainStep] = useState(initialMainStep);
  const [currentSubStep, setCurrentSubStep] = useState(initialSubStep);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    account: {
      fullName: '',
      phone: '',
      location: ''
    },
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

  // State for error handling
  const [errors] = useState<{
    organization?: string;
    team?: string;
    hiring?: string;
    general?: string;
  }>({});

  // Load onboarding progress from database when component mounts
  useEffect(() => {
    const loadOnboardingProgress = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoadingProgress(true);
        console.log('🔄 Loading onboarding progress from database...');
        
        // Get current progress from database
        const progress = await universalOnboardingService.getOnboardingProgress(user.id);
        
        if (progress.success && progress.data) {
          const dbStep = progress.data.current_step || 1;
          console.log('📊 Database shows current_step:', dbStep);
          
          // Set the step based on database progress
          setCurrentMainStep(dbStep);
          console.log('✅ Set currentMainStep to:', dbStep);
        } else {
          console.log('⚠️ No database progress found, starting from step 1');
          setCurrentMainStep(1);
        }
      } catch (error) {
        console.error('❌ Error loading onboarding progress:', error);
        setCurrentMainStep(1);
      } finally {
        setIsLoadingProgress(false);
      }
    };

    loadOnboardingProgress();
  }, [user?.id]);

  // Clear errors when form changes
  // const clearErrors = () => {
  //   setErrors({});
  // };

  // Validate form before submission
  // const validateForm = (): boolean => {
  //   const newErrors: typeof errors = {};
  //   
  //   if (!formData.organization?.name) {
  //     newErrors.organization = 'Organization name is required';
  //   }
  //   
  //   if (!formData.team?.name) {
  //     newErrors.team = 'Team name is required';
  //   }
  //   
  //   if (!formData.jobPersona?.title) {
  //     newErrors.hiring = 'Job title is required';
  //   }
  //   
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // Initialize onboarding progress tracking
  useEffect(() => {
    const initializeOnboarding = async () => {
      if (!user?.id) {
        console.log('❌ No user found for onboarding initialization');
        return;
      }

      try {
        console.log('🚀 Initializing onboarding progress tracking for user:', user.id);
        
        // Get current onboarding progress from database
        const progressResult = await universalOnboardingService.getOnboardingProgress(user.id);
        
        if (progressResult.success && progressResult.data) {
          const progress = progressResult.data;
          console.log('✅ Found existing onboarding progress:', progress);
          
          // Restore the current step from database
          setCurrentMainStep(progress.current_step);
          console.log('🔄 Restored current step to:', progress.current_step);
          
          // Restore form data from database - using onboarding_stage instead of flow_metadata
          if (progress.onboarding_stage && progress.onboarding_stage !== 'role_selection') {
            console.log('📋 Restoring onboarding stage from database:', progress.onboarding_stage);
            // Set the current step based on onboarding stage
            const stepFromStage = getStepFromOnboardingStage(progress.onboarding_stage);
            setCurrentMainStep(stepFromStage);
          }
          
          // Update onboarding stage in localStorage for backward compatibility
          const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
          currentUser.onboarding_stage = getOnboardingStageFromStep(progress.current_step);
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          
        } else {
          console.log('ℹ️ No existing onboarding progress found, starting from step 1');
          setCurrentMainStep(1);
        }
        
      } catch (error) {
        console.error('❌ Error initializing onboarding progress:', error);
        // Fallback to step 1
        setCurrentMainStep(1);
      }
    };

    initializeOnboarding();
  }, [user?.id]);

  // Helper function to convert step number to onboarding stage string
  const getOnboardingStageFromStep = (step: number): string => {
    switch (step) {
      case 1:
        return 'organization_onboarding';
      case 2:
        return 'team_onboarding';
      case 3:
        return 'hiring_intent';
      case 4:
        return 'job_creation';
      default:
        return 'organization_onboarding';
    }
  };

  // Helper function to convert onboarding stage to step number
  const getStepFromOnboardingStage = (stage: string): number => {
    switch (stage) {
      case 'role_selection':
        return 1;
      case 'organization_onboarding':
        return 1;
      case 'team_onboarding':
        return 2;
      case 'hiring_intent':
        return 3;
      case 'job_creation':
        return 4;
      case 'completed':
        return 4;
      default:
        return 1;
    }
  };

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
      name: 'Organization Onboarding',
      completed: currentMainStep > 1,
      active: currentMainStep === 1,
      subSteps: 5, // Organization has 5 sub-steps
      currentSubStep: currentSubStep
    },
    {
      id: 2,
      name: 'Team Onboarding',
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
      name: 'Job Creation',
      completed: currentMainStep > 4,
      active: currentMainStep === 4,
      subSteps: 1, // Single step
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
      { id: 'jobPersona', title: 'Job Creation', component: JobPersonaCreation }
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

  const handleMainStepClick = async (stepId: number) => {
    if (stepId < currentMainStep) {
      // Only allow going back to completed steps
      setCurrentMainStep(stepId);
      setCurrentSubStep(0);
      
      // Update database to reflect the step change
      if (user?.id) {
        try {
          await universalOnboardingService.updateOnboardingProgress(user.id, {
            current_step: stepId
          });
          console.log(`✅ Updated current step to ${stepId} in database`);
        } catch (error) {
          console.error(`❌ Error updating step in database:`, error);
        }
      }
    }
  };

  const handleNext = () => {
    if (currentMainStep === 1) {
      // Organization creation - move to team creation
      setCurrentMainStep(2);
      setCurrentSubStep(0);
      window.scrollTo(0, 0);
    } else if (currentMainStep === 2) {
      // Team onboarding - when complete, move to hiring intent
      setCurrentMainStep(3);
      setCurrentSubStep(0);
      window.scrollTo(0, 0);
    } else if (currentMainStep === 3) {
      // Hiring intent - handled by HiringIntent component
      // This will be called when hiring intent is complete
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

  // Handle step completion and progress tracking
  const handleStepComplete = async (stepName: string, stepData: any) => {
    if (!user) {
      console.error('❌ No user found for step completion');
      return;
    }

    try {
      console.log(`✅ Marking step as completed: ${stepName}`);
      
      // Mark step as completed in onboarding progress
      await universalOnboardingService.markStepCompleted(user.id, stepName, {
        step_name: stepName,
        step_data: stepData,
        completed: true,
        step: currentMainStep
      });
      
      // Update current step in onboarding progress
      await universalOnboardingService.updateOnboardingProgress(user.id, {
        current_step: currentMainStep + 1
      });
      
      console.log(`✅ Step ${stepName} marked as completed in onboarding progress`);
    } catch (error) {
      console.error(`❌ Error marking step completed:`, error);
    }
  };

  // Handle account setup completion
  const handleAccountSetupComplete = async () => {
    console.log('👤 Account setup completed');
    
    // Mark step as completed
    await handleStepComplete('account_setup', formData.account);
    
    // Update current step in database
    if (user?.id) {
      await universalOnboardingService.updateOnboardingProgress(user.id, {
        current_step: 2
      });
      console.log('✅ Updated current step to 2 in database');
    }
    
    // Move to next step
    setCurrentMainStep(2);
  };

  // Handle organization onboarding completion
  const handleOrganizationComplete = async () => {
    console.log('🏢 Organization onboarding completed');
    
    // Mark step as completed
    await handleStepComplete('organization_onboarding', formData.organization);
    
    // Update current step in database
    if (user?.id) {
      await universalOnboardingService.updateOnboardingProgress(user.id, {
        current_step: 3
      });
      console.log('✅ Updated current step to 3 in database');
    }
    
    // Move to next step
    setCurrentMainStep(3);
  };

  // Handle team onboarding completion
  const handleTeamComplete = async () => {
    console.log('👥 Team onboarding completed');
    
    // Mark step as completed
    await handleStepComplete('team_onboarding', formData.team);
    
    // Update current step in database
    if (user?.id) {
      await universalOnboardingService.updateOnboardingProgress(user.id, {
        current_step: 3
      });
      console.log('✅ Updated current step to 3 in database');
    }
    
    // Move to next step
    setCurrentMainStep(3);
  };

  // Handle hiring intent completion
  const handleHiringIntentComplete = async () => {
    console.log('🎯 Hiring intent completed');
    
    // Mark step as completed
    await handleStepComplete('hiring_intent', formData.jobPersona);
    
    // Update current step in database
    if (user?.id) {
      await universalOnboardingService.updateOnboardingProgress(user.id, {
        current_step: 4
      });
      console.log('✅ Updated current step to 4 in database');
    }
    
    // Move to next step
    setCurrentMainStep(4);
  };

  // Handle job persona completion
  const handleJobPersonaComplete = async () => {
    console.log('💼 Job persona completed');
    
    // Mark step as completed
    await handleStepComplete('job_persona', formData.jobPersona);
    
    // Complete onboarding
    if (user) {
      await universalOnboardingService.completeOnboarding(user.id);
      console.log('🎉 Client onboarding completed successfully!');
    }
    
    // Navigate to assessment page instead of dashboard
    navigate('/assessments', { 
      state: { 
        message: 'Client onboarding completed successfully! 🎉 Now let\'s assess your hiring needs.',
        onboardingData: formData
      }
    });
  };

  const updateFormData = async (section: string, data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: data
    }));
    
    // Save form data to database for persistence
    if (user?.id) {
      try {
        await universalOnboardingService.updateOnboardingProgress(user.id, {
          onboarding_stage: getOnboardingStageFromStep(currentMainStep)
        });
        console.log(`✅ Saved ${section} data to database`);
      } catch (error) {
        console.error(`❌ Error saving ${section} data to database:`, error);
      }
    }
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
    
    // Show loading while fetching database progress
    if (isLoadingProgress) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your onboarding progress...</p>
          </div>
        </div>
      );
    }

    // Render based on currentMainStep state (which should be updated by useEffect)
    if (currentMainStep === 1) {
      // Organization Profile Step - Original client onboarding flow
      return (
        <div>
          {/* Error messages */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
              {Object.entries(errors).map(([key, message]) => (
                <div key={key} className="text-red-400 text-sm flex items-center mb-2 last:mb-0">
                  <span className="mr-2">⚠️</span>
                  {message}
                </div>
              ))}
            </div>
          )}
          <OrgProfileV2 onSubmitSuccess={handleOrganizationComplete} />
        </div>
      );
    } else if (currentMainStep === 2) {
      // Organization Profile Step
      return (
        <div>
          {/* Error messages */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
              {Object.entries(errors).map(([key, message]) => (
                <div key={key} className="text-red-400 text-sm flex items-center mb-2 last:mb-0">
                  <span className="mr-2">⚠️</span>
                  {message}
                </div>
              ))}
            </div>
          )}
          <OrgProfileV2 onSubmitSuccess={handleOrganizationComplete} />
        </div>
      );
    } else if (currentMainStep === 3) {
      return (
        <div>
          {/* Error messages */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
              {Object.entries(errors).map(([key, message]) => (
                <div key={key} className="text-red-400 text-sm flex items-center mb-2 last:mb-0">
                  <span className="mr-2">⚠️</span>
                  {message}
                </div>
              ))}
            </div>
          )}
          <TeamOnboarding
            formData={formData}
            updateFormData={updateFormData}
            onComplete={handleTeamComplete}
          />
        </div>
      );
    } else if (currentMainStep === 3) {
      return (
        <div>
          {/* Error messages */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
              {Object.entries(errors).map(([key, message]) => (
                <div key={key} className="text-red-400 text-sm flex items-center mb-2 last:mb-0">
                  <span className="mr-2">⚠️</span>
                  {message}
                </div>
              ))}
            </div>
          )}
          <HiringIntent
            onNext={handleHiringIntentComplete}
            onBack={() => {
              // Stay on the current step; routing is driven by onboarding_stage
              window.scrollTo(0, 0);
            }}
          />
        </div>
      );
    } else if (currentMainStep === 4) {
      return (
        <div>
          {/* Error messages */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
              {Object.entries(errors).map(([key, message]) => (
                <div key={key} className="text-red-400 text-sm flex items-center mb-2 last:mb-0">
                  <span className="mr-2">⚠️</span>
                  {message}
                </div>
              ))}
            </div>
          )}
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
        </div>
      );
    }
    
    // Default fallback
    return <div>Loading...</div>;
  };

  const isFirstStep = currentMainStep === 1 && currentSubStep === 0;
  const isLastStep = currentMainStep === 4;

  // Save progress when component unmounts or user navigates away
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user?.id) {
        // Save current progress before leaving
        universalOnboardingService.updateOnboardingProgress(user.id, {
          current_step: currentMainStep,
          onboarding_stage: getOnboardingStageFromStep(currentMainStep),
          last_activity: new Date().toISOString()
        }).catch(error => {
          console.error('❌ Error saving progress before unload:', error);
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
              // Also save when component unmounts
        if (user?.id) {
          universalOnboardingService.updateOnboardingProgress(user.id, {
            current_step: currentMainStep,
            onboarding_stage: getOnboardingStageFromStep(currentMainStep),
            last_activity: new Date().toISOString()
          }).catch(error => {
            console.error('❌ Error saving progress on unmount:', error);
          });
        }
    };
  }, [user?.id, currentMainStep, formData]);

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
