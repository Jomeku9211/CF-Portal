import React, { useState } from 'react';
import { OnboardingLayout } from '../components/onboarding/OnboardingLayout';
import { OrganizationProfile } from '../components/onboarding/OrganizationProfile';
import { TeamOnboarding } from '../components/onboarding/TeamOnboarding';
import { HiringIntent } from '../components/onboarding/HiringIntent';
export function ClientOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Organization Profile
    organizationName: '',
    website: '',
    companySize: '',
    fundingStatus: '',
    industry: '',
    companyFunction: '',
    revenueStatus: '',
    originStory: '',
    whatWeDo: '',
    whoWeServe: [],
    vision: '',
    whyJoinUs: '',
    growthPlans: '',
    successMetrics: [],
    coreValuesToday: [],
    coreValuesAspirations: [],
    cultureInAction: '',
    // Team Onboarding
    teamSize: '',
    communicationStyle: [],
    workStyle: [],
    decisionMakingStyle: '',
    primaryTimezone: '',
    // Hiring Intent
    roleTitle: '',
    numberOfHires: '',
    hireTimeline: '',
    employmentType: [],
    locationPreference: '',
    city: '',
    salaryPeriod: 'Yearly',
    currency: 'USD',
    salaryMin: '',
    salaryMax: '',
    equityAvailable: false
  });
  const updateFormData = newData => {
    setFormData({
      ...formData,
      ...newData
    });
  };
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <OrganizationProfile formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 1:
        return <TeamOnboarding formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <HiringIntent formData={formData} updateFormData={updateFormData} onBack={handleBack} onFinish={() => {
          // Handle form submission and redirect to dashboard
          console.log('Onboarding complete!', formData);
          window.location.href = '/dashboard';
        }} />;
      default:
        return null;
    }
  };
  return <OnboardingLayout currentStep={currentStep} totalSteps={3} title="Client Onboarding" subtitle="Set up your organization profile, team structure, and hiring requirements">
      {renderStep()}
    </OnboardingLayout>;
}