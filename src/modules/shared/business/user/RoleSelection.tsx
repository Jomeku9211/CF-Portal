import React, { useState } from 'react';
import { BriefcaseIcon, UserIcon, BuildingIcon } from 'lucide-react';
import { userService } from '../../shared/services/userService';

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles: Role[] = [
    {
      id: 'client',
      title: 'Client',
      description: 'I want to hire talented developers for my projects',
      icon: <UserIcon className="h-12 w-12" />
    },
    {
      id: 'freelancer',
      title: 'Service Provider',
      description: 'I want to offer my skills and services to clients',
      icon: <BriefcaseIcon className="h-12 w-12" />
    },
    {
      id: 'agency',
      title: 'Agency',
      description: 'I represent a company that provides development services',
      icon: <BuildingIcon className="h-12 w-12" />
    }
  ];

  const handleContinue = async () => {
    if (!selectedRole) return;
    
    setIsSubmitting(true);
    
    try {
      // Update user roles in backend
      const rawUser = localStorage.getItem('currentUser');
      if (rawUser) {
        const user = JSON.parse(rawUser);
        if (user?.id) {
          await userService.updateUserById(String(user.id), { 
            roles: [selectedRole],
            onboarding_stage: selectedRole === 'client' ? 'organization_profile' : 'pending'
          });
          
          // Update local cache
          localStorage.setItem('currentUser', JSON.stringify({ 
            ...user, 
            roles: [selectedRole],
            onboarding_stage: selectedRole === 'client' ? 'organization_profile' : 'pending'
          }));
        }
      }
      
      // Navigate based on role
      if (selectedRole === 'client') {
        window.location.href = '/clientOnboarding';
      } else if (selectedRole === 'freelancer') {
        // Navigate to developer onboarding
        window.location.href = '/developer-onboarding';
      } else if (selectedRole === 'agency') {
        // TODO: Navigate to agency onboarding flow when implemented
        console.log('Agency onboarding not yet implemented');
      }
    } catch (error) {
      console.error('Failed to update user role:', error);
      alert('Failed to update role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        <div className="mb-6">
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-1"
          >
            ← Back
          </button>
        </div>
        
        <div className="flex-grow bg-[#1a2234] rounded-xl shadow-md p-6 md:p-8 transition-all duration-300 ease-out border border-[#2a3344]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3 text-white">What best describes your role?</h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Select the option that best matches your needs on Coderfarm
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {roles.map(role => (
                <button 
                  key={role.id} 
                  className={`flex flex-col items-center p-8 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                    selectedRole === role.id 
                      ? 'border-blue-500 bg-blue-500/10 shadow-md' 
                      : 'border-gray-700 bg-[#171c33] hover:border-gray-500'
                  }`} 
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className={`p-4 rounded-full mb-4 ${
                    selectedRole === role.id 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {role.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {role.title}
                  </h3>
                  <p className="text-center text-gray-400">
                    {role.description}
                  </p>
                </button>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={handleContinue} 
                disabled={!selectedRole || isSubmitting}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  selectedRole && !isSubmitting
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
