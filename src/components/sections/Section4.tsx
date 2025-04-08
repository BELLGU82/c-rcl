
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MarketGrowthChart from '../MarketGrowthChart';

const Section4: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="section4" className="section bg-gradient-to-b from-accent-50 to-white">
      <div className="section-content">
        <h1 className="section-title gradient-text">{t('section4.title')}</h1>
        
        <MarketGrowthChart />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white/80 p-6 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section4.market.title')}</h2>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li>{t('section4.market.point1')}</li>
              <li>{t('section4.market.point2')}</li>
              <li>{t('section4.market.point3')}</li>
              <li>{t('section4.market.point4')}</li>
            </ul>
            <p className="text-gray-700 mt-4 font-medium italic">{t('section4.market.conclusion')}</p>
          </div>
          
          <div className="bg-white/80 p-6 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section4.business.title')}</h2>
            <div className="space-y-4">
              <div className="p-3 bg-accent-100 rounded-md">
                <p className="font-semibold text-accent-800">{t('section4.business.model1')}</p>
              </div>
              <div className="p-3 bg-accent-100 rounded-md">
                <p className="font-semibold text-accent-800">{t('section4.business.model2')}</p>
              </div>
              <div className="p-3 bg-accent-100 rounded-md">
                <p className="font-semibold text-accent-800">{t('section4.business.model3')}</p>
              </div>
              <div className="p-3 bg-accent-100 rounded-md">
                <p className="font-semibold text-accent-800">{t('section4.business.model4')}</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4 font-medium">{t('section4.business.conclusion')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
