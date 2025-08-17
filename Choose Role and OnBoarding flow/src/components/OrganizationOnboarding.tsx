import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
export function OrganizationOnboarding({
  onNext
}: {
  onNext: () => void;
}) {
  return <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircleIcon className="text-green-500" size={32} />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">
        Organization Profile Complete!
      </h2>
      <p className="text-gray-400 mb-8">
        Thanks for sharing details about your organization. Your profile is now
        set up and ready to help attract the right talent.
      </p>
      <div className="bg-[#1c223f] rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Organization Profile</h3>
          <span className="text-xs bg-blue-500 px-2 py-1 rounded-md">
            Complete
          </span>
        </div>
        <div className="text-left">
          <h4 className="text-blue-400 mb-1">Your Organization</h4>
          <p className="text-sm text-gray-300 mb-1">ecommerce • 11-50</p>
          <p className="text-sm italic text-gray-500 mb-3">
            "We exist to make a difference"
          </p>
          <div className="bg-green-900/30 border border-green-700/30 rounded-md p-3 flex items-center gap-2">
            <CheckCircleIcon className="text-green-500" size={16} />
            <span className="text-sm text-green-400">
              Profile visibility optimized for candidate matching
            </span>
          </div>
        </div>
      </div>
      <div className="text-left mb-6">
        <h3 className="font-semibold mb-3">
          What's next? Now that your organization profile is complete, you can:
        </h3>
        <ul className="space-y-2 list-disc pl-5 text-gray-300">
          <li>Create job personas to define the roles you're hiring for</li>
          <li>Review potential candidate matches</li>
          <li>Explore your dashboard to manage your hiring process</li>
        </ul>
      </div>
    </div>;
}