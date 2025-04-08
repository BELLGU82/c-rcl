import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ROITimelineChart from '../ROITimelineChart';
import SankeyBusinessModel from '../SankeyBusinessModel';
const Section5: React.FC = () => {
  const {
    t
  } = useLanguage();
  return <section id="section5" className="section bg-gradient-to-b from-white to-accent-50 bg-[#f7f7f7]">
      <div className="section-content">
        <h1 className="section-title gradient-text">{t('section5.title')}</h1>
        
        <div className="bg-transparent border border-black p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section5.savings.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-inherit bg-[#f7f7f7]">
            <div className="p-4 border border-black rounded-lg text-center bg-[#f7f7f7]">
              <p className="text-lg font-bold text-accent-800">{t('section5.savings.point1')}</p>
            </div>
            <div className="p-4 bg-transparent border border-black rounded-lg text-center">
              <p className="text-lg font-bold text-accent-800">{t('section5.savings.point2')}</p>
            </div>
            <div className="p-4 bg-transparent border border-black rounded-lg text-center">
              <p className="text-lg font-bold text-accent-800">{t('section5.savings.point3')}</p>
            </div>
            <div className="p-4 bg-transparent border border-black rounded-lg text-center">
              <p className="text-lg font-bold text-accent-800">{t('section5.savings.point4')}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <ROITimelineChart />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-transparent border border-black p-6 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section5.competitors.title')}</h2>
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
            <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section5.status.title')}</h2>
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
        
        <div className="bg-transparent border border-black p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-4 text-brand-600">{t('section5.timeline.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-transparent border border-black rounded-lg">
              <p className="text-lg font-bold text-brand-800 mb-2">{t('section5.timeline.stage1')}</p>
              <p className="text-sm text-brand-700">{t('section5.timeline.stage1.points')}</p>
            </div>
            <div className="p-4 bg-transparent border border-black rounded-lg">
              <p className="text-lg font-bold text-brand-800 mb-2">{t('section5.timeline.stage2')}</p>
              <p className="text-sm text-brand-700">{t('section5.timeline.stage2.points')}</p>
            </div>
            <div className="p-4 bg-transparent border border-black rounded-lg">
              <p className="text-lg font-bold text-brand-800 mb-2">{t('section5.timeline.stage3')}</p>
              <p className="text-sm text-brand-700">{t('section5.timeline.stage3.points')}</p>
            </div>
            <div className="p-4 bg-transparent border border-black rounded-lg">
              <p className="text-lg font-bold text-brand-800 mb-2">{t('section5.timeline.stage4')}</p>
              <p className="text-sm text-brand-700">{t('section5.timeline.stage4.points')}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-transparent border border-black p-6 rounded-lg shadow-md mb-12">
          <blockquote className="italic text-lg text-center mb-2">
            {t('section5.cta.quote')}
          </blockquote>
          <p className="text-right text-gray-700 mb-4">{t('section5.cta.author')}</p>
          <p className="text-center text-xl font-medium text-brand-700">
            {t('section5.cta.conclusion')}
          </p>
        </div>
        
        <div className="bg-transparent border border-black p-6 rounded-lg shadow-md text-text-primary text-center">
          <h2 className="text-2xl font-bold mb-4">{t('section5.contact.name')}</h2>
          <p className="text-lg">{t('section5.contact.phone')}</p>
          <p className="text-lg">{t('section5.contact.email')}</p>
        </div>
      </div>
    </section>;
};
export default Section5;