import React, { Component } from 'react';
import { SectionTitle, CheckboxGroup } from '../FormComponents';
export function SoftSkillsStep() {
  const communicationOptions = [{
    value: 'explain_tech',
    label: 'Can explain technical ideas to non-tech teammates'
  }, {
    value: 'documentation',
    label: 'Can write clear documentation or async updates'
  }, {
    value: 'discussions',
    label: 'Can participate in team/product/client discussions'
  }, {
    value: 'proactive',
    label: 'Shares updates proactively'
  }, {
    value: 'feedback',
    label: 'Gives and receives feedback constructively'
  }, {
    value: 'lead',
    label: 'Can lead standups or sprint discussions'
  }];
  const ownershipOptions = [{
    value: 'responsibility',
    label: 'Takes full responsibility for a feature or module'
  }, {
    value: 'initiative',
    label: "Doesn't need to be told what to do next"
  }, {
    value: 'blockers',
    label: 'Acts on blockers without being followed up'
  }, {
    value: 'long_term',
    label: 'Thinks about long-term impact, not just quick fixes'
  }, {
    value: 'accountable',
    label: 'Is accountable for bugs or outcomes — no blame game'
  }];
  const collaborationOptions = [{
    value: 'cross_team',
    label: 'Works smoothly with product/design/founders'
  }, {
    value: 'pair',
    label: 'Comfortable with pair programming or reviews'
  }, {
    value: 'unblocks',
    label: 'Keeps others unblocked — communicates delays'
  }, {
    value: 'context',
    label: 'Shares context to avoid silos'
  }, {
    value: 'team_align',
    label: 'Aligns decisions with team, not ego'
  }];
  const problemSolvingOptions = [{
    value: 'debug',
    label: 'Can debug deeply before asking for help'
  }, {
    value: 'suggests',
    label: 'Suggests better ways, not just follows instructions'
  }, {
    value: 'balance',
    label: 'Balances quick fixes with solid solutions'
  }, {
    value: 'product_impact',
    label: 'Understands product impact, not just code logic'
  }, {
    value: 'root_cause',
    label: 'Prioritizes root cause, not patchwork'
  }];
  const learningOptions = [{
    value: 'why',
    label: 'Tries to understand "why," not just "how"'
  }, {
    value: 'docs',
    label: 'Reads docs / explores tools without handholding'
  }, {
    value: 'experiments',
    label: 'Experiments and shares new ideas with the team'
  }, {
    value: 'mistakes',
    label: 'Learns from mistakes and feedback'
  }, {
    value: 'modern',
    label: 'Keeps up with modern tools and practices'
  }];
  return <div>
      <SectionTitle title="Soft Skills & Attitude" description="Let us know about your working style and professional attributes." />
      <CheckboxGroup label="Communication" name="communicationSkills" options={communicationOptions} />
      <CheckboxGroup label="Ownership" name="ownershipSkills" options={ownershipOptions} />
      <CheckboxGroup label="Collaboration" name="collaborationSkills" options={collaborationOptions} />
      <CheckboxGroup label="Problem-Solving" name="problemSolvingSkills" options={problemSolvingOptions} />
      <CheckboxGroup label="Curiosity / Learning Attitude" name="learningAttitude" options={learningOptions} />
    </div>;
}