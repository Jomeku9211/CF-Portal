import React from 'react';
interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}
export function ProcessStep({
  number,
  title,
  description
}: ProcessStepProps) {
  return <div className="relative">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {number}
            </span>
          </div>
        </div>
        <div>
          <h5 className="text-lg font-semibold text-gray-900 mb-2">{title}</h5>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>;
}