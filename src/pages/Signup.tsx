import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log({
      name,
      email,
      password,
      agreeTerms
    });
    // Add signup logic here
    // Redirect to podcast dashboard after signup
    navigate('/podcast/dashboard');
  };
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']" data-testid="SignupId">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-sanjuan-dark mb-2 font-['Inter']">
                Create an Account
              </h1>
              <p className="text-sanjuan-base">
                Join CoderFarm to access exclusive features
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sanjuan-dark font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-sanjuan-base" />
                      </div>
                      <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="John Doe" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sanjuan-dark font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon className="h-5 w-5 text-sanjuan-base" />
                      </div>
                      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sanjuan-dark font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-sanjuan-base" />
                      </div>
                      <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="block w-full pl-10 pr-10 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="••••••••" required />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sanjuan-base hover:text-sanjuan-dark">
                          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-sanjuan-base">
                      Password must be at least 8 characters
                    </p>
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sanjuan-dark font-medium mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-sanjuan-base" />
                      </div>
                      <input id="confirm-password" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="block w-full pl-10 pr-10 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="••••••••" required />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-sanjuan-base hover:text-sanjuan-dark">
                          {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="terms" type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} className="h-4 w-4 text-sanjuan-base focus:ring-sanjuan-light border-sanjuan-lighter rounded" required />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-sanjuan-base">
                        I agree to the{' '}
                        <a href="#" className="text-tango-base hover:text-tango-dark">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-tango-base hover:text-tango-dark">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-sanjuan-base to-sanjuan-dark hover:from-sanjuan-dark hover:to-sanjuan-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sanjuan-base">
                      Create Account
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-sanjuan-base">
                      Already have an account?{' '}
                      <Link to="/login" className="font-medium text-tango-base hover:text-tango-dark">
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>;
}