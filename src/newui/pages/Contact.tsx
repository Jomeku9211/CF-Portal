import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, SendIcon } from 'lucide-react';
export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };
  return <div className="min-h-screen bg-white font-['IBM_Plex_Sans']">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-sanjuan-lightest to-sanjuan-lighter py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-sanjuan-dark mb-4 font-['Inter']">
              Contact Us
            </h1>
            <p className="text-xl text-sanjuan-base max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help. Reach out
              to our team and we'll get back to you as soon as possible.
            </p>
          </div>
        </section>
        {/* Contact Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sanjuan-dark font-medium mb-2">
                      Your Name
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="block w-full px-4 py-3 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sanjuan-dark font-medium mb-2">
                        Email Address
                      </label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="block w-full px-4 py-3 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sanjuan-dark font-medium mb-2">
                        Phone Number (Optional)
                      </label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="block w-full px-4 py-3 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sanjuan-dark font-medium mb-2">
                      Subject
                    </label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="block w-full px-4 py-3 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sanjuan-dark font-medium mb-2">
                      Your Message
                    </label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="block w-full px-4 py-3 border border-sanjuan-lighter rounded-lg focus:ring-2 focus:ring-sanjuan-light focus:border-sanjuan-light" required></textarea>
                  </div>
                  <div>
                    <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-sanjuan-base to-sanjuan-dark hover:from-sanjuan-dark hover:to-sanjuan-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sanjuan-base">
                      <SendIcon className="h-5 w-5 mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-sanjuan-dark mb-6 font-['Inter']">
                  Contact Information
                </h2>
                <div className="bg-sanjuan-lightest rounded-xl p-6 mb-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                          <PhoneIcon className="h-5 w-5 text-sanjuan-base" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-sanjuan-dark">
                          Phone
                        </h3>
                        <p className="mt-1 text-sanjuan-base">
                          <a href="tel:+917694046866" className="hover:text-sanjuan-dark">
                            +91-7694046866
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                          <MailIcon className="h-5 w-5 text-sanjuan-base" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-sanjuan-dark">
                          Email
                        </h3>
                        <p className="mt-1 text-sanjuan-base">
                          <a href="mailto:dheeraj@coderfarm.in" className="hover:text-sanjuan-dark">
                            dheeraj@coderfarm.in
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                          <MapPinIcon className="h-5 w-5 text-sanjuan-base" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-sanjuan-dark">
                          Location
                        </h3>
                        <p className="mt-1 text-sanjuan-base">
                          Bangalore, India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                          <ClockIcon className="h-5 w-5 text-sanjuan-base" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-sanjuan-dark">
                          Working Hours
                        </h3>
                        <p className="mt-1 text-sanjuan-base">
                          Monday - Friday: 9:00 AM - 6:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-medium text-sanjuan-dark mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <a href="#" className="h-10 w-10 rounded-full bg-sanjuan-lightest flex items-center justify-center hover:bg-sanjuan-lighter transition-colors">
                      <svg className="h-5 w-5 text-sanjuan-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-sanjuan-lightest flex items-center justify-center hover:bg-sanjuan-lighter transition-colors">
                      <svg className="h-5 w-5 text-sanjuan-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-sanjuan-lightest flex items-center justify-center hover:bg-sanjuan-lighter transition-colors">
                      <svg className="h-5 w-5 text-sanjuan-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-sanjuan-lightest flex items-center justify-center hover:bg-sanjuan-lighter transition-colors">
                      <svg className="h-5 w-5 text-sanjuan-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
}