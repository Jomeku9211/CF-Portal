import React, { useState } from 'react';
import { RadioGroup, Radio } from '../../components/RadioGroup';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
interface WorkPreferencesProps {
  formData: any;
  updateFormData: (data: any) => void;
}
export function WorkPreferences({
  formData,
  updateFormData
}: WorkPreferencesProps) {
  const [localData, setLocalData] = useState({
    workStyle: formData.workStyle || '',
    culturePreference: formData.culturePreference || '',
    locationPreference: formData.locationPreference || '',
    salaryExpectations: formData.salaryExpectations || ''
  });
  const handleChange = (name, value) => {
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
    updateFormData({
      [name]: value
    });
  };
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
    updateFormData({
      [name]: value
    });
  };
  const locationOptions = [{
    value: 'remote',
    label: 'Remote Only'
  }, {
    value: 'hybrid',
    label: 'Hybrid (2-3 days in office)'
  }, {
    value: 'onsite',
    label: 'Onsite (Full-time office)'
  }, {
    value: 'flexible',
    label: 'Flexible (No preference)'
  }];
  return <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Work Preferences
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Tell us about your ideal work environment and expectations
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <RadioGroup legend="Preferred Work Style" value={localData.workStyle} onChange={value => handleChange('workStyle', value)}>
            <Radio value="solo">
              Solo Worker (I prefer to work independently)
            </Radio>
            <Radio value="team">
              Team Player (I thrive in collaborative environments)
            </Radio>
            <Radio value="flexible">
              Flexible (I adapt to either style as needed)
            </Radio>
          </RadioGroup>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <RadioGroup legend="Culture Preference" value={localData.culturePreference} onChange={value => handleChange('culturePreference', value)}>
            <Radio value="startup">
              Startup Pace (Fast-moving, wear many hats)
            </Radio>
            <Radio value="corporate">
              Stable Corporate (Structured, established processes)
            </Radio>
            <Radio value="mission">
              Mission-Driven (Purpose-focused organization)
            </Radio>
          </RadioGroup>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location Preference
          </label>
          <Select options={locationOptions} value={localData.locationPreference} onChange={value => handleChange('locationPreference', value)} placeholder="Select your location preference" />
        </div>
        <div className="border-t border-gray-200 pt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary/Rate Expectations
          </label>
          <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Full-time Roles
                </h4>
                <Input label="Annual Salary Range (USD)" name="salaryExpectations" value={localData.salaryExpectations} onChange={handleInputChange} placeholder="e.g., $80,000 - $100,000" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Contract Roles
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Hourly Rate (USD)" placeholder="e.g., $50 - $75" />
                  <Input label="Daily Rate (USD)" placeholder="e.g., $400 - $600" />
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This helps us match you with opportunities that meet your
            expectations
          </p>
        </div>
      </div>
    </div>;
}