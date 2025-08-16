import '../../styles/LandingPage/HowItWorks.css';
import HowItWorkImg1 from '../../assets/LandingPage/HowITworks/HowItWorkImg1.png';
import HowItWorkImg2 from '../../assets/LandingPage/HowITworks/HowItWorkImg2.png';
import HowItWorkImg3 from '../../assets/LandingPage/HowITworks/HowItWorkImg3.png';

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
                <img src={HowItWorkImg1} alt="Define Your Fit" className="process-step-image" />
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
                <img src={HowItWorkImg2} alt="Meet Your Matches" className="process-step-image" />
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
                <img src={HowItWorkImg3} alt="Build & Grow" className="process-step-image" />
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
