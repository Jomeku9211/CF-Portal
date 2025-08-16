import '../../styles/LandingPage/HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        {/* Header */}
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">How It Works</h2>
          <p className="how-it-works-subtitle">How we match you with Top Talent</p>
        </div>
        
        {/* Process Cards */}
        <div className="process-cards">
          {/* Card 1: Define Your Fit */}
          <div className="process-card">
            <h3 className="process-title">Define Your Fit</h3>
            <div className="process-content">
              <div className="process-image">
                {/* Placeholder for image */}
                <div className="image-placeholder"></div>
              </div>
              <p className="process-description">
                Create Job Roles & Share your company's values, project needs, and work style—let us understand your DNA.
              </p>
            </div>
          </div>
          
          {/* Card 2: Meet Your Matches */}
          <div className="process-card">
            <h3 className="process-title">Meet Your Matches</h3>
            <div className="process-content">
              <div className="process-image">
                {/* Placeholder for image */}
                <div className="image-placeholder"></div>
              </div>
              <p className="process-description">
                Review a shortlist of top-fit developers, with honest reputation scores/ Match Rate and project feedback.
              </p>
            </div>
          </div>
          
          {/* Card 3: Build & Grow */}
          <div className="process-card">
            <h3 className="process-title">Build & Grow</h3>
            <div className="process-content">
              <div className="process-image">
                {/* Placeholder for image with floating elements */}
                <div className="image-placeholder">
                  <div className="floating-avatar avatar-1">
                    <div className="avatar-image"></div>
                    <span className="avatar-label">You</span>
                  </div>
                  <div className="floating-avatar avatar-2">
                    <div className="avatar-image"></div>
                    <span className="avatar-label">Developer</span>
                  </div>
                  <div className="floating-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path d="M7.5 10.5L37.5 10.5M37.5 10.5L37.5 36M37.5 10.5L7.5 36" stroke="#F16A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M0.001 9.001L47.995 9.001M47.995 9.001L47.995 42M47.995 9.001L0.001 42" stroke="#F16A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="process-description">
                Make confident hires backed by transparent data—enjoy lower fees as your reputation rises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
