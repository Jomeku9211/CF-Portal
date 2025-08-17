import React from 'react';
import { BuildingIcon, BarChartIcon, UsersIcon, ClockIcon } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { ProblemCard } from './ui/ProblemCard';
import { BenefitItem } from './ui/BenefitItem';
import { ProcessStep } from './ui/ProcessStep';
export function AgencyContent() {
  return <div>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <SectionHeading>
            Scale your agency profitably, without talent headaches.
          </SectionHeading>
          <p className="text-lg text-gray-700 mt-6">
            As an agency owner, every project depends on your ability to deploy
            the right talent at the right time. But delays, unutilized bench
            developers, and unreliable freelancers eat into your profit margins
            and put your reputation at risk. Instead of driving growth, you're
            often stuck managing hiring chaos and delivery problems.
          </p>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              The Problem
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Bench developers draining profits when projects are delayed or
                  cancelled.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Scaling fast under client pressure without reliable backup.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Freelancers ghosting mid-project or underperforming.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Transactional platforms with high commissions and
                  race-to-the-bottom pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-indigo-50 rounded-xl p-8 h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProblemCard icon={<BuildingIcon />} title="Bench Costs" description="Idle developers eating into your profit margins" color="indigo" />
            <ProblemCard icon={<BarChartIcon />} title="Scaling Challenges" description="Finding reliable talent quickly when clients demand it" color="blue" />
            <ProblemCard icon={<UsersIcon />} title="Reliability Issues" description="Freelancers who disappear or underperform" color="purple" />
            <div className="relative sm:col-span-2 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-center h-full">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Agency team working together" className="rounded-lg h-48 w-full object-cover" />
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
            Coderfarm is a builder's ecosystem that helps agencies like yours
            thrive by matching you with developers aligned by purpose,
            personality, capability, and culture—while ensuring your bench
            talent stays active and profitable.
          </p>
          <div className="mt-10">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              How it works:
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProcessStep number="01" title="Agency Portal" description="Add/manage developer profiles, tag tech stacks, track vetting, and view earnings dashboards." />
              <ProcessStep number="02" title="Rigorous Vetting" description="Multi-stage checks with verified ratings and client feedback." />
              <ProcessStep number="03" title="Smart Job Matching" description="Personalized Top 10 matches and advanced filtering." />
              <ProcessStep number="04" title="Escrow Payments" description="Secure, milestone-based payments protect all parties." />
            </div>
          </div>
          <div className="mt-12">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              Benefits for You
            </h4>
            <div className="grid sm:grid-cols-3 gap-4">
              <BenefitItem>
                Keep your bench talent profitable, not idle
              </BenefitItem>
              <BenefitItem>
                Scale teams rapidly to meet client demands
              </BenefitItem>
              <BenefitItem>
                Protect profit margins with reduced hiring risks
              </BenefitItem>
              <BenefitItem>
                Deliver consistently, safeguard your reputation
              </BenefitItem>
              <BenefitItem>
                Spend more time winning clients, less time managing teams
              </BenefitItem>
              <BenefitItem>
                Build long-term trust with clients and developers
              </BenefitItem>
            </div>
          </div>
        </div>
      </div>
    </div>;
}