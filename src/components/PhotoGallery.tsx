import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  sizeClass: string; // Tailwind grid span classes for a beautiful bento layout
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: 'https://allwebs.ru/images/2026/05/27/b05d9ef87bd6822bd8e4cd6f9929a306.png',
    alt: 'Помещения для промышленного производства',
    title: 'Помещения для промышленного производства',
    description: 'Помещения для промышленного производства, аренда, Москва, м.Красносельская',
    sizeClass: 'md:col-span-2 md:row-span-2'
  },
  {
    src: 'https://allwebs.ru/images/2026/05/27/3df3763a4e94d4c9b664eea8798f1335.png',
    alt: 'Офисные помещения',
    title: 'Офисные помещения',
    description: 'Офисные помещения в аренду, Москва, м.Красносельская',
    sizeClass: 'md:col-span-1'
  },
  {
    src: 'https://allwebs.ru/images/2026/05/27/cc04f40ef6d42683ab126f6d075cde6c.png',
    alt: 'Внутренний двор БЦ Красносельский',
    title: 'Внутренний двор БЦ Красносельский',
    description: 'Помещения с высококачественной Loft-отделкой, панорамным остеклением и кондиционированием.',
    sizeClass: 'md:col-span-1'
  },
  {
    src: 'https://allwebs.ru/images/2026/05/27/fdc5c91993831af84958fc9b59fbfb10.png',
    alt: 'Внутренний двор БЦ Красносельский (2)',
    title: 'Внутренний двор БЦ Красносельский (2)',
    description: 'Безупречная чистота, продуманный дизайн коридоров и навигации.',
    sizeClass: 'md:col-span-1'
  },
  {
    src: 'https://allwebs.ru/images/2026/05/27/8fcc38593aea4df2e1aceea4e7b3bb1d.png',
    alt: 'Чистая территория БЦ Красносельский',
    title: 'Уборка территории осуществляется своей собственной клининговой компанией',
    description: 'Уборка территории, Круглосуточная охрана',
    sizeClass: 'md:col-span-2'
  },
  {
    src: 'https://allwebs.ru/images/2026/05/27/9787547e584cfba775c497fa7b89a40c.png',
    alt: 'Фасад здания БЦ Красносельский',
    title: 'Фасад здания БЦ Красносельский',
    description: 'Благоустроенный закрытый двор, зоны отдыха с лавочками и гостевой паркинг.',
    sizeClass: 'md:col-span-2'
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

  return (
    <section id="gallery" className="bg-[#F8F6F2] py-24 scroll-mt-20 border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 border border-red-800/15 bg-red-50 px-3 py-1 text-red-950 font-sans text-[10px] font-bold uppercase tracking-widest rounded-none">
            <ImageIcon className="w-3.5 h-3.5 text-red-700" />
            <span>Фотогалерея</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-bold italic leading-tight">
            Реальные фотографии бизнес-центра
          </h2>
          <p className="font-sans text-stone-605 text-sm md:text-base leading-relaxed">
            Посмотрите, как выглядит ваше будущие рабочие места. Все фотографии сделаны непосредственно в БЦ «Красносельский» и отражают актуальное премиальное состояние интерьеров и архитектуры.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`${img.sizeClass} group relative overflow-hidden bg-stone-200 border border-[#1A1A1A]/10 cursor-pointer transition-all duration-300 hover:shadow-lg`}
            >
              {/* Image with no referrer protection */}
              <img
                src={img.src}
                alt={img.alt}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />

              {/* Minimal Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-left z-10">
                <span className="text-[9px] font-mono font-bold text-red-500 tracking-wider uppercase mb-1 drop-shadow-sm">БЦ «Красносельский»</span>
                <h3 className="font-serif font-bold italic text-white text-base md:text-lg mb-1 leading-snug">
                  {img.title}
                </h3>
                <p className="font-sans text-xs text-stone-300 line-clamp-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                  {img.description}
                </p>
              </div>

              {/* Absolute Corner Expand Icon */}
              <div className="absolute top-4 right-4 p-2 bg-stone-900/40 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Lightbox Portal */}
        {activeImageIndex !== null && (
          <div
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 bg-[#0F0F0E]/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4"
          >
            {/* Top Bar controls */}
            <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center text-left bg-gradient-to-b from-black/80 to-transparent z-10">
              <div>
                <h4 className="font-serif font-bold italic text-white text-base md:text-lg">
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

            {/* Main Stage Image wrapper */}
            <div className="relative max-w-5xl max-h-[75vh] flex items-center justify-center select-none">
              
              {/* Prev key */}
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

              {/* Next key */}
              <button
                onClick={handleNext}
                className="absolute right-4 md:-right-20 p-3 bg-stone-900/60 hover:bg-stone-850 text-stone-300 hover:text-white transition border border-white/10 z-20 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Image Counters */}
            <div className="absolute bottom-6 font-mono text-xs text-stone-500 tracking-widest">
              {activeImageIndex + 1} / {GALLERY_IMAGES.length}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
