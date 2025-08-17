import { useState } from 'react';
import CFLogo from "../../assets/CFLogo.png";
import { Link } from "react-router-dom";
import "../../styles/HeaderStyles/Header.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import GppGoodIcon from "@mui/icons-material/GppGood";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <div className="Upper_Main">
        <div className="guarantee-section">
          <div className="guarantee-item">
            <GppGoodIcon className="shield-icon" />
            <span>30 days money back guaranty</span>
          </div>
          <div className="guarantee-item">
            <span>Zero Down time gurantee</span>
          </div>
        </div>
        <div className="contact-section">
          <div className="contact-item">
            <MailOutlineIcon className="contact-icon" />
            <span>dheeraj@coderfarm.in</span>
          </div>
          <div className="contact-item">
            <LocalPhoneOutlinedIcon className="contact-icon" />
            <span>76940 46986</span>
          </div>
          <div className="contact-item">
            <FmdGoodOutlinedIcon className="contact-icon" />
            <span>Indore, India</span>
          </div>
        </div>
      </div>
      
      <div className="Header_Main" data-testid="HeaderId">
        <div className="Header_Main_Logo">
          <Link to={"/"} className="Header_LogoLink" onClick={closeMobileMenu}>
            <img src={CFLogo} alt="CoderFarm Logo" />
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        
        <div className={`Header_Main_Components ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <nav className="Header_Navigation">
            <Link to={"/about"} className="NavLink" onClick={closeMobileMenu}>
              About Us
            </Link>
            <Link to={"/developers"} className="NavLink" onClick={closeMobileMenu}>
              Developers
            </Link>
            <Link to={"/contact"} className="NavLink" onClick={closeMobileMenu}>
              Contact Us
            </Link>
            <Link to={"/login"} className="Login_Button" onClick={closeMobileMenu}>
              <span>Login</span>
              <svg className="arrow-icon" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M3.14 4.13L13.75 4.13M13.75 4.13L13.75 14.74M13.75 4.13L4.13 13.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </nav>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
        )}
      </div>
    </div>
  );
}

export default Header;
