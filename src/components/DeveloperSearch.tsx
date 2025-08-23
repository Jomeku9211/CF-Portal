import React, { useState } from 'react';
import { universalOnboardingService } from '../services/universalOnboardingService';

interface DeveloperSearchProps {
  onDeveloperSelect?: (developer: any) => void;
}

export const DeveloperSearch: React.FC<DeveloperSearchProps> = ({ onDeveloperSelect }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    location: '',
    primaryStack: '',
    experienceLevel: '',
    salaryMin: '',
    salaryMax: '',
    workStyle: '',
    skills: [] as string[],
    domainExperience: [] as string[]
  });

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const result = await universalOnboardingService.searchDevelopers({
        location: searchCriteria.location || undefined,
        primaryStack: searchCriteria.primaryStack || undefined,
        experienceLevel: searchCriteria.experienceLevel || undefined,
        salaryMin: searchCriteria.salaryMin ? parseInt(searchCriteria.salaryMin) : undefined,
        salaryMax: searchCriteria.salaryMax ? parseInt(searchCriteria.salaryMax) : undefined,
        workStyle: searchCriteria.workStyle || undefined,
        skills: searchCriteria.skills.length > 0 ? searchCriteria.skills : undefined,
        domainExperience: searchCriteria.domainExperience.length > 0 ? searchCriteria.domainExperience : undefined
      });

      if (result.success && result.data) {
        setSearchResults(result.data);
      } else {
        console.error('Search failed:', result.message);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !searchCriteria.skills.includes(skill)) {
      setSearchCriteria(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setSearchCriteria(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addDomain = (domain: string) => {
    if (domain && !searchCriteria.domainExperience.includes(domain)) {
      setSearchCriteria(prev => ({
        ...prev,
        domainExperience: [...prev.domainExperience, domain]
      }));
    }
  };

  const removeDomain = (domain: string) => {
    setSearchCriteria(prev => ({
      ...prev,
      domainExperience: prev.domainExperience.filter(d => d !== domain)
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Find Your Perfect Developer</h1>
        <p className="text-gray-400">Search through our curated pool of talented developers</p>
      </div>

      {/* Search Filters */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
        <h2 className="text-xl font-semibold text-white mb-4">Search Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={searchCriteria.location}
              onChange={(e) => setSearchCriteria(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., San Francisco, Remote"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Primary Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Primary Stack</label>
            <input
              type="text"
              value={searchCriteria.primaryStack}
              onChange={(e) => setSearchCriteria(prev => ({ ...prev, primaryStack: e.target.value }))}
              placeholder="e.g., React, Python, Java"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
            <select
              value={searchCriteria.experienceLevel}
              onChange={(e) => setSearchCriteria(prev => ({ ...prev, experienceLevel: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Level</option>
              <option value="junior">Junior (0-2 years)</option>
              <option value="mid-level">Mid-Level (3-7 years)</option>
              <option value="senior">Senior (8+ years)</option>
            </select>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Salary Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={searchCriteria.salaryMin}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, salaryMin: e.target.value }))}
                placeholder="Min"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-400 self-center">-</span>
              <input
                type="number"
                value={searchCriteria.salaryMax}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, salaryMax: e.target.value }))}
                placeholder="Max"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Work Style */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Work Style</label>
            <select
              value={searchCriteria.workStyle}
              onChange={(e) => setSearchCriteria(prev => ({ ...prev, workStyle: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Style</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
            <input
              type="text"
              placeholder="e.g., Docker, AWS"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  addSkill(target.value);
                  target.value = '';
                }
              }}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {searchCriteria.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-600 text-white text-sm rounded-full flex items-center gap-1"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-blue-200 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? 'Searching...' : 'Search Developers'}
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
          <h2 className="text-xl font-semibold text-white mb-4">
            Found {searchResults.length} Developers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((developer, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => onDeveloperSelect?.(developer)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">
                    {developer.flow_metadata?.name || `Developer ${index + 1}`}
                  </h3>
                  <span className="text-sm text-blue-400">
                    {developer.experience_level || 'N/A'}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="text-gray-400">Location:</span> {developer.location || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Stack:</span> {developer.primary_stack || 'N/A'}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Style:</span> {developer.work_style || 'N/A'}
                  </p>
                  {developer.salary_min && developer.salary_max && (
                    <p className="text-gray-300">
                      <span className="text-gray-400">Salary:</span> ${developer.salary_min.toLocaleString()} - ${developer.salary_max.toLocaleString()}
                    </p>
                  )}
                </div>
                
                {developer.skills && developer.skills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-400 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {developer.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {developer.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                          +{developer.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 && !isSearching && (
        <div className="text-center text-gray-400 py-8">
          Use the filters above to search for developers
        </div>
      )}
    </div>
  );
};
