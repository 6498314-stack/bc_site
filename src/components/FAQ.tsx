/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Landmark, ShieldEllipsis, Users2 } from 'lucide-react';
import { FAQItem } from '../types';

const faqItems: FAQItem[] = [
  {
    category: 'terms',
    question: 'Каковы условия оплаты и обеспечительного платежа?',
    answer: 'Стандартный договор прямой аренды заключается на 11 месяцев с возможностью автопролонгации. Оплата производится ежемесячно авансовым методом. При подписании договора оплачивается первый месяц аренды и обеспечительный платеж (депозит) в размере одной среднемесячной платы, который возвращается по истечении срока аренды.',
  },
  {
    category: 'terms',
    question: 'Предоставляется ли гарантийное письмо и юридический адрес?',
    answer: 'Да! Мы предоставляем полный и легальный пакет документов для регистрации юридического лица непосредственно в нашем здании. Адрес относится к ИФНС №8 по г. Москве. Подготовка гарантийного письма от собственника занимает 1 рабочий день после согласования контракта. Услуга бесплатна для всех долгосрочных арендаторов.',
  },
  {
    category: 'infrastructure',
    question: 'Входят ли в стоимость аренды коммунальные расходы и уборка?',
    answer: 'В ставку аренды уже включены эксплуатационные расходы (содержание здания, обслуживание инженерных сетей, уборка общих зон, вывоз снега и мусора). Коммунальные платежи (отопление, вода) оплачиваются фиксированно или по приборам учета. Электричество и интернет оплачиваются отдельно по факту потребления по счетчикам.',
  },
  {
    category: 'infrastructure',
    question: 'Какие интернет-провайдеры работают в бизнес-центре?',
    answer: 'В наше здание заведено три независимых магистральных оптоволоконных канала высокой отказоустойчивости. Услуги связи предоставляют провайдеры: Мастертел, Билайн Бизнес и Комкор (Акадо Телеком). Вы можете заключить договор напрямую с любым из них на скоростях до 10 Гбит/с.',
  },
  {
    category: 'technical',
    question: 'В какое время возможен доступ сотрудников в офисы?',
    answer: 'Для всех арендаторов действует круглосуточный режим работы 24/7. Вход сотрудников осуществляется по индивидуальным электронным RFID-картам через турникеты на главном ресепшн. В выходные и ночные часы на объекте находится дежурный офицер охраны и ведется внутренний монитор-контроль.',
  },
  {
    category: 'technical',
    question: 'Можно ли сделать перепланировку или косметический ремонт под себя?',
    answer: 'Да. Мы приветствуем стремление компаний адаптировать пространство под свой бренд-бук. Не несущие перегородки, покраску стен в фирменные цвета или монтаж дополнительного освещения можно выполнить после согласования экспресс-проекта с нашей инженерной службой. На время работ мы согласуем льготные арендные каникулы.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'terms' | 'infrastructure' | 'technical'>('all');

  const filteredItems = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FFFFFF] scroll-mt-20 border-b border-[#1A1A1A]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <span className="text-[10px] font-sans font-bold text-red-700 uppercase tracking-[0.25em] border border-red-700/30 px-4 py-2 bg-[#F4F1EE] rounded-none inline-block">
            База знаний арендатора
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
            Ответы на <span className="font-serif italic font-black text-red-700">часто задаваемые</span> вопросы
          </h2>
          <p className="text-stone-600 font-sans text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Собрали полезную справочную информацию о юридических аспектах договора, инженерных системах и жизни нашего бизнес-центра.
          </p>
        </div>

        {/* Category toggles */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-10 bg-[#F4F1EE] p-1 border border-[#1A1A1A]/10 rounded-none w-fit mx-auto">
          <button
            onClick={() => { setActiveCategory('all'); setOpenIndex(0); }}
            className={`px-4 py-2.5 rounded-none font-sans font-bold text-[9px] uppercase tracking-wider transition cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#1A1A1A] text-white shadow-none'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Все вопросы
          </button>
          <button
            onClick={() => { setActiveCategory('terms'); setOpenIndex(0); }}
            className={`px-4 py-2.5 rounded-none font-sans font-bold text-[9px] uppercase tracking-wider transition cursor-pointer ${
              activeCategory === 'terms'
                ? 'bg-[#1A1A1A] text-white shadow-none'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Юридические
          </button>
          <button
            onClick={() => { setActiveCategory('infrastructure'); setOpenIndex(0); }}
            className={`px-4 py-2.5 rounded-none font-sans font-bold text-[9px] uppercase tracking-wider transition cursor-pointer ${
              activeCategory === 'infrastructure'
                ? 'bg-[#1A1A1A] text-white shadow-none'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Инфраструктура
          </button>
          <button
            onClick={() => { setActiveCategory('technical'); setOpenIndex(0); }}
            className={`px-4 py-2.5 rounded-none font-sans font-bold text-[9px] uppercase tracking-wider transition cursor-pointer ${
              activeCategory === 'technical'
                ? 'bg-[#1A1A1A] text-white shadow-none'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Инженерия
          </button>
        </div>

        {/* Accordions list */}
        <div className="space-y-3.5">
          {filteredItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-none transition-all duration-300 text-left overflow-hidden ${
                  isOpen
                    ? 'border-[#1A1A1A]/15 bg-[#F4F1EE]/40'
                    : 'border-[#1A1A1A]/10 bg-white hover:bg-[#F4F1EE]/10'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 md:px-7 py-5 flex items-center justify-between gap-4 focus:outline-none text-left cursor-pointer"
                >
                  <span className="font-serif font-bold italic text-stone-900 text-sm md:text-base pr-2 leading-relaxed">
                    {item.question}
                  </span>
                  <div className="p-1.5 rounded-none bg-stone-100/80 border border-[#1A1A1A]/5 text-stone-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-5 md:px-7 pb-5 text-xs md:text-sm text-stone-600 leading-relaxed border-t border-[#1A1A1A]/5 pt-3.5 font-sans">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact reminder box */}
        <div className="bg-[#F4F1EE]/55 border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <h4 className="font-serif font-bold italic text-stone-900 text-sm">Остались специфические вопросы?</h4>
            <p className="text-stone-500 font-sans text-xs leading-relaxed max-w-md">
              Юрист нашего бизнес-центра и инженер по эксплуатации готовы подробно проконсультировать вас по любым юридическим или техническим пунктам.
            </p>
          </div>
          <a
            href="tel:+79175219421"
            className="bg-[#1A1A1A] hover:bg-neutral-800 text-white font-sans text-[10px] uppercase tracking-widest font-bold py-3.5 px-6 rounded-none transition text-center shrink-0 self-start sm:self-auto cursor-pointer"
          >
            Задать вопрос инженеру
          </a>
        </div>

      </div>
    </section>
  );
}
