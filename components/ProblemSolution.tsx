'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, TrendingDown, DollarSign, Users, CheckCircle, Zap, Target, Sprout } from 'lucide-react';

export default function ProblemSolution() {
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

  const problems = [
    {
      icon: <TrendingDown size={32} />,
      title: t('Tuproq degradatsiyasi', 'Деградация почвы', 'Soil Degradation'),
      desc: t(
        "O'zbekistonda 2.5 million gektar yer sho'rlangan. Yillik 50,000 gektar yangi yer degradatsiyaga uchraydi. Fermerlar tuproq holatini bilmaydi.",
        'В Узбекистане засолено 2.5 млн га земли. Ежегодно 50,000 га новых земель деградируют. Фермеры не знают состояние почвы.',
        '2.5M hectares of land salinized in Uzbekistan. 50,000 hectares of new land degraded annually. Farmers unaware of soil condition.'
      ),
      stat: '2.5M gektar',
    },
    {
      icon: <AlertTriangle size={32} />,
      title: t("Ma'lumot yetishmasligi", 'Нехватка информации', 'Lack of Information'),
      desc: t(
        "Fermerlarning 80% tuproq holati haqida ma'lumotga ega emas. Real vaqtda tuproq tahlili mavjud emas. Bosqichma-bosqich tuproq holati o'zgarishini kuzatish imkoni yo'q.",
        '80% фермеров не имеют информации о состоянии почвы. Нет анализа почвы в реальном времени. Невозможно отслеживать постепенные изменения.',
        "80% of farmers lack soil information. No real-time soil analysis available. Can't track gradual soil changes."
      ),
      stat: '80% bilmaydi',
    },
    {
      icon: <DollarSign size={32} />,
      title: t('Qimmat tahlillar', 'Дорогой анализ', 'Expensive Analysis'),
      desc: t(
        "Laboratoriya tahlili 200,000-500,000 so'm. 2 hafta vaqt talab qiladi. Kichik fermerlar uchun juda qimmat. Bir mavsumda bir marta ham tekshirib bo'lmaydi.",
        'Лабораторный анализ 200К-500К сум. Требуется 2 недели. Слишком дорого для мелких фермеров. Невозможно проверить даже раз за сезон.',
        'Laboratory test costs 200K-500K sum. Takes 2 weeks. Too expensive for small farmers. Cannot test even once per season.'
      ),
      stat: '200K-500K so\'m',
    },
    {
      icon: <Users size={32} />,
      title: t("Noto'g'ri ekin tanlash", 'Неправильный выбор культур', 'Wrong Crop Selection'),
      desc: t(
        "Fermerlarning 60% tuproqqa mos bo'lmagan ekin ekadi. Natijada hosildorlik 30-40% past bo'ladi. Yillik yo'qotish milyardlab so'mni tashkil qiladi.",
        '60% фермеров сажают неподходящие культуры. В результате урожайность на 30-40% ниже. Годовые потери составляют миллиарды сумов.',
        '60% of farmers plant unsuitable crops. Results in 30-40% lower yield. Annual losses in billions of sums.'
      ),
      stat: '40% kam hosil',
    },
  ];

  const solutions = [
    {
      icon: <Zap size={32} />,
      title: t('10 soniyada tahlil', 'Анализ за 10 секунд', '10-Second Analysis'),
      desc: t(
        "Rasmga oling → SI tahlil qiladi → Natija va tavsiyalar. Laboratoriyaga borish, kutish va pul to'lash kerak emas. Har kuni, istalgan vaqtda.",
        'Снимите → ИИ анализирует → Результат и рекомендации. Не нужно ходить в лабораторию, ждать и платить. Каждый день, в любое время.',
        'Take photo → AI analyzes → Results and recommendations. No lab visits, waiting or payment needed. Daily, anytime.'
      ),
      stat: '10 sek',
    },
    {
      icon: <CheckCircle size={32} />,
      title: t('To\'liq offlayn', 'Полностью оффлайн', 'Fully Offline'),
      desc: t(
        "Internet talab qilinmaydi. SI model telefoningizda ishlaydi. Dalada, uyda, har qanday joyda. Ma'lumotlaringiz xavfsiz va maxfiy.",
        'Интернет не требуется. ИИ модель работает на вашем телефоне. В поле, дома, в любом месте. Ваши данные в безопасности и конфиденциальны.',
        'No internet required. AI model runs on your phone. In field, at home, anywhere. Your data is safe and private.'
      ),
      stat: '100% offlayn',
    },
    {
      icon: <Target size={32} />,
      title: t('92% aniq natijalar', '92% точные результаты', '92% Accurate Results'),
      desc: t(
        "Tuproq turi, sho'rlanish, namlik, organik moddalar. 500+ namunada sinovdan o'tgan. O'zbekiston tuproqlariga moslashtirilgan. Ishonchli prognoz.",
        'Тип почвы, засоление, влажность, органические вещества. Протестировано на 500+ образцах. Адаптировано к почвам Узбекистана. Надежный прогноз.',
        'Soil type, salinity, moisture, organic matter. Tested on 500+ samples. Adapted to Uzbekistan soils. Reliable prediction.'
      ),
      stat: '92% aniqlik',
    },
    {
      icon: <Sprout size={32} />,
      title: t('15+ ekin uchun tavsiya', 'Рекомендации для 15+ культур', 'Recommendations for 15+ Crops'),
      desc: t(
        "G'alla, paxta, sabzavot, mevalar. Har bir ekin uchun moslik koeffitsiyenti. Hosildorlik prognozi. O'g'it va sug'orish rejasi. Oqilona qaror qabul qiling.",
        'Зерновые, хлопок, овощи, фрукты. Коэффициент пригодности для каждой культуры. Прогноз урожайности. План удобрений и полива. Принимайте обоснованные решения.',
        'Grains, cotton, vegetables, fruits. Suitability coefficient for each crop. Yield prediction. Fertilizer and irrigation plan. Make informed decisions.'
      ),
      stat: '15+ ekin',
    },
  ];

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-xl px-4 md:px-lg max-w-[1400px] mx-auto bg-gradient-to-b from-transparent via-light-green to-transparent"
    >
      <div className="text-center mb-xl scroll-reveal">
        <span className="inline-block px-5 py-2 bg-primary-green text-white rounded-3xl text-sm font-bold font-mono mb-sm uppercase tracking-wider">
          {t('HOZIRGI VAZIYAT', 'ТЕКУЩАЯ СИТУАЦИЯ', 'CURRENT SITUATION')}
        </span>
        <h2 className="text-[clamp(32px,4vw,56px)] font-extrabold text-dark-text mb-sm">
          {t('Muammo → Yechim', 'Проблема → Решение', 'Problem → Solution')}
        </h2>
        <p className="text-lg md:text-xl text-gray-text max-w-[700px] mx-auto">
          {t(
            "Fermerlar hozir qanday muammolarga duch kelmoqda va Agrotahlilchi qanday yordam beradi",
            'С какими проблемами сталкиваются фермеры и как Агротахлилчи помогает',
            'What problems farmers face now and how AgroAnalyzer helps'
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-lg mt-xl">
        {/* Problem Card */}
        <div className="scroll-reveal bg-white p-6 md:p-lg rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all hover:translate-y-[-8px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[6px] before:bg-gradient-to-r before:from-[#FF6B6B] before:to-[#FF8E53]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#FFE5E5] to-[#FFF0E5] text-[#FF6B6B] flex-shrink-0">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold">{t('Muammolar', 'Проблемы', 'Problems')}</h3>
          </div>

          <div className="space-y-4">
            {problems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-[#FF6B6B] hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="text-[#FF6B6B] flex-shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-dark-text text-base md:text-lg">{item.title}</h4>
                      <span className="px-3 py-1 bg-[#FF6B6B] text-white rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0">
                        {item.stat}
                      </span>
                    </div>
                    <p className="text-sm text-gray-text leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Card */}
        <div className="scroll-reveal bg-white p-6 md:p-lg rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all hover:translate-y-[-8px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[6px] before:bg-gradient-to-r before:from-primary-green before:to-accent-lime">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-light-green to-[#D4F5E0] text-primary-green flex-shrink-0">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold">{t('Yechimlar', 'Решения', 'Solutions')}</h3>
          </div>

          <div className="space-y-4">
            {solutions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-primary-green hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="text-primary-green flex-shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-dark-text text-base md:text-lg">{item.title}</h4>
                      <span className="px-3 py-1 bg-primary-green text-white rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0">
                        {item.stat}
                      </span>
                    </div>
                    <p className="text-sm text-gray-text leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="scroll-reveal mt-xl bg-gradient-to-r from-primary-green to-deep-green text-white p-6 md:p-xl rounded-xl shadow-2xl">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
            {t('Kutilayotgan ta\'sir', 'Ожидаемое влияние', 'Expected Impact')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8">
            <div>
              <div className="text-3xl md:text-5xl font-extrabold text-accent-lime mb-2">200x</div>
              <div className="text-sm opacity-90">{t('Arzonroq tahlil', 'Дешевле анализ', 'Cheaper analysis')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extrabold text-accent-lime mb-2">1000x</div>
              <div className="text-sm opacity-90">{t('Tezroq natija', 'Быстрее результат', 'Faster result')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extrabold text-accent-lime mb-2">30%</div>
              <div className="text-sm opacity-90">{t('Hosil oshishi', 'Рост урожая', 'Yield increase')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extrabold text-accent-lime mb-2">100K+</div>
              <div className="text-sm opacity-90">{t('Fermerlar uchun', 'Для фермеров', 'For farmers')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
