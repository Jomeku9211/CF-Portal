import ContactUs from "../../components/LandingPage/ContactUs";
import DeveloperTrial from "../../components/LandingPage/DeveloperTrial";
import FreeTrial from "../../components/LandingPage/FreeTrial";
import Role from "../../components/LandingPage/Role";
import RoleInfoCard from "../../components/LandingPage/RoleInfoCard";
import Testimonial from "../../components/LandingPage/Testimonial";
import WhyUs from "../../components/LandingPage/WhyUs";
import TrustedClients from "../../components/LandingPage/TrustedClients";

const LandingPage = () => {
  return (
    <div
      className="Landing_Page_Main"
      data-testid="LandingPageID"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <DeveloperTrial />
      <TrustedClients />
      <RoleInfoCard />
      <Testimonial />
      <Role />
      <WhyUs />
      <FreeTrial />
      {/* <Technologies /> */}
      {/* <HiringFlow /> */}
      <ContactUs />
    </div>
  );
};

export default LandingPage;
