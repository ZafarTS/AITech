'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GraduationCap, Globe, Database, Users, Zap, CheckCircle, Award, BookOpen, TrendingUp } from 'lucide-react';

export function WhyWeCanDeliver() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.scroll-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const strengths = [
    {
      icon: <GraduationCap size={40} />,
      title: t('Akademik baza va tajriba', 'Академическая база и опыт', 'Academic Foundation'),
      description: t(
        "Toshkent kimyo-texnologiya instituti (TKTI), Avtomatlashtirish va raqamli boshqaruv kafedrasi. Scopus/Web of Science'da 10+ ilmiy maqola. Asosiy sohalarimiz: raqamlashtirish, digital twins, IoT, amaliy sun'iy intellekt yechimlari.",
        'Ташкентский химико-технологический институт (ТХТИ), Кафедра автоматизации и цифрового управления. 10+ научных статей в Scopus/Web of Science. Основные области: цифровизация, digital twins, IoT, прикладные решения ИИ.',
        'Tashkent Institute of Chemical Technology (TCTI), Department of Automation and Digital Management. 10+ papers in Scopus/Web of Science. Main areas: digitalization, digital twins, IoT, applied AI solutions.'
      ),
      stats: ['TKTI', '10+ Scopus/WoS', 'Sun`iy intellekt yechimlari','Digital Twins', 'IoT','Raqamlashtirish'],
    },
    {
      icon: <Globe size={40} />,
      title: t('Xalqaro loyihalar tajribasi', 'Опыт международных проектов', 'International Project Experience'),
      description: t(
        "DePRO, SAP (Ispaniya) tadqiqot guruhlarida ishtirok etilgan. IoT, Intellektual boshqarish, Deep Learning/Machine Learning sohalarida real loyihalarda amaliy tajriba to'plagan.",
        'Участие в проекта в исследовательских группах DePRO, SAP (Испания). Практический опыт в реальных проектах в области IoT, интеллектуального управления, Deep Learning/Machine Learning.',
        'Project  participation in DePRO, SAP (Spain) research groups. Practical experience in real projects in IoT, Intelligent Control, Deep Learning/Machine Learning.'
      ),
      stats: ['IoT', 'DL/ML'],
    },
    {
      icon: <Database size={40} />,
      title: t("O'zbekiston ma'lumotlari asosida", 'На основе данных Узбекистана', 'Based on Uzbekistan Data'),
      description: t(
        "Ma'lumotlar O'zbekiston viloyatlari bo'ylab foto tarzida yig'ilgan. 500+ rasmlarda tuproq turlari, holati bo'yicha SI o'qitilgan. Mahalliy iqlim, tuproq va qishloq xo'jaligi sharoitlariga maxsus moslashtirilgan.",
        'Данные собраны в виде фотографий по регионам Узбекистана. ИИ обучен на 500+ изображениях по типам почвы и состоянию. Специально адаптирован к местному климату, почвам и сельскохозяйственным условиям.',
        'Data collected as photos across Uzbekistan regions. AI trained on 500+ images by soil types and conditions. Specifically adapted to local climate, soils and agricultural conditions.'
      ),
      stats: ['6 viloyat', '500+ rasm', 'Lokal dataset', "Mahalliy moslashgan"],
    },
    {
      icon: <Users size={40} />,
      title: t("To'liq va tajribali jamoa", 'Полная и опытная команда', 'Complete and Experienced Team'),
      description: t(
        "Jamoa a'zolari dasturiy mahsulotni ishlab chiqish bo'yicha to'liq tarkibli yig'ilgan va tajribali. SI/ML muhandislari, mobil dasturchilar, backend va frontend mutaxassislari. Har bir yo'nalish professional darajada qamrab olingan.",
        'Члены команды собраны полным составом и опытны в разработке программных продуктов. Инженеры ИИ/ML, мобильные разработчики, специалисты backend и frontend. Каждое направление охвачено на профессиональном уровне.',
        'Team members assembled in full and experienced in software development. AI/ML engineers, mobile developers, backend and frontend specialists. Every direction covered professionally.'
      ),
      stats: ['5 mutaxassis', 'Full-stack', 'SI/ML', 'Mobile/Web'],
    },
    {
      icon: <Zap size={40} />,
      title: t('Tasdiqlangan yuqori natijalar', 'Подтвержденные высокие результаты', 'Confirmed High Results'),
      description: t(
        "92% aniqlik darajasi real sinov natijalariga asoslangan. 10 soniyada to'liq tahlil va tavsiyalar. 500+ namunada sinovdan o'tgan va tasdiqlangan SI model. Ishonchli va tez ishlash kafolati.",
        '92% точность основана на реальных результатах тестирования. Полный анализ и рекомендации за 10 секунд. ИИ модель протестирована и подтверждена на 500+ образцах. Гарантия надежной и быстрой работы.',
        '92% accuracy based on real test results. Complete analysis and recommendations in 10 seconds. AI model tested and validated on 500+ samples. Guaranteed reliable and fast performance.'
      ),
      stats: ['92% aniqlik', '10 sek', '500+ sinov', 'Ishonchli'],
    },
    {
      icon: <CheckCircle size={40} />,
      title: t('Tayyor prototip va aniq reja', 'Готовый прототип и четкий план', 'Ready Prototype and Clear Plan'),
      description: t(
        "Prototip allaqachon tayyor va real sharoitda sinovdan o'tkazilgan. MVP bosqichida faol ishlab chiqilmoqda. 6 viloyatda beta sinov rejalashtirilgan. Aniq yo'l xaritasi va amalga oshirish bosqichlari.",
        'Прототип уже готов и протестирован в реальных условиях. MVP активно разрабатывается. Запланировано бета-тестирование в 6 регионах. Четкая дорожная карта и этапы реализации.',
        'Prototype already ready and tested in real conditions. MVP being actively developed. Beta testing planned in 6 regions. Clear roadmap and implementation stages.'
      ),
      stats: ['Prototip ✓', 'MVP jarayonda', '6 viloyat', 'Aniq reja'],
    },
  ];

  return (
    <section ref={sectionRef} id="why-deliver" className="py-xl px-4 md:px-lg max-w-[1400px] mx-auto">
      <div className="text-center mb-xl scroll-reveal">
        <span className="inline-block px-5 py-2 bg-light-green text-primary-green rounded-3xl text-sm font-bold font-mono mb-sm uppercase tracking-wider">
          {t('KUCHLI TOMONLAR', 'СИЛЬНЫЕ СТОРОНЫ', 'STRENGTHS')}
        </span>
        <h2 className="text-[clamp(32px,4vw,56px)] font-extrabold text-dark-text mb-sm">
          {t('Nega aynan biz bu muammoni hal qila olamiz', 'Почему именно мы можем решить эту проблему', 'Why We Can Solve This Problem')}
        </h2>
        <p className="text-lg md:text-xl text-gray-text max-w-[800px] mx-auto">
          {t(
            'Bizning jamoamizni boshqa jamoalardan ajratib turuvchi asosiy kuchli tomonlar va raqobat ustunliklari',
            'Основные сильные стороны и конкурентные преимущества, которые отличают нашу команду от других',
            'Key strengths and competitive advantages that distinguish our team from others'
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-lg mt-xl">
        {strengths.map((strength, idx) => (
          <div
            key={idx}
            className="scroll-reveal bg-white p-6 md:p-lg rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] border-l-4 border-primary-green transition-all hover:translate-y-[-8px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-l-8"
          >
            <div className="text-primary-green mb-4">
              {strength.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-dark-text mb-3">{strength.title}</h3>
            <p className="text-gray-text leading-relaxed mb-4 text-sm md:text-base">{strength.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {strength.stats.map((stat, i) => (
                <span
                  key={i}
                  className="inline-block px-3 py-1.5 bg-light-green text-primary-green rounded-full text-xs font-bold"
                >
                  {stat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="scroll-reveal mt-xl bg-gradient-to-br from-primary-green to-deep-green text-white p-6 md:p-xl rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[120px] md:text-[200px] opacity-5">✓</div>
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6">
            {t('Jamoa', 'Команда', 'Team')}
          </h3>
          <p className="text-base md:text-xl leading-relaxed opacity-95">
            {t(
              "Bizning jamoamiz ilmiy baza, xalqaro tajriba, to'liq texnik stek va O'zbekiston sharoitiga chuqur tushunish bilan bu muammoni hal qilishga to'liq tayyor. 500+ namunada tasdiqlangan prototipimiz, 92% aniqlik va aniq yo'l xaritamiz bilan biz bu loyihani muvaffaqiyatli amalga oshirishimizga ishonchimiz komil.",
              'Наша команда полностью готова решить эту проблему с научной базой, международным опытом, полным техническим стеком и глубоким пониманием условий Узбекистана. С нашим прототипом, проверенным на 500+ образцах, точностью 92% и четкой дорожной картой мы уверены в успешной реализации этого проекта.',
              'Our team is fully prepared to solve this problem with scientific foundation, international experience, complete technical stack and deep understanding of Uzbekistan conditions. With our prototype validated on 500+ samples, 92% accuracy and clear roadmap, we are confident in successful implementation of this project.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

export function CurrentStage() {
  const { t } = useLanguage();

  return (
    <section className="py-lg px-4 md:px-lg bg-gradient-to-r from-primary-green to-deep-green">
      <div className="max-w-[1400px] mx-auto text-center text-white">
        <div className="inline-block">
          <div className="text-xs md:text-sm font-bold font-mono uppercase tracking-wider mb-3 opacity-90">
            {t('HOZIRGI BOSQICH', 'ТЕКУЩИЙ ЭТАП', 'CURRENT STAGE')}
          </div>
          <div className="flex items-center justify-center gap-3 md:gap-6 mb-3">
            <div className="text-4xl md:text-6xl">🚀</div>
            <div className="text-left">
              <div className="text-3xl md:text-5xl font-extrabold mb-1">MVP</div>
              <div className="text-sm md:text-lg opacity-90">
                {t('Minimal Hayotiy Mahsulot', 'Минимально Жизнеспособный Продукт', 'Minimum Viable Product')}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-4 md:mt-6">
            <span className="px-3 md:px-4 py-2 bg-white/20 rounded-full text-xs md:text-sm font-semibold backdrop-blur-sm">
              ✓ {t('Prototip tayyor', 'Прототип готов', 'Prototype ready')}
            </span>
            <span className="px-3 md:px-4 py-2 bg-white/20 rounded-full text-xs md:text-sm font-semibold backdrop-blur-sm">
              🔄 {t('MVP ishlab chiqilmoqda', 'MVP в разработке', 'MVP in development')}
            </span>
            <span className="px-3 md:px-4 py-2 bg-white/10 rounded-full text-xs md:text-sm font-semibold backdrop-blur-sm">
              🎯 {t('6 viloyatda beta sinov', 'Бета тест в 6 регионах', 'Beta test in 6 regions')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
