import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
interface Category {
  id: string;
  title: string;
}
interface CategorySelectionStepProps {
  role: string;
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
  onNext: () => void;
  onBack: () => void;
}
export function CategorySelectionStep({
  role,
  selectedCategory,
  onSelectCategory,
  onNext,
  onBack
}: CategorySelectionStepProps) {
  // Different categories based on role
  const categoryMap = {
    client: [{
      id: 'web_development',
      title: 'Web Development'
    }, {
      id: 'mobile_app',
      title: 'Mobile App Development'
    }, {
      id: 'ui_ux',
      title: 'UI/UX Design'
    }, {
      id: 'data_science',
      title: 'Data Science & Analytics'
    }, {
      id: 'devops',
      title: 'DevOps & Cloud'
    }, {
      id: 'blockchain',
      title: 'Blockchain & Web3'
    }, {
      id: 'ai_ml',
      title: 'AI & Machine Learning'
    }, {
      id: 'ecommerce',
      title: 'E-commerce Development'
    }],
    service_provider: [{
      id: 'frontend',
      title: 'Frontend Development'
    }, {
      id: 'backend',
      title: 'Backend Development'
    }, {
      id: 'fullstack',
      title: 'Full Stack Development'
    }, {
      id: 'mobile',
      title: 'Mobile Development'
    }, {
      id: 'ui_ux',
      title: 'UI/UX Design'
    }, {
      id: 'data_engineer',
      title: 'Data Engineering'
    }, {
      id: 'devops',
      title: 'DevOps Engineer'
    }, {
      id: 'qa',
      title: 'QA & Testing'
    }, {
      id: 'pm',
      title: 'Project Management'
    }],
    agency: [{
      id: 'web_agency',
      title: 'Web Development Agency'
    }, {
      id: 'mobile_agency',
      title: 'Mobile Development Agency'
    }, {
      id: 'design_agency',
      title: 'Design Agency'
    }, {
      id: 'digital_agency',
      title: 'Digital Marketing Agency'
    }, {
      id: 'consulting',
      title: 'IT Consulting'
    }, {
      id: 'staffing',
      title: 'IT Staffing & Recruitment'
    }]
  };
  const categories = categoryMap[role] || [];
  const roleTitle = role === 'client' ? 'Client' : role === 'service_provider' ? 'Service Provider' : 'Agency';
  return <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-sanjuan-dark mb-4 font-['Inter'] text-center">
        Select your category
      </h2>
      <p className="text-lg text-sanjuan-base mb-8 text-center font-['IBM_Plex_Sans']">
        Choose the category that best describes your {roleTitle.toLowerCase()}{' '}
        focus
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {categories.map(category => <button key={category.id} className={`p-6 rounded-xl border transition-all duration-300 text-left ${selectedCategory === category.id ? 'border-tango-base bg-tango-lightest shadow-md' : 'border-sanjuan-lighter bg-white hover:border-sanjuan-light hover:shadow-sm'}`} onClick={() => onSelectCategory(category.id)}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-sanjuan-dark font-['Inter'] pr-4">
                {category.title}
              </h3>
              {selectedCategory === category.id && <CheckCircleIcon className="h-5 w-5 text-tango-base flex-shrink-0" />}
            </div>
          </button>)}
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="px-8 py-3 rounded-lg font-semibold border-2 border-sanjuan-lighter text-sanjuan-dark hover:bg-sanjuan-lightest transition-all">
          Back
        </button>
        <button onClick={onNext} disabled={!selectedCategory} className={`px-8 py-3 rounded-lg font-semibold transition-all ${selectedCategory ? 'bg-gradient-to-r from-tango-base to-tango-dark text-white shadow-md hover:shadow-lg' : 'bg-sanjuan-lighter text-sanjuan-dark cursor-not-allowed'}`}>
          Continue
        </button>
      </div>
    </div>;
}