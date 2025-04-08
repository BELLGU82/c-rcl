
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Chat from '@/components/Chat';
import Section1 from '@/components/sections/Section1';
import Section2 from '@/components/sections/Section2';
import Section3 from '@/components/sections/Section3';
import Section4 from '@/components/sections/Section4';
import Section5 from '@/components/sections/Section5';
import Quote from '@/components/Quote';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
          <div className="container mx-auto px-4 py-12">
            <Quote />
            <div className="mt-12">
              <Contact />
            </div>
          </div>
        </main>
        <Chat />
      </div>
    </LanguageProvider>
  );
};

export default Index;
