import React from 'react';
import { LogOutIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function SimpleHeader() {
  return <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/Screenshot_from_2025-08-25_20-35-38.png" alt="CoderFarm Logo" className="h-10 object-contain" />
            </Link>
          </div>
          <Link to="/login" className="flex items-center text-sanjuan-dark hover:text-sanjuan-base transition-colors duration-200">
            <LogOutIcon className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </header>;
}