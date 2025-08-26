import { Link } from 'react-router-dom';
import { PhoneIcon, MessageCircleIcon, MailIcon, MenuIcon } from 'lucide-react';
import CFLogo from '@/assets/CFLogo.png';

export function Header() {
  return (
    <header className="w-full sticky top-0 z-50">
      <div className="w-full bg-gradient-to-r from-[#1d3557] to-[#0f172a] text-white py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6 flex-wrap">
            <a href="#" className="flex items-center text-sm font-medium hover:text-white/80 transition-colors whitespace-nowrap">
              <span>Book a free hiring consultation</span>
              <span className="ml-2 text-base">→</span>
            </a>
            <a href="tel:+917694046866" className="flex items-center text-sm font-medium hover:text-white/80 transition-colors whitespace-nowrap">
              <PhoneIcon className="h-3.5 w-3.5 mr-2" />
              <span>+91-7694046866</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="WhatsApp">
              <MessageCircleIcon className="h-4 w-4" />
            </a>
            <a href="mailto:dheeraj@coderfarm.in" className="text-white/80 hover:text-white transition-colors" aria-label="Email">
              <MailIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={CFLogo} alt="CoderFarm Logo" className="h-10 object-contain" />
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-[#0f172a] hover:text-[#1d3557] font-medium text-base transition-colors duration-200">About</Link>
              <Link to="/podcast" className="text-[#0f172a] hover:text-[#1d3557] font-medium text-base transition-colors duration-200">Podcast</Link>
              <Link to="/contact" className="text-[#0f172a] hover:text-[#1d3557] font-medium text-base transition-colors duration-200">Contact Us</Link>
              <Link to="/login" className="bg-[#ffedd5] text-[#9a3412] hover:bg-[#fed7aa] hover:text-[#7c2d12] px-4 py-2 rounded-lg font-medium transition-colors duration-200">Login</Link>
            </nav>
            <button className="md:hidden text-[#0f172a] hover:text-[#1d3557] transition-colors duration-200" aria-label="Open menu">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;


