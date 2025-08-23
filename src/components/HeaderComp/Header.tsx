import { useState, useRef, useEffect } from 'react';
import CFLogo from "../../assets/CFLogo.png";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/HeaderStyles/Header.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import GppGoodIcon from "@mui/icons-material/GppGood";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from '../../contexts/AuthContext';
import { UserCircle2 } from 'lucide-react';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };
    if (isAccountMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // The logout function will handle redirecting to login page
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback navigation if logout fails
      navigate('/login');
    }
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
            {!isAuthenticated ? (
              <Link to={"/login"} className="Login_Button" onClick={closeMobileMenu}>
                <span>Login</span>
                <svg className="arrow-icon" width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <path d="M3.14 4.13L13.75 4.13M13.75 4.13L13.75 14.74M13.75 4.13L4.13 13.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ) : (
              <div className="relative" ref={accountMenuRef}>
                <button className="Login_Button" onClick={() => {
                  console.log('Account menu toggle clicked, current state:', isAccountMenuOpen);
                  setIsAccountMenuOpen(v => !v);
                }} aria-label="Account menu">
                  <UserCircle2 size={20} />
                </button>
                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/onboarding"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
