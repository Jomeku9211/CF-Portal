import React, { useState } from 'react';
interface QuickSetupProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
}
export function QuickSetup({
  formData,
  updateFormData,
  onNext
}: QuickSetupProps) {
  const [errors, setErrors] = useState({});
  const companySizes = ['1–10 employees', '11–50 employees', '51–200 employees', '201–500 employees', '501–1,000 employees', '1,001–5,000 employees', '5,001–10,000 employees', '10,000+ employees'];
  const fundingStatuses = ['Bootstrapped', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'Private Equity', 'Public'];
  const industries = ['Technology', 'Healthcare', 'Finance / Fintech', 'Education', 'E-commerce', 'Media & Entertainment', 'Manufacturing', 'Consumer Goods', 'Energy', 'Non-Profit / Social Impact', 'Other'];
  const companyFunctions = ['Idea Stage', 'Product Development', 'Go-to-Market', 'Growth & Scaling', 'Mature Business'];
  const revenueStatuses = ['Pre-Revenue', 'Generating Revenue', 'Profitable', 'Not Disclosed'];
  const handleSubmit = e => {
    e.preventDefault();
    // Validate required fields
    const newErrors = {};
    if (!formData.organizationName) newErrors.organizationName = 'Organization name is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onNext();
  };
  return <div className="bg-white rounded-xl p-8">
      <h3 className="text-xl font-semibold text-sanjuan-dark mb-6 font-['Inter']">
        Quick Setup
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Organization Name *
            </label>
            <input id="organizationName" type="text" value={formData.organizationName} onChange={e => updateFormData({
            organizationName: e.target.value
          })} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base ${errors.organizationName ? 'border-red-500' : 'border-sanjuan-lighter'}`} />
            {errors.organizationName && <p className="mt-1 text-sm text-red-500">
                {errors.organizationName}
              </p>}
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Website
            </label>
            <input id="website" type="text" value={formData.website} onChange={e => updateFormData({
            website: e.target.value
          })} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="companySize" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Company Size
            </label>
            <select id="companySize" value={formData.companySize} onChange={e => updateFormData({
            companySize: e.target.value
          })} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base">
              <option value="">Select company size</option>
              {companySizes.map(size => <option key={size} value={size}>
                  {size}
                </option>)}
            </select>
          </div>
          <div>
            <label htmlFor="fundingStatus" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Funding Status
            </label>
            <select id="fundingStatus" value={formData.fundingStatus} onChange={e => updateFormData({
            fundingStatus: e.target.value
          })} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base">
              <option value="">Select funding status</option>
              {fundingStatuses.map(status => <option key={status} value={status}>
                  {status}
                </option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Industry
            </label>
            <select id="industry" value={formData.industry} onChange={e => updateFormData({
            industry: e.target.value
          })} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base">
              <option value="">Select industry</option>
              {industries.map(industry => <option key={industry} value={industry}>
                  {industry}
                </option>)}
            </select>
          </div>
          <div>
            <label htmlFor="companyFunction" className="block text-sm font-medium text-sanjuan-dark mb-1">
              Company Function
            </label>
            <select id="companyFunction" value={formData.companyFunction} onChange={e => updateFormData({
            companyFunction: e.target.value
          })} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base">
              <option value="">Select company function</option>
              {companyFunctions.map(func => <option key={func} value={func}>
                  {func}
                </option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="revenueStatus" className="block text-sm font-medium text-sanjuan-dark mb-1">
            Revenue Status
          </label>
          <select id="revenueStatus" value={formData.revenueStatus} onChange={e => updateFormData({
          revenueStatus: e.target.value
        })} className="w-full px-4 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-base focus:border-sanjuan-base">
            <option value="">Select revenue status</option>
            {revenueStatuses.map(status => <option key={status} value={status}>
                {status}
              </option>)}
          </select>
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white shadow-md hover:shadow-lg transition-all">
            Next
          </button>
        </div>
      </form>
    </div>;
}