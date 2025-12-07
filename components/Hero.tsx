'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, Camera, Cpu } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen grid md:grid-cols-2 gap-xl items-center px-lg pt-[calc(80px+96px)] pb-xl max-w-[1400px] mx-auto relative">
      <div className="animate-fade-in-up [animation-delay:0.2s] opacity-0 [animation-fill-mode:both]">
        <div className="flex gap-sm mb-md flex-wrap">
          <span className="inline-flex items-center gap-[6px] px-4 py-2 bg-light-green rounded-3xl text-sm font-semibold text-deep-green border-2 border-primary-green/20">
            <Sparkles size={16} /> {t('Agro-texnologiya', 'Агро-технология', 'Agro-tech')}
          </span>
          <span className="inline-flex items-center gap-[6px] px-4 py-2 bg-light-green rounded-3xl text-sm font-semibold text-deep-green border-2 border-primary-green/20">
            <Camera size={16} /> {t("Kompyuter ko'rishi", 'Компьютерное зрение', 'Computer Vision')}
          </span>
          <span className="inline-flex items-center gap-[6px] px-4 py-2 bg-light-green rounded-3xl text-sm font-semibold text-deep-green border-2 border-primary-green/20">
            <Cpu size={16} /> {t("Sun'iy intellekt", 'Искусственный интеллект', 'Artificial Intelligence')}
          </span>
        </div>

        <h1 className="text-[clamp(42px,5vw,68px)] font-extrabold leading-[1.1] mb-md text-dark-text">
          <span className="text-primary-green relative inline-block">
            {t('Agrotahlilchi', 'Агроанализатор', 'AgroAnalyzer')}
            <span className="absolute bottom-2 left-0 right-0 h-3 bg-accent-lime opacity-30 -z-10 animate-underline-expand" />
          </span>
          <br />
          <span>{t('— tuproqni rasmga oling, hosilni oshiring', '— снимите почву, увеличьте урожай', '— scan soil, grow yield')}</span>
        </h1>

        <p className="text-xl text-gray-text mb-lg max-w-[600px] leading-[1.7]">
          {t(
            "Sun'iy intellekt asosidagi mobil agro-tahlil ilovasi. Tuproqning holati, sho'rlanishi, ekin turiga mosligi va hosildorlik potensialini offlayn aniqlaydi.",
            'Мобильное приложение для агро-анализа на базе ИИ. Определяет состояние почвы, засоление, пригодность для культур и потенциал урожайности оффлайн.',
            'AI-powered mobile agro-analysis app. Detects soil condition, salinity, crop suitability, and yield potential offline.'
          )}
        </p>

        <div className="flex gap-sm flex-wrap">
          <a
            href="https://agrotahlilchi.uz/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-sm font-bold text-base no-underline inline-flex items-center gap-2 cursor-pointer border-none transition-all bg-gradient-to-br from-primary-green to-deep-green text-white shadow-[0_10px_30px_rgba(31,160,63,0.3)] hover:translate-y-[-2px] hover:shadow-[0_15px_40px_rgba(31,160,63,0.4)] relative overflow-hidden group"
          >
            <span className="relative z-10">{t('Demo versiya', 'Демо версия', 'Demo Version')}</span>
            <span className="relative z-10">→</span>
            <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-white/30 -translate-x-1/2 -translate-y-1/2 transition-all duration-600 group-hover:w-[300px] group-hover:h-[300px]" />
          </a>
          <a
            href="#team"
            className="px-8 py-4 rounded-sm font-bold text-base no-underline inline-flex items-center gap-2 cursor-pointer transition-all bg-light-green text-primary-green border-2 border-primary-green hover:bg-primary-green hover:text-white hover:translate-y-[-2px]"
          >
            {t('Biz haqimizda', 'О нас', 'About Us')}
          </a>
        </div>
      </div>

      {/* Phone Mockup - Smaller */}
      <div className="relative animate-fade-in-up [animation-delay:0.4s] opacity-0 [animation-fill-mode:both] order-[-1] md:order-1">
        <div className="relative w-full max-w-[280px] md:max-w-[320px] mx-auto">
          <div className="relative w-full pb-[200%] bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-[35px] shadow-[0_25px_70px_rgba(0,0,0,0.25)] overflow-hidden animate-phone-float">
            <div className="absolute top-3 left-3 right-3 bottom-3 bg-gradient-to-b from-light-green/80 to-white rounded-[26px] overflow-hidden">
              <div className="p-4 h-full flex flex-col text-sm">
                {/* Header */}
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-primary-green/10">
                  <div className="text-sm font-bold text-primary-green flex items-center gap-1">
                    <span className="text-base">🌱</span> Agrotahlilchi V1.0
                  </div>
                  <div className="text-lg">📸</div>
                </div>
                
                {/* Main Card - Paxta recommendation */}
                <div className="bg-gradient-to-br from-primary-green to-deep-green text-white p-4 rounded-xl mb-3 shadow-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-[10px] opacity-80 mb-1">{t('Eng mos ekin turi', 'Наиболее подходящая культура', 'Best Crop')}</div>
                      <div className="text-xl font-bold mb-1">Paxta</div>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                      🌱
                    </div>
                  </div>
                  <div className="flex items-end justify-between mt-2 pt-2 border-t border-white/20">
                    <div className="text-[10px] opacity-80">{t('Hosildorlik potensiali', 'Потенциал', 'Potential')}</div>
                    <div className="text-3xl font-extrabold text-accent-lime">85%</div>
                  </div>
                </div>
                
                {/* Measures List */}
                <div className="bg-white/90 p-3 rounded-xl flex-1 overflow-hidden">
                  <div className="text-xs font-bold text-primary-green mb-2">{t('Melioratsiya choralari', 'Меры', 'Measures')}</div>
                  <div className="space-y-1.5">
                    {[
                      { icon: '💧', text: t("Azotli o'g'it qo'llang", 'Азотные удобрения', 'N fertilizer') },
                      { icon: '💦', text: t("Sug'orish oshiring", 'Увеличить полив', 'More irrigation') },
                      { icon: '🌿', text: t("Organik moddalar", 'Органика', 'Organic matter') },
                      { icon: '💰', text: t("Zararkunandalarni kamaytiring", 'Снизить потери', 'Reduce losses') },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-dark-text/80 bg-light-green/50 px-2 py-1.5 rounded-lg">
                        <span className="text-sm">{item.icon}</span>
                        <span className="flex-1 truncate font-medium">{item.text}</span>
                        <span className="text-primary-green text-xs">→</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
