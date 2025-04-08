
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle } from 'lucide-react';

const Timeline: React.FC = () => {
  const { language } = useLanguage();
  
  const timelineStages = [
    {
      id: 'pre-seed',
      title: language === 'en' ? 'Pre-Seed' : 'קדם-זרע',
      status: 'completed',
      timeframe: '',
      details: language === 'en' 
        ? 'Market Research, Architecture Design, Proof of Concept' 
        : 'מחקר שוק, תכנון ארכיטקטורה, הוכחת היתכנות'
    },
    {
      id: 'seed',
      title: language === 'en' ? 'Seed' : 'זרע',
      status: 'current',
      timeframe: language === 'en' ? '0-6 months' : '0-6 חודשים',
      details: language === 'en' 
        ? 'MVP, Recruitment, Infrastructure' 
        : 'מוצר מינימלי, גיוס, תשתיות'
    },
    {
      id: 'validation',
      title: language === 'en' ? 'Validation' : 'אימות',
      status: 'future',
      timeframe: language === 'en' ? '6-12 months' : '6-12 חודשים',
      details: language === 'en' 
        ? 'Pilots, User testing, Product improvement' 
        : 'פיילוטים, בדיקות משתמשים, שיפור המוצר'
    },
    {
      id: 'growth',
      title: language === 'en' ? 'Growth' : 'צמיחה',
      status: 'future',
      timeframe: language === 'en' ? '12+ months' : '12+ חודשים',
      details: language === 'en' 
        ? 'Market entry, Scale, Series A fundraising' 
        : 'כניסה לשוק, סקלה, גיוס סדרה A'
    }
  ];
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-text-primary">{language === 'en' ? 'Timeline' : 'ציר זמן'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {timelineStages.map(stage => (
          <div 
            key={stage.id} 
            className={`transparent-container bg-careteal-50 bg-opacity-50 p-6 flex flex-col min-h-[180px] ${
              stage.status === 'completed' ? 'bg-careteal-100' : 
              stage.status === 'current' ? 'bg-careteal-50' : 'bg-careteal-50'
            }`}
          >
            <div className="flex items-center mb-2">
              <h3 className="font-bold text-lg text-text-primary">{stage.title}</h3>
              {stage.status === 'completed' && <CheckCircle className="w-5 h-5 ml-2 text-green-500" />}
            </div>
            
            {stage.timeframe && (
              <div className="mb-2 flex items-center">
                <span className="text-sm text-text-primary">| {stage.timeframe}</span>
                {stage.status === 'current' && <span className="ml-2 text-xs px-1 py-0.5 border border-black rounded bg-transparent text-text-primary">SOON</span>}
              </div>
            )}
            
            <p className="text-sm text-text-primary mt-2">{stage.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
