import React, { useState } from 'react';
import { MapPin, Compass, Train, Car } from 'lucide-react';

export default function InteractiveMap() {
  const [activeTab, setActiveTab] = useState<'walk' | 'car'>('walk');

  const walkSteps = [
    { text: 'Выход один из станции метро «Красносельская».' },
    { text: 'Пройдите по улице Верхняя Красносельская в сторону дома 2/1.' },
    { text: 'Общее время пешком от метро до БЦ — около 10 минут.' },
    { text: 'Поверните во двор у строений дома 2/1. Вы на территории БЦ Красноярд на Красносельской.' }
  ];

  const carRoutes = [
    { text: 'С внешней стороны ТТК: съезд на ул. Краснопрудную в сторону центра.' },
    { text: 'С Садового кольца: двигайтесь через Каланчевскую или Краснопрудную, далее к Верхней Красносельской.' },
    { text: 'Заезд во внутренний двор — по предварительному звонку через пропускной пункт.' }
  ];

  const nearbyPlaces = [
    { name: 'Станция метро «Красносельская»', distance: '10 мин пешком', description: 'Удобная связь с центром и Сокольнической линией.' },
    { name: 'Кафе-столовая на территории', distance: '1 мин', description: 'Ежедневные обеды и быстрый формат питания для сотрудников.' },
    { name: 'Площадь трех вокзалов', distance: '14 мин пешком', description: 'Ленинградский, Ярославский и Казанский вокзалы рядом.' },
    { name: 'Парковка на территории', distance: '0 мин', description: 'Закрытая охраняемая парковка для арендаторов.' },
    { name: 'ТЦ «Тройка» и магазины', distance: '10 мин пешком', description: 'Бытовая инфраструктура рядом с бизнес-центром.' },
  ];

  const yandexMapUrl = 'https://yandex.ru/map-widget/v1/?ll=37.663100%2C55.779300&z=17&mode=search&text=Москва%2C%20улица%20Верхняя%20Красносельская%2C%20д.%202%2F1';

  return (
    <section id="map" className="py-20 md:py-28 bg-[#F4F1EE] border-t border-b border-[#1A1A1A]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-[10px] font-sans font-bold text-stone-800 uppercase tracking-[0.22em] border border-[#1A1A1A]/20 px-4 py-2 bg-white inline-block rounded-none">
            Локация и транспорт
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Как добраться до БЦ Красноярд
          </h2>
          <p className="text-stone-600 font-sans text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
            Бизнес-центр находится на Красносельской, в 10 минутах пешком от метро «Красносельская» и рядом с ключевыми транспортными маршрутами центра Москвы.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-white border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-sans font-bold text-[#1A1A1A]">
                Маршрут до объекта
              </h3>

              <div className="grid grid-cols-2 bg-[#F4F1EE] p-1 border border-[#1A1A1A]/10 rounded-none">
                <button
                  onClick={() => setActiveTab('walk')}
                  className={`py-2 rounded-none font-sans font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition ${
                    activeTab === 'walk'
                      ? 'bg-[#1A1A1A] text-white shadow-none'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Train className="w-3.5 h-3.5" />
                  Пешком от метро
                </button>
                <button
                  onClick={() => setActiveTab('car')}
                  className={`py-2 rounded-none font-sans font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition ${
                    activeTab === 'car'
                      ? 'bg-[#1A1A1A] text-white shadow-none'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  На автомобиле
                </button>
              </div>

              <div className="space-y-3.5 bg-[#F4F1EE]/40 p-4 border border-[#1A1A1A]/5 rounded-none">
                {(activeTab === 'walk' ? walkSteps : carRoutes).map((step, idx) => (
                  <div key={idx} className="flex gap-3 text-xs md:text-sm items-start">
                    <span className="font-sans font-bold text-stone-900 text-sm shrink-0 leading-normal w-5">
                      {idx + 1}.
                    </span>
                    <p className="text-stone-600 font-sans leading-normal text-xs md:text-sm">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-[#1A1A1A]/10 pt-6">
              <h4 className="text-[10px] font-sans font-bold text-stone-900 uppercase tracking-widest">
                Что рядом:
              </h4>
              <div className="space-y-3 overflow-y-auto max-h-52 pr-1">
                {nearbyPlaces.map((pl, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 bg-[#F4F1EE]/30 p-3 rounded-none border border-[#1A1A1A]/5 hover:border-[#1A1A1A]/15 transition duration-200">
                    <div className="space-y-1">
                      <span className="font-sans font-bold text-stone-900 text-xs md:text-sm block">{pl.name}</span>
                      <span className="text-stone-550 font-sans text-[11px] block leading-relaxed">{pl.description}</span>
                    </div>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-stone-700 bg-white border border-[#1A1A1A]/10 px-2 py-1 shrink-0 self-start rounded-none">
                      {pl.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F4F1EE] text-stone-900 rounded-none p-4 flex items-center gap-3 border border-[#1A1A1A]/10">
              <Compass className="w-5 h-5 text-stone-500 shrink-0" />
              <p className="font-sans text-[10px] uppercase tracking-wider text-stone-600 leading-normal">
                Координаты: <strong className="text-stone-900">55.7793, 37.6631</strong>. Пропускной пункт: <strong className="text-stone-900">+79175219421</strong>.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-none overflow-hidden border border-[#1A1A1A]/10 relative h-[450px] lg:h-auto min-h-[400px]">
            <iframe
              src={yandexMapUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              title="Интерактивная карта БЦ Красноярд"
              id="yandex-map-frame"
              className="absolute inset-0 select-none grayscale contrast-[0.95] hover:grayscale-0 transition duration-500"
            ></iframe>

            <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur border border-[#1A1A1A]/10 p-4 rounded-none shadow-none max-w-sm flex flex-col gap-3.5 z-10 text-left">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 bg-[#F4F1EE] text-stone-900 rounded-none shrink-0 border border-[#1A1A1A]/10">
                  <MapPin className="w-5 h-5 text-red-700" />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="font-sans font-bold text-stone-900 text-sm block">БЦ Красноярд на Красносельской</span>
                  <span className="text-stone-500 font-sans text-[11px] block">ул. Верхняя Красносельская, д. 2/1</span>
                  <span className="text-stone-600 text-[9px] font-sans font-bold block uppercase tracking-wider">10 минут пешком от метро «Красносельская»</span>
                </div>
              </div>

              <a
                href="https://yandex.ru/maps/-/CPDDmCi6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-red-700 hover:bg-red-800 text-white font-sans text-[10px] uppercase font-bold tracking-widest py-2.5 px-4 transition rounded-none block cursor-pointer"
              >
                Открыть на Яндекс.Картах
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
