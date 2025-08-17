import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
export function Hero() {
  return <section className="bg-primary py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
              New Episodes Weekly
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Find Developers Who Truly Fit Your Culture
          </h1>
          <p className="text-lg md:text-xl mb-10 text-blue-100">
            Hiring is Broken is a no-fluff podcast where we expose what's really
            wrong with tech hiring — and explore what actually works for
            founders and HR leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl text-center inline-flex items-center justify-center">
              Book a Free Call
              <ArrowRightIcon className="ml-2" size={20} />
            </a>
            <a href="#episodes" className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl text-center">
              Start Listening
            </a>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="relative">
          <div className="numbered-circle absolute" style={{
          top: '-100px',
          right: '100px'
        }}>
            2
          </div>
          <div className="numbered-circle absolute" style={{
          top: '50px',
          right: '300px'
        }}>
            3
          </div>
          <div className="numbered-circle absolute bg-accent text-white" style={{
          top: '-200px',
          right: '250px'
        }}>
            4
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>;
}