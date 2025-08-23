import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { OrganizationProfile as OrgProfileV2 } from './OrganizationProfile';
import { TeamOnboarding } from './TeamOnboarding';
import { HiringIntent } from './HiringIntent';
import { JobPersonaCreation } from './JobPersonaCreation';
import { MainProgressBar } from '../common/MainProgressBar';
import { StepNavigation } from '../common/StepNavigation';
import { useAuth } from '../../contexts/AuthContext';
import { universalOnboardingService } from '../../services/universalOnboardingService';
import { debounce } from 'lodash';

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

export function ImprovedOnboardingFlow() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  
  // State management
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

  // UI State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // =====================================================
  // INITIALIZATION & DATA RECOVERY
  // =====================================================

  useEffect(() => {
    const initializeOnboarding = async () => {
      if (!user?.id) {
        console.log('❌ No user found for onboarding initialization');
        return;
      }

      try {
        console.log('🚀 Initializing improved onboarding flow for user:', user.id);
        
        // Get current onboarding progress from database
        const progressResult = await universalOnboardingService.getOnboardingProgress(user.id);
        
        if (progressResult.success && progressResult.data) {
          const progress = progressResult.data;
          console.log('✅ Found existing onboarding progress:', progress);
          
          // Restore the current step from database
          setCurrentMainStep(progress.current_step);
          console.log('🔄 Restored current step to:', progress.current_step);
          
          // Restore form data from database
          if (progress.flow_metadata && Object.keys(progress.flow_metadata).length > 0) {
            console.log('📋 Restoring form data from database:', progress.flow_metadata);
            setFormData(prev => ({
              ...prev,
              ...progress.flow_metadata
            }));
            setLastSaved(new Date(progress.updated_at));
            setSaveStatus('saved');
          }
          
        } else {
          console.log('ℹ️ No existing onboarding progress found, starting from step 1');
          setCurrentMainStep(1);
        }
        
      } catch (error) {
        console.error('❌ Error initializing onboarding progress:', error);
        setCurrentMainStep(1);
      }
    };

    initializeOnboarding();
  }, [user?.id]);

  // =====================================================
  // AUTO-SAVE FUNCTIONALITY
  // =====================================================

  // Debounced save function to avoid too many database calls
  const debouncedSave = useCallback(
    debounce(async (data: FormData, step: number) => {
      if (!user?.id) return;

      try {
        setSaveStatus('saving');
        
        // Update onboarding progress with current form data
        const updateResult = await universalOnboardingService.updateOnboardingProgress(user.id, {
          current_step: step,
          flow_metadata: data,
          last_activity: new Date().toISOString()
        });

        if (updateResult.success) {
          setSaveStatus('saved');
          setLastSaved(new Date());
          console.log('✅ Form data auto-saved successfully');
        } else {
          setSaveStatus('error');
          console.error('❌ Auto-save failed:', updateResult.error);
        }
      } catch (error) {
        setSaveStatus('error');
        console.error('❌ Auto-save error:', error);
      }
    }, 2000), // Save after 2 seconds of inactivity
    [user?.id]
  );

  // Auto-save whenever form data changes
  useEffect(() => {
    if (user?.id && Object.keys(formData).length > 0) {
      debouncedSave(formData, currentMainStep);
    }
  }, [formData, currentMainStep, debouncedSave, user?.id]);

  // =====================================================
  // FORM VALIDATION
  // =====================================================

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (currentMainStep) {
      case 1: // Organization
        if (!formData.organizationOnboarding?.basicInfo?.name?.trim()) {
          newErrors.organization = 'Organization name is required';
        }
        if (!formData.organizationOnboarding?.basicInfo?.industry?.trim()) {
          newErrors.industry = 'Industry is required';
        }
        break;
        
      case 2: // Team
        if (!formData.team?.name?.trim()) {
          newErrors.team = 'Team name is required';
        }
        break;
        
      case 3: // Hiring Intent + Job Persona
        if (!formData.jobPersona?.title?.trim()) {
          newErrors.jobTitle = 'Job title is required';
        }
        if (!formData.jobPersona?.expectations?.trim()) {
          newErrors.expectations = 'Job expectations are required';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // STEP NAVIGATION
  // =====================================================

  const goToNextStep = async () => {
    if (!validateCurrentStep()) {
      console.log('❌ Validation failed, cannot proceed');
      return;
    }

    // Save current progress before moving to next step
    if (user?.id) {
      try {
        await universalOnboardingService.markStepCompleted(user.id, `step_${currentMainStep}`, {
          step_name: `step_${currentMainStep}`,
          step_data: formData,
          completed: true
        });
      } catch (error) {
        console.error('❌ Error marking step completed:', error);
      }
    }

    const nextStep = currentMainStep + 1;
    if (nextStep <= 3) { // Client onboarding has 3 main steps
      setCurrentMainStep(nextStep);
      setCurrentSubStep(0);
      
      // Update onboarding progress
      if (user?.id) {
        await universalOnboardingService.updateOnboardingProgress(user.id, {
          current_step: nextStep
        });
      }
    }
  };

  const goToPreviousStep = () => {
    const prevStep = currentMainStep - 1;
    if (prevStep >= 1) {
      setCurrentMainStep(prevStep);
      setCurrentSubStep(0);
      
      // Update onboarding progress
      if (user?.id) {
        universalOnboardingService.updateOnboardingProgress(user.id, {
          current_step: prevStep
        });
      }
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 3) {
      setCurrentMainStep(step);
      setCurrentSubStep(0);
      
      // Update onboarding progress
      if (user?.id) {
        universalOnboardingService.updateOnboardingProgress(user.id, {
          current_step: step
        });
      }
    }
  };

  // =====================================================
  // FORM DATA MANAGEMENT
  // =====================================================

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const handleStepComplete = async (stepData: any, stepName: string) => {
    try {
      if (user?.id) {
        // Mark step as completed
        await universalOnboardingService.markStepCompleted(user.id, stepName, {
          step_name: stepName,
          step_data: stepData,
          completed: true
        });
        
        // Update form data
        updateFormData(stepData);
        
        console.log(`✅ Step ${stepName} completed successfully`);
      }
    } catch (error) {
      console.error(`❌ Error completing step ${stepName}:`, error);
    }
  };

  // =====================================================
  // COMPLETION HANDLING
  // =====================================================

  const handleOnboardingComplete = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      
      // Mark onboarding as completed
      await universalOnboardingService.completeOnboarding(user.id);
      
      // Navigate to dashboard or success page
      navigate('/dashboard');
      
    } catch (error) {
      console.error('❌ Error completing onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // RENDER METHODS
  // =====================================================

  const renderCurrentStep = () => {
    switch (currentMainStep) {
      case 1:
        return (
          <OrgProfileV2
            onSubmitSuccess={goToNextStep}
            onFormDataChange={updateFormData}
            initialData={formData.organizationOnboarding}
          />
        );
      case 2:
        return (
          <TeamOnboarding
            onSubmitSuccess={goToNextStep}
            onFormDataChange={updateFormData}
            initialData={formData.team}
          />
        );
      case 3:
        return (
          <div className="space-y-6">
            <HiringIntent
              onSubmitSuccess={() => {}}
              onFormDataChange={updateFormData}
              initialData={formData}
            />
            <JobPersonaCreation
              onSubmitSuccess={handleOnboardingComplete}
              onFormDataChange={updateFormData}
              initialData={formData.jobPersona}
            />
          </div>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  const renderSaveStatus = () => {
    if (!saveStatus) return null;

    const statusConfig = {
      saving: { text: 'Saving...', color: 'text-yellow-400', icon: '⏳' },
      saved: { text: 'All changes saved', color: 'text-green-400', icon: '✅' },
      error: { text: 'Save failed', color: 'text-red-400', icon: '❌' }
    };

    const config = statusConfig[saveStatus];
    
    return (
      <div className={`text-sm ${config.color} flex items-center gap-2`}>
        <span>{config.icon}</span>
        <span>{config.text}</span>
        {lastSaved && saveStatus === 'saved' && (
          <span className="text-gray-400">
            at {lastSaved.toLocaleTimeString()}
          </span>
        )}
      </div>
    );
  };

  // =====================================================
  // MAIN RENDER
  // =====================================================

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p>Please log in to continue with onboarding.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      {/* Header with Progress */}
      <div className="bg-[#1e293b] border-b border-[#334155] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Client Onboarding</h1>
            {renderSaveStatus()}
          </div>
          
          <MainProgressBar
            currentStep={currentMainStep}
            totalSteps={3}
            stepLabels={['Organization', 'Team', 'Hiring & Job']}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Step Navigation Sidebar */}
          <div className="lg:col-span-1">
            <StepNavigation
              currentStep={currentMainStep}
              totalSteps={3}
              stepLabels={['Organization Profile', 'Team Setup', 'Hiring Intent & Job Persona']}
              onStepClick={goToStep}
              canNavigateToStep={(step) => step <= currentMainStep}
            />
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            {/* Error Display */}
            {Object.keys(errors).length > 0 && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
                <h3 className="text-red-400 font-semibold mb-2">Please fix the following errors:</h3>
                <ul className="text-red-300 space-y-1">
                  {Object.entries(errors).map(([key, message]) => (
                    <li key={key}>• {message}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Current Step Content */}
            <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg">
              {renderCurrentStep()}
            </div>

            {/* Step Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={goToPreviousStep}
                disabled={currentMainStep === 1}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← Previous
              </button>

              {currentMainStep < 3 && (
                <button
                  onClick={goToNextStep}
                  disabled={isLoading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? 'Processing...' : 'Next →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


