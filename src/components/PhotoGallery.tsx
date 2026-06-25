import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  group: 'offices' | 'building';
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: 'https://allwebs.ru/images/2026/05/27/b05d9ef87bd6822bd8e4cd6f9929a306.png',
    alt: 'Помещение под производство или складской формат',
    title: 'Помещение под гибкий формат',
    description: 'Площади можно адаптировать под офис, шоурум, легкое производство или сервисные задачи.',
    group: 'offices'
  },
  {
    src: 'https://allwebs.ru/images/2026/05/27/3df3763a4e94d4c9b664eea8798f1335.png',
    alt: 'Офисные помещения в БЦ Красноярд',
    title: 'Офисные помещения',
    description: 'Готовые блоки для команд разного размера: от кабинетов до open-space.',
    group: 'offices'
  },
  {
    src: 'https://allwebs.ru/images/2026/05/27/cc04f40ef6d42683ab126f6d075cde6c.png',
    alt: 'Внутренний двор БЦ Красноярд',
    title: 'Внутренний двор',
    description: 'Закрытая территория бизнес-центра с удобной навигацией и спокойной деловой атмосферой.',
    group: 'building'
  },
  {
    src: 'https://allwebs.ru/images/2026/05/27/fdc5c91993831af84958fc9b59fb10.png',
    alt: 'Внутренний двор и проходы БЦ Красноярд',
    title: 'Территория бизнес-центра',
    description: 'Аккуратные проходы, чистая территория и понятный доступ к корпусам.',
    group: 'building'
  },
  {
    src: 'https://allwebs.ru/images/2026/05/27/8fcc38593aea4df2e1aceea4e7b3bb1d.png',
    alt: 'Территория БЦ Красноярд',
    title: 'Обслуживание территории',
    description: 'Собственная эксплуатация, регулярная уборка и поддержание порядка на объекте.',
    group: 'building'
  },
  {
    src: 'https://allwebs.ru/images/2026/05/27/9787547e584cfba775c497fa7b89a40c.png',
    alt: 'Фасад здания БЦ Красноярд',
    title: 'Фасад здания',
    description: 'Историческая кирпичная архитектура и благоустроенный двор в районе Красносельской.',
    group: 'building'
  }
];

export default function PhotoGallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev! + 1));
    }
  };

  const renderGroup = (title: string, description: string, group: GalleryImage['group']) => {
    const groupImages = GALLERY_IMAGES.map((image, index) => ({ image, index })).filter(item => item.image.group === group);

    return (
      <div className="space-y-6">
        <div className="text-left max-w-3xl">
          <h3 className="font-sans text-xl md:text-2xl text-stone-900 font-bold leading-tight">{title}</h3>
          <p className="font-sans text-stone-600 text-xs md:text-sm leading-relaxed mt-2">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groupImages.map(({ image, index }) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className="group bg-white border border-[#1A1A1A]/10 text-left cursor-pointer transition-all duration-300 hover:border-[#1A1A1A]/30 rounded-none overflow-hidden"
            >
              <div className="relative h-64 bg-stone-200 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 right-4 p-2 bg-white/85 backdrop-blur-sm border border-[#1A1A1A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none">
                  <Maximize2 className="w-4 h-4 text-stone-900" />
                </div>
              </div>
              <div className="p-5 space-y-2 min-h-[130px]">
                <span className="text-[9px] font-sans font-bold text-red-700 tracking-wider uppercase block">БЦ КРАСНОЯРД</span>
                <h4 className="font-sans font-bold text-stone-900 text-base leading-snug">
                  {image.title}
                </h4>
                <p className="font-sans text-xs text-stone-600 leading-relaxed">
                  {image.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="gallery" className="bg-[#F8F6F2] py-24 scroll-mt-20 border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 border border-[#1A1A1A]/15 bg-white px-3 py-1 text-stone-900 font-sans text-[10px] font-bold uppercase tracking-widest rounded-none">
            <ImageIcon className="w-3.5 h-3.5 text-red-700" />
            <span>Фотографии объекта</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-bold leading-tight">
            Фотографии бизнес-центра Красноярд на Красносельской
          </h2>
          <p className="font-sans text-stone-600 text-sm md:text-base leading-relaxed">
            Отдельно показываем офисные помещения и внешнюю инфраструктуру, чтобы фотографии и подписи читались синхронно и без наложений.
          </p>
        </div>

        <div className="space-y-14">
          {renderGroup('Офисы и помещения', 'Готовые площади для размещения команды, переговорных зон, шоурума или сервисного блока.', 'offices')}
          {renderGroup('Здание и территория', 'Фасад, двор и общая инфраструктура бизнес-центра на Красносельской.', 'building')}
        </div>

        {activeImageIndex !== null && (
          <div
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 bg-[#0F0F0E]/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4"
          >
            <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center text-left bg-gradient-to-b from-black/80 to-transparent z-10">
              <div>
                <h4 className="font-sans font-bold text-white text-base md:text-lg">
                  {GALLERY_IMAGES[activeImageIndex].title}
                </h4>
                <p className="font-sans text-xs text-stone-400 mt-1">
                  {GALLERY_IMAGES[activeImageIndex].description}
                </p>
              </div>
              <button
                onClick={() => setActiveImageIndex(null)}
                className="p-2.5 text-stone-400 hover:text-white transition duration-200 bg-stone-900/60 border border-white/10 hover:border-white/30 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-w-5xl max-h-[75vh] flex items-center justify-center select-none">
              <button
                onClick={handlePrev}
                className="absolute left-4 md:-left-20 p-3 bg-stone-900/60 hover:bg-stone-850 text-stone-300 hover:text-white transition border border-white/10 z-20 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <img
                src={GALLERY_IMAGES[activeImageIndex].src}
                alt={GALLERY_IMAGES[activeImageIndex].alt}
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
                className="max-w-full max-h-[75vh] object-contain border border-white/10 shadow-2xl"
              />

              <button
                onClick={handleNext}
                className="absolute right-4 md:-right-20 p-3 bg-stone-900/60 hover:bg-stone-850 text-stone-300 hover:text-white transition border border-white/10 z-20 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute bottom-6 font-sans text-xs text-stone-500 tracking-widest">
              {activeImageIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
