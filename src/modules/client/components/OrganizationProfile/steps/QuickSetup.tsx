import React, { useState } from 'react';

interface QuickSetupProps {
  formData: any;
  updateFormData: (data: any) => void;
  companySizes: string[];
  fundingStatuses: string[];
  industries: string[];
  companyFunctions: string[];
  revenueStatuses: string[];
}

export default function QuickSetup({
  formData,
  updateFormData,
  companySizes,
  fundingStatuses,
  industries,
  companyFunctions,
  revenueStatuses
}: QuickSetupProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Organization name is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear errors if validation passes
    setErrors({});
  };

  return (
    <div className="bg-white rounded-xl p-8">
      <h3 className="text-xl font-semibold text-sanjuan-dark mb-6 font-['Inter']">
        Quick Setup
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Organization Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base ${
                errors.name ? 'border-red-500' : 'border-sanjuan-lighter'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Website
            </label>
            <input
              id="website"
              type="text"
              value={formData.website}
              onChange={(e) => updateFormData({ website: e.target.value })}
              className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Company Size
            </label>
            <select
              id="size"
              value={formData.size}
              onChange={(e) => updateFormData({ size: e.target.value })}
              className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
            >
              <option value="">Select company size</option>
              {companySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="fundingStatus" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Funding Status
            </label>
            <select
              id="fundingStatus"
              value={formData.fundingStatus}
              onChange={(e) => updateFormData({ fundingStatus: e.target.value })}
              className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
            >
              <option value="">Select funding status</option>
              {fundingStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Industry
            </label>
            <select
              id="industry"
              value={formData.industry}
              onChange={(e) => updateFormData({ industry: e.target.value })}
              className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
            >
              <option value="">Select industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="companyFunction" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Company Function
            </label>
            <select
              id="companyFunction"
              value={formData.companyFunction}
              onChange={(e) => updateFormData({ companyFunction: e.target.value })}
              className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
            >
              <option value="">Select company function</option>
              {companyFunctions.map((func) => (
                <option key={func} value={func}>
                  {func}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="revenueStatus" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Revenue Status
            </label>
            <select
              id="revenueStatus"
              value={formData.revenueStatus}
              onChange={(e) => updateFormData({ revenueStatus: e.target.value })}
              className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
            >
              <option value="">Select revenue status</option>
              {revenueStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="keyInvestors" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Key Investors
            </label>
            <input
              id="keyInvestors"
              type="text"
              value={formData.keyInvestors?.join(', ') || ''}
              onChange={(e) => updateFormData({ 
                keyInvestors: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
              })}
              placeholder="Separate multiple investors with commas"
              className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
