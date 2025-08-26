import { useState } from 'react';
// import { jobPostService } from '@/services/jobPostService';
import { userService } from '@/services/userService';

interface HiringIntentProps {
  onNext: () => void;
  onBack: () => void;
}

export function HiringIntent({ onNext, onBack }: HiringIntentProps) {
  const [formData, setFormData] = useState({
    roleTitle: '',
    numberOfHires: '1',
    hireTimeline: 'Immediately',
    employmentType: 'Full-time',
    locationPreference: 'Remote',
    city: '',
    salaryMin: '',
    salaryMax: '',
    equityAvailable: false,
    salaryPeriod: 'Yearly',
    currency: 'USD'
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cache hiring intent locally; actual job_post creation will happen in Job Persona step
    try {
      localStorage.setItem('hiringIntentForm', JSON.stringify(formData));
    } catch {}

    // Ensure onboarding stage is job_creation
    try {
      const rawUser = localStorage.getItem('currentUser');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed?.id) {
          await userService.updateUserById(String(parsed.id), { onboarding_stage: 'job_creation' });
          try {
            localStorage.setItem('currentUser', JSON.stringify({ ...parsed, onboarding_stage: 'job_creation' }));
          } catch {}
        }
      }
    } catch {}

    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Hiring Intent</h2>
      <p className="text-gray-400 mb-6">
        Let's capture high-level information about your hiring needs.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-white">Role Title</label>
          <input 
            type="text" 
            placeholder="e.g. Frontend Developer" 
            value={formData.roleTitle}
            onChange={(e) => handleChange('roleTitle', e.target.value)}
            className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Number of Hires Planned
            </label>
            <select 
              value={formData.numberOfHires}
              onChange={(e) => handleChange('numberOfHires', e.target.value)}
              className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="1">1</option>
              <option value="2-5">2-5</option>
              <option value="5+">5+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              When Do You Want to Hire?
            </label>
            <select 
              value={formData.hireTimeline}
              onChange={(e) => handleChange('hireTimeline', e.target.value)}
              className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="Immediately">Immediately</option>
              <option value="Within 1 month">Within 1 month</option>
              <option value="Within 3 months">Within 3 months</option>
              <option value="Within 6+ months">Within 6+ months</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Employment Type
            </label>
            <select 
              value={formData.employmentType}
              onChange={(e) => handleChange('employmentType', e.target.value)}
              className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Location Preference
            </label>
            <select 
              value={formData.locationPreference}
              onChange={(e) => handleChange('locationPreference', e.target.value)}
              className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white mb-2"
            >
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <input 
              type="text" 
              placeholder="City (if onsite or hybrid)" 
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Salary Range (Optional)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            <select 
              value={formData.salaryPeriod}
              onChange={(e) => handleChange('salaryPeriod', e.target.value)}
              className="bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="Yearly">Yearly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <select 
              value={formData.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
              className="bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <input 
              type="text" 
              placeholder="Min" 
              value={formData.salaryMin}
              onChange={(e) => handleChange('salaryMin', e.target.value)}
              className="bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
            />
            <input 
              type="text" 
              placeholder="Max" 
              value={formData.salaryMax}
              onChange={(e) => handleChange('salaryMax', e.target.value)}
              className="bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
            />
          </div>
          <div className="mt-2 flex items-center">
            <input 
              type="checkbox" 
              id="equity" 
              checked={formData.equityAvailable}
              onChange={(e) => handleChange('equityAvailable', e.target.checked)}
              className="rounded text-blue-500 focus:ring-blue-500 bg-transparent border-gray-700" 
            />
            <label htmlFor="equity" className="ml-2 text-sm text-white">
              Equity available
            </label>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-300 hover:text-white border border-gray-700 rounded-md hover:border-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
