import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuildingIcon, UsersIcon, UserIcon, ArrowRightIcon, CheckCircle } from 'lucide-react';

type Role = 'client' | 'freelancer' | 'agency' | null;

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const navigate = useNavigate();

  const handleContinue = (role: Role) => {
    if (role === 'client') {
      // Navigate to the existing client onboarding flow
      navigate('/onboarding');
    } else if (role === 'freelancer') {
      // TODO: Navigate to freelancer onboarding flow when implemented
      console.log('Freelancer onboarding not yet implemented');
    } else if (role === 'agency') {
      // TODO: Navigate to agency onboarding flow when implemented
      console.log('Agency onboarding not yet implemented');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#2d1e3a]">
      <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Coderfarm
          </h1>
          <p className="text-gray-300">
            Founder-aligned, fit-first hiring for startups
          </p>
        </header>
        
        <div className="flex-grow bg-[#1a2234] rounded-xl shadow-md p-6 md:p-8 transition-all duration-300 ease-out border border-[#2a3344]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3 text-white">Choose your role</h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Select the option that best describes you. We'll set up your
                onboarding journey accordingly.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Client Role Card */}
              <div 
                className={`bg-[#171c33] border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedRole === 'client' 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-700 hover:border-gray-500'
                }`} 
                onClick={() => setSelectedRole('client')}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <UsersIcon size={24} className="text-blue-400" />
                  </div>
                  {selectedRole === 'client' && <CheckCircle size={20} className="text-blue-500" />}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Client</h3>
                <p className="text-gray-400 text-sm mb-6">
                  I'm an IT founder or HR looking to hire developers for my company or
                  team.
                </p>
                <button className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                  selectedRole === 'client' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-[#2a3344] text-gray-300'
                }`}>
                  Hire Talent
                </button>
              </div>

              {/* Freelancer Role Card */}
              <div 
                className={`bg-[#171c33] border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedRole === 'freelancer' 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-700 hover:border-gray-500'
                }`} 
                onClick={() => setSelectedRole('freelancer')}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <UserIcon size={24} className="text-blue-400" />
                  </div>
                  {selectedRole === 'freelancer' && <CheckCircle size={20} className="text-blue-500" />}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Freelancer</h3>
                <p className="text-gray-400 text-sm mb-6">
                  I'm a developer who wants to list myself and get hired by startups
                  and companies.
                </p>
                <button className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                  selectedRole === 'freelancer' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-[#2a3344] text-gray-300'
                }`}>
                  List Myself
                </button>
              </div>

              {/* Agency Owner Role Card */}
              <div 
                className={`bg-[#171c33] border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedRole === 'agency' 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-700 hover:border-gray-500'
                }`} 
                onClick={() => setSelectedRole('agency')}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <BuildingIcon size={24} className="text-blue-400" />
                  </div>
                  {selectedRole === 'agency' && <CheckCircle size={20} className="text-blue-500" />}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Agency Owner</h3>
                <p className="text-gray-400 text-sm mb-6">
                  I run a team or agency and want to list my employees for outsourced
                  projects.
                </p>
                <button className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                  selectedRole === 'agency' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-[#2a3344] text-gray-300'
                }`}>
                  List My Team
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button 
                onClick={() => selectedRole && handleContinue(selectedRole)} 
                disabled={!selectedRole} 
                className={`px-8 py-3 rounded-md font-medium mb-4 ${
                  selectedRole 
                    ? 'bg-green-500 text-white hover:bg-green-600 transition-colors' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
              
              <button 
                onClick={() => navigate('/')} 
                className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-1"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
