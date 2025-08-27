## Role Selection

### Overview
Users select one of three roles to tailor their onboarding journey:
- Client
- Freelancer (service provider)
- Agency

This selection updates the user's roles in the backend and local cache, and then redirects to the appropriate onboarding/start page. The implementation lives in `src/modules/shared/components/RoleSelection.tsx`.

### How It Works (as implemented)
- UI presents three selectable role cards with visual selection state and a primary "Continue" CTA.
- Internal state: `selectedRole` (`'client' | 'freelancer' | 'agency' | null`).
- On Continue:
  1) Update user roles (array) in backend
     - If `user.id` exists: `userService.updateUserById(user.id, { roles: [role] })`
     - Else: `userService.updateCurrentUserRole(role)`
  2) Update local cache
     - Merge and persist to `localStorage.currentUser` → `{ ...currentUser, roles: [role] }`
  3) If role is `client`, set onboarding fields
     - Backend: `onboarding_stage = 'organization_creation'`, `is_onboarding = true`, `onboarding_status = 'org_pending'`
     - Local cache mirrors the same keys in `currentUser`
  4) Redirect by role
     - Client → `/clientOnboarding`
     - Freelancer → (placeholder) log message until flow exists
     - Agency → (placeholder) log message until flow exists

### Data Contract
- Roles stored as array: `roles: [ 'client' | 'freelancer' | 'agency' ]`
- For clients, onboarding keys set:
  - `onboarding_stage: 'organization_creation'`
  - `is_onboarding: true`
  - `onboarding_status: 'org_pending'`

### Error Handling
- If role update fails, an alert is shown with the backend error message (when provided), and navigation does not proceed.
- Local cache updates are wrapped with try/catch to avoid hard failures on storage exceptions.

### Navigation & UX
- Back link to Home.
- Continue button disabled until a role is selected.
- Selected card shows highlighted border/shadow and a check icon.

### Acceptance Criteria
- Selection & Validation
  - User can select exactly one role at a time.
  - Continue is disabled until a role is selected.
- Backend Updates
  - On Continue, user roles are persisted as an array in the backend.
  - On failure, an error is surfaced and no navigation occurs.
- Local Cache
  - `localStorage.currentUser` is updated to include `roles: [role]`.
  - For client role, local cache includes onboarding fields mirroring backend values.
- Client Role Behavior
  - When `client` is selected, backend fields are set: `onboarding_stage='organization_creation'`, `is_onboarding=true`, `onboarding_status='org_pending'`.
  - User is redirected to `/clientOnboarding`.
- Freelancer Role Behavior
  - When `freelancer` is selected, roles are saved; placeholder action is logged until onboarding exists.
- Agency Role Behavior
  - When `agency` is selected, roles are saved; placeholder action is logged until onboarding exists.
- UX
  - Selected role card is visually distinct (highlight + check icon).
  - Accessibility: role cards and Continue button are keyboard-focusable.

### Test Coverage Suggestions
- Unit
  - Selection state toggles and Continue enabled/disabled logic.
  - Error surfaced when backend role update fails.
  - Local cache updated correctly for each role.
- Integration
  - Client path sets onboarding fields and redirects to `/clientOnboarding`.
  - Roles saved as array regardless of single selection.
- E2E
  - Select Client → Continue → lands on `/clientOnboarding` with onboarding flags present in cache.
  - Select Freelancer/Agency → roles saved; no crash; placeholder path executed.