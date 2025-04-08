
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import CircleOfCareAnimation from '../CircleOfCareAnimation';

const Section1: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="section1" className="section bg-gradient-to-b from-white to-accent-50">
      <div className="section-content">
        <h1 className="section-title gradient-text">{t('section1.title')}</h1>
        <p className="section-subtitle">{t('section1.subtitle')}</p>
        
        <CircleOfCareAnimation />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white/80 p-6 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section1.story.title')}</h2>
            <p className="text-gray-700">{t('section1.story.content')}</p>
          </div>
          
          <div className="bg-white/80 p-6 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section1.who.title')}</h2>
            <p className="text-gray-700">{t('section1.who.content')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
