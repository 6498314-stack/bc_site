/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, MapPin, BadgeCheck, Compass } from 'lucide-react';
import { IMAGES } from '../images';

interface HeroProps {
  onRentClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onRentClick, onExploreClick }: HeroProps) {
  const stats = [
    { value: 'B+', label: 'Класс здания' },
    { value: '30–1500 м²', label: 'Площади офисов' },
    { value: 'от 18 500 ₽', label: 'Ставка за м²/год' },
    { value: '3 мин', label: 'До метро' },
  ];

  return (
    <section id="hero" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-[#F4F1EE]">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7 text-left">
            <div className="inline-flex w-fit items-center gap-2 border-b border-[#1A1A1A] pb-1.5 text-stone-900 text-[10px] uppercase tracking-[0.22em] font-sans font-bold">
              <BadgeCheck className="w-4 h-4 text-red-700 shrink-0" />
              <span>ПРЯМАЯ АРЕНДА • БЕЗ КОМИССИИ</span>
            </div>

            <div className="space-y-5 max-w-2xl">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-[72px] font-serif font-bold text-[#1A1A1A] tracking-tight leading-[0.95]">
                  Бизнес-пространство
                </h1>
                <div className="max-w-md border-l-2 border-red-700 pl-4 py-1">
                  <span className="block font-sans text-base md:text-xl font-bold text-stone-900 uppercase tracking-[0.14em]">
                    Класс B+ в центре Москвы
                  </span>
                </div>
              </div>
              <p className="text-stone-700 font-sans text-sm md:text-base leading-relaxed max-w-lg">
                БЦ Красноярд на Красносельской: готовые офисы с loft-отделкой, развитой инфраструктурой и удобным доступом от метро.
              </p>
            </div>

            <div className="bg-white border border-[#1A1A1A]/10 rounded-none p-4 max-w-xl grid grid-cols-[auto_1fr] gap-3 items-start">
              <div className="p-2 bg-[#F4F1EE] text-[#1A1A1A] rounded-none">
                <MapPin className="w-5 h-5 text-red-700" />
              </div>
              <div className="text-xs text-left">
                <span className="font-sans uppercase tracking-wider font-bold text-stone-950 block">ул. Верхняя Красносельская, д. 2/1</span>
                <span className="text-stone-500 font-sans mt-0.5 block">ЦАО • рядом метро «Красносельская» • удобный выезд к ТТК</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-1">
              <button
                onClick={onRentClick}
                className="bg-red-700 hover:bg-red-800 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold px-7 py-4 rounded-none transition flex items-center gap-2 cursor-pointer"
              >
                ОСТАВИТЬ ЗАЯВКУ
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreClick}
                className="bg-transparent hover:bg-white border border-[#1A1A1A] text-[#1A1A1A] font-sans text-xs uppercase tracking-[0.2em] font-bold px-7 py-4 rounded-none transition flex items-center gap-2.5 group cursor-pointer"
              >
                ВЫБРАТЬ ПОМЕЩЕНИЕ
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#1A1A1A]/10 max-w-2xl text-left">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-sans font-extrabold text-[#1A1A1A] text-xl md:text-2xl block tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[#1A1A1A]/60 text-[10px] uppercase tracking-[0.16em] block font-bold font-sans">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          <div className="lg:col-span-5 relative flex flex-col gap-3">
            <div className="grid grid-cols-12 gap-3 items-stretch">
              <div className="col-span-12 rounded-none overflow-hidden border border-[#1A1A1A]/10 transform hover:scale-[1.01] transition duration-300">
                <img
                  src={IMAGES.streetView}
                  alt="Бизнес-центр Красноярд на Красносельской"
                  className="w-full h-64 md:h-80 object-cover grayscale-[10%] filter contrast-[105%]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="col-span-6 rounded-none overflow-hidden border border-[#1A1A1A]/10 transform hover:scale-[1.01] transition duration-300">
                <img
                  src={IMAGES.courtyard}
                  alt="Внутренний двор БЦ Красноярд"
                  className="w-full h-40 object-cover grayscale-[10%] filter contrast-[105%]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="col-span-6 rounded-none overflow-hidden border border-[#1A1A1A]/10 transform hover:scale-[1.01] transition duration-300">
                <img
                  src={IMAGES.officeInterior}
                  alt="Офис с loft-отделкой"
                  className="w-full h-40 object-cover grayscale-[10%] filter contrast-[105%]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="bg-white border border-[#1A1A1A]/10 p-5 rounded-none flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
              <div>
                <span className="text-[9px] text-red-700 font-bold uppercase tracking-[0.2em] font-sans block">ДЕЙСТВУЕТ АКЦИЯ</span>
                <span className="text-sm font-sans font-bold text-stone-900 block mt-1">Арендные каникулы до 2 месяцев</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold font-sans text-stone-500 sm:border-l sm:border-[#1A1A1A]/10 sm:pl-4 py-1 leading-snug max-w-[180px]">
                При бронировании площадей
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
