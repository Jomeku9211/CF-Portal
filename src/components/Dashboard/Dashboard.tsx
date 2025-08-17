import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { organizationService, Organization } from '../../services/organizationService';
import { teamService, Team } from '../../services/teamService';
import { jobPersonaService, JobPost } from '../../services/jobPersonaService';
import { mockDataService } from '../../services/mockDataService';
import { PlusIcon, BuildingIcon, UsersIcon, EditIcon, TrashIcon, BriefcaseIcon } from 'lucide-react';

export function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadUserData();
    }
  }, [isAuthenticated]);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Load organizations and teams in parallel
      const [orgResponse, teamResponse] = await Promise.all([
        organizationService.getUserOrganizations(),
        teamService.getUserTeams()
      ]);

      if (orgResponse.success) {
        setOrganizations(orgResponse.organizations || []);
      }

      if (teamResponse.success) {
        setTeams(teamResponse.teams || []);
      }
    } catch (error) {
      setError('Failed to load user data');
      console.error('Load user data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrganization = () => {
    // Navigate to organization creation form
    // This will be implemented in the onboarding flow
    console.log('Navigate to organization creation');
  };

  const handleCreateTeam = (organizationId: string) => {
    // Navigate to team creation form
    // This will be implemented in the onboarding flow
    console.log('Navigate to team creation for organization:', organizationId);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your organizations and teams</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Organizations Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BuildingIcon className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Organizations</h2>
            </div>
            <button
              onClick={handleCreateOrganization}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Organization
            </button>
          </div>

          {organizations.length === 0 ? (
            <div className="text-center py-8">
              <BuildingIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations yet</h3>
              <p className="text-gray-500 mb-4">Create your first organization to get started</p>
              <button
                onClick={handleCreateOrganization}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Organization
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizations.map((org) => (
                <div key={org.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">{org.name}</h3>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{org.industry}</p>
                  <p className="text-sm text-gray-600 mb-2">{org.organization_size} employees</p>
                  {org.website_url && (
                    <a
                      href={org.website_url.startsWith('http') ? org.website_url : `https://${org.website_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {org.website_url}
                    </a>
                  )}
                  <div className="mt-4">
                    <button
                      onClick={() => handleCreateTeam(org.id)}
                      className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100"
                    >
                      <PlusIcon className="h-3 w-3 mr-1" />
                      Add Team
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Teams Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <UsersIcon className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Teams</h2>
            </div>
          </div>

          {teams.length === 0 ? (
            <div className="text-center py-8">
              <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
              <p className="text-gray-500">Create teams within your organizations to start building your dream team</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div key={team.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">{team.name || 'Unnamed Team'}</h3>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Structure: {team.structure_preference || 'Not specified'}</p>
                  <p className="text-sm text-gray-600 mb-2">Pace: {team.pace_of_work || 'Not specified'}</p>
                  <p className="text-sm text-gray-600 mb-2">Autonomy: {team.autonomy || 'Not specified'}</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
