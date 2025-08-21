import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { RadioGroup, Radio } from '../../components/RadioGroup';
interface AccountSetupProps {
  formData: any;
  updateFormData: (data: any) => void;
}
export function AccountSetup({
  formData,
  updateFormData
}: AccountSetupProps) {
  const [localData, setLocalData] = useState({
    name: formData.name || '',
    email: formData.email || '',
    phone: formData.phone || '',
    location: formData.location || '',
    rolePreference: formData.rolePreference || '',
    currentStatus: formData.currentStatus || ''
  });
  const handleChange = e => {
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
  const handleRadioChange = (name, value) => {
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
    updateFormData({
      [name]: value
    });
  };
  return <div className="space-y-6">
      <div className="border-b border-neutral-darkest border-opacity-15 pb-4 mb-6">
        <h2 className="text-medium-semi-bold font-inter text-sanjuan-base">
          Quick Account Setup
        </h2>
        <p className="text-small-normal text-neutral-dark mt-1">
          Let's start with some basic information about you
        </p>
      </div>
      <div className="space-y-4">
        <Input label="Full Name" name="name" value={localData.name} onChange={handleChange} placeholder="John Doe" required />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Email" name="email" type="email" value={localData.email} onChange={handleChange} placeholder="you@example.com" required startAdornment={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>} />
          <Input label="Phone Number" name="phone" type="tel" value={localData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" startAdornment={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>} />
        </div>
        <Input label="Location" name="location" value={localData.location} onChange={handleChange} placeholder="City, Country" helperText="We'll auto-detect your time zone" startAdornment={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>} />
      </div>
      <div className="p-5 bg-neutral-lightest rounded-lg mt-6 border border-neutral-darkest border-opacity-10">
        <RadioGroup legend="Role Preference" value={localData.rolePreference} onChange={value => handleRadioChange('rolePreference', value)}>
          <Radio value="full-time">Full-time</Radio>
          <Radio value="contract">Contract</Radio>
          <Radio value="remote">Remote</Radio>
          <Radio value="onsite">Onsite</Radio>
        </RadioGroup>
      </div>
      <div className="p-5 bg-neutral-lightest rounded-lg border border-neutral-darkest border-opacity-10">
        <RadioGroup legend="Current Status" value={localData.currentStatus} onChange={value => handleRadioChange('currentStatus', value)}>
          <Radio value="open">Open to work</Radio>
          <Radio value="passive">Passive (not actively looking)</Radio>
          <Radio value="exploring">Just exploring</Radio>
        </RadioGroup>
      </div>
    </div>;
}