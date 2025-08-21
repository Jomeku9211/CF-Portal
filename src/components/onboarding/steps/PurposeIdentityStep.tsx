
import { InputField, MultiLineListInput } from '../../common';

interface PurposeIdentityStepProps {
  formData: any;
  updateFormData: (section: string, data: any) => void;
}

export function PurposeIdentityStep({ formData, updateFormData }: PurposeIdentityStepProps) {
  // Add null safety checks
  const purpose = formData?.organizationOnboarding?.purpose || {};
  
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
        value={purpose.whyStatement || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          purpose: { ...purpose, whyStatement: value } 
        })}
        placeholder="Why does your organization exist? What problem are you solving?"
        required
      />

      <InputField
        label="Origin Story"
        value={purpose.originStory || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          purpose: { ...purpose, originStory: value } 
        })}
        placeholder="How did your organization come to be? What inspired you to start?"
        required
      />

      <MultiLineListInput
        label="Core Beliefs"
        value={purpose.coreBeliefs || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          purpose: { ...purpose, coreBeliefs: value } 
        })}
        placeholder="Add a core belief (press Enter)"
        required
        maxItems={10}
      />

      <MultiLineListInput
        label="Key Practices"
        value={purpose.practices || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          purpose: { ...purpose, practices: value } 
        })}
        placeholder="Add a key practice (press Enter)"
        required
        maxItems={10}
      />
    </div>
  );
}

