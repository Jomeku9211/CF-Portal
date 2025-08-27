import React, { useState } from 'react';
interface CultureValuesProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}
export function CultureValues({
  formData,
  updateFormData,
  onNext,
  onBack
}: CultureValuesProps) {
  const [newValueToday, setNewValueToday] = useState('');
  const [valuesToday, setValuesToday] = useState(formData.coreValuesToday || []);
  const [newValueAspiration, setNewValueAspiration] = useState('');
  const [valuesAspirations, setValuesAspirations] = useState(formData.coreValuesAspirations || []);
  const addValueToday = () => {
    if (newValueToday.trim() !== '' && !valuesToday.includes(newValueToday.trim())) {
      setValuesToday([...valuesToday, newValueToday.trim()]);
      setNewValueToday('');
    }
  };
  const removeValueToday = (value: string) => {
    setValuesToday(valuesToday.filter(v => v !== value));
  };
  const addValueAspiration = () => {
    if (newValueAspiration.trim() !== '' && !valuesAspirations.includes(newValueAspiration.trim())) {
      setValuesAspirations([...valuesAspirations, newValueAspiration.trim()]);
      setNewValueAspiration('');
    }
  };
  const removeValueAspiration = (value: string) => {
    setValuesAspirations(valuesAspirations.filter(v => v !== value));
  };
  const handleKeyDownToday = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addValueToday();
    }
  };
  const handleKeyDownAspiration = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addValueAspiration();
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({
      coreValuesToday: valuesToday,
      coreValuesAspirations: valuesAspirations
    });
    onNext();
  };
  return <div className="bg-white rounded-xl p-8">
      <h3 className="text-xl font-semibold text-sanjuan-dark mb-6 font-['Inter']">
        Culture & Values
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-sanjuan-dark mb-3">
            Core Values Today
          </label>
          <div className="flex items-center mb-3">
            <input type="text" value={newValueToday} onChange={e => setNewValueToday(e.target.value)} onKeyDown={handleKeyDownToday} className="flex-grow px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base" placeholder="Type a core value and press Enter to add..." />
            <button type="button" onClick={addValueToday} className="ml-2 px-4 py-2 bg-sanjuan-base text-white rounded-lg hover:bg-sanjuan-dark transition-colors">
              Add
            </button>
          </div>
          {valuesToday.length > 0 ? <div className="flex flex-wrap gap-2 mt-2">
              {valuesToday.map((value, index) => <div key={index} className="flex items-center bg-sanjuan-lightest text-sanjuan-dark px-3 py-1 rounded-full">
                  <span>{value}</span>
                  <button type="button" onClick={() => removeValueToday(value)} className="ml-2 text-sanjuan-base hover:text-sanjuan-dark">
                    ×
                  </button>
                </div>)}
            </div> : <p className="text-sm text-sanjuan-base italic">
              No core values added yet. Add values that define your organization
              today.
            </p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-sanjuan-dark mb-3">
            Core Values Aspirations
          </label>
          <div className="flex items-center mb-3">
            <input type="text" value={newValueAspiration} onChange={e => setNewValueAspiration(e.target.value)} onKeyDown={handleKeyDownAspiration} className="flex-grow px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base" placeholder="Type a value aspiration and press Enter to add..." />
            <button type="button" onClick={addValueAspiration} className="ml-2 px-4 py-2 bg-sanjuan-base text-white rounded-lg hover:bg-sanjuan-dark transition-colors">
              Add
            </button>
          </div>
          {valuesAspirations.length > 0 ? <div className="flex flex-wrap gap-2 mt-2">
              {valuesAspirations.map((value, index) => <div key={index} className="flex items-center bg-sanjuan-lightest text-sanjuan-dark px-3 py-1 rounded-full">
                  <span>{value}</span>
                  <button type="button" onClick={() => removeValueAspiration(value)} className="ml-2 text-sanjuan-base hover:text-sanjuan-dark">
                    ×
                  </button>
                </div>)}
            </div> : <p className="text-sm text-sanjuan-base italic">
              No value aspirations added yet. Add values you aspire to
              cultivate.
            </p>}
        </div>
        <div>
          <label htmlFor="cultureInAction" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Culture in Action
          </label>
          <textarea id="cultureInAction" value={formData.cultureInAction} onChange={e => updateFormData({
          cultureInAction: e.target.value
        })} rows={4} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base" placeholder="How does your organization's culture manifest in day-to-day operations?" />
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