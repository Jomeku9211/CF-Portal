lient Onboarding — Specification

Use this doc to capture functionality, flow, and acceptance criteria for the Client Onboarding module.

1) Problem Statement

After selecting the Client role, the user must go through a structured onboarding flow to set up their organization, teams, and hiring needs. This flow should track progress, allow resuming, and end at the Client Dashboard once complete.

2) Goals / Non-Goals

Goals:

Start client onboarding immediately after role selection.

Guide the user through 3 major onboarding steps (Organization → Team → Hiring Intent & Job Persona).

Track onboarding progress in user_onboarding_progress.

Resume onboarding if the user logs out and logs back in.

Ensure data relationships between User → Organization → Team → Job Posts.

Redirect to Client Dashboard once onboarding is fully complete.

Non-Goals:

Handling of developer/service provider onboarding (separate flow).

Handling of sub-step level database updates (only major step progress needs tracking).

3) High-Level Flow

User selects Client role → Redirect to /client-onboarding.

Step 1: Organization Setup

Create organization (linked to user as creator/owner).

Store in organization table.

Mark progress as Step 1 complete in user_onboarding_progress.

Step 2: Team Setup

Create team(s) within organization.

Store in teams table (linked to organization).

Mark progress as Step 2 complete in user_onboarding_progress.

Step 3: Hiring Intent & Job Persona

Define hiring intent and create job persona(s).

Store in job_posts table (linked to team).

Mark progress as Step 3 complete in user_onboarding_progress.

Once Step 3 is complete → Redirect user to Client Dashboard.

User can log out at any time.

On login:

If user has role = Client and incomplete onboarding → Redirect to last incomplete step in /client-onboarding.

If onboarding complete → Redirect to Client Dashboard.

4) Acceptance Criteria

 After selecting Client role, system redirects to /client-onboarding.

 User onboarding is divided into 3 major steps: Organization, Team, Hiring Intent & Job Persona.

 Sub-steps exist but do not update DB progress individually (only after major step completion).

 Progress stored in user_onboarding_progress with values for step completion.

 Organization is stored in organization table and linked to user (one user can create multiple orgs, but org has one creator).

 Team is stored in teams table and linked to an organization (one org → many teams).

 Job persona(s) stored in job_posts table and linked to a team (one team → many job posts).

 If user logs out mid-onboarding, on next login system checks user_onboarding_progress and resumes from last incomplete step.

 If onboarding is completed, user is redirected to Client Dashboard.

 Logout option is available throughout onboarding.