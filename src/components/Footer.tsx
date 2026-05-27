/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Building2, Phone, Mail, Clock, ShieldCheck, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-stone-300 border-t border-stone-800 py-16 md:py-20 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-stone-800/80">
          
          {/* Column 1: Brand & Logo (Left 4 columns) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('hero')}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="bg-red-700 text-white p-2.5 rounded-none border border-red-800">
                <Building2 className="w-5 h-5 text-white animate-none" />
              </div>
              <div className="text-left">
                <span className="font-serif font-black italic text-white tracking-tight text-lg leading-none block">
                  БЦ НА КРАСНОСЕЛЬСКОЙ
                </span>
                <span className="text-[10px] text-stone-500 tracking-wider block uppercase font-bold font-sans mt-1">
                  Прямая аренда офисов класса B+
                </span>
              </div>
            </button>
            
            <p className="text-stone-400 font-sans text-xs leading-relaxed max-w-sm">
              Современный деловой квартал в Красносельском районе Москвы. Развитая инфраструктура, стильная Loft-отделка помещений и ответственная эксплуатирующая компания на объекте.
            </p>
            
            <div className="flex items-center gap-2 text-stone-500 text-[9px] font-sans font-bold uppercase tracking-wider select-none">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Лицензия управляющей компании №77-УК-02492</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 columns) */}
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
                <button onClick={() => onNavigate('offices')} className="text-stone-400 hover:text-red-500 hover:underline transition cursor-pointer">
                  ИНТЕРАКТИВНЫЙ ВЫБОР
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
              <li>
                <button onClick={() => onNavigate('deployment')} className="text-stone-400 hover:text-red-500 hover:underline transition cursor-pointer">
                  ИНСТРУКЦИЯ VPS
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Logistics (3 columns) */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-white text-[10px] uppercase tracking-widest font-sans font-bold">
              Транспортная логистика
            </h4>
            <ul className="space-y-3.5 text-xs font-sans">
              <li className="flex items-start gap-2.5 text-left">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="text-left">
                  <span className="text-stone-100 font-bold block">ул. Краснопрудная, д. 30-34с1</span>
                  <span className="text-stone-500 text-[11px] block mt-0.5">ЦАО, Москва • ИФНС №1</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-left">
                <Clock className="w-4 h-4 text-red-600 shrink-0" />
                <div className="text-left">
                  <span className="text-stone-100 font-bold block">7 минут пешком (620м)</span>
                  <span className="text-stone-500 text-[11px] block">от станции метро «Красносельская»</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Contacts (3 columns) */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-white text-[10px] uppercase tracking-widest font-sans font-bold">
              Отдел аренды
            </h4>
            <div className="space-y-3.5 text-xs text-left">
              <div className="space-y-1 text-left">
                <a
                  href="tel:+74951234567"
                  className="text-white hover:text-red-500 font-serif font-bold italic text-base block transition"
                >
                  +7 (495) 123-45-67
                </a>
                <span className="text-emerald-500 text-[9px] font-sans uppercase font-bold tracking-wider block">
                  Принимаем звонки: 09:00 - 20:00
                </span>
              </div>
              
              <div className="space-y-1 text-left">
                <a
                  href="mailto:rent@bc-krasnoselskaya.ru"
                  className="text-stone-400 hover:text-white transition flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-red-600" />
                  rent@bc-krasnoselskaya.ru
                </a>
                <span className="text-stone-500 text-[9px] font-sans font-bold uppercase tracking-wider block">
                  Заявки по почте: 24/7
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright footer line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-sans text-left">
          <p>© {currentYear} Бизнес-центр на Красносельской. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#offices" className="hover:text-stone-400 transition">Политика конфиденциальности</a>
            <a href="#map" className="hover:text-stone-400 transition">Пользовательское соглашение</a>
          </div>
          <p className="font-mono text-[9px] text-stone-600">
            Информация на сайте не является публичной офертой (ст. 437 ГК РФ).
          </p>
        </div>

      </div>
    </footer>
  );
}
