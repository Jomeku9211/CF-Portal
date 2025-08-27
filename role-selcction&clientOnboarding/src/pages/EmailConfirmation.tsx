import React from 'react';
import { SimpleHeader } from '../components/SimpleHeader';
export function EmailConfirmationPage() {
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']">
      <SimpleHeader />
      <main className="py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-sanjuan-dark mb-6 font-['Inter'] text-center">
            Email Confirmation
          </h1>
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-sanjuan-base mb-4">
              This is a placeholder for the Email Confirmation page. Content
              will be added here.
            </p>
          </div>
        </div>
      </main>
    </div>;
}