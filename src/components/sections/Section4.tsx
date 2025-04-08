import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MarketGrowthChart from '../MarketGrowthChart';
import SankeyBusinessModel from '../SankeyBusinessModel';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
const Section4: React.FC = () => {
  const {
    t
  } = useLanguage();
  return <section id="section4" className="section">
      <div className="section-content">
        <h1 className="section-title gradient-text">{t('section4.title')}</h1>
        
        <MarketGrowthChart />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Business Model Card - Now on the LEFT */}
          <div className="transparent-container bg-transparent border border-black card-hover">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">{t('section4.business.title')}</h2>
            <div className="space-y-4">
              <div className="p-3 border border-black rounded-md bg-transparent">
                <p className="text-text-primary font-medium">{t('section4.business.model1')}</p>
              </div>
              <div className="p-3 border border-black rounded-md bg-transparent">
                <p className="text-text-primary font-medium">{t('section4.business.model2')}</p>
              </div>
              <div className="p-3 border border-black rounded-md bg-transparent">
                <p className="text-text-primary font-medium">{t('section4.business.model3')}</p>
              </div>
              <div className="p-3 border border-black rounded-md bg-transparent">
                <p className="text-text-primary font-medium">{t('section4.business.model4')}</p>
              </div>
            </div>
            <p className="text-text-primary mt-4 font-medium">{t('section4.business.conclusion')}</p>
          </div>
          
          {/* Market Data Card - Now on the RIGHT */}
          <div className="transparent-container bg-transparent border border-black card-hover">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">{t('section4.market.title')}</h2>
            <ul className="space-y-3 list-disc list-inside text-text-primary">
              <li>{t('section4.market.point1')}</li>
              <li>{t('section4.market.point2')}</li>
              <li>{t('section4.market.point3')}</li>
              <li>{t('section4.market.point4')}</li>
            </ul>
            <p className="text-text-primary mt-4 font-medium italic">{t('section4.market.conclusion')}</p>
          </div>
        </div>
      </div>
    </section>;
};
export default Section4;