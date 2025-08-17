import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
export function ContactForm({
  onSubmit
}) {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };
  return <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              Get Started
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Ready to Transform Your Hiring Process?
            </h2>
            <p className="text-lg text-gray-700">
              Book a free call with our team or subscribe to get the latest
              episodes
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="name" required className="form-input" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" id="email" required className="form-input" placeholder="your.email@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input type="text" id="company" required className="form-input" placeholder="Your company name" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  How can we help? <span className="text-red-500">*</span>
                </label>
                <textarea id="message" rows={4} required className="form-input" placeholder="Tell us about your hiring challenges..."></textarea>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="subscribe" className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" />
                <label htmlFor="subscribe" className="ml-2 text-sm text-gray-700">
                  Subscribe to receive new episodes and hiring insights
                </label>
              </div>
              <div>
                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                  Book a Free Call
                  <ArrowRightIcon className="ml-2" size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>;
}