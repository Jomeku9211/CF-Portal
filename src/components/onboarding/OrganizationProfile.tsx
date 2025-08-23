import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import QuickSetup from './OrganizationProfileSteps/QuickSetup';
import { PurposeStory } from './OrganizationProfileSteps/PurposeStory';
import { GrowthSuccess } from './OrganizationProfileSteps/GrowthSuccess';
import { CultureValues } from './OrganizationProfileSteps/CultureValues';
import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '@/config/supabase'; // Unused - keeping for future use
import { universalOnboardingService } from '@/services/universalOnboardingService';

type OrganizationProfileStep = 'quick-setup' | 'purpose-story' | 'growth-success' | 'culture-values';

export function OrganizationProfile({ onSubmitSuccess }: { onSubmitSuccess?: () => void }) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<OrganizationProfileStep>('quick-setup');
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    size: '',
    fundingStatus: '',
    industry: '',
    companyFunction: 'Idea Stage',
    revenueStatus: '',
    keyInvestors: [] as string[],
    originStory: '',
    whatWeDo: '',
    whoWeServe: [] as string[],
    vision: '',
    whyJoinUs: '',
    growthPlans: '',
    successMetrics: [] as string[],
    coreValuesToday: [] as string[],
    coreValuesAspirations: [] as string[],
    cultureInAction: [] as string[]
  });
  const [message, setMessage] = useState<{ type: 'success' | 'info'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const steps = [
    { id: 'quick-setup', label: 'Organisation Profile' },
    { id: 'purpose-story', label: 'Purpose & Story' },
    { id: 'growth-success', label: 'Growth & Success' },
    { id: 'culture-values', label: 'Culture & Values' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as OrganizationProfileStep);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as OrganizationProfileStep);
      window.scrollTo(0, 0);
    }
  };

  const fillDemoData = () => {
    const demoData = {
      name: 'TechStart Innovations',
      website: 'https://techstart-innovations.com',
      size: '10-50',
      fundingStatus: 'Series A',
      industry: 'Technology',
      companyFunction: 'Growth Stage',
      revenueStatus: 'Generating Revenue',
      keyInvestors: ['Sequoia Capital', 'Andreessen Horowitz', 'Y Combinator'],
      originStory: 'Founded in 2022 by a team of ex-Google engineers who wanted to democratize AI technology for small businesses. We started in a garage in Palo Alto and have grown to serve over 500 clients worldwide.',
      whatWeDo: 'We provide AI-powered business intelligence solutions that help small and medium businesses make data-driven decisions. Our platform includes predictive analytics, customer insights, and automated reporting.',
      whoWeServe: ['E-commerce businesses', 'SaaS companies', 'Retail chains', 'Service providers'],
      vision: 'To make advanced AI technology accessible to every business, regardless of size, enabling them to compete with industry giants.',
      whyJoinUs: 'Join a mission-driven team that\'s revolutionizing how businesses use AI. We offer competitive salaries, equity, flexible work arrangements, and the opportunity to work on cutting-edge technology.',
      growthPlans: 'Expand to European markets in Q2 2024, launch enterprise product in Q3, and reach 1000+ clients by end of year. Planning for Series B funding in Q4.',
      successMetrics: ['Customer acquisition rate', 'Monthly recurring revenue', 'Customer satisfaction score', 'Product adoption rate'],
      coreValuesToday: ['Innovation', 'Customer focus', 'Transparency', 'Continuous learning'],
      coreValuesAspirations: ['Industry leadership', 'Global impact', 'Sustainability', 'Diversity & inclusion'],
      cultureInAction: ['Weekly hackathons', 'Monthly team retreats', 'Open feedback culture', 'Professional development budget']
    };

    setFormData(demoData);
    setMessage({ type: 'success', text: '🎯 Demo data filled successfully! All fields are now populated with sample data.' });
    console.log('🎯 Demo data filled:', demoData);
    
    // Auto-hide message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const clearDemoData = () => {
    const emptyData = {
      name: '',
      website: '',
      size: '',
      fundingStatus: '',
      industry: '',
      companyFunction: 'Idea Stage',
      revenueStatus: '',
      keyInvestors: [] as string[],
      originStory: '',
      whatWeDo: '',
      whoWeServe: [] as string[],
      vision: '',
      whyJoinUs: '',
      growthPlans: '',
      successMetrics: [] as string[],
      coreValuesToday: [] as string[],
      coreValuesAspirations: [] as string[],
      cultureInAction: [] as string[]
    };

    setFormData(emptyData);
    setMessage({ type: 'info', text: '🗑️ All form data has been cleared. You can now start fresh or fill demo data again.' });
    console.log('🗑️ Demo data cleared');
    
    // Auto-hide message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      setMessage({ type: 'info', text: 'Please log in before submitting your organization.' });
      return;
    }

    console.log('User ID for creator:', user?.id);
    console.log('User object:', user);
    console.log('Complete formData:', formData);
    
    setIsSubmitting(true);
    try {
      const result = await universalOnboardingService.createOrganization(formData, user.id);
      
      if (result.success) {
        setMessage({ type: 'success', text: '🎉 Organization created successfully! Moving to team onboarding...' });
        console.log('✅ Organization created:', result.data);
        
        // Call onSubmitSuccess after a short delay to show the success message
        setTimeout(() => {
          if (onSubmitSuccess) onSubmitSuccess();
        }, 2000);
        
      } else {
        setMessage({ type: 'info', text: `❌ Failed to create organization: ${result.error}` });
        console.error('❌ Organization creation failed:', result.error);
      }
    } catch (err) {
      console.error('Organization creation error:', err);
      setMessage({ type: 'info', text: '❌ An error occurred while creating the organization. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full m-0 p-0">
      {/* Demo Data Button */}
      <div className="mb-4">
        <div className="text-right mb-2">
          <span className="text-sm text-gray-400">
            💡 Testing? Use these buttons to quickly populate or clear the form
          </span>
        </div>
        <div className="flex justify-end">
          <button
            onClick={fillDemoData}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            🎯 Fill Demo Data
          </button>
          <button
            onClick={clearDemoData}
            className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            🗑️ Clear Data
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-600/20 border-green-600/30 text-green-400' 
            : 'bg-blue-600/20 border-blue-600/30 text-blue-400'
        }`}>
          <div className="flex items-center justify-between">
            <span>{message.text}</span>
            <button 
              onClick={() => setMessage(null)}
              className="text-gray-400 hover:text-white ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-blue-400">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <div className="ml-4 w-32 bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-full flex items-center justify-center mx-1 ${
                  currentStepIndex > index
                    ? 'bg-green-500 text-white'
                    : currentStepIndex === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {currentStepIndex > index ? '✓' : <span className="text-xs">{index + 1}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-gradient-to-b from-[#1e293b] to-[#111827] rounded-xl p-6 md:p-8 mb-0 shadow-lg transition-all duration-300 ease-in-out hover:shadow-[#3b82f6]/10">
        {currentStep === 'quick-setup' && (
          <QuickSetup formData={formData} updateFormData={updateFormData} />
        )}
        {currentStep === 'purpose-story' && (
          <PurposeStory formData={formData} updateFormData={updateFormData} />
        )}
        {currentStep === 'growth-success' && (
          <GrowthSuccess formData={formData} updateFormData={updateFormData} />
        )}
        {currentStep === 'culture-values' && (
          <CultureValues formData={formData} updateFormData={updateFormData} />
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStepIndex === 0}
          icon={<ArrowLeftIcon size={16} />}
          iconPosition="left"
          className="border-[#374151] text-white hover:bg-[#374151] transition-all duration-200"
        >
          Back
        </Button>

        {currentStepIndex < steps.length - 1 ? (
          <Button
            onClick={goToNextStep}
            icon={<ArrowRightIcon size={16} />}
            iconPosition="right"
            className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            icon={<ArrowRightIcon size={16} />}
            iconPosition="right"
            className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        )}
      </div>
    </div>
  );
}


