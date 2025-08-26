import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { MailIcon, ArrowLeftIcon } from 'lucide-react';
export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Reset password for:', email);
    // Add password reset logic here
    setSubmitted(true);
  };
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-sanjuan-dark mb-2 font-['Inter']">
                Forgot Your Password?
              </h1>
              <p className="text-sanjuan-base">
                No worries, we'll send you reset instructions.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              {!submitted ? <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sanjuan-dark font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MailIcon className="h-5 w-5 text-sanjuan-base" />
                        </div>
                        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="your@email.com" required />
                      </div>
                    </div>
                    <div>
                      <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-sanjuan-base to-sanjuan-dark hover:from-sanjuan-dark hover:to-sanjuan-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sanjuan-base">
                        Reset Password
                      </button>
                    </div>
                    <div className="text-center mt-4">
                      <Link to="/login" className="inline-flex items-center text-sm font-medium text-tango-base hover:text-tango-dark">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Login
                      </Link>
                    </div>
                  </div>
                </form> : <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-sanjuan-lightest mb-4">
                    <MailIcon className="h-8 w-8 text-sanjuan-base" />
                  </div>
                  <h2 className="text-xl font-semibold text-sanjuan-dark mb-2">
                    Check Your Email
                  </h2>
                  <p className="text-sanjuan-base mb-6">
                    We've sent password reset instructions to:
                    <br />
                    <span className="font-medium">{email}</span>
                  </p>
                  <div className="space-y-4">
                    <button onClick={() => setSubmitted(false)} className="w-full flex justify-center py-3 px-4 border border-sanjuan-lighter rounded-lg shadow-sm text-sanjuan-dark bg-white hover:bg-sanjuan-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sanjuan-light">
                      Didn't receive the email? Try again
                    </button>
                    <Link to="/login" className="inline-flex items-center text-sm font-medium text-tango-base hover:text-tango-dark">
                      <ArrowLeftIcon className="h-4 w-4 mr-1" />
                      Back to Login
                    </Link>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}