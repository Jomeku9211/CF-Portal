import React, { useState } from 'react';
interface TeamOnboardingProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}
export function TeamOnboarding({
  formData,
  updateFormData,
  onNext,
  onBack
}: TeamOnboardingProps) {
  const [communicationStyle, setCommunicationStyle] = useState(formData.communicationStyle || []);
  const [workStyle, setWorkStyle] = useState(formData.workStyle || []);
  const teamSizes = ['1–5', '6–10', '11–25', '26–50', '51+'];
  const communicationStyles = ['Async-first', 'Meetings-heavy', 'Written-first', 'Casual / Ad-hoc'];
  const workStyles = ['Collaborative', 'Independent', 'Agile / Sprint-based', 'Project-based'];
  const decisionMakingStyles = ['Top-down', 'Consensus-driven', 'Data-driven', 'Founder-led'];
  const timezones = ['GMT-8 (PST)', 'GMT-5 (EST)', 'GMT+0 (UTC)', 'GMT+1 (CET)', 'GMT+5:30 (IST)', 'Other'];
  const toggleCommunicationStyle = style => {
    if (communicationStyle.includes(style)) {
      setCommunicationStyle(communicationStyle.filter(s => s !== style));
    } else {
      setCommunicationStyle([...communicationStyle, style]);
    }
  };
  const toggleWorkStyle = style => {
    if (workStyle.includes(style)) {
      setWorkStyle(workStyle.filter(s => s !== style));
    } else {
      setWorkStyle([...workStyle, style]);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    updateFormData({
      communicationStyle,
      workStyle
    });
    onNext();
  };
  return <div>
      <h2 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
        Team Onboarding
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="teamSize" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Team Size
          </label>
          <select id="teamSize" value={formData.teamSize} onChange={e => updateFormData({
          teamSize: e.target.value
        })} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-tango-base focus:border-tango-base">
            <option value="">Select team size</option>
            {teamSizes.map(size => <option key={size} value={size}>
                {size}
              </option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-sanjuan-dark mb-3">
            Communication Style (multi-select)
          </label>
          <div className="flex flex-wrap gap-2">
            {communicationStyles.map(style => <button key={style} type="button" onClick={() => toggleCommunicationStyle(style)} className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${communicationStyle.includes(style) ? 'bg-tango-base text-white' : 'bg-sanjuan-lightest text-sanjuan-dark hover:bg-sanjuan-lighter'}`}>
                {style}
              </button>)}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-sanjuan-dark mb-3">
            Work Style (multi-select)
          </label>
          <div className="flex flex-wrap gap-2">
            {workStyles.map(style => <button key={style} type="button" onClick={() => toggleWorkStyle(style)} className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${workStyle.includes(style) ? 'bg-tango-base text-white' : 'bg-sanjuan-lightest text-sanjuan-dark hover:bg-sanjuan-lighter'}`}>
                {style}
              </button>)}
          </div>
        </div>
        <div>
          <label htmlFor="decisionMakingStyle" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Decision-Making Style
          </label>
          <select id="decisionMakingStyle" value={formData.decisionMakingStyle} onChange={e => updateFormData({
          decisionMakingStyle: e.target.value
        })} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-tango-base focus:border-tango-base">
            <option value="">Select decision-making style</option>
            {decisionMakingStyles.map(style => <option key={style} value={style}>
                {style}
              </option>)}
          </select>
        </div>
        <div>
          <label htmlFor="primaryTimezone" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Primary Timezone
          </label>
          <select id="primaryTimezone" value={formData.primaryTimezone} onChange={e => updateFormData({
          primaryTimezone: e.target.value
        })} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-tango-base focus:border-tango-base">
            <option value="">Select primary timezone</option>
            {timezones.map(timezone => <option key={timezone} value={timezone}>
                {timezone}
              </option>)}
          </select>
        </div>
        <div className="flex justify-between pt-4">
          <button type="button" onClick={onBack} className="px-8 py-3 rounded-lg font-semibold border-2 border-sanjuan-lighter text-sanjuan-dark hover:bg-sanjuan-lightest transition-all">
            Back
          </button>
          <button type="submit" className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-tango-base to-tango-dark text-white shadow-md hover:shadow-lg transition-all">
            Next
          </button>
        </div>
      </form>
    </div>;
}