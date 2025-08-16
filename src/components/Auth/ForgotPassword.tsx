import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, KeyIcon, LockIcon, ArrowLeftIcon } from 'lucide-react';
import { AuthCard } from '../common/AuthCard';
import { AuthInput } from '../common/AuthInput';
import { AuthButton } from '../common/AuthButton';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: Email entry, 2: OTP verification, 3: New password
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset:', { email, otp, newPassword });
  };

  return (
    <AuthCard 
      title={step === 1 ? 'Forgot Password' : step === 2 ? 'Verify OTP' : 'Reset Password'} 
      subtitle={
        step === 1 ? 'Enter your email to receive a verification code' : 
        step === 2 ? 'Enter the OTP sent to your email' : 
        'Create a new password'
      }
    >
      {step === 1 && (
        <form onSubmit={handleSubmitEmail}>
          <AuthInput 
            label="Email" 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            icon={<MailIcon size={18} />} 
            required 
          />
          <div className="mt-6">
            <AuthButton type="submit" fullWidth>
              Send verification code
            </AuthButton>
          </div>
          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300">
              <ArrowLeftIcon size={16} className="mr-1" /> Back to login
            </Link>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <AuthInput 
            label="OTP Code" 
            type="text" 
            placeholder="Enter verification code" 
            value={otp} 
            onChange={e => setOtp(e.target.value)} 
            icon={<KeyIcon size={18} />} 
            required 
          />
          <div className="mt-6">
            <AuthButton type="submit" fullWidth>
              Verify OTP
            </AuthButton>
          </div>
          <p className="mt-4 text-center text-sm text-gray-400">
            Didn't receive code?{' '}
            <button 
              type="button" 
              className="text-blue-400 hover:text-blue-300" 
              onClick={() => setStep(1)}
            >
              Resend
            </button>
          </p>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <AuthInput 
            label="New Password" 
            type="password" 
            placeholder="Enter new password" 
            value={newPassword} 
            onChange={e => setNewPassword(e.target.value)} 
            icon={<LockIcon size={18} />} 
            required 
          />
          <AuthInput 
            label="Confirm Password" 
            type="password" 
            placeholder="Confirm new password" 
            required 
          />
          <div className="mt-6">
            <AuthButton type="submit" fullWidth>
              Reset Password
            </AuthButton>
          </div>
        </form>
      )}
    </AuthCard>
  );
}
