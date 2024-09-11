import "../../styles/LandingPage/WhyUs.css";
import hands from "../../assets/LandingPage/WhyUs/hands.png";
import users from "../../assets/LandingPage/WhyUs/Users.png";
import record from "../../assets/LandingPage/WhyUs/record.png";
import trial from "../../assets/LandingPage/WhyUs/trial.png";
import gurantee from "../../assets/LandingPage/WhyUs/gurantee.png";
import quick from "../../assets/LandingPage/WhyUs/quick.png";

const WhyUs = () => {
  return (
    <div className="Main_Div_Whyus" data-testid="WhyUsId">
      <div className="Whyus_Box">
        <h1>Why Choose CoderFarm?</h1>
        <p>
          We offer a risk-free hiring experience, allowing you to assess the
          quality of our developers firsthand with complete peace of mind.
        </p>
        <div className="Choose_Cards">
          <div className="Cards">
            <img src={hands} alt="" />
            <h2>Personalized Short-Listing</h2>
            <p>
              We match you with developers who align with your coding standards,
              cultural fit, and project scope.
            </p>
          </div>
          <div className="Cards">
            <img src={users} alt="" />
            <h2>In-Depth Developer Profiles</h2>
            <p>
              Access detailed profiles that include technical skills,
              experience, certifications, and more.
            </p>
          </div>
          <div className="Cards">
            <img src={record} alt="" />
            <h2>Past Records</h2>
            <p>
              Review feedback from previous clients and performance evaluations
              to make informed decisions.
            </p>
          </div>
          <div className="Cards">
            <img src={trial} alt="" />
            <h2>30-Day Risk-Free Trial</h2>
            <p>
              Engage our developers without financial risk—cancel within 30 days
              for a full refund if you're not satisfied.
            </p>
          </div>
          <div className="Cards">
            <img src={gurantee} alt="" />
            <h2>Zero Downtime Guarantee</h2>
            <p>
              If your developer is unavailable, we provide an immediate
              replacement to ensure uninterrupted progress.
            </p>
          </div>
          <div className="Cards">
            <img src={quick} alt="" />
            <h2>Quick and Easy Hiring</h2>
            <p>
              Find, evaluate, and hire top-tier developers quickly to meet tight
              deadlines and project demands.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
