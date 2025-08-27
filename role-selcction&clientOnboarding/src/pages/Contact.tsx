import React from 'react';
import { SimpleHeader } from '../components/SimpleHeader';
export function ContactPage() {
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']">
      <SimpleHeader />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
            Contact Us
          </h1>
          <p className="text-lg text-sanjuan-base mb-4">
            This is a placeholder for the Contact page. Content will be added
            here.
          </p>
        </div>
      </main>
    </div>;
}