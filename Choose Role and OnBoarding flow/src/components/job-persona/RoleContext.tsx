import React from 'react';
export function RoleContext() {
  return <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Work Location Type
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
          Day-to-day Responsibilities
        </label>
        <textarea rows={4} placeholder="Describe the main responsibilities and tasks this role will handle on a daily basis" className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Key Problems They'll Solve
        </label>
        <textarea rows={4} placeholder="What are the main challenges or problems this role will help solve?" className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Expected Start Date
        </label>
        <input type="date" className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
          <input type="checkbox" id="equity-option" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
          <label htmlFor="equity-option" className="ml-2 text-sm">
            Equity available
          </label>
        </div>
      </div>
    </div>;
}