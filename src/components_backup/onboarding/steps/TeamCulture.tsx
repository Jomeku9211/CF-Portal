import { RadioGroup } from '../../common/RadioGroup';
import { Dropdown } from '../../common/Dropdown';
import { HelpCircleIcon } from 'lucide-react';
import { Tooltip } from '../../common/Tooltip';

interface TeamCultureProps {
  formData: any;
  onChange: (field: string | number | symbol, value: string) => void;
}

export function TeamCulture({ formData, onChange }: TeamCultureProps) {
  const radioOptions = [{
    id: 'communicationStyle',
    label: 'Preferred Communication Style',
    tooltip: 'What communication methods work best for your team?',
    options: [{
      value: 'written',
      label: 'Written'
    }, {
      value: 'verbal',
      label: 'Verbal'
    }, {
      value: 'mixed',
      label: 'Mixed'
    }],
    value: formData.communicationStyle
  }, {
    id: 'diversityAlignment',
    label: 'Cultural & Diversity Alignment',
    tooltip: 'How does your team approach diversity of thought and background?',
    options: [{
      value: 'thrives_in_diversity',
      label: 'Thrives in diversity'
    }, {
      value: 'respects_diversity',
      label: 'Respects diversity'
    }, {
      value: 'like_minded',
      label: 'Prefers like-minded'
    }],
    value: formData.diversityAlignment
  }];

  const dropdownOptions = [{
    id: 'genderComposition',
    label: 'Team Gender Composition',
    tooltip: 'What is the current gender distribution in your team?',
    options: [{
      value: '',
      label: 'Select an option'
    }, {
      value: 'mostly_male',
      label: 'Mostly male'
    }, {
      value: 'mostly_female',
      label: 'Mostly female'
    }, {
      value: 'mixed',
      label: 'Mixed gender'
    }, {
      value: 'prefer_not_to_say',
      label: 'Prefer not to say'
    }],
    value: formData.genderComposition
  }, {
    id: 'ageComposition',
    label: 'Team Age Composition',
    tooltip: 'What is the age distribution in your team?',
    options: [{
      value: '',
      label: 'Select an option'
    }, {
      value: 'gen_z',
      label: 'Gen Z'
    }, {
      value: 'millennials',
      label: 'Millennials'
    }, {
      value: 'gen_x',
      label: 'Gen X'
    }, {
      value: 'mixed',
      label: 'Mixed age group'
    }, {
      value: 'prefer_not_to_say',
      label: 'Prefer not to say'
    }],
    value: formData.ageComposition
  }];

  return (
    <div className="space-y-6">
      {radioOptions.map(option => (
        <div key={option.id}>
          <div className="flex items-center mb-1">
            <label className="block text-sm font-medium text-white">{option.label}</label>
            <Tooltip content={option.tooltip}>
              <HelpCircleIcon className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
            </Tooltip>
          </div>
          <RadioGroup 
            id={option.id} 
            options={option.options} 
            value={option.value} 
            onChange={value => onChange(option.id, value)} 
          />
        </div>
      ))}
      {dropdownOptions.map(option => (
        <div key={option.id}>
          <div className="flex items-center mb-1">
            <label htmlFor={option.id} className="block text-sm font-medium text-white">
              {option.label}
            </label>
            <Tooltip content={option.tooltip}>
              <HelpCircleIcon className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
            </Tooltip>
          </div>
          <Dropdown 
            id={option.id} 
            options={option.options} 
            value={option.value} 
            onChange={(value: string) => onChange(option.id, value)} 
          />
        </div>
      ))}
    </div>
  );
}
