import React from 'react';
import { CodeIcon, SearchIcon, DollarSignIcon, ShieldIcon } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { ProblemCard } from './ui/ProblemCard';
import { BenefitItem } from './ui/BenefitItem';
import { ProcessStep } from './ui/ProcessStep';
export function DeveloperContent() {
  return <div>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <SectionHeading>
            Stop gambling your career on vague job postings.
          </SectionHeading>
          <p className="text-lg text-gray-700 mt-6">
            As a developer, too often you're forced to make career choices with
            zero context. Roles are unclear, teams are mismatched, and freelance
            gigs feel like a race to the bottom—with no payment security.
          </p>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              The Problem
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Vague job descriptions that hide culture, manager style, or
                  company mission.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Resume "robot wars" that reduce you to keywords, not skills.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Freelance platforms with high commissions and no payment
                  security.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Wasted energy on sales/marketing instead of coding.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-8 h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProblemCard icon={<CodeIcon />} title="Skill Mismatch" description="Jobs that don't match your actual technical strengths" color="green" />
            <ProblemCard icon={<SearchIcon />} title="Visibility Gap" description="Getting lost in the resume shuffle despite your abilities" color="blue" />
            <ProblemCard icon={<DollarSignIcon />} title="Payment Risk" description="Freelance work with uncertain payment terms" color="amber" />
            <div className="relative sm:col-span-2 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-center h-full">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="Developer working on code" className="rounded-lg h-48 w-full object-cover" />
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
            We help developers find meaningful opportunities where skills,
            culture, and purpose align—so you can grow without the guesswork.
          </p>
          <div className="mt-10">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              How it works:
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProcessStep number="01" title="Living Developer Profile" description="Verified skills, real ratings, ID checks, and purpose preferences go beyond self-reported CVs." />
              <ProcessStep number="02" title="Purpose & Culture Matching" description="Be matched with teams that fit your values, mission, and work style." />
              <ProcessStep number="03" title="Reputation Score" description="Earn a CIBIL-style score for reliability, communication, and delivery—your trust currency in tech." />
              <ProcessStep number="04" title="Escrow Payments" description="For freelance/contract roles, payments are secured and milestone-based, removing risk." />
            </div>
          </div>
          <div className="mt-12">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              Benefits for You
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <BenefitItem>
                Work with founders and teams you truly believe in
              </BenefitItem>
              <BenefitItem>
                Secure, escrow-backed payments for freelance roles
              </BenefitItem>
              <BenefitItem>
                Build a trusted reputation that travels with you
              </BenefitItem>
              <BenefitItem>
                Focus on coding, not chasing clients or fixing bad hires
              </BenefitItem>
            </div>
          </div>
        </div>
      </div>
    </div>;
}