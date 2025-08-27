import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from './Button';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function StepNavigation({ 
  currentStep, 
  totalSteps, 
  onBack, 
  onNext, 
  isFirstStep, 
  isLastStep 
}: StepNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8">
      <div className="flex-1">
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeftIcon size={20} />
            <span>Back</span>
          </Button>
        )}
      </div>
      
      <div className="flex-1 flex justify-center">
        <span className="text-sm text-gray-400">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>
      
      <div className="flex-1 flex justify-end">
        {!isLastStep && (
          <Button
            onClick={onNext}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ArrowRightIcon size={20} />
          </Button>
        )}
      </div>
    </div>
  );
}
