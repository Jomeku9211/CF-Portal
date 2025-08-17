import React from 'react';
import { UserIcon, CheckIcon } from 'lucide-react';
export function ForHR() {
  return <div className="bg-white p-8 rounded-xl shadow-md relative">
      <div className="absolute -top-4 -right-4 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
        3
      </div>
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-full text-primary mr-3">
          <UserIcon size={24} />
        </div>
        <h3 className="text-2xl font-bold text-primary">For HR Leaders</h3>
      </div>
      <p className="text-gray-700 mb-6">
        HR professionals at mid-sized companies face unique challenges balancing
        growth with culture. Our podcast provides:
      </p>
      <ul className="space-y-3 mb-8">
        <li className="flex items-start">
          <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
            <CheckIcon size={16} />
          </div>
          <p className="text-gray-700">
            Better interviewing techniques for technical roles
          </p>
        </li>
        <li className="flex items-start">
          <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
            <CheckIcon size={16} />
          </div>
          <p className="text-gray-700">
            Building scalable hiring processes that preserve culture
          </p>
        </li>
        <li className="flex items-start">
          <div className="bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1">
            <CheckIcon size={16} />
          </div>
          <p className="text-gray-700">
            Reducing time-to-hire without sacrificing quality
          </p>
        </li>
      </ul>
      <a href="#contact" className="inline-flex items-center text-accent font-medium">
        Book a consultation
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>;
}