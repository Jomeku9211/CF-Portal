import React, { useState } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
export function App() {
  return <div className="w-full min-h-screen bg-neutral-lightest">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <header className="mb-10 text-center">
          <div className="inline-block mb-4 p-2 bg-sanjuan-lightest rounded-full">
            <div className="w-10 h-10 flex items-center justify-center bg-sanjuan-base rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-large-bold font-inter text-sanjuan-base mb-2">
            Developer Onboarding
          </h1>
          <p className="text-regular-normal text-neutral-dark max-w-md mx-auto">
            Complete your profile to connect with top companies and showcase
            your skills
          </p>
        </header>
        <OnboardingFlow />
      </div>
    </div>;
}