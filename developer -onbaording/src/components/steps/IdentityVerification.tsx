import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
interface IdentityVerificationProps {
  formData: any;
  updateFormData: (data: any) => void;
}
export function IdentityVerification({
  formData,
  updateFormData
}: IdentityVerificationProps) {
  const [localData, setLocalData] = useState({
    idVerification: formData.idVerification,
    profileLinks: {
      linkedin: formData.profileLinks?.linkedin || '',
      github: formData.profileLinks?.github || '',
      portfolio: formData.profileLinks?.portfolio || ''
    }
  });
  const handleLinkChange = e => {
    const {
      name,
      value
    } = e.target;
    const updatedLinks = {
      ...localData.profileLinks,
      [name]: value
    };
    setLocalData(prev => ({
      ...prev,
      profileLinks: updatedLinks
    }));
    updateFormData({
      profileLinks: updatedLinks
    });
  };
  return <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Identity & Verification
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Verify your identity and link your professional profiles
        </p>
      </div>
      <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
        <h3 className="font-medium text-gray-900 mb-2">ID Verification</h3>
        <p className="text-sm text-gray-500 mb-4">
          Upload a government-issued ID and take a selfie for verification
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-white">
            <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">Upload ID</span>
            <input type="file" className="hidden" />
            <Button variant="secondary" size="small" className="mt-2">
              Select File
            </Button>
          </div>
          <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-white">
            <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">Take Selfie</span>
            <Button variant="secondary" size="small" className="mt-2">
              Capture
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-4">
          Professional Profiles
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Connect your professional profiles to increase your credibility
        </p>
        <div className="space-y-4">
          <Input label="LinkedIn Profile" name="linkedin" value={localData.profileLinks.linkedin} onChange={handleLinkChange} placeholder="https://linkedin.com/in/yourprofile" startAdornment={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
              </svg>} />
          <Input label="GitHub Profile" name="github" value={localData.profileLinks.github} onChange={handleLinkChange} placeholder="https://github.com/yourusername" startAdornment={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
              </svg>} />
          <Input label="Portfolio Website" name="portfolio" value={localData.profileLinks.portfolio} onChange={handleLinkChange} placeholder="https://yourportfolio.com" startAdornment={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
              </svg>} />
        </div>
      </div>
    </div>;
}