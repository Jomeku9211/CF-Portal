import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, MailIcon, RefreshCwIcon } from 'lucide-react';
export function EmailConfirmationPage() {
  const handleResendEmail = () => {
    console.log('Resending confirmation email');
    // Add resend logic here
  };
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-sanjuan-lightest mb-4">
                <MailIcon className="h-8 w-8 text-sanjuan-base" />
              </div>
              <h1 className="text-3xl font-bold text-sanjuan-dark mb-2 font-['Inter']">
                Check Your Email
              </h1>
              <p className="text-sanjuan-base">
                We've sent a confirmation link to your email address. Please
                check your inbox and click the link to activate your account.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="space-y-6">
                <div className="bg-sanjuan-lightest rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-5 w-5 text-sanjuan-base" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-sanjuan-dark">
                        What to expect next
                      </h3>
                      <div className="mt-2 text-sm text-sanjuan-base">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Click the confirmation link in your email</li>
                          <li>You'll be redirected back to our site</li>
                          <li>Your account will be activated</li>
                          <li>You can then log in with your credentials</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-sanjuan-base mb-4">
                    Didn't receive the email? Check your spam folder or click
                    below to resend.
                  </p>
                  <button onClick={handleResendEmail} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-sanjuan-base to-sanjuan-dark hover:from-sanjuan-dark hover:to-sanjuan-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sanjuan-base">
                    <RefreshCwIcon className="h-4 w-4 mr-2" />
                    Resend Confirmation Email
                  </button>
                </div>
                <div className="text-center mt-4">
                  <p className="text-sm text-sanjuan-base">
                    Return to{' '}
                    <Link to="/login" className="font-medium text-tango-base hover:text-tango-dark">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
}