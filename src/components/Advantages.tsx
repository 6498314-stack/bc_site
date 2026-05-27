/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Users, TrendingUp, Sparkles, Car, Coffee, ShieldCheck, FileCheck } from 'lucide-react';

export default function Advantages() {
  const items = [
    {
      icon: <FileCheck className="w-5 h-5 text-red-700" />,
      title: 'Прямая аренда от собственника',
      desc: 'Заключение договора аренды напрямую с владельцем здания. Отсутствие скрытых платежей, комиссий брокерам. Предоставляем полный пакет документов и официальный юридический адрес (ИФНС №1).',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-red-700" />,
      title: 'Качественная отделка Loft',
      desc: 'Высокие потолки (3.2–3.8 м), кирпичные элементы, стильные светильники и теплое дерево. Готовые офисы с ковролином и зонированием, не требующие дополнительных вложений на ремонт.',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-red-700" />,
      title: 'Супер-локация и транспорт',
      desc: 'Всего 7 минут пешком от м. Красносельская. 500 метров до ТТК для быстрого разъезда по Москве, 5 минут на авто до Садового кольца. Пешая доступность до трех вокзалов.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-red-700" />,
      title: 'Круглосуточный доступ 24/7',
      desc: 'Усиленная физическая охрана на ресепшн, пропускная автоматизированная система (СКУД), видеонаблюдение Full HD. Вы и ваши сотрудники могут безопасно работать в комфортном графике.',
    },
    {
      icon: <Car className="w-5 h-5 text-red-700" />,
      title: 'Охраняемый паркинг на 120 мест',
      desc: 'Собственная охраняемая наземная и подземная парковка с автоматическим считыванием номеров. Гостевые парровочные места для ваших ключевых клиентов и переговорных дней.',
    },
    {
      icon: <Coffee className="w-5 h-5 text-red-700" />,
      title: 'Развитая инфраструктура',
      desc: 'На территории бизнес-центра работают кафе-столовая «Обед-Буфет», уютная кофейня с авторским кофе, салон красоты, банкоматы Сбера и ВТБ, а также пункт выдачи заказов.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#E2DDD9] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-16">
          <span className="text-[10px] font-sans font-bold text-red-700 uppercase tracking-[0.22em] border border-red-700/30 px-4 py-2 bg-transparent inline-block rounded-none">
            Почему выбирают нас
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
            Преимущества аренды в <br />
            <span className="font-serif italic font-black text-red-700">БЦ на Красносельской</span>
          </h2>
          <p className="text-stone-700 font-sans text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Мы позаботились обо всех деталях, чтобы ваша команда думала только о бизнесе, 
            наслаждаясь комфортным и стильным рабочим пространством каждый день.
          </p>
        </div>

        {/* Advantage Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#1A1A1A]/10 p-6 md:p-8 rounded-none shadow-none hover:border-[#1A1A1A]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4 text-left">
                <div className="p-3 bg-[#F4F1EE] rounded-none w-fit transition duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif font-bold text-[#1A1A1A] text-lg group-hover:text-red-700 transition">
                  {item.title}
                </h3>
                <p className="text-stone-600 font-sans text-xs md:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bonus motivators card */}
        <div className="bg-[#1A1A1A] text-stone-100 rounded-none p-8 md:p-14 mt-16 relative overflow-hidden">
          {/* Subtle decoration grid */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-left">
              <span className="text-red-500 text-[10px] font-sans uppercase tracking-[0.23em] font-bold block">УНИКАЛЬНОЕ ПРЕДЛОЖЕНИЕ</span>
              <h3 className="text-2xl md:text-4xl font-serif text-white tracking-tight leading-tight">
                Предоставляем <span className="italic font-bold">«Арендные каникулы»</span> и индивидуальные условия перевода
              </h3>
              <p className="text-stone-300 text-xs md:text-sm leading-relaxed max-w-2xl">
                Мы понимаем, что переезд — это ресурсы и время. Наша команда согласует комфортный период каникул (до 2-х месяцев)
                на обустройство, наладку серверов и перевозку сотрудников, чтобы вы начали оплачивать аренду только после полноценного старта в новом офисе.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="bg-white/5 border border-white/10 rounded-none p-6 text-center w-full max-w-sm">
                <span className="text-[10px] text-stone-400 font-sans uppercase tracking-widest font-semibold block">ЮРИДИЧЕСКИЙ ПАКЕТ</span>
                <span className="text-red-500 text-xl font-bold font-serif italic block mt-1.5">ИФНС №1 г. Москва</span>
                <span className="text-[11px] text-stone-400 block mt-2.5 leading-relaxed">
                  Полная легальность, согласование договоров за 2 дня, быстрая прописка компании непосредственно в БЦ.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
