import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./views/LandingPage/LandingPage";
import AuthPage from "./components/Auth/AuthPage";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { OnboardingFlow } from "./components/onboarding/OnboardingFlow";

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
        path: "onboarding",
        element: <OnboardingFlow />,
      },
    ],
  },
]);

export default appRouter;
