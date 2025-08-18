import React from 'react';
import { TextArea } from '../../ui/TextArea';
import { Input } from '../../ui/Input';
import { TagInput } from '../../ui/TagInput';
import { RocketIcon, EyeIcon, UsersIcon, MessageCircleIcon, StarIcon } from 'lucide-react';
interface PurposeStoryProps {
  formData: any;
  updateFormData: (data: any) => void;
}
export function PurposeStory({
  formData,
  updateFormData
}: PurposeStoryProps) {
  return <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <RocketIcon className="mr-3 text-[#60a5fa]" size={24} />
          Purpose & Story
        </h2>
        <p className="text-gray-300">
          Tell us about your organisation's purpose and journey.
        </p>
      </div>
      <div className="bg-[#111827]/50 p-6 rounded-lg border border-[#374151]">
        <div className="flex items-start mb-3">
          <MessageCircleIcon className="text-[#60a5fa] mr-3 mt-1" size={20} />
          <h3 className="text-lg font-medium text-white">
            Inspiring Origin Story
          </h3>
        </div>
        <TextArea placeholder="What moment sparked your journey? Share the story that led to your organisation's creation..." rows={4} value={formData.originStory} onChange={e => updateFormData({
        originStory: e.target.value
      })} className="md:max-w-2xl" />
      </div>
      <div className="bg-[#111827]/50 p-6 rounded-lg border border-[#374151]">
        <div className="flex items-start mb-3">
          <StarIcon className="text-[#60a5fa] mr-3 mt-1" size={20} />
          <h3 className="text-lg font-medium text-white">What We Do</h3>
        </div>
        <Input placeholder="We build... / We serve..." value={formData.whatWeDo} onChange={e => updateFormData({
        whatWeDo: e.target.value
      })} className="md:max-w-2xl" />
      </div>
      <div className="bg-[#111827]/50 p-6 rounded-lg border border-[#374151]">
        <div className="flex items-start mb-3">
          <UsersIcon className="text-[#60a5fa] mr-3 mt-1" size={20} />
          <h3 className="text-lg font-medium text-white">Who We Serve</h3>
        </div>
        <TagInput value={formData.whoWeServe} onChange={value => updateFormData({
        whoWeServe: value
      })} placeholder="Add audience and press Enter..." helperText="Who are your primary customers or users?" className="md:max-w-2xl" />
      </div>
      {/* Enhanced Vision for the Future section */}
      <div className="bg-gradient-to-r from-[#1e3a8a]/30 to-[#3b82f6]/10 p-8 rounded-xl border border-[#3b82f6]/30 shadow-lg">
        <div className="flex items-center mb-4">
          <div className="bg-[#3b82f6]/20 p-2 rounded-full mr-4">
            <EyeIcon className="text-[#60a5fa]" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">
            Vision for the Future
          </h3>
        </div>
        <p className="text-[#94a3b8] mb-4 italic">
          "Where do you see your organization making an impact in the years to
          come?"
        </p>
        <TextArea placeholder="In 1–2 lines, describe how the world looks if you succeed in your mission..." rows={3} value={formData.vision} onChange={e => updateFormData({
        vision: e.target.value
      })} className="border-[#3b82f6]/30 focus:border-[#3b82f6] focus:ring-[#3b82f6] bg-[#111827]/70" />
        <p className="mt-3 text-xs text-[#94a3b8]">
          Your vision statement will help attract talent and partners who share
          your long-term goals.
        </p>
      </div>
      <div className="bg-[#111827]/50 p-6 rounded-lg border border-[#374151]">
        <div className="flex items-start mb-3">
          <RocketIcon className="text-[#60a5fa] mr-3 mt-1" size={20} />
          <h3 className="text-lg font-medium text-white">Why Join Us</h3>
        </div>
        <TextArea placeholder="Inspire talent in one sentence." rows={2} value={formData.whyJoinUs} onChange={e => updateFormData({
        whyJoinUs: e.target.value
      })} helperText="What makes your organisation a compelling place to work?" className="md:max-w-2xl" />
      </div>
    </div>;
}