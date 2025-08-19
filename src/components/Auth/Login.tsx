import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { AuthCard } from '../common/AuthCard';
import { AuthInput } from '../common/AuthInput';
import { AuthButton } from '../common/AuthButton';
import { AuthDivider } from '../common/AuthDivider';
import { GoogleAuthButton } from '../common/GoogleAuthButton';
import { useAuth } from '../../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Effect to handle redirect after successful login
  useEffect(() => {
    console.log('=== LOGIN REDIRECT DEBUG ===');
    console.log('1. useEffect triggered');
    console.log('2. user:', user);
    console.log('3. isLoading:', isLoading);
    console.log('4. user?.roles:', user?.roles);
    console.log('5. user?.onboarding_stage:', user?.onboarding_stage);
    
    if (user && !isLoading) {
      console.log('6. User data available, redirecting based on onboarding stage:', user);
      redirectBasedOnOnboardingStage(user);
    } else {
      console.log('6. User data not available or still loading');
      if (!user) console.log('   - No user data');
      if (isLoading) console.log('   - Still loading');
    }
    console.log('=== LOGIN REDIRECT DEBUG END ===');
  }, [user, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const result = await login(normalizedEmail, password);
      if (result.success) {
        console.log('Login successful, checking user data...');
        
        // Try to get user data directly from localStorage as fallback
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            console.log('User data from localStorage:', userData);
            await redirectBasedOnOnboardingStage(userData);
            return;
          } catch (parseError) {
            console.error('Error parsing stored user data:', parseError);
          }
        }
        
        // If no stored user data, wait for context to update
        console.log('No stored user data, waiting for context update...');
      } else {
        setError(result.message || 'Login failed');
        setIsLoading(false);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const redirectBasedOnOnboardingStage = async (user: any) => {
    console.log('=== REDIRECT LOGIC DEBUG ===');
    console.log('1. Starting redirect logic for user:', user);
    console.log('2. User roles (array):', user.roles);
    console.log('3. User onboarding_stage:', user.onboarding_stage);
    
    // If user has no roles selected, go to role selection
    if (!user.roles || user.roles.length === 0) {
      console.log('4a. No roles selected, redirecting to /role-selection');
      navigate('/role-selection');
      return;
    }
    
    // Check if user has client role (roles is an array)
    const hasClientRole = Array.isArray(user.roles) && user.roles.includes('client');
    console.log('4b. User has client role:', hasClientRole);
    
    // If user is not a client, redirect to appropriate place
    if (!hasClientRole) {
      console.log('4c. User is not client (roles:', user.roles, '), redirecting to /dashboard');
      navigate('/dashboard');
      return;
    }
    
    // For client users, check onboarding stage and redirect to appropriate step
    const onboardingStage = user.onboarding_stage;
    console.log('5. Client user, checking onboarding stage:', onboardingStage);
    
    if (!onboardingStage || onboardingStage === 'organisation_creation') {
      console.log('6a. Organization creation stage, redirecting to /clientOnboarding (will show org step)');
      navigate('/clientOnboarding');
    } else if (onboardingStage === 'team_creation' || onboardingStage.startsWith('team_creation')) {
      console.log('6b. Team creation stage, redirecting to /clientOnboarding (will show team step)');
      navigate('/clientOnboarding');
    } else if (onboardingStage === 'job_creation' || onboardingStage.startsWith('job_creation')) {
      console.log('6c. Job creation stage, redirecting to /clientOnboarding (will show job step)');
      navigate('/clientOnboarding');
    } else if (onboardingStage === 'completed' || onboardingStage === 'complete') {
      console.log('6d. Onboarding completed, redirecting to /dashboard');
      navigate('/dashboard');
    } else {
      console.log('6e. Unknown onboarding stage, redirecting to /clientOnboarding (will auto-detect step)');
      navigate('/clientOnboarding');
    }
    
    console.log('7. Redirect logic completed');
    console.log('=== REDIRECT LOGIC DEBUG END ===');
  };

  return (
    <AuthCard title="Login" subtitle="Welcome back! Please enter your details.">
      <form onSubmit={handleSubmit}>
        <AuthInput 
          label="Email" 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          icon={<MailIcon size={18} />} 
          required 
        />
        <AuthInput 
          label="Password" 
          type={showPassword ? 'text' : 'password'} 
          placeholder="Enter your password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          icon={<LockIcon size={18} />} 
          rightIcon={showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          onRightIconClick={() => setShowPassword(v => !v)}
          rightIconAriaLabel="Toggle password visibility"
          required 
        />
        <div className="flex justify-end mb-6">
          <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
            Forgot password?
          </Link>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <AuthButton type="submit" fullWidth disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </AuthButton>
        <AuthDivider text="OR" />
        <GoogleAuthButton />
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
