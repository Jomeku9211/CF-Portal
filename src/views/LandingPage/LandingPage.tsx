import { HeroSection } from "../../components/HeroSection";
import { ClientsSection } from "../../components/ClientsSection";
import { WhoWeHelpSection } from "../../components/WhoWeHelpSection";
import { BonusBenefitsSection } from "../../components/BonusBenefitsSection";
import { HowItWorksSection } from "../../components/HowItWorksSection";
import { FeaturesSection } from "../../components/FeaturesSection";
import { MediaPartnersSection } from "../../components/MediaPartnersSection";
import { FAQSection } from "../../components/FAQSection";

const LandingPage = () => {
  return (
    <div
      className="Landing_Page_Main"
      data-testid="LandingPageID"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <HeroSection />
      <ClientsSection />
      <WhoWeHelpSection />
      <BonusBenefitsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <MediaPartnersSection />
      <FAQSection />
    </div>
  );
};

export default LandingPage;
