'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: t("Ilova qanday ishlaydi?", 'Как работает приложение?', 'How does the app work?'),
      a: t(
        "Telefon kamerasidan tuproq rasmini oling. SI model 10 soniyada tahlil qilib, tuproq turi, sho'rlanish, namlik va ekin uchun mosligi haqida batafsil natija beradi. Hammasini offlayn!",
        'Сделайте фото почвы с камеры телефона. ИИ модель за 10 секунд анализирует и дает подробные результаты о типе почвы, засолении, влажности и пригодности для культур. Все оффлайн!',
        'Take a soil photo from your phone camera. AI model analyzes in 10 seconds and provides detailed results about soil type, salinity, moisture and crop suitability. All offline!'
      )
    },
    {
      q: t('Internet kerakmi?', 'Нужен интернет?', 'Is internet required?'),
      a: t(
        "Yo'q, ilova to'liq offlayn ishlaydi. SI model to'g'ridan-to'g'ri telefoningizda ishga tushadi. Dalada, tog'da, internetsi qishloqda - har qanday joyda ishlatish mumkin.",
        'Нет, приложение работает полностью оффлайн. ИИ модель запускается прямо на вашем телефоне. В поле, в горах, в деревне без интернета - можно использовать везде.',
        'No, the app works completely offline. AI model runs directly on your phone. In the field, mountains, village without internet - can be used anywhere.'
      )
    },
    {
      q: t('Qaysi ekinlar uchun tavsiya beradi?', 'Для каких культур дает рекомендации?', 'For which crops does it recommend?'),
      a: t(
        "15+ ekin turi: g'alla (bug'doy, arpa), paxta, sabzavotlar (pomidor, bodring, piyoz), mevalar (olma, olxo'ri, shaftoli), poliz ekinlari va boshqalar. Har biri uchun moslik darajasi va hosildorlik prognozi.",
        '15+ типов культур: зерновые (пшеница, ячмень), хлопок, овощи (помидор, огурец, лук), фрукты (яблоко, абрикос, персик), бахчевые и другие. Для каждого уровень пригодности и прогноз урожайности.',
        '15+ crop types: grains (wheat, barley), cotton, vegetables (tomato, cucumber, onion), fruits (apple, apricot, peach), melons and others. Suitability level and yield forecast for each.'
      )
    },
    {
      q: t('Qanchalik aniq?', 'Насколько точно?', 'How accurate?'),
      a: t(
        "92% aniqlik darajasi. 500+ namunada sinovdan o'tgan va O'zbekiston tuproqlariga maxsus moslashtirilgan. Laboratoriya tahlili bilan solishtirish natijalari 90%+ moslik ko'rsatadi.",
        '92% точность. Протестировано на 500+ образцах и специально адаптировано к почвам Узбекистана. Результаты сравнения с лабораторным анализом показывают 90%+ совпадение.',
        '92% accuracy. Tested on 500+ samples and specially adapted to Uzbekistan soils. Comparison results with laboratory analysis show 90%+ match.'
      )
    },
    {
      q: t('Qachon ishga tushadi?', 'Когда запустится?', 'When will it launch?'),
      a: t(
        "Hozir MVP bosqichida. 2026 yil 1-2-chorakda 6 viloyatda beta sinov boshlanadi. To'liq ishga tushirish 2026 yil 3-chorakda rejalashtirilgan. Erta kirish uchun ro'yxatdan o'ting!",
        'Сейчас на этапе MVP. Во 1-2 квартале 2026 года начнется бета-тестирование в 6 регионах. Полный запуск запланирован на 3 квартал 2026 года. Зарегистрируйтесь для раннего доступа!',
        'Currently at MVP stage. Beta testing will start in 6 regions in Q1,Q2 2026. Full launch planned for Q3 2026. Register for early access!'
      )
    },
    {
      q: t('Narxi qancha?', 'Сколько стоит?', 'How much does it cost?'),
      a: t(
        "Asosiy tahlil funksiyalari bepul. Kengaytirilgan tavsiyalar, o'g'it hisob-kitoblari va mavsumiy monitoring uchun premium obuna: oyiga 49,000 so'm yoki yiliga 490,000 so'm (2 oy bepul!).",
        'Основные функции анализа бесплатны. Для расширенных рекомендаций, расчетов удобрений и сезонного мониторинга премиум подписка: 49,000 сум/месяц или 490,000 сум/год (2 месяца бесплатно!).',
        'Basic analysis functions are free. For advanced recommendations, fertilizer calculations and seasonal monitoring premium subscription: 49,000 sum/month or 490,000 sum/year (2 months free!).'
      )
    }
  ];

  return (
    <section id="faq" className="py-xl px-4 md:px-lg bg-light-green/30">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-xl">
          <span className="inline-block px-5 py-2 bg-primary-green text-white rounded-3xl text-sm font-bold font-mono mb-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-[clamp(32px,4vw,56px)] font-extrabold text-dark-text mb-sm">
            {t("Tez-tez so'raladigan savollar", 'Часто задаваемые вопросы', 'Frequently Asked Questions')}
          </h2>
          <p className="text-lg md:text-xl text-gray-text">
            {t(
              'Loyiha haqida eng ko\'p beriladigan savollar va javoblar',
              'Самые частые вопросы о проекте и ответы на них',
              'Most common questions about the project and their answers'
            )}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-lg text-dark-text hover:text-primary-green transition-colors"
              >
                <span className="flex-1 pr-4">{faq.q}</span>
                <ChevronDown
                  size={24}
                  className={`flex-shrink-0 text-primary-green transition-transform ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-light-green">
                    <p className="text-gray-text leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-xl text-center bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-extrabold text-dark-text mb-4">
            {t("Boshqa savolingiz bormi?", 'Есть другой вопрос?', 'Have another question?')}
          </h3>
          <p className="text-gray-text mb-6">
            {t(
              "Biz bilan bog'laning va barcha savollaringizga javob beramiz",
              'Свяжитесь с нами и мы ответим на все ваши вопросы',
              'Contact us and we will answer all your questions'
            )}
          </p>
          <a
            href="mailto:info@agrotahlilchi.uz"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-green to-deep-green text-white font-bold rounded-lg hover:shadow-xl transition-all hover:translate-y-[-2px]"
          >
            {t("Bog'lanish", 'Связаться', 'Contact Us')}
          </a>
        </div>
      </div>
    </section>
  );
}
