import React from 'react';
import { RocketIcon, CheckIcon } from 'lucide-react';
export function ForFounders() {
  return <div className="bg-white p-8 rounded-xl shadow-md relative">
      <div className="absolute -top-4 -right-4 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
        2
      </div>
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-full text-primary mr-3">
          <RocketIcon size={24} />
        </div>
        <h3 className="text-2xl font-bold text-primary">For Founders</h3>
      </div>
      <p className="text-gray-700 mb-6">
        As a founder, you need team members who can adapt to your fast-paced
        environment and share your vision. Our podcast offers:
      </p>
      <ul className="space-y-3 mb-8">
        <li className="flex items-start">
          <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
            <CheckIcon size={16} />
          </div>
          <p className="text-gray-700">
            Strategies to identify candidates with startup DNA
          </p>
        </li>
        <li className="flex items-start">
          <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
            <CheckIcon size={16} />
          </div>
          <p className="text-gray-700">
            How to compete with big tech for top talent
          </p>
        </li>
        <li className="flex items-start">
          <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
            <CheckIcon size={16} />
          </div>
          <p className="text-gray-700">
            Avoiding costly mis-hires that drain your runway
          </p>
        </li>
      </ul>
      <a href="#contact" className="inline-flex items-center text-accent font-medium">
        Learn how we can help
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>;
}