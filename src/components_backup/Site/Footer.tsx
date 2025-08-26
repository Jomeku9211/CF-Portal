import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import CFLogo from '@/assets/CFLogo.png';

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-[#0b1220] to-[#0a0f1d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-6">
            <img src={CFLogo} alt="CoderFarm Logo" className="h-12 object-contain" />
            <p className="text-white/70 leading-relaxed">
              Coderfarm is the first culture-driven hiring platform that helps tech teams find developers who align with their values, work style, and technical needs.
            </p>
          </div>
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start"><MailIcon className="h-5 w-5 mt-0.5 mr-3 text-white/70" /><a href="mailto:dheeraj@coderfarm.in" className="text-white/70 hover:text-white">dheeraj@coderfarm.in</a></li>
              <li className="flex items-start"><PhoneIcon className="h-5 w-5 mt-0.5 mr-3 text-white/70" /><a href="tel:+917694046866" className="text-white/70 hover:text-white">+91-7694046866</a></li>
              <li className="flex items-start"><MapPinIcon className="h-5 w-5 mt-0.5 mr-3 text-white/70" /><span className="text-white/70">Bengaluru, India</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/70 mb-4 md:mb-0">© {new Date().getFullYear()} Coderfarm. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/70 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-white/70 hover:text-white">Terms of Service</a>
            <a href="#" className="text-white/70 hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


