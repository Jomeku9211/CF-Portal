import React from 'react';
import { UsersIcon, PuzzleIcon, ClipboardIcon } from 'lucide-react';
export function ProblemSectionHR() {
  return <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          {/* Right Content - Visual */}
          <div className="w-full md:w-2/5">
            <div className="relative bg-blue-50 rounded-2xl p-6 shadow-lg">
              <img src="https://img.freepik.com/free-vector/hr-management-concept-illustration_114360-13358.jpg" alt="HR professional with stacks of resumes" className="w-full h-auto rounded-xl" />
              <div className="absolute -top-4 -left-4 bg-blue-100 rounded-full p-4 shadow-md">
                <UsersIcon className="text-blue-700 h-8 w-8" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-100 rounded-full p-4 shadow-md">
                <PuzzleIcon className="text-green-600 h-8 w-8" />
              </div>
              <div className="absolute top-1/2 -left-4 bg-purple-100 rounded-full p-4 shadow-md">
                <ClipboardIcon className="text-purple-600 h-8 w-8" />
              </div>
            </div>
          </div>
          {/* Left Content - Text */}
          <div className="w-full md:w-3/5">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The HR Struggle
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              HR teams juggle pressure from leadership and employees alike.
              Endless interviews, unclear role definitions, and hiring based
              only on skills lead to high turnover. Traditional hiring tools
              don't capture what really matters: culture, behavior, and
              long-term fit.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Pressure Cooker
                </h3>
                <p className="text-gray-700">
                  Balancing expectations from leadership and candidates
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-green-700 mb-2">
                  Cultural Mismatch
                </h3>
                <p className="text-gray-700">
                  Skills-only hiring leads to poor team integration
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-purple-700 mb-2">
                  High Turnover
                </h3>
                <p className="text-gray-700">
                  Misaligned expectations lead to quick departures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}