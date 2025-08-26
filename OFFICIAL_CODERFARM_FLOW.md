# Coderfarm App Flow — Step‑by‑Step (v1.2)

**Owner:** Dheeraj Khandare  
**Product:** Coderfarm (fit‑first tech hiring platform)  
**Last updated:** 23 Aug 2025  
**Scope:** Extended login & onboarding logic with precise client (3 steps) and developer (5 steps) onboarding flows. Written step‑by‑step for database + front‑end integration.

## 1) Authentication & Entry Flow

### 1.1 Sign In
- User clicks Sign In.
- Check email verification:
  - If not verified → Show Email Confirmation Page.
  - User clicks link in email → users.email_verified=true → Auto login.
  - If already verified → Continue to role check.

### 1.2 Role Check (user_role table)
- On login, query user_role table for logged‑in user_id.
- If no role found → Show Role Selection Page.
- If role found → Check user_onboarding_progress table.
- Based on onboarding stage, redirect user to the correct onboarding step/page.

## 2) Role Selection & Branching

### 2.1 If Role = Client
- User selects Client → Choose Role Category (Founder/HR/Hiring Manager).
- Insert row into client_profile: {user_id, role_category}.
- Insert/Update user_role: {user_id, role=CLIENT}.
- Insert/Update user_onboarding_progress: {user_id, stage=CLIENT_ORG}.
- Redirect → Client Onboarding (Step 1: Organization).

### 2.2 If Role = Service Provider 
- User selects Service Provider → Choose Role Category (Designer/Tester/Developer).
- User selects Experience Level (Junior/Mid/Senior/Principal).
- Insert row into service_provider_profile: {user_id, role_category, experience_level}.
- Insert/Update user_role: {user_id, role=SERVICE_PROVIDER}.
- Insert/Update user_onboarding_progress: {user_id, stage=DEV_STEP_1}.
- Redirect → Developer Onboarding (Step 1).

## 3) Client Onboarding (3 Main Steps)

Each step must write to DB + update user_onboarding_progress.

### 3.1 Step 1 — Organization Details
- User enters: org name, website, industry, size, HQ.
- Insert into organization table.
- Link organization.id → client_profile.organization_id.
- Update user_onboarding_progress: {stage=CLIENT_TEAM}.

### 3.2 Step 2 — Team Details
- User enters: team size, communication style, workstyle, decision making, timezone.
- Insert into team table.
- Link team.organization_id = organization.id.
- Update user_onboarding_progress: {stage=CLIENT_HIRING}.

### 3.3 Step 3 — Hiring Intent + Job Creation
- User defines: hiring timeline, #hires, urgency, job title/category.
- Insert into job_post table with FK team_id.
- Link job → team.
- Update user_onboarding_progress: {stage=CLIENT_ONBOARDING_COMPLETE}.
- Redirect → Client Dashboard.

## 4) Developer Onboarding (5 Steps)

Each step updates service_provider_profile + user_onboarding_progress.

### 4.1 Step 1 — Account Setup & Verification
- Collect name, country, timezone, phone, email verification status.
- Update service_provider_profile.
- Update user_onboarding_progress: {stage=DEV_STEP_2}.

### 4.2 Step 2 — Hard Skills
- Select primary stack/tools, years of experience, last‑used.
- Update service_provider_profile.
- Update user_onboarding_progress: {stage=DEV_STEP_3}.

### 4.3 Step 3 — Soft Skills & Portfolio
- Upload portfolio/case studies/GitHub links.
- Answer culture/workstyle/communication preference form.
- Update service_provider_profile.
- Update user_onboarding_progress: {stage=DEV_STEP_4}.

### 4.4 Step 4 — Assessments
- Complete one‑way skill test (tech/design/QA) + soft skill/personality test.
- Save results.
- Update service_provider_profile.
- Update user_onboarding_progress: {stage=DEV_STEP_5}.

### 4.5 Step 5 — Work Preferences
- Define FT/Contract preference, rate/salary, remote/onsite, notice period.
- Update service_provider_profile.
- Update user_onboarding_progress: {stage=DEV_ONBOARDING_COMPLETE}.
- Redirect → Developer Dashboard.

## 5) Onboarding Progress Enforcement
On Every Login or Refresh
- Check user_role.
- If none → Show Role Selection Page.
- If role exists → Check user_onboarding_progress.stage.
- If stage = incomplete → Redirect to corresponding onboarding step URL.
- If stage = complete → Redirect to role‑specific Dashboard.

## 6) Tables Involved
- users → core auth, email_verified flag.
- user_role → {user_id, role}.
- user_onboarding_progress → {user_id, stage}.
- client_profile → linked to organization.
- organization → linked to team.
- team → linked to job_post.
- job_post → hiring intent + persona.
- service_provider_profile → linked to developer onboarding.

## ✅ This ensures:
- Clients finish 3 clear onboarding steps (Org → Team → Hiring/Jobs).
- Developers finish 5 clear onboarding steps (Account → Hard Skills → Soft Skills/Portfolio → Assessments → Work Preferences).
- At any login/refresh, the system checks user_onboarding_progress and resumes at the correct URL automatically.

---

**🚫 IMPORTANT: This flow is PERMANENTLY LOCKED and must be followed EXACTLY as written. No modifications without explicit permission from Dheeraj Khandare.**
