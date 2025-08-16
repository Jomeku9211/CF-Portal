import { Organization } from './organizationService';
import { Team } from './teamService';
import { JobPost } from './jobPersonaService';

// Mock Organizations
export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    created_at: Date.now() - 86400000, // 1 day ago
    name: 'TechCorp Solutions',
    industry: 'FinTech',
    website_url: 'www.techcorp.com',
    organization_size: '11-50',
    current_funding_status: 'Series A',
    key_investors_backers: 'Sequoia Capital, Y Combinator',
    revenue_status: '$100K - $500K',
    profitability_status: 'Yes',
    why_statement: 'We believe in democratizing financial services through technology',
    origin_story: 'Founded by former banking executives who saw the need for better financial tools',
    core_beliefs_principles: 'Innovation, Customer First, Transparency',
    how_we_live_purpose: 'Every decision we make is guided by our mission to serve customers better',
    creator: 'user-1'
  },
  {
    id: 'org-2',
    created_at: Date.now() - 172800000, // 2 days ago
    name: 'GreenTech Innovations',
    industry: 'AgriTech',
    website_url: 'www.greentech.io',
    organization_size: '1-10',
    current_funding_status: 'Bootstrapped',
    key_investors_backers: 'Self-funded',
    revenue_status: 'Pre-revenue',
    profitability_status: 'No',
    why_statement: 'Sustainable agriculture is the future of food production',
    origin_story: 'Started by agricultural scientists passionate about environmental conservation',
    core_beliefs_principles: 'Sustainability, Innovation, Community',
    how_we_live_purpose: 'We measure success by environmental impact, not just profit',
    creator: 'user-1'
  },
  {
    id: 'org-3',
    created_at: Date.now() - 259200000, // 3 days ago
    name: 'HealthTech Pro',
    industry: 'HealthTech',
    website_url: 'www.healthtechpro.com',
    organization_size: '50-200',
    current_funding_status: 'Series B',
    key_investors_backers: 'Andreessen Horowitz, Kleiner Perkins',
    revenue_status: '$1M - $5M',
    profitability_status: 'Yes',
    why_statement: 'Healthcare should be accessible, affordable, and effective for everyone',
    origin_story: 'Founded by healthcare professionals frustrated with existing inefficiencies',
    core_beliefs_principles: 'Patient First, Innovation, Quality',
    how_we_live_purpose: 'Every product we build must improve patient outcomes',
    creator: 'user-1'
  }
];

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: 'team-1',
    created_at: Date.now() - 86400000,
    organization_id: 'org-1',
    name: 'Frontend Development Team',
    structure_preference: 'Agile',
    pace_of_work: 'Fast-paced',
    autonomy: 'High',
    initiative_level: 'Proactive',
    decision_making_style: 'Collaborative',
    attention_to_detail: 'High',
    team_age_composition: '25-35',
    team_gender_composition: 'Balanced',
    multitasking_ability: 'High',
    working_hours_energy_flow: 'Morning focused',
    preferred_communication_style: 'Async-first',
    cultural_diversity_alignment: 'Strong'
  },
  {
    id: 'team-2',
    created_at: Date.now() - 86400000,
    organization_id: 'org-1',
    name: 'Backend Engineering Team',
    structure_preference: 'Scrum',
    pace_of_work: 'Moderate',
    autonomy: 'Medium',
    initiative_level: 'Responsive',
    decision_making_style: 'Hierarchical',
    attention_to_detail: 'Very High',
    team_age_composition: '30-40',
    team_gender_composition: 'Male dominated',
    multitasking_ability: 'Medium',
    working_hours_energy_flow: 'Evening focused',
    preferred_communication_style: 'Synchronous',
    cultural_diversity_alignment: 'Moderate'
  },
  {
    id: 'team-3',
    created_at: Date.now() - 172800000,
    organization_id: 'org-2',
    name: 'Research & Development',
    structure_preference: 'Lean',
    pace_of_work: 'Slow and steady',
    autonomy: 'Very High',
    initiative_level: 'Innovative',
    decision_making_style: 'Consensus-based',
    attention_to_detail: 'Extremely High',
    team_age_composition: '35-50',
    team_gender_composition: 'Balanced',
    multitasking_ability: 'Low',
    working_hours_energy_flow: 'Flexible',
    preferred_communication_style: 'Documentation-heavy',
    cultural_diversity_alignment: 'Very Strong'
  },
  {
    id: 'team-4',
    created_at: Date.now() - 259200000,
    organization_id: 'org-3',
    name: 'Product Development',
    structure_preference: 'Kanban',
    pace_of_work: 'Fast-paced',
    autonomy: 'High',
    initiative_level: 'Proactive',
    decision_making_style: 'Data-driven',
    attention_to_detail: 'High',
    team_age_composition: '28-38',
    team_gender_composition: 'Balanced',
    multitasking_ability: 'High',
    working_hours_energy_flow: 'Morning and afternoon',
    preferred_communication_style: 'Hybrid',
    cultural_diversity_alignment: 'Strong'
  }
];

// Mock Job Posts
export const mockJobPosts: JobPost[] = [
  {
    id: 'job-1',
    created_at: Date.now() - 43200000, // 12 hours ago
    team_id: 'team-1',
    title: 'Senior React Developer',
    description: 'We are looking for an experienced React developer to join our frontend team and help build cutting-edge financial applications.',
    requirements: '5+ years of React experience, TypeScript, Redux, modern CSS frameworks',
    responsibilities: 'Lead frontend development, mentor junior developers, architect scalable solutions',
    skills: ['React', 'TypeScript', 'Redux', 'CSS3', 'Git', 'REST APIs'],
    experience_level: 'Senior (5+ years)',
    employment_type: 'Full-time',
    location: 'Remote',
    salary_range: '$80,000 - $120,000',
    benefits: ['Health insurance', '401k', 'Flexible PTO', 'Remote work'],
    hiring_intent: 'Immediate hire for project expansion',
    urgency: 'High - Need to fill within 2 weeks',
    budget_range: '$80K - $120K',
    timeline: '2 weeks to hire',
    contact_email: 'hr@techcorp.com',
    status: 'active'
  },
  {
    id: 'job-2',
    created_at: Date.now() - 86400000, // 1 day ago
    team_id: 'team-2',
    title: 'Backend Python Engineer',
    description: 'Join our backend team to build robust, scalable APIs for our financial services platform.',
    requirements: '3+ years Python, Django/FastAPI, PostgreSQL, AWS experience',
    responsibilities: 'Develop and maintain APIs, optimize database performance, ensure security',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes'],
    experience_level: 'Mid-level (3-5 years)',
    employment_type: 'Full-time',
    location: 'Hybrid (San Francisco)',
    salary_range: '$90,000 - $130,000',
    benefits: ['Health insurance', '401k', 'Stock options', 'Gym membership'],
    hiring_intent: 'Team expansion for new product launch',
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
    title: 'Agricultural Research Scientist',
    description: 'Lead research initiatives in sustainable farming practices and crop optimization.',
    requirements: 'PhD in Agricultural Science, 3+ years research experience, published papers',
    responsibilities: 'Design and conduct experiments, analyze data, publish findings',
    skills: ['Agricultural Science', 'Data Analysis', 'Research Methods', 'Statistics'],
    experience_level: 'Senior (5+ years)',
    employment_type: 'Full-time',
    location: 'On-site (Research Center)',
    salary_range: '$70,000 - $100,000',
    benefits: ['Health insurance', 'Research funding', 'Conference attendance'],
    hiring_intent: 'New research project on climate-resilient crops',
    urgency: 'Low - Research project starts in 3 months',
    budget_range: '$70K - $100K',
    timeline: '3 months to hire',
    contact_email: 'research@greentech.io',
    status: 'draft'
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

// Mock data service functions
export const mockDataService = {
  getMockOrganizations: (): Organization[] => mockOrganizations,
  getMockTeams: (): Team[] => mockTeams,
  getMockJobPosts: (): JobPost[] => mockJobPosts,
  getMockTeamsByOrganization: (organizationId: string): Team[] => 
    mockTeams.filter(team => team.organization_id === organizationId),
  getMockJobPostsByTeam: (teamId: string): JobPost[] => 
    mockJobPosts.filter(job => job.team_id === teamId),
  getMockOrganizationById: (id: string): Organization | undefined => 
    mockOrganizations.find(org => org.id === id),
  getMockTeamById: (id: string): Team | undefined => 
    mockTeams.find(team => team.id === id),
  getMockJobPostById: (id: string): JobPost | undefined => 
    mockJobPosts.find(job => job.id === id)
};
