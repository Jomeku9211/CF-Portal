import React from 'react';
import { SectionTitle, CheckboxGroup } from '../FormComponents';

export function SoftSkillsStep() {
  const communicationSkillsOptions = [
    { value: 'written', label: 'Excellent written communication' },
    { value: 'verbal', label: 'Strong verbal communication' },
    { value: 'presentation', label: 'Presentation skills' },
    { value: 'documentation', label: 'Technical documentation' },
    { value: 'client-interaction', label: 'Client interaction' }
  ];

  const ownershipSkillsOptions = [
    { value: 'project-management', label: 'Project management' },
    { value: 'decision-making', label: 'Decision making' },
    { value: 'problem-solving', label: 'Problem solving' },
    { value: 'initiative', label: 'Taking initiative' },
    { value: 'accountability', label: 'Accountability' }
  ];

  const collaborationSkillsOptions = [
    { value: 'team-player', label: 'Team player' },
    { value: 'conflict-resolution', label: 'Conflict resolution' },
    { value: 'mentoring', label: 'Mentoring others' },
    { value: 'cross-functional', label: 'Cross-functional collaboration' },
    { value: 'remote-collaboration', label: 'Remote collaboration' }
  ];

  const problemSolvingSkillsOptions = [
    { value: 'analytical', label: 'Analytical thinking' },
    { value: 'creative', label: 'Creative problem solving' },
    { value: 'systematic', label: 'Systematic approach' },
    { value: 'research', label: 'Research and investigation' },
    { value: 'testing', label: 'Testing and validation' }
  ];

  const learningAttitudeOptions = [
    { value: 'continuous-learning', label: 'Continuous learning mindset' },
    { value: 'adaptability', label: 'Adaptability to new technologies' },
    { value: 'curiosity', label: 'Intellectual curiosity' },
    { value: 'feedback', label: 'Open to feedback' },
    { value: 'knowledge-sharing', label: 'Knowledge sharing' }
  ];

  return (
    <div>
      <SectionTitle 
        title="Soft Skills & Personal Attributes" 
        description="Tell us about your interpersonal skills and work approach." 
      />
      
      <CheckboxGroup 
        label="Communication Skills" 
        name="communicationSkills" 
        options={communicationSkillsOptions} 
        required 
      />
      
      <CheckboxGroup 
        label="Ownership & Leadership" 
        name="ownershipSkills" 
        options={ownershipSkillsOptions} 
        required 
      />
      
      <CheckboxGroup 
        label="Collaboration & Teamwork" 
        name="collaborationSkills" 
        options={collaborationSkillsOptions} 
        required 
      />
      
      <CheckboxGroup 
        label="Problem Solving Approach" 
        name="problemSolvingSkills" 
        options={problemSolvingSkillsOptions} 
        required 
      />
      
      <CheckboxGroup 
        label="Learning & Growth Mindset" 
        name="learningAttitude" 
        options={learningAttitudeOptions} 
        required 
      />
    </div>
  );
}
