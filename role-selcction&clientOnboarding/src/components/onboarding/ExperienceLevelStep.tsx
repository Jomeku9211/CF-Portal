import React from 'react';
import { StarIcon } from 'lucide-react';
interface ExperienceLevel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stars: number;
}
interface ExperienceLevelStepProps {
  selectedExperience: string | null;
  onSelectExperience: (experience: string) => void;
  onNext: () => void;
  onBack: () => void;
}
export function ExperienceLevelStep({
  selectedExperience,
  onSelectExperience,
  onNext,
  onBack
}: ExperienceLevelStepProps) {
  const experienceLevels: ExperienceLevel[] = [{
    id: 'beginner',
    title: 'Beginner',
    subtitle: '0-2 years',
    description: 'Starting your journey in this field with foundational knowledge',
    stars: 1
  }, {
    id: 'intermediate',
    title: 'Intermediate',
    subtitle: '2-5 years',
    description: 'Comfortable with most aspects and can work independently',
    stars: 2
  }, {
    id: 'advanced',
    title: 'Advanced',
    subtitle: '5-8 years',
    description: 'Highly skilled with deep knowledge in specialized areas',
    stars: 3
  }, {
    id: 'expert',
    title: 'Expert',
    subtitle: '8+ years',
    description: 'Mastery of the field with ability to solve complex problems',
    stars: 4
  }];
  return <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-sanjuan-dark mb-4 font-['Inter'] text-center">
        What's your experience level?
      </h2>
      <p className="text-lg text-sanjuan-base mb-8 text-center font-['IBM_Plex_Sans']">
        This helps us match you with the right opportunities
      </p>
      <div className="space-y-4 mb-10">
        {experienceLevels.map(level => <button key={level.id} className={`w-full flex items-start p-6 rounded-xl border-2 transition-all duration-300 ${selectedExperience === level.id ? 'border-tango-base bg-tango-lightest shadow-md' : 'border-sanjuan-lighter bg-white hover:border-sanjuan-light hover:shadow-sm'}`} onClick={() => onSelectExperience(level.id)}>
            <div className="flex-grow">
              <div className="flex items-center mb-1">
                <h3 className="text-xl font-semibold text-sanjuan-dark font-['Inter']">
                  {level.title}
                </h3>
                <span className="ml-2 text-sm bg-sanjuan-lightest text-sanjuan-dark px-2 py-0.5 rounded-full">
                  {level.subtitle}
                </span>
              </div>
              <p className="text-sanjuan-base font-['IBM_Plex_Sans']">
                {level.description}
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center ml-4">
              {Array.from({
            length: level.stars
          }).map((_, index) => <StarIcon key={index} className={`h-5 w-5 ${selectedExperience === level.id ? 'text-tango-base' : 'text-sanjuan-light'}`} fill={selectedExperience === level.id ? 'currentColor' : 'none'} />)}
            </div>
          </button>)}
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="px-8 py-3 rounded-lg font-semibold border-2 border-sanjuan-lighter text-sanjuan-dark hover:bg-sanjuan-lightest transition-all">
          Back
        </button>
        <button onClick={onNext} disabled={!selectedExperience} className={`px-8 py-3 rounded-lg font-semibold transition-all ${selectedExperience ? 'bg-gradient-to-r from-tango-base to-tango-dark text-white shadow-md hover:shadow-lg' : 'bg-sanjuan-lighter text-sanjuan-dark cursor-not-allowed'}`}>
          Continue
        </button>
      </div>
    </div>;
}