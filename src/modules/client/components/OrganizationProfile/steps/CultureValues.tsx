import React, { useState } from 'react';

interface CultureValuesProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function CultureValues({
  formData,
  updateFormData
}: CultureValuesProps) {
  const [newCulture, setNewCulture] = useState('');
  const [cultures, setCultures] = useState(formData.cultureInAction || []);

  const addCulture = () => {
    if (newCulture.trim() !== '' && !cultures.includes(newCulture.trim())) {
      const updatedCultures = [...cultures, newCulture.trim()];
      setCultures(updatedCultures);
      updateFormData({ cultureInAction: updatedCultures });
      setNewCulture('');
    }
  };

  const removeCulture = (culture: string) => {
    const updatedCultures = cultures.filter(c => c !== culture);
    setCultures(updatedCultures);
    updateFormData({ cultureInAction: updatedCultures });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCulture();
    }
  };

  return (
    <div className="bg-white rounded-xl p-8">
      <h3 className="text-xl font-semibold text-sanjuan-dark mb-6 font-['Inter']">
        Culture & Values
      </h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-sanjuan-dark mb-3">
            Culture in Action
          </label>
          <div className="flex items-center mb-3">
            <input
              type="text"
              value={newCulture}
              onChange={(e) => setNewCulture(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
              placeholder="Type culture example and press Enter to add..."
            />
            <button
              type="button"
              onClick={addCulture}
              className="ml-2 px-4 py-2 bg-sanjuan-base text-white rounded-lg hover:bg-sanjuan-dark transition-colors"
            >
              Add
            </button>
          </div>
          
          {cultures.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {cultures.map((culture, index) => (
                <div key={index} className="flex items-center bg-sanjuan-lightest text-sanjuan-dark px-3 py-1 rounded-full">
                  <span>{culture}</span>
                  <button
                    type="button"
                    onClick={() => removeCulture(culture)}
                    className="ml-2 text-sanjuan-base hover:text-sanjuan-dark"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-sanjuan-base italic">
              No culture examples added yet. Add examples of how your values are lived out daily.
            </p>
          )}
        </div>
        
        <div className="bg-sanjuan-lightest rounded-lg p-4">
          <h4 className="font-medium text-sanjuan-dark mb-2">Summary</h4>
          <p className="text-sm text-sanjuan-base">
            You've completed the Organization Profile setup. Review your information and click Submit to continue to the next step.
          </p>
        </div>
      </div>
    </div>
  );
}
