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
import { SpecializationSelection } from "./components/onboarding/SpecializationSelection";
import { DeveloperExperienceSelection } from "./components/onboarding/DeveloperExperienceSelection";
import ExperienceLevelSelection from "./components/onboarding/ExperienceLevelSelection";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import PrivacyPolicy from "./views/PrivacyPolicy/PrivacyPolicy";
import ContentHubPage from "./views/ContentHub/ContentHub";
import { AboutUsSection } from "./components/AboutUsSection";
import { GuestRoute } from "./components/common/GuestRoute";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { AuthTest } from "./components/Auth/AuthTest";
import { EmailVerification } from "./components/Auth/EmailVerification";
import { EmailConfirmation } from "./components/Auth/EmailConfirmation";
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
        path: "specialization-selection",
        element: (
          <ProtectedRoute>
            <SpecializationSelection />
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
      {
        path: "developer-experience",
        element: (
          <ProtectedRoute>
            <DeveloperExperienceSelection />
          </ProtectedRoute>
        ),
      },
      {
        path: "clientOnboarding",
        element: (
          <ProtectedRoute>
            <OnboardingFlow />
          </ProtectedRoute>
        ),
      },
      // Backward compatibility: old URL
      {
        path: "onboarding",
        element: <Navigate to="/clientOnboarding" replace />,
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
      element: <EmailVerification />,
    },
    {
      path: "email-confirmation",
      element: <EmailConfirmation />,
    },
    ],
  },
]);

export default appRouter;
