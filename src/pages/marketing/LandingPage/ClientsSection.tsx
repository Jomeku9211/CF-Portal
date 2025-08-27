
import IITR from '@/assets/LandingPage/Auto Slider Images/IITR.png';
import IndoreCity from '@/assets/LandingPage/Auto Slider Images/indorecity.png';
import LyftedEdible from '@/assets/LandingPage/Auto Slider Images/LyftedEdible.png';
import Smartdata from '@/assets/LandingPage/Auto Slider Images/Smartdata.png';
import TEDx from '@/assets/LandingPage/Auto Slider Images/tedx.png';

export function ClientsSection() {
  const clients = [
    { name: 'IIT Roorkee', logo: IITR },
    { name: 'Indore City', logo: IndoreCity },
    { name: 'LyftedEdible', logo: LyftedEdible },
    { name: 'Smartdata', logo: Smartdata },
    { name: 'TEDx', logo: TEDx }
  ];
  return <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-sanjuan-dark font-['Inter']">
            Trusted by innovative companies
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sanjuan-light to-sanjuan-lighter rounded-full mx-auto mt-4"></div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {clients.map((client, index) => <div key={index} className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              <img src={client.logo} alt={`${client.name} logo`} className="h-10 md:h-12 object-contain" />
            </div>)}
        </div>
      </div>
    </section>;
}