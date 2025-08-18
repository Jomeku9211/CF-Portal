import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon, PuzzleIcon, BrainIcon, UsersIcon, CodeIcon, BuildingIcon, UserIcon, DollarSignIcon } from 'lucide-react';

type PersonaTab = 'founders' | 'teamLeads' | 'developers' | 'agencies';

export function WhoWeHelp() {
  const [activeTab, setActiveTab] = useState<PersonaTab>('founders');
  
  const handleTabClick = (tab: PersonaTab) => {
    setActiveTab(tab);
  };

  return (
    <section className="w-full bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Who We Help
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We match the right people with the right opportunities based on
            skills, culture, and purpose alignment.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row md:overflow-x-auto scrollbar-hide border-b border-gray-100">
            <TabButton label="Founders" isActive={activeTab === 'founders'} onClick={() => handleTabClick('founders')} />
            <TabButton label="Team Leads" isActive={activeTab === 'teamLeads'} onClick={() => handleTabClick('teamLeads')} />
            <TabButton label="Developers" isActive={activeTab === 'developers'} onClick={() => handleTabClick('developers')} />
            <TabButton label="Agencies" isActive={activeTab === 'agencies'} onClick={() => handleTabClick('agencies')} />
          </div>
          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }} 
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'founders' && <FounderContent />}
                {activeTab === 'teamLeads' && <TeamLeadContent />}
                {activeTab === 'developers' && <DeveloperContent />}
                {activeTab === 'agencies' && <AgencyContent />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      className={`relative py-4 px-4 md:px-8 text-base font-medium transition-colors duration-200 focus:outline-none w-full text-left md:w-auto md:text-center border-b border-gray-100 md:border-b-0
        ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
      onClick={onClick}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 md:w-auto md:h-0.5 md:left-0 md:right-0 md:top-auto md:bottom-0"
          transition={{ type: 'spring', duration: 0.5 }}
        />
      )}
    </button>
  );
}

// Founder Content Component
function FounderContent() {
  return (
    <div>
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
    </div>
  );
}

// Team Lead Content Component
function TeamLeadContent() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <SectionHeading>
            Build teams that deliver consistently, not just when you're watching.
          </SectionHeading>
          <p className="text-lg text-gray-700 mt-6">
            As a tech lead, you need developers who can work independently,
            collaborate effectively, and maintain quality standards. The wrong
            hire means more code reviews, slower delivery, and team friction.
          </p>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              The Problem
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">Developers who need constant supervision.</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Skill gaps that slow down the entire team.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Communication breakdowns during critical phases.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-8 h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProblemCard icon={<UsersIcon />} title="Team Friction" description="Personality clashes and communication issues" color="red" />
            <ProblemCard icon={<CodeIcon />} title="Skill Gaps" description="Developers who can't contribute to complex projects" color="orange" />
            <ProblemCard icon={<ClockIcon />} title="Delivery Delays" description="Projects slowed by inexperienced team members" color="blue" />
            <div className="relative sm:col-span-2 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-center h-full">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt="Team collaboration" className="rounded-lg h-48 w-full object-cover" />
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
            We help you find developers who can hit the ground running,
            collaborate effectively, and maintain your team's high standards.
          </p>
          <div className="mt-10">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              How it works:
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProcessStep number="01" title="Technical Assessment" description="Verify skills through practical coding challenges." />
              <ProcessStep number="02" title="Team Compatibility" description="Match developers with your team's communication style." />
              <ProcessStep number="03" title="Work Style Alignment" description="Find developers who thrive in your development process." />
              <ProcessStep number="04" title="Quality Assurance" description="Ensure candidates meet your code quality standards." />
            </div>
          </div>
          <div className="mt-12">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              Benefits for You
            </h4>
            <div className="grid sm:grid-cols-3 gap-4">
              <BenefitItem>
                Reduce time spent on code reviews and mentoring
              </BenefitItem>
              <BenefitItem>
                Maintain consistent delivery timelines
              </BenefitItem>
              <BenefitItem>
                Build a cohesive, high-performing team
              </BenefitItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Developer Content Component
function DeveloperContent() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <SectionHeading>
            Find opportunities where you can grow, contribute, and belong.
          </SectionHeading>
          <p className="text-lg text-gray-700 mt-6">
            As a developer, you want to work on meaningful projects with
            teams that value your skills and support your growth. Traditional
            hiring often misses what matters most: culture fit and long-term
            potential.
          </p>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              The Problem
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">Interviews that don't showcase your real abilities.</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Companies that only care about technical skills.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Short-term gigs instead of meaningful long-term roles.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-8 h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProblemCard icon={<UserIcon />} title="Misrepresentation" description="Companies that don't match their job descriptions" color="red" />
            <ProblemCard icon={<ClockIcon />} title="Short-term Focus" description="Roles that don't offer growth opportunities" color="orange" />
                         <ProblemCard icon={<PuzzleIcon />} title="Culture Mismatch" description="Teams where you don't feel you belong" color="purple" />
            <div className="relative sm:col-span-2 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-center h-full">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Developer at work" className="rounded-lg h-48 w-full object-cover" />
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
            We help you find companies that value your skills, support your
            growth, and offer opportunities where you can truly thrive.
          </p>
          <div className="mt-10">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              How it works:
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProcessStep number="01" title="Profile Creation" description="Build a comprehensive profile showcasing your skills and values." />
              <ProcessStep number="02" title="Culture Matching" description="Connect with companies that align with your work style." />
              <ProcessStep number="03" title="Skill Validation" description="Demonstrate your abilities through practical assessments." />
              <ProcessStep number="04" title="Long-term Focus" description="Find opportunities for growth and career development." />
            </div>
          </div>
          <div className="mt-12">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              Benefits for You
            </h4>
            <div className="grid sm:grid-cols-3 gap-4">
              <BenefitItem>
                Work with teams that value your contributions
              </BenefitItem>
              <BenefitItem>
                Find opportunities for long-term growth
              </BenefitItem>
              <BenefitItem>
                Build meaningful, lasting relationships
              </BenefitItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Agency Content Component
function AgencyContent() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <SectionHeading>
            Place top tech talent faster and build lasting client relationships.
          </SectionHeading>
          <p className="text-lg text-gray-700 mt-6">
            As an agency, you need to quickly identify and place qualified
            developers while maintaining high client satisfaction. Traditional
            recruitment methods are slow and often result in poor matches.
          </p>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              The Problem
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">Slow candidate sourcing and screening.</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  Poor matches that damage client relationships.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <p className="text-gray-700">
                  High costs from repeated recruitment efforts.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-8 h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProblemCard icon={<ClockIcon />} title="Slow Process" description="Weeks spent finding and screening candidates" color="red" />
            <ProblemCard icon={<BuildingIcon />} title="Poor Matches" description="Candidates who don't fit client needs" color="orange" />
            <ProblemCard icon={<DollarSignIcon />} title="High Costs" description="Expensive recruitment cycles and replacements" color="purple" />
            <div className="relative sm:col-span-2 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-center h-full">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Agency team" className="rounded-lg h-48 w-full object-cover" />
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
            We help agencies quickly identify and place qualified developers,
            reducing time-to-hire and improving client satisfaction.
          </p>
          <div className="mt-10">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              How it works:
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProcessStep number="01" title="Quick Matching" description="Access pre-verified candidates within hours." />
              <ProcessStep number="02" title="Quality Assurance" description="Ensure candidates meet high standards." />
              <ProcessStep number="03" title="Client Alignment" description="Match candidates with specific client needs." />
              <ProcessStep number="04" title="Ongoing Support" description="Provide support throughout the placement process." />
            </div>
          </div>
          <div className="mt-12">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">
              Benefits for You
            </h4>
            <div className="grid sm:grid-cols-3 gap-4">
              <BenefitItem>
                Reduce time-to-hire by 70%
              </BenefitItem>
              <BenefitItem>
                Improve client satisfaction and retention
              </BenefitItem>
              <BenefitItem>
                Lower recruitment costs and overhead
              </BenefitItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// UI Components
interface SectionHeadingProps {
  children: React.ReactNode;
}

function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
      {children}
    </h2>
  );
}

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'amber' | 'red' | 'indigo';
}

function ProblemCard({ icon, title, description, color }: ProblemCardProps) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    amber: 'bg-amber-100 text-amber-600',
    red: 'bg-red-100 text-red-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className={`w-12 h-12 rounded-full ${colorMap[color]} flex items-center justify-center mb-4`}>
        <div className="w-6 h-6">{icon}</div>
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
        {number}
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

interface BenefitItemProps {
  children: React.ReactNode;
}

function BenefitItem({ children }: BenefitItemProps) {
  return (
    <div className="bg-blue-50 rounded-lg p-4 text-center">
      <p className="text-gray-700 font-medium">{children}</p>
    </div>
  );
}
