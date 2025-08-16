import { useState } from 'react';
import '../../styles/Login/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
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
    console.log('Form submitted:', formData);
    // Handle login logic here
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left side - Login Form */}
        <div className="login-left">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome to CF Portal!</h1>
            <div className="welcome-content">
              <h2 className="welcome-heading">Login your account. Discover talent. Manage hiring like a pro.</h2>
              <p className="welcome-subtitle">Please log in to continue</p>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="login-form-section">
            <form onSubmit={handleSubmit} className="login-form-left">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">User Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">User Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className="form-input" placeholder="Enter your password" required />
              </div>
              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkmark"></span>
                  <span className="checkbox-label">Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forget Password</a>
              </div>
              <button type="submit" className="login-button">
                <span>Sign In</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M1.5 3L18 3L18 21M18 3L3 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
            <div className="login-divider">
              <span className="divider-text">Or Login with:</span>
            </div>
            <div className="social-login-buttons">
              <button className="social-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 3.00045L21 3.00045L21 21.0005L3 21.0005L3 3.00045Z" fill="#F2F2F2"/></svg></button>
              <button className="social-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M1.49759 -0.00000189152L21.0001 21.0001L1.49759 21.0001L1.49759 -0.00000189152Z" fill="#F2F2F2"/></svg></button>
              <button className="social-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3.74964 3L20.2493 21L3.74964 21L3.74964 3Z" fill="#F2F2F2"/></svg></button>
              <button className="social-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M2.25 2.25L21.75 21.75L2.25 21.75L2.25 2.25Z" fill="#F2F2F2"/></svg></button>
            </div>
            <div className="signup-prompt">
              <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
            </div>
          </div>
        </div>
        {/* Right side - White/Gradient Section */}
        <div className="login-right">
          <div className="right-content">
            {/* This section can contain additional content or branding */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
