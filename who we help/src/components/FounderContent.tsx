import React from 'react';
import { ClockIcon, PuzzleIcon, BrainIcon } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { ProblemCard } from './ui/ProblemCard';
import { BenefitItem } from './ui/BenefitItem';
import { ProcessStep } from './ui/ProcessStep';
export function FounderContent() {
  return <div>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <SectionHeading>
            Hiring shouldn't feel like gambling with your startup's future.
          </SectionHeading>
          <p className="text-lg text-gray-700 mt-6">
            As a founder, every hire is mission-critical. The wrong developer
            doesn't just cost salary—it slows down your roadmap, drains your
            runway, and distracts you from growth.
          </p>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              The Problem
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">Endless trial-and-error hires.</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Culture mismatches that disrupt your small, tight-knit team.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Burnout from managing recruitment when you should be focused
                  on building.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-8 h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProblemCard icon={<ClockIcon />} title="Time Drain" description="Hours spent reviewing similar resumes and conducting interviews" color="blue" />
            <ProblemCard icon={<PuzzleIcon />} title="Culture Mismatch" description="Finding developers who align with your vision and work style" color="purple" />
            <ProblemCard icon={<BrainIcon />} title="Focus Loss" description="Distracting you from product and growth priorities" color="orange" />
            <div className="relative sm:col-span-2 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-center h-full">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Startup team collaborating" className="rounded-lg h-48 w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="bg-white rounded-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            The Solution – Coderfarm
          </h3>
          <p className="text-lg text-gray-700">
            We help founders hire developers who fit your domain, culture, and
            ways of working—so they're productive from day one.
          </p>
          <div className="mt-10">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              How it works:
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProcessStep number="01" title="Job Persona Builder" description="Turn vague job descriptions into crystal-clear hiring blueprints." />
              <ProcessStep number="02" title="Top 10 Best-Fit Matches" description="See only pre-verified, culture-aligned candidates." />
              <ProcessStep number="03" title="Reputation Score" description="Hire with confidence using data on reliability, collaboration, and behavior." />
              <ProcessStep number="04" title="Onboarding Support" description="Smooth goal-setting and expectation alignment for faster ramp-up." />
            </div>
          </div>
          <div className="mt-12">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              Benefits for You
            </h4>
            <div className="grid sm:grid-cols-3 gap-4">
              <BenefitItem>
                Save months of wasted runway on bad hires
              </BenefitItem>
              <BenefitItem>
                Build a team that grows with your vision
              </BenefitItem>
              <BenefitItem>
                Focus on scaling, not firefighting recruitment
              </BenefitItem>
            </div>
          </div>
        </div>
      </div>
    </div>;
}