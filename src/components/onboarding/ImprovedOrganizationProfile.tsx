import { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, SaveIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import QuickSetup from './OrganizationProfileSteps/QuickSetup';
import { PurposeStory } from './OrganizationProfileSteps/PurposeStory';
import { GrowthSuccess } from './OrganizationProfileSteps/GrowthSuccess';
import { CultureValues } from './OrganizationProfileSteps/CultureValues';
import { useAuth } from '@/contexts/AuthContext';
import { universalOnboardingService } from '@/services/universalOnboardingService';

type OrganizationProfileStep = 'quick-setup' | 'purpose-story' | 'growth-success' | 'culture-values';

interface OrganizationFormData {
  // Basic Info
  name: string;
  website: string;
  size: string;
  industry: string;
  
  // Financials
  fundingStatus: string;
  revenueStatus: string;
  
  // Purpose & Story
  originStory: string;
  whatWeDo: string;
  whoWeServe: string[];
  vision: string;
  
  // Growth & Success
  growthPlans: string;
  successMetrics: string[];
  
  // Culture & Values
  coreValuesToday: string[];
  coreValuesAspirations: string[];
  cultureInAction: string[];
}

export function ImprovedOrganizationProfile({ 
  onSubmitSuccess, 
  onFormDataChange,
  initialData 
}: { 
  onSubmitSuccess?: () => void;
  onFormDataChange?: (data: Partial<OrganizationFormData>) => void;
  initialData?: Partial<OrganizationFormData>;
}) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<OrganizationProfileStep>('quick-setup');
  const [formData, setFormData] = useState<OrganizationFormData>({
    name: '',
    website: '',
    size: '',
    industry: '',
    fundingStatus: '',
    revenueStatus: '',
    originStory: '',
    whatWeDo: '',
    whoWeServe: [],
    vision: '',
    growthPlans: '',
    successMetrics: [],
    coreValuesToday: [],
    coreValuesAspirations: [],
    cultureInAction: []
  });

  // UI State
  const [message, setMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Initialize form with initial data if provided
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  // Auto-save form data
  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange(formData);
    }
  }, [formData, onFormDataChange]);

  const updateFormData = (data: Partial<OrganizationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setSaveStatus('saving');
    
    // Simulate auto-save
    setTimeout(() => {
      setSaveStatus('saved');
      setLastSaved(new Date());
    }, 1000);
  };

  const steps = [
    { id: 'quick-setup', label: 'Organization Profile', description: 'Basic company information' },
    { id: 'purpose-story', label: 'Purpose & Story', description: 'Company mission and origin' },
    { id: 'growth-success', label: 'Growth & Success', description: 'Plans and metrics' },
    { id: 'culture-values', label: 'Culture & Values', description: 'Company culture and values' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const goToNextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

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

  const validateCurrentStep = (): boolean => {
    const newErrors: string[] = [];
    
    switch (currentStep) {
      case 'quick-setup':
        if (!formData.name.trim()) newErrors.push('Organization name is required');
        if (!formData.industry.trim()) newErrors.push('Industry is required');
        break;
      case 'purpose-story':
        if (!formData.whatWeDo.trim()) newErrors.push('Description of what you do is required');
        if (!formData.vision.trim()) newErrors.push('Company vision is required');
        break;
      case 'growth-success':
        if (!formData.growthPlans.trim()) newErrors.push('Growth plans are required');
        break;
      case 'culture-values':
        if (formData.coreValuesToday.length === 0) newErrors.push('At least one core value is required');
        break;
    }
    
    if (newErrors.length > 0) {
      setMessage({ type: 'error', text: `Please fix: ${newErrors.join(', ')}` });
      return false;
    }
    
    return true;
  };

  const fillDemoData = () => {
    const demoData: OrganizationFormData = {
      name: 'TechStart Innovations',
      website: 'https://techstart-innovations.com',
      size: '10-50',
      industry: 'Technology',
      fundingStatus: 'Series A',
      revenueStatus: 'Generating Revenue',
      originStory: 'Founded in 2022 by a team of ex-Google engineers who wanted to democratize AI technology for small businesses.',
      whatWeDo: 'We provide AI-powered business intelligence solutions that help small and medium businesses make data-driven decisions.',
      whoWeServe: ['E-commerce businesses', 'SaaS companies', 'Retail chains'],
      vision: 'To make advanced AI technology accessible to every business, regardless of size.',
      growthPlans: 'Expand to European markets in Q2 2024, launch enterprise product in Q3.',
      successMetrics: ['Customer acquisition rate', 'Monthly recurring revenue', 'Customer satisfaction score'],
      coreValuesToday: ['Innovation', 'Customer focus', 'Transparency'],
      coreValuesAspirations: ['Industry leadership', 'Global impact', 'Sustainability'],
      cultureInAction: ['Weekly hackathons', 'Monthly team retreats', 'Open feedback culture']
    };

    setFormData(demoData);
    setMessage({ type: 'success', text: '🎯 Demo data filled successfully! All fields are now populated with sample data.' });
    
    // Auto-hide message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const clearDemoData = () => {
    const emptyData: OrganizationFormData = {
      name: '',
      website: '',
      size: '',
      industry: '',
      fundingStatus: '',
      revenueStatus: '',
      originStory: '',
      whatWeDo: '',
      whoWeServe: [],
      vision: '',
      growthPlans: '',
      successMetrics: [],
      coreValuesToday: [],
      coreValuesAspirations: [],
      cultureInAction: []
    };

    setFormData(emptyData);
    setMessage({ type: 'info', text: '🗑️ All form data has been cleared. You can now start fresh or fill demo data again.' });
    
    // Auto-hide message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      setMessage({ type: 'error', text: 'Please log in before submitting your organization.' });
      return;
    }

    if (!validateCurrentStep()) {
      return;
    }

    console.log('Submitting organization data:', formData);
    setIsSubmitting(true);
    
    try {
      // Transform form data to match database schema
      const organizationData = {
        name: formData.name,
        website: formData.website,
        size: formData.size, // Maps to organization_size in DB
        industry: formData.industry,
        fundingStatus: formData.fundingStatus, // Maps to current_funding_status in DB
        revenueStatus: formData.revenueStatus,
        originStory: formData.originStory,
        whatWeDo: formData.whatWeDo, // Maps to description in DB
        whoWeServe: formData.whoWeServe,
        vision: formData.vision,
        growthPlans: formData.growthPlans,
        successMetrics: formData.successMetrics,
        coreValuesToday: formData.coreValuesToday,
        coreValuesAspirations: formData.coreValuesAspirations,
        cultureInAction: formData.cultureInAction
      };

      const result = await universalOnboardingService.createOrganization(organizationData, user.id);
      
      if (result.success) {
        setMessage({ type: 'success', text: '🎉 Organization created successfully! Moving to team onboarding...' });
        console.log('✅ Organization created:', result.data);
        
        // Call onSubmitSuccess after a short delay to show the success message
        setTimeout(() => {
          if (onSubmitSuccess) onSubmitSuccess();
        }, 2000);
        
      } else {
        setMessage({ type: 'error', text: `❌ Failed to create organization: ${result.error}` });
        console.error('❌ Organization creation failed:', result.error);
      }
    } catch (err) {
      console.error('Organization creation error:', err);
      setMessage({ type: 'error', text: '❌ An error occurred while creating the organization. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSaveStatus = () => {
    if (!saveStatus) return null;

    const statusConfig = {
      saving: { text: 'Saving...', color: 'text-yellow-400', icon: '⏳' },
      saved: { text: 'All changes saved', color: 'text-green-400', icon: '✅' },
      error: { text: 'Save failed', color: 'text-red-400', icon: '❌' }
    };

    const config = statusConfig[saveStatus];
    
    return (
      <div className={`text-sm ${config.color} flex items-center gap-2`}>
        <span>{config.icon}</span>
        <span>{config.text}</span>
        {lastSaved && saveStatus === 'saved' && (
          <span className="text-gray-400">
            at {lastSaved.toLocaleTimeString()}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="w-full m-0 p-0">
      {/* Header with Save Status */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Organization Profile</h2>
        {renderSaveStatus()}
      </div>

      {/* Demo Data Buttons */}
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
            : message.type === 'error'
            ? 'bg-red-600/20 border-red-600/30 text-red-400'
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

      {/* Progress Bar */}
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
            {steps.map((step, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-full flex items-center justify-center mx-1 ${
                  currentStepIndex > index
                    ? 'bg-green-500 text-white'
                    : currentStepIndex === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
                title={`${step.label}: ${step.description}`}
              >
                {currentStepIndex > index ? '✓' : <span className="text-xs">{index + 1}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
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

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6">
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
            icon={isSubmitting ? <SaveIcon size={16} /> : <CheckCircleIcon size={16} />}
            iconPosition="right"
            className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Organization...' : 'Create Organization'}
          </Button>
        )}
      </div>
    </div>
  );
}
