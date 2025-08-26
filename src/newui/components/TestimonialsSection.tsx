import React from 'react';
import { Card } from './Card';
import { StarIcon } from 'lucide-react';
export function TestimonialsSection() {
  const testimonials = [{
    id: 'testimonial1',
    name: 'James Horwitz',
    role: 'CTO',
    rating: 4.1,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    testimonial: 'Coderfarm provides me with high quality developers. It was good working with them. Best wishes to them.'
  }, {
    id: 'testimonial2',
    name: 'Hanna Botosh',
    role: 'Product Owner',
    rating: 4.9,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    testimonial: 'Coderfarm provides me with high quality developers. It was good working with them. Best wishes to them.'
  }, {
    id: 'testimonial3',
    name: 'Cristopher Bergson',
    role: 'Product Manager',
    rating: 4.5,
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    testimonial: 'Coderfarm provides me with high quality developers. It was good working with them. Best wishes to them.'
  }];
  return <section className="w-full bg-tango-lightest py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-darkest mb-4 font-['Inter']">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-neutral-dark font-['IBM_Plex_Sans']">
            Did you know 89% of hiring failures happen because of Culture
            Misfit, not lack of skill?
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => <Card key={testimonial.id} variant="testimonial" hover>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold text-neutral-darkest font-['Inter']">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-neutral-dark font-['IBM_Plex_Sans']">
                      {testimonial.role}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <span className="text-tango-base font-semibold mr-1">
                      ★
                    </span>
                    <span className="font-semibold">{testimonial.rating}</span>
                  </div>
                </div>
                <p className="text-neutral-dark font-['IBM_Plex_Sans']">
                  {testimonial.testimonial}
                </p>
              </div>
            </Card>)}
        </div>
      </div>
    </section>;
}