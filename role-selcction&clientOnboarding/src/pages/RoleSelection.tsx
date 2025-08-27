import React, { useState } from 'react';
import { SimpleHeader } from '../components/SimpleHeader';
import { ProgressIndicator } from '../components/onboarding/ProgressIndicator';
import { RoleSelectionStep } from '../components/onboarding/RoleSelectionStep';
import { CategorySelectionStep } from '../components/onboarding/CategorySelectionStep';
import { ExperienceLevelStep } from '../components/onboarding/ExperienceLevelStep';
import { CompletionStep } from '../components/onboarding/CompletionStep';
export function RoleSelectionPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  // Calculate total steps based on role
  const getTotalSteps = () => {
    if (selectedRole === 'service_provider') {
      return 4; // Role -> Category -> Experience -> Completion
    }
    return 3; // Role -> Category -> Completion
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
        return <RoleSelectionStep selectedRole={selectedRole} onSelectRole={setSelectedRole} onNext={handleNext} />;
      case 1:
        return <CategorySelectionStep role={selectedRole} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} onNext={handleNext} onBack={handleBack} />;
      case 2:
        // If service provider, show experience level step, else show completion
        if (selectedRole === 'service_provider') {
          return <ExperienceLevelStep selectedExperience={selectedExperience} onSelectExperience={setSelectedExperience} onNext={handleNext} onBack={handleBack} />;
        } else {
          return <CompletionStep role={selectedRole} category={selectedCategory} />;
        }
      case 3:
        return <CompletionStep role={selectedRole} category={selectedCategory} experience={selectedExperience} />;
      default:
        return null;
    }
  };
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']">
      <SimpleHeader />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <ProgressIndicator totalSteps={getTotalSteps()} currentStep={currentStep} />
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            {renderStep()}
          </div>
        </div>
      </main>
    </div>;
}