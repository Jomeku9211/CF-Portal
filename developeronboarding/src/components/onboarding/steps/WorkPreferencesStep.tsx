import React, { Component } from 'react';
import { SectionTitle, SelectInput, CheckboxGroup } from '../FormComponents';
export function WorkPreferencesStep() {
  const timezoneOptions = [{
    value: '0-2',
    label: '0–2 hours overlap'
  }, {
    value: '2-4',
    label: '2–4 hours overlap'
  }, {
    value: '4-6',
    label: '4–6 hours overlap'
  }, {
    value: 'full',
    label: "Full overlap with client's timezone"
  }];
  const teamSizeOptions = [{
    value: '1-5',
    label: '1–5 people'
  }, {
    value: '6-15',
    label: '6–15 people'
  }, {
    value: '16-50',
    label: '16–50 people'
  }, {
    value: '50+',
    label: '50+ people'
  }];
  const companyStageOptions = [{
    value: 'early',
    label: 'Early-stage startup'
  }, {
    value: 'growth',
    label: 'Growth-stage startup'
  }, {
    value: 'midsize',
    label: 'Mid-size company'
  }, {
    value: 'enterprise',
    label: 'Large enterprise'
  }];
  const workStyleOptions = [{
    value: 'async',
    label: 'Async communication'
  }, {
    value: 'standups',
    label: 'Daily standups'
  }, {
    value: 'pair',
    label: 'Pair programming'
  }, {
    value: 'independent',
    label: 'Independent contributor'
  }, {
    value: 'collaborative',
    label: 'High-collaboration environment'
  }];
  return <div>
      <SectionTitle title="Work Preferences" description="Tell us about your ideal work environment and preferences." />
      <SelectInput label="Preferred Time Zone Overlap" name="timezoneOverlap" options={timezoneOptions} placeholder="Select preferred overlap" required />
      <SelectInput label="Preferred Team Size" name="teamSize" options={teamSizeOptions} placeholder="Select team size" required />
      <SelectInput label="Preferred Company Stage" name="companyStage" options={companyStageOptions} placeholder="Select company stage" required />
      <CheckboxGroup label="Preferred Work Style" name="workStyles" options={workStyleOptions} required />
    </div>;
}