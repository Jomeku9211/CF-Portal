import React from 'react';

interface Step {
  id: string;
  title: string;
  component: React.ComponentType<any>;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export function ProgressBar({ steps, currentStep, onStepClick }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = index < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <button
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  isCompleted
                    ? 'bg-[#22c55e] text-white cursor-pointer hover:bg-[#16a34a]'
                    : isCurrent
                    ? 'bg-[#3b82f6] text-white'
                    : 'bg-[#2a3344] text-gray-400'
                } ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>

              {/* Step Title */}
              <span className={`mt-2 text-xs font-medium text-center ${
                isCompleted ? 'text-[#22c55e]' : isCurrent ? 'text-[#3b82f6]' : 'text-gray-400'
              }`}>
                {step.title}
              </span>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`w-full h-0.5 mt-2 ${
                  isCompleted ? 'bg-[#22c55e]' : 'bg-[#2a3344]'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


