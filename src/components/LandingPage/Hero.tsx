import { useNavigate } from 'react-router-dom';
import '../../styles/LandingPage/Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-text-section">
            <h1 className="hero-heading">
              Find Developers – Who Truly Fit Your Culture
            </h1>
            <p className="hero-description">
              Hire remote talent vetted not just for skills, but for real culture fit, proven reputation, and teamwork—so teams thrive and projects succeed
            </p>
          </div>
          
          <div className="hero-cta-section">
            <button 
              className="hero-cta-button"
              onClick={handleLogin}
            >
              <span>Login</span>
              <svg className="arrow-icon" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M3.14 4.13L13.75 4.13M13.75 4.13L13.75 14.74M13.75 4.13L4.13 13.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <p className="hero-cta-text">Personalised Hiring Request</p>
          </div>
          
          <div className="hero-stats">
            <p className="stats-text">95% Retention, 4.9/5 for Culture fit from</p>
            <div className="client-avatars">
              <div className="avatar-group">
                <div className="avatar avatar-1"></div>
                <div className="avatar avatar-2"></div>
                <div className="avatar avatar-3"></div>
                <div className="avatar avatar-4"></div>
                <div className="avatar avatar-5"></div>
                <div className="avatar avatar-6"></div>
                <div className="avatar avatar-7"></div>
              </div>
              <span className="client-count">100+ Clients</span>
            </div>
          </div>
        </div>
        
        {/* Right Content - Hero Image */}
        <div className="hero-image-section">
          <div className="hero-image-container">
            <div className="hero-image-bg"></div>
            <div className="hero-image"></div>
            
            {/* Floating Badges */}
            <div className="floating-badge badge-1">
              <span>२</span>
            </div>
            <div className="floating-badge badge-2">
              <span>३</span>
            </div>
            <div className="floating-badge badge-3">
              <span>४</span>
            </div>
            <div className="floating-badge badge-4">
              <span>८</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
