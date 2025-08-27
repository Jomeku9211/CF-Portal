import React, { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { SectionTitle, SelectInput } from '../FormComponents';
import { XIcon, PlusIcon, SearchIcon } from 'lucide-react';

export function SkillsStep() {
  const {
    control,
    setValue,
    register
  } = useFormContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const selectedSkills = useWatch({
    control,
    name: 'skills'
  }) || [];

  const allSkills = [
    'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Next.js', 
    'Node.js', 'Express.js', 'NestJS', 'Python', 'Django', 'Flask', 'FastAPI', 
    'Java', 'Spring Boot', 'Kotlin', 'Swift', 'C#', '.NET Core', 'PHP', 
    'Laravel', 'Ruby on Rails', 'Go (Golang)', 'Rust', 'SQL', 
    'NoSQL (MongoDB, DynamoDB, etc.)', 'AWS', 'GCP', 'Azure', 'Docker', 
    'Kubernetes', 'Terraform'
  ];

  const filteredSkills = allSkills.filter(
    skill => skill.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !selectedSkills.includes(skill)
  );

  const skillLevelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const addSkill = (skill: string) => {
    const updatedSkills = [...selectedSkills, skill];
    setValue('skills', updatedSkills);
    setSearchTerm('');
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    setValue('skills', updatedSkills);
  };

  return (
    <div>
      <SectionTitle 
        title="Skills & Tech Stack" 
        description="Let us know about your technical skills and proficiency levels." 
      />
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-sanjuan-dark mb-1">
          What are your primary technical skills?
        </label>
        
        <div className="relative mb-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-sanjuan-base" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for skills..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sanjuan-lighter focus:ring-sanjuan-light focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
          />
        </div>
        
        {searchTerm && filteredSkills.length > 0 && (
          <div className="mb-4 max-h-40 overflow-y-auto border border-sanjuan-lighter rounded-lg">
            <ul className="divide-y divide-sanjuan-lighter">
              {filteredSkills.map(skill => (
                <li key={skill} className="p-2 hover:bg-sanjuan-lightest">
                  <button
                    type="button"
                    onClick={() => addSkill(skill)}
                    className="w-full text-left flex items-center text-sm text-sanjuan-dark"
                  >
                    <PlusIcon className="h-4 w-4 mr-2 text-sanjuan-base" />
                    {skill}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map(skill => (
            <div key={skill} className="bg-sanjuan-lightest text-sanjuan-dark rounded-full px-3 py-1 text-sm flex items-center">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-1 text-sanjuan-base hover:text-sanjuan-dark"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {selectedSkills.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-sanjuan-dark">
            Select your skill level for each chosen skill:
          </h3>
          {selectedSkills.map(skill => (
            <div key={`level-${skill}`} className="flex items-center">
              <span className="w-1/3 text-sm text-sanjuan-dark">{skill}:</span>
              <div className="w-2/3">
                <select
                  {...register(`skillLevels.${skill}`)}
                  className="w-full px-3 py-2 rounded-lg border border-sanjuan-lighter focus:ring-sanjuan-light focus:outline-none focus:ring-2 focus:border-transparent transition-colors bg-white"
                >
                  <option value="">Select level</option>
                  {skillLevelOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
