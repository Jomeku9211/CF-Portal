import React from 'react';
import { SimpleHeader } from '../SimpleHeader';
import { ProgressIndicator } from './ProgressIndicator';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}
export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  title,
  subtitle
}: OnboardingLayoutProps) {
  return <div className="min-h-screen bg-gradient-to-b from-white to-sanjuan-lightest font-['IBM_Plex_Sans']">
      <SimpleHeader />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Top progress bar */}
            <div className="bg-sanjuan-lightest px-8 py-6 border-b border-sanjuan-lighter">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-sanjuan-dark font-['Inter']">
                  {title}
                </h1>
                <div className="text-sm text-sanjuan-base">
                  Step {currentStep + 1} of {totalSteps}
                </div>
              </div>
              <div className="w-full bg-white rounded-full h-2.5">
                <div className="bg-sanjuan-base h-2.5 rounded-full transition-all duration-300 ease-in-out" style={{
                width: `${(currentStep + 1) / totalSteps * 100}%`
              }} />
              </div>
              <p className="mt-4 text-sanjuan-base">{subtitle}</p>
            </div>
            {/* Main content */}
            <div className="p-8">{children}</div>
            {/* Bottom navigation indicators */}
            <div className="bg-sanjuan-lightest px-8 py-4 border-t border-sanjuan-lighter">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-sanjuan-base">
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Previous step
                </div>
                <div className="flex space-x-2">
                  {Array.from({
                  length: totalSteps
                }).map((_, index) => <div key={index} className={`h-2 w-2 rounded-full ${index === currentStep ? 'bg-sanjuan-base' : 'bg-sanjuan-lighter'}`} />)}
                </div>
                <div className="flex items-center text-sm text-sanjuan-base">
                  Next step
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
}