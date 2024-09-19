import "../../styles/LandingPage/DeveloperTrial.css";
import Profile from "../../assets/LandingPage/profile.png";

const DeveloperTrial = () => {
  return (
    <div>
      <div className="main_Container" data-testid="DeveloperTrialId">
        <div className="Main_Content">
          <p className="content-1">
            <span>Transparent</span> Hiring, <br />
            Top Remote <span>Coder</span>
          </p>
          <p className="content-2">
            “For leaders who demand <span>excellence</span>, hire top remote
            developers with a process that’s transparent,{" "}
            <span>personalized</span>, and rooted in best practices.”
          </p>
          <div className="Role_btn">
            <button>Explore Developer Profiles</button>
          </div>
          <p>Personalised Hiring Request</p>
        </div>
        <div className="Profile_Img">
          <img src={Profile} alt="" />
        </div>
      </div>
    </div>
  );
};

export default DeveloperTrial;
