import { useState } from 'react';
import { ArrowRightIcon, MicIcon, UserIcon, BriefcaseIcon, CodeIcon, CheckIcon, ThumbsUpIcon } from 'lucide-react';

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

  if (isFormSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Your podcast signup has been submitted successfully. We'll be in touch soon!
          </p>
          <button
            onClick={() => setIsFormSubmitted(false)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-8">
              <MicIcon className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Join Our Podcast
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Share your expertise, insights, and stories with our growing community. 
              Whether you're a founder, developer, or industry expert, we want to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center text-gray-600">
                <UserIcon className="w-5 h-5 mr-2" />
                <span>Founders & CEOs</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BriefcaseIcon className="w-5 h-5 mr-2" />
                <span>Industry Experts</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CodeIcon className="w-5 h-5 mr-2" />
                <span>Developers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Tell Us About Yourself
          </h2>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Profile
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label htmlFor="whatCanIDo" className="block text-sm font-medium text-gray-700 mb-2">
                What can you contribute to our podcast? *
              </label>
              <textarea
                id="whatCanIDo"
                name="whatCanIDo"
                value={formData.whatCanIDo}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your expertise, experience, and what topics you'd like to discuss..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="subscribe"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="subscribe" className="ml-2 text-sm text-gray-700">
                Subscribe to our newsletter for updates and opportunities
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Join Our Podcast?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Share your knowledge, build your personal brand, and connect with our community of professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUpIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Build Your Brand
            </h3>
            <p className="text-gray-600">
              Establish yourself as a thought leader in your industry and reach a wider audience.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Network & Connect
            </h3>
            <p className="text-gray-600">
              Connect with other professionals, founders, and developers in our community.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CodeIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Share Knowledge
            </h3>
            <p className="text-gray-600">
              Help others learn from your experiences and contribute to the community's growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
