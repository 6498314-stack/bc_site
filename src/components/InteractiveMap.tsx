import React, { useState } from 'react';
import { MapPin, Compass, Train, Car } from 'lucide-react';

export default function InteractiveMap() {
  const [activeTab, setActiveTab] = useState<'walk' | 'car'>('walk');

  const walkSteps = [
    { text: 'Выход один из станции метро «Красносельская».' },
    { text: 'Поверните направо и пройдите вдоль улицы Верхняя Красносельская около 200 метров.' },
    { text: 'Поверните во двор у строений дома 2/1.' },
    { text: 'Вы на месте! Современная охраняемая территория и вход в БЦ «Красносельский».' }
  ];

  const carRoutes = [
    { text: 'С внешней стороны ТТК: съезд на ул. Краснопрудную в сторону центра. Движение около 600м до разворота.' },
    { text: 'С Садового Кольца: съезд на ул. Каланчевскую или Краснопрудную, прямо около 1.5 км. Заезд во внутренний двор под СКУД-шлагбаум по предварительному звонку.' }
  ];

  const nearbyPlaces = [
    { name: 'Станция метро «Красносельская»', type: 'metro', distance: '7 мин пешком', description: 'Сокольническая (крупнейшая красная ветка) — легкая доступность в любую часть центра за 10-15 минут.' },
    { name: 'Кафе-столовая «Обед-Буфет»', type: 'food', distance: '1 мин (внутри БЦ)', description: 'Просторная современная столовая со свежими обедами, суши и пиццей по демократичным ценам.' },
    { name: 'Площадь трех вокзалов', type: 'metro', distance: '14 мин пешком', description: 'Ленинградский, Ярославский и Казанский вокзалы. Прямые поезда, МЦД-2 и МЦД-4.' },
    { name: 'Собственная парковка', type: 'car', distance: '0 мин (на территории)', description: 'Закрытый охраняемый паркинг для арендаторов с бесключевым автоматическим доступом по номерам машин.' },
    { name: 'Магазины «Ашан» и ТЦ «Тройка»', type: 'food', distance: '4 мин на авто / 10 мин пешком', description: 'Крупный торгово-развлекательный комплекс со всей необходимой сопутствующей инфраструктурой.' },
  ];

  const yandexMapUrl = 'https://yandex.ru/map-widget/v1/?ll=37.663100%2C55.779300&z=17&mode=search&text=Москва%2C%20улица%20Верхняя%20Красносельская%2C%20д.%202%2F1';

  return (
    <section id="map" className="py-20 md:py-28 bg-[#F4F1EE] border-t border-b border-[#1A1A1A]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-[10px] font-sans font-bold text-red-700 uppercase tracking-[0.25em] border border-red-700/30 px-4 py-2 bg-white inline-block rounded-none">
            Локация и транспорт
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-900 tracking-tight leading-tight">
            Отличная доступность в <span className="font-serif italic font-black text-red-700">центре Москвы</span>
          </h2>
          <p className="text-stone-600 font-sans text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
            Мы находимся в ЦАО г. Москвы — в престижном историческом районе с развитыми узлами сообщения,
            что делает поездки максимально комфортными для сотрудников и партнеров.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-white border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#1A1A1A] italic">
                Как до нас добраться
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
                    <span className="font-serif italic font-black text-red-700 text-lg shrink-0 leading-none">
                      {idx + 1}.
                    </span>
                    <p className="text-stone-600 font-sans leading-normal text-xs md:text-sm">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-[#1A1A1A]/10 pt-6">
              <h4 className="text-[10px] font-sans font-bold text-stone-900 uppercase tracking-widest">
                Что находится рядом:
              </h4>
              <div className="space-y-3 overflow-y-auto max-h-52 pr-1">
                {nearbyPlaces.map((pl, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 bg-[#F4F1EE]/30 p-3 rounded-none border border-[#1A1A1A]/5 hover:border-[#1A1A1A]/15 transition duration-200">
                    <div className="space-y-1">
                      <span className="font-serif font-black italic text-stone-900 text-xs md:text-sm block">{pl.name}</span>
                      <span className="text-stone-550 font-sans text-[11px] block leading-relaxed">{pl.description}</span>
                    </div>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-700/10 px-2 py-1 shrink-0 self-start rounded-none">
                      {pl.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1A1A] text-white rounded-none p-4 flex items-center gap-3">
              <Compass className="w-5 h-5 text-red-500 shrink-0" />
              <p className="font-mono text-[9px] uppercase tracking-wider text-stone-300 leading-normal">
                Координаты: <strong className="text-white">55.7793, 37.6631</strong> (пропускной пункт: <strong className="text-white">+79175219421</strong>).
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
              title="Интерактивная карта БЦ на Красносельской"
              id="yandex-map-frame"
              className="absolute inset-0 select-none grayscale contrast-[0.95] hover:grayscale-0 transition duration-500"
            ></iframe>

            <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur border border-[#1A1A1A]/10 p-4 rounded-none shadow-none max-w-sm flex flex-col gap-3.5 z-10 text-left">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 bg-[#1A1A1A] text-white rounded-none shrink-0">
                  <MapPin className="w-5 h-5 text-red-600 animate-pulse" />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="font-serif font-bold italic text-stone-900 text-sm block">БЦ на Красносельской</span>
                  <span className="text-stone-500 font-sans text-[11px] block">ул. Верхняя Красносельская, д. 2/1 (строения 2, 3, 4)</span>
                  <span className="text-emerald-700 text-[9px] font-sans font-bold block uppercase tracking-wider">● Свободная парковка активна</span>
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
