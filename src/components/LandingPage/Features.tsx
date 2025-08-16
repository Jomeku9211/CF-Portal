import '../../styles/LandingPage/Features.css';

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        {/* Header */}
        <div className="features-header">
          <h2 className="features-title">It's Features</h2>
          <p className="features-subtitle">
            Discover the secret sauce behind our game-changing hiring approach. Not just features—these are your superpowers for hiring remote tech talent that truly fits. From intelligent matchmaking to reputation-driven pricing, every tool is designed to make hiring faster, fairer, and founder-focused.
          </p>
        </div>
        
        {/* Feature Cards Grid */}
        <div className="features-grid">
          {/* Card 1: MatchFit */}
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <path d="M5.25 5.25L31.5 5.25L31.5 31.5L5.25 31.5L5.25 5.25Z" fill="#F16A23"/>
                  <path d="M3.879 3.869L38.063 3.869L38.063 38.063L3.879 38.063L3.879 3.869Z" fill="#F16A23"/>
                </svg>
              </div>
              <span className="feature-name">MatchFit</span>
            </div>
            <p className="feature-description">
              Instantly see top candidates who match both your skills and culture requirements.
            </p>
          </div>
          
          {/* Card 2: TrueRep */}
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <path d="M3.948 3.937L38.054 3.937L38.054 36.745L3.948 36.745L3.948 3.937Z" fill="#F16A23"/>
                  <path d="M2.626 2.625L39.374 2.625L39.374 39.374L2.626 39.374L2.626 2.625Z" fill="#F16A23"/>
                </svg>
              </div>
              <span className="feature-name">TrueRep</span>
            </div>
            <p className="feature-description">
              Dynamic, transparent scores built from verified work, peer feedback, and consistent performance.
            </p>
          </div>
          
          {/* Card 3: SkillScope */}
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <path d="M2.618 5.25L39.375 5.25L39.375 35.438L2.618 35.438L2.618 5.25Z" fill="#F16A23"/>
                  <path d="M1.311 3.945L40.687 3.945L40.687 36.743L1.311 36.743L1.311 3.945Z" fill="#F16A23"/>
                </svg>
              </div>
              <span className="feature-name">SkillScope</span>
            </div>
            <p className="feature-description">
              Go beyond the resume. Dive into rated skills, code samples, and real project histories.
            </p>
          </div>
          
          {/* Card 4: FlowTrack */}
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <path d="M6.563 9.188L35.438 9.188L35.438 35.438L6.563 35.438L6.563 9.188Z" fill="#F16A23"/>
                  <path d="M5.25 7.875L36.75 7.875L36.75 36.75L5.25 36.75L5.25 7.875Z" fill="#F16A23"/>
                </svg>
              </div>
              <span className="feature-name">FlowTrack</span>
            </div>
            <p className="feature-description">
              Track candidates through every stage, compare with built-in scorecards.
            </p>
          </div>
          
          {/* Card 5: FlexFee */}
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <path d="M2.625 9.188L39.375 9.188L39.375 32.812L2.625 32.812L2.625 9.188Z" fill="#F16A23"/>
                  <path d="M1.312 7.868L40.681 7.868L40.681 34.125L1.312 34.125L1.312 7.868Z" fill="#F16A23"/>
                </svg>
              </div>
              <span className="feature-name">FlexFee</span>
            </div>
            <p className="feature-description">
              Your and your hires' reputation directly lowers your platform fees.
            </p>
          </div>
          
          {/* Card 6: TrustLoop */}
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <path d="M6.562 6.563L35.437 6.563L35.437 35.438L6.562 35.438L6.562 6.563Z" fill="#F16A23"/>
                  <path d="M5.25 5.568L36.75 5.568L36.75 36.432L5.25 36.432L5.25 5.568Z" fill="#F16A23"/>
                </svg>
              </div>
              <span className="feature-name">TrustLoop</span>
            </div>
            <p className="feature-description">
              Developers and companies both earn trust that follows them—no fakes, no fluff.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
