import Footer from "./components/FooterComp/Footer";
import { Outlet } from "react-router-dom";
import { TopBanner } from "./components/LandingPage/TopBanner";
import { Navbar } from "./components/LandingPage/Navbar";

function App() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <Outlet />
      <Footer /> 
    </>
  );
}

export default App;
