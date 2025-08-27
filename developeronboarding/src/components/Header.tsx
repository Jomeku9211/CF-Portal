import React from 'react';
export function Header() {
  return <header className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-sanjuan-dark font-['Inter']">
              DevMatch
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-sanjuan-base hover:text-sanjuan-dark font-medium">
              Home
            </a>
            <a href="#" className="text-sanjuan-base hover:text-sanjuan-dark font-medium">
              About
            </a>
            <a href="#" className="text-sanjuan-base hover:text-sanjuan-dark font-medium">
              Jobs
            </a>
            <a href="#" className="text-sanjuan-base hover:text-sanjuan-dark font-medium">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>;
}