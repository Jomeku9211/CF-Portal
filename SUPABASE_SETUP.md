# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub or Google
4. Click "New project"
5. Choose organization and project name
6. Set database password (save this!)
7. Choose region closest to you
8. Click "Create new project"

## 2. Get Your Credentials

After project creation, go to **Settings** → **API** and copy:

- **Project URL**: `https://your-project-id.supabase.co`
- **Anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 3. Create Environment File

Create a `.env` file in your project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Database Tables to Create

Run these SQL commands in Supabase SQL Editor:

### Roles Table
```sql
CREATE TABLE roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  button_label VARCHAR(100),
  icon VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON roles
  FOR SELECT USING (true);
```

### Role Categories Table
```sql
CREATE TABLE role_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE role_categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON role_categories
  FOR SELECT USING (true);
```

### Experience Levels Table
```sql
CREATE TABLE experience_levels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  years VARCHAR(50),
  tagline VARCHAR(200),
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE experience_levels ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON experience_levels
  FOR SELECT USING (true);
```

### User Roles Table
```sql
CREATE TABLE user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES role_categories(id) ON DELETE CASCADE,
  specialization VARCHAR(100),
  experience_level VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own roles
CREATE POLICY "Users can read own roles" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own roles
CREATE POLICY "Users can insert own roles" ON user_roles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own roles
CREATE POLICY "Users can update own roles" ON user_roles
  FOR UPDATE USING (auth.uid() = user_id);
```

## 5. Insert Sample Data

### Insert Roles
```sql
INSERT INTO roles (name, description, button_label, icon) VALUES
('client', 'I''m an IT founder or HR looking to hire developers for my company or team.', 'Hire Talent', 'users'),
('freelancer', 'I''m a developer who wants to list myself and get hired by startups and companies.', 'List Myself', 'user'),
('agency', 'I run a team or agency and want to list my employees for outsourced projects.', 'List My Team', 'building');
```

### Insert Role Categories
```sql
INSERT INTO role_categories (name, description, role_id, metadata) VALUES
-- Client categories
('founder', 'Company founder or co-founder looking to build a team', (SELECT id FROM roles WHERE name = 'client'), '{"companySize": "0-50", "fundingStage": "seed"}'),
('hr-recruiter', 'Human resources professional responsible for hiring', (SELECT id FROM roles WHERE name = 'client'), '{"companySize": "50+", "fundingStage": "established"}'),
('cto', 'Chief Technology Officer managing technical team', (SELECT id FROM roles WHERE name = 'client'), '{"companySize": "100+", "fundingStage": "series-a"}'),

-- Service Provider categories
('software-development', 'Programming, coding, and technical implementation', (SELECT id FROM roles WHERE name = 'freelancer'), '{"skills": ["Programming", "Problem Solving", "Technical"]}'),
('creative-design', 'UI/UX design, visual design, and creative work', (SELECT id FROM roles WHERE name = 'freelancer'), '{"skills": ["Design", "Creativity", "User Research"]}'),
('quality-assurance', 'Testing, QA, and quality management', (SELECT id FROM roles WHERE name = 'freelancer'), '{"skills": ["Testing", "Quality", "Analytical"]}'),
('product-management', 'Product strategy, project management, and coordination', (SELECT id FROM roles WHERE name = 'freelancer'), '{"skills": ["Strategy", "Management", "Communication"]}'),

-- Agency categories
('web-dev-agency', 'Specialized in custom web applications and websites', (SELECT id FROM roles WHERE name = 'agency'), '{"services": ["Web Development", "E-commerce", "CMS"]}'),
('mobile-app-agency', 'Focused on iOS and Android mobile applications', (SELECT id FROM roles WHERE name = 'agency'), '{"services": ["Mobile Apps", "Cross-platform", "Native"]}');
```

### Insert Experience Levels
```sql
INSERT INTO experience_levels (name, description, years, tagline, features) VALUES
('junior', 'Early career professionals building foundational skills', '0–2 years', 'Potential builders', ARRAY['Learning core technologies', 'Building foundational skills', 'Working under guidance', 'Contributing to team projects']),
('mid-level', 'Experienced professionals driving development', '2–6 years', 'Core contributors', ARRAY['Independent project delivery', 'Mentoring junior developers', 'Technical decision making', 'Cross-functional collaboration']),
('senior', 'Expert professionals leading teams and projects', '6–10 years', 'Lead developers / team leads', ARRAY['Leading development teams', 'Architectural decision making', 'Project planning & execution', 'Stakeholder communication']),
('principal', 'Strategic leaders shaping technical direction', '10+ years', 'Strategic leaders', ARRAY['Technical strategy & vision', 'System architecture design', 'Team leadership & mentoring', 'Business impact focus']);
```

## 6. Test Your Setup

After creating tables and inserting data, you can test the API:

1. Go to **API** → **REST API** in Supabase
2. Try querying: `GET /rest/v1/roles`
3. You should see your roles data

## 7. Next Steps

Once this is set up, I'll help you:
- Update frontend services to use Supabase
- Implement real authentication
- Replace mock data with live API calls
- Add real-time features

## Need Help?

If you encounter any issues during setup, let me know the specific error and I'll help you resolve it!
