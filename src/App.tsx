import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./layouts/Header";
import { Footer } from "./layouts/Footer";

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
