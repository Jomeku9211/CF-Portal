import { HeartHandshakeIcon, BarChart4Icon, ClipboardCheckIcon, UsersIcon, CalendarClockIcon, GlobeIcon, LineChartIcon } from 'lucide-react';

export default function About() {
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
    <div className="min-h-screen bg-white">
      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
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
        </div>
      </section>
    </div>
  );
}
