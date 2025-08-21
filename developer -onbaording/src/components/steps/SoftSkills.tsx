import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '../../components/Tabs';
import { RadioGroup, Radio } from '../../components/RadioGroup';
interface SoftSkillsProps {
  formData: any;
  updateFormData: (data: any) => void;
}
export function SoftSkills({
  formData,
  updateFormData
}: SoftSkillsProps) {
  const [localData, setLocalData] = useState({
    communication: formData.communication || '',
    teamwork: formData.teamwork || '',
    problemSolving: formData.problemSolving || '',
    adaptability: formData.adaptability || ''
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
  return <div className="space-y-6">
      <div className="border-b border-neutral-darkest border-opacity-15 pb-4 mb-6">
        <h2 className="text-medium-semi-bold font-inter text-sanjuan-base">
          Soft Skills Assessment
        </h2>
        <p className="text-small-normal text-neutral-dark mt-1">
          Help us understand your working style and interpersonal skills
        </p>
      </div>
      <Tabs defaultTab="communication">
        <TabList>
          <Tab id="communication" className="text-small-medium">
            Communication
          </Tab>
          <Tab id="teamwork" className="text-small-medium">
            Teamwork
          </Tab>
          <Tab id="problemSolving" className="text-small-medium">
            Problem Solving
          </Tab>
          <Tab id="adaptability" className="text-small-medium">
            Adaptability
          </Tab>
        </TabList>
        <div className="mt-6 p-4 border border-neutral-darkest border-opacity-15 rounded-md bg-neutral-lightest">
          <TabPanel id="communication">
            <h3 className="text-regular-medium font-inter text-sanjuan-dark mb-4">
              Communication Style
            </h3>
            <RadioGroup value={localData.communication} onChange={value => handleChange('communication', value)}>
              <Radio value="direct">Direct and straightforward</Radio>
              <Radio value="detailed">Detailed and thorough</Radio>
              <Radio value="collaborative">
                Collaborative and discussion-oriented
              </Radio>
              <Radio value="visual">Visual and demonstration-focused</Radio>
            </RadioGroup>
          </TabPanel>
          <TabPanel id="teamwork">
            <h3 className="text-regular-medium font-inter text-sanjuan-dark mb-4">
              Team Collaboration
            </h3>
            <RadioGroup value={localData.teamwork} onChange={value => handleChange('teamwork', value)}>
              <Radio value="leader">Natural leader who takes initiative</Radio>
              <Radio value="collaborator">Collaborative team player</Radio>
              <Radio value="independent">
                Independent worker who coordinates when needed
              </Radio>
              <Radio value="supporter">
                Supportive team member who helps others succeed
              </Radio>
            </RadioGroup>
          </TabPanel>
          <TabPanel id="problemSolving">
            <h3 className="text-regular-medium font-inter text-sanjuan-dark mb-4">
              Problem Solving Approach
            </h3>
            <RadioGroup value={localData.problemSolving} onChange={value => handleChange('problemSolving', value)}>
              <Radio value="analytical">Analytical and systematic</Radio>
              <Radio value="creative">Creative and innovative</Radio>
              <Radio value="practical">Practical and solution-focused</Radio>
              <Radio value="collaborative">
                Collaborative and discussion-based
              </Radio>
            </RadioGroup>
          </TabPanel>
          <TabPanel id="adaptability">
            <h3 className="text-regular-medium font-inter text-sanjuan-dark mb-4">
              Adaptability to Change
            </h3>
            <RadioGroup value={localData.adaptability} onChange={value => handleChange('adaptability', value)}>
              <Radio value="embrace">
                Embrace change and thrive in dynamic environments
              </Radio>
              <Radio value="adjust">Adjust well after initial planning</Radio>
              <Radio value="cautious">
                Cautious but open to necessary changes
              </Radio>
              <Radio value="stability">
                Prefer stability and structured environments
              </Radio>
            </RadioGroup>
          </TabPanel>
        </div>
      </Tabs>
      <div className="p-4 bg-tango-lightest border border-dashed border-tango-light rounded-lg mt-6">
        <h3 className="text-regular-medium font-inter text-sanjuan-dark mb-2">
          Strengths & Growth Areas
        </h3>
        <p className="text-small-normal text-neutral-dark mb-4">
          What are your key strengths and areas you're working to improve?
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-small-medium text-sanjuan-dark mb-1">
              Key Strengths (Top 3)
            </label>
            <div className="border border-neutral-darkest border-opacity-15 rounded-md p-3 bg-neutral-white min-h-[80px]">
              <p className="text-small-normal text-neutral-base">
                Click to add your key strengths...
              </p>
            </div>
          </div>
          <div>
            <label className="block text-small-medium text-sanjuan-dark mb-1">
              Growth Areas (Top 3)
            </label>
            <div className="border border-neutral-darkest border-opacity-15 rounded-md p-3 bg-neutral-white min-h-[80px]">
              <p className="text-small-normal text-neutral-base">
                Click to add areas you're developing...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}