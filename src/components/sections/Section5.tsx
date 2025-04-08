
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ROITimelineChart from '../ROITimelineChart';
import SankeyBusinessModel from '../SankeyBusinessModel';
import SavingsDataCards from '../SavingsDataCards';
import Timeline from '../Timeline';

const Section5: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="section5" className="section bg-transparent">
      <div className="section-content">
        <h1 className="section-title gradient-text">{t('section5.title')}</h1>
        
        <div className="mb-12">
          <SavingsDataCards />
        </div>
        
        <div className="mb-12">
          <ROITimelineChart />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-transparent border border-black p-6 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold mb-4 text-[#313131]">{t('section5.competitors.title')}</h2>
            <p className="text-gray-700 mb-2">{t('section5.competitors.fragmented')}</p>
            <ul className="mb-4 space-y-1 list-disc list-inside text-gray-700">
              <li>{t('section5.competitors.comp1')}</li>
              <li>{t('section5.competitors.comp2')}</li>
              <li>{t('section5.competitors.comp3')}</li>
            </ul>
            <p className="text-gray-700 mb-2 font-medium">{t('section5.competitors.different')}</p>
            <ul className="space-y-1 list-disc list-inside text-gray-700">
              <li>{t('section5.competitors.diff1')}</li>
              <li>{t('section5.competitors.diff2')}</li>
              <li>{t('section5.competitors.diff3')}</li>
              <li>{t('section5.competitors.diff4')}</li>
            </ul>
          </div>
          
          <div className="bg-transparent border border-black p-6 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold mb-4 text-[#313131]">{t('section5.status.title')}</h2>
            <p className="text-gray-700 mb-2">{t('section5.status.current')}</p>
            <p className="text-gray-700 mb-4">
              {t('section5.status.progress1')}<br />
              {t('section5.status.progress2')}<br />
              {t('section5.status.progress3')}
            </p>
            <p className="text-gray-700 mb-2 font-medium">{t('section5.status.next')}</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>{t('section5.status.next1')}</li>
              <li>{t('section5.status.next2')}</li>
              <li>{t('section5.status.next3')}</li>
              <li>{t('section5.status.next4')}</li>
            </ol>
          </div>
        </div>
        
        <div className="mb-12">
          <Timeline />
        </div>
      </div>
    </section>
  );
};

export default Section5;
