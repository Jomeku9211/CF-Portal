import React from 'react';
import { CalendarIcon, PhoneIcon, MailIcon, ArrowRightIcon } from 'lucide-react';

export function TopBanner() {
  return (
    <div className="w-full bg-orange-500 text-white py-2 px-4">
      <div className="container mx-auto flex flex-wrap justify-center items-center text-sm">
        <div className="flex items-center">
          <CalendarIcon size={16} className="mr-1" />
          <span>Book a free hiring consultation</span>
          <ArrowRightIcon size={16} className="mx-1" />
        </div>
        <div className="flex items-center mx-3">
          <PhoneIcon size={16} className="mr-1" />
          <span>Call/WhatsApp: +91-7694046986</span>
        </div>
        <div className="flex items-center">
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
