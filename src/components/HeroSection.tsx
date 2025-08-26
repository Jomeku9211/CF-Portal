
import { Button } from './Button';
import HeroSVG from '@/assets/LandingPage/Landing_Page_IMG.svg';
import { ArrowRightIcon, CheckCircleIcon } from 'lucide-react';
export function HeroSection() {
  return <section className="w-full bg-gradient-to-br from-sanjuan-lightest via-white to-tango-lightest py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-sanjuan-lighter to-sanjuan-lightest rounded-full opacity-30 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-tango-lighter to-tango-lightest rounded-full opacity-30 blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-sanjuan-lightest text-sanjuan-dark rounded-full mb-4 font-medium text-sm">
                <span className="bg-sanjuan-base text-white h-5 w-5 rounded-full inline-flex items-center justify-center mr-2 text-xs">
                  ✓
                </span>
                Culture-driven tech hiring platform
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-sanjuan-dark leading-tight font-['Inter'] tracking-tight">
                Hire developers who{' '}
                <span className="text-sanjuan-base relative">
                  fit your team
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-tango-base opacity-60 rounded"></div>
                </span>
                , not just the job.
              </h1>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <p className="text-xl text-sanjuan-dark font-medium font-['IBM_Plex_Sans'] mb-4">
                  Coderfarm is the first culture-driven hiring platform for tech
                  teams.
                </p>
                <p className="text-lg text-sanjuan-base font-['IBM_Plex_Sans'] mb-4">
                  We help founders and HRs match with developers who align by
                  skills, culture, work style, and time zone—so every hire
                  clicks from day one.
                </p>
                <div className="space-y-2 mt-4">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-tango-base mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sanjuan-base font-['IBM_Plex_Sans']">
                      <span className="font-semibold">
                        89% of hiring failures
                      </span>{' '}
                      happen because of culture misfit, not skills
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-tango-base mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sanjuan-base font-['IBM_Plex_Sans']">
                      <span className="font-semibold">3x higher retention</span>{' '}
                      with culture-aligned hires
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="primary" size="large" className="bg-gradient-to-r from-sanjuan-base to-sanjuan-dark text-white shadow-md hover:shadow-lg transition-all duration-300">
                Book a Free Hiring Consultation
              </Button>
              <Button variant="secondary" size="large" className="bg-white text-sanjuan-dark border-2 border-sanjuan-lighter hover:border-sanjuan-light shadow-sm hover:shadow-md transition-all duration-300">
                <span>Learn How It Works</span>
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-gradient-to-br from-white to-sanjuan-lightest rounded-2xl h-[460px] w-[460px] max-w-full mx-auto relative overflow-hidden shadow-lg border-4 border-white">
                <img src={HeroSVG} alt="Developer" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[85%] object-contain" />
                {/* Stats cards */}
                <div className="absolute top-[5%] left-[5%] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-sanjuan-lightest">
                  <div className="text-xs text-sanjuan-base font-medium">
                    Match Rate
                  </div>
                  <div className="text-xl font-bold text-sanjuan-dark">98%</div>
                </div>
                <div className="absolute top-[15%] right-[10%] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-sanjuan-lightest">
                  <div className="text-xs text-sanjuan-base font-medium">
                    Retention
                  </div>
                  <div className="text-xl font-bold text-sanjuan-dark">95%</div>
                </div>
                <div className="absolute bottom-[30%] right-[8%] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-sanjuan-lightest">
                  <div className="text-xs text-sanjuan-base font-medium">
                    Time Saved
                  </div>
                  <div className="text-xl font-bold text-sanjuan-dark">70%</div>
                </div>
                <div className="absolute bottom-[15%] left-[10%] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-sanjuan-lightest">
                  <div className="text-xs text-sanjuan-base font-medium">
                    Culture Fit
                  </div>
                  <div className="text-xl font-bold text-sanjuan-dark">97%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}