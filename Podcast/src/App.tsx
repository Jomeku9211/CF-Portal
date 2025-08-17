import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutPodcast } from './components/AboutPodcast';
import { FeaturedEpisodes } from './components/FeaturedEpisodes';
import { ForFounders } from './components/ForFounders';
import { ForHR } from './components/ForHR';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { ThankYou } from './components/ThankYou';
import { Footer } from './components/Footer';
export function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmit = () => {
    setFormSubmitted(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-16">
        {!formSubmitted ? <>
            <Hero />
            <AboutPodcast />
            <FeaturedEpisodes />
            <div className="bg-gray-50 py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                  <ForFounders />
                  <ForHR />
                </div>
              </div>
            </div>
            <Testimonials />
            <ContactForm onSubmit={handleFormSubmit} />
          </> : <ThankYou />}
      </main>
      <Footer />
    </div>;
}