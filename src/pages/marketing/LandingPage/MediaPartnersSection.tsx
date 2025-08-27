
export function MediaPartnersSection() {
  const partners = [{
    name: 'Flipboard',
    logo: 'https://cdn.worldvectorlogo.com/logos/flipboard-1.svg'
  }, {
    name: 'Daily Hunt',
    logo: 'https://play-lh.googleusercontent.com/QLqDr52FVmj5Jgn-LfuqKz-_WUuXkPy1JJ6GGjvmvODAh-9e4xhcwQXn-lixUuEJBGU=w240-h480-rw'
  }, {
    name: 'Economic Times',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/ET_Logo.png'
  }, {
    name: 'Navbharat Times',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Navbharat_Times_logo.svg/2560px-Navbharat_Times_logo.svg.png'
  }, {
    name: 'Republic',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Republic_TV.svg/1200px-Republic_TV.svg.png'
  }];
  return <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-darkest mb-4 font-['Inter']">
            Media & Partnerships
          </h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {partners.map((partner, index) => <div key={index} className="opacity-70 hover:opacity-100 transition-opacity">
              <img src={partner.logo} alt={`${partner.name} logo`} className="h-10 md:h-14 object-contain" />
            </div>)}
        </div>
      </div>
    </section>;
}