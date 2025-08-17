import React from 'react';
import { PlayCircleIcon } from 'lucide-react';
export function FeaturedEpisodes() {
  const episodes = [{
    number: 42,
    title: 'Why Technical Interviews Are Failing Us',
    guest: 'Sarah Chen, CTO at TechFlow',
    description: 'Sarah explains why algorithmic interviews often miss the best candidates and what to do instead.',
    duration: '38 min',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300&q=80'
  }, {
    number: 43,
    title: 'Building Remote Teams That Actually Work',
    guest: 'Mark Johnson, Founder of RemoteFirst',
    description: 'Mark shares practical strategies for building cohesive remote teams with strong culture.',
    duration: '42 min',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300&q=80'
  }, {
    number: 44,
    title: 'The Hidden Costs of Bad Hiring Decisions',
    guest: 'Elena Petrova, HR Director at ScaleUp',
    description: 'Elena breaks down the real costs of mis-hires and how to avoid the most common pitfalls.',
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300&q=80'
  }];
  return <section id="episodes" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 md:mb-0">
              Featured Episodes
            </h2>
            <a href="#" className="text-accent font-medium flex items-center">
              View all episodes
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((episode, index) => <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img src={episode.image} alt={episode.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <div className="flex items-center mb-1">
                        <div className="text-xs font-medium bg-accent px-2 py-0.5 rounded-full">
                          EP {episode.number}
                        </div>
                        <div className="text-xs ml-2">{episode.duration}</div>
                      </div>
                      <h3 className="font-bold">{episode.title}</h3>
                    </div>
                  </div>
                  <button className="absolute top-3 right-3 text-white bg-primary bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition-all">
                    <PlayCircleIcon size={28} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-sm font-medium text-primary mb-2">
                    {episode.guest}
                  </div>
                  <p className="text-gray-600 text-sm">{episode.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <a href="#" className="text-accent text-sm font-medium flex items-center">
                      Listen now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    <div className="flex space-x-2">
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}