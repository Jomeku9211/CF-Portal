
import { Card } from './Card';
export function FeaturesSection() {
  const features = [{
    id: 'matchfit',
    icon: '🔍',
    title: 'MatchFit',
    description: 'Instantly see top candidates who match both your skills and culture requirements.',
    color: 'from-blue-500 to-blue-600'
  }, {
    id: 'truerep',
    icon: '📊',
    title: 'TrueRep',
    description: 'Dynamic transparent scores built from verified work, peer feedback, and consistent performance.',
    color: 'from-blue-400 to-blue-500'
  }, {
    id: 'skillscope',
    icon: '🎯',
    title: 'SkillScope',
    description: 'Go beyond the resume. Dive into rated skills, code samples, and real project histories.',
    color: 'from-blue-300 to-blue-400'
  }, {
    id: 'flowtrack',
    icon: '📋',
    title: 'FlowTrack',
    description: 'Track candidates through every stage, compare with built-in scorecards.',
    color: 'from-blue-400 to-blue-500'
  }, {
    id: 'flexfee',
    icon: '💰',
    title: 'FlexFee',
    description: "Your and your hires' reputation directly lowers your platform fees.",
    color: 'from-blue-600 to-blue-700'
  }, {
    id: 'trustloop',
    icon: '🤝',
    title: 'TrustLoop',
    description: 'Developers and companies both earn trust that follows them—no fakes, no fluff.',
    color: 'from-blue-500 to-blue-600'
  }];
  return <section className="w-full bg-gradient-to-br from-white via-blue-50 to-blue-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 font-['Inter']">
            Platform Features
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-blue-800 font-['IBM_Plex_Sans'] mb-4">
              Discover the secret sauce behind our game-changing hiring
              approach.
            </p>
            <p className="text-lg text-blue-700 font-['IBM_Plex_Sans']">
              Not just features—these are your superpowers for hiring remote
              tech talent that truly fits. From intelligent matchmaking to
              reputation-driven pricing, every tool is designed to make hiring
              faster, fairer, and founder-focused.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(feature => <div key={feature.id} className="group">
              <Card variant="feature" hover className="h-full bg-white border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-8 space-y-6 h-full flex flex-col">
                  <div className="flex items-start space-x-4">
                    <div className={`bg-gradient-to-br ${feature.color} text-white p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900 font-['Inter'] group-hover:text-blue-700 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-blue-800 font-['IBM_Plex_Sans'] text-base leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </div>)}
        </div>
      </div>
    </section>;
}