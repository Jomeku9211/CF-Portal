import React, { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '../../shared/components/Button';

interface HiringIntentProps {
  formData: any;
  updateFormData: (data: any) => void;
  onBack: () => void;
  onFinish: () => void;
}

export function HiringIntent({
  formData,
  updateFormData,
  onBack,
  onFinish
}: HiringIntentProps) {
  const [employmentType, setEmploymentType] = useState<string[]>(formData.employmentType || []);
  const [showCityField, setShowCityField] = useState(
    formData.locationPreference === 'Onsite' || formData.locationPreference === 'Hybrid'
  );

  // Dropdown options from the new UI
  const numberOfHiresOptions = ['1', '2–5', '5+'];
  const timelineOptions = ['Immediately', 'Within 1 month', 'Within 3 months', 'Within 6+ months'];
  const employmentTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const locationOptions = ['Remote', 'Onsite', 'Hybrid'];
  const salaryPeriodOptions = ['Yearly', 'Monthly'];
  const currencyOptions = ['USD', 'INR', 'EUR', 'GBP'];

  const toggleEmploymentType = (type: string) => {
    if (employmentType.includes(type)) {
      setEmploymentType(employmentType.filter(t => t !== type));
    } else {
      setEmploymentType([...employmentType, type]);
    }
  };

  const handleLocationChange = (location: string) => {
    updateFormData({ locationPreference: location });
    setShowCityField(location === 'Onsite' || location === 'Hybrid');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({ employmentType });
    onFinish();
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
        Hiring Intent
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-sanjuan-lightest p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
            Role Information
          </h3>
          <div>
            <label htmlFor="roleTitle" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Role Title
            </label>
            <input
              id="roleTitle"
              type="text"
              value={formData.roleTitle}
              onChange={(e) => updateFormData({ roleTitle: e.target.value })}
              className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-tango-base focus:border-tango-base"
              placeholder="e.g. Frontend Developer"
            />
          </div>
        </div>

        <div className="bg-sanjuan-lightest p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
            Hiring Details
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-sanjuan-dark mb-3">
                Number of Hires Planned
              </label>
              <div className="flex flex-wrap gap-3">
                {numberOfHiresOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="numberOfHires"
                      value={option}
                      checked={formData.numberOfHires === option}
                      onChange={(e) => updateFormData({ numberOfHires: e.target.value })}
                      className="sr-only"
                    />
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                        formData.numberOfHires === option
                          ? 'bg-tango-base text-white'
                          : 'bg-white border border-sanjuan-lighter text-sanjuan-dark hover:bg-sanjuan-lightest'
                      }`}
                    >
                      {option}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sanjuan-dark mb-3">
                Hire Timeline
              </label>
              <div className="flex flex-wrap gap-3">
                {timelineOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="hireTimeline"
                      value={option}
                      checked={formData.hireTimeline === option}
                      onChange={(e) => updateFormData({ hireTimeline: e.target.value })}
                      className="sr-only"
                    />
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                        formData.hireTimeline === option
                          ? 'bg-tango-base text-white'
                          : 'bg-white border border-sanjuan-lighter text-sanjuan-dark hover:bg-sanjuan-lightest'
                      }`}
                    >
                      {option}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sanjuan-dark mb-3">
                Employment Type (multi-select)
              </label>
              <div className="flex flex-wrap gap-3">
                {employmentTypeOptions.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={employmentType.includes(type)}
                      onChange={() => toggleEmploymentType(type)}
                      className="sr-only"
                    />
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                        employmentType.includes(type)
                          ? 'bg-tango-base text-white'
                          : 'bg-white border border-sanjuan-lighter text-sanjuan-dark hover:bg-sanjuan-lightest'
                      }`}
                    >
                      {type}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-sanjuan-lightest p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-sanjuan-dark mb-4 font-['Inter']">
            Location & Compensation
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-sanjuan-dark mb-3">
                Location Preference
              </label>
              <div className="flex flex-wrap gap-3">
                {locationOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="locationPreference"
                      value={option}
                      checked={formData.locationPreference === option}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                        formData.locationPreference === option
                          ? 'bg-tango-base text-white'
                          : 'bg-white border border-sanjuan-lighter text-sanjuan-dark hover:bg-sanjuan-lightest'
                      }`}
                    >
                      {option}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {showCityField && (
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-sanjuan-dark mb-1">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateFormData({ city: e.target.value })}
                  className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-tango-base focus:border-tango-base"
                  placeholder="e.g. San Francisco"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="salaryPeriod" className="block text-sm font-medium text-sanjuan-dark mb-1">
                  Salary Period
                </label>
                <select
                  id="salaryPeriod"
                  value={formData.salaryPeriod}
                  onChange={(e) => updateFormData({ salaryPeriod: e.target.value })}
                  className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-tango-base focus:border-tango-base"
                >
                  {salaryPeriodOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-sanjuan-dark mb-1">
                  Currency
                </label>
                <select
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => updateFormData({ currency: e.target.value })}
                  className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-tango-base focus:border-tango-base"
                >
                  {currencyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="salaryMin" className="block text-sm font-medium text-sanjuan-dark mb-1">
                  Salary Range (Min)
                </label>
                <input
                  id="salaryMin"
                  type="text"
                  value={formData.salaryMin}
                  onChange={(e) => updateFormData({ salaryMin: e.target.value })}
                  className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-tango-base focus:border-tango-base"
                  placeholder="e.g. 50000"
                />
              </div>
              <div>
                <label htmlFor="salaryMax" className="block text-sm font-medium text-sanjuan-dark mb-1">
                  Salary Range (Max)
                </label>
                <input
                  id="salaryMax"
                  type="text"
                  value={formData.salaryMax}
                  onChange={(e) => updateFormData({ salaryMax: e.target.value })}
                  className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-tango-base focus:border-tango-base"
                  placeholder="e.g. 80000"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.equityAvailable}
                  onChange={(e) => updateFormData({ equityAvailable: e.target.checked })}
                  className="h-4 w-4 text-tango-base border-sanjuan-lighter rounded focus:ring-tango-base"
                />
                <span className="ml-2 text-sm text-sanjuan-dark">
                  Equity Available
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            icon={<ArrowLeftIcon size={16} />}
            iconPosition="left"
            className="border-[#374151] text-white hover:bg-[#374151] transition-all duration-200"
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Finish
          </Button>
        </div>
      </form>
    </div>
  );
}
