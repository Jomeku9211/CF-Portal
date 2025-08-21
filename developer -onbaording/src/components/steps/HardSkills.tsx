import React, { useState } from 'react';
import { Select } from '../../components/Select';
import { RadioGroup, Radio } from '../../components/RadioGroup';
import { Input } from '../../components/Input';
interface HardSkillsProps {
  formData: any;
  updateFormData: (data: any) => void;
}
export function HardSkills({
  formData,
  updateFormData
}: HardSkillsProps) {
  const [localData, setLocalData] = useState({
    primaryStack: formData.primaryStack || '',
    secondarySkills: formData.secondarySkills || [],
    experienceLevel: formData.experienceLevel || '',
    domainExperience: formData.domainExperience || []
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
  const primaryStackOptions = [{
    value: 'frontend',
    label: 'Frontend Development'
  }, {
    value: 'backend',
    label: 'Backend Development'
  }, {
    value: 'fullstack',
    label: 'Full Stack Development'
  }, {
    value: 'mobile',
    label: 'Mobile Development'
  }, {
    value: 'data',
    label: 'Data Engineering/Science'
  }, {
    value: 'devops',
    label: 'DevOps'
  }, {
    value: 'ai',
    label: 'AI/Machine Learning'
  }];
  const secondarySkillsOptions = [{
    value: 'react',
    label: 'React'
  }, {
    value: 'angular',
    label: 'Angular'
  }, {
    value: 'vue',
    label: 'Vue.js'
  }, {
    value: 'node',
    label: 'Node.js'
  }, {
    value: 'python',
    label: 'Python'
  }, {
    value: 'java',
    label: 'Java'
  }, {
    value: 'csharp',
    label: 'C#'
  }, {
    value: 'go',
    label: 'Go'
  }, {
    value: 'aws',
    label: 'AWS'
  }, {
    value: 'azure',
    label: 'Azure'
  }, {
    value: 'docker',
    label: 'Docker'
  }, {
    value: 'kubernetes',
    label: 'Kubernetes'
  }];
  const domainOptions = [{
    value: 'fintech',
    label: 'Fintech'
  }, {
    value: 'healthtech',
    label: 'Healthtech'
  }, {
    value: 'saas',
    label: 'SaaS'
  }, {
    value: 'ecommerce',
    label: 'E-commerce'
  }, {
    value: 'edtech',
    label: 'Edtech'
  }, {
    value: 'gaming',
    label: 'Gaming'
  }, {
    value: 'socialMedia',
    label: 'Social Media'
  }, {
    value: 'cybersecurity',
    label: 'Cybersecurity'
  }];
  return <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Hard Skill Snapshot
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Tell us about your technical skills and experience
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Tech Stack
          </label>
          <Select options={primaryStackOptions} value={localData.primaryStack} onChange={value => handleChange('primaryStack', value)} placeholder="Select your primary tech stack" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secondary Skills
          </label>
          <Select options={secondarySkillsOptions} value={localData.secondarySkills} onChange={value => handleChange('secondarySkills', value)} placeholder="Select your secondary skills" multiple />
          <p className="text-xs text-gray-500 mt-1">Select all that apply</p>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <RadioGroup legend="Experience Level" value={localData.experienceLevel} onChange={value => handleChange('experienceLevel', value)}>
            <Radio value="junior">Junior (0-2 years)</Radio>
            <Radio value="mid">Mid-Level (3-5 years)</Radio>
            <Radio value="senior">Senior (6-9 years)</Radio>
            <Radio value="lead">Lead/Principal (10+ years)</Radio>
          </RadioGroup>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Domain Experience
          </label>
          <Select options={domainOptions} value={localData.domainExperience} onChange={value => handleChange('domainExperience', value)} placeholder="Select domains you've worked in" multiple />
          <p className="text-xs text-gray-500 mt-1">Select all that apply</p>
        </div>
      </div>
    </div>;
}