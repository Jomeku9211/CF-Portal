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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Send forgot password request to Xano
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess('Verification code sent to your email');
        setStep(2);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to send verification code');
      }
    } catch (error) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Verify OTP with Xano
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        setSuccess('OTP verified successfully');
        setStep(3);
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Reset password with Xano
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:uvT-ex56/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (response.ok) {
        setSuccess('Password reset successfully! You can now login with your new password.');
        // Reset form
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setStep(1);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to reset password');
      }
    } catch (error) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
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
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}
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
            <AuthButton type="submit" fullWidth disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send verification code'}
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
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}
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
            <AuthButton type="submit" fullWidth disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify OTP'}
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
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}
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
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            icon={<LockIcon size={18} />}
            required 
          />
          <div className="mt-6">
            <AuthButton type="submit" fullWidth disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </AuthButton>
          </div>
        </form>
      )}
    </AuthCard>
  );
}
