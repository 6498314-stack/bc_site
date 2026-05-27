/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import OfficeSelector from './components/OfficeSelector';
import InteractiveMap from './components/InteractiveMap';
import ApplicationForm from './components/ApplicationForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { OfficeSpace, BookingRequest } from './types';
import { CalendarCheck, ShieldCheck, User, Phone, CheckCircle, Info, Sparkles, X, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedOffice, setSelectedOffice] = useState<OfficeSpace | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);

  // Local storage synchronized bookings list
  useEffect(() => {
    const loaded = localStorage.getItem('bc_bookings');
    if (loaded) {
      setBookings(JSON.parse(loaded));
    }
  }, []);

  // Update localStorage when local requests change
  const handleBookingSubmit = (newBooking: BookingRequest) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    setIsFormOpen(false);
    setIsMyBookingsOpen(true); // Open the results drawer directly so they see active feedback
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOfficeSelect = (office: OfficeSpace) => {
    setSelectedOffice(office);
    setIsFormOpen(true);
  };

  const openFormDirect = () => {
    setSelectedOffice(null);
    setIsFormOpen(true);
  };

  // Simulate manager review updates over time (just dynamic status updates on reload/toggle)
  const simulateManagerResponse = (id: string, newStatus: 'accepted' | 'declined') => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    setBookings(updated);
    localStorage.setItem('bc_bookings', JSON.stringify(updated));
  };

  const deleteBooking = (id: string) => {
    const filtered = bookings.filter(b => b.id !== id);
    setBookings(filtered);
    localStorage.setItem('bc_bookings', JSON.stringify(filtered));
  };

  return (
    <div className="min-h-screen flex flex-col antialiased bg-[#FAF9F6]">
      
      {/* Dynamic Navigation Header */}
      <Header
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onRequestOpen={openFormDirect}
        bookingsCount={bookings.length}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      {/* Hero Welcome Slide */}
      <Hero
        onRentClick={openFormDirect}
        onExploreClick={() => handleNavigate('offices')}
      />

      {/* Main Blocks */}
      <main className="flex-grow space-y-0">
        
        {/* Core informational advantages */}
        <Advantages />

        {/* Custom interactive office plan selector */}
        <OfficeSelector onOfficeSelect={handleOfficeSelect} />

        {/* Fully operational interactive maps block */}
        <InteractiveMap />

        {/* FAQs base knowledge */}
        <FAQ />

      </main>

      {/* Footer contacts & compliance */}
      <Footer onNavigate={handleNavigate} />

      {/* Dialog Overlay Modal: Rent Booking Request Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1A1A]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg">
            <ApplicationForm
              selectedOffice={selectedOffice}
              onClose={() => setIsFormOpen(false)}
              onSubmitSuccess={handleBookingSubmit}
            />
          </div>
        </div>
      )}

      {/* Drawer Overlay Modal: 'My Bookings & Simulated Live Progress Tracker' */}
      {isMyBookingsOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/70 backdrop-blur-sm flex justify-end">
          <div className="relative w-full max-w-md bg-white h-full shadow-none flex flex-col justify-between overflow-hidden border-l border-[#1A1A1A]/15 animate-none">
            
            {/* Drawer Header */}
            <div className="bg-[#1A1A1A] p-6 text-stone-100 flex justify-between items-center text-left">
              <div>
                <h3 className="font-serif font-bold italic text-base md:text-lg text-white">Мои Заявки на Аренду</h3>
                <span className="text-[10px] block text-stone-405 font-sans uppercase tracking-wider mt-1">Сводный статус рассмотрения договоров юридической службой</span>
              </div>
              <button
                onClick={() => setIsMyBookingsOpen(false)}
                className="text-stone-400 hover:text-white transition p-1.5 cursor-pointer rounded-none bg-transparent hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {bookings.length === 0 ? (
                <div className="text-center py-16 border rounded-none border-[#1A1A1A]/10 bg-[#F4F1EE]/40 space-y-4">
                  <CalendarCheck className="w-12 h-12 text-stone-400 mx-auto" />
                  <p className="text-stone-600 font-serif font-bold italic text-sm">У вас пока нет активных заявок.</p>
                  <p className="text-stone-500 font-sans text-xs max-w-xs mx-auto leading-relaxed">
                    Вы можете выбрать любой готовый свободный офис на нашем чертеже и оставить заявку на его имя.
                  </p>
                </div>
              ) : (
                bookings.map((b) => (
                  <div key={b.id} className="border border-[#1A1A1A]/10 rounded-none p-5 space-y-4 hover:shadow-none transition bg-[#F4F1EE]/20 text-left">
                    
                    {/* Identification */}
                    <div className="flex justify-between items-start border-b border-[#1A1A1A]/10 pb-3">
                      <div className="text-left">
                        <span className="font-mono text-xs font-bold text-red-700">{b.id}</span>
                        <div className="text-stone-900 font-serif font-bold italic text-xs mt-1">Офис: {b.officeNumber ? `№${b.officeNumber}` : 'Для согласования под площадь'}</div>
                        <span className="text-[10px] font-sans text-stone-400 block mt-0.5">{b.createdAt}</span>
                      </div>

                      {/* Status indicator */}
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-none text-[9px] font-sans font-bold uppercase tracking-widest ${
                        b.status === 'pending'
                          ? 'bg-amber-50 text-amber-950 border border-amber-305'
                          : b.status === 'accepted'
                            ? 'bg-emerald-50 text-emerald-950 border border-emerald-305'
                            : 'bg-stone-105 text-stone-550 border border-stone-200'
                      }`}>
                        {b.status === 'pending' && <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse mr-1"></span>}
                        {b.status === 'accepted' && <CheckCircle className="w-3.5 h-3.5 text-emerald-700 mr-0.5 shrink-0" />}
                        {b.status === 'pending' ? 'В обработке' : 'Одобрена'}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-stone-405 text-[9px] font-sans font-bold uppercase tracking-wider block">Заявитель</span>
                        <span className="text-stone-850 block mt-0.5 truncate font-serif font-bold italic">{b.contactName}</span>
                      </div>
                      <div>
                        <span className="text-stone-405 text-[9px] font-sans font-bold uppercase tracking-wider block">Район поиска</span>
                        <span className="text-stone-850 block mt-0.5 font-sans font-bold">{b.areaRange}</span>
                      </div>
                    </div>

                    {/* Assigned simulated manager */}
                    <div className="bg-[#F4F1EE] rounded-none p-3.5 flex gap-3 items-center border border-[#1A1A1A]/5 text-left">
                      <div className="w-8 h-8 rounded-none border border-red-750 bg-red-700 text-stone-100 flex items-center justify-center font-bold text-[10px] uppercase font-sans shrink-0">
                        {b.status === 'pending' ? 'М' : 'О'}
                      </div>
                      <div className="text-left text-xs space-y-0.5">
                        <span className="font-serif font-bold text-stone-900 leading-none">
                          {b.status === 'pending' ? 'Менеджер отдела аренды' : 'Консультант Ольга Корнеева'}
                        </span>
                        <span className="text-[10px] text-stone-500 font-sans block leading-snug">
                          {b.status === 'pending' ? 'Проводится техническая проверка свободных дат...' : 'Договор подготовлен. Телефон для согласования заезда: +7 (495) 123-45-67'}
                        </span>
                      </div>
                    </div>

                    {/* Action Panel simulated */}
                    <div className="flex items-center justify-between border-t border-[#1A1A1A]/10 pt-3 text-xs gap-3">
                      <button
                        onClick={() => deleteBooking(b.id)}
                        className="text-stone-400 hover:text-stone-700 font-sans font-bold uppercase tracking-widest text-[9px] cursor-pointer"
                      >
                        Отозвать
                      </button>

                      {b.status === 'pending' && (
                        <button
                          onClick={() => simulateManagerResponse(b.id, 'accepted')}
                          className="text-emerald-850 hover:text-emerald-950 font-sans font-bold uppercase text-[9px] tracking-widest flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100/60 px-3 py-1.5 rounded-none border border-emerald-300 transition cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-none shrink-0" />
                          [Имитировать одобрение]
                        </button>
                      )}
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Simulated Live Info Footer */}
            <div className="p-6 bg-[#F4F1EE] border-t border-[#1A1A1A]/10 space-y-3 text-left">
              <div className="flex gap-2.5 items-start text-xs">
                <AlertCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <p className="text-[10px] leading-relaxed text-stone-500 font-sans">
                  Поскольку система использует изолированное хранилище на вашем браузере (<code className="font-mono bg-white px-1 border border-[#1A1A1A]/10">localStorage</code>), ваши данные останутся сохранены даже после перезапуска страницы.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
