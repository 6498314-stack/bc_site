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

type LayoutShape = {
  number: string;
  d: string;
  labelX: number;
  labelY: number;
  metaY: number;
};

const RENT_RATE_PER_SQM_MONTH = 1250;

const mockOffices: OfficeSpace[] = [
  {
    id: 'o_101',
    number: '101',
    floor: 1,
    area: 15,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Компактный кабинет для 1–2 рабочих мест, индивидуального специалиста или небольшого отдела.',
    features: ['Готовая отделка', 'Оптоволоконный интернет', 'Тихая зона', 'Быстрый въезд'],
  },
  {
    id: 'o_102',
    number: '102',
    floor: 1,
    area: 20,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Небольшой кабинет для 2–3 сотрудников с возможностью организовать рабочее место руководителя.',
    features: ['Готовое освещение', 'Интернет', 'Кондиционирование'],
  },
  {
    id: 'o_103',
    number: '103',
    floor: 1,
    area: 25,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'street',
    description: 'Кабинет на 3–4 рабочих места. Подойдет для продаж, консультационного офиса или проектной команды.',
    features: ['Вентиляция', 'Готовая отделка', 'Видеодомофон'],
  },
  {
    id: 'o_104',
    number: '104',
    floor: 1,
    area: 54,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'street',
    description: 'Светлый кабинетный офис для небольшой команды на 6–8 рабочих мест.',
    features: ['Приточно-вытяжная вентиляция', 'Оптоволоконный интернет', 'Готовая отделка', 'Кондиционирование'],
  },
  {
    id: 'o_105',
    number: '105',
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
    id: 'o_106',
    number: '106',
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
    area: 18,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'street',
    description: 'Компактный кабинет на 1–2 человека с хорошим естественным освещением.',
    features: ['Регулировка отопления', 'Оптоволокно', 'Сигнализация'],
  },
  {
    id: 'o_202',
    number: '202',
    floor: 2,
    area: 22,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Небольшой кабинет для команды из 2–4 человек рядом с тихой внутренней зоной.',
    features: ['Приточная вентиляция', 'Loft-отделка', 'Кухонный уголок рядом'],
  },
  {
    id: 'o_203',
    number: '203',
    floor: 2,
    area: 42,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'street',
    description: 'Угловой кабинет на 5–7 человек с удобной формой под рабочую группу.',
    features: ['Оптоволокно', 'Кондиционирование', 'Готовая отделка'],
  },
  {
    id: 'o_204',
    number: '204',
    floor: 2,
    area: 75,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'occupied',
    type: 'MeetingRoom',
    windows: 'courtyard',
    description: 'Конференц-зона или лекторий.',
    features: ['Шумоизоляция'],
  },
  {
    id: 'o_205',
    number: '205',
    floor: 2,
    area: 110,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'courtyard',
    description: 'Офисный блок для команды до 15–18 сотрудников с возможностью выделить переговорную.',
    features: ['Зонирование', 'Климат-контроль', 'Готовая отделка'],
  },
  {
    id: 'o_206',
    number: '206',
    floor: 2,
    area: 160,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'booked',
    type: 'OpenSpace',
    windows: 'panoramic',
    description: 'Большой офисный блок с открытой планировкой и отдельными зонами.',
    features: ['2 переговорные', 'Серверная зона', 'Климат-контроль'],
  },
  {
    id: 'o_301',
    number: '301',
    floor: 3,
    area: 25,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Кабинет на 3–4 рабочих места с видом во внутренний двор.',
    features: ['Подвесные светильники', 'Wi-Fi', 'Магнитный замок'],
  },
  {
    id: 'o_302',
    number: '302',
    floor: 3,
    area: 35,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'street',
    description: 'Компактный loft-офис с высокими потолками и открытыми инженерными конструкциями.',
    features: ['Потолки 3.6 м', 'Центральное охлаждение', 'Акцентное освещение'],
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
    area: 88,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'courtyard',
    description: 'Сбалансированный open-space с тихой стороной и видом во двор.',
    features: ['Зонирование', 'Климат-контроль', 'Готовая отделка'],
  },
  {
    id: 'o_305',
    number: '305',
    floor: 3,
    area: 145,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'street',
    description: 'Loft-офис для команды до 20–25 сотрудников с открытой планировкой.',
    features: ['Потолки 3.8 м', 'Центральное охлаждение', 'Акцентное освещение'],
  },
  {
    id: 'o_306',
    number: '306',
    floor: 3,
    area: 450,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'occupied',
    type: 'EntireFloor',
    windows: 'panoramic',
    description: 'Крупный офисный блок в левом крыле здания.',
    features: ['Премиум доступ'],
  },
  {
    id: 'o_401',
    number: '401',
    floor: 4,
    area: 20,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Небольшой мансардный кабинет для 2–3 сотрудников.',
    features: ['Мансардные потолки', 'Готовая отделка', 'Тихая зона'],
  },
  {
    id: 'o_402',
    number: '402',
    floor: 4,
    area: 40,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'panoramic',
    description: 'Мансардный кабинет с выразительной архитектурой и зенитными окнами.',
    features: ['Зенитные окна', 'Мансардные потолки', 'Дизайнерское освещение'],
  },
  {
    id: 'o_403',
    number: '403',
    floor: 4,
    area: 95,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'MeetingRoom',
    windows: 'courtyard',
    description: 'Многофункциональное помещение под переговорную, тренинг-зону или офис.',
    features: ['Маркерные стены', 'Подготовка под проектор', 'Акустические панели'],
  },
  {
    id: 'o_404',
    number: '404',
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
    id: 'o_405',
    number: '405',
    floor: 4,
    area: 240,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'panoramic',
    description: 'Большой мансардный офис на верхнем этаже с гибкой планировкой.',
    features: ['Доступ на террасу', 'Мансардные потолки', 'Дизайнерское освещение'],
  }
];

const floorLayouts: Record<number, LayoutShape[]> = {
  1: [
    { number: '101', d: 'M 50,45 L 170,45 L 170,180 L 50,180 Z', labelX: 110, labelY: 105, metaY: 128 },
    { number: '102', d: 'M 170,45 L 300,45 L 300,180 L 170,180 Z', labelX: 235, labelY: 105, metaY: 128 },
    { number: '103', d: 'M 300,45 L 460,45 L 460,180 L 300,180 Z', labelX: 380, labelY: 105, metaY: 128 },
    { number: '104', d: 'M 460,45 L 750,45 L 750,180 L 460,180 Z', labelX: 605, labelY: 105, metaY: 128 },
    { number: '105', d: 'M 50,220 L 380,220 L 380,355 L 50,355 Z', labelX: 215, labelY: 280, metaY: 303 },
    { number: '106', d: 'M 380,220 L 750,220 L 750,355 L 380,355 Z', labelX: 565, labelY: 280, metaY: 303 },
  ],
  2: [
    { number: '201', d: 'M 50,45 L 205,45 L 205,170 L 50,170 Z', labelX: 128, labelY: 100, metaY: 123 },
    { number: '202', d: 'M 205,45 L 360,45 L 360,170 L 205,170 Z', labelX: 282, labelY: 100, metaY: 123 },
    { number: '203', d: 'M 360,45 L 750,45 L 750,170 L 360,170 Z', labelX: 555, labelY: 100, metaY: 123 },
    { number: '204', d: 'M 50,230 L 250,230 L 250,355 L 50,355 Z', labelX: 150, labelY: 285, metaY: 308 },
    { number: '205', d: 'M 250,230 L 500,230 L 500,355 L 250,355 Z', labelX: 375, labelY: 285, metaY: 308 },
    { number: '206', d: 'M 500,230 L 750,230 L 750,355 L 500,355 Z', labelX: 625, labelY: 285, metaY: 308 },
  ],
  3: [
    { number: '301', d: 'M 50,45 L 210,45 L 210,165 L 50,165 Z', labelX: 130, labelY: 98, metaY: 121 },
    { number: '302', d: 'M 210,45 L 420,45 L 420,165 L 210,165 Z', labelX: 315, labelY: 98, metaY: 121 },
    { number: '303', d: 'M 420,45 L 750,45 L 750,165 L 420,165 Z', labelX: 585, labelY: 98, metaY: 121 },
    { number: '304', d: 'M 50,220 L 300,220 L 300,355 L 50,355 Z', labelX: 175, labelY: 282, metaY: 305 },
    { number: '305', d: 'M 300,220 L 565,220 L 565,355 L 300,355 Z', labelX: 432, labelY: 282, metaY: 305 },
    { number: '306', d: 'M 565,190 L 750,190 L 750,355 L 565,355 Z', labelX: 658, labelY: 265, metaY: 288 },
  ],
  4: [
    { number: '401', d: 'M 75,65 L 210,45 L 230,170 L 75,190 Z', labelX: 150, labelY: 112, metaY: 135 },
    { number: '402', d: 'M 230,45 L 430,45 L 430,170 L 230,170 Z', labelX: 330, labelY: 102, metaY: 125 },
    { number: '403', d: 'M 430,45 L 725,65 L 725,190 L 430,170 Z', labelX: 575, labelY: 112, metaY: 135 },
    { number: '404', d: 'M 75,225 L 360,225 L 360,355 L 75,335 Z', labelX: 218, labelY: 285, metaY: 308 },
    { number: '405', d: 'M 360,225 L 725,225 L 725,335 L 360,355 Z', labelX: 542, labelY: 285, metaY: 308 },
  ],
};

export default function OfficeSelector({ onOfficeSelect }: OfficeSelectorProps) {
  const [selectedFloor, setSelectedFloor] = useState<number>(2);
  const [activeOffice, setActiveOffice] = useState<OfficeSpace | null>(mockOffices.find(o => o.floor === 2 && o.status === 'free') || null);

  const currentFloorOffices = mockOffices.filter(o => o.floor === selectedFloor);
  const currentFloorLayout = floorLayouts[selectedFloor] || [];
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

  const getOfficeByNumber = (number: string) => currentFloorOffices.find(o => o.number === number);

  const renderOffice = (shape: LayoutShape) => {
    const office = getOfficeByNumber(shape.number);
    const isActive = activeOffice?.number === shape.number;
    return (
      <g key={shape.number}>
        <path
          d={shape.d}
          className={`transition-all duration-300 ${getStatusClass(office?.status || 'occupied', isActive)}`}
          onClick={() => {
            if (office) setActiveOffice(office);
          }}
        />
        <text x={shape.labelX} y={shape.labelY} textAnchor="middle" className="fill-[#1A1A1A] font-sans font-bold pointer-events-none text-base">
          Офис {shape.number}
        </text>
        <text x={shape.labelX} y={shape.metaY} textAnchor="middle" className="fill-stone-600 font-sans text-[10px] uppercase tracking-wider pointer-events-none font-bold">
          {office?.area || 0} м² • {office?.type === 'Cabinet' ? 'Кабинет' : office?.type === 'MeetingRoom' ? 'Переговорная' : office?.type === 'EntireFloor' ? 'Этаж' : 'Open Space'}
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
              Выберите этаж и помещение на схеме: добавили компактные кабинеты от 15 м², отдельные варианты 20 и 25 м², а также разные планировки по этажам.
            </p>
          </div>
          
          <div className="flex items-center bg-[#F4F1EE] border border-[#1A1A1A]/10 p-1 rounded-none self-start md:self-auto shrink-0 overflow-x-auto max-w-full">
            {[1, 2, 3, 4].map((fl) => (
              <button
                key={fl}
                onClick={() => selectFloor(fl)}
                className={`px-4 py-2.5 rounded-none font-sans font-bold text-xs uppercase tracking-[0.16em] transition cursor-pointer whitespace-nowrap ${
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
            <span className="text-stone-550 text-[10px] block font-bold uppercase tracking-wider font-sans">Мин. площадь</span>
            <span className="text-stone-900 font-sans font-extrabold text-xl sm:text-2xl mt-1 block">от 15 м²</span>
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
                {selectedFloor === 4 ? (
                  <path d="M 75,210 C 190,185 610,185 725,210" className="fill-none stroke-stone-300/80 stroke-[18]" />
                ) : (
                  <rect x="50" y="185" width="700" height="35" className="fill-stone-200/50 stroke-stone-300/50" />
                )}
                <text x="400" y="208" textAnchor="middle" className="fill-stone-500 font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                  {selectedFloor === 4 ? 'Мансардный проход' : 'Центральный холл и коридор'}
                </text>
                {currentFloorLayout.map(renderOffice)}
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
