/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OfficeSpace, BookingRequest } from '../types';
import { ClipboardCheck, Phone, Building, Loader2 } from 'lucide-react';

interface ApplicationFormProps {
  selectedOffice: OfficeSpace | null;
  onClose: () => void;
  onSubmitSuccess: (request: BookingRequest) => void;
}

export default function ApplicationForm({
  selectedOffice,
  onClose,
  onSubmitSuccess,
}: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: edit, 2: success

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [areaRange, setAreaRange] = useState(selectedOffice ? `${selectedOffice.area} м²` : '15-25 м²');
  const [rentDate, setRentDate] = useState('');
  const [comments, setComments] = useState('');

  // Local errors
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const [ticketId, setTicketId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    setNameError('');
    setSubmitError('');

    let hasError = false;
    if (!phone || phone.length < 7) {
      setPhoneError('Пожалуйста, укажите корректный контактный номер');
      hasError = true;
    }
    if (!contactName) {
      setNameError('Пожалуйста, напишите имя контактного лица');
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    const generatedTicketId = `BC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const request: BookingRequest = {
      id: generatedTicketId,
      officeId: selectedOffice?.id,
      officeNumber: selectedOffice?.number,
      companyName: companyName || 'Индивидуальный предприниматель',
      contactName,
      phone,
      email: '',
      areaRange,
      rentDate: rentDate || new Date().toISOString().split('T')[0],
      comments,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'lead_send_failed');
      }

      setTicketId(generatedTicketId);

      // Save to localStorage for the visitor-side progress drawer
      const existing = localStorage.getItem('bc_bookings');
      const bookingsList: BookingRequest[] = existing ? JSON.parse(existing) : [];
      bookingsList.unshift(request);
      localStorage.setItem('bc_bookings', JSON.stringify(bookingsList));

      setStep(2);
      onSubmitSuccess(request);
    } catch (error) {
      console.error('Lead submit failed', error);
      setSubmitError('Не удалось отправить заявку. Пожалуйста, позвоните нам по номеру +79175219421 или попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#1A1A1A]/15 rounded-none shadow-none max-w-lg mx-auto overflow-hidden">
      
      {/* Header Form */}
      <div className="bg-[#1A1A1A] text-stone-100 px-6 py-5 flex items-center justify-between">
        <div className="text-left">
          <h3 className="font-serif italic font-bold text-base md:text-lg text-white">
            {selectedOffice ? `Записаться на просмотр офиса №${selectedOffice.number}` : 'Получить подбор помещений'}
          </h3>
          <p className="text-stone-400 font-sans text-[10px] uppercase tracking-wider mt-0.5">
            {selectedOffice ? 'Менеджер согласует удобное время просмотра' : 'Свяжемся, уточним площадь и предложим варианты'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-stone-800 transition text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-2 rounded-none bg-stone-900 border border-[#1A1A1A]/10 cursor-pointer shrink-0"
        >
          Закрыть
        </button>
      </div>

      <div className="p-6 md:p-8">
        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 text-left">
            <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 px-4 py-3 rounded-none">
              <p className="font-sans text-[11px] text-stone-600 leading-relaxed">
                После заявки менеджер свяжется, уточнит требования, предложит свободные помещения и договорится о просмотре.
              </p>
            </div>
            
            {/* Prefilled selected office statistics */}
            {selectedOffice && (
              <div className="bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none p-4 flex items-center justify-between gap-3 text-xs">
                <div className="text-left text-stone-850">
                  <span className="font-serif font-black italic block">Выбран объект: Офис №{selectedOffice.number}</span>
                  <span className="text-stone-500 font-sans text-[11px] block mt-1">{selectedOffice.area} м² • {selectedOffice.floor} этаж • {selectedOffice.type === 'Cabinet' ? 'Кабинетный тип' : 'Open Space'}</span>
                </div>
                <div className="text-right">
                  <span className="text-red-700 font-serif italic text-sm font-bold block">
                    {(selectedOffice.area * selectedOffice.pricePerSqmMonth).toLocaleString('ru')} ₽ / мес
                  </span>
                  <span className="text-[10px] font-sans text-stone-400 block mt-0.5">1 250 ₽ за м²/мес</span>
                </div>
              </div>
            )}

            {/* Input fields */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold font-sans text-stone-700 uppercase tracking-widest block">Название компании / ИП</label>
              <div className="relative">
                <Building className="absolute left-3.5 top-3 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  placeholder="Например, ООО «Инновации»"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#F4F1EE]/65 border border-[#1A1A1A]/10 rounded-none py-2.5 pl-11 pr-4 text-xs font-sans focus:outline-none focus:border-stone-900 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold font-sans text-stone-700 uppercase tracking-widest block">Контактное лицо *</label>
                <input
                  type="text"
                  placeholder="Иван Петров"
                  value={contactName}
                  required
                  onChange={(e) => {
                    setContactName(e.target.value);
                    setNameError('');
                  }}
                  className={`w-full bg-[#F4F1EE]/65 border ${nameError ? 'border-red-650' : 'border-[#1A1A1A]/10'} rounded-none py-2.5 px-4 text-xs font-sans focus:outline-none focus:border-stone-900 focus:bg-white transition`}
                />
                {nameError && <span className="text-red-600 text-[10px] block font-medium">{nameError}</span>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold font-sans text-stone-700 uppercase tracking-widest block">Номер телефона *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-stone-500" />
                  <input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setPhoneError('');
                    }}
                    className={`w-full bg-[#F4F1EE]/65 border ${phoneError ? 'border-red-650' : 'border-[#1A1A1A]/10'} rounded-none py-2.5 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-stone-900 focus:bg-white transition`}
                  />
                </div>
                {phoneError && <span className="text-red-600 text-[10px] block font-medium">{phoneError}</span>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold font-sans text-stone-700 uppercase tracking-widest block">Желаемая площадь</label>
              {selectedOffice ? (
                <input
                  type="text"
                  disabled
                  value={`${selectedOffice.area} м² (Фиксированная)`}
                  className="w-full bg-stone-100 border border-[#1A1A1A]/5 rounded-none py-2.5 px-4 text-xs font-sans text-stone-500 cursor-not-allowed font-medium"
                />
              ) : (
                <select
                  value={areaRange}
                  onChange={(e) => setAreaRange(e.target.value)}
                  className="w-full bg-[#F4F1EE]/65 border border-[#1A1A1A]/10 rounded-none py-2.5 px-3.5 text-xs font-sans focus:outline-none focus:border-stone-900 focus:bg-white transition cursor-pointer"
                >
                  <option value="15 м²">15 м²</option>
                  <option value="20 м²">20 м²</option>
                  <option value="25 м²">25 м²</option>
                  <option value="15-25 м²">От 15 до 25 м²</option>
                  <option value="25-50 м²">От 25 до 50 м²</option>
                  <option value="50-100 м²">От 50 до 100 м²</option>
                  <option value="100-300 м²">От 100 до 300 м²</option>
                  <option value="300-600 м²">От 300 до 600 м²</option>
                  <option value="600-1500 м²">От 600 до 1500 м²</option>
                </select>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <label className="text-[9px] font-bold font-sans text-stone-700 uppercase tracking-widest block font-bold">Планируемая дата въезда</label>
                <input
                  type="date"
                  value={rentDate}
                  onChange={(e) => setRentDate(e.target.value)}
                  className="w-full bg-[#F4F1EE]/65 border border-[#1A1A1A]/10 rounded-none py-2.5 px-4 text-xs font-sans focus:outline-none focus:border-stone-900 focus:bg-white transition cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold font-sans text-stone-700 uppercase tracking-widest block font-bold">Комментарии / Пожелания к офису</label>
              <textarea
                placeholder="Укажите ваши пожелания, требования к вентиляции или парковке"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={2}
                className="w-full bg-[#F4F1EE]/65 border border-[#1A1A1A]/10 rounded-none py-2.5 px-4 text-xs font-sans focus:outline-none focus:border-stone-900 focus:bg-white transition resize-none text-left"
              ></textarea>
            </div>

            <div className="bg-[#F4F1EE] px-4 py-3 rounded-none border border-[#1A1A1A]/10 flex items-start gap-2">
              <input type="checkbox" id="agree" required defaultChecked className="mt-1 cursor-pointer" />
              <label htmlFor="agree" className="text-[10px] text-stone-550 leading-normal cursor-pointer select-none text-left">
                Нажимая кнопку, я соглашаюсь с обработкой персональных данных, Политикой конфиденциальности и Пользовательским соглашением.
              </label>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-xs font-sans leading-relaxed">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 rounded-none transition flex items-center justify-center gap-2 cursor-pointer shadow-none disabled:bg-stone-400"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Отправка...
                </>
              ) : (
                selectedOffice ? 'ЗАПИСАТЬСЯ НА ПРОСМОТР' : 'ПОЛУЧИТЬ ПОДБОР ПОМЕЩЕНИЙ'
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6 py-6 font-sans">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-none border border-emerald-300 flex items-center justify-center mx-auto">
              <ClipboardCheck className="w-8 h-8 font-light" />
            </div>

            <div className="space-y-3">
              <span className="text-emerald-800 text-[10px] font-sans font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-none border border-emerald-200">
                Заявка отправлена менеджеру
              </span>
              <h4 className="text-2xl font-serif font-black italic text-stone-900">
                Благодарим за обращение!
              </h4>
              <p className="text-stone-500 text-xs max-w-sm mx-auto leading-relaxed">
                Ваша заявка зарегистрирована под номером:
              </p>
              <div className="font-mono text-base font-bold text-stone-900 bg-[#F4F1EE] px-4 py-2.5 rounded-none border border-[#1A1A1A]/10 w-fit mx-auto">
                {ticketId}
              </div>
            </div>

            <p className="text-stone-600 text-xs leading-relaxed max-w-sm mx-auto">
              Менеджер отдела аренды БЦ получит заявку, подберёт подходящие помещения и перезвонит вам по номеру <strong className="text-stone-900 font-bold">{phone}</strong>.
            </p>

            <div className="border-t border-stone-100 pt-5 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="bg-[#1A1A1A] hover:bg-neutral-800 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold px-6 py-3.5 rounded-none transition cursor-pointer"
              >
                Вернуться на сайт
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
