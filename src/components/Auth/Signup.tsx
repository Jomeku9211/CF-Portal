import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, MailIcon, LockIcon } from 'lucide-react';
import { AuthCard } from '../common/AuthCard';
import { AuthInput } from '../common/AuthInput';
import { AuthButton } from '../common/AuthButton';
import { AuthDivider } from '../common/AuthDivider';
import { GoogleAuthButton } from '../common/GoogleAuthButton';
import { useAuth } from '../../contexts/AuthContext';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signup(name, email, password);
      if (result.success) {
        navigate('/'); // Redirect to home page after successful signup
      } else {
        setError(result.message || 'Signup failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard title="Create an account" subtitle="Sign up to get started">
      <form onSubmit={handleSubmit}>
        <AuthInput 
          label="Name" 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          icon={<UserIcon size={18} />} 
          required 
        />
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
          type="password" 
          placeholder="Create a password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          icon={<LockIcon size={18} />} 
          required 
        />
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="mt-6">
          <AuthButton type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign up'}
          </AuthButton>
        </div>
        <AuthDivider text="OR" />
        <GoogleAuthButton />
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Login
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
