import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from 'lucide-react';
import { InputField, SelectField, MultiLineListInput, Button as DSButton } from '../../common';
import { organizationService } from '../../../services/organizationService';

type StepId = 'quick-setup' | 'purpose-story' | 'growth-success' | 'culture-values' | 'completion';

interface Props {
  onCompleted: () => void;
}

export function OrganizationProfile({ onCompleted }: Props) {
  const [currentStep, setCurrentStep] = useState<StepId>('quick-setup');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // quick setup
    name: '',
    website: '',
    size: '',
    fundingStatus: '',
    revenueStatus: '',
    keyInvestors: [] as string[],
    // purpose & story
    originStory: '',
    whatWeDo: '',
    whoWeServe: [] as string[],
    vision: '',
    whyJoinUs: '',
    // growth & success
    growthPlans: '',
    successMetrics: [] as string[],
    // culture & values
    coreValuesToday: [] as string[],
    cultureInAction: [] as string[],
  });

  const steps: { id: StepId; label: string }[] = [
    { id: 'quick-setup', label: 'Organisation Profile' },
    { id: 'purpose-story', label: 'Purpose & Story' },
    { id: 'growth-success', label: 'Growth & Success' },
    { id: 'culture-values', label: 'Culture & Values' },
  ];

  const update = (data: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...data }));

  const handleNext = async () => {
    setError(null);
    if (currentStep === 'quick-setup') {
      if (!formData.name.trim() || !formData.size || !formData.fundingStatus || !formData.revenueStatus) {
        setError('Please complete organisation name, size, funding and revenue.');
        return;
      }
      setCurrentStep('purpose-story');
      return;
    }
    if (currentStep === 'purpose-story') {
      if (!formData.originStory.trim()) {
        setError('Please add your inspiring origin story.');
        return;
      }
      setCurrentStep('growth-success');
      return;
    }
    if (currentStep === 'growth-success') {
      setCurrentStep('culture-values');
      return;
    }
    if (currentStep === 'culture-values') {
      // Submit to Xano
      setIsSubmitting(true);
      try {
        // Map enums to API expected values
        const fundingMap: Record<string, string> = {
          'bootstrapped': 'Bootstrapped',
          'pre-seed': 'Seed Stage',
          'seed': 'Seed Stage',
          'series-a': 'Series A',
          'series-b': 'Series B',
          'series-b-plus': 'Series C+',
          'public': 'Public Company',
          'profitable': 'Profitable',
        };
        const revenueMap: Record<string, string> = {
          'pre-revenue': 'Pre-revenue',
          'early-revenue': 'Early Revenue',
          'growing-revenue': 'Growing Revenue',
          'established': 'Established Revenue',
          'scaled-revenue': 'Scaled Revenue',
          'scaled': 'Scaled Revenue',
        };

        const payload = {
          name: formData.name.trim(),
          industry: formData.whatWeDo || 'technology',
          website_url: formData.website,
          organization_size: formData.size,
          current_funding_status: fundingMap[formData.fundingStatus] || formData.fundingStatus,
          key_investors_backers: formData.keyInvestors.join('; '),
          revenue_status: revenueMap[formData.revenueStatus] || formData.revenueStatus,
          profitability_status: 'Not Profitable',
          why_statement: formData.whyJoinUs || '',
          origin_story: formData.originStory,
          core_beliefs_principles: formData.coreValuesToday.join('; '),
          how_we_live_purpose: formData.cultureInAction.join('; '),
        };

        const res = await organizationService.createOrganization(payload as any);
        if (!res.success) {
          setError(res.message || 'Failed to create organization');
          setIsSubmitting(false);
          return;
        }
        setCurrentStep('completion');
        setIsSubmitting(false);
      } catch (e: any) {
        setError(e?.message || 'Network error');
        setIsSubmitting(false);
      }
      return;
    }
  };

  const handleBack = () => {
    setError(null);
    if (currentStep === 'purpose-story') setCurrentStep('quick-setup');
    else if (currentStep === 'growth-success') setCurrentStep('purpose-story');
    else if (currentStep === 'culture-values') setCurrentStep('growth-success');
  };

  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="w-full">
      {currentStep !== 'completion' && (
        <div className="mb-6 flex items-center justify-between border-b border-gray-700 pb-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-blue-400">Step {currentIndex + 1} of {steps.length}</span>
          </div>
          <div className="flex items-center">
            {steps.map((s, i) => (
              <div key={s.id} className={`w-6 h-6 rounded-full flex items-center justify-center mx-1 ${currentIndex > i ? 'bg-green-500 text-white' : currentIndex === i ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {currentIndex > i ? '✓' : <span className="text-xs">{i + 1}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-[#1a2234] rounded-xl shadow-md p-6 md:p-8 border border-[#2a3344]">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>
        )}

        {currentStep === 'quick-setup' && (
          <div className="space-y-6 max-w-2xl">
            <InputField label="Organization Name" value={formData.name} onChange={v => update({ name: v })} required placeholder="Enter your organization name" />
            <InputField label="Website" type="url" value={formData.website} onChange={v => update({ website: v })} required placeholder="https://yourcompany.com" />
            <SelectField label="Company Size" value={formData.size} onChange={v => update({ size: v })} required options={[{ value: '1-10', label: '1-10' }, { value: '11-50', label: '11-50' }, { value: '51-200', label: '51-200' }, { value: '201-1000', label: '201-1000' }, { value: '1000+', label: '1000+' }]} />
            <SelectField label="Funding Status" value={formData.fundingStatus} onChange={v => update({ fundingStatus: v })} required options={[{ value: 'bootstrapped', label: 'Bootstrapped' }, { value: 'pre-seed', label: 'Pre-Seed' }, { value: 'seed', label: 'Seed' }, { value: 'series-a', label: 'Series A' }, { value: 'series-b-plus', label: 'Series B+' }, { value: 'public', label: 'Public' }]} />
            <SelectField label="Revenue Status" value={formData.revenueStatus} onChange={v => update({ revenueStatus: v })} required options={[{ value: 'pre-revenue', label: 'Pre-revenue' }, { value: 'early-revenue', label: 'Early Revenue' }, { value: 'growing-revenue', label: 'Growing Revenue' }, { value: 'scaled-revenue', label: 'Scaled Revenue' }]} />
            <MultiLineListInput label="Key Investors (optional)" value={formData.keyInvestors} onChange={v => update({ keyInvestors: v })} placeholder="Add investor and press Enter" />
          </div>
        )}

        {currentStep === 'purpose-story' && (
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Inspiring Origin Story</label>
              <textarea className="w-full px-4 py-3 bg-[#1e293b] border border-[#2a3344] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]" rows={4} value={formData.originStory} onChange={e => update({ originStory: e.target.value })} placeholder="What sparked your journey?" />
            </div>
            <InputField label="What We Do" value={formData.whatWeDo} onChange={v => update({ whatWeDo: v })} placeholder="We build... / We serve..." />
            <MultiLineListInput label="Who We Serve" value={formData.whoWeServe} onChange={v => update({ whoWeServe: v })} placeholder="Add audience and press Enter" />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Vision for the Future</label>
              <textarea className="w-full px-4 py-3 bg-[#1e293b] border border-[#2a3344] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]" rows={3} value={formData.vision} onChange={e => update({ vision: e.target.value })} placeholder="How does the world look if you succeed?" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Why Join Us</label>
              <textarea className="w-full px-4 py-3 bg-[#1e293b] border border-[#2a3344] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]" rows={2} value={formData.whyJoinUs} onChange={e => update({ whyJoinUs: e.target.value })} placeholder="In one sentence, inspire talent." />
            </div>
          </div>
        )}

        {currentStep === 'growth-success' && (
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Growth Plans</label>
              <textarea className="w-full px-4 py-3 bg-[#1e293b] border border-[#2a3344] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]" rows={4} value={formData.growthPlans} onChange={e => update({ growthPlans: e.target.value })} placeholder="Plans, milestones and objectives" />
            </div>
            <MultiLineListInput label="How Success is Measured" value={formData.successMetrics} onChange={v => update({ successMetrics: v })} placeholder="Add KPI/Outcome and press Enter" />
          </div>
        )}

        {currentStep === 'culture-values' && (
          <div className="space-y-6 max-w-2xl">
            <MultiLineListInput label="Core Values Today (max 5)" value={formData.coreValuesToday} onChange={v => update({ coreValuesToday: v.slice(0, 5) })} placeholder="Add value and press Enter" maxItems={5} />
            <MultiLineListInput label="Culture in Action (behaviors)" value={formData.cultureInAction} onChange={v => update({ cultureInAction: v })} placeholder="Add behavior and press Enter" maxItems={10} />
          </div>
        )}

        {currentStep === 'completion' && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircleIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Organization Created!</h2>
            <p className="text-gray-400 text-center mb-6">You're all set. Continue to Team onboarding.</p>
            <DSButton onClick={onCompleted}>Continue</DSButton>
          </div>
        )}
      </div>

      {currentStep !== 'completion' && (
        <div className="flex justify-between mt-6">
          <DSButton variant="outline" onClick={handleBack} disabled={currentStep === 'quick-setup'}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back
          </DSButton>
          <DSButton onClick={handleNext} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : currentStep === 'culture-values' ? 'Complete' : 'Next'} <ArrowRightIcon className="w-4 h-4 ml-2" />
          </DSButton>
        </div>
      )}
    </div>
  );
}


