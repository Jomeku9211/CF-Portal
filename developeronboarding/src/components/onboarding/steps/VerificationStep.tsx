import React, { Component } from 'react';
import { SectionTitle, FileUpload, TextInput } from '../FormComponents';
export function VerificationStep() {
  return <div>
      <SectionTitle title="Verification" description="Please provide documentation to verify your identity and professional experience." />
      <FileUpload label="Upload Government ID" name="governmentId" accept="image/*, application/pdf" required />
      <FileUpload label="Upload Resume / Portfolio" name="resume" accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
      <TextInput label="LinkedIn Profile" name="linkedinProfile" placeholder="https://linkedin.com/in/yourprofile" required />
      <TextInput label="GitHub / GitLab Profile" name="githubProfile" placeholder="https://github.com/yourusername" required />
      <TextInput label="Portfolio Website (Optional)" name="portfolioWebsite" placeholder="https://yourportfolio.com" />
    </div>;
}