/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OfficeSpace } from '../types';
import { Info, CheckCircle2, ShieldOff, Building, Layers, ArrowRight, ScanSearch } from 'lucide-react';

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
    area: 63.03,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'street',
    description: 'Помещение правильной формы на 1 этаже. Подойдет под компактный офис, клиентскую зону или кабинетный блок.',
    features: ['1 этаж', 'Быстрый въезд', 'Подходит под офис / сервис'],
  },
  {
    id: 'o_102',
    number: '102',
    floor: 1,
    area: 103.56,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'street',
    description: 'Средний офисный блок с удобной прямоугольной планировкой и окнами на фасад.',
    features: ['Свободная планировка', 'Вход с общего коридора', 'Подходит под команду 10–14 человек'],
  },
  {
    id: 'o_103',
    number: '103',
    floor: 1,
    area: 52.41,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'street',
    description: 'Изолированный блок на 1 этаже для небольшой компании, бэк-офиса или проектной группы.',
    features: ['Изолированное помещение', 'Удобное зонирование', 'Тихая часть этажа'],
  },
  {
    id: 'o_104',
    number: '104',
    floor: 1,
    area: 87.47,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'booked',
    type: 'OpenSpace',
    windows: 'street',
    description: 'Просторное помещение в левом крыле. Сейчас в предварительной броне.',
    features: ['1 этаж', 'Подходит под open-space', 'Удобный доступ для разгрузки'],
  },
  {
    id: 'o_105',
    number: '105',
    floor: 1,
    area: 67.37,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Помещение во внутренней части этажа, удобно для тихой офисной работы и внутренних функций.',
    features: ['Тихая зона', 'Рядом с центральным узлом', 'Гибкая расстановка рабочих мест'],
  },
  {
    id: 'o_106',
    number: '106',
    floor: 1,
    area: 20.03,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Небольшой кабинет на 1–2 рабочих места, вспомогательный офис или переговорная.',
    features: ['Компактный формат', 'Подходит под кабинет', 'Рядом с лестничным узлом'],
  },
  {
    id: 'o_107',
    number: '107',
    floor: 1,
    area: 131.6,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'courtyard',
    description: 'Крупный блок в центральной части 1 этажа. Хорошо подходит под офис команды, шоурум или сервисный формат.',
    features: ['Большая площадь', 'Центральное расположение', 'Гибкая планировка'],
  },
  {
    id: 'o_108',
    number: '108',
    floor: 1,
    area: 37.11,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'street',
    description: 'Небольшой кабинетный блок в верхней правой части плана.',
    features: ['Фасадные окна', 'Для 3–5 сотрудников', 'Удобная форма'],
  },
  {
    id: 'o_109',
    number: '109',
    floor: 1,
    area: 38.42,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'street',
    description: 'Помещение под небольшой офис или переговорный блок рядом с лестничной клеткой.',
    features: ['Отдельный вход из общего коридора', 'Удобная посадка 4–6 мест', 'Фасадные окна'],
  },
  {
    id: 'o_110',
    number: '110',
    floor: 1,
    area: 136.74,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'OpenSpace',
    windows: 'street',
    description: 'Крупное помещение в правом крыле первого этажа. Подходит для полноценного офиса подразделения.',
    features: ['Open-space', 'Удобно для команды 14–18 человек', 'Прямоугольная планировка'],
  },
  {
    id: 'o_111',
    number: '111',
    floor: 1,
    area: 83.9,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'occupied',
    type: 'OpenSpace',
    windows: 'street',
    description: 'Помещение в правом торце 1 этажа. На данный момент сдано.',
    features: ['Занято арендатором', '1 этаж'],
  },
  {
    id: 'o_112',
    number: '112',
    floor: 1,
    area: 22.28,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'Cabinet',
    windows: 'courtyard',
    description: 'Небольшой изолированный кабинет в центрально-левой части этажа.',
    features: ['Компактный формат', 'Подходит под 2–3 рабочих места', 'Быстрый запуск'],
  },
  {
    id: 'o_113',
    number: '113',
    floor: 1,
    area: 505.04,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'free',
    type: 'EntireFloor',
    windows: 'courtyard',
    description: 'Самый крупный блок первого этажа. Можно рассматривать как производственно-офисное пространство, шоурум или складской блок с офисной функцией.',
    features: ['Крупный формат', 'Возможность деления', 'Подходит под нестандартные задачи'],
  },
  {
    id: 'o_114',
    number: '114',
    floor: 1,
    area: 171.82,
    pricePerSqmMonth: RENT_RATE_PER_SQM_MONTH,
    status: 'booked',
    type: 'OpenSpace',
    windows: 'street',
    description: 'Крупное помещение в правой нижней части. Сейчас на этапе переговоров с арендатором.',
    features: ['Крупная площадь', '1 этаж', 'Предварительная бронь'],
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
    { number: '101', d: 'M 40,40 L 250,40 L 250,108 L 40,108 Z', labelX: 145, labelY: 76, metaY: 95 },
    { number: '102', d: 'M 40,120 L 250,120 L 250,222 L 40,222 Z', labelX: 145, labelY: 170, metaY: 189 },
    { number: '103', d: 'M 40,234 L 250,234 L 250,308 L 40,308 Z', labelX: 145, labelY: 270, metaY: 289 },
    { number: '104', d: 'M 40,320 L 250,320 L 250,430 L 40,430 Z', labelX: 145, labelY: 372, metaY: 391 },
    { number: '105', d: 'M 270,120 L 386,120 L 386,282 L 270,282 Z', labelX: 328, labelY: 190, metaY: 209 },
    { number: '106', d: 'M 390,82 L 470,82 L 470,122 L 390,122 Z', labelX: 430, labelY: 101, metaY: 116 },
    { number: '107', d: 'M 390,124 L 556,124 L 556,260 L 390,260 Z', labelX: 473, labelY: 186, metaY: 205 },
    { number: '108', d: 'M 542,42 L 650,42 L 650,108 L 542,108 Z', labelX: 596, labelY: 76, metaY: 95 },
    { number: '109', d: 'M 652,42 L 780,42 L 780,108 L 652,108 Z', labelX: 716, labelY: 76, metaY: 95 },
    { number: '110', d: 'M 560,120 L 706,120 L 706,260 L 560,260 Z', labelX: 633, labelY: 186, metaY: 205 },
    { number: '111', d: 'M 708,120 L 800,120 L 800,260 L 708,260 Z', labelX: 754, labelY: 186, metaY: 205 },
    { number: '112', d: 'M 270,286 L 386,286 L 386,334 L 270,334 Z', labelX: 328, labelY: 306, metaY: 321 },
    { number: '113', d: 'M 390,286 L 620,286 L 620,430 L 390,430 Z', labelX: 505, labelY: 350, metaY: 369 },
    { number: '114', d: 'M 622,304 L 800,304 L 800,430 L 622,430 Z', labelX: 711, labelY: 360, metaY: 379 },
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

const typeLabelMap: Record<OfficeSpace['type'], string> = {
  Cabinet: 'Кабинет',
  OpenSpace: 'Open Space',
  MeetingRoom: 'Переговорная',
  EntireFloor: 'Крупный блок',
};

export default function OfficeSelector({ onOfficeSelect }: OfficeSelectorProps) {
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const [activeOffice, setActiveOffice] = useState<OfficeSpace | null>(mockOffices.find(o => o.floor === 1 && o.status === 'free') || null);

  const currentFloorOffices = mockOffices.filter(o => o.floor === selectedFloor);
  const currentFloorLayout = floorLayouts[selectedFloor] || [];
  const freeOfficesCount = currentFloorOffices.filter(o => o.status === 'free').length;
  const totalFreeArea = currentFloorOffices.reduce((acc, o) => (o.status === 'free' ? acc + o.area : acc), 0);

  const selectFloor = (floor: number) => {
    setSelectedFloor(floor);
    const firstFreeOnFloor = mockOffices.find(o => o.floor === floor && o.status === 'free');
    setActiveOffice(firstFreeOnFloor || mockOffices.find(o => o.floor === floor) || null);
  };

  const calculateMonthlyPrice = (office: OfficeSpace) => office.area * office.pricePerSqmMonth;
  const calculateAnnualPrice = (office: OfficeSpace) => calculateMonthlyPrice(office) * 12;

  const getStatusText = (status: 'free' | 'booked' | 'occupied') => {
    switch (status) {
      case 'free':
        return 'Свободен';
      case 'booked':
        return 'Забронирован';
      case 'occupied':
        return 'Сдан';
    }
  };

  const getStatusClass = (status: 'free' | 'booked' | 'occupied', isActive: boolean) => {
    if (isActive) {
      switch (status) {
        case 'free':
          return 'fill-[#DED4CB] stroke-red-700 stroke-2';
        case 'booked':
          return 'fill-[#E8DDCF] stroke-stone-600 stroke-2';
        case 'occupied':
          return 'fill-stone-200 stroke-stone-500 stroke-2';
      }
    }
    switch (status) {
      case 'free':
        return 'fill-[#F4F1EE] hover:fill-[#DED4CB] stroke-stone-500 stroke-[1.5] cursor-pointer';
      case 'booked':
        return 'fill-[#EEE7DE] hover:fill-[#E7DED2] stroke-stone-400 stroke-[1.5] cursor-not-allowed';
      case 'occupied':
        return 'fill-stone-200/70 stroke-stone-300 stroke-[1.5] cursor-not-allowed';
    }
  };

  const getOfficeByNumber = (number: string) => currentFloorOffices.find((o) => o.number === number);

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
        <text x={shape.labelX} y={shape.labelY} textAnchor="middle" className="fill-[#1A1A1A] font-sans font-bold pointer-events-none text-[14px]">
          {shape.number}
        </text>
        <text x={shape.labelX} y={shape.metaY} textAnchor="middle" className="fill-stone-600 font-sans text-[9px] uppercase tracking-wider pointer-events-none font-bold">
          {office ? `${office.area.toLocaleString('ru-RU', { minimumFractionDigits: office.area % 1 ? 2 : 0, maximumFractionDigits: 2 })} м²` : '—'}
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
              Первый этаж оцифрован по исходной схеме и превращён в карту для бронирования: можно выбрать помещение на плане, увидеть площадь и сразу открыть форму заявки.
            </p>
          </div>

          <div className="flex items-center bg-[#F4F1EE] border border-[#1A1A1A]/10 p-1 rounded-none self-start md:self-auto shrink-0 overflow-x-auto max-w-full">
            {[1, 2, 3, 4].map((fl) => (
              <button
                key={fl}
                onClick={() => selectFloor(fl)}
                className={`px-4 py-2.5 rounded-none font-sans font-bold text-xs uppercase tracking-[0.16em] transition cursor-pointer whitespace-nowrap ${
                  selectedFloor === fl ? 'bg-[#1A1A1A] text-white shadow-none' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
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
            <span className="text-stone-900 font-sans font-extrabold text-xl sm:text-2xl mt-1 block">
              {totalFreeArea.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} м²
            </span>
          </div>
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 p-4 rounded-none">
            <span className="text-stone-550 text-[10px] block font-bold uppercase tracking-wider font-sans">Ставка аренды</span>
            <span className="text-stone-900 font-sans font-extrabold text-xl sm:text-2xl mt-1 block">1 250 ₽</span>
            <span className="text-stone-500 font-sans text-[10px] block uppercase tracking-wider mt-0.5">за м² / месяц</span>
          </div>
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 p-4 rounded-none">
            <span className="text-stone-550 text-[10px] block font-bold uppercase tracking-wider font-sans">
              {selectedFloor === 1 ? 'Статус схемы' : 'Мин. площадь'}
            </span>
            <span className="text-stone-900 font-sans font-extrabold text-lg sm:text-xl mt-1 block">
              {selectedFloor === 1 ? 'Оцифрована' : 'от 15 м²'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[560px]">
            <div className="flex flex-col gap-4 border-b border-[#1A1A1A]/10 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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

              {selectedFloor === 1 && (
                <div className="flex items-start gap-2 bg-white border border-red-700/15 px-4 py-3 rounded-none text-left">
                  <ScanSearch className="w-4 h-4 text-red-700 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-stone-700 font-sans leading-relaxed">
                    Первый этаж собран по загруженной технической схеме и адаптирован под онлайн-выбор помещений.
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center my-6 relative overflow-hidden">
              <svg viewBox={selectedFloor === 1 ? '0 0 840 470' : '0 0 800 400'} className="w-full max-w-2xl h-auto drop-shadow-none">
                <rect x="10" y="10" width={selectedFloor === 1 ? '820' : '780'} height={selectedFloor === 1 ? '450' : '380'} rx="0" className="fill-[#F4F1EE] stroke-[#1A1A1A]/25 stroke-2" />
                {selectedFloor === 1 ? (
                  <>
                    <rect x="254" y="114" width="12" height="224" className="fill-stone-200/60" />
                    <rect x="382" y="42" width="12" height="388" className="fill-stone-200/60" />
                    <rect x="40" y="110" width="760" height="8" className="fill-stone-200/60" />
                    <rect x="40" y="312" width="760" height="8" className="fill-stone-200/60" />
                    <rect x="535" y="110" width="12" height="150" className="fill-stone-200/60" />
                    <text x="420" y="24" textAnchor="middle" className="fill-stone-500 font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                      Оцифрованная карта первого этажа
                    </text>
                  </>
                ) : selectedFloor === 4 ? (
                  <path d="M 75,210 C 190,185 610,185 725,210" className="fill-none stroke-stone-300/80 stroke-[18]" />
                ) : (
                  <rect x="50" y="185" width="700" height="35" className="fill-stone-200/50 stroke-stone-300/50" />
                )}
                {selectedFloor !== 1 && (
                  <text x="400" y="208" textAnchor="middle" className="fill-stone-500 font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                    {selectedFloor === 4 ? 'Мансардный проход' : 'Центральный холл и коридор'}
                  </text>
                )}
                {currentFloorLayout.map(renderOffice)}
              </svg>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-none px-4 py-3 text-xs text-stone-700 font-medium border border-[#1A1A1A]/10">
              <Info className="w-4 h-4 text-stone-500 shrink-0" />
              <span>
                {selectedFloor === 1
                  ? 'Кликните по помещению на схеме 1 этажа, чтобы посмотреть его параметры и отправить заявку.'
                  : 'Кликните на помещение на схеме, чтобы посмотреть параметры и расчёт справа.'}
              </span>
            </div>
          </div>

          <div className="min-h-[560px]">
            {activeOffice ? (
              <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 space-y-6 h-full flex flex-col">
                <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-5 gap-4">
                  <div className="space-y-2 text-left">
                    <span className="text-[9px] uppercase font-sans tracking-[0.2em] border border-[#1A1A1A]/20 text-stone-700 px-2 py-1 rounded-none font-bold inline-block">
                      Помещение {activeOffice.number}
                    </span>
                    <h4 className="text-xl font-sans font-bold text-stone-900 mt-1.5">Офис на {activeOffice.floor} этаже</h4>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-[10px] uppercase tracking-wider font-sans font-bold ${
                      activeOffice.status === 'free'
                        ? 'bg-white text-stone-900 border border-red-700/30'
                        : activeOffice.status === 'booked'
                          ? 'bg-white text-stone-700 border border-stone-300'
                          : 'bg-stone-200 text-stone-600 font-bold'
                    }`}
                  >
                    {activeOffice.status === 'free' && <CheckCircle2 className="w-3.5 h-3.5 text-red-700" />}
                    {getStatusText(activeOffice.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="bg-white border border-[#1A1A1A]/5 p-3.5 rounded-none">
                    <span className="text-stone-550 text-[9px] block font-bold uppercase tracking-wider font-sans">Площадь</span>
                    <span className="text-stone-900 font-sans font-extrabold text-base block mt-0.5">
                      {activeOffice.area.toLocaleString('ru-RU', { minimumFractionDigits: activeOffice.area % 1 ? 2 : 0, maximumFractionDigits: 2 })} м²
                    </span>
                  </div>
                  <div className="bg-white border border-[#1A1A1A]/5 p-3.5 rounded-none">
                    <span className="text-stone-550 text-[9px] block font-bold uppercase tracking-wider font-sans">Формат</span>
                    <span className="text-stone-900 text-xs font-bold block mt-1 truncate">{typeLabelMap[activeOffice.type]}</span>
                  </div>
                  <div className="bg-white border border-[#1A1A1A]/5 p-3.5 rounded-none col-span-2">
                    <span className="text-stone-550 text-[9px] block font-bold uppercase tracking-wider font-sans">Окна</span>
                    <span className="text-stone-900 text-xs font-bold block mt-1">
                      {activeOffice.windows === 'courtyard'
                        ? 'Во внутренний тихий двор'
                        : activeOffice.windows === 'street'
                          ? 'На улицу'
                          : 'Панорамные / мансардные окна'}
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
                      {Math.round(calculateMonthlyPrice(activeOffice)).toLocaleString('ru')} ₽{' '}
                      <span className="text-[10px] font-sans font-medium text-stone-500 lowercase">/ мес</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-[#1A1A1A]/10 pt-2.5 mt-2.5 gap-4">
                    <span className="text-stone-500 text-[10px] font-sans uppercase tracking-wider font-bold">Ориентир за год:</span>
                    <span className="text-stone-700 font-sans font-bold text-sm">{Math.round(calculateAnnualPrice(activeOffice)).toLocaleString('ru')} ₽</span>
                  </div>
                  <span className="text-[9px] text-stone-400 block mt-2 text-right">
                    * Расчёт: площадь × 1 250 ₽/м²/мес. Прямая аренда, без комиссии брокерам.
                  </span>
                </div>

                <div className="space-y-2 text-left">
                  <span className="text-stone-850 text-[10px] uppercase tracking-wider font-bold font-sans block">Описание</span>
                  <p className="text-stone-600 text-xs leading-relaxed font-sans">{activeOffice.description}</p>
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
              <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none p-10 text-center flex flex-col items-center justify-center h-full min-h-[560px]">
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
