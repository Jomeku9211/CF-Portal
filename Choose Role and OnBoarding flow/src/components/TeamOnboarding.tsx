import React from 'react';
export function TeamOnboarding({
  onNext,
  onBack
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return <div>
      <h2 className="text-2xl font-bold mb-6">Team Onboarding</h2>
      <p className="text-gray-400 mb-6">
        Tell us about your team structure and culture to help us find the right
        candidates.
      </p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Team Size</label>
          <select className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>1-5 employees</option>
            <option>6-15 employees</option>
            <option>16-30 employees</option>
            <option>31-50 employees</option>
            <option>51+ employees</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Team Structure
          </label>
          <select className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Flat hierarchy</option>
            <option>Traditional hierarchy</option>
            <option>Matrix structure</option>
            <option>Agile teams</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Primary Communication Style
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="async" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="async">Async communication</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="meetings" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="meetings">Regular meetings</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="chat" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="chat">Chat-based</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="email" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
              <label htmlFor="email">Email-focused</label>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Work Environment
          </label>
          <select className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Fast-paced startup</option>
            <option>Structured enterprise</option>
            <option>Creative agency</option>
            <option>Research-focused</option>
            <option>Product-led</option>
          </select>
        </div>
      </div>
    </div>;
}