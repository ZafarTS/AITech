'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Achievements() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [counters, setCounters] = useState({ samples: 0, accuracy: 0, speed: 0, members: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = { samples: 500, accuracy: 92, speed: 3, members: 5 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounters({
        samples: Math.floor(targets.samples * progress),
        accuracy: Math.floor(targets.accuracy * progress),
        speed: Math.floor(targets.speed * progress),
        members: Math.floor(targets.members * progress),
      });

      if (step >= steps) {
        setCounters(targets);
        clearInterval(timer);
      }
    }, increment);
  };

  return (
    <section ref={sectionRef} className="py-xl px-lg bg-gradient-to-br from-primary-green to-deep-green text-white text-center">
      <div className="max-w-[1400px] mx-auto">
        <span className="inline-block px-5 py-2 bg-white/20 text-white rounded-3xl text-sm font-bold font-mono mb-sm uppercase tracking-wider">
          {t('Yutuqlar', 'Достижения', 'Achievements')}
        </span>
        <h2 className="text-[clamp(36px,4vw,56px)] font-extrabold text-white mb-sm">
          {t('Loyiha natijalari', 'Результаты проекта', 'Project Results')}
        </h2>
        <p className="text-xl text-white/90 max-w-[700px] mx-auto mb-xl">
          {t('Bizning ishimiz raqamlarda', 'Наша работа в цифрах', 'Our work in numbers')}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-lg mt-xl">
          {[
            { icon: '🧪', value: counters.samples, suffix: '+', label: t('Tahlil qilingan namuna', 'Проанализировано образцов', 'Samples Analyzed') },
            { icon: '🎯', value: counters.accuracy, suffix: '%', label: t('Aniqlik darajasi', 'Точность', 'Accuracy') },
            { icon: '⚡', value: counters.speed, suffix: '', label: t('soniyada natija', 'секунды результат', 'seconds result') },
            { icon: '🏆', value: counters.members, suffix: '', label: t("Loyiha a'zolari", 'Членов команды', 'Team Members') },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-lg bg-white/10 backdrop-blur-[10px] rounded-md border-2 border-white/20 transition-all hover:bg-white/15 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="text-5xl mb-sm inline-block animate-bounce-slow">{stat.icon}</div>
              <div className="text-6xl font-extrabold leading-none mb-sm text-accent-lime font-mono">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-lg font-semibold opacity-95">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why() {
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

  const reasons = [
    {
      title: t("To'liq ishlab chiqarish sikli", 'Полный производственный цикл', 'Full Production Cycle'),
      desc: t(
        'SI modellaridan to mobil ilova joylashtirish va foydalanuvchi tajribasigacha barcha bosqichlarni amalga oshiramiz',
        'Реализуем все этапы от AI моделей до развертывания мобильного приложения и пользовательского опыта',
        'We implement all stages from AI models to mobile app deployment and user experience'
      ),
    },
    {
      title: t('Xalqaro tajriba', 'Международный опыт', 'International Experience'),
      desc: t(
        'Xalqaro loyihalarda ishtirok etilgan (DePRO, SAP - Kantabriya universiteti, Ispaniya). Remote Sensing, IoT, va SI yechimlarida tajribaga egamiz',
        'Участвовали в международных проектах (DePRO, SAP - Университет Кантабрии, Испания). Имеем опыт в Remote Sensing, IoT и AI решениях',
        'Participated in international projects (DePRO, SAP - University of Cantabria, Spain). Have experience in Remote Sensing, IoT, and AI solutions'
      ),
    },
    {
      title: t("Agro-texnologiya bo'yicha bilim", 'Знания агро-технологий', 'Agro-technology Knowledge'),
      desc: t(
        "Tuproqshunoslik, melioratsiya va qishloq xo'jaligi bo'yicha chuqur bilimga ega mutaxasislar bilan maslahatlashilgan. O'zbekiston sharoitiga maxsus yechimlar",
        'Были привлечены специалисты, обладающие глубокими знаниями в области почвоведения, мелиорации и сельского хозяйства. Специализированные решения для условий Узбекистана',
        'Experts with in-depth knowledge of soil science, land reclamation, and agriculture were consulted. Specialized solutions for Uzbekistan conditions'
      ),
    },
    {
      title: t('Tayyor prototiplar', 'Готовые прототипы', 'Ready Prototypes'),
      desc: t(
        "1+ prototip allaqachon tayyor va sinovdan o'tgan. 500+ tasvirdagi natijalar bilan tasdiqlangan model",
        '1+ прототипа уже готовы и протестированы. Модель подтверждена результатами на 500+ изображениях',
        '1+ prototypes are already ready and tested. Model validated with results on 500+ images'
      ),
    },
  ];

  return (
    <section ref={sectionRef} id="why" className="py-xl px-lg max-w-[1400px] mx-auto">
      <div className="text-center mb-xl scroll-reveal">
        <span className="inline-block px-5 py-2 bg-light-green text-primary-green rounded-3xl text-sm font-bold font-mono mb-sm uppercase tracking-wider">
          {t('Qobiliyat', 'Возможности', 'Capability')}
        </span>
        <h2 className="text-[clamp(36px,4vw,56px)] font-extrabold text-dark-text mb-sm">
          {t('Nega biz amalga oshira olamiz', 'Почему мы можем реализовать', 'Why We Can Deliver')}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-md mt-xl">
        {reasons.map((reason, idx) => (
          <div
            key={idx}
            className="scroll-reveal bg-white p-lg rounded-md border-l-4 border-primary-green shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all hover:translate-x-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
          >
            <h3 className="text-xl font-bold text-dark-text mb-sm flex items-center gap-sm">
              <span className="w-6 h-6 bg-light-green rounded-md flex items-center justify-center text-primary-green flex-shrink-0">✓</span>
              {reason.title}
            </h3>
            <p className="text-gray-text leading-[1.7]">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Roadmap() {
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

  const timeline = [
    {
      icon: '💡',
      status: { label: t('Bajarildi', 'Выполнено', 'Completed'), color: 'bg-light-green text-primary-green' },
      title: t("G'oya", 'Идея', 'Idea'),
      items: [
        t('Tuproq rasmidan SI tahlil g\'oyasi', 'Идея AI анализа из фото почвы', 'Idea of AI analysis from soil photo'),
        t('Offlayn SI yordamchi konsepsiyasi', 'Концепция оффлайн AI помощника', 'Offline AI assistant concept'),
        t('Ekin moslik modeli', 'Модель пригодности культур', 'Crop suitability model'),
      ],
    },
    {
      icon: '🔬',
      status: { label: t('Bajarildi', 'Выполнено', 'Completed'), color: 'bg-light-green text-primary-green' },
      title: t('Prototip', 'Прототип', 'Prototype'),
      items: [
        'PyTorch ' + t('tasvir tasnifi modeli', 'модель классификации изображений', 'image classification model'),
        t('Mobil UI demo', 'Мобильный UI демо', 'Mobile UI demo'),
        '500+ ' + t('tasvirdagi natijalar', 'изображений результаты', 'images results'),
      ],
    },
    {
      icon: '🚀',
      status: { label: t('Jarayonda', 'В процессе', 'In Progress'), color: 'bg-[#FFF3E0] text-[#F57C00]' },
      title: 'MVP',
      items: [
        t("To'liq konveyer", 'Полный конвейер', 'Full pipeline'),
        'Backend REST API',
        'React Native ' + t('ilova', 'приложение', 'app'),
        t('Offlayn model xulosa chiqarish', 'Оффлайн вывод модели', 'Offline model inference'),
      ],
    },
    {
      icon: '🎯',
      status: { label: t('Yaqinda', 'Скоро', 'Coming Soon'), color: 'bg-[#E3F2FD] text-[#1976D2]' },
      title: t('Ishga tushirish', 'Запуск', 'Launch'),
      items: [
        'Beta ' + t('versiya chiqarish', 'релиз', 'release'),
        '5 ' + t('viloyatda sinov', 'регионах тестирование', 'regions testing'),
        t('Agrotexnika SI-agent qo\'shiladi', 'Добавляется ИИ-агент агротехники', 'AI-agent for agrotechnology added'),
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="roadmap" className="py-xl px-lg bg-light-green">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-xl scroll-reveal">
          <span className="inline-block px-5 py-2 bg-light-green text-primary-green rounded-3xl text-sm font-bold font-mono mb-sm uppercase tracking-wider border-2 border-primary-green/20">
            {t('Reja', 'План', 'Plan')}
          </span>
          <h2 className="text-[clamp(36px,4vw,56px)] font-extrabold text-dark-text mb-sm">
            {t("Yo'l xaritasi", 'Дорожная карта', 'Roadmap')}
          </h2>
          <p className="text-xl text-gray-text max-w-[700px] mx-auto">
            {t("G'oyadan ishlab chiqarishgacha", 'От идеи до производства', 'From Idea to Production')}
          </p>
        </div>

        <div className="relative max-w-[1000px] mx-auto mt-xl">
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-green to-accent-lime -translate-x-1/2" />

          <div className="space-y-xl">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className={`scroll-reveal grid md:grid-cols-2 gap-lg relative ${
                  idx % 2 === 0 ? '' : 'md:grid-flow-dense'
                }`}
              >
                {/* Dot */}
                <div className={`hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 z-10 w-20 h-20 bg-white border-[6px] border-primary-green rounded-full items-center justify-center text-3xl shadow-[0_8px_30px_rgba(31,160,63,0.3)] ${idx % 2 === 0 ? 'md:col-start-1' : ''}`}>
                  {item.icon}
                </div>

                {/* Mobile dot */}
                <div className="md:hidden flex w-16 h-16 bg-white border-4 border-primary-green rounded-full items-center justify-center text-2xl shadow-[0_8px_30px_rgba(31,160,63,0.3)] mb-sm">
                  {item.icon}
                </div>

                {/* Content */}
                <div className={`bg-white p-lg rounded-md shadow-[0_8px_40px_rgba(0,0,0,0.08)] ${idx % 2 === 0 ? '' : 'md:col-start-2'}`}>
                  <span className={`inline-block px-4 py-[6px] rounded-[20px] text-xs font-bold font-mono uppercase mb-sm ${item.status.color}`}>
                    {item.status.label}
                  </span>
                  <h3 className="text-2xl font-extrabold text-dark-text mb-sm">{item.title}</h3>
                  <ul className="flex flex-col gap-2 list-none">
                    {item.items.map((listItem, i) => (
                      <li key={i} className="pl-6 relative text-gray-text before:content-['▸'] before:absolute before:left-0 before:text-primary-green before:font-bold">
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Technologies() {
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

  const techCategories = [
    { icon: '🤖', title: 'AI & ML', items: ['PyTorch', 'ONNX Runtime', 'OpenCV', 'Albumentations'] },
    { icon: '⚙️', title: 'Backend', items: ['Django REST', 'PostgreSQL', 'JWT Auth', 'Docker'] },
    { icon: '📱', title: 'Mobile', items: ['React Native (Expo)', 'Offline-first', 'ONNX/TFLite', 'Local inference'] },
    { icon: '🌐', title: 'Web', items: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Responsive Design'] },
  ];

  return (
    <section ref={sectionRef} id="tech" className="py-xl px-lg max-w-[1400px] mx-auto">
      <div className="text-center mb-xl scroll-reveal">
        <span className="inline-block px-5 py-2 bg-light-green text-primary-green rounded-3xl text-sm font-bold font-mono mb-sm uppercase tracking-wider">
          {t('Texnologiyalar', 'Технологии', 'Technologies')}
        </span>
        <h2 className="text-[clamp(36px,4vw,56px)] font-extrabold text-dark-text mb-sm">
          {t("Qo'llaniladigan texnologiyalar", 'Используемые технологии', 'Technologies Used')}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-lg mt-xl">
        {techCategories.map((category, idx) => (
          <div
            key={idx}
            className="scroll-reveal bg-white p-lg rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-transform hover:translate-y-[-8px]"
          >
            <h3 className="text-xl font-extrabold text-dark-text mb-md flex items-center gap-sm">
              <span className="w-12 h-12 bg-gradient-to-br from-primary-green to-deep-green rounded-xl flex items-center justify-center text-white text-2xl">
                {category.icon}
              </span>
              {category.title}
            </h3>
            <ul className="flex flex-col gap-xs list-none">
              {category.items.map((item, i) => (
                <li key={i} className="px-3 py-2 bg-light-green rounded-lg text-dark-text font-semibold text-sm flex items-center gap-2 before:content-['◆'] before:text-primary-green before:text-[10px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-dark-text to-[#2A2A2A] text-white py-xl px-lg">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-xl mb-lg">
          <div>
            <h2 className="text-3xl font-extrabold text-accent-lime mb-sm">🌱 Agrotahlilchi</h2>
            <p className="text-white/70 leading-[1.8] mb-md">
              {t(
                'SI asosidagi mobil agro-tahlil ilovasi. Tuproqni tahlil qiling va hosilni oshiring.',
                'Мобильное приложение для агро-анализа на базе ИИ. Анализируйте почву и увеличивайте урожай.',
                'AI-powered mobile agro-analysis app. Analyze soil and grow yield.'
              )}
            </p>
            <div className="bg-primary-green p-md rounded-sm mt-md">
              <strong className="block mb-2 text-sm">
                {t('🔗 Demo Link:', '🔗 Демо ссылка:', '🔗 Demo Link:')}
              </strong>
              <a
                href="https://agrotahlilchi.uz/mvp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold break-all no-underline border-b-2 border-white/30 hover:border-white transition-colors"
              >
                https://agrotahlilchi.uz/mvp
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-md text-accent-lime">{t('Jamoa', 'Команда', 'Team')}</h3>
            <ul className="flex flex-col gap-sm list-none">
              <li>
                <a href="#" className="text-white/70 no-underline hover:text-white transition-colors flex items-center gap-2">
                  AITECH
                </a>
              </li>
              <li>
                <a href="tkti.uz" className="text-white/70 no-underline hover:text-white transition-colors flex items-center gap-2">
                  {t('Toshkent kimyo-texnologiya instituti', 'Ташкентский химико-технологический институт', 'Tashkent Institute of Chemical Technology')}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 no-underline hover:text-white transition-colors flex items-center gap-2">
                  {t('Avtomatlashtirish va raqamli boshqaruv kafedrasi', 'Кафедра автоматизации и цифровое управление', 'Department of Automation and Digital Control')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-md text-accent-lime">{t('Havolalar', 'Ссылки', 'Links')}</h3>
            <ul className="flex flex-col gap-sm list-none">
              {[
                { href: '#problem', icon: '💡', label: t('Muammo', 'Проблема', 'Problem') },
                { href: '#team', icon: '👥', label: t('Jamoa', 'Команда', 'Team') },
                { href: '#roadmap', icon: '🗺️', label: t("Yo'l xaritasi", 'Дорожная карта', 'Roadmap') },
                { href: '#tech', icon: '⚙️', label: t('Texnologiyalar', 'Технологии', 'Technologies') },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-white/70 no-underline hover:text-white transition-colors flex items-center gap-2"
                  >
                    {link.icon} {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-lg border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-sm text-white/50 text-center">
          <p>
            &copy; 2025 Agrotahlilchi. AITECH. {t('Barcha huquqlar himoyalangan.', 'Все права защищены.', 'All rights reserved.')}
          </p>
          <p>
            🌱 {t("Agro-texnologiya uchun sun'iy intellekt", 'ИИ для агро-технологий', 'AI for Agro-technology')}
          </p>
        </div>
      </div>
    </footer>
  );
}
