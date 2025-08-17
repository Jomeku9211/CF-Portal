import { ArrowRightIcon } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Hire developers who fit your team, not just the job.
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-700 mb-6">
              Coderfarm is the first culture-driven hiring platform for tech
              teams.
              <br />
              <br />
              We help founders and HRs match with developers who align by
              skills, culture, work style, and time zone—so every hire clicks
              from day one.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              End costly mis-hires. Build high-performing teams that last.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href="#book" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition">
                Book a Free Hiring Experiment
              </a>
              <a href="#learn" className="flex items-center text-blue-700 hover:text-blue-800 font-medium transition">
                Learn How It Works
                <ArrowRightIcon size={18} className="ml-1" />
              </a>
            </div>
          </div>
          {/* Right Content - New Design */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full max-w-md mx-auto">
              {/* Circular Background with Gradient - Exact dimensions from Figma */}
              <div className="w-[401px] h-[401px] rounded-full bg-gradient-radial from-blue-200 to-gray-100 relative mx-auto">
                {/* Main Image - profile.png with exact positioning from Figma */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/src/assets/LandingPage/profile.png" 
                    alt="Profile image" 
                    className="w-[359px] h-[441px] object-cover rounded-lg"
                  />
                </div>
                
                {/* Floating Badge 2 - Top Left - Exact position from Figma */}
                <div className="absolute -top-3 -left-3 w-[67px] h-[67px] bg-blue-900 text-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold">२</span>
                </div>
                
                {/* Floating Badge 3 - Top Right - Exact position from Figma */}
                <div className="absolute top-8 -right-3 w-[62px] h-[62px] bg-blue-900 text-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold">३</span>
                </div>
                
                {/* Floating Badge 4 - Middle Right - Exact position from Figma */}
                <div className="absolute top-32 -right-2 w-[38px] h-[38px] bg-orange-400 text-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold">४</span>
                </div>
                
                {/* Floating Badge 8 - Bottom Left - Exact position from Figma */}
                <div className="absolute bottom-8 -left-2 w-[50px] h-[50px] bg-orange-400 text-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold">८</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
