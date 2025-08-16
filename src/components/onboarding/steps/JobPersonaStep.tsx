
import { InputField, MultiLineListInput, SelectField } from '../../common';

interface JobPersonaStepProps {
  formData: any;
  updateFormData: (section: keyof any, data: any) => void;
}

export function JobPersonaStep({ formData, updateFormData }: JobPersonaStepProps) {
  const experienceOptions = [
    { value: 'entry', label: 'Entry Level (0-2 years)', description: 'Recent graduates or early career professionals' },
    { value: 'mid', label: 'Mid Level (3-7 years)', description: 'Experienced professionals with proven track record' },
    { value: 'senior', label: 'Senior Level (8+ years)', description: 'Seasoned professionals with leadership experience' }
  ];

  const workStyleOptions = [
    { value: 'collaborative', label: 'Collaborative', description: 'Works well in team environments' },
    { value: 'independent', label: 'Independent', description: 'Self-motivated and autonomous' },
    { value: 'leadership', label: 'Leadership', description: 'Can lead and mentor others' },
    { value: 'specialist', label: 'Specialist', description: 'Deep expertise in specific areas' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Job Persona
        </h2>
        <p className="text-gray-300">
          Define the ideal candidate profile for your role to help us find the perfect match.
        </p>
      </div>

      <InputField
        label="Job Title"
        value={formData.jobPersona.title}
        onChange={(value) => updateFormData('jobPersona', { title: value })}
        placeholder="e.g., Senior Frontend Developer, Product Manager"
        required
      />

      <InputField
        label="Role Expectations"
        value={formData.jobPersona.expectations}
        onChange={(value) => updateFormData('jobPersona', { expectations: value })}
        placeholder="What are the key responsibilities and expectations?"
        required
      />

      <SelectField
        label="Experience Level"
        options={experienceOptions}
        value={formData.jobPersona.experienceLevel || ''}
        onChange={(value) => updateFormData('jobPersona', { experienceLevel: value })}
        placeholder="Select experience level"
        required
      />

      <SelectField
        label="Work Style Preference"
        options={workStyleOptions}
        value={formData.jobPersona.workStyle || ''}
        onChange={(value) => updateFormData('jobPersona', { workStyle: value })}
        placeholder="Select preferred work style"
        required
      />

      <MultiLineListInput
        label="Required Skills"
        value={formData.jobPersona.skills}
        onChange={(value) => updateFormData('jobPersona', { skills: value })}
        placeholder="Add a skill (press Enter)"
        required
        maxItems={15}
      />

      <InputField
        label="Success Criteria"
        value={formData.jobPersona.criteria}
        onChange={(value) => updateFormData('jobPersona', { criteria: value })}
        placeholder="How will you measure success in this role?"
        required
      />
    </div>
  );
}
