import '../../styles/LandingPage/ProblemStatement.css';
import ProblemStatementImage from '../../assets/LandingPage/ProblemStatementImage.png';

const ProblemStatement = () => {
  return (
    <section className="problem-statement-section">
      <div className="problem-statement-container">
        {/* Left Content */}
        <div className="problem-content">
          <div className="problem-heading-section">
            <h2 className="problem-heading">
              Wasted Hours. High Risk. Misfit Hires. ‼
            </h2>
            <p className="problem-subheading">
              Did you know 89% hiring fail due Culture Misfit.
            </p>
          </div>
          
          <div className="problem-description-section">
            <p className="problem-description">
              You've seen it.. "Resumes that Don't match reality, Disengaged hires, and endless interviews with candidates who look good on paper — but never truly belong.
            </p>
            <p className="problem-description">
              Too many Platform... jst filter by keywords — no guarantee of real fit, leaving you to guess if someone is the right match for your mission.
            </p>
            <p className="problem-description">
              The wrong hire drains energy and money, breeds miscommunication, and can stall your team.
            </p>
          </div>
        </div>
        
        {/* Right Content - Image with Floating Icons */}
        <div className="problem-image-section">
          <div className="problem-image-container">
            <img src={ProblemStatementImage} alt="Problem Statement" className="problem-image" />
            
            {/* Floating Icon Buttons */}
            <div className="floating-icon-button icon-1">
              <svg className="icon-svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path d="M21 42C32.598 42 42 32.598 42 21C42 9.402 32.598 0 21 0C9.402 0 0 9.402 0 21C0 32.598 9.402 42 21 42Z" fill="#E9ECF0"/>
                <path d="M21 5.25C12.6 5.25 5.25 12.6 5.25 21C5.25 29.4 12.6 36.75 21 36.75C29.4 36.75 36.75 29.4 36.75 21C36.75 12.6 29.4 5.25 21 5.25ZM21 31.5C15.75 31.5 10.5 26.25 10.5 21C10.5 15.75 15.75 10.5 21 10.5C26.25 10.5 31.5 15.75 31.5 21C31.5 26.25 26.25 31.5 21 31.5ZM21 15.75C18.9 15.75 15.75 18.9 15.75 21C15.75 23.1 18.9 26.25 21 26.25C23.1 26.25 26.25 23.1 26.25 21C26.25 18.9 23.1 15.75 21 15.75Z" fill="#E9ECF0"/>
              </svg>
            </div>
            
            <div className="floating-icon-button icon-2">
              <svg className="icon-svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path d="M21 42C32.598 42 42 32.598 42 21C42 9.402 32.598 0 21 0C9.402 0 0 9.402 0 21C0 32.598 9.402 42 21 42Z" fill="#FE8F8E"/>
                <path d="M21 5.25C12.6 5.25 5.25 12.6 5.25 21C5.25 29.4 12.6 36.75 21 36.75C29.4 36.75 36.75 29.4 36.75 21C36.75 12.6 29.4 5.25 21 5.25ZM21 31.5C15.75 31.5 10.5 26.25 10.5 21C10.5 15.75 15.75 10.5 21 10.5C26.25 10.5 31.5 15.75 31.5 21C31.5 26.25 26.25 31.5 21 31.5ZM21 15.75C18.9 15.75 15.75 18.9 15.75 21C15.75 23.1 18.9 26.25 21 26.25C23.1 26.25 26.25 23.1 26.25 21C26.25 18.9 23.1 15.75 21 15.75Z" fill="#FE8F8E"/>
              </svg>
            </div>
            
            <div className="floating-icon-button icon-3">
              <svg className="icon-svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path d="M21 42C32.598 42 42 32.598 42 21C42 9.402 32.598 0 21 0C9.402 0 0 9.402 0 21C0 32.598 9.402 42 21 42Z" fill="#E9ECF0"/>
                <path d="M21 5.25C12.6 5.25 5.25 12.6 5.25 21C5.25 29.4 12.6 36.75 21 36.75C29.4 36.75 36.75 29.4 36.75 21C36.75 12.6 29.4 5.25 21 5.25ZM21 31.5C15.75 31.5 10.5 26.25 10.5 21C10.5 15.75 15.75 10.5 21 10.5C26.25 10.5 31.5 15.75 31.5 21C31.5 26.25 26.25 31.5 21 31.5ZM21 15.75C18.9 15.75 15.75 18.9 15.75 21C15.75 23.1 18.9 26.25 21 26.25C23.1 26.25 26.25 23.1 26.25 21C26.25 18.9 23.1 15.75 21 15.75Z" fill="#E9ECF0"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
