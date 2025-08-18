import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, UserCircle2, ChevronDown } from 'lucide-react';
import CFLogo from '../../assets/CFLogo.png';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    setIsAccountMenuOpen(false);
    navigate('/');
  };

  return (
    <header className={`w-full bg-white ${isSticky ? 'sticky top-0 shadow-md z-50' : ''}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" onClick={closeMobileMenu}>
              <img src={CFLogo} alt="CoderFarm Logo" className="h-10 w-auto" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-blue-700 transition-colors">
              About
            </Link>
            <Link to="/content-hub" className="text-gray-700 hover:text-blue-700 transition-colors">
              Content Hub
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-700 transition-colors">
              Contact Us
            </Link>
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-700 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition flex items-center">
                  Sign Up
                  <ArrowRightIcon size={16} className="ml-1" />
                </Link>
              </>
            ) : (
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={() => setIsAccountMenuOpen(v => !v)}
                  className="text-gray-700 hover:text-blue-700 transition-colors flex items-center"
                  aria-label="Account menu"
                >
                  <UserCircle2 size={24} />
                  <ChevronDown size={16} className="ml-1" />
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
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4 pb-4 border-t pt-4">
            <Link 
              to="/about" 
              className="block text-gray-700 hover:text-blue-700 transition-colors"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link 
              to="/content-hub" 
              className="block text-gray-700 hover:text-blue-700 transition-colors"
              onClick={closeMobileMenu}
            >
              Content Hub
            </Link>
            <Link 
              to="/contact" 
              className="block text-gray-700 hover:text-blue-700 transition-colors"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="block text-gray-700 hover:text-blue-700 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition w-full text-center mt-2"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex flex-col space-y-1">
                <div className="text-gray-500 text-xs uppercase px-1">My Account</div>
                <Link to="/onboarding" className="block text-gray-700 hover:text-blue-700 transition-colors" onClick={closeMobileMenu}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-left text-gray-700 hover:text-blue-700 transition-colors">
                  Logout
                </button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
