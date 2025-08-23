import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, User, Shield, Code, Heart, Settings, MessageSquare, Target, Users, Lightbulb, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { universalOnboardingService } from '../../services/universalOnboardingService';
import { supabase } from '../../config/supabase';

interface DeveloperOnboardingProps {
  // Props will be passed from navigation state
}

interface FormData {
  // Account Setup (optional - we get these from auth)
  name?: string;
  email?: string;
  phone: string;
  location: string;
  rolePreference: string;
  currentStatus: string;
  
  // Identity & Verification
  idVerification: {
    idDocument?: {
      file: File;
      name: string;
      type: string;
      size: number;
      uploadDate: string;
    } | null;
    selfie?: {
      file: File;
      name: string;
      type: string;
      size: number;
      uploadDate: string;
    } | null;
  } | null;
  profileLinks: {
    linkedin: string;
    github: string;
    portfolio: string;
  };
  
  // Hard Skills
  primaryStack: string;
  secondarySkills: string[];
  experienceLevel: string;
  domainExperience: string[];
  
  // Soft Skills
  communication: string[];
  ownership: string[];
  collaboration: string[];
  problemSolving: string[];
  curiosity: string[];
  
  // Work Preferences
  workStyle: string;
  culturePreference: string;
  locationPreference: string;
  salaryExpectations: string;
  
  // Assessments
  videoIntro: any;
  skillTestResults: any;
  personalityTest: any;
}

const steps = [
  { id: 1, name: 'Account Setup', icon: User },
  { id: 2, name: 'Identity & Verification', icon: Shield },
  { id: 3, name: 'Hard Skills', icon: Code },
  { id: 4, name: 'Soft Skills', icon: Heart },
  { id: 5, name: 'Work Preferences', icon: Settings }
];

export const DeveloperOnboarding: React.FC<DeveloperOnboardingProps> = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Debug log for current step
  console.log(`🎯 DeveloperOnboarding render - currentStep: ${currentStep}, showing: ${steps[currentStep]?.name}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    location: '',
    rolePreference: '',
    currentStatus: '',
    idVerification: null,
    profileLinks: {
      linkedin: '',
      github: '',
      portfolio: ''
    },
    primaryStack: '',
    secondarySkills: [],
    experienceLevel: '',
    domainExperience: [],
    communication: [],
    ownership: [],
    collaboration: [],
    problemSolving: [],
    curiosity: [],
    workStyle: '',
    culturePreference: '',
    locationPreference: '',
    salaryExpectations: '',
    videoIntro: null,
    skillTestResults: null,
    personalityTest: null
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Load existing data and initialize onboarding progress
  useEffect(() => {
    const initializeOnboarding = async () => {
      if (!isAuthenticated) {
        console.error('❌ No user found for onboarding initialization');
        return;
      }

      try {
        console.log('🚀 Initializing developer onboarding for user:', user?.id);
        
        // Get onboarding progress from database
        const progressResult = await universalOnboardingService.getOnboardingProgress(user?.id || '');
        
        if (progressResult.success && progressResult.data) {
          console.log('✅ Found existing onboarding progress:', progressResult.data);
          
          // Set current step based on progress
          const currentStepFromProgress = progressResult.data.current_step;
          console.log(`🔍 Raw database current_step: ${currentStepFromProgress}`);
          console.log(`🔍 Steps array length: ${steps.length}`);
          
          if (currentStepFromProgress > 0 && currentStepFromProgress <= steps.length) {
            // Convert from 1-based step number to 0-based index
            const stepIndex = currentStepFromProgress - 1;
            setCurrentStep(stepIndex);
            console.log(`📍 Database shows step ${currentStepFromProgress}, setting component to index ${stepIndex}`);
            console.log(`📍 This should show: ${steps[stepIndex]?.name}`);
          } else {
            console.log(`⚠️ Invalid step number: ${currentStepFromProgress}, keeping default index 0`);
          }
          
          // Load existing form data for completed steps
          const existingData = progressResult.data;
          if (existingData) {
            console.log('📋 Loading existing form data from progress:', existingData);
            
            // Merge existing data with form state
            Object.keys(existingData).forEach(key => {
              if (existingData[key] && typeof existingData[key] === 'object') {
                setFormData(prev => ({
                  ...prev,
                  ...(existingData as any)[key]
                }));
              }
            });
          }
        } else {
          console.log('ℹ️ No existing onboarding progress found, starting fresh');
        }
        
        // Initialize onboarding progress if not exists
        if (location.state?.role && location.state?.category && location.state?.experienceLevel) {
          const roleId = location.state.role.id;
          const categoryId = location.state.category.id;
          const experienceLevelId = location.state.experienceLevel;
          
          console.log('🚀 Initializing onboarding progress with role data:', { roleId, categoryId, experienceLevelId });
          
          if (!user?.id) {
            console.error('❌ No user ID found for onboarding initialization');
            return;
          }
          
          await universalOnboardingService.getOrCreateOnboardingProgress(
            user.id, 
            roleId, 
            categoryId, 
            'developer',
            experienceLevelId
          );
        }
        
      } catch (error) {
        console.error('❌ Error initializing onboarding:', error);
      } finally {
      }
    };

    // Only run once when component mounts
    if (isAuthenticated && user?.id) {
      initializeOnboarding();
    }
  }, [isAuthenticated, user?.id]); // Removed location.state dependency

  const updateFormData = async (data: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
    
    // Save form data to database for persistence (only when user is authenticated)
    if (user?.id) {
      try {
        // Extract searchable data for separate columns
        const searchableData = {
          location: data.location || formData.location,
          primary_stack: data.primaryStack || formData.primaryStack,
          experience_level: data.experienceLevel || formData.experienceLevel,
          work_style: data.workStyle || formData.workStyle,
          availability_status: 'available',
          skills: data.secondarySkills || formData.secondarySkills || [],
          domain_experience: data.domainExperience || formData.domainExperience || []
        };
        
        // Save to separate columns for searchability
        await universalOnboardingService.updateOnboardingProgress(user.id, {
          ...searchableData
        });
        console.log(`✅ Saved form data to database in separate columns:`, searchableData);
      } catch (error) {
        console.error(`❌ Error saving form data to database:`, error);
      }
    }
  };

  const handleNext = async () => {
    console.log(`🚀 handleNext called - currentStep: ${currentStep}, step name: ${steps[currentStep]?.name}`);
    if (currentStep < steps.length - 1) {
      // Save current step data before moving to next
      if (user?.id) {
        try {
          const stepNames = ['account_setup', 'identity_verification', 'hard_skills', 'soft_skills', 'work_preferences'];
          const currentStepName = stepNames[currentStep];
          
          console.log(`💾 Saving ${currentStepName} step data...`);
          
          // Mark current step as completed in onboarding progress
          await universalOnboardingService.markStepCompleted(user.id, currentStepName, {
            step: currentStep + 1,
            step_name: steps[currentStep].name,
            step_data: formData,
            completed: true
          });
          
          // Extract searchable data for separate columns
          const searchableData = {
            location: formData.location,
            primary_stack: formData.primaryStack,
            experience_level: formData.experienceLevel,
            work_style: formData.workStyle,
            availability_status: 'available',
            skills: formData.secondarySkills || [],
            domain_experience: formData.domainExperience || []
          };
          
          // Update current step and searchable data in onboarding progress
          await universalOnboardingService.updateOnboardingProgress(user.id, {
            current_step: currentStep + 1,
            ...searchableData
          });
          
          console.log(`✅ Step ${currentStepName} marked as completed in onboarding progress`);
        } catch (error) {
          console.error(`❌ Error saving step data:`, error);
          // Don't block navigation, just log the error
        }
      }
      
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = async () => {
    if (!user?.id) {
      console.error('❌ No user found for onboarding completion');
      return;
    }

    // Prevent multiple submissions
    if (isSubmitting) {
      console.log('⚠️ Already submitting, ignoring duplicate call');
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('🚀 Completing developer onboarding with data:', formData);
      console.log('📍 Current location before completion:', window.location.pathname);
      
      // Mark onboarding as completed in universal onboarding service
      const onboardingComplete = await universalOnboardingService.completeOnboarding(user.id);
      if (onboardingComplete.success) {
        console.log('✅ Onboarding marked as completed in universal service');
      } else {
        console.warn('⚠️ Failed to mark onboarding as completed in universal service:', onboardingComplete.error);
      }
      
      // Update service provider profile with onboarding data
      try {
        console.log('🚀 Updating service provider profile with onboarding data...');
        
        // Get the user's role data to find the actual role_id and category_id
        const { data: userRole, error: userRoleError } = await supabase
          .from('user_roles')
          .select('role_id, category_id, experience_level_id, specialization')
          .eq('user_id', user.id)
          .single();
        
        if (userRoleError) {
          console.error('❌ Error getting user role:', userRoleError);
        } else if (userRole) {
          console.log('✅ Found user role data:', userRole);
          
          // Create profile updates with the correct schema fields
          const profileUpdates = {
            user_id: user.id,
            role_id: userRole.role_id, // Use the actual role_id, not the user_role record ID
            category_id: userRole.category_id || '',
            specialization: userRole.specialization || 'not-applicable',
            experience_level_id: userRole.experience_level_id || '',
            bio: `${formData.primaryStack || 'Software'} developer with ${formData.experienceLevel || 'professional'} experience`,
            skills: formData.secondarySkills || [],
            hourly_rate: formData.salaryExpectations ? 50 : 75, // Default based on experience
            availability: formData.workStyle || 'full-time',
            portfolio_url: formData.profileLinks?.portfolio || '',
            linkedin_url: formData.profileLinks?.linkedin || '',
            github_url: formData.profileLinks?.github || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          console.log('📝 Profile updates to apply:', profileUpdates);
          console.log('🔍 Full profile data being inserted:', JSON.stringify(profileUpdates, null, 2));
          
          // First try to get the existing profile
          const { data: existingProfile, error: getProfileError } = await supabase
            .from('service_provider_profiles')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle(); // Use maybeSingle to avoid errors
          
          if (getProfileError) {
            console.error('❌ Error getting existing profile:', getProfileError);
            console.log('🔄 Profile might not exist, trying to create it...');
            
            // Try to create the profile if it doesn't exist
            const { data: newProfile, error: createError } = await supabase
              .from('service_provider_profiles')
              .insert([profileUpdates])
              .select()
              .single();
            
            if (createError) {
              console.error('❌ Error creating new profile:', createError);
              console.error('❌ Error details:', {
                code: createError.code,
                message: createError.message,
                details: createError.details,
                hint: createError.hint
              });
            } else {
              console.log('✅ New service provider profile created with onboarding data:', newProfile);
            }
          } else if (existingProfile) {
            console.log('✅ Found existing profile, updating it...');
            
            // Update existing profile
            const { data: updatedProfile, error: updateError } = await supabase
              .from('service_provider_profiles')
              .update({
                ...profileUpdates,
                updated_at: new Date().toISOString()
              })
              .eq('user_id', user.id)
              .select()
              .single();
            
            if (updateError) {
              console.error('❌ Error updating existing profile:', updateError);
              console.error('❌ Error details:', {
                code: updateError.code,
                message: updateError.message,
                details: updateError.details,
                hint: updateError.hint
              });
            } else {
              console.log('✅ Service provider profile updated with onboarding data:', updatedProfile);
            }
          } else {
            console.log('🆕 No existing profile found, creating new one...');
            
            // Create new profile
            const { data: newProfile, error: createError } = await supabase
              .from('service_provider_profiles')
              .insert([profileUpdates])
              .select()
              .single();
            
            if (createError) {
              console.error('❌ Error creating new profile:', createError);
              console.error('❌ Error details:', {
                code: createError.code,
                message: createError.message,
                details: createError.details,
                hint: createError.hint
              });
              console.error('❌ Failed to insert data:', profileUpdates);
            } else {
              console.log('✅ New service provider profile created with onboarding data:', newProfile);
            }
          }
        } else {
          console.warn('⚠️ No user role found for user:', user.id);
        }
      } catch (error) {
        console.error('❌ Exception updating service provider profile:', error);
      }
      
      // Navigate to assessments page with success message
      console.log('🎯 Navigating to assessments page...');
      
      // Use replace to prevent back navigation and potential loops
      navigate('/assessments', { 
        state: { 
          message: 'Developer profile setup completed successfully! 🎉 Now complete your assessments to stand out to employers.',
          onboardingData: formData
        },
        replace: true
      });
    } catch (error) {
      console.error('❌ Error completing onboarding:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AccountSetupStep formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <IdentityVerificationStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <HardSkillsStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <SoftSkillsStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <WorkPreferencesStep formData={formData} updateFormData={updateFormData} />;
      default:
        return <AccountSetupStep formData={formData} updateFormData={updateFormData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/experience-level')}
            className="flex items-center text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Experience Level
          </button>
          
          <h1 className="text-3xl font-bold text-white mb-2">Developer Profile Setup</h1>
          <p className="text-gray-400">Complete your developer profile to get started</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-blue-400">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
                  ${index <= currentStep 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-600 text-gray-400'
                  }
                `}>
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`text-xs mt-1 text-center max-w-20 ${
                  index <= currentStep ? 'text-white' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-[#1a2234] rounded-xl p-6 border border-[#2a3344]">
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-600">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-800 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-green-800 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Completing...' : 'Complete Onboarding'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step Components
const AccountSetupStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => Promise<void> }> = ({ formData, updateFormData }) => {
  // // const { isAuthenticated } = useAuth(); // Unused - keeping for future use // Unused - keeping for future use
  const [localData, setLocalData] = useState({
    phone: formData.phone || '',
    location: formData.location || '',
    rolePreference: formData.rolePreference || '',
    currentStatus: formData.currentStatus || ''
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
    await updateFormData({ [name]: value });
  };

  const handleRadioChange = async (name: string, value: string) => {
    setLocalData(prev => ({ ...prev, [name]: value }));
    await updateFormData({ [name]: value });
  };

  // Mock data functions for testing
  const addMockAccountData = async () => {
    const mockData = {
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      rolePreference: 'Full-time',
      currentStatus: 'Looking for opportunities'
    };

    setLocalData(mockData);
    await updateFormData(mockData);
  };

  const clearAccountData = async () => {
    const emptyData = {
      phone: '',
      location: '',
      rolePreference: '',
      currentStatus: ''
    };

    setLocalData(emptyData);
    await updateFormData(emptyData);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-600 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Account Setup</h2>
        <p className="text-gray-400 mt-1">Let's get some additional information about you</p>
      </div>

      {/* Mock Data Testing Section */}
      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-300 mb-3">🧪 Testing Mode - Mock Data</h3>
        <p className="text-yellow-200 text-sm mb-3">Use these buttons to test the account setup functionality:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addMockAccountData}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Add Mock Account Data
          </button>
          <button
            onClick={clearAccountData}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Clear All Data
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={localData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={localData.location}
              onChange={handleChange}
              placeholder="City, Country"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Role Preference</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['Full-time', 'Part-time', 'Contract', 'Freelance'].map((role) => (
              <label key={role} className="flex items-center">
                <input
                  type="radio"
                  name="rolePreference"
                  value={role}
                  checked={localData.rolePreference === role}
                  onChange={() => handleRadioChange('rolePreference', role)}
                  className="mr-3 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300">{role}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Current Status</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['Employed', 'Unemployed', 'Student', 'Freelancer', 'Looking for opportunities'].map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="radio"
                  name="currentStatus"
                  value={status}
                  checked={localData.currentStatus === status}
                  onChange={() => handleRadioChange('currentStatus', status)}
                  className="mr-3 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Account Data Summary */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Your Account Setup Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Phone:</span>
              <span className="text-blue-400 font-medium">
                {localData.phone || 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Location:</span>
              <span className="text-blue-400 font-medium">
                {localData.location || 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Role Preference:</span>
              <span className="text-blue-400 font-medium">
                {localData.rolePreference || 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Current Status:</span>
              <span className="text-blue-400 font-medium">
                {localData.currentStatus || 'Not specified'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other steps
const IdentityVerificationStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => Promise<void> }> = ({ formData, updateFormData }) => {
  // // const { isAuthenticated } = useAuth(); // Unused - keeping for future use // Unused - keeping for future use
  const [localData, setLocalData] = useState({
    idVerification: formData.idVerification || null,
    profileLinks: {
      linkedin: formData.profileLinks?.linkedin || '',
      github: formData.profileLinks?.github || '',
      portfolio: formData.profileLinks?.portfolio || ''
    }
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setLocalData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
      await updateFormData({
        [parent]: {
          ...formData[parent as keyof FormData],
          [child]: value
        }
      });
    } else {
      setLocalData(prev => ({ ...prev, [name]: value }));
      await updateFormData({ [name]: value });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'selfie') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // For now, we'll store the file object directly
      // In production, you'd upload to Supabase Storage
      const fileData = {
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString()
      };

      if (type === 'id') {
        setLocalData(prev => ({ ...prev, idVerification: { ...prev.idVerification, idDocument: fileData } }));
        await updateFormData({ idVerification: { ...formData.idVerification, idDocument: fileData } });
      } else {
        setLocalData(prev => ({ ...prev, idVerification: { ...prev.idVerification, selfie: fileData } }));
        await updateFormData({ idVerification: { ...formData.idVerification, selfie: fileData } });
      }

      // Complete progress
      setTimeout(() => {
        setUploadProgress(100);
        setTimeout(() => setUploadProgress(0), 500);
      }, 500);

    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Mock data functions for testing
  const addMockIDDocument = async () => {
    const mockFileData = {
      file: new File(['mock-id-content'], 'mock-id-document.jpg', { type: 'image/jpeg' }),
      name: 'mock-id-document.jpg',
      type: 'image/jpeg',
      size: 1024 * 1024, // 1MB
      uploadDate: new Date().toISOString()
    };

    setLocalData(prev => ({ 
      ...prev, 
      idVerification: { ...prev.idVerification, idDocument: mockFileData } 
    }));
    await updateFormData({ 
      idVerification: { ...formData.idVerification, idDocument: mockFileData } 
    });
  };

  const addMockSelfie = async () => {
    const mockFileData = {
      file: new File(['mock-selfie-content'], 'mock-selfie.jpg', { type: 'image/jpeg' }),
      name: 'mock-selfie.jpg',
      type: 'image/jpeg',
      size: 800 * 1024, // 800KB
      uploadDate: new Date().toISOString()
    };

    setLocalData(prev => ({ 
      ...prev, 
      idVerification: { ...prev.idVerification, selfie: mockFileData } 
    }));
    await updateFormData({ 
      idVerification: { ...formData.idVerification, selfie: mockFileData } 
    });
  };

  const addMockProfileLinks = async () => {
    const mockLinks = {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      portfolio: 'https://johndoe.dev'
    };

    setLocalData(prev => ({ 
      ...prev, 
      profileLinks: mockLinks 
    }));
    await updateFormData({ profileLinks: mockLinks });
  };

  const removeFile = async (type: 'id' | 'selfie') => {
    if (type === 'id') {
      setLocalData(prev => ({ ...prev, idVerification: { ...prev.idVerification, idDocument: null } }));
      await updateFormData({ idVerification: { ...formData.idVerification, idDocument: null } });
    } else {
      setLocalData(prev => ({ ...prev, idVerification: { ...prev.idVerification, selfie: null } }));
      await updateFormData({ idVerification: { ...formData.idVerification, selfie: null } });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-600 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Identity & Verification</h2>
        <p className="text-gray-400 mt-1">Help us verify your identity and build trust</p>
      </div>

      {/* Mock Data Testing Section */}
      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-300 mb-3">🧪 Testing Mode - Mock Data</h3>
        <p className="text-yellow-200 text-sm mb-3">Use these buttons to test the upload functionality without real files:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addMockIDDocument}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Add Mock ID Document
          </button>
          <button
            onClick={addMockSelfie}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Add Mock Selfie
          </button>
          <button
            onClick={addMockProfileLinks}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Add Mock Profile Links
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* ID Verification Section */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">ID Verification</h3>
          <p className="text-gray-400 mb-4">Upload a government-issued ID and a selfie for verification</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ID Document Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Government ID</label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-gray-500 transition-colors">
                {localData.idVerification?.idDocument ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-900/20 rounded-full">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-green-400 font-medium">ID Document Uploaded</p>
                      <p className="text-xs text-gray-400">{localData.idVerification.idDocument.name}</p>
                      <p className="text-xs text-gray-400">{(localData.idVerification.idDocument.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      onClick={() => removeFile('id')}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'id')}
                      className="hidden"
                      id="id-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="id-upload"
                      className="cursor-pointer block"
                    >
                      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-700 rounded-full mb-3">
                        <Shield className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-300">Click to upload ID</p>
                      <p className="text-xs text-gray-500 mt-1">JPEG, PNG, or WebP (max 5MB)</p>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Selfie Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Selfie Photo</label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-gray-500 transition-colors">
                {localData.idVerification?.selfie ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-900/20 rounded-full">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-green-400 font-medium">Selfie Uploaded</p>
                      <p className="text-xs text-gray-400">{localData.idVerification.selfie.name}</p>
                      <p className="text-xs text-gray-400">{(localData.idVerification.selfie.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      onClick={() => removeFile('selfie')}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'selfie')}
                      className="hidden"
                      id="selfie-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="selfie-upload"
                      className="cursor-pointer block"
                    >
                      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-700 rounded-full mb-3">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-300">Click to upload selfie</p>
                      <p className="text-xs text-gray-500 mt-1">JPEG, PNG, or WebP (max 5MB)</p>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-300">
              <strong>Security Note:</strong> Your documents are encrypted and stored securely. 
              We only use them for identity verification and will never share them with third parties.
            </p>
          </div>
        </div>

        {/* Profile Links Section */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Professional Profile Links</h3>
          <p className="text-gray-400 mb-4">Add your professional profiles to build credibility</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn Profile</label>
              <input
                type="url"
                name="profileLinks.linkedin"
                value={localData.profileLinks.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub Profile</label>
              <input
                type="url"
                name="profileLinks.github"
                value={localData.profileLinks.github}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio Website</label>
              <input
                type="url"
                name="profileLinks.portfolio"
                value={localData.profileLinks.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HardSkillsStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => Promise<void> }> = ({ formData, updateFormData }) => {
  // const { isAuthenticated } = useAuth(); // Unused - keeping for future use
  const [localData, setLocalData] = useState({
    primaryStack: formData.primaryStack || '',
    secondarySkills: formData.secondarySkills || [],
    domainExperience: formData.domainExperience || []
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
    await updateFormData({ [name]: value });
  };

  const handleCheckboxChange = async (field: 'secondarySkills' | 'domainExperience', value: string) => {
    setLocalData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [field]: newValues };
    });
    
    await updateFormData({
      [field]: localData[field].includes(value)
        ? formData[field].filter((v: string) => v !== value)
        : [...formData[field], value]
    });
  };

  // Mock data functions for testing
  const addMockHardSkills = async () => {
    const mockData = {
      primaryStack: 'React/Node.js',
      secondarySkills: ['Python', 'Docker', 'AWS', 'MongoDB'],
      domainExperience: ['E-commerce', 'Healthcare', 'Finance']
    };

    setLocalData(mockData);
    await updateFormData(mockData);
  };

  const clearHardSkills = async () => {
    const emptyData = {
      primaryStack: '',
      secondarySkills: [],
      domainExperience: []
    };

    setLocalData(emptyData);
    await updateFormData(emptyData);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-600 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Hard Skills Assessment</h2>
        <p className="text-gray-400 mt-1">Tell us about your technical expertise and experience</p>
      </div>

      {/* Mock Data Testing Section */}
      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-300 mb-3">🧪 Testing Mode - Mock Data</h3>
        <p className="text-yellow-200 text-sm mb-3">Use these buttons to test the hard skills functionality:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addMockHardSkills}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Add Mock Hard Skills
          </button>
          <button
            onClick={clearHardSkills}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Clear All Skills
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Primary Tech Stack */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Primary Tech Stack</h3>
          <p className="text-gray-400 mb-4">What's your main technology stack?</p>
          <input
            type="text"
            name="primaryStack"
            value={localData.primaryStack}
            onChange={handleChange}
            placeholder="e.g., React/Node.js, Python/Django, Java/Spring"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Secondary Skills */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Secondary Skills</h3>
          <p className="text-gray-400 mb-4">Select additional technologies you're familiar with:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Python', 'JavaScript', 'TypeScript', 'Java', 'C#', 'Go',
              'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'MongoDB',
              'PostgreSQL', 'MySQL', 'Redis', 'GraphQL', 'REST API', 'Microservices'
            ].map((skill) => (
              <label key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localData.secondarySkills.includes(skill)}
                  onChange={() => handleCheckboxChange('secondarySkills', skill)}
                  className="mr-3 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300 text-sm">{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Domain Experience */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Domain Experience</h3>
          <p className="text-gray-400 mb-4">What industries have you worked in?</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'E-commerce', 'Healthcare', 'Finance', 'Education', 'Entertainment',
              'Real Estate', 'Travel', 'Manufacturing', 'Logistics', 'Media',
              'Gaming', 'SaaS', 'Mobile Apps', 'Web Apps', 'AI/ML', 'IoT'
            ].map((domain) => (
              <label key={domain} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localData.domainExperience.includes(domain)}
                  onChange={() => handleCheckboxChange('domainExperience', domain)}
                  className="mr-3 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300 text-sm">{domain}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Your Skills Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Primary Stack:</span>
              <span className="text-blue-400 font-medium">
                {localData.primaryStack || 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Secondary Skills:</span>
              <span className="text-blue-400 font-medium">
                {localData.secondarySkills.length} selected
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Domain Experience:</span>
              <span className="text-blue-400 font-medium">
                {localData.domainExperience.length} selected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SoftSkillsStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => Promise<void> }> = ({ formData, updateFormData }) => {
  // const { isAuthenticated } = useAuth(); // Unused - keeping for future use
  const [localData, setLocalData] = useState({
    communication: formData.communication || [],
    ownership: formData.ownership || [],
    collaboration: formData.collaboration || [],
    problemSolving: formData.problemSolving || [],
    curiosity: formData.curiosity || []
  });

  const [activeTab, setActiveTab] = useState('communication');

  const tabs = [
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'ownership', label: 'Ownership', icon: Target },
    { id: 'collaboration', label: 'Collaboration', icon: Users },
    { id: 'problemSolving', label: 'Problem-Solving', icon: Lightbulb },
    { id: 'curiosity', label: 'Curiosity', icon: Search }
  ];

  const handleChange = async (field: keyof typeof localData, value: string) => {
    setLocalData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [field]: newValues };
    });
    
    await updateFormData({
      [field]: localData[field].includes(value)
        ? formData[field].filter((v: string) => v !== value)
        : [...formData[field], value]
    });
  };

  // Mock data functions for testing
  const addMockSoftSkills = async () => {
    const mockData = {
      communication: [
        'Can explain technical ideas to non-tech teammates',
        'Can write clear documentation or async updates',
        'Shares updates proactively'
      ],
      ownership: [
        'Takes full responsibility for a feature or module',
        'Acts on blockers without being followed up',
        'Is accountable for bugs or outcomes — no blame game'
      ],
      collaboration: [
        'Works smoothly with product/design/founders',
        'Comfortable with pair programming or reviews',
        'Shares context to avoid silos'
      ],
      problemSolving: [
        'Can debug deeply before asking for help',
        'Suggests better ways, not just follows instructions',
        'Prioritizes root cause, not patchwork'
      ],
      curiosity: [
        'Tries to understand "why," not just "how"',
        'Reads docs / explores tools without handholding',
        'Keeps up with modern tools and practices'
      ]
    };

    setLocalData(mockData);
    await updateFormData(mockData);
  };

  const clearSoftSkills = async () => {
    const emptyData = {
      communication: [],
      ownership: [],
      collaboration: [],
      problemSolving: [],
      curiosity: []
    };

    setLocalData(emptyData);
    await updateFormData(emptyData);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'communication':
        return (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Communication</h3>
            <p className="text-gray-400 mb-6">What do you mean by "good communication"? (Select all that apply)</p>
            <div className="space-y-4">
              {[
                'Can explain technical ideas to non-tech teammates',
                'Can write clear documentation or async updates',
                'Can participate in team/product/client discussions',
                'Shares updates proactively',
                'Gives and receives feedback constructively',
                'Can lead standups or sprint discussions'
              ].map((option) => (
                <label key={option} className="flex items-start">
                  <input
                    type="checkbox"
                    checked={localData.communication.includes(option)}
                    onChange={() => handleChange('communication', option)}
                    className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300 text-sm leading-relaxed">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'ownership':
        return (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Ownership</h3>
            <p className="text-gray-400 mb-6">What does ownership look like in your team? (Select all that apply)</p>
            <div className="space-y-4">
              {[
                'Takes full responsibility for a feature or module',
                'Doesn\'t need to be told what to do next',
                'Acts on blockers without being followed up',
                'Thinks about long-term impact, not just quick fixes',
                'Is accountable for bugs or outcomes — no blame game'
              ].map((option) => (
                <label key={option} className="flex items-start">
                  <input
                    type="checkbox"
                    checked={localData.ownership.includes(option)}
                    onChange={() => handleChange('ownership', option)}
                    className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300 text-sm leading-relaxed">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'collaboration':
        return (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Collaboration</h3>
            <p className="text-gray-400 mb-6">What kind of collaboration do you expect? (Select all that apply)</p>
            <div className="space-y-4">
              {[
                'Works smoothly with product/design/founders',
                'Comfortable with pair programming or reviews',
                'Keeps others unblocked — communicates delays',
                'Shares context to avoid silos',
                'Aligns decisions with team, not ego'
              ].map((option) => (
                <label key={option} className="flex items-start">
                  <input
                    type="checkbox"
                    checked={localData.collaboration.includes(option)}
                    onChange={() => handleChange('collaboration', option)}
                    className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300 text-sm leading-relaxed">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'problemSolving':
        return (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Problem-Solving</h3>
            <p className="text-gray-400 mb-6">What kind of problem-solving matters in this role? (Select all that apply)</p>
            <div className="space-y-4">
              {[
                'Can debug deeply before asking for help',
                'Suggests better ways, not just follows instructions',
                'Balances quick fixes with solid solutions',
                'Understands product impact, not just code logic',
                'Prioritizes root cause, not patchwork'
              ].map((option) => (
                <label key={option} className="flex items-start">
                  <input
                    type="checkbox"
                    checked={localData.problemSolving.includes(option)}
                    onChange={() => handleChange('problemSolving', option)}
                    className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300 text-sm leading-relaxed">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'curiosity':
        return (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Curiosity / Learning Attitude</h3>
            <p className="text-gray-400 mb-6">How do you define a good learning mindset? (Select all that apply)</p>
            <div className="space-y-4">
              {[
                'Tries to understand "why," not just "how"',
                'Reads docs / explores tools without handholding',
                'Experiments and shares new ideas with the team',
                'Learns from mistakes and feedback',
                'Keeps up with modern tools and practices'
              ].map((option) => (
                <label key={option} className="flex items-start">
                  <input
                    type="checkbox"
                    checked={localData.curiosity.includes(option)}
                    onChange={() => handleChange('curiosity', option)}
                    className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300 text-sm leading-relaxed">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-600 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Soft Skills Assessment</h2>
        <p className="text-gray-400 mt-1">Tell us about your working style and interpersonal skills</p>
      </div>

      {/* Mock Data Testing Section */}
      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-300 mb-3">🧪 Testing Mode - Mock Data</h3>
        <p className="text-yellow-200 text-sm mb-3">Use these buttons to test the soft skills functionality:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addMockSoftSkills}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Add Mock Soft Skills
          </button>
          <button
            onClick={clearSoftSkills}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Clear All Skills
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800 rounded-lg border border-gray-600 overflow-hidden">
        <div className="flex border-b border-gray-600">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Skills Summary */}
      <div className="p-6 bg-green-900/20 border border-dashed border-green-500/30 rounded-lg mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Your Selected Skills Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tabs.map((tab) => {
            const selectedCount = (localData[tab.id as keyof typeof localData] as string[]).length;
            return (
              <div key={tab.id} className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-medium">{tab.label}</span>
                  <span className="text-blue-400 text-sm">{selectedCount} selected</span>
                </div>
                {selectedCount > 0 && (
                  <div className="text-xs text-gray-400">
                    {selectedCount === 1 ? '1 skill selected' : `${selectedCount} skills selected`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const WorkPreferencesStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => Promise<void> }> = ({ formData, updateFormData }) => {
  // const { isAuthenticated } = useAuth(); // Unused - keeping for future use
  const [localData, setLocalData] = useState({
    workStyle: formData.workStyle || '',
    culturePreference: formData.culturePreference || '',
    locationPreference: formData.locationPreference || '',
    salaryExpectations: formData.salaryExpectations || ''
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
    await updateFormData({ [name]: value });
  };

  const handleRadioChange = async (name: string, value: string) => {
    setLocalData(prev => ({ ...prev, [name]: value }));
    await updateFormData({ [name]: value });
  };

  // Mock data functions for testing
  const addMockWorkPreferences = async () => {
    const mockData = {
      workStyle: 'remote',
      culturePreference: 'collaborative',
      locationPreference: 'flexible',
      salaryExpectations: '80000-120000'
    };

    setLocalData(mockData);
    await updateFormData(mockData);
  };

  const clearWorkPreferences = async () => {
    const emptyData = {
      workStyle: '',
      culturePreference: '',
      locationPreference: '',
      salaryExpectations: ''
    };

    setLocalData(emptyData);
    await updateFormData(emptyData);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-600 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Work Preferences</h2>
        <p className="text-gray-400 mt-1">Tell us about your ideal work environment and expectations</p>
      </div>

      {/* Mock Data Testing Section */}
      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-300 mb-3">🧪 Testing Mode - Mock Data</h3>
        <p className="text-yellow-200 text-sm mb-3">Use these buttons to test the work preferences functionality:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addMockWorkPreferences}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Add Mock Work Preferences
          </button>
          <button
            onClick={clearWorkPreferences}
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Clear All Preferences
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Work Style */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Preferred Work Style</h3>
          <p className="text-gray-400 mb-4">How do you prefer to work?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { value: 'remote', label: 'Remote (Work from anywhere)' },
              { value: 'hybrid', label: 'Hybrid (Mix of remote and office)' },
              { value: 'onsite', label: 'On-site (Office-based)' },
              { value: 'flexible', label: 'Flexible (Choose my own schedule)' }
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="workStyle"
                  value={option.value}
                  checked={localData.workStyle === option.value}
                  onChange={() => handleRadioChange('workStyle', option.value)}
                  className="mr-3 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300 text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Culture Preference */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Company Culture</h3>
          <p className="text-gray-400 mb-4">What type of company culture do you thrive in?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { value: 'startup', label: 'Startup (Fast-paced, wear many hats)' },
              { value: 'enterprise', label: 'Enterprise (Stable, established processes)' },
              { value: 'mission', label: 'Mission-Driven (Purpose-focused organization)' },
              { value: 'collaborative', label: 'Collaborative (Team-focused)' },
              { value: 'autonomous', label: 'Autonomous (Independent work)' }
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="culturePreference"
                  value={option.value}
                  checked={localData.culturePreference === option.value}
                  onChange={() => handleRadioChange('culturePreference', option.value)}
                  className="mr-3 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300 text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Preference */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Location Preference</h3>
          <p className="text-gray-400 mb-4">Where would you prefer to work?</p>
          <select
            name="locationPreference"
            value={localData.locationPreference}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select your location preference</option>
            <option value="us-east">US East Coast</option>
            <option value="us-west">US West Coast</option>
            <option value="us-central">US Central</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="flexible">Flexible / Anywhere</option>
            <option value="specific">Specific City/Region</option>
          </select>
        </div>

        {/* Salary Expectations */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Salary/Rate Expectations</h3>
          <p className="text-gray-400 mb-4">What are your salary or hourly rate expectations?</p>
          <input
            type="text"
            name="salaryExpectations"
            value={localData.salaryExpectations}
            onChange={handleChange}
            placeholder="e.g., $80,000-120,000 or $50-80/hour"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-2">Please specify your expected range or rate</p>
        </div>

        {/* Preferences Summary */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Your Work Preferences Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Work Style:</span>
              <span className="text-blue-400 font-medium">
                {localData.workStyle ? localData.workStyle.charAt(0).toUpperCase() + localData.workStyle.slice(1) : 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Culture:</span>
              <span className="text-blue-400 font-medium">
                {localData.culturePreference ? localData.culturePreference.charAt(0).toUpperCase() + localData.culturePreference.slice(1) : 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Location:</span>
              <span className="text-blue-400 font-medium">
                {localData.locationPreference ? localData.locationPreference.charAt(0).toUpperCase() + localData.locationPreference.slice(1) : 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Salary/Rate:</span>
              <span className="text-blue-400 font-medium">
                {localData.salaryExpectations || 'Not specified'}
              </span>
            </div>
          </div>
        </div>

        {/* Completion Note */}
        <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-md mt-6">
          <p className="text-sm text-green-300">
            <strong>🎉 Almost Done!</strong> This is the final step of your developer onboarding. 
            Complete this to finish your profile setup and start receiving job opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperOnboarding;


