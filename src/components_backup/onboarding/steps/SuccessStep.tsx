
import { CheckCircleIcon, UsersIcon, RocketIcon } from 'lucide-react';

export function SuccessStep() {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircleIcon size={28} className="text-white" />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-4">
        All Set!
      </h2>
      
      <p className="text-gray-300 mb-8">
        Thank you for completing your profile! We now have a comprehensive understanding of your organization and hiring needs.
      </p>
      
      <div className="bg-[#1e293b] rounded-lg p-6 text-left mb-8 border border-[#2a3344]">
        <h3 className="font-medium text-[#3b82f6] mb-3">
          What happens next:
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-[#151c2c] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <UsersIcon size={16} className="text-[#3b82f6]" />
            </div>
            <div>
              <h4 className="font-medium text-white">Profile Review</h4>
              <p className="text-sm text-gray-300">
                Our team will review your information and may reach out for clarification
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 bg-[#151c2c] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <RocketIcon size={16} className="text-[#3b82f6]" />
            </div>
            <div>
              <h4 className="font-medium text-white">Talent Matching</h4>
              <p className="text-sm text-gray-300">
                We'll start matching you with qualified candidates based on your requirements
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 italic">
        You can always update your profile information from your dashboard.
      </p>
    </div>
  );
}

