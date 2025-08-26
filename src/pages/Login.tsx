import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      email,
      password,
      rememberMe
    });
    // Add login logic here
    // Redirect to podcast dashboard after login
    navigate('/podcast/dashboard');
  };
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']" data-testid="LoginId">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-sanjuan-dark mb-2 font-['Inter']">
                Welcome Back
              </h1>
              <p className="text-sanjuan-base">
                Log in to your account to access your dashboard
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
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
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="remember-me" type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="h-4 w-4 text-sanjuan-base focus:ring-sanjuan-light border-sanjuan-lighter rounded" />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-sanjuan-base">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link to="/forgot-password" className="font-medium text-tango-base hover:text-tango-dark">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-sanjuan-base to-sanjuan-dark hover:from-sanjuan-dark hover:to-sanjuan-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sanjuan-base">
                      Sign in
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-sanjuan-base">
                      Don't have an account?{' '}
                      <Link to="/signup" className="font-medium text-tango-base hover:text-tango-dark">
                        Sign up
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