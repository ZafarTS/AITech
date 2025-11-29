'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function AIUsage() {
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

  const aiSteps = [
    {
      step: '01',
      icon: '📸',
      title: t("Rasm olish va pre-processing", 'Захват и предобработка изображения', 'Image Capture & Preprocessing'),
      description: t(
        "Foydalanuvchi telefon kamerasidan tuproq rasmini oladi. Rasm avtomatik ravishda o'lchamga moslashtiriladi, yorqinlik va kontrast normallashtiriladi.",
        'Пользователь делает фото почвы с камеры телефона. Изображение автоматически масштабируется, яркость и контраст нормализуются.',
        'User captures soil image from phone camera. Image is automatically scaled, brightness and contrast normalized.'
      ),
      tech: ['OpenCV', 'Image augmentation', 'Normalization'],
    },
    {
      step: '02',
      icon: '🧠',
      title: t('Deep Learning tahlili', 'Анализ Deep Learning', 'Deep Learning Analysis'),
      description: t(
        "CNN (Convolutional Neural Network) modeli tuproq tasvirini tahlil qiladi. ResNet50 arxitekturasiga asoslangan model tuproq turini, rangini, teksturasini va tarkibini aniqlaydi.",
        'CNN (Convolutional Neural Network) модель анализирует изображение почвы. Модель на основе архитектуры ResNet50 определяет тип почвы, цвет, текстуру и состав.',
        'CNN (Convolutional Neural Network) model analyzes soil image. ResNet50-based model identifies soil type, color, texture and composition.'
      ),
      tech: ['PyTorch', 'ResNet50', 'Transfer Learning'],
    },
    {
      step: '03',
      icon: '🔬',
      title: t("Xususiyatlarni aniqlash", 'Определение характеристик', 'Feature Detection'),
      description: t(
        "Model tuproqning sho'rlanish darajasi, namlik miqdori, organik moddalar mavjudligi va strukturaviy xususiyatlarni aniqlaydi. Har bir xususiyat uchun ishonch darajasi hisoblanadi.",
        'Модель определяет степень засоления, количество влаги, наличие органических веществ и структурные особенности. Для каждой характеристики вычисляется уровень достоверности.',
        'Model determines salinity level, moisture content, organic matter presence and structural features. Confidence level is calculated for each characteristic.'
      ),
      tech: ['Feature extraction', 'Multi-task learning', 'Confidence scoring'],
    },
    {
      step: '04',
      icon: '🌾',
      title: t("Ekin mosligini baholash", 'Оценка пригодности культур', 'Crop Suitability Assessment'),
      description: t(
        "Aniqlangan tuproq xususiyatlari asosida AI model qaysi ekinlar uchun tuproq mos ekanligini baholaydi. G'alla, paxta, sabzavotlar va mevalar uchun moslik koeffitsiyenti hisoblanadi.",
        'На основе определенных характеристик почвы AI модель оценивает, для каких культур подходит почва. Вычисляется коэффициент пригодности для зерновых, хлопка, овощей и фруктов.',
        'Based on identified soil characteristics, AI model assesses which crops the soil is suitable for. Suitability coefficient is calculated for grains, cotton, vegetables and fruits.'
      ),
      tech: ['Classification', 'Recommendation system', 'Rule-based AI'],
    },
    {
      step: '05',
      icon: '💡',
      title: t('Tavsiyalar generatsiyasi', 'Генерация рекомендаций', 'Recommendations Generation'),
      description: t(
        "AI model fermerga aniq amaliy tavsiyalar beradi: qanday o'g'it ishlatish, sug'orish rejimi, tuproqni yaxshilash usullari va kutilayotgan hosildorlik haqida ma'lumot.",
        'AI модель дает фермеру четкие практические рекомендации: какие удобрения использовать, режим полива, методы улучшения почвы и информацию о предполагаемой урожайности.',
        'AI model provides farmer with clear practical recommendations: which fertilizers to use, irrigation schedule, soil improvement methods and expected yield information.'
      ),
      tech: ['NLP', 'Knowledge base', 'Expert system'],
    },
  ];

  const aiCapabilities = [
    {
      icon: '🎯',
      title: t('Yuqori aniqlik', 'Высокая точность', 'High Accuracy'),
      value: '92%',
      description: t(
        "500+ namunada sinovdan o'tgan va tasdiqlangan",
        'Протестировано и подтверждено на 500+ образцах',
        'Tested and validated on 500+ samples'
      ),
    },
    {
      icon: '⚡',
      title: t('Tez ishlov berish', 'Быстрая обработка', 'Fast Processing'),
      value: '3 sek',
      description: t('Rasmdan natijagacha', 'От фото до результата', 'From photo to result'),
    },
    {
      icon: '📡',
      title: t('Offlayn ishlash', 'Работа оффлайн', 'Offline Operation'),
      value: '100%',
      description: t('Internet talab qilinmaydi', 'Интернет не требуется', 'No internet required'),
    },
    {
      icon: '🌱',
      title: t('Ekin turlari', 'Типы культур', 'Crop Types'),
      value: '15+',
      description: t('Aniqlash va tavsiya berish', 'Определение и рекомендации', 'Detection and recommendations'),
    },
  ];

  return (
    <section ref={sectionRef} id="ai-usage" className="py-xl px-lg bg-gradient-to-b from-white via-light-green/20 to-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-xl scroll-reveal">
          <span className="inline-block px-5 py-2 bg-primary-green text-white rounded-3xl text-sm font-bold font-mono mb-sm uppercase tracking-wider">
            {t("SUN'IY INTELLEKT", 'ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ', 'ARTIFICIAL INTELLIGENCE')}
          </span>
          <h2 className="text-[clamp(36px,4vw,56px)] font-extrabold text-dark-text mb-sm">
            {t("AI dan qanday foydalanamiz", 'Как мы используем AI', 'How We Use AI')}
          </h2>
          <p className="text-xl text-gray-text max-w-[800px] mx-auto">
            {t(
              "Tuproq tahlilida sun'iy intellekt texnologiyalarining qo'llanilishi - rasmdan tortib tavsiygacha",
              'Применение технологий искусственного интеллекта в анализе почвы - от фото до рекомендаций',
              'Application of artificial intelligence technologies in soil analysis - from photo to recommendations'
            )}
          </p>
        </div>

        {/* AI Pipeline Steps */}
        <div className="space-y-lg mb-xl">
          {aiSteps.map((step, idx) => (
            <div
              key={idx}
              className={`scroll-reveal grid md:grid-cols-[120px_1fr] gap-lg items-start ${
                idx % 2 === 0 ? '' : 'md:grid-flow-dense'
              }`}
            >
              {/* Step Number Circle */}
              <div className={`flex flex-col items-center ${idx % 2 === 0 ? '' : 'md:order-2'}`}>
                <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-primary-green to-deep-green text-white flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(31,160,63,0.3)]">
                  <div className="text-5xl mb-1">{step.icon}</div>
                  <div className="text-2xl font-extrabold font-mono">{step.step}</div>
                </div>
                {idx < aiSteps.length - 1 && (
                  <div className="w-1 flex-1 bg-gradient-to-b from-primary-green to-accent-lime min-h-[60px] mt-4" />
                )}
              </div>

              {/* Step Content */}
              <div className={`bg-white p-lg rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.06)] ${idx % 2 === 0 ? '' : 'md:order-1'}`}>
                <h3 className="text-2xl font-extrabold text-dark-text mb-sm">{step.title}</h3>
                <p className="text-gray-text leading-relaxed mb-md">{step.description}</p>
                
                {/* Technologies used */}
                <div className="flex flex-wrap gap-2">
                  {step.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-light-green text-primary-green rounded-lg text-sm font-bold border border-primary-green/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Capabilities Grid */}
        <div className="scroll-reveal">
          <h3 className="text-3xl font-extrabold text-center text-dark-text mb-lg">
            {t("AI imkoniyatlari", 'Возможности AI', 'AI Capabilities')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-md">
            {aiCapabilities.map((capability, idx) => (
              <div
                key={idx}
                className="bg-white p-lg rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.06)] text-center transition-all hover:translate-y-[-8px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] border-t-4 border-primary-green"
              >
                <div className="text-6xl mb-sm">{capability.icon}</div>
                <h4 className="text-lg font-bold text-dark-text mb-2">{capability.title}</h4>
                <div className="text-5xl font-extrabold text-primary-green font-mono mb-2">{capability.value}</div>
                <p className="text-sm text-gray-text">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Model Architecture Info */}
        <div className="scroll-reveal mt-xl bg-gradient-to-br from-dark-text to-[#2A2A2A] text-white p-xl rounded-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[200px] opacity-5">🧠</div>
          <div className="relative z-10">
            <h3 className="text-3xl font-extrabold mb-md">
              {t('Model arxitekturasi', 'Архитектура модели', 'Model Architecture')}
            </h3>
            <div className="grid md:grid-cols-3 gap-lg">
              <div>
                <h4 className="text-xl font-bold text-accent-lime mb-sm">
                  {t("O'qitish", 'Обучение', 'Training')}
                </h4>
                <ul className="space-y-2 text-white/90">
                  <li>• 500+ {t('tuproq tasvirlari', 'изображений почвы', 'soil images')}</li>
                  <li>• Transfer Learning (ImageNet)</li>
                  <li>• Data Augmentation</li>
                  <li>• {t('5 tuproq klassi', '5 классов почвы', '5 soil classes')}</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-accent-lime mb-sm">
                  {t('Optimallashtirish', 'Оптимизация', 'Optimization')}
                </h4>
                <ul className="space-y-2 text-white/90">
                  <li>• ONNX {t('konvertatsiya', 'конвертация', 'conversion')}</li>
                  <li>• {t('Model hajmi', 'Размер модели', 'Model size')}: ~25MB</li>
                  <li>• Quantization (INT8)</li>
                  <li>• Mobile-{t('optimallashtirilgan', 'оптимизировано', 'optimized')}</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-accent-lime mb-sm">
                  {t('Natijalar', 'Результаты', 'Results')}
                </h4>
                <ul className="space-y-2 text-white/90">
                  <li>• 92% {t('aniqlik', 'точность', 'accuracy')}</li>
                  <li>• 3 {t('soniyada javob', 'секунды ответ', 'seconds response')}</li>
                  <li>• {t('Offlayn ishlaydi', 'Работает оффлайн', 'Works offline')}</li>
                  <li>• {t('Ishonchli prognoz', 'Надежный прогноз', 'Reliable prediction')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
