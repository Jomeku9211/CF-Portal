import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Login } from "./modules/shared/Auth/Login";
import { Signup } from "./modules/shared/Auth/Signup";
import { ForgotPassword } from "./modules/shared/Auth/ForgotPassword";
import { ProtectedRoute } from "./modules/shared/routes/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { PodcastPage } from "./pages/Podcast";
import AboutPage from "./pages/About";
import { ContactPage } from "./pages/Contact";
import { StyleGuidePage } from "./pages/StyleGuide";
import { GuestRoute } from "./modules/shared/routes/GuestRoute";
import { SuperAdminLogin } from "./modules/super-admin/components/SuperAdminLogin";
import { AdminRoute } from "./modules/shared/routes/AdminRoute";
import { SuperAdminDashboard } from "./modules/super-admin/components/SuperAdminDashboard";
import { ProfileScraperPage, PostScraperPage, GenerateCommentPage, PodcastManagementPage } from "./modules/super-admin/components";
import { MemberDashboardPage } from "./pages/MemberDashboard";
import { DeveloperOnboardingPage } from "./modules/service-provider/components/developer/DeveloperOnboarding";

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

          { path: "podcast-management", element: <PodcastManagementPage /> },
        ],
      },
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
      {
        path: "developer-onboarding",
        element: (
          <ProtectedRoute>
            <DeveloperOnboardingPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default appRouter;
