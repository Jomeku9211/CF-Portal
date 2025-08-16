import { useState } from 'react';
import '../../styles/LandingPage/FAQ.css';

const FAQ = () => {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const faqData = [
    {
      id: 1,
      question: "What is the process for hiring developers through Coderfarm?",
      answer: "Our hiring process is simple and efficient. First, you post your project requirements. Then, our AI-powered system matches you with qualified developers based on skills, experience, and cultural fit. You can review profiles, conduct interviews, and hire the best candidate for your project."
    },
    {
      id: 2,
      question: "Can I hire developers for short-term projects?",
      answer: "Absolutely! We support both short-term and long-term projects. Whether you need a developer for a few weeks or several months, our platform connects you with flexible talent that can adapt to your project timeline."
    },
    {
      id: 3,
      question: "How do you ensure the quality of workers?",
      answer: "We maintain high quality through our comprehensive vetting process. All developers undergo skill assessments, portfolio reviews, and reference checks. Our reputation system tracks performance and client feedback to ensure only top-tier talent remains on the platform."
    },
    {
      id: 4,
      question: "Is there a trial period available?",
      answer: "Yes, we offer a trial period for new clients. This allows you to evaluate our platform and the quality of our developers before making a long-term commitment. Contact our support team to learn more about trial options."
    },
    {
      id: 5,
      question: "How do you ensure the quality of workers?",
      answer: "Quality assurance is our top priority. We use multiple verification methods including technical assessments, portfolio reviews, client feedback analysis, and ongoing performance monitoring to maintain our high standards."
    },
    {
      id: 6,
      question: "Can I hire developers for short-term projects?",
      answer: "Yes, our platform is designed for flexibility. You can hire developers for projects ranging from a few days to several months. We have developers available for all project durations and can help you find the right fit for your timeline."
    },
    {
      id: 7,
      question: "What is the process for hiring developers through Coderfarm?",
      answer: "The process is straightforward: 1) Post your project requirements, 2) Get matched with qualified developers, 3) Review profiles and conduct interviews, 4) Select and hire your developer, 5) Manage your project through our platform."
    }
  ];

  const toggleQuestion = (id: number) => {
    setOpenQuestions(prev => 
      prev.includes(id) 
        ? prev.filter(qId => qId !== id)
        : [...prev, id]
    );
  };

  const handleGetHelp = () => {
    // Navigate to help/support page or open contact form
    console.log('Get Help clicked');
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        {/* Left side - FAQ Questions */}
        <div className="faq-questions">
          {faqData.map((item) => (
            <div key={item.id} className="faq-item">
              <div 
                className="faq-question"
                onClick={() => toggleQuestion(item.id)}
              >
                <span className="question-text">{item.question}</span>
                <div className={`plus-icon ${openQuestions.includes(item.id) ? 'rotated' : ''}`}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path 
                      d="M3.5 3.5L24.5 3.5L24.5 24.5L3.5 24.5L3.5 3.5Z" 
                      fill="#020303"
                    />
                  </svg>
                </div>
              </div>
              <div className="divider"></div>
              {openQuestions.includes(item.id) && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side - FAQ Header and CTA */}
        <div className="faq-content">
          <div className="faq-header">
            <h2 className="faq-title">FAQ's</h2>
            <p className="faq-description">
              We're here to help with anything you need to know about CoderFarm. Let's clear up the details so you can focus on what matters—finding the perfect developer for your project!
            </p>
          </div>
          
          <button className="get-help-button" onClick={handleGetHelp}>
            <span>Get Help</span>
            <div className="arrow-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path 
                  d="M6.125 6.125L21.875 6.125L21.875 21.875L6.125 21.875L6.125 6.125Z" 
                  fill="#F16A23"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
