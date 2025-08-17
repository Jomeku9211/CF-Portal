import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import CFLogo from '../../assets/CFLogo.png';

export function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
            <Link to="/login" className="text-gray-700 hover:text-blue-700 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition flex items-center">
              Sign Up
              <ArrowRightIcon size={16} className="ml-1" />
            </Link>
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
          </nav>
        )}
      </div>
    </header>
  );
}
