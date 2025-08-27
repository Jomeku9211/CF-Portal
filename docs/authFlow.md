Module 1 — Authentication & Entry

(Login, Signup, Forgot Password, Email Confirmation, Logout)

Owner: Dheeraj Khandare
Product: Coderfarm Portal
Version: v1.3 (merged)
Scope: Covers authentication for all user types (Client, Service Provider, Agency, Super Admin), including signup, login, email verification, forgot password, logout, and security enforcement.

1) Problem Statement

Coderfarm users must securely access the platform. Authentication should:

Validate credentials, prevent unauthorized access, and enforce email confirmation.

Support secure signup, password reset, and logout.

Redirect users to correct Role Selection or Onboarding based on progress.

Provide robust error handling and security protection.

2) User Types

Client → Companies hiring service providers

Service Provider → Freelancers/individuals offering services

Agency → Companies listing multiple service providers

Super Admin → Coderfarm administrators

3) Goals / Non-Goals

Goals

Secure login/signup/reset/logout system.

Enforce email verification before role selection/onboarding.

Role-aware redirection (Client/Service Provider/Agency/Admin).

Support JWT tokens, session management, CSRF protection.

Non-Goals (v1.3)

No MFA/2FA.

No SSO (LinkedIn, GitHub, etc.).

No advanced password policy beyond strength check.

4) High-Level Flow
New User Flow

User visits /signup → fills form → users.email_verified=false.

Verification email sent.

User clicks verification link → email_verified=true.

Redirected to Role Selection.

User selects role → onboarding begins.

Existing User Flow

User visits /login.

If email not verified → redirect /email-confirmation.

If verified → check user_role + user_onboarding_progress.

Redirect to correct onboarding step or dashboard.

Password Reset Flow

User clicks /forgot-password.

Enters email → verification code sent.

User enters code + sets new password.

Password updated → redirect /login.

Logout Flow

User clicks Logout.

JWT/session invalidated.

Redirect to /login.

Back button / stale token access must be blocked.

5) Acceptance Criteria
5.1 Signup

✅ Route: /signup

✅ Fields: Full Name, Email, Password, Confirm Password

✅ Password must pass strength check.

✅ Must accept Terms & Conditions.

✅ On submit → create user in users table, email_verified=false.

✅ Send verification + welcome email.

✅ Redirect to /email-confirmation.

5.2 Email Confirmation

✅ Route: /email-confirmation

✅ Clicking valid link → set users.email_verified=true.

✅ Auto login + redirect to Role Selection.

✅ Expired/invalid link → error + option to resend.

✅ Page must have “Resend email” + “Back to Login” options.

5.3 Login

✅ Route: /login

✅ Fields: Email, Password

✅ Features: Remember Me, Password visibility toggle

✅ If invalid credentials → error “Invalid login details”.

✅ If email_verified=false → redirect /email-confirmation.

✅ If verified → check user_role + redirect onboarding/dashboard.

✅ Must support Google OAuth login.

5.4 Forgot Password

✅ Route: /forgot-password

✅ User enters email → system sends verification code (TTL 15 min).

✅ User enters code + sets new password.

✅ Password updated in users.password (hashed).

✅ Redirect to /login.

5.5 Logout

✅ User can logout from any page.

✅ Session/JWT must be invalidated immediately.

✅ User redirected to /login.

✅ Authenticated routes must not be accessible via back button or expired token.

6) Security Features

✅ JWT token authentication

✅ Password hashing (bcrypt/argon2)

✅ Session management (expiry + invalidation)

✅ CSRF protection

✅ Rate limiting (login/signup/reset APIs)

✅ Input validation (server + client side)

7) Error Handling

Invalid credentials → show generic error

Email not verified → show /email-confirmation

Invalid/expired verification links → error + resend option

Locked accounts (after X failed logins) → show lockout message

Network errors → retry option with graceful fallback

8) Integration Points

Email Service → send verification, reset, welcome emails

Role Service → handle role assignment after signup

Organization Service → check if org exists for user (Client path)

Onboarding Service → redirect user to correct step

9) Testing Requirements

Unit tests → login, signup, reset, logout components

Integration tests → API endpoints /login, /signup, /forgot-password, /email-confirmation

E2E tests → full signup → verify → login → onboarding flow

Security tests → brute force, CSRF, token expiry

10) Future Enhancements

2FA (Google Authenticator/SMS)

More social logins (LinkedIn, GitHub)

SSO for enterprise

Multi-tenant authentication

Advanced password policies