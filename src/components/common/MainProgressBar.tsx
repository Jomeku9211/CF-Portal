import { CheckIcon } from 'lucide-react';

interface MainStep {
  id: number;
  name: string;
  completed: boolean;
  active: boolean;
  subSteps?: number;
  currentSubStep?: number;
}

interface MainProgressBarProps {
  steps: MainStep[];
  currentMainStep: number;
  onStepClick?: (stepId: number) => void;
}

export function MainProgressBar({ steps, onStepClick }: MainProgressBarProps) {
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between w-full mb-2">
        {/* Background line */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-700 -translate-y-1/2 z-0"></div>
        
        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            {/* Main step circle */}
            <button
              onClick={() => onStepClick && onStepClick(step.id)}
              disabled={!onStepClick}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                step.completed 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : step.active 
                  ? 'bg-blue-500 border-2 border-blue-300' 
                  : 'bg-gray-700'
              } ${onStepClick ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {step.completed ? (
                <CheckIcon className="w-6 h-6 text-white" />
              ) : (
                <span className="text-white text-sm font-medium">{step.id}</span>
              )}
            </button>
            
            {/* Main step title */}
            <span className="text-sm mt-2 text-gray-300 max-w-[140px] text-center font-medium">
              {step.name}
            </span>
            
            {/* Sub-progress indicator */}
            {step.subSteps && step.subSteps > 1 && (
              <div className="mt-2 flex items-center space-x-1">
                {Array.from({ length: step.subSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < (step.currentSubStep || 0)
                        ? 'bg-green-400'
                        : i === (step.currentSubStep || 0)
                        ? 'bg-blue-400'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
