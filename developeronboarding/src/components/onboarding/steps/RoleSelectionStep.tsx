import React, { Component } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { SectionTitle, CheckboxGroup, SelectInput, TextInput } from '../FormComponents';
export function RoleSelectionStep() {
  const {
    control
  } = useFormContext();
  const jobRole = useWatch({
    control,
    name: 'jobRole'
  });
  const workTypeOptions = [{
    value: 'fulltime_onsite',
    label: 'Full-Time (Onsite)'
  }, {
    value: 'fulltime_remote',
    label: 'Full-Time (Remote)'
  }, {
    value: 'contract_onsite',
    label: 'Contract / Freelance (Onsite)'
  }, {
    value: 'contract_remote',
    label: 'Contract / Freelance (Remote)'
  }];
  const jobRoleOptions = [{
    value: 'frontend',
    label: 'Frontend Developer'
  }, {
    value: 'backend',
    label: 'Backend Developer'
  }, {
    value: 'fullstack',
    label: 'Fullstack Developer'
  }, {
    value: 'mobile',
    label: 'Mobile Developer (iOS / Android / Cross-Platform)'
  }, {
    value: 'devops',
    label: 'DevOps Engineer'
  }, {
    value: 'qa',
    label: 'QA / Automation Engineer'
  }, {
    value: 'data_engineer',
    label: 'Data Engineer'
  }, {
    value: 'data_scientist',
    label: 'Data Scientist'
  }, {
    value: 'ai_ml',
    label: 'AI / ML Engineer'
  }, {
    value: 'ui_ux',
    label: 'UI/UX Developer'
  }, {
    value: 'blockchain',
    label: 'Blockchain Developer'
  }, {
    value: 'game',
    label: 'Game Developer'
  }, {
    value: 'other',
    label: 'Other'
  }];
  return <div>
      <SectionTitle title="Role Selection" description="Tell us about the type of work you're looking for and your professional role." />
      <CheckboxGroup label="What kind of work are you open to?" name="workTypes" options={workTypeOptions} required />
      <SelectInput label="Preferred Job Role" name="jobRole" options={jobRoleOptions} placeholder="Select your job role" required />
      {jobRole === 'other' && <TextInput label="Please specify your job role" name="otherJobRole" placeholder="e.g., Security Engineer, Technical Writer" required />}
    </div>;
}