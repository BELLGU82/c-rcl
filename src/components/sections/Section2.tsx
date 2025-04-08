
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ChallengesBarChart from '../ChallengesBarChart';

const Section2: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="section2" className="section bg-gradient-to-b from-accent-50 to-white">
      <div className="section-content">
        <h1 className="section-title gradient-text">{t('section2.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/80 p-6 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section2.problem.title')}</h2>
            <p className="text-gray-700">{t('section2.problem.content')}</p>
          </div>
          
          <div className="bg-white/80 p-6 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section2.solution.title')}</h2>
            <p className="text-gray-700 mb-4">{t('section2.solution.content')}</p>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              <li>{t('section2.solution.agent1')}</li>
              <li>{t('section2.solution.agent2')}</li>
              <li>{t('section2.solution.agent3')}</li>
            </ul>
            <p className="text-gray-700 mt-4">{t('section2.solution.conclusion')}</p>
          </div>
        </div>
        
        <ChallengesBarChart />
      </div>
    </section>
  );
};

export default Section2;
