import React, { useState } from 'react';
import { ArrowRightIcon, MicIcon, CheckIcon } from 'lucide-react';

export function ContentHub() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="text-green-600" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            We've received your message and will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-700 py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                New Episodes Weekly
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Find Developers Who Truly Fit Your Culture
            </h1>
            <p className="text-lg md:text-xl mb-10 text-blue-100">
              Hiring is Broken is a no-fluff podcast where we expose what's really
              wrong with tech hiring — and explore what actually works for
              founders and HR leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl text-center inline-flex items-center justify-center">
                Book a Free Call
                <ArrowRightIcon className="ml-2" size={20} />
              </a>
              <a href="#episodes" className="bg-white hover:bg-gray-100 text-blue-700 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl text-center">
                Start Listening
              </a>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="relative">
            <div className="absolute w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-bold" style={{
              top: '-100px',
              right: '100px'
            }}>
              2
            </div>
            <div className="absolute w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-bold" style={{
              top: '50px',
              right: '300px'
            }}>
              3
            </div>
            <div className="absolute w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold" style={{
              top: '-200px',
              right: '250px'
            }}>
              4
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* About Podcast Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <MicIcon className="text-orange-500 mr-3" size={32} />
              <h2 className="text-3xl font-bold text-blue-700">
                About the Podcast
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  <span className="font-semibold text-blue-700">
                    Hiring is Broken
                  </span>{' '}
                  isn't just another recruitment podcast. It's a no-fluff,
                  no-buzzword space where we expose what's really wrong with tech
                  hiring — and explore what actually works.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  Hosted by{' '}
                  <span className="font-semibold text-blue-700">Coderfarm</span>,
                  we bring founders, HR leaders, tech leads, and developers into
                  authentic, engaging, and sometimes hilarious conversations about
                  building teams that actually last.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
                      <CheckIcon size={16} />
                    </div>
                    <p className="text-gray-700">
                      95% Retention rate for culture-fit hires
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
                      <CheckIcon size={16} />
                    </div>
                    <p className="text-gray-700">
                      Weekly episodes with actionable insights
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
                      <CheckIcon size={16} />
                    </div>
                    <p className="text-gray-700">
                      Zero Down Time Guarantee for hiring
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 relative">
                <div className="absolute -top-4 -right-4 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold text-blue-700 mb-4">
                  Why This Matters
                </h3>
                <p className="mb-6">
                  Hire remote talent vetted not just for skills, but for real
                  culture fit, proven reputation, and teamwork—so teams thrive and
                  projects succeed.
                </p>
                <div className="flex items-center">
                  <div className="font-bold text-blue-700 mr-3">4.9/5</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="ml-2 text-gray-600">for Culture fit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episodes Section */}
      <section id="episodes" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Episodes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Dive into our most popular episodes and discover the secrets to building teams that actually work.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Episode 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-blue-600 h-32 flex items-center justify-center">
                  <MicIcon className="text-white" size={48} />
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-medium mb-2">Episode 1</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    The Real Cost of Bad Hires
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We break down the hidden costs of hiring the wrong people and how it affects your entire team.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">45 min</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Listen Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Episode 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-orange-500 h-32 flex items-center justify-center">
                  <MicIcon className="text-white" size={48} />
                </div>
                <div className="p-6">
                  <div className="text-sm text-orange-500 font-medium mb-2">Episode 2</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Culture Fit vs. Skills
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Why technical skills alone aren't enough and how to identify true culture fit.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">52 min</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                      Listen Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Episode 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-green-600 h-32 flex items-center justify-center">
                  <MicIcon className="text-white" size={48} />
                </div>
                <div className="p-6">
                  <div className="text-sm text-green-600 font-medium mb-2">Episode 3</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Remote Team Building
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Strategies for building cohesive remote teams that actually collaborate effectively.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">48 min</span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Listen Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Founders & HR Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* For Founders */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                For Startup Founders
              </h3>
              <p className="text-gray-600 mb-6">
                Learn how to build teams that share your vision and drive your startup's success.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-1" size={16} />
                  <span className="text-gray-700">Avoid costly mis-hires</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-1" size={16} />
                  <span className="text-gray-700">Build lasting team culture</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-1" size={16} />
                  <span className="text-gray-700">Scale with confidence</span>
                </li>
              </ul>
            </div>

            {/* For HR */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                For HR & Talent Leaders
              </h3>
              <p className="text-gray-600 mb-6">
                Discover proven strategies for hiring and retaining top tech talent.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-1" size={16} />
                  <span className="text-gray-700">Reduce time-to-hire</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-1" size={16} />
                  <span className="text-gray-700">Improve retention rates</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="text-green-500 mr-3 mt-1" size={16} />
                  <span className="text-gray-700">Build employer brand</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Listeners Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of founders and HR leaders who've transformed their hiring process.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "This podcast completely changed how we approach hiring. We've reduced our turnover by 80%!"
                </p>
                <div className="font-semibold text-gray-900">Sarah Chen</div>
                <div className="text-sm text-gray-600">CTO, TechStart</div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Finally, a podcast that tells it like it is. No fluff, just real solutions to real problems."
                </p>
                <div className="font-semibold text-gray-900">Mike Rodriguez</div>
                <div className="text-sm text-gray-600">HR Director, ScaleUp</div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The insights from this podcast helped us build a team that actually stays together."
                </p>
                <div className="font-semibold text-gray-900">Lisa Thompson</div>
                <div className="text-sm text-gray-600">Founder, DevFlow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions about hiring or want to be a guest on our podcast? We'd love to hear from you.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your hiring challenges or how you'd like to contribute to our podcast..."
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
