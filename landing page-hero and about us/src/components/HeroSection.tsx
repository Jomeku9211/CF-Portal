import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
export function HeroSection() {
  return <section className="w-full bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Hire developers who fit your team, not just the job.
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-700 mb-6">
              Coderfarm is the first culture-driven hiring platform for tech
              teams.
              <br />
              <br />
              We help founders and HRs match with developers who align by
              skills, culture, work style, and time zone—so every hire clicks
              from day one.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              End costly mis-hires. Build high-performing teams that last.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href="#book" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition">
                Book a Free Hiring Experiment
              </a>
              <a href="#learn" className="flex items-center text-blue-700 hover:text-blue-800 font-medium transition">
                Learn How It Works
                <ArrowRightIcon size={18} className="ml-1" />
              </a>
            </div>
          </div>
          {/* Right Content - Illustration */}
          <div className="w-full md:w-1/2">
            <div className="relative bg-blue-100 rounded-lg p-4 overflow-hidden">
              <img src="https://img.freepik.com/free-vector/team-leader-teamwork-concept-illustration_114360-12684.jpg" alt="Team collaboration illustration" className="w-full h-auto rounded-lg" />
              <div className="absolute top-4 left-4 bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center">
                2
              </div>
              <div className="absolute bottom-20 right-4 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                4
              </div>
              <div className="absolute bottom-4 left-1/3 bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center">
                3
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}