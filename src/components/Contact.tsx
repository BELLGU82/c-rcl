
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="bg-transparent border border-black p-6 rounded-lg shadow-md text-text-primary text-center">
      <h2 className="text-2xl font-bold mb-4">{t('section5.contact.name')}</h2>
      
      <div className="flex justify-center items-center gap-2 mb-2">
        <p className="text-lg">{t('section5.contact.phone')}</p>
      </div>
      
      <div className="flex justify-center items-center gap-2">
        <p className="text-lg">{t('section5.contact.email')}</p>
      </div>
    </div>
  );
};

export default Contact;
