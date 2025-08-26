import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
export function NotFoundPage() {
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-sanjuan-dark mb-4 font-['Inter']">
              404
            </h1>
            <h2 className="text-3xl font-semibold text-sanjuan-dark mb-6 font-['Inter']">
              Page Not Found
            </h2>
            <p className="text-xl text-sanjuan-base max-w-2xl mx-auto mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="space-y-4">
              <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-sanjuan-base to-sanjuan-dark hover:from-sanjuan-dark hover:to-sanjuan-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sanjuan-base">
                <HomeIcon className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="pt-4">
                <Link to="/contact" className="text-tango-base hover:text-tango-dark font-medium">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg" alt="404 Illustration" className="max-w-md w-full" />
          </div>
        </div>
      </main>
    </div>;
}