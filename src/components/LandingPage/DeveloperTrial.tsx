import "../../styles/LandingPage/DeveloperTrial.css";
import Profile from "../../assets/LandingPage/profile.png";
import tedx from "./../../assets/LandingPage/Auto Slider Images/tedx.png";
import IIT from "./../../assets/LandingPage/Auto Slider Images/IITR.png";
import LyftedEdible from "./../../assets/LandingPage/Auto Slider Images/LyftedEdible.png";
import smartdata from "./../../assets/LandingPage/Auto Slider Images/Smartdata.png";
import indore from "./../../assets/LandingPage/Auto Slider Images/indorecity.png";
import canvas from "../../assets/LandingPage/canvass.png";

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
      <div className="Clients_Container">
        <div className="Clients_Container_img">
          <img src={tedx} />
          <img src={canvas} className="canvaImg" />
          <img src={indore} />
          <img src={IIT} />
          <img src={smartdata} className="canvaImg" />
          <img src={LyftedEdible} className="canvaImg" />
        </div>
      </div>
    </div>
  );
};

export default DeveloperTrial;
