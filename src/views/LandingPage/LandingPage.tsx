import AutoSliderimages from "../../components/LandingPage/AutoSliderimages";
import ContactUs from "../../components/LandingPage/ContactUs";
import DeveloperTrial from "../../components/LandingPage/DeveloperTrial";
import FreeTrial from "../../components/LandingPage/FreeTrial";
import Role from "../../components/LandingPage/Role";
import Testimonial from "../../components/LandingPage/Testimonial";
import WhyUs from "../../components/LandingPage/WhyUs";

const LandingPage = () => {
  return (
    <div
      className="Landing_Page_Main"
      data-testid="LandingPageID"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <DeveloperTrial />
      <Role />
      <WhyUs />
      <FreeTrial />
      {/* <Technologies /> */}
      {/* <HiringFlow /> */}
      <Testimonial />
      <AutoSliderimages />
      <ContactUs />
    </div>
  );
};

export default LandingPage;
