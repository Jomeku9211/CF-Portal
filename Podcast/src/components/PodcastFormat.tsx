import React from 'react';
import { MicIcon, UserIcon, BrainIcon, ZapIcon, MessageSquareIcon } from 'lucide-react';
export function PodcastFormat() {
  const formatSteps = [{
    icon: <MicIcon size={24} />,
    title: 'Introduction',
    description: 'Set the stage and warm up.'
  }, {
    icon: <UserIcon size={24} />,
    title: 'Beyond the Resume',
    description: 'Get to know you as a person, not just your title.'
  }, {
    icon: <BrainIcon size={24} />,
    title: 'The Core: Hiring, Teams & Leadership',
    description: 'Share your real-world wins, struggles, and lessons.'
  }, {
    icon: <ZapIcon size={24} />,
    title: 'Rapid Fire Round',
    description: 'Quick Q&As: one word, true/false, or a single sentence.'
  }, {
    icon: <div size={24} />,
    title: 'Role Play',
    description: 'Step into a scenario and act it out with us.'
  }, {
    icon: <MessageSquareIcon size={24} />,
    title: 'React & Debate',
    description: 'Respond to a meme, post, or video — and let the sparks fly.'
  }];
  return <section id="format" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            What to Expect as a Guest
          </h2>
          <p className="text-center text-lg text-gray-700 mb-12">
            Our format is designed for insight + fun:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {formatSteps.map((step, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-xl">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}