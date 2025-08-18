import React from 'react';
import { CheckCircleIcon, FileTextIcon, UsersIcon, RocketIcon } from 'lucide-react';
interface CompletionScreenProps {
  formData: any;
}
export function CompletionScreen({
  formData
}: CompletionScreenProps) {
  return <div className="text-center py-8">
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 bg-[#10b981] bg-opacity-20 rounded-full flex items-center justify-center">
          <CheckCircleIcon size={48} className="text-[#10b981]" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-3">
        Organization Profile Complete!
      </h2>
      <p className="text-gray-300 mb-10 max-w-lg mx-auto">
        Excellent! We now have a comprehensive understanding of your
        organization's mission, values, and what makes you unique.
      </p>
      <div className="bg-gradient-to-r from-[#1e3a8a]/30 to-[#3b82f6]/10 p-8 rounded-xl border border-[#3b82f6]/30 shadow-lg mb-8 max-w-lg mx-auto">
        <h3 className="text-xl font-bold text-[#60a5fa] mb-6">
          What happens next:
        </h3>
        <div className="space-y-6 text-left">
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="bg-[#3b82f6]/20 p-2 rounded-full">
                <FileTextIcon className="h-6 w-6 text-[#60a5fa]" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[#60a5fa] text-lg mb-1">
                Profile Review
              </h4>
              <p className="text-gray-300">
                Our team will review your organization profile and may reach out
                for clarification
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="bg-[#3b82f6]/20 p-2 rounded-full">
                <UsersIcon className="h-6 w-6 text-[#60a5fa]" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[#60a5fa] text-lg mb-1">
                Candidate Matching
              </h4>
              <p className="text-gray-300">
                We'll start matching you with candidates who align with your
                culture and values
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#065f46]/30 to-[#10b981]/10 p-8 rounded-xl border border-[#10b981]/30 shadow-lg max-w-lg mx-auto">
        <div className="flex items-center mb-4">
          <div className="bg-[#10b981]/20 p-2 rounded-full mr-3">
            <RocketIcon className="text-[#34d399]" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Next steps:</h3>
        </div>
        <p className="text-gray-300 text-left">
          You can now create job postings or browse our talent pool. Your
          organization profile will be visible to potential candidates.
        </p>
      </div>
      <p className="text-sm text-gray-400 mt-8">
        You can always update your organization information from your dashboard.
      </p>
    </div>;
}