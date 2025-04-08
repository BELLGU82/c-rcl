import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
const Quote: React.FC = () => {
  const {
    language
  } = useLanguage();
  return <div className="w-full max-w-5xl mx-auto my-16 text-center px-4">
      <blockquote className="italic text-lg md:text-xl lg:text-2xl text-text-primary leading-relaxed">
        "Better is possible. It does not take genius. It takes diligence. It takes moral
        clarity. It takes ingenuity. And above all, it takes a willingness to try."
      </blockquote>
      <p className="mt-4 text-right text-text-primary font-semibold">— Atul Gawande</p>
      
      <p className="mt-12 text-center text-lg text-text-primary">
        With the support of the right community, partners, and investors - we can 
        change the reality for millions of people.
      </p>
    </div>;
};
export default Quote;