/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OfficeSpace } from '../types';
import { Eye, Info, CheckCircle2, ShieldOff, Sparkles, Building, Layers, ArrowRight } from 'lucide-react';

interface OfficeSelectorProps {
  onOfficeSelect: (office: OfficeSpace) => void;
}

const mockOffices: OfficeSpace[] = [
  // Floor 1
  {
    id: 'o_101',
    number: '101',
    floor: 1,
    area: 54,
    pricePerSqmYear: 18500,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Уютный светлый офис с кирпичной стеной в стиле Лофт. Идеально под небольшое агентство или кабинет IT-команды на 6-8 рабочих мест.',
    features: ['Приточно-вытяжная вентиляция', 'Интернет оптоволокно', 'Мягкий ковролин', 'Собственный кондиционер'],
  },
  {
    id: 'o_102',
    number: '102',
    floor: 1,
    area: 120,
    pricePerSqmYear: 19000,
    status: 'occupied',
    type: 'OpenSpace',
    windows: 'street',
    description: 'Просторный офис с высокими арочными окнами, выходящими на улицу.',
    features: ['СКУД', 'Зонирование'],
  },
  {
    id: 'o_103',
    number: '103',
    floor: 1,
    area: 35,
    pricePerSqmYear: 18000,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Компактное камерное помещение на 4-5 рабочих мест. Напротив тихой рекреационной зоны во внутреннем дворике.',
    features: ['Вентиляция', 'Готовое освещение', 'Видеодомофон'],
  },
  {
    id: 'o_104',
    number: '104',
    floor: 1,
    area: 180,
    pricePerSqmYear: 21000,
    status: 'booked',
    type: 'OpenSpace',
    windows: 'panoramic',
    description: 'Представительский офис с панорамным остеклением и индивидуальным входом.',
    features: ['Дизайнерская отделка'],
  },
  
  // Floor 2
  {
    id: 'o_201',
    number: '201',
    floor: 2,
    area: 42,
    pricePerSqmYear: 19500,
    status: 'free',
    type: 'Cabinet',
    windows: 'street',
    description: 'Стильный угловой кабинет на 5-7 человек. Много естественного света благодаря двойному остеклению.',
    features: ['Регулировка отопления', 'Оптическое волокно 1Гб/с', 'Сигнализация'],
  },
  {
    id: 'o_202',
    number: '202',
    floor: 2,
    area: 75,
    pricePerSqmYear: 19000,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Просторный двухкомнатный блок с возможностью обустройства приемной или кабинета руководителя.',
    features: ['Приточная вентиляция', 'Качественный ремонт Loft', 'Кухонный уголок'],
  },
  {
    id: 'o_203',
    number: '203',
    floor: 2,
    area: 310,
    pricePerSqmYear: 20500,
    status: 'free',
    type: 'OpenSpace',
    windows: 'panoramic',
    description: 'Изумительный просторный Open-Space, вмещающий до 45-50 сотрудников. Высота потолков 3.6 метра, панорамные виды на улочки Красносельского района.',
    features: ['Зона кухни с выводами воды', '2 переговорные комнаты в блоке', 'Мультизональный климат-контроль', 'Встроенная серверная стойка'],
  },
  {
    id: 'o_204',
    number: '204',
    floor: 2,
    area: 65,
    pricePerSqmYear: 18500,
    status: 'occupied',
    type: 'MeetingRoom',
    windows: 'courtyard',
    description: 'Конференц-зона или лекторий.',
    features: ['Шумоизоляция'],
  },

  // Floor 3
  {
    id: 'o_301',
    number: '301',
    floor: 3,
    area: 88,
    pricePerSqmYear: 19500,
    status: 'free',
    type: 'OpenSpace',
    windows: 'courtyard',
    description: 'Сбалансированный офис формата Open-Space с собственным санузлом и переговоркой. Тихая сторона, вид на зеленый дворик.',
    features: ['Подвесные светильники', 'Скоростной Wi-Fi', 'Магнитный замок'],
  },
  {
    id: 'o_302',
    number: '302',
    floor: 3,
    area: 145,
    pricePerSqmYear: 20000,
    status: 'free',
    type: 'OpenSpace',
    windows: 'street',
    description: 'Великолепный Loft-офис с высокими потолками (3.8м) и открытыми инженерными конструкциями. Индивидуальный дизайн-код.',
    features: ['Потолки 3.8м', 'Центральное охлаждение', 'Светодиодное акцентное освещение', 'Покрытие антипыль'],
  },
  {
    id: 'o_303',
    number: '303',
    floor: 3,
    area: 56,
    pricePerSqmYear: 19500,
    status: 'booked',
    type: 'Cabinet',
    windows: 'street',
    description: 'Уютный кабинет с дизайнерской мебелью.',
    features: ['Меблировка'],
  },
  {
    id: 'o_304',
    number: '304',
    floor: 3,
    area: 450,
    pricePerSqmYear: 22000,
    status: 'occupied',
    type: 'EntireFloor',
    windows: 'panoramic',
    description: 'Полный этаж в левом крыле.',
    features: ['Премиум доступ'],
  },

  // Floor 4 (Penthouse level with roof features)
  {
    id: 'o_402',
    number: '402',
    floor: 4,
    area: 240,
    pricePerSqmYear: 22500,
    status: 'free',
    type: 'OpenSpace',
    windows: 'panoramic',
    description: 'Абсолютный флагман БЦ. Офис мансардного типа на последнем этаже с зенитными окнами и прямым выходом на благоустроенную крышу бизнес-центра.',
    features: ['Эксклюзивный доступ на террасу', 'Мансардные скошенные потолки', 'Дизайнерские люстры', 'Супер-акустика'],
  },
  {
    id: 'o_403',
    number: '403',
    floor: 4,
    area: 112,
    pricePerSqmYear: 20000,
    status: 'free',
    type: 'OpenSpace',
    windows: 'courtyard',
    description: 'Шикарный мансардный лофт на 15-20 рабочих мест. Скаты крыши отделаны сосновым брусом, создающим невероятный рабочий уют.',
    features: ['Отделка эко-деревом', 'Мультизонный кондиционер', 'Ролл-шторы на пульте управления'],
  },
  {
    id: 'o_404',
    number: '404',
    floor: 4,
    area: 95,
    pricePerSqmYear: 19000,
    status: 'free',
    type: 'MeetingRoom',
    windows: 'courtyard',
    description: 'Многофункциональный зал-переговорная, который можно использовать как собственный лекторий, тренинговую зону или стильный офис.',
    features: ['Маркерные стены', 'Подготовка под видеопроектор', 'Акустические панели'],
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
    if (firstFreeOnFloor) {
      setActiveOffice(firstFreeOnFloor);
    } else {
      const anyOnFloor = mockOffices.find(o => o.floor === floor);
      setActiveOffice(anyOnFloor || null);
    }
  };

  const calculateMonthlyPrice = (office: OfficeSpace) => {
    return Math.round((office.area * office.pricePerSqmYear) / 12);
  };

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
        case 'free': return 'fill-emerald-500/30 stroke-emerald-600 stroke-2';
        case 'booked': return 'fill-amber-500/30 stroke-amber-600 stroke-2';
        case 'occupied': return 'fill-rose-500/20 stroke-rose-600 stroke-2';
      }
    }
    switch (status) {
      case 'free': return 'fill-emerald-100/50 hover:fill-[#E3DEC6] stroke-emerald-500 stroke-[1.5] cursor-pointer';
      case 'booked': return 'fill-amber-50/50 hover:fill-amber-100 stroke-amber-400 stroke-[1.5] cursor-not-allowed';
      case 'occupied': return 'fill-stone-200/40 stroke-stone-300 stroke-[1.5] cursor-not-allowed';
    }
  };

  return (
    <section id="offices" className="py-20 md:py-28 bg-[#FFFFFF] scroll-mt-20 border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1A1A]/10 pb-10 mb-12">
          <div className="space-y-3 text-left">
            <span className="text-[10px] font-sans font-bold text-red-700 uppercase tracking-[0.25em] border border-red-700/30 px-4 py-2 bg-transparent inline-block rounded-none">
              Интерактивная панель выбора
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
              Интерактивный выбор <br />
              <span className="font-serif italic font-black text-red-700">офиса по этажам</span>
            </h2>
            <p className="text-stone-600 font-sans text-xs md:text-sm max-w-2xl leading-relaxed">
              Выберите интересующий Вас этаж, наведите курсор на интерактивную планировку этажа, изучите параметры и подайте онлайн-заявку.
            </p>
          </div>
          
          {/* Floor Toggles */}
          <div className="flex items-center bg-[#F4F1EE] border border-[#1A1A1A]/10 p-1 rounded-none self-start md:self-auto shrink-0">
            {[1, 2, 3, 4].map((fl) => (
              <button
                key={fl}
                onClick={() => selectFloor(fl)}
                className={`px-4.5 py-2.5 rounded-none font-sans font-bold text-xs uppercase tracking-[0.18em] transition cursor-pointer ${
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

        {/* Floor quick metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-left">
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 p-4 rounded-none">
            <span className="text-stone-550 text-[10px] block font-bold uppercase tracking-wider font-sans">Свободно помещений</span>
            <span className="text-stone-900 font-serif font-black italic text-xl sm:text-2xl mt-1 block">{freeOfficesCount}</span>
          </div>
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 p-4 rounded-none">
            <span className="text-stone-550 text-[10px] block font-bold uppercase tracking-wider font-sans">Свободная площадь этажа</span>
            <span className="text-stone-900 font-serif font-black italic text-xl sm:text-2xl mt-1 block">{totalFreeArea} м²</span>
          </div>
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 p-4 rounded-none">
            <span className="text-stone-550 text-[10px] block font-bold uppercase tracking-wider font-sans">Высота потолков</span>
            <span className="text-stone-900 font-serif font-black italic text-xl sm:text-2xl mt-1 block">{selectedFloor === 4 ? '3.8м' : '3.6м'}</span>
          </div>
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 p-4 rounded-none">
            <span className="text-stone-550 text-[10px] block font-bold uppercase tracking-wider font-sans">Тип планировок</span>
            <span className="text-stone-800 font-sans text-xs sm:text-sm mt-2 block font-bold truncate">Loft открытый, кабинеты</span>
          </div>
        </div>

        {/* Interactive Workspace Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Vector Blueprint Plotter (Left 7 Columns) */}
          <div className="lg:col-span-7 bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none p-6 md:p-10 flex flex-col justify-between h-[450px] md:h-[500px]">
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4">
              <span className="text-[10px] font-sans font-bold text-stone-600 flex items-center gap-1.5 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-stone-500" />
                Интерактивный чертеж • {selectedFloor} этаж
              </span>
              <div className="flex gap-3 text-[9px] font-sans font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-none bg-emerald-500/20 inline-block border border-[#1A1A1A]/20"></span>Свободно</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-none bg-amber-500/20 inline-block border border-amber-600"></span>Бронь</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-none bg-stone-300 inline-block border border-stone-400"></span>Сдано</span>
              </div>
            </div>

            {/* SVG Interactive Architecture Grid */}
            <div className="flex-1 flex items-center justify-center my-6 relative">
              <svg viewBox="0 0 800 400" className="w-full max-w-xl h-auto drop-shadow-none">
                {/* Outer frame representing building footprint */}
                <rect x="10" y="10" width="780" height="380" rx="0" className="fill-[#F4F1EE] stroke-[#1A1A1A]/25 stroke-2" />
                {/* Central common hallway */}
                <rect x="50" y="180" width="700" height="40" className="fill-stone-200/50 stroke-stone-300/50" />
                <text x="400" y="204" textAnchor="middle" className="fill-stone-500 font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                  Центральный Холл и коридор
                </text>

                {/* Office Polygons mapping based on local coordinate indexes */}
                {/* Top offices (Numbered 1-2) */}
                <g>
                  {/* Top-Left: Office X01 */}
                  <path
                    d="M 50,50 L 320,50 L 320,180 L 50,180 Z"
                    className={`transition-all duration-300 ${getStatusClass(
                      currentFloorOffices.find(o => o.number.endsWith('01'))?.status || 'occupied',
                      activeOffice?.number.endsWith('01') || false
                    )}`}
                    onClick={() => {
                      const o = currentFloorOffices.find(o => o.number.endsWith('01'));
                      if (o) setActiveOffice(o);
                    }}
                  />
                  <text x="185" y="115" textAnchor="middle" className="fill-[#1A1A1A] font-serif font-bold pointer-events-none text-lg italic">
                    Офис {selectedFloor}01 {currentFloorOffices.find(o => o.number.endsWith('01'))?.status === 'free' ? '✔️' : ''}
                  </text>
                  <text x="185" y="140" textAnchor="middle" className="fill-stone-600 font-sans text-[10px] uppercase tracking-wider pointer-events-none font-bold">
                    {currentFloorOffices.find(o => o.number.endsWith('01'))?.area || 0} м² • {currentFloorOffices.find(o => o.number.endsWith('01'))?.type === 'Cabinet' ? 'Кабинет' : 'Open Space'}
                  </text>
                </g>

                <g>
                  {/* Top-Right: Office X02 */}
                  <path
                    d="M 320,50 L 750,50 L 750,180 L 320,180 Z"
                    className={`transition-all duration-300 ${getStatusClass(
                      currentFloorOffices.find(o => o.number.endsWith('02'))?.status || 'occupied',
                      activeOffice?.number.endsWith('02') || false
                    )}`}
                    onClick={() => {
                      const o = currentFloorOffices.find(o => o.number.endsWith('02'));
                      if (o) setActiveOffice(o);
                    }}
                  />
                  <text x="535" y="115" textAnchor="middle" className="fill-[#1A1A1A] font-serif font-bold pointer-events-none text-lg italic">
                    Офис {selectedFloor}02 {currentFloorOffices.find(o => o.number.endsWith('02'))?.status === 'free' ? '✔️' : ''}
                  </text>
                  <text x="535" y="140" textAnchor="middle" className="fill-stone-600 font-sans text-[10px] uppercase tracking-wider pointer-events-none font-bold">
                    {currentFloorOffices.find(o => o.number.endsWith('02'))?.area || 0} м² • {currentFloorOffices.find(o => o.number.endsWith('02'))?.type === 'Cabinet' ? 'Кабинет' : 'Open Space'}
                  </text>
                </g>

                {/* Bottom offices (Numbered 3-4) */}
                <g>
                  {/* Bottom-Left: Office X03 */}
                  <path
                    d="M 50,220 L 380,220 L 380,350 L 50,350 Z"
                    className={`transition-all duration-300 ${getStatusClass(
                      currentFloorOffices.find(o => o.number.endsWith('03'))?.status || 'occupied',
                      activeOffice?.number.endsWith('03') || false
                    )}`}
                    onClick={() => {
                      const o = currentFloorOffices.find(o => o.number.endsWith('03'));
                      if (o) setActiveOffice(o);
                    }}
                  />
                  <text x="215" y="285" textAnchor="middle" className="fill-[#1A1A1A] font-serif font-bold pointer-events-none text-lg italic">
                    Офис {selectedFloor}03 {currentFloorOffices.find(o => o.number.endsWith('03'))?.status === 'free' ? '✔️' : ''}
                  </text>
                  <text x="215" y="310" textAnchor="middle" className="fill-stone-600 font-sans text-[10px] uppercase tracking-wider pointer-events-none font-bold">
                    {currentFloorOffices.find(o => o.number.endsWith('03'))?.area || 0} м² • {currentFloorOffices.find(o => o.number.endsWith('03'))?.type === 'Cabinet' ? 'Кабинет' : 'Open Space'}
                  </text>
                </g>

                <g>
                  {/* Bottom-Right: Office X04 */}
                  <path
                    d="M 380,220 L 750,220 L 750,350 L 380,350 Z"
                    className={`transition-all duration-300 ${getStatusClass(
                      currentFloorOffices.find(o => o.number.endsWith('04'))?.status || 'occupied',
                      activeOffice?.number.endsWith('04') || false
                    )}`}
                    onClick={() => {
                      const o = currentFloorOffices.find(o => o.number.endsWith('04'));
                      if (o) setActiveOffice(o);
                    }}
                  />
                  <text x="565" y="285" textAnchor="middle" className="fill-[#1A1A1A] font-serif font-bold pointer-events-none text-lg italic">
                    Офис {selectedFloor}04 {currentFloorOffices.find(o => o.number.endsWith('04'))?.status === 'free' ? '✔️' : ''}
                  </text>
                  <text x="565" y="310" textAnchor="middle" className="fill-stone-600 font-sans text-[10px] uppercase tracking-wider pointer-events-none font-bold">
                    {currentFloorOffices.find(o => o.number.endsWith('04'))?.area || 0} м² • {currentFloorOffices.find(o => o.number.endsWith('04'))?.type === 'Cabinet' ? 'Кабинет' : 'Open Space'}
                  </text>
                </g>
              </svg>
            </div>

            <div className="flex items-center gap-2 bg-[#E2DDD9] rounded-none px-4 py-3 text-xs text-stone-700 font-medium">
              <Info className="w-4 h-4 text-red-700 shrink-0" />
              <span>Кликните на выделенные элементы планировки, чтобы переключить активный офис</span>
            </div>
          </div>

          {/* Details Sidebar Card (Right 5 Columns) */}
          <div className="lg:col-span-5">
            {activeOffice ? (
              <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 space-y-6">
                
                {/* Office Title Details */}
                <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-5">
                  <div className="space-y-1 text-left">
                    <span className="text-[9px] uppercase font-sans tracking-[0.22em] bg-[#1A1A1A] text-white px-2 py-0.5 rounded-none font-bold">
                      ПОМЕЩЕНИЕ {activeOffice.number}
                    </span>
                    <h4 className="text-xl font-serif font-bold text-stone-900 mt-1.5 italic">
                      Офис на {activeOffice.floor} этаже
                    </h4>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-[10px] uppercase tracking-wider font-sans font-bold ${
                    activeOffice.status === 'free'
                      ? 'bg-emerald-50 text-emerald-850 border border-emerald-200'
                      : activeOffice.status === 'booked'
                        ? 'bg-amber-50 text-amber-850 border border-amber-200'
                        : 'bg-stone-350 text-stone-700 font-bold'
                  }`}>
                    {activeOffice.status === 'free' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {getStatusText(activeOffice.status)}
                  </span>
                </div>

                {/* Main parameters grids */}
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="bg-white border border-[#1A1A1A]/5 p-3.5 rounded-none">
                    <span className="text-stone-550 text-[9px] block font-bold uppercase tracking-wider font-sans">Площадь</span>
                    <span className="text-stone-900 font-serif font-black italic text-base block mt-0.5">{activeOffice.area} м²</span>
                  </div>
                  <div className="bg-white border border-[#1A1A1A]/5 p-3.5 rounded-none">
                    <span className="text-stone-550 text-[9px] block font-bold uppercase tracking-wider font-sans">Формат</span>
                    <span className="text-stone-900 text-xs font-bold block mt-1 truncate">{activeOffice.type === 'Cabinet' ? 'Кабинетный' : activeOffice.type === 'OpenSpace' ? 'Open-Space' : 'Конференц-зал'}</span>
                  </div>
                  <div className="bg-white border border-[#1A1A1A]/5 p-3.5 rounded-none col-span-2">
                    <span className="text-stone-550 text-[9px] block font-bold uppercase tracking-wider font-sans">Окна выходят</span>
                    <span className="text-stone-900 text-xs font-bold block mt-1">
                      {activeOffice.windows === 'courtyard' ? 'Во внутренний тихий дворик (Солнечная сторона)' : activeOffice.windows === 'street' ? 'На улицу Краснопрудная (Классический вид)' : 'Панорамные мансардные окна (Эксклюзив)'}
                    </span>
                  </div>
                </div>

                {/* Price indicators */}
                <div className="bg-red-50/20 border border-red-700/15 p-4.5 rounded-none text-left">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-stone-600 text-[10px] uppercase tracking-wider font-sans font-bold">Ставка за м² в год:</span>
                    <span className="text-stone-900 font-mono text-xs font-bold">{activeOffice.pricePerSqmYear.toLocaleString('ru')} ₽</span>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-[#1A1A1A]/10 pt-2.5 mt-2.5">
                    <span className="text-stone-650 text-xs font-sans uppercase tracking-wider font-bold">Итого за месяц:</span>
                    <span className="text-[#1A1A1A] font-serif font-black text-xl md:text-2xl italic">
                      {calculateMonthlyPrice(activeOffice).toLocaleString('ru')} ₽ <span className="text-[10px] font-sans font-medium text-stone-500 lowercase">/ мес</span>
                    </span>
                  </div>
                  <span className="text-[9px] text-stone-400 block mt-2 text-right">
                    * Прямая аренда, без комиссии брокерам. НДС включен или УСН.
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-2 text-left">
                  <span className="text-stone-850 text-[10px] uppercase tracking-wider font-bold font-sans block">Описание объекта</span>
                  <p className="text-stone-600 text-xs leading-relaxed font-sans">
                    {activeOffice.description}
                  </p>
                </div>

                {/* Features Checklist */}
                {activeOffice.features && activeOffice.features.length > 0 && (
                  <div className="space-y-4 pb-2 text-left">
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

                {/* CTA Action */}
                {activeOffice.status === 'free' ? (
                  <button
                    onClick={() => onOfficeSelect(activeOffice)}
                    className="w-full bg-[#1A1A1A] hover:bg-red-800 text-white font-sans text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-none transition flex items-center justify-center gap-1.5 cursor-pointer shadow-none"
                  >
                    Забронировать офис {activeOffice.number}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="w-full bg-stone-200 text-stone-550 font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 rounded-none flex items-center justify-center gap-2 cursor-not-allowed">
                    <ShieldOff className="w-4 h-4 text-stone-400" />
                    Офис забронирован или арендован
                  </div>
                )}

              </div>
            ) : (
              <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none p-10 text-center flex flex-col items-center justify-center h-full">
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
