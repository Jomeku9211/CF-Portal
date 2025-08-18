import React, { useState } from 'react';
import { TagInput } from '../../ui/TagInput';
import { TextArea } from '../../ui/TextArea';
import { HeartIcon, UsersIcon, StarIcon, ArrowRightIcon } from 'lucide-react';
interface CultureValuesProps {
  formData: any;
  updateFormData: (data: any) => void;
}
export function CultureValues({
  formData,
  updateFormData
}: CultureValuesProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'aspirations'>('today');
  const predefinedValues = ['Transparency', 'Integrity', 'Innovation', 'Customer-First', 'Diversity', 'Excellence', 'Collaboration', 'Accountability', 'Growth Mindset', 'Work-Life Balance', 'Creativity', 'Empathy'];
  return <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <HeartIcon className="mr-3 text-[#60a5fa]" size={24} />
          Culture & Values
        </h2>
        <p className="text-gray-300">
          Define what makes your organisation's culture unique.
        </p>
      </div>
      <div className="bg-[#111827]/50 p-6 rounded-lg border border-[#374151] mb-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
          <StarIcon className="mr-2 text-[#60a5fa]" size={20} />
          Core Values
        </h3>
        {/* Tabs */}
        <div className="flex border-b border-[#374151] mb-6">
          <button className={`py-3 px-5 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === 'today' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-gray-400 hover:text-gray-300'}`} onClick={() => setActiveTab('today')}>
            Today
          </button>
          <button className={`py-3 px-5 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === 'aspirations' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-gray-400 hover:text-gray-300'}`} onClick={() => setActiveTab('aspirations')}>
            Aspirations
          </button>
        </div>
        {/* Today tab content */}
        {activeTab === 'today' && <div className="space-y-6">
            <p className="text-sm text-gray-300">
              Select up to 5 values that best describe your organisation's
              culture today.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {predefinedValues.map(value => {
            const isSelected = formData.coreValuesToday.includes(value);
            const isDisabled = !isSelected && formData.coreValuesToday.length >= 5;
            return <button key={value} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isSelected ? 'bg-[#3b82f6] text-white shadow-md' : isDisabled ? 'bg-[#1e293b] text-gray-500 cursor-not-allowed' : 'bg-[#1e293b] text-gray-300 hover:bg-[#2d3748] hover:shadow'}`} onClick={() => {
              if (isSelected) {
                updateFormData({
                  coreValuesToday: formData.coreValuesToday.filter((v: string) => v !== value)
                });
              } else if (!isDisabled) {
                updateFormData({
                  coreValuesToday: [...formData.coreValuesToday, value]
                });
              }
            }} disabled={isDisabled && !isSelected}>
                    {value}
                  </button>;
          })}
            </div>
            <TagInput label="Add your own values" value={formData.coreValuesToday.filter((v: string) => !predefinedValues.includes(v))} onChange={newCustomValues => {
          const predefinedSelected = formData.coreValuesToday.filter((v: string) => predefinedValues.includes(v));
          updateFormData({
            coreValuesToday: [...predefinedSelected, ...newCustomValues]
          });
        }} placeholder="Add custom value and press Enter..." helperText={`${formData.coreValuesToday.length}/5 values selected`} maxTags={5 - formData.coreValuesToday.filter((v: string) => predefinedValues.includes(v)).length} className="md:max-w-2xl" />
          </div>}
        {/* Aspirations tab content */}
        {activeTab === 'aspirations' && <div className="space-y-6">
            <p className="text-sm text-gray-300">
              Select up to 3 values that you aspire to develop in your
              organisation.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {predefinedValues.map(value => {
            const isSelected = formData.coreValuesAspirations.includes(value);
            const isDisabled = !isSelected && formData.coreValuesAspirations.length >= 3;
            return <button key={value} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isSelected ? 'bg-[#8b5cf6] text-white shadow-md' : isDisabled ? 'bg-[#1e293b] text-gray-500 cursor-not-allowed' : 'bg-[#1e293b] text-gray-300 hover:bg-[#2d3748] hover:shadow'}`} onClick={() => {
              if (isSelected) {
                updateFormData({
                  coreValuesAspirations: formData.coreValuesAspirations.filter((v: string) => v !== value)
                });
              } else if (!isDisabled) {
                updateFormData({
                  coreValuesAspirations: [...formData.coreValuesAspirations, value]
                });
              }
            }} disabled={isDisabled && !isSelected}>
                    {value}
                  </button>;
          })}
            </div>
            <TagInput label="Add your own aspirational values" value={formData.coreValuesAspirations.filter((v: string) => !predefinedValues.includes(v))} onChange={newCustomValues => {
          const predefinedSelected = formData.coreValuesAspirations.filter((v: string) => predefinedValues.includes(v));
          updateFormData({
            coreValuesAspirations: [...predefinedSelected, ...newCustomValues]
          });
        }} placeholder="Add custom value and press Enter..." helperText={`${formData.coreValuesAspirations.length}/3 values selected`} maxTags={3 - formData.coreValuesAspirations.filter((v: string) => predefinedValues.includes(v)).length} className="md:max-w-2xl" />
          </div>}
      </div>
      <div className="bg-gradient-to-r from-[#4f46e5]/20 to-[#8b5cf6]/10 p-8 rounded-xl border border-[#8b5cf6]/30 shadow-lg mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-[#8b5cf6]/20 p-2 rounded-full mr-4">
            <UsersIcon className="text-[#a78bfa]" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Culture in Action</h3>
        </div>
        <p className="text-[#94a3b8] mb-4 italic">
          "How do your values show up in daily work? Share 2-4 specific
          behaviors or practices."
        </p>
        <TextArea placeholder="How does this show up daily? For example: 'Weekly wins & failures shared openly' or 'Customer feedback directly shapes our roadmap'" rows={4} value={formData.cultureInAction.join('\n')} onChange={e => updateFormData({
        cultureInAction: e.target.value.split('\n').filter(Boolean)
      })} helperText="Enter each behavior on a new line" className="border-[#8b5cf6]/30 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] bg-[#111827]/70" />
      </div>
    </div>;
}