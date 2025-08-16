import { RadioGroup } from '../../common/RadioGroup';
import { HelpCircleIcon } from 'lucide-react';
import { Tooltip } from '../../common/Tooltip';

interface TeamWorkstyleProps {
  formData: any;
  onChange: (field: string | number | symbol, value: string) => void;
}

export function TeamWorkstyle({ formData, onChange }: TeamWorkstyleProps) {
  const workstyleOptions = [{
    id: 'structurePreference',
    label: 'Structure Preference',
    tooltip: 'How much structure and process does your team need to work effectively?',
    options: [{
      value: 'highly_structured',
      label: 'Highly structured'
    }, {
      value: 'semi_structured',
      label: 'Semi-structured'
    }, {
      value: 'flexible',
      label: 'Flexible'
    }],
    value: formData.structurePreference
  }, {
    id: 'paceOfWork',
    label: 'Pace of Work',
    tooltip: 'What speed does your team typically operate at?',
    options: [{
      value: 'fast',
      label: 'Fast'
    }, {
      value: 'balanced',
      label: 'Balanced'
    }, {
      value: 'thoughtful',
      label: 'Thoughtful'
    }],
    value: formData.paceOfWork
  }, {
    id: 'autonomy',
    label: 'Autonomy',
    tooltip: 'How independent should team members be in their work?',
    options: [{
      value: 'independent',
      label: 'Independent'
    }, {
      value: 'semi_collaborative',
      label: 'Semi-collaborative'
    }, {
      value: 'collaborative',
      label: 'Collaborative'
    }],
    value: formData.autonomy
  }, {
    id: 'initiativeLevel',
    label: 'Initiative Level',
    tooltip: 'How proactive should team members be?',
    options: [{
      value: 'proactive',
      label: 'Proactive'
    }, {
      value: 'reactive',
      label: 'Reactive'
    }, {
      value: 'instruction_led',
      label: 'Instruction-led'
    }],
    value: formData.initiativeLevel
  }, {
    id: 'decisionMakingStyle',
    label: 'Decision-Making Style',
    tooltip: 'What approach to decision-making works best for your team?',
    options: [{
      value: 'analytical',
      label: 'Analytical'
    }, {
      value: 'intuitive',
      label: 'Intuitive'
    }, {
      value: 'mix',
      label: 'Mix'
    }],
    value: formData.decisionMakingStyle
  }, {
    id: 'attentionToDetail',
    label: 'Attention to Detail',
    tooltip: 'What level of detail focus is preferred?',
    options: [{
      value: 'detail_oriented',
      label: 'Detail-oriented'
    }, {
      value: 'big_picture',
      label: 'Big-picture thinkers'
    }, {
      value: 'balanced',
      label: 'Balanced'
    }],
    value: formData.attentionToDetail
  }, {
    id: 'multitaskingAbility',
    label: 'Multitasking Ability',
    tooltip: 'How should team members handle multiple tasks?',
    options: [{
      value: 'single_task',
      label: 'Single-task focused'
    }, {
      value: 'multi_threaded',
      label: 'Multi-threaded'
    }],
    value: formData.multitaskingAbility
  }, {
    id: 'workingHours',
    label: 'Working Hours & Energy Flow',
    tooltip: 'When is your team most productive?',
    options: [{
      value: 'morning',
      label: 'Morning-focused'
    }, {
      value: 'evening',
      label: 'Evening-focused'
    }, {
      value: 'flexible',
      label: 'Flexible'
    }],
    value: formData.workingHours
  }, {
    id: 'stressHandlingStyle',
    label: 'Stress Handling Style',
    tooltip: 'How does your team typically respond to pressure?',
    options: [{
      value: 'calm_under_pressure',
      label: 'Calm under pressure'
    }, {
      value: 'needs_stability',
      label: 'Needs stable environment'
    }, {
      value: 'performs_with_support',
      label: 'Performs well with support'
    }],
    value: formData.stressHandlingStyle
  }];

  // Group options into two columns for a more compact layout
  const firstColumnOptions = workstyleOptions.slice(0, Math.ceil(workstyleOptions.length / 2));
  const secondColumnOptions = workstyleOptions.slice(Math.ceil(workstyleOptions.length / 2));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <div className="space-y-6">
        {firstColumnOptions.map(option => (
          <div key={option.id}>
            <div className="flex items-center mb-1">
              <label className="block text-sm font-medium text-white">
                {option.label}
              </label>
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
      </div>
      <div className="space-y-6">
        {secondColumnOptions.map(option => (
          <div key={option.id}>
            <div className="flex items-center mb-1">
              <label className="block text-sm font-medium text-white">
                {option.label}
              </label>
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
      </div>
    </div>
  );
}
