// Mock data for client organizations
export interface MockOrganization {
  id: string;
  name: string;
  website: string;
  size: string;
  fundingStatus: string;
  industry: string;
  companyFunction: string;
  revenueStatus: string;
  keyInvestors: string[];
  originStory: string;
  whatWeDo: string;
  whoWeServe: string[];
  vision: string;
  whyJoinUs: string;
  growthPlans: string;
  successMetrics: string[];
  coreValuesToday: string[];
  coreValuesAspirations: string[];
  cultureInAction: string[];
  created_at: string;
  updated_at: string;
}

export const mockOrganizations: MockOrganization[] = [
  {
    id: 'org-1',
    name: 'TechCorp Solutions',
    website: 'https://techcorp-solutions.com',
    size: '51–200 employees',
    fundingStatus: 'Series B',
    industry: 'Technology',
    companyFunction: 'Product Development',
    revenueStatus: 'Generating Revenue',
    keyInvestors: ['Sequoia Capital', 'Andreessen Horowitz', 'Y Combinator'],
    originStory: 'Founded in 2019 by three engineers who wanted to solve complex business problems with AI.',
    whatWeDo: 'We build AI-powered business intelligence platforms that help companies make data-driven decisions.',
    whoWeServe: ['Enterprise Companies', 'SaaS Businesses', 'Financial Services', 'Healthcare Providers'],
    vision: 'To democratize AI and make advanced analytics accessible to every business.',
    whyJoinUs: 'Join a team that\'s pushing the boundaries of what\'s possible with AI and machine learning.',
    growthPlans: 'Expand to European markets, launch new product lines, and grow our team to 500+ employees.',
    successMetrics: ['Customer satisfaction >95%', 'Revenue growth 300% YoY', 'Team retention 90%'],
    coreValuesToday: ['Innovation', 'Transparency', 'Customer Focus', 'Quality'],
    coreValuesAspirations: ['Sustainability', 'Global Impact', 'Diversity', 'Excellence'],
    cultureInAction: ['Weekly innovation sessions', 'Monthly hackathons', 'Quarterly team retreats'],
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'org-2',
    name: 'GreenTech Innovations',
    website: 'https://greentech-innovations.io',
    size: '11–50 employees',
    fundingStatus: 'Seed',
    industry: 'Energy',
    companyFunction: 'Idea Stage',
    revenueStatus: 'Pre-Revenue',
    keyInvestors: ['Climate Tech Fund', 'Angel Investors'],
    originStory: 'Started as a university research project focused on renewable energy storage solutions.',
    whatWeDo: 'We develop next-generation battery technology for renewable energy storage.',
    whoWeServe: ['Utility Companies', 'Electric Vehicle Manufacturers', 'Renewable Energy Farms'],
    vision: 'To accelerate the world\'s transition to sustainable energy through innovative storage solutions.',
    whyJoinUs: 'Be part of the solution to climate change and work on cutting-edge energy technology.',
    growthPlans: 'Complete R&D phase, secure Series A funding, and begin pilot programs with utility partners.',
    successMetrics: ['Patent applications filed', 'Research partnerships established', 'Pilot program success rate'],
    coreValuesToday: ['Sustainability', 'Innovation', 'Scientific Rigor', 'Environmental Impact'],
    coreValuesAspirations: ['Global Leadership', 'Industry Standard', 'Educational Excellence', 'Community Engagement'],
    cultureInAction: ['Monthly sustainability challenges', 'Quarterly research presentations', 'Annual environmental impact reports'],
    created_at: '2023-06-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },
  {
    id: 'org-3',
    name: 'HealthTech Pro',
    website: 'https://healthtech-pro.com',
    size: '201–500 employees',
    fundingStatus: 'Series C',
    industry: 'Healthcare',
    companyFunction: 'Go-to-Market',
    revenueStatus: 'Profitable',
    keyInvestors: ['Kleiner Perkins', 'Sequoia Capital', 'Institutional Investors'],
    originStory: 'Founded by healthcare professionals who experienced the inefficiencies in patient care firsthand.',
    whatWeDo: 'We provide AI-powered diagnostic tools and patient management systems for healthcare providers.',
    whoWeServe: ['Hospitals', 'Clinics', 'Private Practices', 'Telemedicine Platforms'],
    vision: 'To revolutionize healthcare delivery through technology that improves patient outcomes.',
    whyJoinUs: 'Make a real difference in people\'s lives while working with cutting-edge healthcare technology.',
    growthPlans: 'Expand to international markets, launch new diagnostic tools, and establish partnerships with major health systems.',
    successMetrics: ['Patient outcomes improved', 'Diagnostic accuracy 98%', 'Customer retention 95%'],
    coreValuesToday: ['Patient First', 'Medical Excellence', 'Innovation', 'Trust'],
    coreValuesAspirations: ['Global Healthcare Access', 'AI Ethics Leadership', 'Medical Education', 'Community Health'],
    cultureInAction: ['Monthly patient impact stories', 'Quarterly medical ethics reviews', 'Annual healthcare innovation awards'],
    created_at: '2022-03-15T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: 'org-4',
    name: 'EduTech Pioneers',
    website: 'https://edutech-pioneers.edu',
    size: '1,001–5,000 employees',
    fundingStatus: 'Public',
    industry: 'Education',
    companyFunction: 'Mature Business',
    revenueStatus: 'Profitable',
    keyInvestors: ['Public Markets', 'Institutional Investors'],
    originStory: 'Started as an online learning platform for coding bootcamps and expanded to comprehensive education solutions.',
    whatWeDo: 'We provide online learning platforms, educational content, and certification programs for various industries.',
    whoWeServe: ['Students', 'Working Professionals', 'Corporations', 'Educational Institutions'],
    vision: 'To make quality education accessible to everyone, everywhere, at any time.',
    whyJoinUs: 'Help shape the future of education and make learning accessible to millions of people worldwide.',
    growthPlans: 'Expand to emerging markets, develop new learning technologies, and establish global partnerships.',
    successMetrics: ['Student success rate 85%', 'Global reach 150+ countries', 'Corporate partnerships 500+'],
    coreValuesToday: ['Accessibility', 'Quality', 'Innovation', 'Student Success'],
    coreValuesAspirations: ['Global Education Equality', 'Technology Leadership', 'Research Excellence', 'Community Impact'],
    cultureInAction: ['Monthly student success stories', 'Quarterly innovation workshops', 'Annual global education summit'],
    created_at: '2020-01-01T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z'
  }
];

// Mock organization service functions
export const mockOrganizationService = {
  getMockOrganizations: (): MockOrganization[] => mockOrganizations,
  getMockOrganizationById: (id: string): MockOrganization | undefined => 
    mockOrganizations.find(org => org.id === id),
  createMockOrganization: (data: Partial<MockOrganization>): MockOrganization => ({
    id: `org-${Date.now()}`,
    name: data.name || 'New Organization',
    website: data.website || '',
    size: data.size || '1–10 employees',
    fundingStatus: data.fundingStatus || 'Bootstrapped',
    industry: data.industry || 'Technology',
    companyFunction: data.companyFunction || 'Idea Stage',
    revenueStatus: data.revenueStatus || 'Pre-Revenue',
    keyInvestors: data.keyInvestors || [],
    originStory: data.originStory || '',
    whatWeDo: data.whatWeDo || '',
    whoWeServe: data.whoWeServe || [],
    vision: data.vision || '',
    whyJoinUs: data.whyJoinUs || '',
    growthPlans: data.growthPlans || '',
    successMetrics: data.successMetrics || [],
    coreValuesToday: data.coreValuesToday || [],
    coreValuesAspirations: data.coreValuesAspirations || [],
    cultureInAction: data.cultureInAction || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }),
  updateMockOrganization: (id: string, data: Partial<MockOrganization>): MockOrganization | null => {
    const org = mockOrganizations.find(o => o.id === id);
    if (!org) return null;
    
    Object.assign(org, { ...data, updated_at: new Date().toISOString() });
    return org;
  }
};
