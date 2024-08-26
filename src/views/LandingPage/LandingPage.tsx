import AutoSliderimages from "../../components/LandingPage/AutoSliderimages";
import ContactUs from "../../components/LandingPage/ContactUs";
import DeveloperTrial from "../../components/LandingPage/DeveloperTrial";
// import HiringFlow from "../../components/LandingPage/HiringFlow";
// import Technologies from "../../components/LandingPage/Technologies";
import Testimonial from "../../components/LandingPage/Testimonial";
const LandingPage = () => {
  return (
    <div className="Landing_Page_Main" data-testid="LandingPageID" style={{backgroundColor: "#FAFAFA"}}>
      <DeveloperTrial />
      {/* <Technologies /> */}
      {/* <HiringFlow /> */}
      <Testimonial/>
      <AutoSliderimages />
      <ContactUs/>
    </div>
  );
};

export default LandingPage;
