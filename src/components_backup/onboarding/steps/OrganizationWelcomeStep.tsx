
import { BuildingIcon, ChartBarIcon, CompassIcon } from 'lucide-react';

export function OrganizationWelcomeStep() {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 bg-[#1e293b] rounded-full flex items-center justify-center mx-auto mb-6">
        <BuildingIcon size={28} className="text-[#3b82f6]" />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-4">
        Organization Onboarding
      </h2>
      
      <p className="text-gray-300 mb-8">
        Let's set up your organization profile to help us match you with the perfect talent. This information will help candidates understand your mission, values, and what makes your organization unique.
      </p>
      
      <div className="bg-[#1e293b] rounded-lg p-6 text-left mb-8 border border-[#2a3344]">
        <h3 className="font-medium text-[#3b82f6] mb-3">
          Here's what we'll cover:
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-[#151c2c] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <BuildingIcon size={16} className="text-[#3b82f6]" />
            </div>
            <div>
              <h4 className="font-medium text-white">Basic Information</h4>
              <p className="text-sm text-gray-300">
                Your organization's name, industry, website, and size
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 bg-[#151c2c] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <ChartBarIcon size={16} className="text-[#3b82f6]" />
            </div>
            <div>
              <h4 className="font-medium text-white">Financial Snapshot</h4>
              <p className="text-sm text-gray-300">
                Current funding status, revenue, and profitability
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 bg-[#151c2c] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <CompassIcon size={16} className="text-[#3b82f6]" />
            </div>
            <div>
              <h4 className="font-medium text-white">Purpose & Identity</h4>
              <p className="text-sm text-gray-300">
                Your "why" statement, origin story, and core beliefs
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 italic">
        This should only take about 10 minutes, and you can always edit your information later.
      </p>
    </div>
  );
}

