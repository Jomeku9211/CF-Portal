import Footer from "./components/FooterComp/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { TopBanner } from "./components/LandingPage/TopBanner";
import { Navbar } from "./components/LandingPage/Navbar";
import { useSmartRouting } from "./hooks/useSmartRouting";

function App() {
  const location = useLocation();
  const { isLoading, error } = useSmartRouting();
  const authPaths = new Set(["/login", "/signup", "/forgot-password"]);
  const hideHeader = authPaths.has(location.pathname);

  // Show loading while smart routing is determining user's correct page
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Determining your route...</p>
        </div>
      </div>
    );
  }

  // Show error if smart routing failed
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
