import React, { useState } from 'react';
import { User, Briefcase, Building, Globe, Twitter, Linkedin, Save } from 'lucide-react';
export function ProfileSettings({
  user
}) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    role: user.role || '',
    company: user.company || '',
    bio: '',
    website: '',
    twitter: '',
    linkedin: '',
    topics: ''
  });
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert('Profile updated successfully!');
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="bg-sanjuan-lightest rounded-lg p-6 text-center">
            <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-sanjuan-dark font-bold text-3xl mx-auto mb-4">
              {user.avatar}
            </div>
            <h3 className="text-lg font-semibold text-sanjuan-dark font-['Inter']">
              {user.name}
            </h3>
            <p className="text-sanjuan-base">
              {user.role}, {user.company}
            </p>
            <button type="button" className="mt-4 w-full px-4 py-2 border border-sanjuan-light text-sanjuan-dark rounded-lg hover:bg-sanjuan-lightest transition-colors">
              Change Photo
            </button>
          </div>
        </div>
        <div className="md:w-2/3 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-sanjuan-dark mb-4 font-['Inter']">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sanjuan-dark font-medium mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-sanjuan-base" />
                  </div>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sanjuan-dark font-medium mb-1">
                  Email
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="block w-full px-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light bg-gray-50" disabled />
                <p className="text-xs text-sanjuan-base mt-1">
                  Email cannot be changed
                </p>
              </div>
              <div>
                <label htmlFor="role" className="block text-sanjuan-dark font-medium mb-1">
                  Role/Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-sanjuan-base" />
                  </div>
                  <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sanjuan-dark font-medium mb-1">
                  Company
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-sanjuan-base" />
                  </div>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="bio" className="block text-sanjuan-dark font-medium mb-1">
                Professional Bio
              </label>
              <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} className="block w-full px-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="Share a brief professional bio for the podcast introduction"></textarea>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-sanjuan-dark mb-4 font-['Inter']">
              Social & Web Presence
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="website" className="block text-sanjuan-dark font-medium mb-1">
                  Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-sanjuan-base" />
                  </div>
                  <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="https://yourwebsite.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="twitter" className="block text-sanjuan-dark font-medium mb-1">
                    Twitter
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Twitter className="h-5 w-5 text-sanjuan-base" />
                    </div>
                    <input type="text" id="twitter" name="twitter" value={formData.twitter} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="@username" />
                  </div>
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sanjuan-dark font-medium mb-1">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Linkedin className="h-5 w-5 text-sanjuan-base" />
                    </div>
                    <input type="text" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="block w-full pl-10 pr-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="linkedin.com/in/username" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-sanjuan-dark mb-4 font-['Inter']">
              Podcast Preferences
            </h3>
            <div>
              <label htmlFor="topics" className="block text-sanjuan-dark font-medium mb-1">
                Topics of Expertise
              </label>
              <textarea id="topics" name="topics" value={formData.topics} onChange={handleChange} rows={3} className="block w-full px-3 py-2 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" placeholder="Hiring processes, technical interviews, remote team building, etc."></textarea>
              <p className="text-xs text-sanjuan-base mt-1">
                Separate topics with commas
              </p>
            </div>
          </div>
          <div className="pt-4">
            <button type="submit" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <Save className="h-5 w-5 mr-2" />
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </form>;
}