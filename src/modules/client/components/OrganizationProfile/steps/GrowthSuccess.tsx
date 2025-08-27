import React, { useState } from 'react';

interface GrowthSuccessProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function GrowthSuccess({
  formData,
  updateFormData
}: GrowthSuccessProps) {
  const [newMetric, setNewMetric] = useState('');
  const [newValue, setNewValue] = useState('');
  const [metrics, setMetrics] = useState(formData.coreValuesToday || []);

  const addMetric = () => {
    if (newMetric.trim() !== '' && !metrics.includes(newMetric.trim())) {
      const updatedMetrics = [...metrics, newMetric.trim()];
      setMetrics(updatedMetrics);
      updateFormData({ coreValuesToday: updatedMetrics });
      setNewMetric('');
    }
  };

  const removeMetric = (metric: string) => {
    const updatedMetrics = metrics.filter(m => m !== metric);
    setMetrics(updatedMetrics);
    updateFormData({ coreValuesToday: updatedMetrics });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMetric();
    }
  };

  return (
    <div className="bg-white rounded-xl p-8">
      <h3 className="text-xl font-semibold text-sanjuan-dark mb-6 font-['Inter']">
        Growth & Success
      </h3>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="whyJoinUs" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Why Join Us
          </label>
          <textarea
            id="whyJoinUs"
            value={formData.whyJoinUs}
            onChange={(e) => updateFormData({ whyJoinUs: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
            placeholder="What makes your organization an attractive place to work?"
          />
        </div>
        
        <div>
          <label htmlFor="growthPlans" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Growth Plans
          </label>
          <textarea
            id="growthPlans"
            value={formData.growthPlans}
            onChange={(e) => updateFormData({ growthPlans: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
            placeholder="Describe your organization's growth strategy and plans..."
          />
        </div>
        
        <div>
          <label htmlFor="successMetrics" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Success Metrics
          </label>
          <textarea
            id="successMetrics"
            value={formData.successMetrics?.join(', ') || ''}
            onChange={(e) => updateFormData({ 
              successMetrics: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
            })}
            rows={3}
            className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
            placeholder="What metrics define success for your organization? (separate with commas)"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-sanjuan-dark mb-3">
            Core Values Today
          </label>
          <div className="flex items-center mb-3">
            <input
              type="text"
              value={newMetric}
              onChange={(e) => setNewMetric(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
              placeholder="Type value and press Enter to add..."
            />
            <button
              type="button"
              onClick={addMetric}
              className="ml-2 px-4 py-2 bg-sanjuan-base text-white rounded-lg hover:bg-sanjuan-dark transition-colors"
            >
              Add
            </button>
          </div>
          
          {metrics.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center bg-sanjuan-lightest text-sanjuan-dark px-3 py-1 rounded-full">
                  <span>{metric}</span>
                  <button
                    type="button"
                    onClick={() => removeMetric(metric)}
                    className="ml-2 text-sanjuan-base hover:text-sanjuan-dark"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-sanjuan-base italic">
              No core values added yet. Add the values that define your organization today.
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="coreValuesAspirations" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Core Values Aspirations
          </label>
          <textarea
            id="coreValuesAspirations"
            value={formData.coreValuesAspirations?.join(', ') || ''}
            onChange={(e) => updateFormData({ 
              coreValuesAspirations: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
            })}
            rows={3}
            className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
            placeholder="What values do you aspire to embody in the future? (separate with commas)"
          />
        </div>
      </div>
    </div>
  );
}
