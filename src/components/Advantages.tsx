/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TrendingUp, Sparkles, Car, Coffee, ShieldCheck, FileCheck } from 'lucide-react';

export default function Advantages() {
  const items = [
    {
      icon: <FileCheck className="w-5 h-5 text-red-700" />,
      title: 'Прямая аренда от собственника',
      desc: 'Договор напрямую с владельцем здания. Без комиссий брокерам, скрытых платежей и лишних посредников.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-red-700" />,
      title: 'Готовая отделка loft',
      desc: 'Высокие потолки, кирпичные элементы, аккуратное освещение и готовые помещения без дополнительных вложений в ремонт.',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-red-700" />,
      title: 'Удобная локация',
      desc: 'Рядом метро «Красносельская», быстрый выезд к ТТК и удобная связь с центром Москвы.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-red-700" />,
      title: 'Доступ и безопасность',
      desc: 'Охрана, СКУД, видеонаблюдение и понятный пропускной режим для сотрудников и гостей.',
    },
    {
      icon: <Car className="w-5 h-5 text-red-700" />,
      title: 'Парковка на территории',
      desc: 'Охраняемая парковка для арендаторов и гостевые места для встреч и переговоров.',
    },
    {
      icon: <Coffee className="w-5 h-5 text-red-700" />,
      title: 'Инфраструктура на каждый день',
      desc: 'Кафе-столовая, кофейня, сервисы рядом с офисом и бытовая инфраструктура в пешей доступности.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#E2DDD9] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-16">
          <span className="text-[10px] font-sans font-bold text-stone-800 uppercase tracking-[0.22em] border border-[#1A1A1A]/20 px-4 py-2 bg-transparent inline-block rounded-none">
            Почему выбирают нас
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Преимущества аренды в <br />
            <span className="text-red-700">БЦ КРАСНОЯРД</span>
          </h2>
          <p className="text-stone-700 font-sans text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Готовые офисы, понятные условия аренды и инфраструктура, которая помогает быстро запустить работу команды.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#1A1A1A]/10 p-6 md:p-8 rounded-none shadow-none hover:border-[#1A1A1A]/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="space-y-4 text-left h-full flex flex-col">
                <div className="p-3 bg-[#F4F1EE] rounded-none w-fit transition duration-300">
                  {item.icon}
                </div>
                <h3 className="font-sans font-bold text-[#1A1A1A] text-base md:text-lg leading-snug">
                  {item.title}
                </h3>
                <p className="text-stone-600 font-sans text-xs md:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white text-stone-900 rounded-none p-8 md:p-12 mt-16 border border-red-700/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-left">
              <span className="text-red-700 text-[10px] font-sans uppercase tracking-[0.23em] font-bold block">УНИКАЛЬНОЕ ПРЕДЛОЖЕНИЕ</span>
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                Арендные каникулы и индивидуальные условия переезда
              </h3>
              <p className="text-stone-600 text-xs md:text-sm leading-relaxed max-w-2xl">
                Согласуем комфортный период на переезд, настройку рабочих мест и запуск команды в новом офисе. Условия обсуждаются индивидуально под площадь и срок аренды.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none p-6 text-left w-full max-w-sm">
                <span className="text-[10px] text-stone-500 font-sans uppercase tracking-widest font-semibold block">Документы и договор</span>
                <span className="text-stone-900 text-lg font-bold font-sans block mt-1.5">Официальная аренда</span>
                <span className="text-[11px] text-stone-500 block mt-2.5 leading-relaxed">
                  Предоставляем комплект документов, согласуем договор и при необходимости помогаем с юридическим адресом.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
