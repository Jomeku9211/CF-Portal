import { useState } from 'react';
import { TeamBasics } from './steps/TeamBasics';
import { TeamWorkstyle } from './steps/TeamWorkstyle';
import { TeamCulture } from './steps/TeamCulture';
import { CheckCircleIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';

interface TeamFormData {
  teamTitle: string;
  structurePreference: string;
  paceOfWork: string;
  autonomy: string;
  initiativeLevel: string;
  decisionMakingStyle: string;
  attentionToDetail: string;
  multitaskingAbility: string;
  workingHours: string;
  stressHandlingStyle: string;
  communicationStyle: string;
  diversityAlignment: string;
  genderComposition: string;
  ageComposition: string;
}

interface TeamOnboardingProps {
  formData: any;
  updateFormData: (section: string, data: any) => void;
  onComplete: () => void;
}

export function TeamOnboarding({ updateFormData, onComplete }: TeamOnboardingProps) {
  const [teamData, setTeamData] = useState<TeamFormData>({
    teamTitle: '',
    structurePreference: '',
    paceOfWork: '',
    autonomy: '',
    initiativeLevel: '',
    decisionMakingStyle: '',
    attentionToDetail: '',
    multitaskingAbility: '',
    workingHours: '',
    stressHandlingStyle: '',
    communicationStyle: '',
    diversityAlignment: '',
    genderComposition: '',
    ageComposition: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 3;

  const handleChange = (field: string | number | symbol, value: string) => {
    setTeamData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when field is filled
    if (errors[field as keyof TeamFormData]) {
      setErrors(prev => ({
        ...prev,
        [field as keyof TeamFormData]: ''
      }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1 && !teamData.teamTitle.trim()) {
      newErrors.teamTitle = 'Team title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        // Submit form when on last step
        console.log('Team form submitted:', teamData);
        updateFormData('team', teamData);
        setIsSubmitted(true);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  // Render success screen after form submission
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircleIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-white">Team Created Successfully!</h2>
        <p className="text-gray-400 text-center mb-8">
          Your team "{teamData.teamTitle}" has been created. Now let's create
          your first job persona.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <button 
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium flex items-center justify-center transition-colors" 
            onClick={handleContinue}
          >
            Continue
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-white">Build Your Team</h2>
      <p className="text-gray-400 mb-6">
        Complete the following steps to set up your team
      </p>
      
      {/* Mini-stepper inside the card */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-blue-400">
            Step {currentStep} of {totalSteps}
          </span>
          <div className="ml-4 w-32 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center">
          {[1, 2, 3].map(step => (
            <div 
              key={step} 
              className={`w-6 h-6 rounded-full flex items-center justify-center mx-1 ${
                currentStep === step 
                  ? 'bg-blue-500 text-white' 
                  : currentStep > step 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {currentStep > step ? (
                <CheckIcon className="w-3 h-3" />
              ) : (
                <span className="text-xs">{step}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Step title and description */}
      <div className="mb-6">
        <h3 className="text-xl font-medium text-white">
          {currentStep === 1 && 'Team Basics'}
          {currentStep === 2 && 'Workstyle Preferences'}
          {currentStep === 3 && 'Team Culture & Composition'}
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {currentStep === 1 && 'Define the fundamental details of your team'}
          {currentStep === 2 && 'Define how your team works and collaborates'}
          {currentStep === 3 && 'Define the cultural aspects and makeup of your team'}
        </p>
      </div>
      
      <form onSubmit={e => e.preventDefault()}>
        {/* Step content - only show current step */}
        <div className="transition-opacity duration-300">
          {currentStep === 1 && (
            <TeamBasics 
              teamTitle={teamData.teamTitle} 
              onChange={handleChange} 
              error={errors.teamTitle} 
            />
          )}
          {currentStep === 2 && (
            <TeamWorkstyle 
              formData={teamData} 
              onChange={handleChange} 
            />
          )}
          {currentStep === 3 && (
            <TeamCulture 
              formData={teamData} 
              onChange={handleChange} 
            />
          )}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button 
            type="button" 
            className={`px-4 py-2 flex items-center gap-2 ${
              currentStep === 1 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'text-gray-300 hover:text-white border border-gray-700 rounded-md hover:border-gray-600'
            }`} 
            onClick={handleBack} 
            disabled={currentStep === 1}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </button>
          <button 
            type="button" 
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium flex items-center gap-2 transition-colors" 
            onClick={handleNext}
          >
            {currentStep < totalSteps ? 'Next' : 'Create Team'}
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
