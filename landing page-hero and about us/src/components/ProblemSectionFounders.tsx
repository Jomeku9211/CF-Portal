import React from 'react';
import { ClockIcon, DollarSignIcon, HeartIcon } from 'lucide-react';
export function ProblemSectionFounders() {
  return <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content - Visual */}
          <div className="w-full md:w-2/5">
            <div className="relative bg-blue-50 rounded-2xl p-6 shadow-lg">
              <img src="https://img.freepik.com/free-vector/deadline-concept-illustration_114360-6311.jpg" alt="Founder juggling tasks and deadlines" className="w-full h-auto rounded-xl" />
              <div className="absolute -top-4 -right-4 bg-orange-100 rounded-full p-4 shadow-md">
                <ClockIcon className="text-orange-500 h-8 w-8" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-100 rounded-full p-4 shadow-md">
                <DollarSignIcon className="text-blue-700 h-8 w-8" />
              </div>
              <div className="absolute top-1/2 -right-4 bg-red-100 rounded-full p-4 shadow-md">
                <HeartIcon className="text-red-500 h-8 w-8" />
              </div>
            </div>
          </div>
          {/* Right Content - Text */}
          <div className="w-full md:w-3/5">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Founder's Challenge
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              As a bootstrapped startup founder, every hire feels like a bet.
              Mis-hires cost time, money, and morale. Resumes look the same,
              interviews drain hours, and "gut hiring" often leads to regret.
              You don't just need skills—you need people who share your vision,
              thrive in your team culture, and stay committed.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-blue-900 mb-2">Time Drain</h3>
                <p className="text-gray-700">
                  Hours spent reviewing similar resumes and conducting
                  interviews
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-orange-700 mb-2">
                  Financial Risk
                </h3>
                <p className="text-gray-700">
                  Mis-hires can cost up to 3x a developer's annual salary
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-red-700 mb-2">Team Morale</h3>
                <p className="text-gray-700">
                  Poor cultural fits drain team energy and productivity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}