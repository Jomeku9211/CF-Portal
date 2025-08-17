import React from 'react';
import { CalendarIcon, PhoneIcon, MailIcon, ArrowRightIcon } from 'lucide-react';

export function TopBanner() {
  return (
    <div className="w-full bg-orange-500 text-white py-2 px-4" style={{ borderTop: '2px solid #1e40af' }}>
      <div className="container mx-auto flex flex-wrap justify-center items-center text-sm">
        <div className="flex items-center">
          <CalendarIcon size={16} className="mr-1" />
          <a 
            href="https://calendar.app.google/Khz4a4f1QHzXL91W7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline flex items-center"
          >
            Book a free hiring consultation
            <ArrowRightIcon size={16} className="ml-1" />
          </a>
        </div>
        <div className="flex items-center mx-3">
          <span>|</span>
        </div>
        <div className="flex items-center mx-3">
          <PhoneIcon size={16} className="mr-1" />
          <span>Call/WhatsApp: +91 99260-61666</span>
        </div>
        <div className="flex items-center mx-3">
          <span>|</span>
        </div>
        <div className="flex items-center mx-3">
          <MailIcon size={16} className="mr-1" />
          <span>Email: dheeraj@coderfarm.in</span>
        </div>
      </div>
    </div>
  );
}