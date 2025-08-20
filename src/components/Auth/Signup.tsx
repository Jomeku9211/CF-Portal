import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';
import { AuthCard } from '../common/AuthCard';
import { AuthInput } from '../common/AuthInput';
import { AuthButton } from '../common/AuthButton';
import { AuthDivider } from '../common/AuthDivider';
import { GoogleAuthButton } from '../common/GoogleAuthButton';
import { Checkbox } from '../common/Checkbox';
import { useAuth } from '../../contexts/AuthContext';

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface PasswordStrength {
  score: number;
  feedback: string;
  color: string;
}

export function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [marketingEmailsAccepted, setMarketingEmailsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: '',
    color: 'text-gray-400'
  });
  // Track whether a field has been interacted with
  const [touched, setTouched] = useState<{ name: boolean; email: boolean; password: boolean; confirmPassword: boolean }>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Password strength validation
  const validatePassword = (password: string): PasswordStrength => {
    let score = 0;
    const feedback = [] as string[];

    // Very short passwords (1 character) get 0 score
    if (password.length === 1) {
      feedback.push('At least 8 characters', 'Lowercase letter', 'Uppercase letter', 'Number', 'Special character');
      return {
        score: 0,
        feedback: feedback.join(', '),
        color: 'text-red-500'
      };
    }

    if (password.length >= 8) score++;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) score++;
    else feedback.push('Lowercase letter');

    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Uppercase letter');

    if (/[0-9]/.test(password)) score++;
    else feedback.push('Number');

    // Special character scoring: 1 point for basic special chars, extra point for multiple special chars
    const specialChars = password.match(/[^A-Za-z0-9]/g) || [];
    if (specialChars.length > 0) {
      score++;
    } else {
      feedback.push('Special character');
    }
    
    // Bonus point for multiple special characters (3 or more)
    if (specialChars.length >= 3) {
      score++;
    }

    let color = 'text-red-500';
    if (score >= 5) color = 'text-green-500';
    else if (score >= 4) color = 'text-yellow-500';
    else if (score >= 3) color = 'text-orange-500';
    else if (score >= 2) color = 'text-orange-500';

    return {
      score,
      feedback: feedback.join(', '),
      color
    };
  };

  // Real-time validation (do not set errors for empty fields)
  useEffect(() => {
    const errors: ValidationErrors = {};

    // Name validation
    if (formData.name.trim() !== '' && formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    } else if (formData.name.trim().length > 50) {
      errors.name = 'Name must be less than 50 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email !== '' && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (formData.password !== '' && formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
  }, [formData]);

  // Update password strength when password changes
  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(validatePassword(formData.password));
    } else {
      setPasswordStrength({ score: 0, feedback: '', color: 'text-gray-400' });
    }
  }, [formData.password]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Mark as touched when user changes
    setTouched(prev => ({ ...prev, [field]: true }));
    // Clear field-specific error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Normalize inputs for validation and submission
    const normalizedName = formData.name.trim().replace(/\s+/g, ' ');
    const normalizedEmail = formData.email.trim().toLowerCase();

    // Final validation check on submit (including empty fields)
    const submitErrors: ValidationErrors = {};
    if (normalizedName.length < 2) {
      submitErrors.name = 'Name must be at least 2 characters long';
    } else if (normalizedName.length > 50) {
      submitErrors.name = 'Name must be less than 50 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      submitErrors.email = 'Please enter a valid email address';
    }

    if (formData.password.length < 8) {
      submitErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      submitErrors.confirmPassword = 'Passwords do not match';
    }

    if (!privacyPolicyAccepted) {
      setError('You must accept the Privacy Policy and Terms & Conditions to continue');
      if (Object.keys(submitErrors).length > 0) {
        setValidationErrors(submitErrors);
      }
      // Mark all fields as touched so errors become visible
      setTouched({ name: true, email: true, password: true, confirmPassword: true });
      return;
    }

    // Clear privacy policy error since it's now accepted
    setError('');

    if (Object.keys(submitErrors).length > 0) {
      setValidationErrors(submitErrors);
      setError('Please fix the validation errors above');
      // Mark all fields as touched so errors become visible
      setTouched({ name: true, email: true, password: true, confirmPassword: true });
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(normalizedName, normalizedEmail, formData.password);
      if (result.success) {
        // User is automatically logged in after signup, redirect to role selection
        navigate('/role-selection', { replace: true });
      } else {
        setError(result.message || 'Signup failed');
        // If backend indicates the email already exists, show it under the Email field
        const msg = (result.message || '').toLowerCase();
        if (msg.includes('exist')) {
          setValidationErrors(prev => ({ ...prev, email: result.message }));
          setTouched(prev => ({ ...prev, email: true }));
        }
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score === 0) return 'Very Weak';
    if (passwordStrength.score === 1) return 'Weak';
    if (passwordStrength.score === 2) return 'Fair';
    if (passwordStrength.score === 3) return 'Good';
    if (passwordStrength.score === 4) return 'Good';
    if (passwordStrength.score === 5) return 'Strong';
    if (passwordStrength.score >= 6) return 'Very Strong';
    return 'Very Strong';
  };

  return (
    <AuthCard title="Create an account" subtitle="Sign up to get started">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthInput 
          label="Full Name" 
          type="text" 
          placeholder="Enter your full name" 
          value={formData.name} 
          onChange={e => handleInputChange('name', e.target.value)} 
          onBlur={() => handleBlur('name')}
          icon={<UserIcon size={18} />} 
          required 
          error={touched.name ? validationErrors.name : undefined}
        />
        
        <AuthInput 
          label="Email" 
          type="email" 
          placeholder="Enter your email" 
          value={formData.email} 
          onChange={e => handleInputChange('email', e.target.value)} 
          onBlur={() => handleBlur('email')}
          icon={<MailIcon size={18} />} 
          required 
          error={touched.email ? validationErrors.email : undefined}
        />
        
        {validationErrors.email && (
          <p className="text-xs text-red-500 mt-1">{validationErrors.email}</p>
        )}

        <div className="space-y-2">
          <AuthInput 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Create a password" 
            value={formData.password} 
            onChange={e => handleInputChange('password', e.target.value)} 
            onBlur={() => handleBlur('password')}
            icon={<LockIcon size={18} />} 
            rightIcon={showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            onRightIconClick={() => setShowPassword(!showPassword)}
            rightIconAriaLabel="Toggle password visibility"
            required 
            error={touched.password ? validationErrors.password : undefined}
          />
          
          {/* Password strength indicator */}
          {formData.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Password strength:</span>
                <span className={`font-medium ${passwordStrength.color}`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    passwordStrength.score <= 1 ? 'bg-red-500' :
                    passwordStrength.score === 2 ? 'bg-orange-500' :
                    passwordStrength.score === 3 ? 'bg-yellow-500' :
                    passwordStrength.score === 4 ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                />
              </div>
              {passwordStrength.feedback && (
                <p className="text-xs text-gray-500">
                  Missing: {passwordStrength.feedback}
                </p>
              )}
            </div>
          )}
        </div>
        
        <AuthInput 
          label="Confirm Password" 
          type={showConfirmPassword ? "text" : "password"} 
          placeholder="Confirm your password" 
          value={formData.confirmPassword} 
          onChange={e => handleInputChange('confirmPassword', e.target.value)} 
          onBlur={() => handleBlur('confirmPassword')}
          icon={<LockIcon size={18} />} 
          rightIcon={showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          rightIconAriaLabel="Toggle password visibility"
          required 
          error={touched.confirmPassword ? validationErrors.confirmPassword : undefined}
        />
        
        <div className="mt-6 space-y-4">
          <Checkbox
            id="privacy-policy"
            label={
              <span>
                I agree to the{' '}
                <Link 
                  to="/privacy-policy" 
                  target="_blank"
                  className="text-blue-600 hover:text-blue-500 underline font-medium"
                >
                  Privacy Policy and Terms & Conditions
                </Link>
                <span className="text-red-500"> *</span>
              </span>
            }
            checked={privacyPolicyAccepted}
            onChange={setPrivacyPolicyAccepted}
            required
          />
          
          <Checkbox
            id="marketing-emails"
            label="I consent to receive updates and marketing emails from Coder Farm"
            checked={marketingEmailsAccepted}
            onChange={setMarketingEmailsAccepted}
          />
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center space-x-2">
            <XIcon size={16} />
            <span>{error}</span>
          </div>
        )}
        
        <div className="mt-6">
          <AuthButton 
            type="submit" 
            fullWidth 
            disabled={isLoading || Object.keys(validationErrors).length > 0}
          >
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
