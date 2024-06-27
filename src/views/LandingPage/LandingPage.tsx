import AutoSliderimages from "../../components/LandingPage/AutoSliderimages";
import ContactUs from "../../components/LandingPage/ContactUs";
import DeveloperTrial from "../../components/LandingPage/DeveloperTrial";
import Technologies from "../../components/LandingPage/Technologies";
import Testimonial from "../../components/LandingPage/Testimonial";
const LandingPage = () => {
  return (
    <div className="Landing_Page_Main" data-testid="LandingPageID" style={{backgroundColor:"#161E2C"}}>
      <DeveloperTrial />
      <AutoSliderimages />
      <Technologies />
      <Testimonial/>
      <ContactUs/>
    </div>
  );
};

export default LandingPage;
