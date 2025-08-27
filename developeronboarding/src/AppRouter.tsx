import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { AboutPage } from './pages/About';
import { PodcastPage } from './pages/Podcast';
import { ContactPage } from './pages/Contact';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { EmailConfirmationPage } from './pages/EmailConfirmation';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { NotFoundPage } from './pages/NotFound';
import { MemberDashboardPage } from './pages/MemberDashboard';
import { DeveloperOnboardingPage } from './pages/DeveloperOnboarding';
export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/podcast" element={<PodcastPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/email-confirmation" element={<EmailConfirmationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<MemberDashboardPage />} />
        <Route path="/developer-onboarding" element={<DeveloperOnboardingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>;
}