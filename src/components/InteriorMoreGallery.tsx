import React, { useState } from 'react';
import { Building2, Maximize2, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { src: '/images/interiors/interior-extra-01.webp', title: 'Кабинет с рабочей зоной', description: 'Готовый кабинет с рабочим столом, диваном и базовой мебелью.' },
  { src: '/images/interiors/interior-extra-02.webp', title: 'Переговорная зона', description: 'Отдельное помещение для встреч и работы руководителя.' },
  { src: '/images/interiors/interior-extra-03.webp', title: 'Переговорный стол', description: 'Просторная переговорная с большим столом и посадочными местами.' },
  { src: '/images/interiors/interior-extra-04.webp', title: 'Офисный блок с проходом', description: 'Несколько зон внутри одного офисного блока.' },
  { src: '/images/interiors/interior-extra-05.webp', title: 'Кабинет с диваном', description: 'Рабочая часть и зона ожидания в одном помещении.' },
  { src: '/images/interiors/interior-extra-06.webp', title: 'Зона отдыха', description: 'Lounge-зона для встреч и коротких рабочих пауз.' },
  { src: '/images/interiors/interior-extra-07.webp', title: 'Вход в офисный блок', description: 'Внутренний проход и входы в помещения.' },
  { src: '/images/interiors/interior-extra-08.webp', title: 'Вид с крыши', description: 'Панорамный вид с верхнего уровня бизнес-центра.' },
  { src: '/images/interiors/interior-extra-09.webp', title: 'Просторный open-space', description: 'Большое светлое помещение с высокими потолками.' },
  { src: '/images/interiors/interior-extra-10.webp', title: 'Современный кабинет', description: 'Светлый кабинет с мебелью и доской для планирования.' },
];

export default function InteriorMoreGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const openGallery = () => setIsOpen(true);

  const handlePrev = (event: React.MouseEvent) => {
    event.stopPropagation();
    setActive((current) => {
      if (current === null) return current;
      return current === 0 ? photos.length - 1 : current - 1;
    });
  };

  const handleNext = (event: React.MouseEvent) => {
    event.stopPropagation();
    setActive((current) => {
      if (current === null) return current;
      return current === photos.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <div className="bg-white border border-[#1A1A1A]/10 rounded-none p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 text-left">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[10px] font-sans font-bold text-red-700 uppercase tracking-[0.22em] block">
            Подборка помещений
          </span>
          <h3 className="font-sans text-xl md:text-2xl text-stone-900 font-bold leading-tight">
            Больше фото внутри БЦ
          </h3>
          <p className="font-sans text-stone-600 text-xs md:text-sm leading-relaxed">
            Дополнительные виды кабинетов, переговорных, open-space помещений, входных зон и вида с верхнего уровня бизнес-центра.
          </p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-red-700 hover:bg-red-800 text-white font-sans text-[10px] uppercase tracking-[0.18em] font-bold px-6 py-3.5 rounded-none transition cursor-pointer flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
          {isOpen ? 'Скрыть фото' : 'Показать фото внутри'}
        </button>
      </div>

      {!isOpen && (
        <button
          onClick={openGallery}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2 w-full text-left cursor-pointer group"
          aria-label="Показать дополнительные фотографии внутри БЦ"
        >
          {photos.slice(0, 5).map((photo, index) => (
            <span key={photo.src} className="relative h-28 md:h-36 overflow-hidden border border-[#1A1A1A]/10 bg-[#F4F1EE] block">
              <img src={photo.src} alt={photo.title} loading="lazy" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition duration-300" />
              {index === 4 && (
                <span className="absolute inset-0 bg-[#1A1A1A]/65 group-hover:bg-[#1A1A1A]/75 text-white flex flex-col items-center justify-center text-center px-3 transition duration-300">
                  <Building2 className="w-5 h-5 mb-2" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.16em] font-bold">ещё 10 фото</span>
                  <span className="font-sans text-[9px] uppercase tracking-[0.14em] text-white/75 mt-1">открыть подборку</span>
                </span>
              )}
            </span>
          ))}
        </button>
      )}

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              onClick={() => setActive(index)}
              className="group bg-white border border-[#1A1A1A]/10 text-left cursor-pointer transition-all duration-300 hover:border-[#1A1A1A]/30 rounded-none overflow-hidden"
            >
              <div className="relative h-56 bg-stone-200 overflow-hidden">
                <img src={photo.src} alt={photo.title} loading="lazy" className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-4 right-4 p-2 bg-white/85 backdrop-blur-sm border border-[#1A1A1A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none">
                  <Maximize2 className="w-4 h-4 text-stone-900" />
                </div>
              </div>
              <div className="p-5 space-y-2 min-h-[130px]">
                <span className="text-[9px] font-sans font-bold text-red-700 tracking-wider uppercase block">БЦ КРАСНОЯРД</span>
                <h4 className="font-sans font-bold text-stone-900 text-base leading-snug">{photo.title}</h4>
                <p className="font-sans text-xs text-stone-600 leading-relaxed">{photo.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {active !== null && (
        <div onClick={() => setActive(null)} className="fixed inset-0 bg-[#0F0F0E]/95 backdrop-blur-md z-[110] flex flex-col items-center justify-center p-4">
          <button onClick={() => setActive(null)} className="absolute top-5 right-5 p-2.5 text-stone-400 hover:text-white bg-stone-900/60 border border-white/10 cursor-pointer z-30">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute top-5 left-5 right-16 text-left z-20">
            <h4 className="font-sans font-bold text-white text-base md:text-lg">{photos[active].title}</h4>
            <p className="font-sans text-xs text-stone-400 mt-1">{photos[active].description}</p>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-stone-900/70 hover:bg-stone-800 text-stone-300 hover:text-white transition border border-white/10 z-20 cursor-pointer"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img src={photos[active].src} alt={photos[active].title} onClick={(e) => e.stopPropagation()} className="max-w-full max-h-[78vh] object-contain border border-white/10 shadow-2xl" />

          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-stone-900/70 hover:bg-stone-800 text-stone-300 hover:text-white transition border border-white/10 z-20 cursor-pointer"
            aria-label="Следующее фото"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 font-sans text-xs text-stone-500 tracking-widest">
            {active + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
