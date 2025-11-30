'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Send, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AgronomTogha() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        role: 'assistant' as const,
        content: getWelcomeMessage(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, lang]);

  const getWelcomeMessage = () => {
    const welcomeMessages = {
      uz: "Assalomu alaykum! Men Agronom tog'a, Agrotahlilchi loyihasi bo'yicha sizga yordam berish uchun sun'iy intellekt yordamchiman. Loyiha haqida nimani bilmoqchisiz?",
      ru: 'Здравствуйте! Я Агроном дядя, ИИ-помощник по проекту Агротахлилчи. Что вы хотите узнать о проекте?',
      en: "Hello! I'm Agronom Togha, an AI assistant for the AgroAnalyzer project. What would you like to know about the project?"
    };
    return welcomeMessages[lang];
  };

  const getAIResponse = async (userQuestion: string): Promise<string> => {
    const projectContext = {
      uz: `Loyiha: Agrotahlilchi - SI asosidagi mobil agro-tahlil ilovasi
ASOSIY: 10 sek tahlil, 92% aniqlik, offlayn, 15+ ekin, 500+ namuna, 6 viloyat
JAMOA: Zafar To'raqulov (Loyiha rahbari, SI), Komil Usmanov (SI), Asadbek Xo'jaboyev (Frontend), Ibrohimjon Baxtiyorov (Frontend), Zuhra Erkayeva (Backend)
INSTITUT: TKTI, Avtomatlashtirish va raqamli boshqaruv, 10+ Scopus/WoS, DePRO/SAP
TEXNOLOGIYA: PyTorch, ONNX, React Native, Django, Next.js
MUAMMO: 2.5M gektar sho'rlangan, 80% bilmaydi, 200-500K so'm tahlil, 40% kam hosil
YECHIM: 10 sek bepul, offlayn, 92% aniq, ekin tavsiya, o'g'it/sug'orish reja
BOSQICH: Prototip (✓), MVP (jarayonda), Beta (2025 Q2, 6 viloyat), Launch (2025 Q3)
NARX: Asosiy bepul, Premium 49K/oy yoki 490K/yil
KONTAKT: Demo https://agrotahlilchi.uz/mvp, info@agrotahlilchi.uz, +998946366355`,
      ru: `Проект: Агротахлилчи - мобильное приложение на базе ИИ
ОСНОВНОЕ: 10 сек анализ, 92% точность, оффлайн, 15+ культур, 500+ образцов, 6 регионов
КОМАНДА: Зафар (Руководитель, ИИ), Комил (ИИ), Асадбек (Frontend), Иброхимжон (Frontend), Зухра (Backend)
ИНСТИТУТ: ТХТИ, Автоматизация, 10+ Scopus/WoS, DePRO/SAP
ТЕХНОЛОГИИ: PyTorch, ONNX, React Native, Django, Next.js
ПРОБЛЕМЫ: 2.5М га засолено, 80% не знают, 200-500К анализ, 40% потери
РЕШЕНИЕ: 10 сек бесплатно, оффлайн, 92% точно, рекомендации
ЭТАПЫ: Прототип (✓), MVP (процесс), Бета (2025 Q2), Запуск (2025 Q3)
ЦЕНА: Базовый бесплатно, Премиум 49К/мес
КОНТАКТЫ: Demo https://agrotahlilchi.uz/mvp, info@agrotahlilchi.uz, +998946366355`,
      en: `Project: AgroAnalyzer - AI-powered mobile app
MAIN: 10 sec analysis, 92% accuracy, offline, 15+ crops, 500+ samples, 6 regions
TEAM: Zafar (Lead, AI), Komil (AI), Asadbek (Frontend), Ibrohimjon (Frontend), Zuhra (Backend)
INSTITUTE: TCTI, Automation, 10+ Scopus/WoS, DePRO/SAP
TECH: PyTorch, ONNX, React Native, Django, Next.js
PROBLEMS: 2.5M ha salinized, 80% don't know, 200-500K analysis, 40% loss
SOLUTION: 10 sec free, offline, 92% accurate, recommendations
STAGES: Prototype (✓), MVP (progress), Beta (2025 Q2), Launch (2025 Q3)
PRICE: Basic free, Premium 49K/month
CONTACTS: Demo https://agrotahlilchi.uz/mvp, info@agrotahlilchi.uz, +998946366355`
    };

    const context = projectContext[lang];
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: `Sen "Agronom tog'a" yordamchi SI san. Agrotahlilchi loyihasi haqida qisqa (2-4 jumla) javob ber.

KONTEKST: ${context}

SAVOL: ${userQuestion}

Qisqa javob:`
          }]
        })
      });
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      return getDetailedFallbackResponse(userQuestion);
    }
  };

  const getDetailedFallbackResponse = (question: string): string => {
    const q = question.toLowerCase();
    const allResponses = {
      uz: [
        { keywords: ['narx', 'pul', 'to\'la', 'qancha', 'obuna', 'premium', 'bepul'], 
          answer: "Asosiy tahlil funksiyalari bepul. Premium obuna oyiga 49,000 so'm yoki yiliga 490,000 so'm (2 oy bepul!). Premium'da kengaytirilgan tavsiyalar, o'g'it hisob-kitoblari va mavsumiy monitoring mavjud." },
        { keywords: ['qanday', 'ishla', 'foydalan', 'use'],
          answer: "Juda oddiy! Telefon kamerasidan tuproq rasmini oling. Ilova 10 soniyada SI model orqali tahlil qiladi va tuproq turi, sho'rlanish, namlik hamda qaysi ekin uchun mos ekanligini ko'rsatadi. Internet kerak emas!" },
        { keywords: ['qachon', 'when', 'vaqt', 'chiq', 'launch'],
          answer: "Hozir MVP bosqichida. 2025 yil 2-chorakda 6 viloyatda beta sinov boshlanadi. To'liq ishga tushirish 2025 yil 3-chorakda rejalashtirilgan." },
        { keywords: ['aniq', 'accurate', 'ishonch', 'to\'g\'ri'],
          answer: "92% aniqlik darajasi. 500+ namunada sinovdan o'tgan va O'zbekiston tuproqlariga maxsus moslashtirilgan. Laboratoriya natijalari bilan 90%+ mos keladi." },
        { keywords: ['offline', 'offlayn', 'internet'],
          answer: "Ha, to'liq offlayn ishlaydi! SI model to'g'ridan-to'g'ri telefoningizda ishga tushadi. Dalada, tog'da, internetsi qishloqda - har qanday joyda foydalanish mumkin." },
        { keywords: ['jamoa', 'team', 'kim', 'who'],
          answer: "Zafar To'raqulov - Loyiha rahbari va SI muhandisi. Komil Usmanov - SI muhandisi. Asadbek Xo'jaboyev - Frontend dasturchi. Ibrohimjon Baxtiyorov - Frontend dasturchi. Zuhra Erkayeva - Backend dasturchi." },
        { keywords: ['ekin', 'crop', 'paxta', 'bug\'doy'],
          answer: "15+ ekin turi: g'alla (bug'doy, arpa), paxta, sabzavotlar (pomidor, bodring, piyoz), mevalar (olma, olxo'ri, shaftoli), poliz ekinlari (qovun, tarvuz). Har biri uchun moslik va hosildorlik prognozi." },
        { keywords: ['texnologiya', 'technology', 'stack'],
          answer: "SI: PyTorch, ONNX Runtime, OpenCV. Mobile: React Native, Expo. Backend: Django REST, PostgreSQL. Web: Next.js, Tailwind CSS." },
        { keywords: ['muammo', 'problem', 'nima', 'nega'],
          answer: "O'zbekistonda 2.5M gektar yer sho'rlangan. 80% fermerlar tuproq holati haqida bilmaydi. Laboratoriya tahlili 200-500 ming so'm va 2 hafta. Noto'g'ri ekin tanlash 40% hosildorlik yo'qotishi." },
        { keywords: ['tez', 'fast', 'speed', 'soniya'],
          answer: "Atigi 10 soniyada to'liq tahlil! Rasmga oling, natijani oling. Laboratoriyaga borish va 2 hafta kutish kerak emas." },
        { keywords: ['telefon', 'phone', 'android', 'ios'],
          answer: "Android va iOS uchun React Native'da ishlab chiqilmoqda. Minimal talablar: Android 8+, iOS 12+. Ilova hajmi 30-40MB." },
        { keywords: ['tuproq', 'soil', 'tur'],
          answer: "Qo'ng'ir, kulrang, qizil, qumli va boshqa O'zbekistonda tarqalgan 10+ tuproq turini aniqlaydi. Har biri uchun batafsil tavsif va tavsiyalar." },
        { keywords: ['sho\'r', 'salin', 'tuz'],
          answer: "Sho'rlanish darajasini aniq aniqlaydi: past, o'rtacha, yuqori. Har bir daraja uchun maxsus o'g'it va sug'orish rejalari tavsiya qilinadi." },
        { keywords: ['o\'g\'it', 'fertiliz', 'azot'],
          answer: "Tuproq tahlili asosida aniq o'g'it miqdori hisoblanadi. Azot, fosfor, kaliy va mikroelementlar bo'yicha batafsil reja. Qaysi o'g'itni qachon va qancha qo'llash kerakligi ko'rsatiladi." },
        { keywords: ['sug\'or', 'irrigation', 'suv'],
          answer: "Tuproq namligiga qarab optimal sug'orish rejasi. Qancha suv, qaysi tizim (tomchi, yer osti) va qaysi vaqtda sug'orish kerakligi aniq ko'rsatiladi." },
        { keywords: ['hosil', 'yield', 'tonna'],
          answer: "Tuproq va tanlangan ekinga qarab hosildorlik prognozi beriladi. Eng kam, o'rtacha va eng ko'p hosildorlik. Hosildorlikni oshirish bo'yicha tavsiyalar." },
        { keywords: ['viloyat', 'region', 'qayerda'],
          answer: "6 viloyatda beta sinov: Toshkent, Samarqand, Farg'ona, Andijon, Buxoro, Xorazm. Keyinchalik barcha viloyatlar qamrab olinadi." },
        { keywords: ['institut', 'tkti', 'universitet'],
          answer: "Toshkent kimyo-texnologiya instituti (TKTI), Avtomatlashtirish va raqamli boshqaruv kafedrasi. 10+ xalqaro ilmiy maqola Scopus/Web of Science'da." },
        { keywords: ['maqola', 'scopus', 'ilmiy'],
          answer: "10+ ilmiy maqola Scopus va Web of Science'da. Mavzular: raqamlashtirish, digital twins, sun'iy intellekt, qishloq xo'jaligi avtomatlashtiruvi." },
        { keywords: ['xalqaro', 'depro', 'sap', 'ispaniya'],
          answer: "DePRO va SAP (Ispaniya) xalqaro tadqiqot guruhlarida loyiha rahbari. IoT, intellektual boshqarish, Deep Learning sohalarida amaliy tajriba." },
        { keywords: ['demo', 'sinov', 'test'],
          answer: "Demo versiya: https://agrotahlilchi.uz/mvp. Real interfeys va asosiy funksiyalar bilan tanishing." },
        { keywords: ['kontakt', 'email', 'telefon', 'bog\'lan'],
          answer: "Email: info@agrotahlilchi.uz, Telefon: +998946366355 (Zafar To'raqulov). Demo: https://agrotahlilchi.uz/mvp" },
        { keywords: ['premium', 'qo\'shimcha', 'farq'],
          answer: "Premium: mavsumiy monitoring, o'g'it hisoblari, bir necha maydon tahlili, tarixiy ma'lumotlar, professional konsultatsiya, birinchi navbatda yangilanishlar." },
        { keywords: ['yordam', 'help', 'o\'rgan'],
          answer: "Ilovada video yo'riqnomalar va qo'llanma bor. Telegram bot orqali yordam. FAQ va fermerlar forumi tez orada." },
      ],
      ru: [
        { keywords: ['цена', 'стоимость', 'сколько'], answer: "Основной анализ бесплатный. Премиум 49,000 сум/месяц или 490,000 сум/год (2 месяца бесплатно!)." },
        { keywords: ['как', 'работа'], answer: "Сделайте фото почвы. Приложение за 10 секунд анализирует и показывает тип почвы, засоление и пригодность для культур. Интернет не нужен!" },
        { keywords: ['когда', 'запуск'], answer: "MVP в процессе. Бета-тест во 2 квартале 2025 в 6 регионах. Полный запуск в 3 квартале 2025." },
        { keywords: ['точность', 'точно'], answer: "92% точность. Протестировано на 500+ образцах, адаптировано к почвам Узбекистана. 90%+ совпадение с лабораторными результатами." },
        { keywords: ['оффлайн', 'интернет'], answer: "Да, полностью оффлайн! ИИ модель работает на вашем телефоне. В поле, в горах, без интернета." },
        { keywords: ['команда', 'кто'], answer: "Зафар Туракулов - Руководитель и AI инженер. Комил Усманов - AI инженер. Асадбек, Иброхимжон - Frontend. Зухра - Backend." },
      ],
      en: [
        { keywords: ['price', 'cost'], answer: "Basic analysis free. Premium 49,000 sum/month or 490,000 sum/year (2 months free!)." },
        { keywords: ['how', 'work'], answer: "Take soil photo. App analyzes in 10 seconds showing soil type, salinity and crop suitability. No internet needed!" },
        { keywords: ['when', 'launch'], answer: "MVP in progress. Beta testing Q2 2025 in 6 regions. Full launch Q3 2025." },
        { keywords: ['accurate', 'accuracy'], answer: "92% accuracy. Tested on 500+ samples, adapted to Uzbekistan soils. 90%+ match with lab results." },
        { keywords: ['offline', 'internet'], answer: "Yes, fully offline! AI model runs on your phone. In field, mountains, without internet." },
        { keywords: ['team', 'who'], answer: "Zafar Toraqulov - Lead & AI engineer. Komil Usmanov - AI engineer. Asadbek, Ibrohimjon - Frontend. Zuhra - Backend." },
      ]
    };

    const responses = allResponses[lang];
    for (const item of responses) {
      if (item.keywords.some(keyword => q.includes(keyword))) {
        return item.answer;
      }
    }

    const defaultMessages = {
      uz: "Men Agrotahlilchi loyihasi haqida ma'lumot beraman. Masalan: narx, qanday ishlashi, qachon chiqishi, jamoa, ekinlar, o'g'itlar haqida so'rang!",
      ru: "Я помогу с информацией о проекте. Спросите о: цене, как работает, когда выйдет, команде, культурах, удобрениях!",
      en: "I provide info about the project. Ask about: price, how it works, when launching, team, crops, fertilizers!"
    };
    return defaultMessages[lang];
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    const aiResponse = await getAIResponse(input);
    setIsTyping(false);
    const assistantMessage: Message = { role: 'assistant', content: aiResponse };
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button - Agronom Rasm */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-[0_8px_30px_rgba(31,160,63,0.4)] flex items-center justify-center cursor-pointer border-4 border-white transition-all hover:scale-110 hover:shadow-[0_12px_40px_rgba(31,160,63,0.6)] z-[999] overflow-hidden bg-gradient-to-br from-primary-green to-deep-green"
          title={t("Agronom tog'a bilan suhbat", 'Чат с Агроном дядей', 'Chat with Agronom Togha')}
        >
          <img 
            src="/agronom-togha.png" 
            alt="Agronom Togha"
            className="w-full h-full object-cover"
          />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col z-[999]">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-green to-deep-green text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/30 flex-shrink-0 bg-white">
                <img 
                  src="/agronom-togha.png" 
                  alt="Agronom Togha"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t("Agronom tog'a", 'Агроном дядя', 'Agronom Togha')}</h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  <Sparkles size={12} />
                  {t('SI yordamchi', 'ИИ помощник', 'AI Assistant')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-primary-green text-white rounded-br-sm'
                    : 'bg-white text-dark-text shadow-md rounded-bl-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary-green rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-primary-green rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-primary-green rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("Savolingizni yozing...", 'Напишите ваш вопрос...', 'Type your question...')}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-green text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-12 h-12 bg-gradient-to-br from-primary-green to-deep-green text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex-shrink-0"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              {t('Faqat loyiha haqida savollar', 'Только вопросы о проекте', 'Project questions only')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
