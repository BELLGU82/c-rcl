
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AgentNetworkGraph from '../AgentNetworkGraph';

const Section3: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="section3" className="section bg-gradient-to-b from-white to-accent-50">
      <div className="section-content">
        <h1 className="section-title gradient-text">{t('section3.title')}</h1>
        
        <AgentNetworkGraph />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white/80 p-6 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section3.advantages.title')}</h2>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              <li>{t('section3.advantages.point1')}</li>
              <li>{t('section3.advantages.point2')}</li>
              <li>{t('section3.advantages.point3')}</li>
              <li>{t('section3.advantages.point4')}</li>
            </ul>
            <p className="text-gray-700 mt-4 font-medium">{t('section3.advantages.conclusion')}</p>
          </div>
          
          <div className="bg-white/80 p-6 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section3.value.title')}</h2>
            <div className="space-y-4">
              <div className="p-3 bg-brand-100 rounded-md">
                <p className="font-semibold text-brand-800">{t('section3.value.families')}</p>
              </div>
              <div className="p-3 bg-brand-100 rounded-md">
                <p className="font-semibold text-brand-800">{t('section3.value.doctors')}</p>
              </div>
              <div className="p-3 bg-brand-100 rounded-md">
                <p className="font-semibold text-brand-800">{t('section3.value.patients')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
