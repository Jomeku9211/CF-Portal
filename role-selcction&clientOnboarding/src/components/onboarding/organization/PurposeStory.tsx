import React, { useState } from 'react';
interface PurposeStoryProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}
export function PurposeStory({
  formData,
  updateFormData,
  onNext,
  onBack
}: PurposeStoryProps) {
  const [newAudience, setNewAudience] = useState('');
  const [audiences, setAudiences] = useState(formData.whoWeServe || []);
  const addAudience = () => {
    if (newAudience.trim() !== '' && !audiences.includes(newAudience.trim())) {
      const updatedAudiences = [...audiences, newAudience.trim()];
      setAudiences(updatedAudiences);
      setNewAudience('');
    }
  };
  const removeAudience = (audience: string) => {
    setAudiences(audiences.filter(a => a !== audience));
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAudience();
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({
      whoWeServe: audiences
    });
    onNext();
  };
  return <div className="bg-white rounded-xl p-8">
      <h3 className="text-xl font-semibold text-sanjuan-dark mb-6 font-['Inter']">
        Purpose & Story
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="originStory" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Origin Story
          </label>
          <textarea id="originStory" value={formData.originStory} onChange={e => updateFormData({
          originStory: e.target.value
        })} rows={4} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base" placeholder="Share the story of how your organization was founded..." />
        </div>
        <div>
          <label htmlFor="whatWeDo" className="block text-sm font-medium text-sanjuan-dark mb-1">
            What We Do
          </label>
          <textarea id="whatWeDo" value={formData.whatWeDo} onChange={e => updateFormData({
          whatWeDo: e.target.value
        })} rows={4} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base" placeholder="Describe your organization's products, services, or mission..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-sanjuan-dark mb-3">
            Who We Serve
          </label>
          <div className="flex items-center mb-3">
            <input type="text" value={newAudience} onChange={e => setNewAudience(e.target.value)} onKeyDown={handleKeyDown} className="flex-grow px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base" placeholder="Type audience and press Enter to add..." />
            <button type="button" onClick={addAudience} className="ml-2 px-4 py-2 bg-sanjuan-base text-white rounded-lg hover:bg-sanjuan-dark transition-colors">
              Add
            </button>
          </div>
          {audiences.length > 0 ? <div className="flex flex-wrap gap-2 mt-2">
              {audiences.map((audience, index) => <div key={index} className="flex items-center bg-sanjuan-lightest text-sanjuan-dark px-3 py-1 rounded-full">
                  <span>{audience}</span>
                  <button type="button" onClick={() => removeAudience(audience)} className="ml-2 text-sanjuan-base hover:text-sanjuan-dark">
                    ×
                  </button>
                </div>)}
            </div> : <p className="text-sm text-sanjuan-base italic">
              No audiences added yet. Add who your organization serves.
            </p>}
        </div>
        <div>
          <label htmlFor="vision" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Vision
          </label>
          <textarea id="vision" value={formData.vision} onChange={e => updateFormData({
          vision: e.target.value
        })} rows={4} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base" placeholder="What is your organization's long-term vision for the future?" />
        </div>
        <div className="flex justify-between pt-4">
          <button type="button" onClick={onBack} className="px-8 py-3 rounded-lg font-semibold border-2 border-sanjuan-lighter text-sanjuan-dark hover:bg-sanjuan-lightest transition-all">
            Back
          </button>
          <button type="submit" className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white shadow-md hover:shadow-lg transition-all">
            Next
          </button>
        </div>
      </form>
    </div>;
}