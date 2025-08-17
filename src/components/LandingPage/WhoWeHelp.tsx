import React, { useState } from 'react';
import { Users2Icon, BuildingIcon, CodeIcon, UserIcon, BriefcaseIcon, ClockIcon, DollarSignIcon, HeartIcon, UsersIcon, PuzzleIcon, ClipboardIcon } from 'lucide-react';

type TabKey = 'founders' | 'hr' | 'techLeads' | 'developers' | 'agencies';

interface WhoWeHelpItem {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export function WhoWeHelp() {
  const [activeTab, setActiveTab] = useState<TabKey>('founders');
  
  const whoWeHelpData: Record<TabKey, WhoWeHelpItem> = {
    founders: {
      icon: <BuildingIcon className="h-8 w-8 text-blue-700" />,
      title: 'Startup Founders',
      description: ''
    },
    hr: {
      icon: <Users2Icon className="h-8 w-8 text-orange-500" />,
      title: 'HR & Talent Leaders',
      description: 'Shorten time-to-hire, reduce attrition, and build trust.'
    },
    techLeads: {
      icon: <CodeIcon className="h-8 w-8 text-blue-900" />,
      title: 'Tech Leads & Managers',
      description: 'Align fast-growing teams with the right talent.'
    },
    developers: {
      icon: <UserIcon className="h-8 w-8 text-green-600" />,
      title: 'Developers',
      description: 'Find meaningful, long-term opportunities where you truly belong.'
    },
    agencies: {
      icon: <BriefcaseIcon className="h-8 w-8 text-purple-600" />,
      title: 'Agencies',
      description: 'Showcase and place top tech talent more effectively.'
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Who We Help
          </h3>
        </div>
        <div className="bg-gray-50 rounded-2xl p-0">
          <div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-2 md:gap-1 px-4 py-4">
            {(Object.keys(whoWeHelpData) as TabKey[]).map(key => (
              <button 
                key={key} 
                className={`w-full md:w-[17%] min-w-[120px] px-1 py-2 text-sm rounded transition ${
                  activeTab === key 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`} 
                onClick={() => setActiveTab(key)}
              >
                {whoWeHelpData[key].title}
              </button>
            ))}
          </div>
        </div>

        {/* Founder's Problem Solution Section - Only show when founders tab is active */}
        {activeTab === 'founders' && (
          <div className="mt-16">
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
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Time Drain</h3>
                    <p className="text-gray-700">
                      Hours spent reviewing similar resumes and conducting
                      interviews
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-orange-700 mb-2">
                      Financial Risk
                    </h3>
                    <p className="text-gray-700">
                      Mis-hires can cost up to 3x a developer's annual salary
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-red-700 mb-2">Team Morale</h3>
                    <p className="text-gray-700">
                      Poor cultural fits drain team energy and productivity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HR Problem Solution Section - Only show when HR tab is active */}
        {activeTab === 'hr' && (
          <div className="mt-16">
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              {/* Right Content - Visual */}
              <div className="w-full md:w-2/5">
                <div className="relative bg-blue-50 rounded-2xl p-6 shadow-lg">
                  <img src="https://img.freepik.com/free-vector/hr-management-concept-illustration_114360-13358.jpg" alt="HR professional with stacks of resumes" className="w-full h-auto rounded-xl" />
                  <div className="absolute -top-4 -left-4 bg-orange-100 rounded-full p-4 shadow-md">
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
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      Pressure Cooker
                    </h3>
                    <p className="text-gray-700">
                      Balancing expectations from leadership and candidates
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-5 shadow-md">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">
                      Cultural Mismatch
                    </h3>
                    <p className="text-gray-700">
                      Skills-only hiring leads to poor team integration
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-purple-700 mb-2">
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
        )}
      </div>
    </section>
  );
}
