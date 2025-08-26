import React from 'react';
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
export function Footer() {
  return <footer className="w-full bg-gradient-to-br from-sanjuan-darker to-sanjuan-darkest text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-6">
            <img src="/Screenshot_from_2025-08-25_20-35-38.png" alt="CoderFarm Logo" className="h-12 object-contain" />
            <p className="text-sanjuan-lighter mb-6 font-['IBM_Plex_Sans'] leading-relaxed">
              Coderfarm is the first culture-driven hiring platform that helps
              tech teams find developers who align with their values, work
              style, and technical needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200 bg-white/10 p-2.5 rounded-full">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200 bg-white/10 p-2.5 rounded-full">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200 bg-white/10 p-2.5 rounded-full">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200 bg-white/10 p-2.5 rounded-full">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-semibold text-lg mb-4 font-['Inter'] text-white">
              Company
            </h3>
            <ul className="space-y-3 font-['IBM_Plex_Sans']">
              <li>
                <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-semibold text-lg mb-4 font-['Inter'] text-white">
              Resources
            </h3>
            <ul className="space-y-3 font-['IBM_Plex_Sans']">
              <li>
                <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-semibold text-lg mb-4 font-['Inter'] text-white">
              Contact Us
            </h3>
            <ul className="space-y-4 font-['IBM_Plex_Sans']">
              <li className="flex items-start">
                <MailIcon className="h-5 w-5 mt-0.5 mr-3 text-sanjuan-lighter" />
                <a href="mailto:dheeraj@coderfarm.in" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
                  dheeraj@coderfarm.in
                </a>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="h-5 w-5 mt-0.5 mr-3 text-sanjuan-lighter" />
                <a href="tel:+917694046866" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
                  +91-7694046866
                </a>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mt-0.5 mr-3 text-sanjuan-lighter" />
                <span className="text-sanjuan-lighter">Bengaluru, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-sanjuan-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-sanjuan-lighter mb-4 md:mb-0 font-['IBM_Plex_Sans']">
            © {new Date().getFullYear()} Coderfarm. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm font-['IBM_Plex_Sans']">
            <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-sanjuan-lighter hover:text-white transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
}