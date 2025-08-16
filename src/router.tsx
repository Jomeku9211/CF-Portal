import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import AuthPage from "./components/Auth/AuthPage";
import Login from "./components/Login/Login";

const appRouter = createBrowserRouter([
  {
    path: "/",
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
        path: "explore-developers",
        element: <Login />,
      },
    ],
  },
]);

export default appRouter;
