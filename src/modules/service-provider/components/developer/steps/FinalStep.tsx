import React from 'react';
import { SectionTitle, TextInput, SelectInput } from '../FormComponents';

export function FinalStep() {
  const availabilityOptions = [
    { value: 'immediate', label: 'Immediately available' },
    { value: '2-weeks', label: 'Available in 2 weeks' },
    { value: '1-month', label: 'Available in 1 month' },
    { value: '3-months', label: 'Available in 3 months' },
    { value: 'flexible', label: 'Flexible start date' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'INR', label: 'INR (₹)' },
    { value: 'CAD', label: 'CAD (C$)' }
  ];

  return (
    <div>
      <SectionTitle 
        title="Final Details" 
        description="Almost done! Just a few more details to complete your profile." 
      />
      
      <SelectInput 
        label="When are you available to start?" 
        name="availability" 
        options={availabilityOptions} 
        placeholder="Select availability" 
        required 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput 
          label="Salary Expectation (per year)" 
          name="salaryExpectation" 
          placeholder="e.g., 80000" 
          required 
        />
        
        <SelectInput 
          label="Currency" 
          name="currency" 
          options={currencyOptions} 
          placeholder="Select currency" 
          required 
        />
      </div>
      
      <div className="bg-sanjuan-lightest rounded-lg p-4 mt-6">
        <h4 className="font-medium text-sanjuan-dark mb-2">Profile Completion</h4>
        <p className="text-sm text-sanjuan-base">
          You're almost there! Review all the information you've provided and click "Complete" to finish your developer profile setup.
        </p>
      </div>
    </div>
  );
}
