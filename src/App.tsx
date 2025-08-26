import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  const location = useLocation();
  const authPaths = new Set(["/login", "/signup", "/forgot-password"]);
  const isAdminSection = location.pathname.startsWith("/admin");
  const hideHeader = authPaths.has(location.pathname) || isAdminSection;
  return (
    <>
      {!hideHeader && <Header />}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
