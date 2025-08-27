import React from 'react';
import { CheckCircleIcon, BriefcaseIcon, UserIcon, BuildingIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface CompletionStepProps {
  role: string;
  category: string;
  experience?: string;
}
export function CompletionStep({
  role,
  category,
  experience
}: CompletionStepProps) {
  const roleIcon = () => {
    switch (role) {
      case 'client':
        return <UserIcon className="h-16 w-16 text-white" />;
      case 'service_provider':
        return <BriefcaseIcon className="h-16 w-16 text-white" />;
      case 'agency':
        return <BuildingIcon className="h-16 w-16 text-white" />;
      default:
        return <CheckCircleIcon className="h-16 w-16 text-white" />;
    }
  };
  const roleTitle = role === 'client' ? 'Client' : role === 'service_provider' ? 'Service Provider' : 'Agency';
  // Map category ID to readable name
  const getCategoryName = () => {
    const categoryMap = {
      web_development: 'Web Development',
      mobile_app: 'Mobile App Development',
      ui_ux: 'UI/UX Design',
      data_science: 'Data Science & Analytics',
      devops: 'DevOps & Cloud',
      blockchain: 'Blockchain & Web3',
      ai_ml: 'AI & Machine Learning',
      ecommerce: 'E-commerce Development',
      frontend: 'Frontend Development',
      backend: 'Backend Development',
      fullstack: 'Full Stack Development',
      mobile: 'Mobile Development',
      data_engineer: 'Data Engineering',
      qa: 'QA & Testing',
      pm: 'Project Management',
      web_agency: 'Web Development Agency',
      mobile_agency: 'Mobile Development Agency',
      design_agency: 'Design Agency',
      digital_agency: 'Digital Marketing Agency',
      consulting: 'IT Consulting',
      staffing: 'IT Staffing & Recruitment'
    };
    return categoryMap[category] || category;
  };
  // Map experience ID to readable name
  const getExperienceName = () => {
    const experienceMap = {
      beginner: 'Beginner (0-2 years)',
      intermediate: 'Intermediate (2-5 years)',
      advanced: 'Advanced (5-8 years)',
      expert: 'Expert (8+ years)'
    };
    return experienceMap[experience] || experience;
  };
  return <div className="max-w-3xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-tango-base to-tango-dark flex items-center justify-center">
          {roleIcon()}
        </div>
      </div>
      <h2 className="text-3xl font-bold text-sanjuan-dark mb-4 font-['Inter']">
        You're all set!
      </h2>
      <p className="text-xl text-sanjuan-base mb-8 font-['IBM_Plex_Sans']">
        Your profile has been successfully created
      </p>
      <div className="bg-sanjuan-lightest rounded-xl p-8 mb-10">
        <h3 className="text-xl font-semibold text-sanjuan-dark mb-6 font-['Inter']">
          Your Profile Summary
        </h3>
        <div className="space-y-4 text-left">
          <div className="flex justify-between py-2 border-b border-sanjuan-lighter">
            <span className="font-medium text-sanjuan-dark">Role:</span>
            <span className="text-sanjuan-base">{roleTitle}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-sanjuan-lighter">
            <span className="font-medium text-sanjuan-dark">Category:</span>
            <span className="text-sanjuan-base">{getCategoryName()}</span>
          </div>
          {role === 'service_provider' && experience && <div className="flex justify-between py-2 border-b border-sanjuan-lighter">
              <span className="font-medium text-sanjuan-dark">Experience:</span>
              <span className="text-sanjuan-base">{getExperienceName()}</span>
            </div>}
        </div>
      </div>
      <Link to="/dashboard" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-tango-base to-tango-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        Continue to Dashboard
      </Link>
    </div>;
}