import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../common/AuthCard';
import { AuthInput } from '../common/AuthInput';
import { AuthButton } from '../common/AuthButton';
import { LockIcon, UserIcon } from 'lucide-react';

export function SuperAdminLogin() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const normalizedId = loginId.trim();
    const normalizedPassword = password;

    if (normalizedId === 'krishna' && normalizedPassword === 'maruti') {
      try {
        localStorage.setItem('isSuperAdmin', '1');
      } catch {}
      navigate('/admin');
    } else {
      setError('Invalid super admin credentials');
    }
  };

  return (
    <AuthCard title="Super Admin Login" subtitle="Restricted access">
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Login ID"
          type="text"
          placeholder="Enter super admin ID"
          value={loginId}
          onChange={e => setLoginId(e.target.value)}
          icon={<UserIcon size={18} />}
          required
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          icon={<LockIcon size={18} />}
          required
        />
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <AuthButton type="submit" fullWidth>
          Login
        </AuthButton>
      </form>
    </AuthCard>
  );
}

export default SuperAdminLogin;


