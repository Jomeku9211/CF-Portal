import React from 'react';
import { CheckIcon } from 'lucide-react';
interface BenefitItemProps {
  children: React.ReactNode;
}
export function BenefitItem({
  children
}: BenefitItemProps) {
  return <div className="bg-green-50 p-4 rounded-lg flex items-start">
      <div className="flex-shrink-0 mt-0.5 mr-3">
        <div className="bg-green-100 rounded-full p-1">
          <CheckIcon className="h-4 w-4 text-green-600" />
        </div>
      </div>
      <p className="text-gray-800">{children}</p>
    </div>;
}