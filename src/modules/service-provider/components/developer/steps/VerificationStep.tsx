import React from 'react';
import { SectionTitle, TextInput, FileUpload } from '../FormComponents';

export function VerificationStep() {
  return (
    <div>
      <SectionTitle 
        title="Verification & Profiles" 
        description="Help us verify your identity and connect your professional profiles." 
      />
      
      <FileUpload 
        label="Government ID (Passport, Driver's License, or National ID)" 
        name="governmentId" 
        accept=".pdf,.jpg,.jpeg,.png" 
        required 
      />
      
      <FileUpload 
        label="Resume/CV" 
        name="resume" 
        accept=".pdf,.doc,.docx" 
        required 
      />
      
      <TextInput 
        label="LinkedIn Profile URL" 
        name="linkedinProfile" 
        placeholder="https://linkedin.com/in/yourprofile" 
        required 
      />
      
      <TextInput 
        label="GitHub Profile URL" 
        name="githubProfile" 
        placeholder="https://github.com/yourusername" 
        required 
      />
      
      <TextInput 
        label="Portfolio Website (if any)" 
        name="portfolioWebsite" 
        placeholder="https://yourportfolio.com" 
      />
    </div>
  );
}
