
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AgentNetworkGraph from '../AgentNetworkGraph';

const Section3: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="section3" className="section">
      <div className="section-content">
        <h1 className="section-title gradient-text">{t('section3.title')}</h1>
        
        <AgentNetworkGraph />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="transparent-container bg-transparent border border-black card-hover">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">{t('section3.advantages.title')}</h2>
            <ul className="space-y-2 list-disc list-inside text-text-primary">
              <li>{t('section3.advantages.point1')}</li>
              <li>{t('section3.advantages.point2')}</li>
              <li>{t('section3.advantages.point3')}</li>
              <li>{t('section3.advantages.point4')}</li>
            </ul>
            <p className="text-text-primary mt-4 font-medium">{t('section3.advantages.conclusion')}</p>
          </div>
          
          <div className="transparent-container bg-transparent border border-black card-hover">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">{t('section3.value.title')}</h2>
            <div className="space-y-4">
              <div className="p-3 border border-black rounded-md bg-transparent">
                <p className="font-semibold text-text-primary">{t('section3.value.families')}</p>
              </div>
              <div className="p-3 border border-black rounded-md bg-transparent">
                <p className="font-semibold text-text-primary">{t('section3.value.doctors')}</p>
              </div>
              <div className="p-3 border border-black rounded-md bg-transparent">
                <p className="font-semibold text-text-primary">{t('section3.value.patients')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
