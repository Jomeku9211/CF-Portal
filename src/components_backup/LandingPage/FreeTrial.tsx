import "../../styles/LandingPage/FreeTrial.css";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const FreeTrial = () => {
  return (
    <div className="Main_Div" data-testid="FreeTrialId">
      <div className="Trial_Box">
        <h1>30-Day Risk-Free Trial</h1>
        <p>
          At CoderFarm, we offer a 30-Day Risk-Free Trial. Try our developers
          for 30 days, and if you're not satisfied, cancel for a full refund.
          Experience our quality with no risk.
        </p>
        <div className="Trial_Advantages">
          <div className="Trial_Advantages_Divs">
            <h2>Zero Downtime Guarantee</h2>
            <p>
              We guarantee continuity—if your developer is unavailable, we’ll
              immediately provide a replacement to keep your project running
              smoothly.
            </p>
          </div>
          <div className="fade-line"></div>
          <div className="Trial_Advantages_Divs">
            <h2>Seamless Project Management</h2>
            <p>
              Our portal and apz`p give you full control—manage tasks, get
              reports, and customize formats for free, ensuring easy project
              monitoring and team communication.
            </p>
          </div>
          <div className="fade-line"></div>
          <div className="Trial_Advantages_Divs">
            <h2>Pesonalized Short Listing </h2>
            <p>
              Provide your requirements, and we’ll handpick candidates who
              perfectly align with your needs, saving you time and ensuring the
              best fit for your team.
            </p>
          </div>
        </div>
        <div className="Trial_btn">
          <button>
            Start Your 30-Day Risk-Free Trial
            <span>
              <ArrowOutwardIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;
