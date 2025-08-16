
import { InputField, MultiLineListInput } from '../../common';

interface PurposeIdentityStepProps {
  formData: any;
  updateFormData: (section: string, data: any) => void;
}

export function PurposeIdentityStep({ formData, updateFormData }: PurposeIdentityStepProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Purpose & Identity
        </h2>
        <p className="text-gray-300">
          Share your organization's deeper purpose and values to attract like-minded candidates.
        </p>
      </div>

      <InputField
        label="Why Statement"
        value={formData.organizationOnboarding.purpose.whyStatement}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          purpose: { ...formData.organizationOnboarding.purpose, whyStatement: value } 
        })}
        placeholder="Why does your organization exist? What problem are you solving?"
        required
      />

      <InputField
        label="Origin Story"
        value={formData.organizationOnboarding.purpose.originStory}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          purpose: { ...formData.organizationOnboarding.purpose, originStory: value } 
        })}
        placeholder="How did your organization come to be? What inspired you to start?"
        required
      />

      <MultiLineListInput
        label="Core Beliefs"
        value={formData.organizationOnboarding.purpose.coreBeliefs}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          purpose: { ...formData.organizationOnboarding.purpose, coreBeliefs: value } 
        })}
        placeholder="Add a core belief (press Enter)"
        required
        maxItems={10}
      />

      <MultiLineListInput
        label="Key Practices"
        value={formData.organizationOnboarding.purpose.practices}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          purpose: { ...formData.organizationOnboarding.purpose, practices: value } 
        })}
        placeholder="Add a key practice (press Enter)"
        required
        maxItems={10}
      />
    </div>
  );
}

