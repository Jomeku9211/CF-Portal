import React from 'react';
import { CheckCircleIcon, ArrowRightIcon } from 'lucide-react';
export function ThankYou() {
  return <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-8">
            <CheckCircleIcon size={40} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            🎉 Thank you for reaching out!
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            We've received your details. Our team will connect with you within
            24 hours to discuss how we can help transform your hiring process.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg mb-10">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-primary">Check your inbox</h3>
                <p className="text-gray-600">
                  We've sent a confirmation email with additional information
                  about our podcast and services.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center">
              Listen to Latest Episode
              <ArrowRightIcon className="ml-2" size={20} />
            </a>
            <a href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-8 rounded-lg transition-all duration-300">
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    </section>;
}