import React from 'react';
import { DraftingCompass, MoveRight, Printer, KeyRound, Scale, Store, Box, Wrench } from 'lucide-react';

const officeServices = [
  {
    icon: <DraftingCompass className="w-5 h-5 text-red-700" />,
    title: 'Дизайн и проектирование офисов',
    description: 'Поможем продумать планировку, рабочие зоны, переговорные, места хранения и сценарии использования помещения.',
  },
  {
    icon: <Wrench className="w-5 h-5 text-red-700" />,
    title: 'Перепланировка и ремонт',
    description: 'Организуем перепланировку помещений, дизайн-проекты офисных пространств и ремонтные работы под задачи арендатора.',
  },
  {
    icon: <MoveRight className="w-5 h-5 text-red-700" />,
    title: 'Переезд и перенос вещей',
    description: 'Поможем с организацией переезда, переноской вещей и подготовкой офиса к началу работы команды.',
  },
];

const businessServices = [
  '3D-моделирование и 3D-печать',
  'изготовление печатей и штампов',
  'изготовление ключей и ремонт замков',
  'заправка картриджей',
  'юридическое сопровождение физических и юридических лиц',
  'подготовка и изготовление договоров',
  'торговая зона с магазином «Магнит»',
  'другие повседневные сервисы для бизнеса',
];

export default function TenantServices() {
  return (
    <section id="services" className="py-20 md:py-28 bg-[#F8F6F2] border-b border-[#1A1A1A]/10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-5 text-left">
            <span className="text-[10px] font-sans font-bold text-stone-800 uppercase tracking-[0.22em] border border-[#1A1A1A]/20 px-4 py-2 bg-white inline-block rounded-none">
              Сервисы на объекте
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
              Услуги для арендаторов и бизнеса
            </h2>
            <p className="text-stone-600 font-sans text-sm md:text-base leading-relaxed max-w-xl">
              Кроме аренды помещений, на площадке доступны услуги, которые помогают быстрее подготовить офис, организовать переезд и закрыть повседневные задачи компании.
            </p>
            <div className="bg-white border border-[#1A1A1A]/10 rounded-none p-5 text-left">
              <span className="text-[10px] text-red-700 font-sans uppercase tracking-[0.22em] font-bold block mb-2">
                Под ключ для въезда
              </span>
              <p className="text-stone-650 font-sans text-xs md:text-sm leading-relaxed">
                Дизайн, проектирование, ремонт, перепланировка и переезд могут обсуждаться индивидуально под формат помещения и задачи арендатора.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {officeServices.map((service) => (
                <div key={service.title} className="bg-white border border-[#1A1A1A]/10 p-6 rounded-none text-left h-full flex flex-col gap-4 hover:border-[#1A1A1A]/30 transition">
                  <div className="p-3 bg-[#F4F1EE] w-fit rounded-none">
                    {service.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-sans font-bold text-stone-900 text-base leading-snug">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs text-stone-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 text-left">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <span className="text-[10px] text-red-700 font-sans uppercase tracking-[0.22em] font-bold block mb-2">
                    Дополнительная инфраструктура
                  </span>
                  <h3 className="font-sans font-bold text-stone-900 text-xl md:text-2xl leading-tight">
                    Услуги, которые помогают вашему бизнесу
                  </h3>
                </div>
                <div className="flex gap-2 text-stone-500">
                  <Printer className="w-5 h-5" />
                  <KeyRound className="w-5 h-5" />
                  <Scale className="w-5 h-5" />
                  <Store className="w-5 h-5" />
                  <Box className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {businessServices.map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-[#F4F1EE]/60 border border-[#1A1A1A]/5 p-3.5 rounded-none">
                    <span className="w-1.5 h-1.5 bg-red-700 rounded-full mt-2 shrink-0"></span>
                    <span className="font-sans text-xs md:text-sm text-stone-700 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
