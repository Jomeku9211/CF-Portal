# Service Provider — Specification

Use this doc to capture functionality, flow, and acceptance criteria for the Service Provider module.

## 1) Problem Statement

After selecting the Service Provider role (Freelancer or Agency), the user must go through a structured onboarding flow to set up their professional profile, skills, and service offerings. This flow should track progress, allow resuming, and end at the Service Provider Dashboard once complete.

**CURRENT STATUS: Service Provider onboarding is NOT implemented yet.**

## 2) Goals / Non-Goals

### Goals:
- Start service provider onboarding immediately after role selection
- Guide the user through onboarding steps to create a comprehensive professional profile
- Track onboarding progress in user_onboarding_progress
- Resume onboarding if the user logs out and logs back in
- Ensure data relationships between User → Service Provider Profile → Skills → Portfolio
- Redirect to Service Provider Dashboard once onboarding is fully complete

### Non-Goals:
- Handling of client onboarding (separate flow)
- Handling of sub-step level database updates (only major step progress needs tracking)

## 3) High-Level Flow (NOT IMPLEMENTED)

**User selects Service Provider role → Redirect to /service-provider-onboarding**

### Step 1: Professional Profile Setup
- Create service provider profile (linked to user)
- Store in service_provider_profiles table
- Mark progress as Step 1 complete in user_onboarding_progress

### Step 2: Skills & Expertise Definition
- Define primary and secondary skills
- Set skill proficiency levels
- Store in skills table (linked to service provider profile)
- Mark progress as Step 2 complete in user_onboarding_progress

### Step 3: Portfolio & Service Configuration
- Upload portfolio projects and work samples
- Configure service packages and pricing
- Store in portfolio table and service_packages table
- Mark progress as Step 3 complete in user_onboarding_progress

**Once Step 3 is complete → Redirect user to Service Provider Dashboard**

**User can log out at any time**

**On login:**
- If user has role = Service Provider and incomplete onboarding → Redirect to last incomplete step in /service-provider-onboarding
- If onboarding complete → Redirect to Service Provider Dashboard

## 4) Current Implementation Status

### What We Actually Have:
- **Developer Onboarding Flow** - 5 steps implemented with specific fields:

#### Step 1: Account Setup & Verification
- **Fields**: 
  - `name` (text) - User's full name
  - `country` (text) - User's country
  - `timezone` (text) - User's timezone
  - `phone` (text) - Phone number with country code
  - `email_verification_status` (text) - Verification status
- **Purpose**: Basic account setup and email verification
- **Progress**: Updates to `DEV_STEP_2`

#### Step 2: Hard Skills
- **Fields**: 
  - `primary_stack` (array) - Array of primary technologies (e.g., ['React', 'Node.js', 'TypeScript'])
  - `years_experience` (number) - Years of experience
  - `last_used` (text) - Last year used the skills
- **Purpose**: Technical skills and experience level
- **Progress**: Updates to `DEV_STEP_3`

#### Step 3: Soft Skills & Portfolio
- **Fields**: 
  - `portfolio` (array) - Array of portfolio links (e.g., ['https://github.com/johndoe', 'https://portfolio.com'])
  - `culture_preference` (text) - Work culture preference (e.g., 'Collaborative')
  - `workstyle` (text) - Work style preference (e.g., 'Remote-first')
  - `communication_style` (text) - Communication preference (e.g., 'Written')
- **Purpose**: Portfolio links and work culture preferences
- **Progress**: Updates to `DEV_STEP_4`

#### Step 4: Assessments
- **Fields**: 
  - `skill_test_result` (text) - Result of skill assessment (e.g., 'Passed')
  - `soft_skill_score` (number) - Soft skills score (0-100)
  - `personality_test_result` (text) - Personality assessment result (e.g., 'Analytical')
- **Purpose**: Skills assessment scoring
- **Progress**: Updates to `DEV_STEP_5`

#### Step 5: Work Preferences
- **Fields**: 
  - `employment_type` (text) - Type of employment (e.g., 'Contract', 'Full-time')
  - `rate` (number) - Hourly rate in currency
  - `remote_preference` (text) - Remote work preference (e.g., 'Remote')
  - `notice_period` (text) - Notice period requirement (e.g., '2 weeks')
- **Purpose**: Work preferences and compensation
- **Progress**: Updates to `DEV_ONBOARDING_COMPLETE`

### Navigation & Progress:
- **URL Structure**: `/developer-onboarding?step=1` through `/developer-onboarding?step=5`
-Developer Onboarding — Specification

Use this doc to capture functionality, flow, and acceptance criteria for the Developer Onboarding (service provider) module.

1) Problem Statement

After selecting the Developer role (under Service Provider), the user must complete a 5-step onboarding process that captures personal details, skills, portfolio, assessments, and work preferences. This onboarding ensures developers are fully profiled before they can access their Developer Dashboard.

2) Goals / Non-Goals

Goals:

Start developer onboarding immediately after role selection.

Guide the user through 5 structured steps.

Track progress in user_onboarding_progress.

Allow resuming from the last incomplete step if user logs out.

Redirect to Developer Dashboard once onboarding is fully complete.

Non-Goals:

Freelancer and Agency onboarding (to be implemented separately).

Assessment scoring logic (assumed handled externally).

3) High-Level Flow

User selects Developer role → Redirect to /developer-onboarding?step=1.

Step 1: Account Setup & Verification

Collect name, country, timezone, phone.

Confirm email_verification_status.

Progress updates → DEV_STEP_2.

Step 2: Hard Skills

Capture primary_stack (array of technologies), years_experience, last_used.

Progress updates → DEV_STEP_3.

Step 3: Soft Skills & Portfolio

Collect portfolio links, culture_preference, workstyle, communication_style.

Progress updates → DEV_STEP_4.

Step 4: Assessments

Capture skill_test_result, soft_skill_score, personality_test_result.

Progress updates → DEV_STEP_5.

Step 5: Work Preferences

Capture employment_type, rate, remote_preference, notice_period.

Progress updates → DEV_ONBOARDING_COMPLETE.

Once Step 5 is complete → Redirect user to /developer-dashboard.

User can logout anytime. On login, system checks user_onboarding_progress and resumes from last incomplete step.

4) Acceptance Criteria

 After selecting Developer role, system redirects to /developer-onboarding?step=1.

 Developer onboarding consists of 5 steps: Account Setup → Hard Skills → Soft Skills & Portfolio → Assessments → Work Preferences.

 Each step updates progress in user_onboarding_progress.

 Step 1 stores basic profile and verifies email.

 Step 2 captures technical skills (primary_stack, years_experience, last_used).

 Step 3 captures soft skills, work style, and portfolio links.

 Step 4 captures assessment results (skill_test_result, soft_skill_score, personality_test_result).

 Step 5 captures work preferences (employment_type, rate, remote_preference, notice_period).

 Sub-steps inside each step (e.g., multiple portfolio links) do not trigger progress updates individually.

 If user logs out during onboarding, on next login system resumes at last incomplete step.

 When all 5 steps are complete, redirect to Developer Dashboard (/developer-dashboard).