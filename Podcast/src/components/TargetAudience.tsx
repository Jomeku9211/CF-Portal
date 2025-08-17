import React from 'react';
import { RocketIcon, UserIcon, CodeIcon, HeadphonesIcon } from 'lucide-react';
export function TargetAudience() {
  const audiences = [{
    icon: <RocketIcon size={32} />,
    title: 'Startup Founders',
    description: 'Tired of costly mis-hires and seeking better ways to build your team.'
  }, {
    icon: <UserIcon size={32} />,
    title: 'HR & Talent Leaders',
    description: 'Especially in mid-sized companies (30-200 employees) wanting faster, higher-quality hires.'
  }, {
    icon: <CodeIcon size={32} />,
    title: 'Tech Leads & CTOs',
    description: 'Scaling teams with alignment and looking for the right cultural additions.'
  }, {
    icon: <HeadphonesIcon size={32} />,
    title: 'Experienced Developers',
    description: 'Seeking meaningful, long-term roles beyond the paycheck.'
  }];
  return <section id="audience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Who Should Apply?
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            We're inviting these voices to the conversation:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((audience, index) => <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-all duration-300 hover:bg-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  {audience.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{audience.title}</h3>
                <p className="text-gray-600">{audience.description}</p>
              </div>)}
          </div>
          <div className="mt-10 text-center">
            <p className="text-xl font-medium text-blue-600">
              If you care about fixing hiring — this is your stage.
            </p>
          </div>
        </div>
      </div>
    </section>;
}