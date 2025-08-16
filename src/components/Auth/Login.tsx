import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, LockIcon } from 'lucide-react';
import { AuthCard } from '../common/AuthCard';
import { AuthInput } from '../common/AuthInput';
import { AuthButton } from '../common/AuthButton';
import { AuthDivider } from '../common/AuthDivider';
import { GoogleAuthButton } from '../common/GoogleAuthButton';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login form submitted:', { email, password });
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
          type="password" 
          placeholder="Enter your password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          icon={<LockIcon size={18} />} 
          required 
        />
        <div className="flex justify-end mb-6">
          <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
            Forgot password?
          </Link>
        </div>
        <AuthButton type="submit" fullWidth>
          Login
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
