
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from './ui/card';

const SavingsDataCards: React.FC = () => {
  const { t, language } = useLanguage();
  
  const savingsData = [
    {
      id: 'hospitalization',
      amount: language === 'en' ? '$10,000+ savings' : '10,000$+ חיסכון',
      description: language === 'en' ? 'for each hospitalization avoided' : 'עבור כל אשפוז שנמנע'
    },
    {
      id: 'patient',
      amount: language === 'en' ? '$60,000+ savings' : '60,000$+ חיסכון',
      description: language === 'en' ? 'per patient per year' : 'למטופל לשנה'
    },
    {
      id: 'family',
      amount: language === 'en' ? '$10,000-$30,000 savings' : '10,000$-30,000$ חיסכון',
      description: language === 'en' ? 'per family per year' : 'למשפחה לשנה'
    },
    {
      id: 'roi',
      amount: language === 'en' ? 'Potential ROI in' : 'ROI פוטנציאלי תוך',
      description: language === 'en' ? 'less than 6 months' : 'פחות מ-6 חודשים'
    }
  ];
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-text-primary">{language === 'en' ? 'Savings Data' : 'נתוני חיסכון'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {savingsData.map(item => (
          <div 
            key={item.id} 
            className="transparent-container bg-[#FFF5E6] bg-opacity-50 p-6 flex flex-col items-center justify-center text-center min-h-[150px]"
          >
            <p className="font-bold text-lg mb-2 text-accent-700">{item.amount}</p>
            <p className="text-text-primary">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsDataCards;
