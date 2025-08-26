import React, { useState } from 'react';
import { ArrowRightIcon, MicIcon, UserIcon, BriefcaseIcon, CodeIcon, CheckIcon, ThumbsUpIcon } from 'lucide-react';
// Removed TopBanner and Navbar here; they are rendered globally in App.tsx

export function ContentHub() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    whatCanIDo: '',
    subscribe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.whatCanIDo) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    
    console.log('🚀 Starting form submission...');
    console.log('📝 Form data:', formData);
    
    try {
      const payload = {
        records: [{
          fields: {
            'Name': formData.firstName,
            'Last Name': formData.lastName,
            'Email': formData.email,
            'Phone': formData.phone || '',
            'Linkedin Url': formData.linkedin || '',
            'What can I do for you in return?': formData.whatCanIDo,
            'Subscribe to updates': formData.subscribe
          }
        }]
      };
      
      console.log('📤 Sending payload to Airtable:', payload);
      
      const response = await fetch('https://api.airtable.com/v0/apphFz0ba6KTb85DE/tblFrz1vPGsvZ0yzt', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer patFClficxpGIUnJF.be5a51a7e3fabe7337cd2cb13dc3f10234fc52d8a1f60e012eb68be7b2fcc982',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);
      
      if (response.ok) {
        console.log('✅ Form submitted successfully to Airtable!');
        setIsFormSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        const errorData = await response.json();
        console.error('❌ Airtable API error:', errorData);
        console.error('❌ Response status:', response.status);
        console.error('❌ Response status text:', response.statusText);
        
        // Log the exact error details from Airtable
        if (errorData.error) {
          console.error('❌ Airtable error details:', {
            type: errorData.error.type,
            message: errorData.error.message,
            details: errorData.error.details
          });
        }
        
        throw new Error(`Failed to submit form: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('💥 Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white font-sans">
      {/* Header is rendered globally in App.tsx */}
      
      {!isFormSubmitted ? (
        <>
          {/* Hero Section */}
          <section className="bg-[#f5f8ff] py-16 px-6 md:py-24">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold text-[#1e335f] mb-6">
                👉 Hiring is Broken: Be Our Guest. Let's Fix It. (No B.S.
                Allowed.)
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl">
                Are you a founder, HR leader, tech lead, or developer tired of
                the guesswork and frustration in tech hiring? Join our weekly
                podcast, Hiring is Broken, where raw conversations replace
                buzzwords, and together we rethink how teams are built.
              </p>
              <a href="#guest-form" className="inline-flex items-center bg-[#1e335f] text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-[#162548] transition-colors">
                ➡️ Apply to Be a Guest
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
            </div>
          </section>

          {/* About the Podcast */}
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1e335f] mb-6">
                About the Podcast
              </h2>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-lg text-gray-700 mb-4">
                  <span className="font-bold text-[#ff7043]">
                    Hiring is Broken
                  </span>{' '}
                  is hosted by Coderfarm, focusing on raw, unfiltered
                  conversations about hiring, leadership, recruitment, and team
                  building.
                </p>
                <p className="text-lg text-gray-700">
                  We dive deep into the challenges and solutions in tech hiring,
                  bringing you insights from industry leaders who are
                  revolutionizing how teams are built.
                </p>
              </div>
            </div>
          </section>

          {/* What to Expect as a Guest */}
          <section className="bg-[#f5f8ff] py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1e335f] mb-10">
                What to Expect as a Guest
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl mb-3">🎙️</div>
                  <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                    Introduction
                  </h3>
                  <p className="text-gray-600">
                    Share your background and journey in the tech industry.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl mb-3">🙋</div>
                  <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                    Beyond the Resume
                  </h3>
                  <p className="text-gray-600">
                    Discuss experiences that shaped your hiring philosophy.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl mb-3">💡</div>
                  <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                    The Core: Hiring, Teams & Leadership
                  </h3>
                  <p className="text-gray-600">
                    Deep dive into your approach to building effective teams.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                    Rapid Fire
                  </h3>
                  <p className="text-gray-600">
                    Quick questions to reveal your authentic perspectives.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl mb-3">🎭</div>
                  <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                    Role Play
                  </h3>
                  <p className="text-gray-600">
                    Simulate real hiring scenarios and challenges.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl mb-3">😂</div>
                  <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                    React & Debate
                  </h3>
                  <p className="text-gray-600">
                    Engage with controversial hiring topics and practices.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Who Should Apply */}
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1e335f] mb-10">
                Who Should Apply?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#f5f8ff] p-6 rounded-lg border-l-4 border-[#ff7043]">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#ff7043] text-white p-3 rounded-full mr-4">
                      <BriefcaseIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1e335f]">
                      🚀 Startup Founders
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Share your hiring challenges and how you're building teams
                    that drive innovation.
                  </p>
                </div>
                <div className="bg-[#f5f8ff] p-6 rounded-lg border-l-4 border-[#ff7043]">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#ff7043] text-white p-3 rounded-full mr-4">
                      <UserIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1e335f]">
                      👩‍💼 HR Leaders
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Discuss your strategies for identifying talent beyond
                    traditional metrics.
                  </p>
                </div>
                <div className="bg-[#f5f8ff] p-6 rounded-lg border-l-4 border-[#ff7043]">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#ff7043] text-white p-3 rounded-full mr-4">
                      <CodeIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1e335f]">
                      🧑‍💻 Tech Leads/CTOs
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Reveal your approach to building high-performing technical
                    teams.
                  </p>
                </div>
                <div className="bg-[#f5f8ff] p-6 rounded-lg border-l-4 border-[#ff7043]">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#ff7043] text-white p-3 rounded-full mr-4">
                      <ThumbsUpIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1e335f]">
                      👨‍🎤 Developers
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Share your perspective on what makes for meaningful
                    interviews and assessments.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Join */}
          <section className="bg-[#f5f8ff] py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1e335f] mb-10">
                Why Join?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#ff7043] text-white p-2 rounded-full mr-4 mt-1">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                      Share your story and insights
                    </h3>
                    <p className="text-gray-600">
                      Contribute to meaningful conversations that can reshape
                      how the industry approaches hiring.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#ff7043] text-white p-2 rounded-full mr-4 mt-1">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                      Build your personal brand in the IT/startup space
                    </h3>
                    <p className="text-gray-600">
                      Gain visibility as a thought leader and connect with
                      like-minded professionals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#ff7043] text-white p-2 rounded-full mr-4 mt-1">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                      Be part of the movement to fix hiring
                    </h3>
                    <p className="text-gray-600">
                      Help create a future where hiring is more human,
                      effective, and equitable for everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Past Episodes */}
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1e335f] mb-10">
                Featured Past Episodes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 bg-[#1e335f] flex items-center justify-center">
                    <MicIcon className="h-16 w-16 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                      Why Traditional Interviews Fail
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Sarah Chen, CTO of TechFlow, discusses why standard
                      interviews often miss the best candidates.
                    </p>
                    <a href="#" className="text-[#ff7043] font-medium hover:underline">
                      Listen to episode →
                    </a>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 bg-[#1e335f] flex items-center justify-center">
                    <MicIcon className="h-16 w-16 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                      Building Teams That Last
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Mark Johnson, Founder of DevTeams, reveals his framework
                      for building resilient engineering teams.
                    </p>
                    <a href="#" className="text-[#ff7043] font-medium hover:underline">
                      Listen to episode →
                    </a>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 bg-[#1e335f] flex items-center justify-center">
                    <MicIcon className="h-16 w-16 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1e335f] mb-2">
                      The Future of Technical Assessment
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Dr. Lisa Wong explores innovative approaches to evaluating
                      technical skills beyond coding tests.
                    </p>
                    <a href="#" className="text-[#ff7043] font-medium hover:underline">
                      Listen to episode →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Guest Sign-Up Form */}
          <section id="guest-form" className="bg-[#f5f8ff] py-16 px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1e335f] mb-10">
                Ready to Share Your Story?
              </h2>
              <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-lg shadow-md">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-lg font-medium text-[#1e335f] mb-2">
                        First Name *
                      </label>
                      <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7043]" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-lg font-medium text-[#1e335f] mb-2">
                        Last Name *
                      </label>
                      <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff7043]" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-[#1e335f] mb-2">
                      Email *
                    </label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7043]" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-lg font-medium text-[#1e335f] mb-2">
                      Phone No. (optional)
                    </label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7043]" />
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-lg font-medium text-[#1e335f] mb-2">
                      LinkedIn URL (optional)
                    </label>
                    <input type="url" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7043]" />
                  </div>
                  <div>
                    <label htmlFor="whatCanIDo" className="block text-lg font-medium text-[#1e335f] mb-2">
                      What can I (Dheeraj / Coderfarm) do for you in return? *
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      Dheeraj - I really appreciate your time. If there's anything I can do to support you — like sharing your work, helping you find talent, or just spreading the word — let me know here. Happy to return the favour!
                    </p>
                    <textarea 
                      id="whatCanIDo" 
                      name="whatCanIDo" 
                      required 
                      value={formData.whatCanIDo} 
                      onChange={handleInputChange} 
                      rows={4} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff7043] resize-none" 
                      placeholder="Let me know how I can help you..."
                    />
                  </div>
                  <div className="pt-4">
                    <div className="flex items-center mb-4">
                      <input id="subscribe" type="checkbox" name="subscribe" checked={formData.subscribe} onChange={handleInputChange} className="h-5 w-5 text-[#ff7043] focus:ring-[#ff7043] border-gray-300 rounded" />
                      <label htmlFor="subscribe" className="ml-3 text-gray-700">
                        Subscribe to podcast updates & newsletter
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                      By submitting, you agree to our Terms & Conditions
                    </p>
                    <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center bg-[#1e335f] text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-[#162548] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Submitting...' : '➡️ Apply to Be a Guest'}
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </form>


            </div>
          </section>
        </>
      ) : (
        // Thank You State
        <section className="bg-[#f5f8ff] min-h-screen flex items-center justify-center px-6 py-16">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1e335f] mb-6">
              🎉 Thank you for reaching out!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              We've received your details. Our team will connect with you within
              24 hours.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              In the meantime, check your inbox for a confirmation email.
            </p>
            <div className="flex items-center mb-8">
              <input id="subscribe-thanks" type="checkbox" checked={formData.subscribe} onChange={() => setFormData(prev => ({ ...prev, subscribe: !prev.subscribe }))} className="h-5 w-5 text-[#ff7043] focus:ring-[#ff7043] border-gray-300 rounded" />
              <label htmlFor="subscribe-thanks" className="ml-3 text-gray-700">
                Subscribe to podcast updates & newsletter
              </label>
            </div>
            <div className="space-y-4">
              <a href="#" className="block w-full text-center bg-[#1e335f] text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-[#162548] transition-colors">
                👉 Listen to Episodes
              </a>
              <button onClick={() => setIsFormSubmitted(false)} className="block w-full text-center bg-white text-[#1e335f] border border-[#1e335f] px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-50 transition-colors">
                👉 Return to Home Page
              </button>
              <a href="#" className="block w-full text-center bg-white text-[#1e335f] border border-[#1e335f] px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-50 transition-colors">
                👉 Learn More about Coderfarm
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

