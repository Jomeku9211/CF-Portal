// ============================================================================
// 🚫 PERMANENTLY LOCKED APP COMPONENT - NEVER MODIFY THIS ROUTING FLOW
// ============================================================================
// 
// THIS COMPONENT HANDLES THE PERMANENT SMART ROUTING FLOW:
// 1. User login → Smart routing determines correct page
// 2. User with no role → Redirect to /role-selection
// 3. User with role → Check onboarding_stage → Route accordingly
//
// ANY ATTEMPTS TO MODIFY THIS FLOW ARE FORBIDDEN
// THE CODE IS WRITTEN IN STONE AND WILL NEVER CHANGE
//
// 🔒 PERMISSION REQUIRED FOR ANY CHANGES:
// This entire flow (signup → login → role selection → role category → 
// experience level → onboarding page → complete onboarding) is LOCKED.
// 
// NO CHANGES CAN BE MADE WITHOUT EXPLICIT PERMISSION FROM THE USER.
// ANY MODIFICATIONS MUST BE APPROVED BEFORE IMPLEMENTATION.
// 
// THE FLOW IS PERMANENT AND WILL NEVER BE ALTERED WITHOUT CONSENT.
// ============================================================================

import Footer from "./components/FooterComp/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { TopBanner } from "./components/LandingPage/TopBanner";
import { Navbar } from "./components/LandingPage/Navbar";
import { useSmartRouting } from "./hooks/useSmartRouting";

function App() {
  const location = useLocation();
  // ENABLE SMART ROUTING - FOLLOW THE LOCKED FLOW
  const { isLoading, error } = useSmartRouting();
  const authPaths = new Set(["/login", "/signup", "/forgot-password"]);
  const hideHeader = authPaths.has(location.pathname);
  
  // DEBUG: Log what's happening
  console.log('🔍 App.tsx - Current path:', location.pathname);
  console.log('🔍 App.tsx - Smart routing isLoading:', isLoading);
  console.log('🔍 App.tsx - Smart routing error:', error);

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
