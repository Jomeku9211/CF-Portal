import React, { useState } from 'react';
import '../../styles/Auth/AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log('Login:', { email: formData.email, password: formData.password });
    } else {
      // Handle signup logic
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Signup:', formData);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      company: ''
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left side - Branding */}
        <div className="auth-branding">
          <div className="brand-content">
            <div className="logo">
              <h1>CoderFarm</h1>
            </div>
            <h2 className="brand-title">
              {isLogin ? 'Welcome Back!' : 'Join CoderFarm'}
            </h2>
            <p className="brand-subtitle">
              {isLogin 
                ? 'Sign in to access your dashboard and find the perfect developers for your projects.'
                : 'Start building your dream team with top-tier remote developers.'
              }
            </p>
            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>AI-powered matching</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Verified developers</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Secure platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <div className="form-header">
              <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
              <p>
                {isLogin 
                  ? "Don't have an account? " 
                  : "Already have an account? "
                }
                <button 
                  type="button" 
                  className="toggle-mode-btn"
                  onClick={toggleMode}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required={!isLogin}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required={!isLogin}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required={!isLogin}
                      placeholder="Enter your company name"
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              {isLogin && (
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="forgot-password">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button type="submit" className="submit-btn">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>

              {!isLogin && (
                <p className="terms-notice">
                  By creating an account, you agree to our{' '}
                  <a href="/terms">Terms of Service</a> and{' '}
                  <a href="/privacy">Privacy Policy</a>
                </p>
              )}
            </form>

            <div className="social-auth">
              <div className="divider">
                <span>or continue with</span>
              </div>
              <div className="social-buttons">
                <button type="button" className="social-btn google">
                  <span>Google</span>
                </button>
                <button type="button" className="social-btn github">
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
