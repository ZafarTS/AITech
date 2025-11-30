'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Github, Globe, Linkedin } from 'lucide-react';

export default function Team() {
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

  const teamMembers = [
    {
      name: "Komil Usmanov",
      image: "/users/user2.jpg",
      initials: "KU",
      role: t('SI muhandisi', 'AI инженер', 'AI Engineer'),
      details: 'ML/DL, CV\n' + t('Optimallashtirish', 'Оптимизация', 'Optimization') + '\nPyTorch',
      phone: '+998909977078',
      github: 'https://github.com/Komiljon7078',
      portfolio: '#',
    },
    {
      name: "Asadbek Xo'jaboyev",
      image: "/users/user3.jpg",
      initials: "AX",
      role: t('Frontend dasturchi', 'Frontend разработчик', 'Frontend Developer'),
      details: 'React.js, Next.js\nRedux, Zustand\n Material UI, Expo, Tailwind CSS, Mobile app development',
      phone: '+998884501119',
      github: 'https://github.com/khujaboyev00',
      portfolio: 'https://khujaboevv.netlify.app',
    },
    {
      name: 'Ibrohimjon Baxtiyorov',
      image: "/users/user4.jpg",
      initials: 'IB',
      role: t('Frontend dasturchi', 'Frontend разработчик', 'Frontend Developer'),
      details: 'React.js, Next.js\nRedux, Zustand\n Material UI, Tailwind CSS, Mobile app development',
      phone: '+998942295494',
      github: 'https://github.com/IbrohimjonBaxtiyorov',
      portfolio: 'https://portfolio-two-psi-58.vercel.app/',
    },
    {
      name: 'Zuhra Erkayeva',
      image: "/users/user5.jpg",
      initials: 'ZE',
      role: t('Backend dasturchi', 'Backend разработчик', 'Backend Developer'),
      details: 'Python, Django\nREST API, JWT\nPostgreSQL',
      phone: '+998936650504',
      github: 'https://github.com/ZuhraErkayeva',
      portfolio: '#',
    },
  ];

  return (
    <section id="team" ref={sectionRef} className="py-xl px-4 md:px-lg max-w-[1400px] mx-auto">
      <div className="text-center mb-xl scroll-reveal">
        <span className="inline-block px-5 py-2 bg-light-green text-primary-green rounded-3xl text-sm font-bold font-mono mb-sm uppercase tracking-wider">
          {t('JAMOA', 'КОМАНДА', 'TEAM')}
        </span>
        <h2 className="text-[clamp(32px,4vw,56px)] font-extrabold text-dark-text mb-sm">AITECH</h2>
        <p className="text-lg md:text-xl text-gray-text max-w-[700px] mx-auto">
          {t(
            'Toshkent kimyo-texnologiya instituti, Avtomatlashtirish va raqamli boshqaruv kafedrasi',
            'Ташкентский химико-технологический институт, Кафедра автоматизации и цифрового управления',
            'Tashkent Institute of Chemical Technology, Department of Automation and Digital Management'
          )}
        </p>
      </div>

      <div className="mt-xl">
        {/* Team Lead */}
        <div className="max-w-[900px] mx-auto mb-xl scroll-reveal">
          <div className="bg-gradient-to-br from-white to-light-green p-6 md:p-xl rounded-xl shadow-[0_20px_60px_rgba(31,160,63,0.15)] grid md:grid-cols-[auto_1fr] gap-6 md:gap-lg items-center relative overflow-hidden border-4 border-primary-green">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-primary-green to-deep-green flex items-center justify-center text-5xl md:text-7xl text-white font-extrabold border-8 border-white shadow-[0_15px_50px_rgba(31,160,63,0.3)] flex-shrink-0 mx-auto md:mx-0 overflow-hidden">
             <img
  src="/users/user1.jpg"
  alt="Zafar To'raqulov"
  className="w-full h-full object-cover"
  onError={(e) => {
    const sibling = e.currentTarget.nextElementSibling;

    // image'ni yashiramiz
    e.currentTarget.style.display = 'none';

    // sibling mavjudligini tekshiramiz
    if (sibling instanceof HTMLElement) {
      sibling.style.display = 'flex';
    }
  }}
/>

<span className="hidden">ZT</span>
            </div>
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-2 bg-primary-green text-white rounded-full text-sm font-bold mb-3">
                🏆 {t('Loyiha rahbari', 'Руководитель проекта', 'Project Lead')}
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-dark-text mb-2">Zafar To'raqulov</h3>
              <p className="text-lg md:text-xl text-primary-green font-bold mb-3">
                {t('Loyiha menejeri / SI muhandisi, OpenCV, Pytorch, Numpy, Matplotlib', 'Менеджер проекта / AI инженер, OpenCV, Pytorch', 'Project Manager / AI Engineer, OpenCV, Pytorch')}
              </p>
              <p className="text-sm md:text-base text-gray-text leading-relaxed mb-4">
                {t(
                  "5+ yil tajriba: Sun'iy intellekt (ML/DL), Data Science Kompyuter ko'rishi, Remote Sensing. TKTI da SPMC guruhi rahbari • TKTI",
                  '5+ лет опыта: ИИ, Data Science (ML/DL), Компьютерное зрение, Remote Sensing. SPMC Group Lead в ТХТИ',
                  '5+ years experience: AI (ML/DL), Data Science, Computer Vision, Remote Sensing.  SPMC Group Lead in TCTI'
                )}
              </p>
              <div className="flex gap-2 justify-center md:justify-start flex-wrap">
                <a href="tel:+998946366355" className="w-10 h-10 rounded-lg bg-light-green flex items-center justify-center text-primary-green hover:bg-primary-green hover:text-white transition-all" title="Telefon">
                  <Phone size={18} />
                </a>
                <a href="https://github.com/ZafarTS" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-light-green flex items-center justify-center text-primary-green hover:bg-primary-green hover:text-white transition-all" title="GitHub">
                  <Github size={18} />
                </a>
                <a href="https://zafarts.uz/my" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-light-green flex items-center justify-center text-primary-green hover:bg-primary-green hover:text-white transition-all" title="Portfolio">
                  <Globe size={18} />
                </a>
                <a href="https://orcid.org/0000-0002-8664-5306" target="_blank" rel="noopener noreferrer" className="px-3 h-10 rounded-lg bg-light-green flex items-center justify-center text-primary-green hover:bg-primary-green hover:text-white transition-all text-xs font-bold" title="ORCiD">
                  ORCiD
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="scroll-reveal bg-white p-6 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] text-center hover:translate-y-[-8px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-green to-deep-green flex items-center justify-center mx-auto mb-4 text-4xl text-white font-extrabold border-4 border-light-green shadow-[0_8px_30px_rgba(31,160,63,0.2)] overflow-hidden">
                <img
  src={member.image}
  alt={member.name}
  className="w-full h-full object-cover"
  onError={(e) => {
    const sibling = e.currentTarget.nextElementSibling;

    e.currentTarget.style.display = 'none';

    if (sibling instanceof HTMLElement) {
      sibling.style.display = 'flex';
    }
  }}
/>
<span className="hidden">{member.initials}</span>
              </div>
              <h3 className="text-lg font-extrabold text-dark-text mb-2">{member.name}</h3>
              <p className="text-sm text-primary-green font-bold mb-3">{member.role}</p>
              <p className="text-xs text-gray-text leading-relaxed mb-4 whitespace-pre-line">{member.details}</p>
              <div className="flex gap-2 justify-center">
                <a href={`tel:${member.phone}`} className="w-9 h-9 rounded-lg bg-light-green flex items-center justify-center text-primary-green hover:bg-primary-green hover:text-white transition-all">
                  <Phone size={16} />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-light-green flex items-center justify-center text-primary-green hover:bg-primary-green hover:text-white transition-all">
                  <Github size={16} />
                </a>
                <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-light-green flex items-center justify-center text-primary-green hover:bg-primary-green hover:text-white transition-all">
                  <Globe size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary-green to-deep-green text-white p-4 md:p-6 rounded-xl text-center mt-xl text-xl md:text-2xl font-extrabold shadow-[0_10px_40px_rgba(31,160,63,0.3)] scroll-reveal">
          {t('🏆 AITECH — Kelajak uchun sun\'iy intellekt yechimlari', '🏆 AITECH — Решения ИИ для будущего', '🏆 AITECH — AI Solutions for the future')}
        </div>
      </div>
    </section>
  );
}
