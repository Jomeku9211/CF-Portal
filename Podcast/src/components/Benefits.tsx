import React from 'react';
import { Share2Icon, UserIcon, PuzzleIcon } from 'lucide-react';
export function Benefits() {
  const benefits = [{
    icon: <Share2Icon size={32} />,
    title: 'Share Your Insights',
    description: 'Connect with a targeted, engaged audience interested in hiring innovation.'
  }, {
    icon: <UserIcon size={32} />,
    title: 'Build Your Brand',
    description: 'Establish yourself as a thought leader in the startup + IT community.'
  }, {
    icon: <PuzzleIcon size={32} />,
    title: 'Join The Movement',
    description: 'Become part of a community redefining how hiring should work.'
  }];
  return <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Join?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}