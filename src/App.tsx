import Footer from "./components/FooterComp/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { TopBanner } from "./components/LandingPage/TopBanner";
import { Navbar } from "./components/LandingPage/Navbar";

function App() {
  const location = useLocation();
  const authPaths = new Set(["/login", "/signup", "/forgot-password"]);
  const hideHeader = authPaths.has(location.pathname);
  return (
    <>
      {!hideHeader && (
        <>
          <TopBanner />
          <Navbar />
        </>
      )}
      <Outlet />
      <Footer /> 
    </>
  );
}

export default App;
