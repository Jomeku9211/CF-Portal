import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import LandingPage from "./views/LandingPage/LandingPage";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { OnboardingFlow } from "./components_backup/onboarding/OnboardingFlow";
import { Onboarding1 } from "./components_backup/onboarding/Onboarding1";
import { RoleSelection } from "./components_backup/onboarding/RoleSelection";
import { ProtectedRoute } from "./components_backup/common/ProtectedRoute";
import PrivacyPolicy from "./views/PrivacyPolicy/PrivacyPolicy";
import { PodcastPage } from "./pages/Podcast";
import { AboutPage } from "./pages/About";
import { ContactPage } from "./pages/Contact";
import { StyleGuidePage } from "./pages/StyleGuide";
import { GuestRoute } from "./components_backup/common/GuestRoute";
import { SuperAdminLogin } from "./components_backup/Auth/SuperAdminLogin";
import { AdminRoute } from "./components_backup/common/AdminRoute";
import { SuperAdminDashboard } from "./components_backup/Dashboard/SuperAdminDashboard";
import { ProfileScraperPage, PostScraperPage, GenerateCommentPage, AutoCommentingPage, PodcastManagementPage } from "./components_backup/Dashboard";
import { MemberDashboardPage } from "./pages/MemberDashboard";
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
        path: "super-admin",
        element: (
          <GuestRoute>
            <SuperAdminLogin />
          </GuestRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <SuperAdminDashboard />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <ProfileScraperPage /> },
          { path: "profile-scraper", element: <ProfileScraperPage /> },
          { path: "post-scraper", element: <PostScraperPage /> },
          { path: "generate-comment", element: <GenerateCommentPage /> },
          { path: "auto-commenting", element: <AutoCommentingPage /> },
          { path: "podcast-management", element: <PodcastManagementPage /> },
        ],
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
        element: <Navigate to="/podcast" replace />,
      },
      {
        path: "podcast",
        element: <PodcastPage />,
      },
      {
        path: "podcast/dashboard",
        element: <MemberDashboardPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "style-guide",
        element: <StyleGuidePage />,
      },
    ],
  },
]);

export default appRouter;
