import React from 'react';
import { TextArea } from '../../ui/TextArea';
import { TagInput } from '../../ui/TagInput';
import { BarChartIcon, TrendingUpIcon } from 'lucide-react';
interface GrowthSuccessProps {
  formData: any;
  updateFormData: (data: any) => void;
}
export function GrowthSuccess({
  formData,
  updateFormData
}: GrowthSuccessProps) {
  return <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <TrendingUpIcon className="mr-3 text-[#60a5fa]" size={24} />
          Growth & Success
        </h2>
        <p className="text-gray-300">
          Share your organisation's growth plans and how you measure success.
        </p>
      </div>
      <div className="bg-gradient-to-r from-[#065f46]/30 to-[#10b981]/10 p-8 rounded-xl border border-[#10b981]/30 shadow-lg mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-[#10b981]/20 p-2 rounded-full mr-4">
            <TrendingUpIcon className="text-[#34d399]" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Growth Plans</h3>
        </div>
        <p className="text-[#94a3b8] mb-4 italic">
          "What are your ambitious plans for the next 12-24 months?"
        </p>
        <TextArea placeholder="Describe your organisation's growth plans, key milestones, and strategic objectives..." rows={4} value={formData.growthPlans} onChange={e => updateFormData({
        growthPlans: e.target.value
      })} helperText="Be specific about what success looks like for your organization" className="border-[#10b981]/30 focus:border-[#10b981] focus:ring-[#10b981] bg-[#111827]/70" />
      </div>
      <div className="bg-[#111827]/50 p-6 rounded-lg border border-[#374151] mb-6">
        <div className="flex items-start mb-3">
          <BarChartIcon className="text-[#60a5fa] mr-3 mt-1" size={20} />
          <h3 className="text-lg font-medium text-white">
            How Success is Measured
          </h3>
        </div>
        <TagInput value={formData.successMetrics} onChange={value => updateFormData({
        successMetrics: value
      })} placeholder="Add success metric and press Enter..." helperText="What KPIs and outcomes matter most to your organisation?" className="md:max-w-2xl" />
      </div>
    </div>;
}