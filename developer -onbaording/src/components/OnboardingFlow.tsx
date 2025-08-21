import React, { useState } from 'react';
import { AccountSetup } from './steps/AccountSetup';
import { IdentityVerification } from './steps/IdentityVerification';
import { HardSkills } from './steps/HardSkills';
import { SoftSkills } from './steps/SoftSkills';
import { WorkPreferences } from './steps/WorkPreferences';
import { Assessments } from './steps/Assessments';
import { ProgressBar } from './ProgressBar';
import { StepNavigation } from './StepNavigation';
import { Card, CardContent } from '../components/Card';
const steps = ['Account Setup', 'Identity & Verification', 'Hard Skills', 'Soft Skills', 'Work Preferences', 'Assessments'];
export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Account Setup
    name: '',
    email: '',
    phone: '',
    location: '',
    rolePreference: '',
    currentStatus: '',
    // Identity & Verification
    idVerification: null,
    profileLinks: {
      linkedin: '',
      github: '',
      portfolio: ''
    },
    // Hard Skills
    primaryStack: '',
    secondarySkills: [],
    experienceLevel: '',
    domainExperience: [],
    // Soft Skills
    communication: '',
    teamwork: '',
    problemSolving: '',
    adaptability: '',
    // Work Preferences
    workStyle: '',
    culturePreference: '',
    locationPreference: '',
    salaryExpectations: '',
    // Assessments
    videoIntro: null,
    skillTestResults: null,
    personalityTest: null
  });
  const updateFormData = stepData => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
  };
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AccountSetup formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <IdentityVerification formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <HardSkills formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <SoftSkills formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <WorkPreferences formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <Assessments formData={formData} updateFormData={updateFormData} />;
      default:
        return <AccountSetup formData={formData} updateFormData={updateFormData} />;
    }
  };
  return <div className="flex flex-col space-y-6">
      <ProgressBar steps={steps} currentStep={currentStep} />
      <Card variant="elevated" className="transition-all duration-300 hover:shadow-lg">
        <CardContent>
          {renderStep()}
          <StepNavigation currentStep={currentStep} totalSteps={steps.length} onNext={handleNext} onPrevious={handlePrevious} />
        </CardContent>
      </Card>
    </div>;
}