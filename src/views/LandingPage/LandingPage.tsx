import AutoSliderimages from "../../components/LandingPage/AutoSliderimages";
import DeveloperTrial from "../../components/LandingPage/DeveloperTrial";
import Technologies from "../../components/LandingPage/Technologies";
const LandingPage = () => {
  return (
    <div className="Landing_Page_Main" data-testid="LandingPageID" style={{backgroundColor:"#161E2C"}}>
      <DeveloperTrial />
      <AutoSliderimages />
      <Technologies />
    </div>
  );
};

export default LandingPage;
