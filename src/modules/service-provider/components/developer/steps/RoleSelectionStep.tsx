import React from 'react';
import { SectionTitle, TextInput, SelectInput, CheckboxGroup } from '../FormComponents';

export function RoleSelectionStep() {
  const workTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  const jobRoleOptions = [
    { value: 'frontend-developer', label: 'Frontend Developer' },
    { value: 'backend-developer', label: 'Backend Developer' },
    { value: 'full-stack-developer', label: 'Full Stack Developer' },
    { value: 'mobile-developer', label: 'Mobile Developer' },
    { value: 'devops-engineer', label: 'DevOps Engineer' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'machine-learning-engineer', label: 'Machine Learning Engineer' },
    { value: 'ui-ux-designer', label: 'UI/UX Designer' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div>
      <SectionTitle 
        title="Role Selection" 
        description="Tell us about the type of work you're looking for and your preferred role." 
      />
      
      <CheckboxGroup 
        label="What types of work are you interested in?" 
        name="workTypes" 
        options={workTypeOptions} 
        required 
      />
      
      <SelectInput 
        label="What's your primary job role?" 
        name="jobRole" 
        options={jobRoleOptions} 
        placeholder="Select your primary role" 
        required 
      />
      
      <TextInput 
        label="If you selected 'Other', please specify:" 
        name="otherJobRole" 
        placeholder="Describe your role" 
      />
    </div>
  );
}
