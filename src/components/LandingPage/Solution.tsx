import '../../styles/LandingPage/Solution.css';
import solutionImg from '../../assets/LandingPage/solutionImg.png';

const Solution = () => {
  return (
    <section className="solution-section">
      <div className="solution-container">
        {/* Left Content - Image with Floating Icons */}
        <div className="solution-image-section">
          <div className="solution-image-container">
            <img src={solutionImg} alt="Solution" className="solution-image" />
            
            {/* Floating Icon Buttons */}
            <div className="floating-icon-button icon-1">
              <svg className="icon-svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path d="M21 42C32.598 42 42 32.598 42 21C42 9.402 32.598 0 21 0C9.402 0 0 9.402 0 21C0 32.598 9.402 42 21 42Z" fill="#F16A23"/>
                <path d="M10.5 7.875L31.5 7.875M31.5 7.875L31.5 34.125M31.5 7.875L10.5 34.125" stroke="#FEF0E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.187 2.625L32.812 2.625M32.812 2.625L32.812 39.375M32.812 2.625L9.187 39.375" stroke="#FEF0E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="floating-icon-button icon-2">
              <svg className="icon-svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path d="M21 42C32.598 42 42 32.598 42 21C42 9.402 32.598 0 21 0C9.402 0 0 9.402 0 21C0 32.598 9.402 42 21 42Z" fill="#F16A23"/>
                <path d="M7.875 3.934L34.125 3.934M34.125 3.934L34.125 32.813M34.125 3.934L7.875 32.813" stroke="#FEF0E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.562 2.621L35.437 2.621M35.437 2.621L35.437 39.375M35.437 2.621L6.562 39.375" stroke="#FEF0E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="floating-icon-button icon-3">
              <svg className="icon-svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path d="M21 42C32.598 42 42 32.598 42 21C42 9.402 32.598 0 21 0C9.402 0 0 9.402 0 21C0 32.598 9.402 42 21 42Z" fill="#F16A23"/>
                <path d="M6.563 9.188L35.437 9.188M35.437 9.188L35.437 32.063M35.437 9.188L6.563 32.063" stroke="#FEF0E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M0.001 7.876L41.995 7.876M41.995 7.876L41.995 36.748M41.995 7.876L0.001 36.748" stroke="#FEF0E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Right Content */}
        <div className="solution-content">
          <div className="solution-heading-section">
            <h2 className="solution-heading">
              Meet the Marketplace That Puts Culture 1st!
            </h2>
            <p className="solution-subheading">
              Did you know 89% of Hiring failures happen because of Culture Misfit, not lack of skill?
            </p>
          </div>
          
          <div className="solution-description-section">
            <p className="solution-description">
              Tired of noisy job boards and endless compromises? We were too. That's why we reimagined tech hiring—from scratch—just for ambitious founders and teams who demand culture-fit, skill, and long-term value.
            </p>
            <p className="solution-description">
              Developer aligned with your mission. Everyone wins.
            </p>
            <p className="solution-description">
              With our DNA-matching tech + honest feedback loop, you get matched with remote developers who share your vision, prove their value, & are ready to grow with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
