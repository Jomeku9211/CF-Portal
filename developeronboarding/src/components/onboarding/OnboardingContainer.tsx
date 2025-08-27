import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { OnboardingStepper } from './OnboardingStepper';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { RoleSelectionStep } from './steps/RoleSelectionStep';
import { SkillsStep } from './steps/SkillsStep';
import { WorkPreferencesStep } from './steps/WorkPreferencesStep';
import { SoftSkillsStep } from './steps/SoftSkillsStep';
import { VerificationStep } from './steps/VerificationStep';
import { FinalStep } from './steps/FinalStep';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';
export function OnboardingContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      // Personal Info
      fullName: '',
      email: '',
      phoneNumber: '',
      country: '',
      state: '',
      city: '',
      profilePicture: null,
      // Role Selection
      workTypes: [],
      jobRole: '',
      otherJobRole: '',
      // Skills
      skills: [],
      skillLevels: {},
      // Work Preferences
      timezoneOverlap: '',
      teamSize: '',
      companyStage: '',
      workStyles: [],
      // Soft Skills
      communicationSkills: [],
      ownershipSkills: [],
      collaborationSkills: [],
      problemSolvingSkills: [],
      learningAttitude: [],
      // Verification
      governmentId: null,
      resume: null,
      linkedinProfile: '',
      githubProfile: '',
      portfolioWebsite: '',
      // Final Step
      availability: '',
      salaryExpectation: '',
      currency: 'USD'
    }
  });
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  const onSubmit = data => {
    if (currentStep < totalSteps) {
      nextStep();
    } else {
      console.log('Form submitted:', data);
      // Here you would typically send the data to your backend
      alert("Profile completed successfully! We'll review your information and get back to you soon.");
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <RoleSelectionStep />;
      case 3:
        return <SkillsStep />;
      case 4:
        return <WorkPreferencesStep />;
      case 5:
        return <SoftSkillsStep />;
      case 6:
        return <VerificationStep />;
      case 7:
        return <FinalStep />;
      default:
        return <PersonalInfoStep />;
    }
  };
  return <FormProvider {...methods}>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <OnboardingStepper currentStep={currentStep} totalSteps={totalSteps} />
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="p-6 sm:p-8">{renderStep()}</div>
          <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
            {currentStep > 1 ? <button type="button" onClick={prevStep} className="inline-flex items-center px-4 py-2 border border-sanjuan-lighter rounded-lg text-sanjuan-dark hover:bg-sanjuan-lightest transition-colors">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </button> : <div></div>}
            <button type="submit" className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white font-medium rounded-lg shadow-sm hover:shadow transition-all">
              {currentStep === totalSteps ? <>
                  Complete <CheckIcon className="h-4 w-4 ml-2" />
                </> : <>
                  Continue <ArrowRightIcon className="h-4 w-4 ml-2" />
                </>}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>;
}