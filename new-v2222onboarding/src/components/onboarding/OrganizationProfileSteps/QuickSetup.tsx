import React from 'react';
import { BuildingIcon, GlobeIcon, DollarSignIcon, BarChartIcon, UsersIcon, TrendingUpIcon } from 'lucide-react';
import { Input } from '../../ui/Input';
import { RadioGroup } from '../../ui/RadioGroup';
import { Dropdown } from '../../ui/Dropdown';
import { Stepper } from '../../ui/Stepper';
import { TagInput } from '../../ui/TagInput';
interface QuickSetupProps {
  formData: any;
  updateFormData: (data: any) => void;
}
export function QuickSetup({
  formData,
  updateFormData
}: QuickSetupProps) {
  const organizationSizes = [{
    value: '1-10',
    label: '1–10'
  }, {
    value: '11-50',
    label: '11–50'
  }, {
    value: '51-200',
    label: '51–200'
  }, {
    value: '201-1000',
    label: '201–1000'
  }, {
    value: '1000+',
    label: '1000+'
  }];
  const fundingStatuses = [{
    value: 'bootstrapped',
    label: 'Bootstrapped',
    description: 'Self-funded without external investment'
  }, {
    value: 'pre-seed',
    label: 'Pre-Seed',
    description: 'Early funding to develop initial product'
  }, {
    value: 'seed',
    label: 'Seed',
    description: 'Funding to validate business model'
  }, {
    value: 'series-a',
    label: 'Series A',
    description: 'Funding to scale proven business model'
  }, {
    value: 'series-b-plus',
    label: 'Series B+',
    description: 'Later stage funding rounds'
  }, {
    value: 'public',
    label: 'Public',
    description: 'Publicly traded company'
  }];
  const companyFunctions = [{
    value: 'saas',
    label: 'SaaS',
    description: 'Software as a Service'
  }, {
    value: 'ecommerce',
    label: 'E-commerce',
    description: 'Online retail and marketplaces'
  }, {
    value: 'fintech',
    label: 'Fintech',
    description: 'Financial technology services'
  }, {
    value: 'healthtech',
    label: 'Healthtech',
    description: 'Healthcare technology'
  }, {
    value: 'edtech',
    label: 'Edtech',
    description: 'Education technology'
  }, {
    value: 'agency',
    label: 'Agency',
    description: 'Service-based business'
  }, {
    value: 'other',
    label: 'Other',
    description: 'Other business types'
  }];
  const revenueStatuses = [{
    value: 'pre-revenue',
    label: 'Pre-Revenue'
  }, {
    value: 'early-revenue',
    label: 'Early Revenue'
  }, {
    value: 'growing-revenue',
    label: 'Growing Revenue'
  }, {
    value: 'scaled-revenue',
    label: 'Scaled Revenue'
  }];
  return <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <BuildingIcon className="mr-3 text-[#60a5fa]" size={24} />
          Organisation Profile
        </h2>
        <p className="text-gray-300">
          Let's start with the basics about your organisation.
        </p>
      </div>
      <div className="bg-[#111827]/50 p-6 rounded-lg border border-[#374151] mb-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
          <BuildingIcon className="mr-2 text-[#60a5fa]" size={20} />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Organisation Name" placeholder="e.g., Acme Inc." icon={<BuildingIcon size={18} className="text-gray-400" />} value={formData.name} onChange={e => updateFormData({
          name: e.target.value
        })} className="bg-[#111827] border-[#374151] text-white placeholder-gray-500" />
          <Input label="Website" placeholder="e.g., https://acme.com" icon={<GlobeIcon size={18} className="text-gray-400" />} value={formData.website} onChange={e => updateFormData({
          website: e.target.value
        })} className="bg-[#111827] border-[#374151] text-white placeholder-gray-500" />
        </div>
      </div>
      <div className="bg-[#111827]/50 p-6 rounded-lg border border-[#374151] mb-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
          <UsersIcon className="mr-2 text-[#60a5fa]" size={20} />
          Organisation Size
        </h3>
        <RadioGroup options={organizationSizes} name="organizationSize" value={formData.size} onChange={value => updateFormData({
        size: value
      })} helperText="How many people currently work at your organisation?" />
      </div>
      <div className="bg-[#111827]/50 p-6 rounded-lg border border-[#374151] mb-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
          <DollarSignIcon className="mr-2 text-[#60a5fa]" size={20} />
          Business Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Dropdown label="Funding Status" options={fundingStatuses} value={formData.fundingStatus} onChange={value => updateFormData({
          fundingStatus: value
        })} placeholder="Select funding status" helperText="What stage of funding is your organisation at?" />
          <Dropdown label="Company Function" options={companyFunctions} value={formData.companyFunction} onChange={value => updateFormData({
          companyFunction: value
        })} placeholder="Select company function" helperText="What best describes your business model?" />
        </div>
      </div>
      <div className="bg-[#111827]/50 p-6 rounded-lg border border-[#374151] mb-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
          <BarChartIcon className="mr-2 text-[#60a5fa]" size={20} />
          Revenue Status
        </h3>
        <Stepper options={revenueStatuses} value={formData.revenueStatus} onChange={value => updateFormData({
        revenueStatus: value
      })} helperText="Where is your organisation in terms of revenue generation?" />
      </div>
      <div className="bg-[#111827]/50 p-6 rounded-lg border border-[#374151]">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
          <TrendingUpIcon className="mr-2 text-[#60a5fa]" size={20} />
          Key Investors (optional)
        </h3>
        <TagInput
          value={formData.keyInvestors}
          onChange={(value) => updateFormData({ keyInvestors: value })}
          placeholder="Add investor and press Enter..."
          helperText="Add your key investors or leave blank if not applicable"
          maxTags={5}
          className="w-full"
        />
      </div>
    </div>;
}

export default QuickSetup;