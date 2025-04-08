
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Header: React.FC = () => {
  const { t, language, setLanguage, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/bfcd0dfb-d85f-44c8-af1c-b9ee09adbcf4.png" 
              alt="C-RCL Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('section1')}
              className="text-foreground hover:text-brand-500 transition-colors"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('section2')}
              className="text-foreground hover:text-brand-500 transition-colors"
            >
              {t('nav.problem')}
            </button>
            <button
              onClick={() => scrollToSection('section3')}
              className="text-foreground hover:text-brand-500 transition-colors"
            >
              {t('nav.tech')}
            </button>
            <button
              onClick={() => scrollToSection('section4')}
              className="text-foreground hover:text-brand-500 transition-colors"
            >
              {t('nav.market')}
            </button>
            <button
              onClick={() => scrollToSection('section5')}
              className="text-foreground hover:text-brand-500 transition-colors"
            >
              {t('nav.business')}
            </button>
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="text-foreground hover:text-brand-500 transition-colors"
            >
              {t('language')}
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="text-foreground hover:text-brand-500 transition-colors mr-2"
            >
              {t('language')}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:text-brand-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 py-2 flex flex-col space-y-2 bg-white dark:bg-gray-900 rounded-md shadow-lg animate-fade-in">
            <button
              onClick={() => scrollToSection('section1')}
              className="px-4 py-2 text-foreground hover:bg-muted transition-colors text-start"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('section2')}
              className="px-4 py-2 text-foreground hover:bg-muted transition-colors text-start"
            >
              {t('nav.problem')}
            </button>
            <button
              onClick={() => scrollToSection('section3')}
              className="px-4 py-2 text-foreground hover:bg-muted transition-colors text-start"
            >
              {t('nav.tech')}
            </button>
            <button
              onClick={() => scrollToSection('section4')}
              className="px-4 py-2 text-foreground hover:bg-muted transition-colors text-start"
            >
              {t('nav.market')}
            </button>
            <button
              onClick={() => scrollToSection('section5')}
              className="px-4 py-2 text-foreground hover:bg-muted transition-colors text-start"
            >
              {t('nav.business')}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
