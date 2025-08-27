
import { Button } from '../../modules/shared/components/Button';
export function BonusBenefitsSection() {
  const benefits = [{
    id: 'culture-fit',
    icon: '🔍',
    title: 'Culture Fit 1st',
    description: "Get matched with developers who resonate with your team's values from day one."
  }, {
    id: 'transparent',
    icon: '📊',
    title: 'Fair & Transparent',
    description: 'See real feedback & reputation scores from verified projects—no more guesswork.'
  }, {
    id: 'win-win',
    icon: '🤝',
    title: 'Win-Win Hiring',
    description: 'Both sides are motivated to be honest and do great work because trust is rewarded.'
  }];
  return <section className="w-full bg-tango-lightest py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-tango-base mb-4 font-['Inter']">
            Bonus Benefits
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map(benefit => <div key={benefit.id} className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-2xl">{benefit.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-darkest mb-3 font-['Inter']">
                {benefit.title}
              </h3>
              <p className="text-neutral-dark font-['IBM_Plex_Sans']">
                {benefit.description}
              </p>
            </div>)}
        </div>
        <div className="text-center mt-16">
          <Button variant="primary" size="large">
            Start Your 30-Day Risk-Free Trial →
          </Button>
        </div>
      </div>
    </section>;
}