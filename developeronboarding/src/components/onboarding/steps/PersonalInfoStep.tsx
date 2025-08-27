import React, { Component } from 'react';
import { SectionTitle, TextInput, SelectInput, FileUpload } from '../FormComponents';
export function PersonalInfoStep() {
  // Country options
  const countries = [{
    value: 'us',
    label: 'United States'
  }, {
    value: 'ca',
    label: 'Canada'
  }, {
    value: 'uk',
    label: 'United Kingdom'
  }, {
    value: 'au',
    label: 'Australia'
  }, {
    value: 'in',
    label: 'India'
  }, {
    value: 'de',
    label: 'Germany'
  }, {
    value: 'fr',
    label: 'France'
  }, {
    value: 'jp',
    label: 'Japan'
  }
  // More countries would be added here
  ];
  // States would be dynamic based on country selection in a real app
  const states = [{
    value: 'ca',
    label: 'California'
  }, {
    value: 'ny',
    label: 'New York'
  }, {
    value: 'tx',
    label: 'Texas'
  }, {
    value: 'fl',
    label: 'Florida'
  }, {
    value: 'il',
    label: 'Illinois'
  }
  // More states would be added here
  ];
  // Cities would be dynamic based on state selection in a real app
  const cities = [{
    value: 'sf',
    label: 'San Francisco'
  }, {
    value: 'la',
    label: 'Los Angeles'
  }, {
    value: 'sd',
    label: 'San Diego'
  }, {
    value: 'sj',
    label: 'San Jose'
  }, {
    value: 'fr',
    label: 'Fresno'
  }
  // More cities would be added here
  ];
  return <div>
      <SectionTitle title="Personal Information" description="Tell us a bit about yourself. This information will be used to create your profile." />
      <TextInput label="Full Name" name="fullName" placeholder="John Doe" required />
      <TextInput label="Email" name="email" type="email" placeholder="john@example.com" required />
      <TextInput label="Phone Number" name="phoneNumber" placeholder="+1 (555) 123-4567" required />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectInput label="Country" name="country" options={countries} placeholder="Select country" required />
        <SelectInput label="State/Region" name="state" options={states} placeholder="Select state" required />
        <SelectInput label="City" name="city" options={cities} placeholder="Select city" required />
      </div>
      <FileUpload label="Profile Picture" name="profilePicture" accept="image/*" />
    </div>;
}