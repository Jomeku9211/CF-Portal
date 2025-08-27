import React, { useState } from 'react';
interface GrowthSuccessProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}
export function GrowthSuccess({
  formData,
  updateFormData,
  onNext,
  onBack
}: GrowthSuccessProps) {
  const [newMetric, setNewMetric] = useState('');
  const [metrics, setMetrics] = useState(formData.successMetrics || []);
  const addMetric = () => {
    if (newMetric.trim() !== '' && !metrics.includes(newMetric.trim())) {
      const updatedMetrics = [...metrics, newMetric.trim()];
      setMetrics(updatedMetrics);
      setNewMetric('');
    }
  };
  const removeMetric = (metric: string) => {
    setMetrics(metrics.filter(m => m !== metric));
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMetric();
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({
      successMetrics: metrics
    });
    onNext();
  };
  return <div className="bg-white rounded-xl p-8">
      <h3 className="text-xl font-semibold text-sanjuan-dark mb-6 font-['Inter']">
        Growth & Success
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="whyJoinUs" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Why Join Us
          </label>
          <textarea id="whyJoinUs" value={formData.whyJoinUs} onChange={e => updateFormData({
          whyJoinUs: e.target.value
        })} rows={4} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base" placeholder="Why should talented professionals join your organization?" />
        </div>
        <div>
          <label htmlFor="growthPlans" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Growth Plans
          </label>
          <textarea id="growthPlans" value={formData.growthPlans} onChange={e => updateFormData({
          growthPlans: e.target.value
        })} rows={4} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base" placeholder="What are your organization's plans for growth in the next 1-3 years?" />
        </div>
        <div>
          <label className="block text-sm font-medium text-sanjuan-dark mb-3">
            Success Metrics
          </label>
          <div className="flex items-center mb-3">
            <input type="text" value={newMetric} onChange={e => setNewMetric(e.target.value)} onKeyDown={handleKeyDown} className="flex-grow px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base" placeholder="Type a success metric and press Enter to add..." />
            <button type="button" onClick={addMetric} className="ml-2 px-4 py-2 bg-sanjuan-base text-white rounded-lg hover:bg-sanjuan-dark transition-colors">
              Add
            </button>
          </div>
          {metrics.length > 0 ? <div className="flex flex-wrap gap-2 mt-2">
              {metrics.map((metric, index) => <div key={index} className="flex items-center bg-sanjuan-lightest text-sanjuan-dark px-3 py-1 rounded-full">
                  <span>{metric}</span>
                  <button type="button" onClick={() => removeMetric(metric)} className="ml-2 text-sanjuan-base hover:text-sanjuan-dark">
                    ×
                  </button>
                </div>)}
            </div> : <p className="text-sm text-sanjuan-base italic">
              No success metrics added yet. Add metrics that define success for
              your organization.
            </p>}
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