import { BuildingIcon, HeartHandshakeIcon, BarChart4Icon, ClipboardCheckIcon, UsersIcon, CalendarClockIcon, GlobeIcon, LineChartIcon, ArrowLeftIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { TopBanner } from './LandingPage/TopBanner';
import { Navbar } from './LandingPage/Navbar';

export function AboutUsSection() {
  const location = useLocation();
  const isStandalonePage = location.pathname === '/about';
  
  const solutionData = [
    {
      icon: <HeartHandshakeIcon className="h-8 w-8 text-blue-700" />,
      title: 'Culture-First Matching',
      description: "We deeply map your company's DNA—values, culture, work style—before shortlisting candidates."
    },
    {
      icon: <BarChart4Icon className="h-8 w-8 text-orange-500" />,
      title: 'Reputation Score',
      description: 'A verified multi-factor profile of behavior, delivery, trust, and communication. No buzzwords, just proven reliability.'
    },
    {
      icon: <ClipboardCheckIcon className="h-8 w-8 text-blue-900" />,
      title: 'Job Persona Builder',
      description: 'Define outcomes, technical must-haves, and contextual soft skills with clarity from day one.'
    },
    {
      icon: <UsersIcon className="h-8 w-8 text-green-600" />,
      title: 'Curated Top Matches',
      description: 'Receive your top 3–10 candidates, aligned across domain, skills, time zone, salary, and culture.'
    },
    {
      icon: <LineChartIcon className="h-8 w-8 text-purple-600" />,
      title: 'Structured Hiring & Onboarding',
      description: 'Scorecards, background checks, feedback loops, and post-hire alignment for lasting impact.'
    },
    {
      icon: <CalendarClockIcon className="h-8 w-8 text-red-600" />,
      title: 'Flexible Engagement Models',
      description: 'Contract, freelance, full-time, onsite, remote, or hybrid—your choice.'
    },
    {
      icon: <GlobeIcon className="h-8 w-8 text-blue-500" />,
      title: 'Transparent Process',
      description: 'Live dashboards, clear fees, and open communication at every step.'
    }
  ];

  return (
    <div className="w-full bg-white font-sans">
      {/* Header Section */}
      <TopBanner />
      <Navbar />
      
      <section id="about" className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Back Button for Standalone Page */}
          {isStandalonePage && (
            <div className="mb-8">
              <a href="/" className="inline-flex items-center text-blue-700 hover:text-blue-900 transition-colors">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Home
              </a>
            </div>
          )}
          
          {/* Headline Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Coderfarm: Culture-First Tech Hiring That Truly Works
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              We are the first culture-driven hiring platform, helping founders,
              HR teams, and developers escape the broken resume-driven system and
              build teams that truly belong together.
            </p>
          </div>
          
          {/* Our Story Block */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
            <div className="w-full md:w-2/5">
              <div className="relative bg-blue-50 rounded-2xl p-6 shadow-lg">
                <img src="https://img.freepik.com/free-vector/startup-life-concept-illustration_114360-1068.jpg" alt="Founders building Coderfarm from experience" className="w-full h-auto rounded-xl" />
                <div className="absolute -top-4 -right-4 bg-blue-100 rounded-full p-4 shadow-md">
                  <BuildingIcon className="text-blue-700 h-8 w-8" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/5">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Story: Built from First-Hand Struggle
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                Coderfarm was founded by Dheeraj and Abhilasha Khandare, after
                years of battling the same hiring frustrations you face today.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Dheeraj's career spanned 17+ companies and running a staffing
                agency—where he saw outdated resumes, manual tracking, and shallow
                assessments slow down hiring and hurt teams. He realized the real
                pain: finding people who genuinely care about what you're
                building.
              </p>
              <p className="text-lg text-gray-700">
                To solve this, the team interviewed 20+ HR leaders and founders
                and 60+ developers, uncovering the truth: hiring is broken.
                Companies struggle to find loyal, aligned talent; developers
                struggle to find workplaces where they belong. That research
                became Coderfarm—a human-centered, culture-first hiring system.
              </p>
            </div>
          </div>
          
          {/* Problem We Solve Block */}
          <div className="flex flex-col md:flex-row gap-12 mb-20 bg-gray-50 rounded-2xl p-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                The Problem We Solve: Ending the Robot-vs-Robot War
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Traditional hiring is stuck in an "AI-to-AI war":
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                <p className="text-lg text-gray-700 mb-2">
                  ATS filters screen by keywords.
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  Candidates use AI to game resumes.
                </p>
                <p className="text-lg text-gray-700">
                  Neither reveals who someone really is.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <img src="https://img.freepik.com/free-vector/recruitment-concept-illustration_114360-6766.jpg" alt="Broken hiring system illustration" className="w-full h-auto rounded-xl" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  The Result?
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span className="text-gray-700">
                      Costly mis-hires and high turnover.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span className="text-gray-700">
                      Wasted time and irrelevant applications.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span className="text-gray-700">
                      Poor cultural alignment, low trust, and quick exits.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Our Solution / Difference Block */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Solution: The Coderfarm Difference
              </h3>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                We go beyond resumes with a system built on clarity, confidence,
                and culture-fit:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutionData.map((item, index) => (
                <div key={index} className="bg-blue-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="mr-3">{item.icon}</div>
                    <h4 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Vision Block */}
          <div>
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="w-full md:w-2/5">
                <div className="relative bg-blue-50 rounded-2xl p-6 shadow-lg">
                  <img src="https://img.freepik.com/free-vector/network-concept-illustration_114360-4469.jpg" alt="Future of talent infrastructure" className="w-full h-auto rounded-xl" />
                </div>
              </div>
              <div className="w-full md:w-3/5">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Our Vision: The New Talent Infrastructure
                </h3>
                <div className="bg-blue-50 border-l-4 border-blue-700 pl-4 py-2 mb-6">
                  <p className="text-lg font-medium text-gray-900">
                    We're building more than a hiring platform—we're creating a
                    trust infrastructure for tech talent.
                  </p>
                </div>
                <p className="text-lg text-gray-700 mb-4">
                  Tomorrow, resumes will be obsolete. In their place: verified
                  reputation profiles that measure fit, trust, and alignment.
                </p>
                <p className="text-lg text-gray-700">
                  At Coderfarm, we believe the future of hiring is
                  relationship-driven, not transactional—a world where every hire
                  feels like a win for both companies and talent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
