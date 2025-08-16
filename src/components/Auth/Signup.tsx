import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, MailIcon, LockIcon } from 'lucide-react';
import { AuthCard } from '../common/AuthCard';
import { AuthInput } from '../common/AuthInput';
import { AuthButton } from '../common/AuthButton';
import { AuthDivider } from '../common/AuthDivider';
import { GoogleAuthButton } from '../common/GoogleAuthButton';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup form submitted:', { name, email, password });
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
        <div className="mt-6">
          <AuthButton type="submit" fullWidth>
            Sign up
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
