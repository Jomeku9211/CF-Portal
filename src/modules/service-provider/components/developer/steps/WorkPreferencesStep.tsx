import React from 'react';
import { SectionTitle, SelectInput, CheckboxGroup } from '../FormComponents';

export function WorkPreferencesStep() {
  const timezoneOverlapOptions = [
    { value: '4-6-hours', label: '4-6 hours overlap with US timezone' },
    { value: '6-8-hours', label: '6-8 hours overlap with US timezone' },
    { value: '8-10-hours', label: '8-10 hours overlap with US timezone' },
    { value: 'full-overlap', label: 'Full overlap with US timezone' }
  ];

  const teamSizeOptions = [
    { value: '1-5', label: '1-5 people' },
    { value: '6-15', label: '6-15 people' },
    { value: '16-50', label: '16-50 people' },
    { value: '50+', label: '50+ people' }
  ];

  const companyStageOptions = [
    { value: 'startup', label: 'Startup (0-5 years)' },
    { value: 'growth', label: 'Growth stage (5-10 years)' },
    { value: 'established', label: 'Established company (10+ years)' },
    { value: 'enterprise', label: 'Enterprise company' }
  ];

  const workStyleOptions = [
    { value: 'collaborative', label: 'Collaborative team environment' },
    { value: 'independent', label: 'Independent work style' },
    { value: 'mentoring', label: 'Mentoring and teaching others' },
    { value: 'learning', label: 'Continuous learning and growth' },
    { value: 'fast-paced', label: 'Fast-paced, dynamic environment' },
    { value: 'structured', label: 'Structured, process-driven approach' }
  ];

  return (
    <div>
      <SectionTitle 
        title="Work Preferences" 
        description="Tell us about your preferred work environment and team dynamics." 
      />
      
      <SelectInput 
        label="What's your preferred timezone overlap with US teams?" 
        name="timezoneOverlap" 
        options={timezoneOverlapOptions} 
        placeholder="Select timezone preference" 
        required 
      />
      
      <SelectInput 
        label="What team size do you prefer working with?" 
        name="teamSize" 
        options={teamSizeOptions} 
        placeholder="Select team size preference" 
        required 
      />
      
      <SelectInput 
        label="What company stage interests you most?" 
        name="companyStage" 
        options={companyStageOptions} 
        placeholder="Select company stage preference" 
        required 
      />
      
      <CheckboxGroup 
        label="What work styles do you prefer?" 
        name="workStyles" 
        options={workStyleOptions} 
        required 
      />
    </div>
  );
}
