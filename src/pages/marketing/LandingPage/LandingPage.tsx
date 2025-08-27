import { HeroSection } from "./HeroSection";
import { ClientsSection } from "./ClientsSection";
import { WhoWeHelp } from "./WhoWeHelp";
import { BonusBenefitsSection } from "./BonusBenefitsSection";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import { MediaPartnersSection } from "./MediaPartnersSection";
import FAQ from "./FAQ";

const LandingPage = () => {
  return (
    <div
      className="Landing_Page_Main"
      data-testid="LandingPageID"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <HeroSection />
      <ClientsSection />
      <WhoWeHelp />
      <BonusBenefitsSection />
      <HowItWorks />
      <Features />
      <MediaPartnersSection />
      <FAQ />
    </div>
  );
};

export default LandingPage;
