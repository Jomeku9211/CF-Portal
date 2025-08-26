import React from 'react';
export function ClientsSection() {
  const clients = [{
    name: 'TED',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TED_logo.svg/1200px-TED_logo.svg.png'
  }, {
    name: 'Canva',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Canva_Logo.png/1200px-Canva_Logo.png'
  }, {
    name: 'SmartData',
    logo: 'https://media.licdn.com/dms/image/C4D0BAQGKNZOh7v_FYA/company-logo_200_200/0/1630530352270?e=2147483647&v=beta&t=l2Jk8Jd_Drc2mJ3nHnkUQDwrXlG1QcQ5oZAqhWQ-2wU'
  }, {
    name: 'Imagine',
    logo: 'https://media.licdn.com/dms/image/C560BAQEeQUZvYgRwvg/company-logo_200_200/0/1630662358239?e=2147483647&v=beta&t=Ub9kJ0XA7Sp1H4n_c_h-uTXWxdL5zLI8QkXP5I7Wn-M'
  }, {
    name: 'Global',
    logo: 'https://cdn.worldvectorlogo.com/logos/global-logo.svg'
  }];
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