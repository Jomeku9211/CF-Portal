import React, { useState } from 'react';
import { Button } from './Button';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
type FAQItem = {
  id: string;
  question: string;
  answer: string;
};
export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>('faq1');
  const faqs: FAQItem[] = [{
    id: 'faq1',
    question: 'What is the process for hiring developers through Coderfarm?',
    answer: 'Our process involves defining your requirements, matching you with pre-vetted developers, conducting interviews, and providing ongoing support throughout the engagement. We focus on both technical skills and cultural fit to ensure successful placements.'
  }, {
    id: 'faq2',
    question: 'Can I hire developers for short-term projects?',
    answer: 'Yes, Coderfarm supports hiring for both short-term projects and long-term engagements. We have flexible options to match your specific project needs and timeline requirements.'
  }, {
    id: 'faq3',
    question: 'How do you ensure the quality of workers?',
    answer: 'We have a rigorous vetting process that includes technical assessments, code reviews, past project evaluations, and cultural fit interviews. Only the top 3% of applicants make it through our screening process.'
  }, {
    id: 'faq4',
    question: 'Is there a trial period available?',
    answer: "Yes, we offer a risk-free trial period so you can ensure the developer is a good fit for your team. If you're not satisfied, we'll find a replacement at no additional cost."
  }, {
    id: 'faq5',
    question: 'What technologies and skills do your developers have?',
    answer: 'Our talent pool includes developers skilled in a wide range of technologies including JavaScript, React, Node.js, Python, Java, .NET, mobile development, and more. We can match developers based on your specific tech stack requirements.'
  }];
  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };
  return <section className="w-full bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            {faqs.map(faq => <div key={faq.id} className="mb-4 border-b border-neutral-lighter pb-4">
                <button className="flex justify-between items-center w-full text-left py-3" onClick={() => toggleItem(faq.id)}>
                  <span className="font-semibold text-lg text-neutral-darkest font-['Inter']">
                    {faq.question}
                  </span>
                  <span className="text-sanjuan-base ml-2">
                    {openItem === faq.id ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                  </span>
                </button>
                {openItem === faq.id && <div className="mt-2 text-neutral-dark font-['IBM_Plex_Sans'] pb-2">
                    {faq.answer}
                  </div>}
              </div>)}
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-darkest mb-6 font-['Inter']">
              FAQ's
            </h2>
            <p className="text-lg text-neutral-dark mb-8 font-['IBM_Plex_Sans']">
              We're here to help with anything you need to know about Coderfarm.
              Let's clear up the details so you can focus on what
              matters—finding the perfect developer for your project!
            </p>
            <Button variant="primary" size="medium">
              Get Help
            </Button>
          </div>
        </div>
      </div>
    </section>;
}