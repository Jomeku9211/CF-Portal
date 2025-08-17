import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./views/LandingPage/LandingPage";
import AuthPage from "./components/Auth/AuthPage";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { OnboardingFlow } from "./components/onboarding/OnboardingFlow";
import { RoleSelection } from "./components/onboarding/RoleSelection";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import PrivacyPolicy from "./views/PrivacyPolicy/PrivacyPolicy";
import ContentHubPage from "./views/ContentHub/ContentHub";
import { AboutUsSection } from "./components/AboutUsSection";

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
        element: <AuthPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
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
