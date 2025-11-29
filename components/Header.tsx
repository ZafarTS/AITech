'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-md' : 'bg-white/95 backdrop-blur-xl'
      } border-b border-primary-green/10`}
    >
      <nav className="max-w-[1400px] mx-auto px-4 md:px-lg py-sm flex justify-between items-center gap-4">
        <a href="#" className="flex items-center gap-2 font-extrabold text-xl md:text-2xl text-primary-green no-underline">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary-green to-deep-green rounded-[10px] flex items-center justify-center text-white text-lg md:text-xl flex-shrink-0">
            🌱
          </div>
          <span className="hidden sm:inline">{t('Agrotahlilchi', 'АгроАнализатор', 'AgroAnalyzer')}</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-6 list-none">
          <li>
            <a href="#problem" className="no-underline text-gray-text font-semibold hover:text-primary-green transition-colors">
              {t('Muammo', 'Проблема', 'Problem')}
            </a>
          </li>
          <li>
            <a href="#why-deliver" className="no-underline text-gray-text font-semibold hover:text-primary-green transition-colors">
              {t('Nega biz?', 'Почему мы?', 'Why us?')}
            </a>
          </li>
          
          <li>
            <a href="#team" className="no-underline text-gray-text font-semibold hover:text-primary-green transition-colors">
              {t('Jamoa', 'Команда', 'Team')}
            </a>
          </li>
          <li>
            <a href="#roadmap" className="no-underline text-gray-text font-semibold hover:text-primary-green transition-colors">
              {t("Yo'l xaritasi", 'Карта', 'Roadmap')}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
              className="flex items-center gap-2 px-3 py-2 bg-light-green hover:bg-primary-green hover:text-white text-primary-green rounded-lg font-semibold transition-all border border-primary-green/20"
            >
              <Globe size={16} />
              <span className="hidden sm:inline text-sm">{currentLang.name}</span>
              <span className="sm:hidden">{currentLang.flag}</span>
              <ChevronDown size={14} className={`transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-primary-green/10 overflow-hidden z-50">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      setLang(language.code as 'uz' | 'ru' | 'en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-light-green transition-colors ${
                      lang === language.code ? 'bg-light-green text-primary-green font-bold' : 'text-gray-text'
                    }`}
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden bg-transparent border-none text-primary-green cursor-pointer p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-primary-green/10 px-4 py-4">
          <ul className="flex flex-col gap-3 list-none">
            <li>
              <a href="#problem" className="block text-gray-text font-semibold hover:text-primary-green transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('Muammo va yechim', 'Проблема и Решение', 'Problem & Solution')}
              </a>
            </li>
            <li>
              <a href="#why-deliver" className="block text-gray-text font-semibold hover:text-primary-green transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('Nega biz?', 'Почему мы?', 'Why us?')}
              </a>
            </li>
            <li>
              <a href="#ai-usage" className="block text-gray-text font-semibold hover:text-primary-green transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('SI qo\'llanishi', 'Использование ИИ', 'AI Usage')}
              </a>
            </li>
            <li>
              <a href="#team" className="block text-gray-text font-semibold hover:text-primary-green transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('Jamoa', 'Команда', 'Team')}
              </a>
            </li>
            <li>
              <a href="#roadmap" className="block text-gray-text font-semibold hover:text-primary-green transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                {t("Yo'l xaritasi", 'Дорожная карта', 'Roadmap')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
