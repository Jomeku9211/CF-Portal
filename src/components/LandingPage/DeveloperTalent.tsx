import Speed from "../../assets/LandingPage/Speed.png";
import CoderFarm from "../../assets/LandingPage/CoderFarm.png";
import BlueTick from "../../assets/LandingPage/BlueTick.png";
import Idea from "../../assets/LandingPage/Idea.png";
import Target from "../../assets/LandingPage/Target.png";
import "../../styles/LandingPage/DeveloperTalent.css";
const DeveloperTalent = () => {
  return (
    <div className="LandingPage_Third_Section" data-testid="DeveloperTalentId">
      <h1>Struggling to find the right developers?</h1>
      <div className="Third_Section_Main_Div">
        <div className="Image_Section_Div">
          <div className="CoderFarm_Image" data-testid="image-testid">
            <img src={CoderFarm} alt="" />
          </div>
        </div>
          <div className="Text_Section_Div">
            <h3 className="Text_Section_heading">
              Your Problems, Our Solutions
            </h3>
    
            <div className="Text_Section_Box">
              <div className="Text_Inner_Box1">
                <div className="Box1">
                  <img src={BlueTick} alt="" className="logo" />
                  <h2>Hiring Hassles & Missed Opportunities?</h2>
                  <p>Pre-vetted developers, ready to start Day 1.</p>
                </div>


              <div className="Box2">
                <img src={Target} alt="" className="logo" />
                <h2>Budget Constraints & Hiring Risks?</h2>
                <p>Cost-effective solutions with guaranteed quality.</p>
              </div>
            </div>

            <div className="Text_Inner_Box2">
              <div className="Box3">
                <img src={Speed} alt="" className="logo" />
                <h2>Outdated Skills & Tech Gaps?</h2>
                <p>Developers trained in the latest technologies.</p>
              </div>
              <div className="Box4">
                <img src={Idea} alt="" className="logo_bulb logo" />
                <h2>Coding Standards & Compatibility Issues?</h2>
                <p>Developers trained to follow your specific standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTalent;
