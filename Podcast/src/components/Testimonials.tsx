import React from 'react';
export function Testimonials() {
  const testimonials = [{
    quote: "The insights from this podcast completely transformed our hiring process. We've reduced bad hires by 70%.",
    author: 'Michael Reed',
    position: 'CTO, TechNova',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  }, {
    quote: "As an HR director, I've implemented several strategies from the podcast. Our retention is up by 40%.",
    author: 'Jessica Chen',
    position: 'HR Director, GrowthLabs',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  }];
  return <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            What Listeners Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm relative">
                <div className="absolute -top-4 -left-4">
                  <svg className="h-8 w-8 text-accent" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8v6a6 6 0 01-6 6H8a6 6 0 006-6v-6h-4zm12 0v6a6 6 0 01-6 6h4a6 6 0 006-6v-6h-4z" />
                  </svg>
                </div>
                <p className="italic text-gray-700 mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div>
                    <div className="font-medium text-primary">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="mt-12 flex justify-center">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 max-w-3xl text-center">
              <div className="flex justify-center space-x-4 mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_of_Spotify.svg" alt="Spotify" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Apple_Podcasts_logo.svg" alt="Apple Podcasts" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Google_Podcasts_icon.svg" alt="Google Podcasts" className="h-8" />
              </div>
              <p className="text-gray-700">
                Listen to "Hiring is Broken" on your favorite podcast platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}