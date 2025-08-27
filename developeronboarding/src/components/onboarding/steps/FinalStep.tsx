import React, { Component } from 'react';
import { SectionTitle, SelectInput, TextInput } from '../FormComponents';
export function FinalStep() {
  const availabilityOptions = [{
    value: 'immediate',
    label: 'Immediately available'
  }, {
    value: '2weeks',
    label: '2 weeks notice'
  }, {
    value: '1month',
    label: '1 month notice'
  }, {
    value: 'more',
    label: 'More than 1 month'
  }];
  const currencyOptions = [{
    value: 'USD',
    label: 'USD ($)'
  }, {
    value: 'EUR',
    label: 'EUR (€)'
  }, {
    value: 'GBP',
    label: 'GBP (£)'
  }, {
    value: 'INR',
    label: 'INR (₹)'
  }, {
    value: 'CAD',
    label: 'CAD ($)'
  }, {
    value: 'AUD',
    label: 'AUD ($)'
  }, {
    value: 'JPY',
    label: 'JPY (¥)'
  }, {
    value: 'SGD',
    label: 'SGD ($)'
  }];
  return <div>
      <SectionTitle title="Final Step" description="Just a few more details to complete your profile." />
      <SelectInput label="Set Your Availability" name="availability" options={availabilityOptions} placeholder="Select availability" required />
      <div className="mb-5">
        <label className="block text-sm font-medium text-sanjuan-dark mb-1">
          Preferred Salary / Rate Expectation
        </label>
        <div className="flex items-center">
          <div className="w-2/3 mr-2">
            <input type="number" name="salaryExpectation" placeholder="e.g., 75000" className="w-full px-4 py-2.5 rounded-lg border border-sanjuan-lighter focus:ring-sanjuan-light focus:outline-none focus:ring-2 focus:border-transparent transition-colors" />
          </div>
          <div className="w-1/3">
            <select name="currency" className="w-full px-3 py-2.5 rounded-lg border border-sanjuan-lighter focus:ring-sanjuan-light focus:outline-none focus:ring-2 focus:border-transparent transition-colors bg-white">
              {currencyOptions.map(option => <option key={option.value} value={option.value}>
                  {option.label}
                </option>)}
            </select>
          </div>
        </div>
        <p className="mt-1 text-xs text-sanjuan-base">
          For full-time roles, provide annual salary. For contract work, provide
          hourly or daily rate.
        </p>
      </div>
      <div className="mt-6 p-4 bg-sanjuan-lightest rounded-lg">
        <h3 className="text-sm font-medium text-sanjuan-dark mb-2">
          Almost there!
        </h3>
        <p className="text-sm text-sanjuan-base">
          Once you submit your profile, our team will review your information
          within 48 hours. You'll receive an email confirmation when your
          profile is approved, and you can start exploring opportunities that
          match your skills and preferences.
        </p>
      </div>
    </div>;
}