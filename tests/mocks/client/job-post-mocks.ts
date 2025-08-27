import { JobPost } from '../../../src/modules/service-provider/services/jobPersonaService';

// Mock Job Posts for Service Provider Testing
export const mockJobPosts: JobPost[] = [
  {
    id: 'job-1',
    created_at: Date.now() - 86400000, // 1 day ago
    team_id: 'team-1',
    title: 'Senior Frontend Developer',
    description: 'Build modern, responsive web applications using React and TypeScript.',
    requirements: '5+ years React experience, TypeScript, CSS-in-JS, responsive design',
    responsibilities: 'Develop new features, optimize performance, mentor junior developers',
    skills: ['React', 'TypeScript', 'CSS-in-JS', 'Responsive Design', 'Performance Optimization'],
    experience_level: 'Senior (5+ years)',
    employment_type: 'Full-time',
    location: 'Remote',
    salary_range: '$80,000 - $120,000',
    benefits: ['Health insurance', '401k', 'Stock options', 'Flexible PTO'],
    hiring_intent: 'Team expansion',
    urgency: 'High - Need to fill within 2 weeks',
    budget_range: '$80K - $120K',
    timeline: '2 weeks to hire',
    contact_email: 'hiring@techcorp.com',
    status: 'active'
  },
  {
    id: 'job-2',
    created_at: Date.now() - 86400000,
    team_id: 'team-2',
    title: 'Backend Engineer - Python',
    description: 'Design and implement scalable backend services for our financial platform.',
    requirements: '3+ years Python, Django/FastAPI, PostgreSQL, AWS experience',
    responsibilities: 'API development, database design, system architecture',
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'AWS', 'REST APIs'],
    experience_level: 'Mid-level (3-5 years)',
    employment_type: 'Full-time',
    location: 'Hybrid (San Francisco)',
    salary_range: '$90,000 - $130,000',
    benefits: ['Health insurance', '401k', 'Stock options', 'Gym membership'],
    hiring_intent: 'New product development',
    urgency: 'Medium - Need to fill within 1 month',
    budget_range: '$90K - $130K',
    timeline: '1 month to hire',
    contact_email: 'engineering@techcorp.com',
    status: 'active'
  },
  {
    id: 'job-3',
    created_at: Date.now() - 172800000, // 2 days ago
    team_id: 'team-3',
    title: 'Research Scientist - Agriculture',
    description: 'Lead research initiatives in sustainable agriculture and crop optimization.',
    requirements: 'PhD in Agriculture/Biology, 3+ years research experience, data analysis skills',
    responsibilities: 'Design experiments, analyze data, publish research, mentor students',
    skills: ['Agricultural Science', 'Data Analysis', 'Research Design', 'Statistics', 'Sustainability'],
    experience_level: 'Senior (5+ years)',
    employment_type: 'Full-time',
    location: 'On-site (Research Center)',
    salary_range: '$70,000 - $100,000',
    benefits: ['Health insurance', 'Retirement plan', 'Conference attendance', 'Publication support'],
    hiring_intent: 'New research program',
    urgency: 'Low - Need to fill within 3 months',
    budget_range: '$70K - $100K',
    timeline: '3 months to hire',
    contact_email: 'research@greentech.io',
    status: 'active'
  },
  {
    id: 'job-4',
    created_at: Date.now() - 259200000, // 3 days ago
    team_id: 'team-4',
    title: 'Product Manager - Healthcare',
    description: 'Drive product strategy and execution for our healthcare technology platform.',
    requirements: '5+ years PM experience, healthcare domain knowledge, agile methodology',
    responsibilities: 'Define product roadmap, work with engineering teams, gather user feedback',
    skills: ['Product Management', 'Healthcare', 'Agile', 'User Research', 'Data Analysis'],
    experience_level: 'Senior (5+ years)',
    employment_type: 'Full-time',
    location: 'Remote',
    salary_range: '$100,000 - $150,000',
    benefits: ['Health insurance', '401k', 'Stock options', 'Flexible PTO'],
    hiring_intent: 'New product line expansion',
    urgency: 'Medium - Need to fill within 1 month',
    budget_range: '$100K - $150K',
    timeline: '1 month to hire',
    contact_email: 'product@healthtechpro.com',
    status: 'active'
  }
];

// Mock data service functions for job posts
export const mockJobPostService = {
  getMockJobPosts: (): JobPost[] => mockJobPosts,
  getMockJobPostsByTeam: (teamId: string): JobPost[] => 
    mockJobPosts.filter(job => job.team_id === teamId),
  getMockJobPostById: (id: string): JobPost | undefined => 
    mockJobPosts.find(job => job.id === id),
  createMockJobPost: (data: Partial<JobPost>): JobPost => ({
    id: `job-${Date.now()}`,
    created_at: Date.now(),
    team_id: data.team_id || 'team-1',
    title: data.title || 'New Job Post',
    description: data.description || 'Job description',
    requirements: data.requirements || 'Basic requirements',
    responsibilities: data.responsibilities || 'Basic responsibilities',
    skills: data.skills || ['Skill 1', 'Skill 2'],
    experience_level: data.experience_level || 'Mid-level (3-5 years)',
    employment_type: data.employment_type || 'Full-time',
    location: data.location || 'Remote',
    salary_range: data.salary_range || '$50,000 - $80,000',
    benefits: data.benefits || ['Health insurance'],
    hiring_intent: data.hiring_intent || 'Team expansion',
    urgency: data.urgency || 'Medium',
    budget_range: data.budget_range || '$50K - $80K',
    timeline: data.timeline || '1 month to hire',
    contact_email: data.contact_email || 'hiring@example.com',
    status: data.status || 'active'
  })
};
