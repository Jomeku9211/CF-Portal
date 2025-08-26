import '../../styles/LandingPage/TrustedLeaders.css';
import Person1 from '../../assets/LandingPage/Testimonial_images/Person1.png';
import Person2 from '../../assets/LandingPage/Testimonial_images/Person2.png';
import Person3 from '../../assets/LandingPage/Testimonial_images/Person3.png';

const TrustedLeaders = () => {
  return (
    <section className="trusted-leaders-section">
      <div className="trusted-leaders-container">
        {/* Header */}
        <div className="trusted-leaders-header">
          <h2 className="trusted-leaders-title">Trusted by Industry Leaders</h2>
          <p className="trusted-leaders-subtitle">
            Did you know 89% of Hiring failures happen because of Culture Misfit, not lack of skill?
          </p>
        </div>
        
        {/* Testimonial Cards */}
        <div className="testimonial-cards">
          {/* Card 1: James Herwitz */}
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="profile-section">
                <div className="profile-image">
                  <img src={Person1} alt="James Herwitz" className="profile-photo" />
                </div>
                <div className="profile-info">
                  <h3 className="profile-name">James Herwitz</h3>
                  <p className="profile-role">- Founder</p>
                </div>
              </div>
              <div className="rating-section">
                <div className="star-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.129 1.126L16.87 1.126L16.87 16.311L1.129 16.311L1.129 1.126Z" fill="#F16A23"/>
                  </svg>
                </div>
                <span className="rating-score">4.1</span>
              </div>
            </div>
            <p className="testimonial-text">
              CoderFarm provides me with high quality developers. It was good working with them. Best wishes to them.
            </p>
          </div>
          
          {/* Card 2: Hanna Botosh */}
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="profile-section">
                <div className="profile-image">
                  <img src={Person2} alt="Hanna Botosh" className="profile-photo" />
                </div>
                <div className="profile-info">
                  <h3 className="profile-name">Hanna Botosh</h3>
                  <p className="profile-role">- CTO</p>
                </div>
              </div>
              <div className="rating-section">
                <div className="star-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.129 1.126L16.87 1.126L16.87 16.311L1.129 16.311L1.129 1.126Z" fill="#F16A23"/>
                  </svg>
                </div>
                <span className="rating-score">4.9</span>
              </div>
            </div>
            <p className="testimonial-text">
              CoderFarm provides me with high quality developers. It was good working with them. Best wishes to them.
            </p>
          </div>
          
          {/* Card 3: Cristopher Bergson */}
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="profile-section">
                <div className="profile-image">
                  <img src={Person3} alt="Cristopher Bergson" className="profile-photo" />
                </div>
                <div className="profile-info">
                  <h3 className="profile-name">Cristopher Bergson</h3>
                  <p className="profile-role">- Product Manager</p>
                </div>
              </div>
              <div className="rating-section">
                <div className="star-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.129 1.126L16.87 1.126L16.87 16.311L1.129 16.311L1.129 1.126Z" fill="#F16A23"/>
                  </svg>
                </div>
                <span className="rating-score">4.6</span>
              </div>
            </div>
            <p className="testimonial-text">
              CoderFarm provides me with high quality developers. It was good working with them. Best wishes to them.
            </p>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="pagination-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </section>
  );
};

export default TrustedLeaders;
