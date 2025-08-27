import React from 'react';
import { Link } from 'react-router-dom';
import { SimpleHeader } from '../components/SimpleHeader';
export function NotFoundPage() {
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']">
      <SimpleHeader />
      <main className="py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
            Page Not Found
          </h2>
          <p className="text-lg text-sanjuan-base mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="inline-block px-6 py-3 bg-tango-base text-white font-semibold rounded-lg hover:bg-tango-dark transition-colors">
            Go Home
          </Link>
        </div>
      </main>
    </div>;
}