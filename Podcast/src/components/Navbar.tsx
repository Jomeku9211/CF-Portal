import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-4'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="font-bold text-xl">
              <span className="bg-primary text-white px-2 py-1 rounded mr-1">
                Hiring
              </span>
              <span className="text-primary">is Broken</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <div className="text-sm text-gray-600 mr-4 flex items-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              30 days money back guarantee
            </div>
            <a href="#contact" className="btn-primary flex items-center">
              Book a Free Call
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
          <nav className="flex flex-col space-y-4 p-4">
            <a href="#about" className="text-gray-700 hover:text-primary font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <a href="#episodes" className="text-gray-700 hover:text-primary font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
              Episodes
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
            <a href="#contact" className="btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
              Book a Free Call
            </a>
          </nav>
        </div>}
    </header>;
}