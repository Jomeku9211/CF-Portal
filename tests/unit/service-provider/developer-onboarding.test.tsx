import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DeveloperOnboardingPage } from '@/modules/service-provider/components/developer/DeveloperOnboarding';
import { OnboardingContainer } from '@/modules/service-provider/components/developer/OnboardingContainer';
import { OnboardingStepper } from '@/modules/service-provider/components/developer/OnboardingStepper';
import { PersonalInfoStep } from '@/modules/service-provider/components/developer/steps/PersonalInfoStep';
import { RoleSelectionStep } from '@/modules/service-provider/components/developer/steps/RoleSelectionStep';
import { SkillsStep } from '@/modules/service-provider/components/developer/steps/SkillsStep';
import { WorkPreferencesStep } from '@/modules/service-provider/components/developer/steps/WorkPreferencesStep';
import { SoftSkillsStep } from '@/modules/service-provider/components/developer/steps/SoftSkillsStep';
import { VerificationStep } from '@/modules/service-provider/components/developer/steps/VerificationStep';
import { FinalStep } from '@/modules/service-provider/components/developer/steps/FinalStep';

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    setValue: jest.fn(),
    register: jest.fn(),
    handleSubmit: (fn: any) => fn,
    formState: { errors: {} },
    watch: jest.fn(() => []),
    getValues: jest.fn(() => ({})),
    setError: jest.fn(),
    clearErrors: jest.fn(),
  }),
  useFormContext: () => ({
    control: {},
    setValue: jest.fn(),
    register: jest.fn(),
    formState: { errors: {} },
    watch: jest.fn(() => []),
    getValues: jest.fn(() => ({})),
  }),
  useWatch: () => [],
  FormProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Developer Onboarding Components', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  describe('DeveloperOnboardingPage', () => {
    test('renders developer onboarding page with correct title', () => {
      renderWithRouter(<DeveloperOnboardingPage />);
      
      expect(screen.getByText('Complete Your Developer Profile')).toBeInTheDocument();
      expect(screen.getByText("Let's set up your profile to match you with the perfect opportunities. This will help us understand your skills, preferences, and work style.")).toBeInTheDocument();
    });

    test('renders OnboardingContainer component', () => {
      renderWithRouter(<DeveloperOnboardingPage />);
      
      expect(screen.getByText('Complete Your Developer Profile')).toBeInTheDocument();
    });
  });

  describe('OnboardingStepper', () => {
    test('renders all 7 steps with correct titles', () => {
      render(<OnboardingStepper currentStep={1} totalSteps={7} />);
      
      expect(screen.getByText('Personal Info')).toBeInTheDocument();
      expect(screen.getByText('Role Selection')).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('Work Preferences')).toBeInTheDocument();
      expect(screen.getByText('Soft Skills')).toBeInTheDocument();
      expect(screen.getByText('Verification')).toBeInTheDocument();
      expect(screen.getByText('Final')).toBeInTheDocument();
    });

    test('shows current step as active', () => {
      render(<OnboardingStepper currentStep={3} totalSteps={7} />);
      
      const skillsStep = screen.getByText('Skills').closest('div')?.parentElement;
      expect(skillsStep).toHaveClass('bg-sanjuan-base');
    });

    test('shows completed steps with check icon', () => {
      render(<OnboardingStepper currentStep={4} totalSteps={7} />);
      
      // Steps 1-3 should be completed
      expect(screen.getByText('Personal Info')).toBeInTheDocument();
      expect(screen.getByText('Role Selection')).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
    });

    test('shows step descriptions', () => {
      render(<OnboardingStepper currentStep={1} totalSteps={7} />);
      
      expect(screen.getByText('Basic information')).toBeInTheDocument();
      expect(screen.getByText('Work preferences')).toBeInTheDocument();
      expect(screen.getByText('Technical expertise')).toBeInTheDocument();
    });
  });

  describe('PersonalInfoStep (Step 1)', () => {
    test('renders personal information form', () => {
      render(<PersonalInfoStep />);
      
      expect(screen.getByText('Personal Information')).toBeInTheDocument();
      expect(screen.getByText("Tell us a bit about yourself. This information will be used to create your profile.")).toBeInTheDocument();
    });

    test('shows all required personal information fields', () => {
      render(<PersonalInfoStep />);
      
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    });

    test('shows location fields with dropdown options', () => {
      render(<PersonalInfoStep />);
      
      expect(screen.getByLabelText('Country')).toBeInTheDocument();
      expect(screen.getByLabelText('State/Region')).toBeInTheDocument();
      expect(screen.getByLabelText('City')).toBeInTheDocument();
    });

    test('shows profile picture upload field', () => {
      render(<PersonalInfoStep />);
      
      expect(screen.getByText('Profile Picture')).toBeInTheDocument();
    });

    test('includes country options', () => {
      render(<PersonalInfoStep />);
      
      const countrySelect = screen.getByLabelText('Country');
      expect(countrySelect).toBeInTheDocument();
      
      // Check for some country options
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('India')).toBeInTheDocument();
      expect(screen.getByText('Germany')).toBeInTheDocument();
    });
  });

  describe('RoleSelectionStep (Step 2)', () => {
    test('renders role selection form', () => {
      render(<RoleSelectionStep />);
      
      expect(screen.getByText('Role Selection')).toBeInTheDocument();
      expect(screen.getByText("Tell us about the type of work you're looking for and your preferred role.")).toBeInTheDocument();
    });

    test('shows work types with multi-select options', () => {
      render(<RoleSelectionStep />);
      
      expect(screen.getByText("What types of work are you interested in?")).toBeInTheDocument();
      expect(screen.getByText('Full-time')).toBeInTheDocument();
      expect(screen.getByText('Part-time')).toBeInTheDocument();
      expect(screen.getByText('Contract')).toBeInTheDocument();
      expect(screen.getByText('Freelance')).toBeInTheDocument();
      expect(screen.getByText('Internship')).toBeInTheDocument();
    });

    test('shows job role selection with comprehensive options', () => {
      render(<RoleSelectionStep />);
      
      expect(screen.getByText("What's your primary job role?")).toBeInTheDocument();
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
      expect(screen.getByText('Backend Developer')).toBeInTheDocument();
      expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
      expect(screen.getByText('Mobile Developer')).toBeInTheDocument();
      expect(screen.getByText('DevOps Engineer')).toBeInTheDocument();
      expect(screen.getByText('Data Scientist')).toBeInTheDocument();
      expect(screen.getByText('Machine Learning Engineer')).toBeInTheDocument();
      expect(screen.getByText('UI/UX Designer')).toBeInTheDocument();
      expect(screen.getByText('Product Manager')).toBeInTheDocument();
      expect(screen.getByText('Other')).toBeInTheDocument();
    });

    test('shows other job role specification field', () => {
      render(<RoleSelectionStep />);
      
      expect(screen.getByText("If you selected 'Other', please specify:")).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Describe your role')).toBeInTheDocument();
    });
  });

  describe('SkillsStep (Step 3)', () => {
    test('renders skills and tech stack form', () => {
      render(<SkillsStep />);
      
      expect(screen.getByText('Skills & Tech Stack')).toBeInTheDocument();
      expect(screen.getByText("Let us know about your technical skills and proficiency levels.")).toBeInTheDocument();
    });

    test('shows skills search functionality', () => {
      render(<SkillsStep />);
      
      expect(screen.getByPlaceholderText('Search for skills...')).toBeInTheDocument();
      expect(screen.getByText('What are your primary technical skills?')).toBeInTheDocument();
    });

    test('includes comprehensive technical skills list', () => {
      render(<SkillsStep />);
      
      // Check for various technology categories
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.getByText('Java')).toBeInTheDocument();
      expect(screen.getByText('AWS')).toBeInTheDocument();
      expect(screen.getByText('Docker')).toBeInTheDocument();
    });

    test('shows skill level selection for each skill', () => {
      render(<SkillsStep />);
      
      expect(screen.getByText('Select your skill level for each chosen skill:')).toBeInTheDocument();
      
      // Check for skill level options
      expect(screen.getByText('Beginner')).toBeInTheDocument();
      expect(screen.getByText('Intermediate')).toBeInTheDocument();
      expect(screen.getByText('Advanced')).toBeInTheDocument();
      expect(screen.getByText('Expert')).toBeInTheDocument();
    });

    test('allows adding and removing skills', () => {
      render(<SkillsStep />);
      
      const searchInput = screen.getByPlaceholderText('Search for skills...');
      expect(searchInput).toBeInTheDocument();
      
      // Skills can be added and removed
      expect(screen.getByText('What are your primary technical skills?')).toBeInTheDocument();
    });
  });

  describe('WorkPreferencesStep (Step 4)', () => {
    test('renders work preferences form', () => {
      render(<WorkPreferencesStep />);
      
      expect(screen.getByText('Work Preferences')).toBeInTheDocument();
      expect(screen.getByText("Tell us about your preferred work environment and team dynamics.")).toBeInTheDocument();
    });

    test('shows timezone overlap preferences', () => {
      render(<WorkPreferencesStep />);
      
      expect(screen.getByText("What's your preferred timezone overlap with US teams?")).toBeInTheDocument();
      expect(screen.getByText('4-6 hours overlap with US timezone')).toBeInTheDocument();
      expect(screen.getByText('6-8 hours overlap with US timezone')).toBeInTheDocument();
      expect(screen.getByText('8-10 hours overlap with US timezone')).toBeInTheDocument();
      expect(screen.getByText('Full overlap with US timezone')).toBeInTheDocument();
    });

    test('shows team size preferences', () => {
      render(<WorkPreferencesStep />);
      
      expect(screen.getByText('What team size do you prefer working with?')).toBeInTheDocument();
      expect(screen.getByText('1-5 people')).toBeInTheDocument();
      expect(screen.getByText('6-15 people')).toBeInTheDocument();
      expect(screen.getByText('16-50 people')).toBeInTheDocument();
      expect(screen.getByText('50+ people')).toBeInTheDocument();
    });

    test('shows company stage preferences', () => {
      render(<WorkPreferencesStep />);
      
      expect(screen.getByText('What company stage interests you most?')).toBeInTheDocument();
      expect(screen.getByText('Startup (0-5 years)')).toBeInTheDocument();
      expect(screen.getByText('Growth stage (5-10 years)')).toBeInTheDocument();
      expect(screen.getByText('Established company (10+ years)')).toBeInTheDocument();
      expect(screen.getByText('Enterprise company')).toBeInTheDocument();
    });

    test('shows work style preferences with multi-select', () => {
      render(<WorkPreferencesStep />);
      
      expect(screen.getByText('What work styles do you prefer?')).toBeInTheDocument();
      expect(screen.getByText('Collaborative team environment')).toBeInTheDocument();
      expect(screen.getByText('Independent work style')).toBeInTheDocument();
      expect(screen.getByText('Mentoring and teaching others')).toBeInTheDocument();
      expect(screen.getByText('Continuous learning and growth')).toBeInTheDocument();
      expect(screen.getByText('Fast-paced, dynamic environment')).toBeInTheDocument();
      expect(screen.getByText('Structured, process-driven approach')).toBeInTheDocument();
    });
  });

  describe('SoftSkillsStep (Step 5)', () => {
    test('renders soft skills and personal attributes form', () => {
      render(<SoftSkillsStep />);
      
      expect(screen.getByText('Soft Skills & Personal Attributes')).toBeInTheDocument();
      expect(screen.getByText("Tell us about your interpersonal skills and work approach.")).toBeInTheDocument();
    });

    test('shows communication skills options', () => {
      render(<SoftSkillsStep />);
      
      expect(screen.getByText('Communication Skills')).toBeInTheDocument();
      expect(screen.getByText('Excellent written communication')).toBeInTheDocument();
      expect(screen.getByText('Strong verbal communication')).toBeInTheDocument();
      expect(screen.getByText('Presentation skills')).toBeInTheDocument();
      expect(screen.getByText('Technical documentation')).toBeInTheDocument();
      expect(screen.getByText('Client interaction')).toBeInTheDocument();
    });

    test('shows ownership and leadership skills', () => {
      render(<SoftSkillsStep />);
      
      expect(screen.getByText('Ownership & Leadership')).toBeInTheDocument();
      expect(screen.getByText('Project management')).toBeInTheDocument();
      expect(screen.getByText('Decision making')).toBeInTheDocument();
      expect(screen.getByText('Problem solving')).toBeInTheDocument();
      expect(screen.getByText('Taking initiative')).toBeInTheDocument();
      expect(screen.getByText('Accountability')).toBeInTheDocument();
    });

    test('shows collaboration and teamwork skills', () => {
      render(<SoftSkillsStep />);
      
      expect(screen.getByText('Collaboration & Teamwork')).toBeInTheDocument();
      expect(screen.getByText('Team player')).toBeInTheDocument();
      expect(screen.getByText('Conflict resolution')).toBeInTheDocument();
      expect(screen.getByText('Mentoring others')).toBeInTheDocument();
      expect(screen.getByText('Cross-functional collaboration')).toBeInTheDocument();
      expect(screen.getByText('Remote collaboration')).toBeInTheDocument();
    });

    test('shows problem solving approach options', () => {
      render(<SoftSkillsStep />);
      
      expect(screen.getByText('Problem Solving Approach')).toBeInTheDocument();
      expect(screen.getByText('Analytical thinking')).toBeInTheDocument();
      expect(screen.getByText('Creative problem solving')).toBeInTheDocument();
      expect(screen.getByText('Systematic approach')).toBeInTheDocument();
      expect(screen.getByText('Research and investigation')).toBeInTheDocument();
      expect(screen.getByText('Testing and validation')).toBeInTheDocument();
    });

    test('shows learning and growth mindset options', () => {
      render(<SoftSkillsStep />);
      
      expect(screen.getByText('Learning & Growth Mindset')).toBeInTheDocument();
      expect(screen.getByText('Continuous learning mindset')).toBeInTheDocument();
      expect(screen.getByText('Adaptability to new technologies')).toBeInTheDocument();
      expect(screen.getByText('Intellectual curiosity')).toBeInTheDocument();
      expect(screen.getByText('Open to feedback')).toBeInTheDocument();
      expect(screen.getByText('Knowledge sharing')).toBeInTheDocument();
    });
  });

  describe('VerificationStep (Step 6)', () => {
    test('renders verification and profiles form', () => {
      render(<VerificationStep />);
      
      expect(screen.getByText('Verification & Profiles')).toBeInTheDocument();
      expect(screen.getByText("Help us verify your identity and connect your professional profiles.")).toBeInTheDocument();
    });

    test('shows government ID upload field', () => {
      render(<VerificationStep />);
      
      expect(screen.getByText("Government ID (Passport, Driver's License, or National ID)")).toBeInTheDocument();
    });

    test('shows resume/CV upload field', () => {
      render(<VerificationStep />);
      
      expect(screen.getByText('Resume/CV')).toBeInTheDocument();
    });

    test('shows LinkedIn profile URL field', () => {
      render(<VerificationStep />);
      
      expect(screen.getByText('LinkedIn Profile URL')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('https://linkedin.com/in/yourprofile')).toBeInTheDocument();
    });

    test('shows GitHub profile URL field', () => {
      render(<VerificationStep />);
      
      expect(screen.getByText('GitHub Profile URL')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('https://github.com/yourusername')).toBeInTheDocument();
    });

    test('shows portfolio website field (optional)', () => {
      render(<VerificationStep />);
      
      expect(screen.getByText('Portfolio Website (if any)')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('https://yourportfolio.com')).toBeInTheDocument();
    });
  });

  describe('FinalStep (Step 7)', () => {
    test('renders final details form', () => {
      render(<FinalStep />);
      
      expect(screen.getByText('Final Details')).toBeInTheDocument();
      expect(screen.getByText("Almost done! Just a few more details to complete your profile.")).toBeInTheDocument();
    });

    test('shows availability selection', () => {
      render(<FinalStep />);
      
      expect(screen.getByText('When are you available to start?')).toBeInTheDocument();
      expect(screen.getByText('Immediately available')).toBeInTheDocument();
      expect(screen.getByText('Available in 2 weeks')).toBeInTheDocument();
      expect(screen.getByText('Available in 1 month')).toBeInTheDocument();
      expect(screen.getByText('Available in 3 months')).toBeInTheDocument();
      expect(screen.getByText('Flexible start date')).toBeInTheDocument();
    });

    test('shows salary expectation field', () => {
      render(<FinalStep />);
      
      expect(screen.getByText('Salary Expectation (per year)')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('e.g., 80000')).toBeInTheDocument();
    });

    test('shows currency selection', () => {
      render(<FinalStep />);
      
      expect(screen.getByText('Currency')).toBeInTheDocument();
      expect(screen.getByText('USD ($)')).toBeInTheDocument();
      expect(screen.getByText('EUR (€)')).toBeInTheDocument();
      expect(screen.getByText('GBP (£)')).toBeInTheDocument();
      expect(screen.getByText('INR (₹)')).toBeInTheDocument();
      expect(screen.getByText('CAD (C$)')).toBeInTheDocument();
    });

    test('shows profile completion message', () => {
      render(<FinalStep />);
      
      expect(screen.getByText('Profile Completion')).toBeInTheDocument();
      expect(screen.getByText("You're almost there! Review all the information you've provided and click 'Complete' to finish your developer profile setup.")).toBeInTheDocument();
    });
  });

  describe('OnboardingContainer', () => {
    test('renders onboarding container with stepper', () => {
      render(<OnboardingContainer />);
      
      expect(screen.getByText('Personal Information')).toBeInTheDocument();
    });

    test('shows navigation buttons', () => {
      render(<OnboardingContainer />);
      
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    test('shows complete button on final step', () => {
      render(<OnboardingContainer />);
      
      // Navigate to final step
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      fireEvent.click(screen.getByText('Continue')); // Step 2
      fireEvent.click(screen.getByText('Continue')); // Step 3
      fireEvent.click(screen.getByText('Continue')); // Step 4
      fireEvent.click(screen.getByText('Continue')); // Step 5
      fireEvent.click(screen.getByText('Continue')); // Step 6
      
      expect(screen.getByText('Complete')).toBeInTheDocument();
    });
  });
});
