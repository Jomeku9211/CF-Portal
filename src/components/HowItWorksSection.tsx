
import { Card } from './Card';
import Step1 from '@/assets/LandingPage/HowITworks/HowItWorkImg1.png';
import Step2 from '@/assets/LandingPage/HowITworks/HowItWorkImg2.png';
import Step3 from '@/assets/LandingPage/HowITworks/HowItWorkImg3.png';
export function HowItWorksSection() {
  const steps = [
    { id: 'define', title: 'Define Your Fit', description: "Create job roles & share your company's values, project needs, and work style—let us understand your DNA.", image: Step1 },
    { id: 'meet', title: 'Meet Your Matches', description: 'Review a shortlist of top-fit developers, with honest reputation scores/Match Rate and project feedback.', image: Step2 },
    { id: 'build', title: 'Build & Grow', description: 'Make confident hires backed by transparent data—enjoy lower fees as your reputation rises.', image: Step3 }
  ];
  return <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-darkest mb-2 font-['Inter']">
            How It Works
          </h2>
          <p className="text-lg text-neutral-dark font-['IBM_Plex_Sans']">
            How we match you with Top Talent
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(step => <div key={step.id} className="flex flex-col">
              <Card variant="default" hover>
                <div className="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
                  <img src={step.image} alt={step.title} className="w-full h-48 object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-darkest mb-3 font-['Inter']">
                    {step.title}
                  </h3>
                  <p className="text-neutral-dark font-['IBM_Plex_Sans']">
                    {step.description}
                  </p>
                </div>
              </Card>
            </div>)}
        </div>
      </div>
    </section>;
}