import React from 'react';
import { Link } from 'react-router-dom';
import { SimpleHeader } from '../components/SimpleHeader';
export function LoginPage() {
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']">
      <SimpleHeader />
      <main className="py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter'] text-center">
            Login
          </h1>
          <div className="bg-white rounded-xl shadow-md p-8">
            <p className="text-center text-sanjuan-base mb-8">
              This is a placeholder for the Login page. Form will be added here.
            </p>
            <div className="text-center">
              <Link to="/forgot-password" className="text-tango-base hover:text-tango-dark">
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>;
}