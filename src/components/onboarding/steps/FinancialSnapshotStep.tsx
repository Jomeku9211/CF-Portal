
import { SelectField, InputField } from '../../common';

interface FinancialSnapshotStepProps {
  formData: any;
  updateFormData: (section: string, data: any) => void;
}

export function FinancialSnapshotStep({ formData, updateFormData }: FinancialSnapshotStepProps) {
  // Add null safety checks
  const financials = formData?.organizationOnboarding?.financials || {};
  
  const fundingStatusOptions = [
    { value: 'bootstrapped', label: 'Bootstrapped', description: 'Self-funded, no external investment' },
    { value: 'seed', label: 'Seed Stage', description: 'Early funding, typically <$1M' },
    { value: 'series-a', label: 'Series A', description: 'Growth funding, typically $1M-$10M' },
    { value: 'series-b', label: 'Series B', description: 'Expansion funding, typically $10M-$50M' },
    { value: 'series-c', label: 'Series C+', description: 'Later stage funding, typically $50M+' },
    { value: 'public', label: 'Public Company', description: 'Listed on stock exchange' },
    { value: 'profitable', label: 'Profitable', description: 'Generating positive cash flow' }
  ];

  const revenueStatusOptions = [
    { value: 'pre-revenue', label: 'Pre-revenue', description: 'No revenue yet, in development' },
    { value: 'early-revenue', label: 'Early Revenue', description: 'Some revenue, <$100K annually' },
    { value: 'growing', label: 'Growing Revenue', description: '$100K-$1M annually' },
    { value: 'established', label: 'Established Revenue', description: '$1M-$10M annually' },
    { value: 'scaled', label: 'Scaled Revenue', description: '$10M+ annually' }
  ];

  const profitabilityOptions = [
    { value: 'not-profitable', label: 'Not Profitable', description: 'Currently operating at a loss' },
    { value: 'breakeven', label: 'Breakeven', description: 'Revenue equals expenses' },
    { value: 'profitable', label: 'Profitable', description: 'Generating positive net income' },
    { value: 'highly-profitable', label: 'Highly Profitable', description: 'Strong profit margins' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Financial Snapshot
        </h2>
        <p className="text-gray-300">
          Help candidates understand your organization's financial position and growth stage.
        </p>
      </div>

      <SelectField
        label="Funding Status"
        options={fundingStatusOptions}
        value={financials.fundingStatus || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          financials: { ...financials, fundingStatus: value } 
        })}
        placeholder="Select funding status"
        required
      />

      <InputField
        label="Key Investors if applicable"
        value={financials.investors || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          financials: { ...financials, investors: value } 
        })}
        placeholder="e.g., Y Combinator, Sequoia Capital, Angel investors"
      />

      <SelectField
        label="Revenue Status"
        options={revenueStatusOptions}
        value={financials.revenueStatus || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          financials: { ...financials, revenueStatus: value } 
        })}
        placeholder="Select revenue status"
        required
      />

      <SelectField
        label="Profitability Status"
        options={profitabilityOptions}
        value={financials.profitabilityStatus || ''}
        onChange={(value) => updateFormData('organizationOnboarding', { 
          financials: { ...financials, profitabilityStatus: value } 
        })}
        placeholder="Select profitability status"
        required
      />
    </div>
  );
}

