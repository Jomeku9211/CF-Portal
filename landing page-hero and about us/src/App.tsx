import React from 'react';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSectionFounders } from './components/ProblemSectionFounders';
import { ProblemSectionHR } from './components/ProblemSectionHR';
import { AboutUsSection } from './components/AboutUsSection';
export function App() {
  return <div className="flex flex-col w-full min-h-screen">
      <TopBanner />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSectionFounders />
        <ProblemSectionHR />
        <AboutUsSection />
      </main>
    </div>;
}