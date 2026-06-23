import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X, ClipboardList } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  onRequestOpen: () => void;
  bookingsCount: number;
  onOpenMyBookings: () => void;
}

export default function Header({
  onNavigate,
  activeSection,
  onRequestOpen,
  bookingsCount,
  onOpenMyBookings,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'О Бизнес-центре', id: 'about' },
    { label: 'Выбрать офис', id: 'offices' },
    { label: 'Галерея', id: 'gallery' },
    { label: 'Карта и проезд', id: 'map' },
    { label: 'Вопросы', id: 'faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4F1EE]/95 backdrop-blur-md shadow-sm border-b border-[#1A1A1A]/15 py-3'
          : 'bg-[#F4F1EE]/80 backdrop-blur-sm border-b border-[#1A1A1A]/10 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => {
              onNavigate('hero');
              setIsOpen(false);
            }}
            className="flex items-center text-left focus:outline-none group cursor-pointer"
          >
            <img
              src="https://allwebs.ru/images/2026/05/27/dedc6962b9764198dc2fcd5397230818.png"
              alt="БЦ Красносельский"
              referrerPolicy="no-referrer"
              className="h-10 md:h-12 w-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
            />
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-2 font-sans text-xs uppercase tracking-[0.18em] font-bold transition cursor-pointer ${
                  activeSection === item.id
                    ? 'text-red-700 border-b-2 border-red-700 rounded-none'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-none'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-4">
            <div className="flex flex-col text-right">
              <a
                href="tel:+79175219421"
                className="text-stone-900 hover:text-red-700 font-sans text-xs uppercase tracking-wider font-bold transition"
              >
                +79175219421
              </a>
              <span className="text-[9px] font-mono text-emerald-750 font-bold flex items-center gap-1 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                АКТИВЕН
              </span>
            </div>

            <button
              onClick={onOpenMyBookings}
              className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/40 rounded-none transition cursor-pointer"
              title="Мои заявки на аренду"
            >
              <ClipboardList className="w-5 h-5" />
              {bookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-700 text-white font-mono text-[9px] font-bold w-4 h-4 rounded-none flex items-center justify-center animate-bounce">
                  {bookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={onRequestOpen}
              className="bg-[#1A1A1A] hover:bg-red-800 text-white py-3 px-5 uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-red-800 transition-colors rounded-none cursor-pointer"
            >
              ПОДАТЬ ЗАЯВКУ
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenMyBookings}
              className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/40 rounded-none transition"
            >
              <ClipboardList className="w-5 h-5" />
              {bookingsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-700 text-white font-mono text-[9px] font-bold w-3.5 h-3.5 rounded-none flex items-center justify-center">
                  {bookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/40 rounded-none transition focus:outline-none"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#F4F1EE] border-b border-stone-300 shadow-xl absolute top-full left-0 right-0 py-4 px-6 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`text-left px-4 py-3 font-sans text-xs uppercase tracking-[0.15em] font-bold transition ${
                  activeSection === item.id
                    ? 'text-red-700 bg-stone-200/50'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/30'
                }`}
              >
                {item.label}
              </button>
            ))}
            <hr className="border-stone-300 my-2" />
            <div className="flex flex-col gap-3 px-4 pt-2">
              <a
                href="tel:+79175219421"
                className="text-stone-950 font-bold text-sm tracking-wider flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-stone-400" />
                +79175219421
              </a>
              <a
                href="mailto:rent@bc-krasnoselskaya.ru"
                className="text-stone-600 text-xs flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-stone-400" />
                rent@bc-krasnoselskaya.ru
              </a>
              <button
                onClick={() => {
                  onRequestOpen();
                  setIsOpen(false);
                }}
                className="w-full bg-red-700 hover:bg-red-800 text-white text-[10px] uppercase font-bold tracking-[0.2em] py-3.5 rounded-none transition text-center mt-1"
              >
                ОСТАВИТЬ ЗАЯВКУ НА АРЕНДУ
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}