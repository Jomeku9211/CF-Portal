import Media from "../../components/LandingPage/Media";
import ClientLogos from "../../components/LandingPage/ClientLogos";
import { HeroSection } from "../../components/LandingPage/HeroSection";
import { WhoWeHelp } from "../../components/LandingPage/WhoWeHelp";
import BonusBenefits from "../../components/LandingPage/BonusBenefits";
import HowItWorks from "../../components/LandingPage/HowItWorks";
import TrustedLeaders from "../../components/LandingPage/TrustedLeaders";
import Features from "../../components/LandingPage/Features";
import FAQ from "../../components/LandingPage/FAQ";

const LandingPage = () => {
  return (
    <div
      className="Landing_Page_Main"
      data-testid="LandingPageID"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <HeroSection />
      <ClientLogos />
      <WhoWeHelp />
      <BonusBenefits />
      <HowItWorks />
      <TrustedLeaders />
      <Features />
      <Media />
      <FAQ />
    </div>
  );
};

export default LandingPage;
