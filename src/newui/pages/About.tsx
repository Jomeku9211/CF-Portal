import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeftIcon, Users, Star, FileCheck, ListFilter, ClipboardCheck, Briefcase, BarChart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
export function AboutPage() {
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']">
      <Header />
      <main>
        {/* Back to Home Link */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/" className="inline-flex items-center text-sanjuan-base hover:text-sanjuan-dark transition-colors">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
              About Coderfarm: Culture-First Tech Hiring That Truly Works
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-sanjuan-base font-['IBM_Plex_Sans']">
              We are the first culture-driven hiring platform, helping founders,
              HR teams, and developers escape the broken resume-driven system
              and build teams that truly belong together.
            </p>
          </div>
        </section>
        {/* Our Story Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="relative bg-sanjuan-lightest rounded-2xl shadow-lg p-6">
                <img src="https://img.freepik.com/free-vector/startup-life-concept-illustration_114360-1068.jpg" alt="Founders building Coderfarm from experience" className="w-full h-auto rounded-xl" />
                <div className="absolute -top-4 -right-4 bg-sanjuan-lighter rounded-full p-4 shadow-md">
                  <Users className="h-8 w-8 text-sanjuan-dark" />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                Our Story: Built from First-Hand Struggle
              </h2>
              <div className="space-y-4 text-lg text-sanjuan-base font-['IBM_Plex_Sans']">
                <p>
                  Coderfarm was founded by Dheeraj and Abhilasha Khandare, after
                  years of battling the same hiring frustrations you face today.
                </p>
                <p>
                  Dheeraj's career spanned 17+ companies and running a staffing
                  agency—where he saw outdated resumes, manual tracking, and
                  shallow assessments slow down hiring and hurt teams. He
                  realized the real pain: finding people who genuinely care
                  about what you're building.
                </p>
                <p>
                  To solve this, the team interviewed 20+ HR leaders and
                  founders and 60+ developers, uncovering the truth: hiring is
                  broken. Companies struggle to find loyal, aligned talent;
                  developers struggle to find workplaces where they belong. That
                  research became Coderfarm—a human-centered, culture-first
                  hiring system.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* The Problem Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-neutral-lightest rounded-2xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                  The Problem We Solve: Ending the Robot-vs-Robot War
                </h2>
                <p className="text-lg text-sanjuan-base mb-6 font-['IBM_Plex_Sans']">
                  Traditional hiring is stuck in an "AI-to-AI war":
                </p>
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="space-y-3 text-lg text-sanjuan-base font-['IBM_Plex_Sans']">
                    <p>ATS filters screen by keywords.</p>
                    <p>Candidates use AI to game resumes.</p>
                    <p>Neither reveals who someone really is.</p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="mb-6">
                  <img src="https://img.freepik.com/free-vector/recruitment-concept-illustration_114360-6766.jpg" alt="Broken hiring system illustration" className="w-full h-auto rounded-xl" />
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
                    The Result?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span className="text-sanjuan-base font-['IBM_Plex_Sans']">
                        Costly mis-hires and high turnover.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span className="text-sanjuan-base font-['IBM_Plex_Sans']">
                        Wasted time and irrelevant applications.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span className="text-sanjuan-base font-['IBM_Plex_Sans']">
                        Poor cultural alignment, low trust, and quick exits.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Our Solution Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
              Our Solution: The Coderfarm Difference
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-sanjuan-base font-['IBM_Plex_Sans']">
              We go beyond resumes with a system built on clarity, confidence,
              and culture-fit:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <div className="bg-sanjuan-lightest rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Users className="h-8 w-8 text-sanjuan-base" />
                </div>
                <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                  Culture-First Matching
                </h3>
              </div>
              <p className="text-sanjuan-base font-['IBM_Plex_Sans']">
                We deeply map your company's DNA—values, culture, work
                style—before shortlisting candidates.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-sanjuan-lightest rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Star className="h-8 w-8 text-tango-base" />
                </div>
                <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                  Reputation Score
                </h3>
              </div>
              <p className="text-sanjuan-base font-['IBM_Plex_Sans']">
                A verified multi-factor profile of behavior, delivery, trust,
                and communication. No buzzwords, just proven reliability.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-sanjuan-lightest rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <FileCheck className="h-8 w-8 text-sanjuan-dark" />
                </div>
                <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                  Job Persona Builder
                </h3>
              </div>
              <p className="text-sanjuan-base font-['IBM_Plex_Sans']">
                Define outcomes, technical must-haves, and contextual soft
                skills with clarity from day one.
              </p>
            </div>
            {/* Feature Card 4 */}
            <div className="bg-sanjuan-lightest rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <ListFilter className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                  Curated Top Matches
                </h3>
              </div>
              <p className="text-sanjuan-base font-['IBM_Plex_Sans']">
                Receive your top 3–10 candidates, aligned across domain, skills,
                time zone, salary, and culture.
              </p>
            </div>
            {/* Feature Card 5 */}
            <div className="bg-sanjuan-lightest rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <ClipboardCheck className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                  Structured Hiring & Onboarding
                </h3>
              </div>
              <p className="text-sanjuan-base font-['IBM_Plex_Sans']">
                Scorecards, background checks, feedback loops, and post-hire
                alignment for lasting impact.
              </p>
            </div>
            {/* Feature Card 6 */}
            <div className="bg-sanjuan-lightest rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Briefcase className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                  Flexible Engagement Models
                </h3>
              </div>
              <p className="text-sanjuan-base font-['IBM_Plex_Sans']">
                Contract, freelance, full-time, onsite, remote, or hybrid—your
                choice.
              </p>
            </div>
            {/* Feature Card 7 */}
            <div className="bg-sanjuan-lightest rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <BarChart className="h-8 w-8 text-sanjuan-light" />
                </div>
                <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                  Transparent Process
                </h3>
              </div>
              <p className="text-sanjuan-base font-['IBM_Plex_Sans']">
                Live dashboards, clear fees, and open communication at every
                step.
              </p>
            </div>
          </div>
        </section>
        {/* Vision Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                Our Vision: The New Talent Infrastructure
              </h2>
              <div className="border-l-4 border-sanjuan-base bg-sanjuan-lightest pl-6 py-4 mb-6">
                <p className="text-lg font-medium text-sanjuan-dark font-['IBM_Plex_Sans']">
                  We're building more than a hiring platform—we're creating a
                  trust infrastructure for tech talent.
                </p>
              </div>
              <div className="space-y-4 text-lg text-sanjuan-base font-['IBM_Plex_Sans']">
                <p>
                  Tomorrow, resumes will be obsolete. In their place: verified
                  reputation profiles that measure fit, trust, and alignment.
                </p>
                <p>
                  At Coderfarm, we believe the future of hiring is
                  relationship-driven, not transactional—a world where every
                  hire feels like a win for both companies and talent.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-sanjuan-lightest rounded-2xl shadow-lg p-6">
                <img src="https://img.freepik.com/free-vector/network-concept-illustration_114360-4469.jpg" alt="Future of talent infrastructure" className="w-full h-auto rounded-xl" />
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-sanjuan-lighter to-sanjuan-lightest py-16 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
              Ready to Transform Your Hiring Experience?
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-sanjuan-base mb-8 font-['IBM_Plex_Sans']">
              Join the growing number of companies building culture-first teams
              that thrive together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Book a Free Consultation
              </a>
              <a href="#" className="inline-flex items-center justify-center px-6 py-3 bg-white text-sanjuan-dark font-semibold rounded-lg shadow-sm hover:shadow-md border-2 border-sanjuan-lighter hover:border-sanjuan-light transition-all duration-300">
                Learn How It Works
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
}