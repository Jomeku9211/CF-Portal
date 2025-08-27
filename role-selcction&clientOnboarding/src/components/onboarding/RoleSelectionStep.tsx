import React from 'react';
import { BriefcaseIcon, UserIcon, BuildingIcon } from 'lucide-react';
interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}
interface RoleSelectionStepProps {
  selectedRole: string | null;
  onSelectRole: (role: string) => void;
  onNext: () => void;
}
export function RoleSelectionStep({
  selectedRole,
  onSelectRole,
  onNext
}: RoleSelectionStepProps) {
  const roles: Role[] = [{
    id: 'client',
    title: 'Client',
    description: 'I want to hire talented developers for my projects',
    icon: <UserIcon className="h-12 w-12" />
  }, {
    id: 'service_provider',
    title: 'Service Provider',
    description: 'I want to offer my skills and services to clients',
    icon: <BriefcaseIcon className="h-12 w-12" />
  }, {
    id: 'agency',
    title: 'Agency',
    description: 'I represent a company that provides development services',
    icon: <BuildingIcon className="h-12 w-12" />
  }];
  return <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-sanjuan-dark mb-4 font-['Inter'] text-center">
        What best describes your role?
      </h2>
      <p className="text-lg text-sanjuan-base mb-8 text-center font-['IBM_Plex_Sans']">
        Select the option that best matches your needs on Coderfarm
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {roles.map(role => <button key={role.id} className={`flex flex-col items-center p-8 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${selectedRole === role.id ? 'border-tango-base bg-tango-lightest shadow-md' : 'border-sanjuan-lighter bg-white hover:border-sanjuan-light'}`} onClick={() => onSelectRole(role.id)}>
            <div className={`p-4 rounded-full mb-4 ${selectedRole === role.id ? 'bg-tango-lighter text-tango-base' : 'bg-sanjuan-lightest text-sanjuan-base'}`}>
              {role.icon}
            </div>
            <h3 className="text-xl font-semibold text-sanjuan-dark mb-2 font-['Inter']">
              {role.title}
            </h3>
            <p className="text-center text-sanjuan-base font-['IBM_Plex_Sans']">
              {role.description}
            </p>
          </button>)}
      </div>
      <div className="flex justify-center">
        <button onClick={onNext} disabled={!selectedRole} className={`px-8 py-3 rounded-lg font-semibold transition-all ${selectedRole ? 'bg-gradient-to-r from-tango-base to-tango-dark text-white shadow-md hover:shadow-lg' : 'bg-sanjuan-lighter text-sanjuan-dark cursor-not-allowed'}`}>
          Continue
        </button>
      </div>
    </div>;
}