import '../../styles/LandingPage/BonusBenefits.css';

const BonusBenefits = () => {
  return (
    <section className="bonus-benefits-section">
      <div className="bonus-benefits-container">
        {/* Header */}
        <div className="bonus-benefits-header">
          <h2 className="bonus-benefits-title">Bonus Benefits</h2>
          <p className="bonus-benefits-subtitle">How we match you with Top Talent</p>
        </div>
        
        {/* Process Cards */}
        <div className="process-cards">
          {/* Card 1: Culture Fit 1st */}
          <div className="process-card">
            <h3 className="process-title">Culture Fit 1st</h3>
            <div className="process-content">
              <div className="process-image">
                {/* Placeholder for image */}
                <div className="image-placeholder"></div>
              </div>
              <p className="process-description">
                1st Get matched with developers who resonate with your team's values from day one.
              </p>
            </div>
          </div>
          
          {/* Divider */}
          <div className="process-divider"></div>
          
          {/* Card 2: Fair & Transparent */}
          <div className="process-card">
            <h3 className="process-title">Fair & Transparent</h3>
            <div className="process-content">
              <div className="process-image">
                {/* Placeholder for image */}
                <div className="image-placeholder"></div>
              </div>
              <p className="process-description">
                See real Feedback & Reputation Scores from verified projects—no more guesswork.
              </p>
            </div>
          </div>
          
          {/* Divider */}
          <div className="process-divider"></div>
          
          {/* Card 3: Win-Win Hiring */}
          <div className="process-card">
            <h3 className="process-title">Win–Win Hiring</h3>
            <div className="process-content">
              <div className="process-image">
                {/* Placeholder for image */}
                <div className="image-placeholder"></div>
              </div>
              <p className="process-description">
                Both sides are motivated to be honest and do great work because trust is rewarded.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="cta-section">
          <button className="cta-button">
            <span className="cta-text">Start Your 30-Day Risk-Free Trial</span>
            <svg className="cta-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.25 5.25L18.75 5.25M18.75 5.25L18.75 18.75M18.75 5.25L5.25 18.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BonusBenefits;
