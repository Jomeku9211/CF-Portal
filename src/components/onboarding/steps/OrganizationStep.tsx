
import { InputField, SelectField } from '../../common';

interface OrganizationStepProps {
  formData: any;
  updateFormData: (section: keyof any, data: any) => void;
}

export function OrganizationStep({ formData, updateFormData }: OrganizationStepProps) {
  // Add null safety checks
  const organization = formData?.organization || {};
  
  const organizationOptions = [
    { value: 'startup', label: 'Startup (0-50 employees)', description: 'Early-stage company looking to scale' },
    { value: 'scaleup', label: 'Scaleup (50-500 employees)', description: 'Growing company with established product-market fit' },
    { value: 'enterprise', label: 'Enterprise (500+ employees)', description: 'Large established company' }
  ];

  const teamSizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '200+', label: '200+ employees' }
  ];

  const workingStyleOptions = [
    { value: 'remote', label: 'Remote-first', description: 'Team works primarily from home' },
    { value: 'hybrid', label: 'Hybrid', description: 'Mix of office and remote work' },
    { value: 'office', label: 'Office-first', description: 'Team works primarily from office' }
  ];

  const cultureOptions = [
    { value: 'collaborative', label: 'Collaborative', description: 'Team-oriented, open communication' },
    { value: 'autonomous', label: 'Autonomous', description: 'Self-directed, independent work' },
    { value: 'hierarchical', label: 'Hierarchical', description: 'Clear structure and reporting lines' },
    { value: 'flat', label: 'Flat', description: 'Minimal hierarchy, equal decision-making' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Organization Profile
        </h2>
        <p className="text-gray-300">
          Tell us about your organization to help candidates understand your culture and values.
        </p>
      </div>

      <InputField
        label="Organization Name"
        value={organization.name || ''}
        onChange={(value) => updateFormData('organization', { name: value })}
        placeholder="Enter your organization name"
        required
      />

      <InputField
        label="Organization Purpose"
        value={organization.purpose || ''}
        onChange={(value) => updateFormData('organization', { purpose: value })}
        placeholder="What is your organization's mission?"
        required
      />

      <SelectField
        label="Organization Type"
        options={organizationOptions}
        value={organization.organizationType || ''}
        onChange={(value) => updateFormData('organization', { organizationType: value })}
        placeholder="Select organization type"
        required
      />

      <SelectField
        label="Team Size"
        options={teamSizeOptions}
        value={organization.teamSize || ''}
        onChange={(value) => updateFormData('organization', { teamSize: value })}
        placeholder="Select team size"
        required
      />

      <SelectField
        label="Working Style"
        options={workingStyleOptions}
        value={organization.workingStyle || ''}
        onChange={(value) => updateFormData('organization', { workingStyle: value })}
        placeholder="Select working style"
        required
      />

      <SelectField
        label="Company Culture"
        options={cultureOptions}
        value={organization.culture || ''}
        onChange={(value) => updateFormData('organization', { culture: value })}
        placeholder="Select company culture"
        required
      />
    </div>
  );
}
