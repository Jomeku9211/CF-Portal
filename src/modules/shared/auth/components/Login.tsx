import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { AuthCard } from '../components/AuthCard';
import { AuthInput } from '../components/AuthInput';
import { Button } from '../../ui/Button';
import { AuthDivider } from '../components/AuthDivider';
import { GoogleAuthButton } from '../components/GoogleAuthButton';
import { useAuth } from '../../../context/contexts/AuthContext';
import { organizationService } from '../../client/services/organizationService';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const result = await login(normalizedEmail, password);
      if (result.success) {
        // If user already has an organization, skip role selection
        try {
          const orgRes = await organizationService.getUserOrganizations();
          if (orgRes.success && (orgRes.organizations?.length || 0) > 0) {
            navigate('/onboarding');
          } else {
            navigate('/role-selection');
          }
        } catch {
          navigate('/onboarding');
        }
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
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
        <Button type="submit" variant="auth" fullWidth disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
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
