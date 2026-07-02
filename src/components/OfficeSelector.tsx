/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OfficeSpace } from '../types';
import { Info, CheckCircle2, ShieldOff, Building, Layers, ArrowRight } from 'lucide-react';

interface OfficeSelectorProps {
  onOfficeSelect: (office: OfficeSpace) => void;
}

const RENT_RATE_PER_SQM_MONTH = 1250;

const mockOffices: OfficeSpace[] = [
  {
    id: 'o_101',
    number: '101',
    floor: 1,
    area: 54,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Светлый кабинетный офис для небольшой команды на 6–8 рабочих мест. Подойдет для агентства, IT-команды или проектного офиса.',
    features: ['Приточно-вытяжная вентиляция', 'Оптоволоконный интернет', 'Готовая отделка', 'Кондиционирование'],
  },
  {
    id: 'o_102',
    number: '102',
    floor: 1,
    area: 120,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'occupied',
    type: 'OpenSpace',
    windows: 'street',
    description: 'Просторный офис с высокими окнами и открытой планировкой.',
    features: ['СКУД', 'Зонирование'],
  },
  {
    id: 'o_103',
    number: '103',
    floor: 1,
    area: 35,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Компактное помещение для 4–5 рабочих мест рядом с тихой внутренней зоной.',
    features: ['Вентиляция', 'Готовое освещение', 'Видеодомофон'],
  },
  {
    id: 'o_104',
    number: '104',
    floor: 1,
    area: 180,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'booked',
    type: 'OpenSpace',
    windows: 'panoramic',
    description: 'Представительский офис с панорамным остеклением и индивидуальным входом.',
    features: ['Дизайнерская отделка'],
  },
  {
    id: 'o_201',
    number: '201',
    floor: 2,
    area: 42,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'street',
    description: 'Угловой кабинет на 5–7 человек с хорошим естественным освещением.',
    features: ['Регулировка отопления', 'Оптоволокно', 'Сигнализация'],
  },
  {
    id: 'o_202',
    number: '202',
    floor: 2,
    area: 75,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Двухкомнатный офисный блок с возможностью организовать приемную или кабинет руководителя.',
    features: ['Приточная вентиляция', 'Loft-отделка', 'Кухонный уголок'],
  },
  {
    id: 'o_203',
    number: '203',
    floor: 2,
    area: 310,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'panoramic',
    description: 'Большой open-space для команды до 45–50 сотрудников. Возможна гибкая расстановка рабочих мест и переговорных зон.',
    features: ['Зона кухни', '2 переговорные', 'Климат-контроль', 'Серверная зона'],
  },
  {
    id: 'o_204',
    number: '204',
    floor: 2,
    area: 65,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'occupied',
    type: 'MeetingRoom',
    windows: 'courtyard',
    description: 'Конференц-зона или лекторий.',
    features: ['Шумоизоляция'],
  },
  {
    id: 'o_301',
    number: '301',
    floor: 3,
    area: 88,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'courtyard',
    description: 'Сбалансированный офис open-space с тихой стороной и видом во двор.',
    features: ['Подвесные светильники', 'Wi-Fi', 'Магнитный замок'],
  },
  {
    id: 'o_302',
    number: '302',
    floor: 3,
    area: 145,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'street',
    description: 'Loft-офис с высокими потолками и открытыми инженерными конструкциями.',
    features: ['Потолки 3.8 м', 'Центральное охлаждение', 'Акцентное освещение'],
  },
  {
    id: 'o_303',
    number: '303',
    floor: 3,
    area: 56,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'booked',
    type: 'Cabinet',
    windows: 'street',
    description: 'Кабинетный офис с готовой мебельной расстановкой.',
    features: ['Меблировка'],
  },
  {
    id: 'o_304',
    number: '304',
    floor: 3,
    area: 450,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'occupied',
    type: 'EntireFloor',
    windows: 'panoramic',
    description: 'Полный этаж в левом крыле здания.',
    features: ['Премиум доступ'],
  },
  {
    id: 'o_402',
    number: '402',
    floor: 4,
    area: 240,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'panoramic',
    description: 'Мансардный офис на верхнем этаже с зенитными окнами и выразительной архитектурой.',
    features: ['Доступ на террасу', 'Мансардные потолки', 'Дизайнерское освещение'],
  },
  {
    id: 'o_403',
    number: '403',
    floor: 4,
    area: 112,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'courtyard',
    description: 'Мансардный loft для 15–20 рабочих мест с теплой отделкой и спокойной атмосферой.',
    features: ['Отделка деревом', 'Кондиционирование', 'Ролл-шторы'],
  },
  {
    id: 'o_404',
    number: '404',
    floor: 4,
    area: 95,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'MeetingRoom',
    windows: 'courtyard',
    description: 'Многофункциональное помещение под переговорную, тренинг-зону или офис.',
    features: ['Маркерные стены', 'Подготовка под проектор', 'Акустические панели'],
  }
];

export default function OfficeSelector({ onOfficeSelect }: OfficeSelectorProps) {
  const [selectedFloor, setSelectedFloor] = useState<number>(2);
  const [activeOffice, setActiveOffice] = useState<OfficeSpace | null>(mockOffices.find(o => o.floor === 2 && o.status === 'free') || null);

  const currentFloorOffices = mockOffices.filter(o => o.floor === selectedFloor);
  const freeOfficesCount = currentFloorOffices.filter(o => o.status === 'free').length;
  const totalFreeArea = currentFloorOffices.reduce((acc, o) => o.status === 'free' ? acc + o.area : acc, 0);

  const selectFloor = (floor: number) => {
    setSelectedFloor(floor);
    const firstFreeOnFloor = mockOffices.find(o => o.floor === floor && o.status === 'free');
    setActiveOffice(firstFreeOnFloor || mockOffices.find(o => o.floor === floor) || null);
  };

  const calculateMonthlyPrice = (office: OfficeSpace) => office.area * office.pricePerSqmMonth;
  const calculateAnnualPrice = (office: OfficeSpace) => calculateMonthlyPrice(office) * 12;

  const getStatusText = (status: 'free' | 'booked' | 'occupied') => {
    switch (status) {
      case 'free': return 'Свободен';
      case 'booked': return 'Забронирован';
      case 'occupied': return 'Сдан';
    }
  };

  const getStatusClass = (status: 'free' | 'booked' | 'occupied', isActive: boolean) => {
    if (isActive) {
      switch (status) {
        case 'free': return 'fill-[#DED4CB] stroke-red-700 stroke-2';
        case 'booked': return 'fill-[#E8DDCF] stroke-stone-600 stroke-2';
        case 'occupied': return 'fill-stone-200 stroke-stone-500 stroke-2';
      }
    }
    switch (status) {
      case 'free': return 'fill-[#F4F1EE] hover:fill-[#DED4CB] stroke-stone-500 stroke-[1.5] cursor-pointer';
      case 'booked': return 'fill-[#EEE7DE] hover:fill-[#E7DED2] stroke-stone-400 stroke-[1.5] cursor-not-allowed';
      case 'occupied': return 'fill-stone-200/70 stroke-stone-300 stroke-[1.5] cursor-not-allowed';
    }
  };

  const getOfficeByEnding = (ending: string) => currentFloorOffices.find(o => o.number.endsWith(ending));

  const renderOffice = (ending: string, d: string, x: number, y1: number, y2: number) => {
    const office = getOfficeByEnding(ending);
    return (
      <g>
        <path
          d={d}
          className={`transition-all duration-300 ${getStatusClass(office?.status || 'occupied', activeOffice?.number.endsWith(ending) || false)}`}
          onClick={() => {
            if (office) setActiveOffice(office);
          }}
        />
        <text x={x} y={y1} textAnchor="middle" className="fill-[#1A1A1A] font-sans font-bold pointer-events-none text-base">
          Офис {selectedFloor}{ending}
        </text>
        <text x={x} y={y2} textAnchor="middle" className="fill-stone-600 font-sans text-[10px] uppercase tracking-wider pointer-events-none font-bold">
          {office?.area || 0} м² • {office?.type === 'Cabinet' ? 'Кабинет' : office?.type === 'MeetingRoom' ? 'Переговорная' : 'Open Space'}
        </text>
      </g>
    );
  };

  return (
    <section id="offices" className="py-20 md:py-28 bg-white scroll-mt-20 border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A]/10 pb-10 mb-12">
          <div className="space-y-3 text-left">
            <span className="text-[10px] font-sans font-bold text-stone-800 uppercase tracking-[0.22em] border border-[#1A1A1A]/20 px-4 py-2 bg-transparent inline-block rounded-none">
              Помещения и планировки
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
              Интерактивный выбор помещений
            </h2>
            <p className="text-stone-600 font-sans text-xs md:text-sm max-w-2xl leading-relaxed">
              Выберите этаж и помещение на схеме, чтобы посмотреть площадь, ставку 1 250 ₽ за м² в месяц и отправить заявку менеджеру отдела аренды.
            </p>
          </div>
          
          <div className="flex items-center bg-[#F4F1EE] border border-[#1A1A1A]/10 p-1 rounded-none self-start md:self-auto shrink-0">
            {[1, 2, 3, 4].map((fl) => (
              <button
                key={fl}
                onClick={() => selectFloor(fl)}
                className={`px-4 py-2.5 rounded-none font-sans font-bold text-xs uppercase tracking-[0.16em] transition cursor-pointer ${
                  selectedFloor === fl
                    ? 'bg-[#1A1A1A] text-white shadow-none'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                Этаж {fl}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-left">
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 p-4 rounded-none">
            <span className="text-stone-550 text-[10px] block font-bold uppercase tracking-wider font-sans">Свободно помещений</span>
            <span className="text-stone-900 font-sans font-extrabold text-xl sm:text-2xl mt-1 block">{freeOfficesCount}</span>
          </div>
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 p-4 rounded-none">
            <span className="text-stone-550 text-[10px] block font-bold uppercase tracking-wider font-sans">Свободная площадь</span>
            <span className="text-stone-900 font-sans font-extrabold text-xl sm:text-2xl mt-1 block">{totalFreeArea} м²</span>
          </div>
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 p-4 rounded-none">
            <span className="text-stone-550 text-[10px] block font-bold uppercase tracking-wider font-sans">Ставка аренды</span>
            <span className="text-stone-900 font-sans font-extrabold text-xl sm:text-2xl mt-1 block">1 250 ₽</span>
            <span className="text-stone-500 font-sans text-[10px] block uppercase tracking-wider mt-0.5">за м² / месяц</span>
          </div>
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 p-4 rounded-none">
            <span className="text-stone-550 text-[10px] block font-bold uppercase tracking-wider font-sans">Высота потолков</span>
            <span className="text-stone-900 font-sans font-extrabold text-xl sm:text-2xl mt-1 block">{selectedFloor === 4 ? '3.8 м' : '3.6 м'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[520px]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1A1A1A]/10 pb-4">
              <span className="text-[10px] font-sans font-bold text-stone-600 flex items-center gap-1.5 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-stone-500" />
                Планировка • {selectedFloor} этаж
              </span>
              <div className="flex flex-wrap gap-3 text-[9px] font-sans font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-none bg-[#F4F1EE] inline-block border border-stone-500"></span>Свободно</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-none bg-[#E8DDCF] inline-block border border-stone-500"></span>Бронь</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-none bg-stone-300 inline-block border border-stone-400"></span>Сдано</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center my-6 relative">
              <svg viewBox="0 0 800 400" className="w-full max-w-xl h-auto drop-shadow-none">
                <rect x="10" y="10" width="780" height="380" rx="0" className="fill-[#F4F1EE] stroke-[#1A1A1A]/25 stroke-2" />
                <rect x="50" y="180" width="700" height="40" className="fill-stone-200/50 stroke-stone-300/50" />
                <text x="400" y="204" textAnchor="middle" className="fill-stone-500 font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                  Центральный холл и коридор
                </text>
                {renderOffice('01', 'M 50,50 L 320,50 L 320,180 L 50,180 Z', 185, 115, 140)}
                {renderOffice('02', 'M 320,50 L 750,50 L 750,180 L 320,180 Z', 535, 115, 140)}
                {renderOffice('03', 'M 50,220 L 380,220 L 380,350 L 50,350 Z', 215, 285, 310)}
                {renderOffice('04', 'M 380,220 L 750,220 L 750,350 L 380,350 Z', 565, 285, 310)}
              </svg>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-none px-4 py-3 text-xs text-stone-700 font-medium border border-[#1A1A1A]/10">
              <Info className="w-4 h-4 text-stone-500 shrink-0" />
              <span>Кликните на помещение на схеме, чтобы посмотреть параметры и расчёт справа</span>
            </div>
          </div>

          <div className="min-h-[520px]">
            {activeOffice ? (
              <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 space-y-6 h-full flex flex-col">
                <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-5 gap-4">
                  <div className="space-y-2 text-left">
                    <span className="text-[9px] uppercase font-sans tracking-[0.2em] border border-[#1A1A1A]/20 text-stone-700 px-2 py-1 rounded-none font-bold inline-block">
                      Помещение {activeOffice.number}
                    </span>
                    <h4 className="text-xl font-sans font-bold text-stone-900 mt-1.5">
                      Офис на {activeOffice.floor} этаже
                    </h4>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-[10px] uppercase tracking-wider font-sans font-bold ${
                    activeOffice.status === 'free'
                      ? 'bg-white text-stone-900 border border-red-700/30'
                      : activeOffice.status === 'booked'
                        ? 'bg-white text-stone-700 border border-stone-300'
                        : 'bg-stone-200 text-stone-600 font-bold'
                  }`}>
                    {activeOffice.status === 'free' && <CheckCircle2 className="w-3.5 h-3.5 text-red-700" />}
                    {getStatusText(activeOffice.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="bg-white border border-[#1A1A1A]/5 p-3.5 rounded-none">
                    <span className="text-stone-550 text-[9px] block font-bold uppercase tracking-wider font-sans">Площадь</span>
                    <span className="text-stone-900 font-sans font-extrabold text-base block mt-0.5">{activeOffice.area} м²</span>
                  </div>
                  <div className="bg-white border border-[#1A1A1A]/5 p-3.5 rounded-none">
                    <span className="text-stone-550 text-[9px] block font-bold uppercase tracking-wider font-sans">Формат</span>
                    <span className="text-stone-900 text-xs font-bold block mt-1 truncate">{activeOffice.type === 'Cabinet' ? 'Кабинетный' : activeOffice.type === 'OpenSpace' ? 'Open-space' : activeOffice.type === 'EntireFloor' ? 'Этаж целиком' : 'Переговорная'}</span>
                  </div>
                  <div className="bg-white border border-[#1A1A1A]/5 p-3.5 rounded-none col-span-2">
                    <span className="text-stone-550 text-[9px] block font-bold uppercase tracking-wider font-sans">Окна</span>
                    <span className="text-stone-900 text-xs font-bold block mt-1">
                      {activeOffice.windows === 'courtyard' ? 'Во внутренний тихий двор' : activeOffice.windows === 'street' ? 'На улицу' : 'Панорамные / мансардные окна'}
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-red-700/15 p-4 rounded-none text-left">
                  <div className="flex justify-between items-baseline mb-1 gap-4">
                    <span className="text-stone-600 text-[10px] uppercase tracking-wider font-sans font-bold">Ставка за м² в месяц:</span>
                    <span className="text-stone-900 text-xs font-bold">{activeOffice.pricePerSqmMonth.toLocaleString('ru')} ₽</span>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-[#1A1A1A]/10 pt-2.5 mt-2.5 gap-4">
                    <span className="text-stone-650 text-xs font-sans uppercase tracking-wider font-bold">Расчёт за месяц:</span>
                    <span className="text-[#1A1A1A] font-sans font-extrabold text-xl md:text-2xl">
                      {calculateMonthlyPrice(activeOffice).toLocaleString('ru')} ₽ <span className="text-[10px] font-sans font-medium text-stone-500 lowercase">/ мес</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-[#1A1A1A]/10 pt-2.5 mt-2.5 gap-4">
                    <span className="text-stone-500 text-[10px] font-sans uppercase tracking-wider font-bold">Ориентир за год:</span>
                    <span className="text-stone-700 font-sans font-bold text-sm">
                      {calculateAnnualPrice(activeOffice).toLocaleString('ru')} ₽
                    </span>
                  </div>
                  <span className="text-[9px] text-stone-400 block mt-2 text-right">
                    * Расчёт: площадь × 1 250 ₽/м²/мес. Прямая аренда, без комиссии брокерам.
                  </span>
                </div>

                <div className="space-y-2 text-left">
                  <span className="text-stone-850 text-[10px] uppercase tracking-wider font-bold font-sans block">Описание</span>
                  <p className="text-stone-600 text-xs leading-relaxed font-sans">
                    {activeOffice.description}
                  </p>
                </div>

                {activeOffice.features && activeOffice.features.length > 0 && (
                  <div className="space-y-4 pb-2 text-left flex-grow">
                    <span className="text-stone-850 text-[10px] uppercase tracking-wider font-bold font-sans block">Комплектация и удобства</span>
                    <div className="grid grid-cols-1 gap-2">
                      {activeOffice.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-stone-700 text-[11px] font-medium leading-none">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-700" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeOffice.status === 'free' ? (
                  <button
                    onClick={() => onOfficeSelect(activeOffice)}
                    className="w-full bg-red-700 hover:bg-red-800 text-white font-sans text-xs uppercase tracking-[0.22em] font-bold py-4 rounded-none transition flex items-center justify-center gap-1.5 cursor-pointer shadow-none mt-auto"
                  >
                    Записаться на просмотр
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="w-full bg-stone-200 text-stone-550 font-sans text-xs uppercase tracking-[0.18em] font-bold py-4 rounded-none flex items-center justify-center gap-2 cursor-not-allowed mt-auto">
                    <ShieldOff className="w-4 h-4 text-stone-400" />
                    Офис забронирован или арендован
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none p-10 text-center flex flex-col items-center justify-center h-full min-h-[520px]">
                <Building className="w-10 h-10 text-stone-400 mb-2.5" />
                <span className="text-stone-500 text-sm font-medium font-sans">Для вывода параметров выберите любой свободный офис</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
