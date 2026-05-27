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
    { value: '30-1500 м²', label: 'Площади офисов' },
    { value: 'от 18 500 ₽', label: 'Годовая м² ставка' },
    { value: '7 мин', label: 'До м. Красносельская' },
  ];

  return (
    <section id="hero" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-[#F4F1EE]">
      {/* Background accent - Editorial Grid & Accent */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slogan and Text (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
            <div className="inline-flex items-center gap-2 border-b border-[#1A1A1A] pb-1.5 text-stone-900 text-[10px] uppercase tracking-[0.25em] font-sans font-bold">
              <BadgeCheck className="w-4 h-4 text-red-700 shrink-0" />
              <span>ПРЯМАЯ АРЕНДА • БЕЗ КОМИССИИ И ПОСРЕДНИКОВ</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-[76px] font-serif font-light text-[#1A1A1A] tracking-tight leading-[0.88]">
                Бизнес-пространство <br />
                <span className="font-black italic text-red-700">
                  Класса В+ в Центре
                </span>
              </h1>
              <p className="text-stone-700 font-sans text-sm md:text-base leading-relaxed max-w-xl">
                Бизнес-центр на Красносельской гармонично объединяет камерную архитектуру XIX века,
                монументальные кирпичные фасады, изящные Loft-решения и первоклассную IT-инфраструктуру. 
                Всего 7 минут размеренным шагом от станции метро «Красносельская».
              </p>
            </div>

            {/* Quick location tag */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 bg-white border border-[#1A1A1A]/10 rounded-none p-4 max-w-lg">
              <div className="p-2 bg-stone-100 text-[#1A1A1A] rounded-none">
                <MapPin className="w-5 h-5 text-red-700" />
              </div>
              <div className="text-xs">
                <span className="font-sans uppercase tracking-wider font-bold text-stone-950 block">ул. Краснопрудная, д. 30-34, корп. 1</span>
                <span className="text-stone-500 font-sans mt-0.5 block">Центральный округ • ИФНС №1 • Собственный съезд на ТТК</span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-wrap gap-4 pt-1">
              <button
                onClick={onExploreClick}
                className="bg-[#1A1A1A] hover:bg-red-800 text-white font-sans text-xs uppercase tracking-[0.22em] font-bold px-7 py-4.5 rounded-none transition flex items-center gap-2.5 group cursor-pointer"
              >
                ВЫБРАТЬ ПОМЕЩЕНИЕ
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </button>
              <button
                onClick={onRentClick}
                className="bg-transparent hover:bg-[#1A1A1A]/5 border border-[#1A1A1A] text-[#1A1A1A] font-sans text-xs uppercase tracking-[0.22em] font-bold px-7 py-4.5 rounded-none transition flex items-center gap-1.5 cursor-pointer"
              >
                ОСТАВИТЬ ЗАЯВКУ
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro statistic panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[#1A1A1A]/10 max-w-2xl text-left">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-serif font-black italic text-[#1A1A1A] text-2xl md:text-3xl block">
                    {stat.value}
                  </span>
                  <span className="text-[#1A1A1A]/60 text-[10px] uppercase tracking-[0.18em] block font-bold font-sans">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Visual Showcase (Right 5 Columns) */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-12 gap-3 items-stretch">
              {/* Image 1: Building Exterior */}
              <div className="col-span-12 rounded-none overflow-hidden border border-[#1A1A1A]/10 transform hover:scale-[1.01] transition duration-300">
                <img
                  src={IMAGES.streetView}
                  alt="Бизнес Центр на Красносельской Улица"
                  className="w-full h-64 md:h-80 object-cover grayscale-[15%] filter contrast-[105%]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Image 2: Inner courtyard */}
              <div className="col-span-6 rounded-none overflow-hidden border border-[#1A1A1A]/10 transform hover:scale-[1.01] transition duration-300">
                <img
                  src={IMAGES.courtyard}
                  alt="Внутренний Дворик БЦ"
                  className="w-full h-40 object-cover grayscale-[15%] filter contrast-[105%]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Image 3: Loft interior */}
              <div className="col-span-6 rounded-none overflow-hidden border border-[#1A1A1A]/10 transform hover:scale-[1.01] transition duration-300">
                <img
                  src={IMAGES.officeInterior}
                  alt="Интерьер Офиса Лофт"
                  className="w-full h-40 object-cover grayscale-[15%] filter contrast-[105%]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Quick motivators cards */}
            <div className="absolute -bottom-4 left-6 right-6 bg-white border border-[#1A1A1A]/10 p-5 rounded-none flex items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[9px] text-red-700 font-bold uppercase tracking-[0.2em] font-sans block">ДЕЙСТВУЕТ АКЦИЯ</span>
                <span className="text-xs font-serif font-bold text-stone-900 block mt-1 italic">Арендные каникулы до 2 месяцев</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold font-sans text-stone-500 border-l border-[#1A1A1A]/10 pl-4 py-1 leading-snug max-w-[130px]">
                При бронировании площадей
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
