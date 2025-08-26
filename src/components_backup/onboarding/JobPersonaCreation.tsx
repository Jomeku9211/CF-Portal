import { useState } from 'react';
import { CheckCircleIcon } from 'lucide-react';
import { jobPostService } from '@/services/jobPostService';
import { userService } from '@/services/userService';

interface JobPersonaCreationProps {
  formData: any;
  updateFormData: (section: string, data: any) => void;
  onComplete: () => void;
  onBack: () => void;
}

export function JobPersonaCreation({ onComplete, onBack }: JobPersonaCreationProps) {
  const [persona, setPersona] = useState({
    summary: '',
    responsibilities: '',
    requiredSkills: '', // comma separated
    niceToHaveSkills: '',
    experienceLevel: 'Mid',
    yearsExperience: '',
    techStack: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setPersona(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const teamId = localStorage.getItem('lastTeamId');
    if (!teamId) {
      alert('Missing team id. Please complete team creation first.');
      setIsSubmitting(false);
      return;
    }

    // Merge cached Hiring Intent fields
    let hiringIntent: any = {};
    try {
      const raw = localStorage.getItem('hiringIntentForm');
      if (raw) hiringIntent = JSON.parse(raw);
    } catch {}

    // Build payload combining hiring intent with persona details
    const payload: any = {
      team_id: teamId,
      title: hiringIntent?.roleTitle || 'Job Title',
      number_of_hires: hiringIntent?.numberOfHires,
      hire_timeline: hiringIntent?.hireTimeline,
      employment_type: hiringIntent?.employmentType,
      location_preference: hiringIntent?.locationPreference,
      city: hiringIntent?.city,
      salary_min: hiringIntent?.salaryMin,
      salary_max: hiringIntent?.salaryMax,
      salary_period: hiringIntent?.salaryPeriod,
      currency: hiringIntent?.currency,
      equity_available: hiringIntent?.equityAvailable,
      // Persona-specific fields
      summary: persona.summary,
      responsibilities: persona.responsibilities,
      required_skills: persona.requiredSkills,
      nice_to_have_skills: persona.niceToHaveSkills,
      experience_level: persona.experienceLevel,
      years_experience: persona.yearsExperience,
      tech_stack: persona.techStack,
      additional_notes: persona.additionalNotes,
    };

    const res = await jobPostService.createJobPost(payload);
    if (!res.success) {
      alert(res.message || 'Failed to create job post');
      setIsSubmitting(false);
      return;
    }

    // Optionally update onboarding stage to completed
    try {
      const rawUser = localStorage.getItem('currentUser');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed?.id) {
          await userService.updateUserById(String(parsed.id), { onboarding_stage: 'job_creation' });
        }
      }
    } catch {}

    setIsSubmitted(true);
    setIsSubmitting(false);
    onComplete();
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircleIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-white">Job Post Created!</h2>
        <p className="text-gray-400 text-center mb-8">Your job persona has been saved. You can refine details later.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Job Persona Creation</h2>
      <p className="text-gray-400 mb-6">Provide details about the role to help us find the right candidates.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Summary</label>
            <textarea
              value={persona.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              className="w-full h-24 bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Experience Level</label>
            <select
              value={persona.experienceLevel}
              onChange={(e) => handleChange('experienceLevel', e.target.value)}
              className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
            <input
              type="text"
              placeholder="Years of experience"
              value={persona.yearsExperience}
              onChange={(e) => handleChange('yearsExperience', e.target.value)}
              className="w-full mt-3 bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">Key Responsibilities</label>
          <textarea
            value={persona.responsibilities}
            onChange={(e) => handleChange('responsibilities', e.target.value)}
            className="w-full h-32 bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Required Skills (comma separated)</label>
            <input
              type="text"
              value={persona.requiredSkills}
              onChange={(e) => handleChange('requiredSkills', e.target.value)}
              className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Nice-to-have Skills (comma separated)</label>
            <input
              type="text"
              value={persona.niceToHaveSkills}
              onChange={(e) => handleChange('niceToHaveSkills', e.target.value)}
              className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">Tech Stack</label>
          <input
            type="text"
            value={persona.techStack}
            onChange={(e) => handleChange('techStack', e.target.value)}
            className="w-full bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white">Additional Notes</label>
          <textarea
            value={persona.additionalNotes}
            onChange={(e) => handleChange('additionalNotes', e.target.value)}
            className="w-full h-24 bg-[#0f1224] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-700 hover:border-gray-600 text-gray-200 hover:text-white rounded-md font-medium transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white rounded-md font-medium transition-colors"
          >
            {isSubmitting ? 'Saving...' : 'Create Job Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
