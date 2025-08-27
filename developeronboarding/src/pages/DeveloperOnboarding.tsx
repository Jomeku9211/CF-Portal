import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { OnboardingContainer } from '../components/onboarding/OnboardingContainer';
export function DeveloperOnboardingPage() {
  return <div className="min-h-screen bg-gray-50 font-['IBM_Plex_Sans']">
      <Header />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-sanjuan-dark mb-2 font-['Inter']">
              Complete Your Developer Profile
            </h1>
            <p className="text-sanjuan-base max-w-2xl mx-auto">
              Let's set up your profile to match you with the perfect
              opportunities. This will help us understand your skills,
              preferences, and work style.
            </p>
          </div>
          <OnboardingContainer />
        </div>
      </main>
      <Footer />
    </div>;
}