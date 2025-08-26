import React, { useState } from 'react';
import { ClockIcon, UsersIcon, CodeIcon, PieChartIcon, AlertCircleIcon, DollarSignIcon, ZapIcon, BriefcaseIcon, TrendingUpIcon, CheckCircleIcon, SearchIcon, BarChartIcon, UserIcon, HeartIcon } from 'lucide-react';
import { Tabs } from './Tabs';
type TabType = 'founders' | 'teamLeads' | 'developers' | 'agencies' | 'hr';
export const WhoWeHelpSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>('founders');
  const tabContent = {
    founders: {
      title: "Hiring shouldn't feel like gambling with your startup's future.",
      description: "As a founder, every hire is mission-critical. The wrong developer doesn't just cost salary—it slows down your roadmap, drains your runway, and distracts you from growth.",
      problems: ['Endless trial-and-error hires.', 'Culture mismatches that disrupt your small tight-knit team.', 'Burnout from managing recruitment when you should be focused on building.'],
      challenges: [{
        icon: <ClockIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Time Drain',
        description: 'Hours spent reviewing similar resumes and conducting interviews'
      }, {
        icon: <AlertCircleIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Culture Mismatch',
        description: 'Finding developers who align with your vision and work style'
      }, {
        icon: <ZapIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Focus Loss',
        description: 'Distractions from core product and growth priorities'
      }],
      solution: "We help founders hire developers who fit your domain, culture, and ways of working—so they're productive from day one.",
      steps: [{
        number: '01',
        title: 'Job Persona Builder',
        description: 'Turn vague job descriptions into crystal-clear hiring blueprints.'
      }, {
        number: '02',
        title: 'Top 10 Best-Fit Matches',
        description: 'See only pre-vetted, culture-aligned candidates.'
      }, {
        number: '03',
        title: 'Reputation Score',
        description: 'Hire with confidence using data on reliability, collaboration, and behavior.'
      }, {
        number: '04',
        title: 'Onboarding Support',
        description: 'Smooth goal-setting and expectation alignment for faster ramp-up.'
      }],
      benefits: ['Save months of wasted runway on bad hires', 'Build a team that grows with your vision', 'Focus on scaling, not firefighting recruitment'],
      image: "/Screenshot_from_2025-08-25_20-36-17.png"
    },
    teamLeads: {
      title: "Build teams that deliver consistently, not just when you're watching.",
      description: 'As a tech lead, you need developers who can work independently, collaborate effectively, and maintain quality standards. The wrong hire means more code reviews, slower delivery, and team friction.',
      problems: ['Developers who need constant supervision.', 'Skill gaps that slow down the entire team.', 'Communication breakdowns during critical phases.'],
      challenges: [{
        icon: <UsersIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Team Friction',
        description: 'Personality clashes and communication issues'
      }, {
        icon: <CodeIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Skill Gaps',
        description: "Developers who can't contribute to complex projects"
      }, {
        icon: <ClockIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Delivery Delays',
        description: 'Projects blocked by inexperienced team members'
      }],
      solution: "We help you find developers who can hit the ground running, collaborate effectively, and maintain your team's high standards.",
      steps: [{
        number: '01',
        title: 'Technical Assessment',
        description: 'Verify skills through practical coding challenges.'
      }, {
        number: '02',
        title: 'Team Compatibility',
        description: "Match developers with your team's communication style."
      }, {
        number: '03',
        title: 'Work Style Alignment',
        description: 'Find developers who thrive in your development process.'
      }, {
        number: '04',
        title: 'Quality Assurance',
        description: 'Ensure candidates meet your code quality standards.'
      }],
      benefits: ['Reduce time spent on code reviews and mentoring', 'Maintain consistent delivery timelines', 'Build a cohesive, high-performing team'],
      image: "/Screenshot_from_2025-08-25_20-36-37.png"
    },
    developers: {
      title: 'Find opportunities where you can grow, contribute, and belong.',
      description: 'As a developer, you want to work on meaningful projects with teams that value your skills and support your growth. Traditional hiring often misses what matters most: culture fit and long-term potential.',
      problems: ["Interviews that don't showcase your real abilities.", 'Companies that only care about technical skills.', 'Short-term gigs instead of meaningful long-term roles.'],
      challenges: [{
        icon: <BriefcaseIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Misrepresentation',
        description: "Companies that don't match their job descriptions"
      }, {
        icon: <TrendingUpIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Short-term Focus',
        description: "Roles that don't offer growth opportunities"
      }, {
        icon: <UsersIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Culture Mismatch',
        description: "Teams where you don't feel you belong"
      }],
      solution: 'We help you find companies that value your skills, support your growth, and offer opportunities where you can truly thrive.',
      steps: [{
        number: '01',
        title: 'Profile Creation',
        description: 'Build a comprehensive profile showcasing your skills and values.'
      }, {
        number: '02',
        title: 'Culture Matching',
        description: 'Connect with companies that align with your work style.'
      }, {
        number: '03',
        title: 'Skill Validation',
        description: 'Demonstrate your abilities through practical assessments.'
      }, {
        number: '04',
        title: 'Long-term Focus',
        description: 'Find opportunities for growth and career development.'
      }],
      benefits: ['Work with teams that value your contributions', 'Find opportunities for long-term growth', 'Build meaningful, lasting relationships'],
      image: "/Screenshot_from_2025-08-25_20-36-42.png"
    },
    agencies: {
      title: 'Place top tech talent faster and build lasting client relationships.',
      description: 'As an agency, you need to quickly identify and place qualified developers while maintaining high client satisfaction. Traditional recruitment methods are slow and often result in poor matches.',
      problems: ['Slow candidate sourcing and screening.', 'Poor matches that damage client relationships.', 'High costs from repeated recruitment efforts.'],
      challenges: [{
        icon: <ClockIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Slow Process',
        description: 'Weeks spent finding and screening candidates'
      }, {
        icon: <AlertCircleIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Poor Matches',
        description: "Candidates who don't fit client needs"
      }, {
        icon: <DollarSignIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'High Costs',
        description: 'Expensive recruitment cycles and replacements'
      }],
      solution: 'We help agencies quickly identify and place qualified developers, reducing time-to-hire and improving client satisfaction.',
      steps: [{
        number: '01',
        title: 'Quick Matching',
        description: 'Access pre-verified candidates within hours.'
      }, {
        number: '02',
        title: 'Quality Assurance',
        description: 'Ensure candidates meet high standards.'
      }, {
        number: '03',
        title: 'Client Alignment',
        description: 'Match candidates with specific client needs.'
      }, {
        number: '04',
        title: 'Ongoing Support',
        description: 'Provide support throughout the placement process.'
      }],
      benefits: ['Reduce time-to-hire by 70%', 'Improve client satisfaction and retention', 'Lower recruitment costs and overhead'],
      image: "/Screenshot_from_2025-08-25_20-36-29.png"
    },
    hr: {
      title: 'Hire faster, smarter, and with confidence—without the costly mis-hires.',
      description: "As an HR Manager or Talent Acquisition Specialist in a growing tech company, you're constantly juggling sourcing, screening, interviews, and leadership pressure. You're measured on speed and retention, but you're often bogged down by an overwhelming volume of irrelevant resumes and costly mis-hires that disrupt morale and productivity.",
      problems: ['Endless irrelevant applications that waste time', 'Costly mis-hires that erode team morale and productivity', 'Keyword-driven screening that misses true cultural fit', 'Leadership pressure to reduce attrition and time-to-hire', 'Bottlenecks chasing tech teams for feedback', 'Employer brand failing to resonate with mission-driven talent'],
      challenges: [{
        icon: <SearchIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Resume Overload',
        description: 'Drowning in applications with little meaningful insight'
      }, {
        icon: <BarChartIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Metrics Pressure',
        description: 'Constant demand to reduce time-to-hire and increase retention'
      }, {
        icon: <UserIcon className="h-6 w-6 text-sanjuan-light" />,
        title: 'Cultural Mismatch',
        description: 'Traditional hiring misses personality and team alignment'
      }],
      solution: 'Coderfarm transforms hiring into a relationship-driven, culture-first experience—helping you deliver hires who "click" from day one while reducing time-to-hire and attrition.',
      steps: [{
        number: '01',
        title: 'Job Persona Builder',
        description: 'Define outcomes, must-have skills, and contextual soft skills, aligning all stakeholders upfront.'
      }, {
        number: '02',
        title: 'Reputation Score',
        description: 'A "CIBIL-style" dynamic score that verifies trust, delivery, and collaboration history.'
      }, {
        number: '03',
        title: 'Curated Top 10 Matches',
        description: 'Get 10 pre-vetted, best-fit candidates aligned to your skills, domain, time zone, and culture.'
      }, {
        number: '04',
        title: 'Structured Evaluation',
        description: 'Objective scorecards, ID verification, and structured feedback loops ensure consistency.'
      }, {
        number: '05',
        title: 'Post-Hire Alignment',
        description: 'Support with goal-setting and expectation alignment ensures smooth onboarding.'
      }],
      benefits: ['Reduce time-to-hire with curated matches', 'End costly mis-hires with culture-first alignment', 'Build stronger employer branding that resonates', 'Gain leadership trust with data-backed hiring outcomes', 'Focus on strategy, not resume firefighting', 'Create high-performing teams that last'],
      image: "/Screenshot_from_2025-08-26_10-56-07.png"
    }
  };
  const content = tabContent[activeTab];
  // Define tabs for the Tabs component
  const tabs = [{
    id: 'founders',
    label: 'Founders'
  }, {
    id: 'teamLeads',
    label: 'Team Leads'
  }, {
    id: 'developers',
    label: 'Developers'
  }, {
    id: 'agencies',
    label: 'Agencies'
  }, {
    id: 'hr',
    label: '👩‍💼 HR & Talent'
  }];
  return <section className="w-full bg-gradient-to-b from-sanjuan-lightest to-white py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sanjuan-dark mb-4 font-['Inter']">
            Who We Help
          </h2>
          <p className="text-xl text-sanjuan-base max-w-3xl mx-auto font-['IBM_Plex_Sans']">
            We match the right people with the right opportunities based on
            skills, culture, and purpose alignment.
          </p>
        </div>
        {/* Tabs - Using Design System Tabs component */}
        <div className="flex justify-center mb-12">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={tabId => setActiveTab(tabId as TabType)} className="bg-white shadow-md rounded-xl" />
        </div>
        {/* Content - Modern Style */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column - Hero Image */}
              <div className="h-80 lg:h-auto">
                <img src={content.image} alt="Team collaboration" className="w-full h-full object-cover" />
              </div>
              {/* Right Column - Main Content */}
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-sanjuan-dark mb-4 font-['Inter'] leading-tight">
                  {content.title}
                </h3>
                <p className="text-sanjuan-base mb-8 font-['IBM_Plex_Sans'] leading-relaxed">
                  {content.description}
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-tango-lighter flex items-center justify-center">
                    <AlertCircleIcon className="h-5 w-5 text-tango-base" />
                  </div>
                  <h4 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                    The Challenge
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {content.challenges.map((challenge, index) => <div key={index} className="bg-sanjuan-lightest rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-3">
                          {challenge.icon}
                        </div>
                        <h5 className="font-semibold text-sanjuan-dark font-['Inter']">
                          {challenge.title}
                        </h5>
                      </div>
                      <p className="text-sanjuan-base text-sm font-['IBM_Plex_Sans']">
                        {challenge.description}
                      </p>
                    </div>)}
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-sanjuan-lighter flex items-center justify-center">
                    <HeartIcon className="h-5 w-5 text-sanjuan-base" />
                  </div>
                  <h4 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                    The Solution
                  </h4>
                </div>
                <p className="text-sanjuan-base mb-6 font-['IBM_Plex_Sans'] leading-relaxed">
                  {content.solution}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-sanjuan-lightest to-white p-8 lg:p-12">
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-sanjuan-dark mb-6 font-['Inter'] flex items-center">
                  <span className="mr-2">🚀</span> How It Works
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {content.steps.map((step, index) => <div key={index} className="bg-white rounded-lg p-5 shadow-sm transition-all duration-300 hover:shadow-md">
                      <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center mr-3 bg-tango-lighter text-tango-dark font-semibold">
                          {step.number}
                        </div>
                        <h6 className="font-semibold text-sanjuan-dark font-['Inter']">
                          {step.title}
                        </h6>
                      </div>
                      <p className="text-sanjuan-base text-sm font-['IBM_Plex_Sans']">
                        {step.description}
                      </p>
                    </div>)}
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-sanjuan-dark mb-6 font-['Inter'] flex items-center">
                  <span className="mr-2">✨</span> Benefits for You
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.benefits.map((benefit, index) => <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <CheckCircleIcon className="h-5 w-5 mr-3 text-tango-base flex-shrink-0" />
                      <p className="text-sanjuan-dark font-medium font-['IBM_Plex_Sans']">
                        {benefit}
                      </p>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};