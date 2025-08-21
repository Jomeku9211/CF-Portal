
import { InputField, SelectField } from '../../common';

interface OrganizationBasicInfoStepProps {
  formData: any;
  updateFormData: (section: keyof any, data: any) => void;
}

export function OrganizationBasicInfoStep({ formData, updateFormData }: OrganizationBasicInfoStepProps) {
  // Add null safety checks
  const basicInfo = formData?.organizationOnboarding?.basicInfo || {};
  
  const industryOptions = [
    { value: 'technology', label: 'Technology', description: 'Software, hardware, IT services' },
    { value: 'healthcare', label: 'Healthcare', description: 'Medical, biotech, health services' },
    { value: 'finance', label: 'Finance', description: 'Banking, fintech, insurance' },
    { value: 'education', label: 'Education', description: 'Edtech, training, learning platforms' },
    { value: 'ecommerce', label: 'E-commerce', description: 'Online retail, marketplaces' },
    { value: 'manufacturing', label: 'Manufacturing', description: 'Industrial, production, logistics' },
    { value: 'consulting', label: 'Consulting', description: 'Business, strategy, advisory' },
    { value: 'other', label: 'Other', description: 'Other industries' }
  ];

  const sizeOptions = [
    { value: '1-10', label: '1-10 employees', description: 'Early-stage startup' },
    { value: '11-50', label: '11-50 employees', description: 'Growing startup' },
    { value: '51-200', label: '51-200 employees', description: 'Scaleup company' },
    { value: '201-1000', label: '201-1000 employees', description: 'Mid-size company' },
    { value: '1000+', label: '1000+ employees', description: 'Large enterprise' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Basic Information
        </h2>
        <p className="text-gray-300">
          Let's start with the fundamental details about your organization.
        </p>
      </div>

      <InputField
        label="Organization Name"
        value={basicInfo.name || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          basicInfo: { ...basicInfo, name: value } 
        })}
        placeholder="Enter your organization name"
        required
      />

      <SelectField
        label="Industry"
        options={industryOptions}
        value={basicInfo.industry || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          basicInfo: { ...basicInfo, industry: value } 
        })}
        placeholder="Select your industry"
        required
      />

      <InputField
        label="Website"
        type="url"
        value={basicInfo.website || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          basicInfo: { ...basicInfo, website: value } 
        })}
        placeholder="https://yourcompany.com"
        required
      />

      <SelectField
        label="Company Size"
        options={sizeOptions}
        value={basicInfo.size || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          basicInfo: { ...basicInfo, size: value } 
        })}
        placeholder="Select company size"
        required
      />
    </div>
  );
}
