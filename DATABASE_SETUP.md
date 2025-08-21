# Database Setup Guide

## Prerequisites
- MySQL/MariaDB database server
- Node.js and npm

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure database connection:**
   Create a `.env` file in the root directory with:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password_here
   DB_NAME=cf_portal
   NODE_ENV=development
   ```

3. **Create database:**
   ```sql
   CREATE DATABASE cf_portal;
   ```

## Database Structure

### Tables Created:

#### 1. `roles` Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR, Unique)
- `description` (TEXT)
- `buttonLabel` (VARCHAR)
- `icon` (VARCHAR)
- `isActive` (BOOLEAN, Default: true)
- `sortOrder` (INT, Default: 0)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

#### 2. `role_categories` Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `description` (TEXT)
- `roleId` (VARCHAR, Foreign Key to roles.id)
- `isActive` (BOOLEAN, Default: true)
- `sortOrder` (INT, Default: 0)
- `metadata` (JSON, Nullable)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

#### 3. `role_levels` Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR) - Junior, Mid, Senior, Principal
- `description` (TEXT)
- `roleCategoryId` (VARCHAR, Foreign Key to role_categories.id)
- `sortOrder` (INT, Default: 0)
- `requirements` (JSON, Nullable) - Skills, experience, etc.
- `onboardingFlow` (JSON, Nullable) - Specific onboarding stages
- `isActive` (BOOLEAN, Default: true)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

#### 4. `onboarding_stages` Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR) - Profile Setup, Skills Assessment, etc.
- `description` (TEXT)
- `roleLevelId` (VARCHAR, Foreign Key to role_levels.id)
- `sortOrder` (INT, Default: 0)
- `stageType` (VARCHAR) - required, optional, conditional
- `requirements` (JSON, Nullable) - What needs to be completed
- `formFields` (JSON, Nullable) - Dynamic form configuration
- `nextStage` (VARCHAR, Nullable) - ID of next stage
- `previousStage` (VARCHAR, Nullable) - ID of previous stage
- `isActive` (BOOLEAN, Default: true)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

## Running the Seeder

### Option 1: Direct TypeScript execution
```bash
npm run seed
```

### Option 2: Build and run
```bash
npm run build
npm run seed:build
```

## Sample Data

The seeder will create:

### Roles:
1. **Client** - For companies hiring developers
2. **Service Provider** - For individual developers
3. **Agency Owner** - For agencies with teams

### Role Categories:

#### Client Categories:
- **Founder** - Company founder or co-founder looking to build a team
- **HR / Recruiter** - Human resources professional responsible for hiring
- **CTO** - Chief Technology Officer managing technical team

#### Service Provider Categories:
- **Developer** - Software developer with technical skills
  - **Levels:** Junior (0-2 years), Mid (3-7 years), Senior (8+ years), Principal (10+ years)
- **Designer** - UI/UX designer focused on user experience
- **Tester** - Quality assurance and testing specialist

#### Agency Categories:
- **Web Development Agency** - Specialized in custom web applications
- **Mobile App Agency** - Focused on iOS and Android development

## Database Relationships

- **One-to-Many**: One Role can have many RoleCategories
- **One-to-Many**: One RoleCategory can have many RoleLevels
- **One-to-Many**: One RoleLevel can have many OnboardingStages
- **Cascade Delete**: Deleting a Role will delete all associated data
- **Linked Stages**: OnboardingStages are linked with next/previous relationships

## Onboarding Flow Structure

### Service Provider + Developer + Junior Flow:
1. **Profile Setup** - Basic profile and personal information
2. **Skills Assessment** - Technical skills and experience evaluation
3. **Portfolio Creation** - Projects and work samples showcase
4. **Availability & Preferences** - Work preferences and availability
5. **Verification & Review** - Identity verification and profile review

### Client + Founder Flow:
- **onboarding_organisation** → **onboarding_team** → **job_creation**

## Notes

- The database uses UUIDs for primary keys
- Timestamps are automatically managed
- The `metadata` field allows flexible additional data storage
- All tables include `isActive` and `sortOrder` for soft deletion and ordering
