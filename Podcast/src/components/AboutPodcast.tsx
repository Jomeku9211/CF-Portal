import React from 'react';
import { MicIcon, CheckIcon } from 'lucide-react';
export function AboutPodcast() {
  return <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <MicIcon className="text-accent mr-3" size={32} />
            <h2 className="text-3xl font-bold text-primary">
              About the Podcast
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                <span className="font-semibold text-primary">
                  Hiring is Broken
                </span>{' '}
                isn't just another recruitment podcast. It's a no-fluff,
                no-buzzword space where we expose what's really wrong with tech
                hiring — and explore what actually works.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Hosted by{' '}
                <span className="font-semibold text-primary">Coderfarm</span>,
                we bring founders, HR leaders, tech leads, and developers into
                authentic, engaging, and sometimes hilarious conversations about
                building teams that actually last.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
                    <CheckIcon size={16} />
                  </div>
                  <p className="text-gray-700">
                    95% Retention rate for culture-fit hires
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
                    <CheckIcon size={16} />
                  </div>
                  <p className="text-gray-700">
                    Weekly episodes with actionable insights
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
                    <CheckIcon size={16} />
                  </div>
                  <p className="text-gray-700">
                    Zero Down Time Guarantee for hiring
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 relative">
              <div className="absolute -top-4 -right-4 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">
                Why This Matters
              </h3>
              <p className="mb-6">
                Hire remote talent vetted not just for skills, but for real
                culture fit, proven reputation, and teamwork—so teams thrive and
                projects succeed.
              </p>
              <div className="flex items-center">
                <div className="font-bold text-primary mr-3">4.9/5</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>)}
                </div>
                <div className="ml-2 text-gray-600">for Culture fit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}