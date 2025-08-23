import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import LandingPage from "./views/LandingPage/LandingPage";
import AuthPage from "./components/Auth/AuthPage";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { OnboardingFlow } from "./components/onboarding/OnboardingFlow";
import { Onboarding1 } from "./components/onboarding/Onboarding1";
import { RoleSelection } from "./components/onboarding/RoleSelection";
import { SmartOnboardingRouter } from "./components/onboarding/SmartOnboardingRouter";
import ExperienceLevelSelection from "./components/onboarding/ExperienceLevelSelection";
import { SpecializationSelection } from "./components/onboarding/SpecializationSelection";
import { DeveloperExperienceSelection } from "./components/onboarding/DeveloperExperienceSelection";
import { DeveloperOnboarding } from "./components/onboarding/DeveloperOnboarding";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import PrivacyPolicy from "./views/PrivacyPolicy/PrivacyPolicy";
import ContentHubPage from "./views/ContentHub/ContentHub";
import { AboutUsSection } from "./components/AboutUsSection";
import { GuestRoute } from "./components/common/GuestRoute";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { AuthTest } from "./components/Auth/AuthTest";
import { EmailVerification } from "./components/Auth/EmailVerification";
import { EmailConfirmation } from "./components/Auth/EmailConfirmation";
import EmailConfirmationHandler from "./components/Auth/EmailConfirmationHandler";
import EmailConfirmed from "./components/Auth/EmailConfirmed";
import AssessmentsPage from './components/onboarding/AssessmentsPage';
import { TestFlow } from './components/TestFlow';
// Removed broken import: OnboardingNew does not exist in views

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "auth",
        element: (
          <GuestRoute>
            <AuthPage />
          </GuestRoute>
        ),
      },
      {
        path: "login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <GuestRoute>
            <Signup />
          </GuestRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        ),
      },
      {
        path: "role-selection",
        element: (
          <ProtectedRoute>
            <RoleSelection />
          </ProtectedRoute>
        ),
      },
      {
        path: "onboarding",
        element: (
          <ProtectedRoute>
            <SmartOnboardingRouter />
          </ProtectedRoute>
        ),
      },
      {
        path: "experience-level",
        element: (
          <ProtectedRoute>
            <ExperienceLevelSelection />
          </ProtectedRoute>
        ),
      },
      // Legacy routes for backward compatibility
      {
        path: "specialization-selection",
        element: (
          <ProtectedRoute>
            <SpecializationSelection />
          </ProtectedRoute>
        ),
      },
      {
        path: "developer-experience",
        element: (
          <ProtectedRoute>
            <DeveloperExperienceSelection />
          </ProtectedRoute>
        ),
      },
      {
        path: "developer-onboarding",
        element: (
          <ProtectedRoute>
            <DeveloperOnboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "client-onboarding",
        element: (
          <ProtectedRoute>
            <OnboardingFlow />
          </ProtectedRoute>
        ),
      },
      // Backward compatibility: old URL - now routes to smart onboarding
      {
        path: "onboarding-old",
        element: <Navigate to="/client-onboarding" replace />,
      },
      {
        path: "onboarding1",
        element: (
          <ProtectedRoute>
            <Onboarding1 />
          </ProtectedRoute>
        ),
      },
      // Removed route for non-existent onboarding-new view
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "content-hub",
        element: <ContentHubPage />,
      },
      {
        path: "about",
        element: <AboutUsSection />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth-test",
        element: <AuthTest />,
      },
      {
        path: "email-verification",
        element: (
          <GuestRoute>
            <EmailVerification />
          </GuestRoute>
        ),
      },
      {
        path: "email-confirmation",
        element: <EmailConfirmation />,
      },
      {
        path: "confirm-email",
        element: <EmailConfirmationHandler />,
      },
      {
        path: "email-confirmed",
        element: <EmailConfirmed />,
      },
    {
      path: "assessments",
      element: (
        <ProtectedRoute>
          <AssessmentsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "test-flow",
      element: (
        <ProtectedRoute>
          <TestFlow />
        </ProtectedRoute>
      ),
    },
    ],
  },
]);

export default appRouter;
