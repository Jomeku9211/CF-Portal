import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Users, Calendar, Bell, CheckCircle, User, Briefcase, Code, Share2, Globe, HeartHandshake, ArrowRight, Play } from 'lucide-react';
export function PodcastPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    support: '',
    newsletter: false
  });
  const handleChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Thank you for applying! Creating your account...');
    // Redirect to sign up page or login page
  };
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-sanjuan-lightest to-sanjuan-lighter py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="lg:w-1/2 space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-white text-sanjuan-dark rounded-full mb-4 font-medium text-sm">
                  <Mic className="h-4 w-4 mr-2 text-tango-base" />
                  Weekly podcast by Coderfarm
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-sanjuan-dark mb-4 font-['Inter']">
                  🎙️ Hiring is Broken – Podcast
                </h1>
                <p className="text-xl text-sanjuan-base mb-6">
                  Raw, unfiltered conversations about what's wrong with hiring
                  today and how to build better teams.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#apply" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Apply to Be a Guest
                  </a>
                  <a href="#signup" className="inline-flex items-center justify-center px-6 py-3 bg-white text-sanjuan-dark font-semibold rounded-lg shadow-sm hover:shadow-md border-2 border-sanjuan-lighter hover:border-sanjuan-light transition-all duration-300">
                    Sign Up / Log In
                  </a>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white p-6 rounded-2xl shadow-lg relative">
                  <div className="absolute -top-4 -left-4 bg-tango-base rounded-full p-3 shadow-md">
                    <Mic className="h-6 w-6 text-white" />
                  </div>
                  <img src="https://img.freepik.com/free-vector/podcast-concept-illustration_114360-1724.jpg" alt="Podcast illustration" className="w-full h-auto rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About the Podcast */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                About the Podcast
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-sanjuan-base">
                Hiring is Broken is hosted by Coderfarm — a movement to make
                hiring more human, effective, and fair. Every week, we sit with
                leaders and builders to uncover what's wrong with hiring today
                and explore better ways to build teams.
              </p>
              <p className="max-w-3xl mx-auto text-lg text-sanjuan-base mt-4">
                This isn't corporate fluff. It's raw, unfiltered, and
                actionable.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="bg-sanjuan-lightest rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-white rounded-lg mr-4 shadow-sm">
                    <Briefcase className="h-6 w-6 text-sanjuan-base" />
                  </div>
                  <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                    Startup Founders
                  </h3>
                </div>
                <p className="text-sanjuan-base">
                  Share how you're building teams that fuel innovation and
                  growth in your startup journey.
                </p>
              </div>
              <div className="bg-sanjuan-lightest rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-white rounded-lg mr-4 shadow-sm">
                    <Users className="h-6 w-6 text-sanjuan-base" />
                  </div>
                  <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                    HR Leaders
                  </h3>
                </div>
                <p className="text-sanjuan-base">
                  Showcase your talent strategies beyond metrics and how you're
                  humanizing the hiring process.
                </p>
              </div>
              <div className="bg-sanjuan-lightest rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-white rounded-lg mr-4 shadow-sm">
                    <Code className="h-6 w-6 text-sanjuan-base" />
                  </div>
                  <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                    Tech Leads/CTOs
                  </h3>
                </div>
                <p className="text-sanjuan-base">
                  Reveal your blueprint for high-performing engineering teams
                  and effective technical assessment.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* What to Expect */}
        <section className="py-16 bg-gradient-to-br from-white to-sanjuan-lightest">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                What to Expect as a Guest
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-sanjuan-base">
                Our conversations are designed to reveal your authentic
                perspective
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-sanjuan-lighter flex items-center justify-center mr-4">
                    <span className="text-sanjuan-dark font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                    Introduction
                  </h3>
                </div>
                <p className="text-sanjuan-base">
                  Share your journey in tech and what led you to your current
                  role.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-sanjuan-lighter flex items-center justify-center mr-4">
                    <span className="text-sanjuan-dark font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                    Beyond the Resume
                  </h3>
                </div>
                <p className="text-sanjuan-base">
                  Talk about experiences that shaped your hiring philosophy and
                  approach.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-sanjuan-lighter flex items-center justify-center mr-4">
                    <span className="text-sanjuan-dark font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                    The Core
                  </h3>
                </div>
                <p className="text-sanjuan-base">
                  Deep dive into hiring, leadership, and team building
                  challenges and solutions.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-sanjuan-lighter flex items-center justify-center mr-4">
                    <span className="text-sanjuan-dark font-bold">4</span>
                  </div>
                  <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                    Rapid Fire
                  </h3>
                </div>
                <p className="text-sanjuan-base">
                  Quick, punchy questions that reveal the real you and your
                  authentic thoughts.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-sanjuan-lighter flex items-center justify-center mr-4">
                    <span className="text-sanjuan-dark font-bold">5</span>
                  </div>
                  <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                    Priority Challenge
                  </h3>
                </div>
                <p className="text-sanjuan-base">
                  Guests collaborate to arrange 3–4 hiring statements in order
                  of priority, convincing each other why their order makes the
                  most sense.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-sanjuan-lighter flex items-center justify-center mr-4">
                    <span className="text-sanjuan-dark font-bold">6</span>
                  </div>
                  <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                    The One Big Statement
                  </h3>
                </div>
                <p className="text-sanjuan-base">
                  Each guest shares one powerful hiring belief and tries to
                  persuade others why theirs matters most.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Why Join */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                Why Join Our Podcast
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-sanjuan-base">
                Become part of a movement to make hiring better for everyone
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-sanjuan-lightest rounded-xl p-6 text-center">
                <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Share2 className="h-8 w-8 text-sanjuan-base" />
                </div>
                <h3 className="text-xl font-semibold text-sanjuan-dark mb-3 font-['Inter']">
                  Share Your Story
                </h3>
                <p className="text-sanjuan-base">
                  Share your insights and experiences with a wide audience
                  passionate about better hiring.
                </p>
              </div>
              <div className="bg-sanjuan-lightest rounded-xl p-6 text-center">
                <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Globe className="h-8 w-8 text-sanjuan-base" />
                </div>
                <h3 className="text-xl font-semibold text-sanjuan-dark mb-3 font-['Inter']">
                  Build Your Brand
                </h3>
                <p className="text-sanjuan-base">
                  Enhance your personal brand in the tech and startup community
                  as a thought leader.
                </p>
              </div>
              <div className="bg-sanjuan-lightest rounded-xl p-6 text-center">
                <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <HeartHandshake className="h-8 w-8 text-sanjuan-base" />
                </div>
                <h3 className="text-xl font-semibold text-sanjuan-dark mb-3 font-['Inter']">
                  Make an Impact
                </h3>
                <p className="text-sanjuan-base">
                  Be part of the movement to fix hiring for everyone and create
                  more human-centered processes.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Featured Episodes */}
        <section className="py-16 bg-gradient-to-br from-white to-tango-lightest">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                Featured Episodes
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-sanjuan-base">
                Listen to our most impactful conversations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative">
                  <img src="https://img.freepik.com/free-vector/webinar-concept-illustration_114360-4764.jpg" alt="Why Traditional Interviews Fail" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg font-['Inter']">
                        Why Traditional Interviews Fail
                      </h3>
                      <p className="text-white/80 text-sm">
                        Sarah Chen, CTO of TechFlow
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                    <Play className="h-5 w-5 text-tango-base" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sanjuan-base line-clamp-3">
                    Sarah explains why traditional interviews often fail to
                    identify the best candidates and what to do instead.
                  </p>
                  <a href="#" className="text-tango-base font-medium flex items-center mt-4 hover:text-tango-dark transition-colors">
                    Listen to episode <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative">
                  <img src="https://img.freepik.com/free-vector/team-leader-concept-illustration_114360-5176.jpg" alt="Building Teams That Last" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg font-['Inter']">
                        Building Teams That Last
                      </h3>
                      <p className="text-white/80 text-sm">
                        Mark Johnson, Founder of DevTeams
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                    <Play className="h-5 w-5 text-tango-base" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sanjuan-base line-clamp-3">
                    Mark shares his insights on building resilient teams that
                    stick together through challenges and growth.
                  </p>
                  <a href="#" className="text-tango-base font-medium flex items-center mt-4 hover:text-tango-dark transition-colors">
                    Listen to episode <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative">
                  <img src="https://img.freepik.com/free-vector/technical-support-concept-illustration_114360-2803.jpg" alt="The Future of Technical Assessment" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg font-['Inter']">
                        The Future of Technical Assessment
                      </h3>
                      <p className="text-white/80 text-sm">Dr. Lisa Wong</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                    <Play className="h-5 w-5 text-tango-base" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sanjuan-base line-clamp-3">
                    Dr. Wong explores how technical assessments are evolving and
                    what makes them truly effective.
                  </p>
                  <a href="#" className="text-tango-base font-medium flex items-center mt-4 hover:text-tango-dark transition-colors">
                    Listen to episode <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <a href="#" className="inline-flex items-center justify-center px-6 py-3 bg-white text-sanjuan-dark font-semibold rounded-lg shadow-sm hover:shadow-md border-2 border-sanjuan-lighter hover:border-sanjuan-light transition-all duration-300">
                Listen to All Episodes <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
        {/* Book Your Slot */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                Book Your Podcast Slot
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-sanjuan-base">
                We've made it easier than ever to join. Once you sign up and log
                in, you'll be able to:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-sanjuan-lightest rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-white rounded-lg mr-4 shadow-sm">
                    <Calendar className="h-6 w-6 text-sanjuan-base" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                      Choose a Recording Slot
                    </h3>
                    <p className="text-sanjuan-base mt-2">
                      Select from 2–3 available weekly slots that fit your
                      schedule.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-sanjuan-lightest rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-white rounded-lg mr-4 shadow-sm">
                    <Users className="h-6 w-6 text-sanjuan-base" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                      See Who's Joining
                    </h3>
                    <p className="text-sanjuan-base mt-2">
                      Check out other confirmed guests for that slot and their
                      backgrounds.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-sanjuan-lightest rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-white rounded-lg mr-4 shadow-sm">
                    <HeartHandshake className="h-6 w-6 text-sanjuan-base" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                      Collaborate Ahead
                    </h3>
                    <p className="text-sanjuan-base mt-2">
                      Connect, share thoughts, and prep for the conversation
                      with other guests.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-sanjuan-lightest rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-white rounded-lg mr-4 shadow-sm">
                    <Bell className="h-6 w-6 text-sanjuan-base" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                      Get Reminders
                    </h3>
                    <p className="text-sanjuan-base mt-2">
                      Receive automatic reminders and updates before your
                      episode recording.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <a href="#signup" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Sign Up / Log In to Book Your Slot
              </a>
            </div>
          </div>
        </section>
        {/* Application Form */}
        <section id="apply" className="py-16 bg-gradient-to-br from-white to-sanjuan-lightest">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                Ready to Share Your Story?
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-sanjuan-base">
                Fill out the form and let's get started
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sanjuan-dark font-medium mb-2">
                      First Name *
                    </label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light transition-all" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sanjuan-dark font-medium mb-2">
                      Last Name *
                    </label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light transition-all" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sanjuan-dark font-medium mb-2">
                    Email *
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light transition-all" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sanjuan-dark font-medium mb-2">
                    Phone No. (optional)
                  </label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light transition-all" />
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sanjuan-dark font-medium mb-2">
                    LinkedIn URL (optional)
                  </label>
                  <input type="url" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light transition-all" />
                </div>
                <div>
                  <label htmlFor="support" className="block text-sanjuan-dark font-medium mb-2">
                    "What can I (Dheeraj / Coderfarm) do for you in return?"
                    (Tell me how I can support you back.)
                  </label>
                  <textarea id="support" name="support" value={formData.support} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light transition-all"></textarea>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="h-4 w-4 text-sanjuan-base focus:ring-sanjuan-light border-sanjuan-lighter rounded" />
                  </div>
                  <label htmlFor="newsletter" className="ml-3 text-sanjuan-base">
                    Subscribe to podcast updates & newsletter
                  </label>
                </div>
                <div>
                  <button type="submit" className="w-full inline-flex justify-center items-center px-6 py-3 bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Apply to Be a Guest
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        {/* Member Access */}
        <section id="signup" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                Member Access
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-sanjuan-base">
                Already applied? Create an account to manage your podcast
                journey
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
              <div className="md:w-1/2 bg-sanjuan-lightest rounded-xl p-8">
                <h3 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                  Sign Up / Log In
                </h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="loginEmail" className="block text-sanjuan-dark font-medium mb-2">
                      Email
                    </label>
                    <input type="email" id="loginEmail" className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light transition-all" />
                  </div>
                  <div>
                    <label htmlFor="loginPassword" className="block text-sanjuan-dark font-medium mb-2">
                      Password
                    </label>
                    <input type="password" id="loginPassword" className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light transition-all" />
                  </div>
                  <div className="pt-2">
                    <button type="button" className="w-full inline-flex justify-center items-center px-6 py-3 bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      Sign In
                    </button>
                  </div>
                  <div className="text-center">
                    <a href="#" className="text-sanjuan-base hover:text-sanjuan-dark transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white border border-sanjuan-lighter rounded-xl p-8 h-full">
                  <h3 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                    Member Benefits
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-tango-base mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sanjuan-base">
                        Book and manage your recording slot
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-tango-base mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sanjuan-base">
                        See who else is joining your session
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-tango-base mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sanjuan-base">
                        Get reminders and updates before your episode
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-tango-base mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sanjuan-base">
                        Access preparation materials and guidelines
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-tango-base mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sanjuan-base">
                        Connect with other podcast guests
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Final Note */}
        <section className="py-10 bg-sanjuan-lightest">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
              Final Note
            </h3>
            <p className="text-sanjuan-base max-w-3xl mx-auto">
              By applying, you agree to our Terms & Conditions. We look forward
              to having you on the podcast and sharing your insights with our
              audience.
            </p>
          </div>
        </section>
      </main>
    </div>;
}