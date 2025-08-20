import { render, screen } from '@testing-library/react';
import PrivacyPolicy from '../../../views/PrivacyPolicy/PrivacyPolicy';

describe('PrivacyPolicy', () => {
  it('should render the component correctly', () => {
    render(<PrivacyPolicy />);
    
    const container = document.querySelector('.Privacy_Main_Div');
    expect(container).toBeInTheDocument();
  });

  it('should render the main heading', () => {
    render(<PrivacyPolicy />);
    
    const heading = screen.getByText('Terms and conditions');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
  });

  it('should render the revision date', () => {
    render(<PrivacyPolicy />);
    
    const revisionDate = screen.getByText('DATE OF LAST REVISION: 05/05/2022');
    expect(revisionDate).toBeInTheDocument();
    expect(revisionDate.tagName).toBe('P');
  });

  it('should render the welcome section', () => {
    render(<PrivacyPolicy />);
    
    const welcomeHeading = screen.getByText('Welcome to Coder Farm Private Limited!');
    expect(welcomeHeading).toBeInTheDocument();
    expect(welcomeHeading.tagName).toBe('H2');
  });

  it('should render the welcome description', () => {
    render(<PrivacyPolicy />);
    
    const welcomeDesc = screen.getByText(/These terms and conditions outline the rules and regulations/);
    expect(welcomeDesc).toBeInTheDocument();
    expect(welcomeDesc.tagName).toBe('P');
  });

  it('should render the terminology explanation', () => {
    render(<PrivacyPolicy />);
    
    const terminologyText = screen.getByText(/The following terminology applies to these Terms and Conditions/);
    expect(terminologyText).toBeInTheDocument();
    expect(terminologyText.tagName).toBe('P');
  });

  it('should render the cookies section heading', () => {
    render(<PrivacyPolicy />);
    
    const cookiesHeading = screen.getByText('Cookies');
    expect(cookiesHeading).toBeInTheDocument();
    expect(cookiesHeading.tagName).toBe('H2');
  });

  it('should render the cookies agreement text', () => {
    render(<PrivacyPolicy />);
    
    const cookiesAgreement = screen.getByText(/We employ the use of cookies/);
    expect(cookiesAgreement).toBeInTheDocument();
    expect(cookiesAgreement.tagName).toBe('P');
  });

  it('should render the cookies explanation', () => {
    render(<PrivacyPolicy />);
    
    const cookiesExplanation = screen.getByText(/Most interactive websites use cookies/);
    expect(cookiesExplanation).toBeInTheDocument();
    expect(cookiesExplanation.tagName).toBe('P');
  });

  it('should render the cookies functionality text', () => {
    render(<PrivacyPolicy />);
    
    const cookiesFunctionality = screen.getByText(/Cookies are used by our website to enable the functionality/);
    expect(cookiesFunctionality).toBeInTheDocument();
    expect(cookiesFunctionality.tagName).toBe('P');
  });

  it('should render the newsletter cookies text', () => {
    render(<PrivacyPolicy />);
    
    const newsletterCookies = screen.getByText(/This site offers newsletter or email subscription services/);
    expect(newsletterCookies).toBeInTheDocument();
    expect(newsletterCookies.tagName).toBe('P');
  });

  it('should render the social media cookies text', () => {
    render(<PrivacyPolicy />);
    
    const socialMediaCookies = screen.getByText(/We also use social media buttons and\/or plugins on this site/);
    expect(socialMediaCookies).toBeInTheDocument();
    expect(socialMediaCookies.tagName).toBe('P');
  });

  it('should render the analytics cookies text', () => {
    render(<PrivacyPolicy />);
    
    const analyticsCookies = screen.getByText(/We or our service providers also use analytic services/);
    expect(analyticsCookies).toBeInTheDocument();
    expect(analyticsCookies.tagName).toBe('P');
  });

  it('should render the cookie storage duration text', () => {
    render(<PrivacyPolicy />);
    
    const storageDuration = screen.getByText(/The cookies collected are used to a very limited extent/);
    expect(storageDuration).toBeInTheDocument();
    expect(storageDuration.tagName).toBe('P');
  });

  it('should render the browser settings text', () => {
    render(<PrivacyPolicy />);
    
    const browserSettings = screen.getByText(/The browsers of most computers, smartphones, and other web-enabled devices/);
    expect(browserSettings).toBeInTheDocument();
    expect(browserSettings.tagName).toBe('P');
  });

  it('should render the license section heading', () => {
    render(<PrivacyPolicy />);
    
    const licenseHeading = screen.getByText('License and Intellectual Property Rights');
    expect(licenseHeading).toBeInTheDocument();
    expect(licenseHeading.tagName).toBe('H2');
  });

  it('should render the intellectual property text', () => {
    render(<PrivacyPolicy />);
    
    const ipText = screen.getByText(/Unless otherwise stated, Coder Farm Private Limited/);
    expect(ipText).toBeInTheDocument();
    expect(ipText.tagName).toBe('P');
  });

  it('should render the personal use text', () => {
    render(<PrivacyPolicy />);
    
    const personalUse = screen.getByText(/You may access this website for your own personal use/);
    expect(personalUse).toBeInTheDocument();
    expect(personalUse.tagName).toBe('P');
  });

  it('should render the "You must not" text', () => {
    render(<PrivacyPolicy />);
    
    const mustNot = screen.getByText('You must not:');
    expect(mustNot).toBeInTheDocument();
    expect(mustNot.tagName).toBe('P');
  });

  it('should render all prohibited actions', () => {
    render(<PrivacyPolicy />);
    
    const prohibitedActions = [
      'Republish material from www.coderfarm.in;',
      'Use material from www.coderfarm.in for commercial purposes;',
      'Sell, rent, or sub-license material from www.coderfarm.in;',
      'Reproduce, duplicate, modifyor copy material from www.coderfarm.in;',
      'Redistribute content fromwww.coderfarm.in.'
    ];

    prohibitedActions.forEach(action => {
      const actionText = screen.getByText(action);
      expect(actionText).toBeInTheDocument();
      expect(actionText.tagName).toBe('P');
    });
  });

  it('should render the logo usage restriction text', () => {
    render(<PrivacyPolicy />);
    
    const logoRestriction = screen.getByText(/You shall not use the "Coder Farm Private Limited" name or the Coder Farm Private Limited logo/);
    expect(logoRestriction).toBeInTheDocument();
    expect(logoRestriction.tagName).toBe('P');
  });

  it('should render the compliance text', () => {
    render(<PrivacyPolicy />);
    
    const complianceText = screen.getByText(/You will comply with all applicable laws in accessing and using this Website/);
    expect(complianceText).toBeInTheDocument();
    expect(complianceText.tagName).toBe('P');
  });

  it('should render the privacy section heading', () => {
    render(<PrivacyPolicy />);
    
    const privacyHeading = screen.getByText('Your Privacy');
    expect(privacyHeading).toBeInTheDocument();
    expect(privacyHeading.tagName).toBe('H2');
  });

  it('should render the privacy acknowledgment text', () => {
    render(<PrivacyPolicy />);
    
    const privacyAcknowledgment = screen.getByText(/You acknowledge that we may use your personal information and data/);
    expect(privacyAcknowledgment).toBeInTheDocument();
    expect(privacyAcknowledgment.tagName).toBe('P');
  });

  it('should render the reservation of rights section heading', () => {
    render(<PrivacyPolicy />);
    
    const rightsHeading = screen.getByText('Reservation of Rights');
    expect(rightsHeading).toBeInTheDocument();
    expect(rightsHeading.tagName).toBe('H2');
  });

  it('should render the rights reservation text', () => {
    render(<PrivacyPolicy />);
    
    const rightsText = screen.getByText(/We reserve the right to request that you remove all links/);
    expect(rightsText).toBeInTheDocument();
    expect(rightsText.tagName).toBe('P');
  });

  it('should render the removal of links section heading', () => {
    render(<PrivacyPolicy />);
    
    const removalHeading = screen.getByText('Removal of links from our website');
    expect(removalHeading).toBeInTheDocument();
    expect(removalHeading.tagName).toBe('H2');
  });

  it('should render the link removal text', () => {
    render(<PrivacyPolicy />);
    
    const removalText = screen.getByText(/If you find any link on our website that is offensive for any reason/);
    expect(removalText).toBeInTheDocument();
    expect(removalText.tagName).toBe('P');
  });

  it('should render the disclaimers section heading', () => {
    render(<PrivacyPolicy />);
    
    const disclaimersHeading = screen.getByText('Disclaimers and Limitations of Liability');
    expect(disclaimersHeading).toBeInTheDocument();
    expect(disclaimersHeading.tagName).toBe('H2');
  });

  it('should render the information accuracy disclaimer', () => {
    render(<PrivacyPolicy />);
    
    const accuracyDisclaimer = screen.getByText(/We do not ensure that the information on this website is correct/);
    expect(accuracyDisclaimer).toBeInTheDocument();
    expect(accuracyDisclaimer.tagName).toBe('P');
  });

  it('should render the website warranty disclaimer', () => {
    render(<PrivacyPolicy />);
    
    const warrantyDisclaimer = screen.getByText(/This website is provided as is, and we make no express or implied/);
    expect(warrantyDisclaimer).toBeInTheDocument();
    expect(warrantyDisclaimer.tagName).toBe('P');
  });

  it('should render the risk assumption text', () => {
    render(<PrivacyPolicy />);
    
    const riskText = screen.getByText(/Your use of this website is at your own risk and you assume full responsibility/);
    expect(riskText).toBeInTheDocument();
    expect(riskText.tagName).toBe('P');
  });

  it('should render the third-party links disclaimer', () => {
    render(<PrivacyPolicy />);
    
    const thirdPartyDisclaimer = screen.getByText(/Certain links on this website may lead to websites, resources, or tools/);
    expect(thirdPartyDisclaimer).toBeInTheDocument();
    expect(thirdPartyDisclaimer.tagName).toBe('P');
  });

  it('should render the personnel disclaimer', () => {
    render(<PrivacyPolicy />);
    
    const personnelDisclaimer = screen.getByText(/The above disclaimers and limitations of liability shall be applicable/);
    expect(personnelDisclaimer).toBeInTheDocument();
    expect(personnelDisclaimer.tagName).toBe('P');
  });

  it('should render the representations exclusion text', () => {
    render(<PrivacyPolicy />);
    
    const representationsExclusion = screen.getByText(/To the maximum extent permitted by applicable law, we exclude all/);
    expect(representationsExclusion).toBeInTheDocument();
    expect(representationsExclusion.tagName).toBe('P');
  });

  it('should render the free service disclaimer', () => {
    render(<PrivacyPolicy />);
    
    const freeServiceDisclaimer = screen.getByText(/As long as the website and the information and services on the website/);
    expect(freeServiceDisclaimer).toBeInTheDocument();
    expect(freeServiceDisclaimer.tagName).toBe('P');
  });

  it('should render the contact information section', () => {
    render(<PrivacyPolicy />);
    
    const thanksText = screen.getByText('Thanks and Regards,');
    const nameText = screen.getByText('Mrs. Abhilasha Khandare');
    const roleText = screen.getByText('Cofounder & COO');
    const contactText = screen.getByText('M/W : +9186026-44301');

    expect(thanksText).toBeInTheDocument();
    expect(nameText).toBeInTheDocument();
    expect(roleText).toBeInTheDocument();
    expect(contactText).toBeInTheDocument();

    expect(thanksText.tagName).toBe('P');
    expect(nameText.tagName).toBe('P');
    expect(roleText.tagName).toBe('P');
    expect(contactText.tagName).toBe('P');
  });

  it('should have correct CSS class', () => {
    render(<PrivacyPolicy />);
    
    const container = document.querySelector('.Privacy_Main_Div');
    expect(container).toHaveClass('Privacy_Main_Div');
  });

  it('should maintain consistent structure across renders', () => {
    const { rerender } = render(<PrivacyPolicy />);
    
    const firstStructure = document.body.innerHTML;
    
    rerender(<PrivacyPolicy />);
    
    const secondStructure = document.body.innerHTML;
    
    expect(firstStructure).toBe(secondStructure);
  });

  it('should render all sections in correct order', () => {
    render(<PrivacyPolicy />);
    
    const headings = document.querySelectorAll('h1, h2');
    const expectedHeadings = [
      'Terms and conditions',
      'Welcome to Coder Farm Private Limited!',
      'Cookies',
      'License and Intellectual Property Rights',
      'Your Privacy',
      'Reservation of Rights',
      'Removal of links from our website',
      'Disclaimers and Limitations of Liability'
    ];

    expect(headings).toHaveLength(expectedHeadings.length);
    
    expectedHeadings.forEach((expectedHeading, index) => {
      expect(headings[index]).toHaveTextContent(expectedHeading);
    });
  });

  it('should have proper paragraph structure', () => {
    render(<PrivacyPolicy />);
    
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThan(20); // Should have many paragraphs
    
    paragraphs.forEach(paragraph => {
      expect(paragraph.tagName).toBe('P');
      expect(paragraph.textContent?.trim()).toBeTruthy(); // Should not be empty
    });
  });

  it('should contain company website references', () => {
    render(<PrivacyPolicy />);
    
    const websiteRefs = document.querySelectorAll('p');
    let foundWebsiteRef = false;
    
    websiteRefs.forEach(p => {
      if (p.textContent?.includes('www.coderfarm.in')) {
        foundWebsiteRef = true;
      }
    });
    
    expect(foundWebsiteRef).toBe(true);
  });

  it('should contain company name references', () => {
    render(<PrivacyPolicy />);
    
    const companyRefs = document.querySelectorAll('p');
    let foundCompanyRef = false;
    
    companyRefs.forEach(p => {
      if (p.textContent?.includes('Coder Farm Private Limited')) {
        foundCompanyRef = true;
      }
    });
    
    expect(foundCompanyRef).toBe(true);
  });
});
