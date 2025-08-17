import React from 'react';
export function TeamFit() {
  return <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Top Soft Skills (select up to 3)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="communication" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="communication">Communication</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="ownership" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="ownership">Ownership</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="problem-solving" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="problem-solving">Problem-Solving</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="teamwork" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="teamwork">Teamwork</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="adaptability" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="adaptability">Adaptability</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="time-management" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="time-management">Time Management</label>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Interview Stages
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="intro" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="intro">Intro Call</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="technical" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="technical">Technical Round</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="assignment" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="assignment">Assignment</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="culture" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="culture">Culture Fit</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="final" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="final">Final Decision</label>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Test Task Required?
        </label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input type="radio" id="test-yes" name="test-task" className="text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="test-yes" className="ml-2">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="test-no" name="test-task" className="text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="test-no" className="ml-2">
              No
            </label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="test-optional" name="test-task" className="text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="test-optional" className="ml-2">
              Optional
            </label>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Who Interviews?
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="founder" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="founder">Founder/CTO</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="techlead" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="techlead">Tech Lead</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="hr" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="hr">HR</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="team" className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" />
            <label htmlFor="team">Team Members</label>
          </div>
        </div>
      </div>
    </div>;
}