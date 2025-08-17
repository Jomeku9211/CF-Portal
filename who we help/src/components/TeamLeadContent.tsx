import React from 'react';
import { ClockIcon, UsersIcon, AlertCircleIcon } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { ProblemCard } from './ui/ProblemCard';
import { BenefitItem } from './ui/BenefitItem';
import { ProcessStep } from './ui/ProcessStep';
export function TeamLeadContent() {
  return <div>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <SectionHeading>
            Hiring shouldn't add friction to your team's workflow.
          </SectionHeading>
          <p className="text-lg text-gray-700 mt-6">
            As a team lead or manager, you're responsible for delivery. The
            wrong hire doesn't just create delays—it increases your workload,
            affects team morale, and puts deadlines at risk.
          </p>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              The Problem
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Resumes that don't reflect real coding ability.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Culture mismatches that slow collaboration.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Extra hours wasted mentoring misaligned hires.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-8 h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProblemCard icon={<ClockIcon />} title="Time Waste" description="Hours lost to interviews and onboarding mismatched hires" color="purple" />
            <ProblemCard icon={<UsersIcon />} title="Team Disruption" description="Poor fits that affect team dynamics and productivity" color="indigo" />
            <ProblemCard icon={<AlertCircleIcon />} title="Delivery Risk" description="Missed deadlines and quality issues from misaligned skills" color="red" />
            <div className="relative sm:col-span-2 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-center h-full">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Team lead working with developers" className="rounded-lg h-48 w-full object-cover" />
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
            We help team leads hire developers who align with your workflow,
            culture, and technical needs—so your team stays focused and
            productive.
          </p>
          <div className="mt-10">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              How it works:
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProcessStep number="01" title="Skill + Culture Fit Verification" description="Every candidate is tested for both technical ability and collaboration style." />
              <ProcessStep number="02" title="Top 10 Best-Fit Matches" description="Spend less time screening, more time building." />
              <ProcessStep number="03" title="Reputation Score" description="Know how reliable and team-friendly each candidate is." />
              <ProcessStep number="04" title="Onboarding Support" description="Ensure smooth integration into your sprint cycles." />
            </div>
          </div>
          <div className="mt-12">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              Benefits for You
            </h4>
            <div className="grid sm:grid-cols-3 gap-4">
              <BenefitItem>Deliver projects without disruption</BenefitItem>
              <BenefitItem>Build a team that collaborates smoothly</BenefitItem>
              <BenefitItem>
                Spend less time fixing, more time leading
              </BenefitItem>
            </div>
          </div>
        </div>
      </div>
    </div>;
}