
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Chat from '@/components/Chat';
import Section1 from '@/components/sections/Section1';
import Section2 from '@/components/sections/Section2';
import Section3 from '@/components/sections/Section3';
import Section4 from '@/components/sections/Section4';
import Section5 from '@/components/sections/Section5';

// Add D3.js
<lov-add-dependency>d3@7.8.5</lov-add-dependency>

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
        </main>
        <Chat />
      </div>
    </LanguageProvider>
  );
};

export default Index;
