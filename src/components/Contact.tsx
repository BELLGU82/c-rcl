
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-transparent border border-black rounded-lg p-8 text-text-primary text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Bell</h2>
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center">
          <Phone className="w-5 h-5 mr-2" />
          <span>054-9411621</span>
        </div>
        
        <div className="flex items-center">
          <Mail className="w-5 h-5 mr-2" />
          <span>digitalife@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
