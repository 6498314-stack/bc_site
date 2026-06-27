/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Clock, ShieldCheck, MapPin } from 'lucide-react';
import UserAgreement from './UserAgreement';
import CookieConsentBanner from './CookieConsentBanner';

interface FooterProps {
  onNavigate: (section: string) => void;
  onPrivacyOpen: () => void;
}

export default function Footer({ onNavigate, onPrivacyOpen }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#1A1A1A] text-stone-300 border-t border-stone-800 py-16 md:py-20 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-stone-800/80">
            
            <div className="lg:col-span-4 space-y-4">
              <button
                onClick={() => onNavigate('hero')}
                className="flex items-center text-left focus:outline-none group cursor-pointer"
              >
                <img 
                  src="https://allwebs.ru/images/2026/05/27/dedc6962b9764198dc2fcd5397230818.png" 
                  alt="БЦ Красноярд" 
                  referrerPolicy="no-referrer"
                  className="h-20 md:h-24 lg:h-28 w-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
                />
              </button>
              
              <p className="text-stone-400 font-sans text-xs leading-relaxed max-w-sm">
                Деловое пространство на Красносельской: готовые офисы, закрытая территория, удобная транспортная доступность и понятные условия аренды.
              </p>
              
              <div className="flex items-center gap-2 text-stone-500 text-[9px] font-sans font-bold uppercase tracking-wider select-none">
                <ShieldCheck className="w-4 h-4 text-stone-500" />
                <span>Прямая аренда без комиссии</span>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4 text-left">
              <h4 className="text-white text-[10px] uppercase tracking-widest font-sans font-bold">
                Разделы сайта
              </h4>
              <ul className="space-y-2.5 text-xs font-sans font-bold uppercase tracking-wider text-[11px]">
                <li>
                  <button onClick={() => onNavigate('about')} className="text-stone-400 hover:text-red-500 hover:underline transition cursor-pointer">
                    О БИЗНЕС-ЦЕНТРЕ
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('services')} className="text-stone-400 hover:text-red-500 hover:underline transition cursor-pointer">
                    УСЛУГИ
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('offices')} className="text-stone-400 hover:text-red-500 hover:underline transition cursor-pointer">
                    ПОМЕЩЕНИЯ
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('map')} className="text-stone-400 hover:text-red-500 hover:underline transition cursor-pointer">
                    КАРТА И ПРОЕЗД
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('faq')} className="text-stone-400 hover:text-red-500 hover:underline transition cursor-pointer">
                    ВОПРОСЫ И ОТВЕТЫ
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-4 text-left">
              <h4 className="text-white text-[10px] uppercase tracking-widest font-sans font-bold">
                Транспортная логистика
              </h4>
              <ul className="space-y-3.5 text-xs font-sans">
                <li className="flex items-start gap-2.5 text-left">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-left">
                    <span className="text-stone-100 font-bold block">ул. Верхняя Красносельская, д. 2/1</span>
                    <span className="text-stone-500 text-[11px] block mt-0.5">Москва • метро «Красносельская»</span>
                  </div>
                </li>
                <li className="flex items-center gap-2.5 text-left">
                  <Clock className="w-4 h-4 text-red-600 shrink-0" />
                  <div className="text-left">
                    <span className="text-stone-100 font-bold block">10 минут пешком</span>
                    <span className="text-stone-500 text-[11px] block">от метро «Красносельская»</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-4 text-left">
              <h4 className="text-white text-[10px] uppercase tracking-widest font-sans font-bold">
                Отдел аренды
              </h4>
              <div className="space-y-3.5 text-xs text-left">
                <div className="space-y-1 text-left">
                  <a
                    href="tel:+79175219421"
                    className="text-white hover:text-red-500 font-sans font-bold text-base block transition"
                  >
                    +79175219421
                  </a>
                  <span className="text-stone-500 text-[9px] font-sans uppercase font-bold tracking-wider block">
                    Принимаем звонки: 09:00 - 20:00
                  </span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-sans text-left">
            <p>© {currentYear} БЦ Красноярд на Красносельской. Все права защищены.</p>
            <div className="flex gap-4">
              <button onClick={onPrivacyOpen} className="hover:text-stone-400 transition cursor-pointer">
                Политика конфиденциальности
              </button>
              <button onClick={() => setIsAgreementOpen(true)} className="hover:text-stone-400 transition cursor-pointer">
                Пользовательское соглашение
              </button>
            </div>
            <p className="font-sans text-[9px] text-stone-600">
              Информация на сайте не является публичной офертой (ст. 437 ГК РФ).
            </p>
          </div>

        </div>
      </footer>

      <CookieConsentBanner
        onPrivacyOpen={onPrivacyOpen}
        onAgreementOpen={() => setIsAgreementOpen(true)}
      />

      {isAgreementOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#1A1A1A]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <UserAgreement onClose={() => setIsAgreementOpen(false)} />
        </div>
      )}
    </>
  );
}
