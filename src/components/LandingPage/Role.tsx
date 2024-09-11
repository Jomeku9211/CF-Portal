import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "../../styles/LandingPage/Role.css";
import ceo from "../../assets/LandingPage/Role/ceo.png";
import developer from "../../assets/LandingPage/Role/developer.png";
import agency from "../../assets/LandingPage/Role/agency.png";

const Role = () => {
  return (
    <div className="Role_Container" data-testid="RoleId">
      <div className="Role_MainDiv">
        <h1>Which Role Best Describes You?</h1>
        <div className="Role_cards">
          <div className="card">
            <img src={ceo} />
          </div>
          <div className="card">
            <img src={developer} />
          </div>
          <div className="card">
            <img src={agency} />
          </div>
        </div>
        <div className="Prob_Sol_Div">
          <div className="Prob_Sol_Div1">
            <h2>Problem</h2>
            <p>
              As a CTO or CEO, your reputation—and the success of your
              project—depends on the excellence of your team. You’ve faced the
              frustration of subpar talent, leading to missed deadlines and
              compromised quality.
            </p>
          </div>
          <div className="Prob_Sol_Div1">
            <h2>Solution</h2>
            <p>
              At CoderFarm, we build trust by connecting you with top-tier
              developers through detailed profiles, rigorous vetting, and our
              unique cultural alignment process. Plus, our 30-day risk-free
              trial ensures you can hire with confidence..
            </p>
          </div>
        </div>
        <div className="Role_btn">
          <button>
            Start Building Your Dream Team
            <span>
              <ArrowOutwardIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Role;
