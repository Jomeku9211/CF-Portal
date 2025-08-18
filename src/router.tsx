import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./views/LandingPage/LandingPage";
import AuthPage from "./components/Auth/AuthPage";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { OnboardingFlow } from "./components/onboarding/OnboardingFlow";
import { Onboarding1 } from "./components/onboarding/Onboarding1";
import { RoleSelection } from "./components/onboarding/RoleSelection";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import PrivacyPolicy from "./views/PrivacyPolicy/PrivacyPolicy";
import ContentHubPage from "./views/ContentHub/ContentHub";
import { AboutUsSection } from "./components/AboutUsSection";
import { GuestRoute } from "./components/common/GuestRoute";
import OnboardingNew from "./views/OnboardingNew/OnboardingNew";

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
            <OnboardingFlow />
          </ProtectedRoute>
        ),
      },
      {
        path: "onboarding1",
        element: (
          <ProtectedRoute>
            <Onboarding1 />
          </ProtectedRoute>
        ),
      },
      {
        path: "onboarding-new",
        element: (
          <ProtectedRoute>
            <OnboardingNew />
          </ProtectedRoute>
        ),
      },
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
    ],
  },
]);

export default appRouter;
