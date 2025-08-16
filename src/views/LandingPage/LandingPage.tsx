import ContactUs from "../../components/LandingPage/ContactUs";
import Media from "../../components/LandingPage/Media";
import Hero from "../../components/LandingPage/Hero";
import ClientLogos from "../../components/LandingPage/ClientLogos";
import ProblemStatement from "../../components/LandingPage/ProblemStatement";
import Solution from "../../components/LandingPage/Solution";
import BonusBenefits from "../../components/LandingPage/BonusBenefits";
import HowItWorks from "../../components/LandingPage/HowItWorks";
import TrustedLeaders from "../../components/LandingPage/TrustedLeaders";
import Features from "../../components/LandingPage/Features";
import FAQ from "../../components/LandingPage/FAQ";
import ScheduleAppointment from "../../components/LandingPage/ScheduleAppointment";

const LandingPage = () => {
  return (
    <div
      className="Landing_Page_Main"
      data-testid="LandingPageID"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <Hero />
      <ClientLogos />
      <ProblemStatement />
      <Solution />
      <BonusBenefits />
      <HowItWorks />
      <TrustedLeaders />
      <Features />
      <Media />
      <FAQ />
      <ScheduleAppointment />
      <ContactUs />
    </div>
  );
};

export default LandingPage;
