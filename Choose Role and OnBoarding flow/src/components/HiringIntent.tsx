import React from 'react';
export function HiringIntent({
  onNext,
  onBack
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return <div>
      <h2 className="text-2xl font-bold mb-6">Hiring Intent</h2>
      <p className="text-gray-400 mb-6">
        Let's capture high-level information about your hiring needs.
      </p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Role Title</label>
          <input type="text" placeholder="e.g. Frontend Developer" className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Number of Hires Planned
          </label>
          <select className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>1</option>
            <option>2-5</option>
            <option>5+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            When Do You Want to Hire?
          </label>
          <select className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Immediately</option>
            <option>Within 1 month</option>
            <option>Within 3 months</option>
            <option>Within 6+ months</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Employment Type
          </label>
          <select className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Location Preference
          </label>
          <select className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2">
            <option>Remote</option>
            <option>Onsite</option>
            <option>Hybrid</option>
          </select>
          <input type="text" placeholder="City (if onsite or hybrid)" className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Salary Range (Optional)
          </label>
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Min" className="w-1/2 bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <span>—</span>
            <input type="text" placeholder="Max" className="w-1/2 bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mt-2 flex items-center">
            <input type="checkbox" id="equity" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="equity" className="ml-2 text-sm">
              Equity available
            </label>
          </div>
        </div>
      </div>
    </div>;
}