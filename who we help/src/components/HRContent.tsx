import React from 'react';
import { ClockIcon, UsersIcon, PieChartIcon } from 'lucide-react';
export function HRContent() {
  return <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="relative">
        <div className="bg-blue-50 p-8 rounded-lg flex items-center justify-center h-full">
          <div className="text-center">
            <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
              <UsersIcon className="h-12 w-12 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-blue-800">HR & Talent</h4>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-gray-900">The HR Challenge</h3>
        <p className="text-lg text-gray-700">
          As an HR professional, you're tasked with finding technical talent
          without having technical expertise yourself. Traditional hiring
          methods often lead to mismatches that impact business outcomes and
          team dynamics.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 p-5 rounded-lg">
            <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <ClockIcon className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Time Waste</h4>
            <p className="text-sm text-gray-600">
              Endless resume screening without technical context
            </p>
          </div>
          <div className="bg-orange-50 p-5 rounded-lg">
            <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <UsersIcon className="h-5 w-5 text-orange-600" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Skill Gaps</h4>
            <p className="text-sm text-gray-600">
              Difficulty assessing technical capabilities accurately
            </p>
          </div>
          <div className="bg-red-50 p-5 rounded-lg">
            <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <PieChartIcon className="h-5 w-5 text-red-600" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Retention Risk</h4>
            <p className="text-sm text-gray-600">
              High turnover from poor technical and cultural alignment
            </p>
          </div>
        </div>
      </div>
    </div>;
}