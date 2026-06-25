import React, { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';

interface CookieConsentBannerProps {
  onPrivacyOpen: () => void;
  onAgreementOpen: () => void;
}

const COOKIE_NAME = 'krasnoyard_cookie_consent';
const COOKIE_VALUE = 'accepted';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function hasConsentCookie() {
  return document.cookie
    .split(';')
    .map((item) => item.trim())
    .some((item) => item === `${COOKIE_NAME}=${COOKIE_VALUE}`);
}

export default function CookieConsentBanner({ onPrivacyOpen, onAgreementOpen }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!hasConsentCookie());
  }, []);

  const acceptCookies = () => {
    document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed left-0 right-0 bottom-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto bg-white/95 backdrop-blur border border-[#1A1A1A]/15 shadow-2xl rounded-none p-4 md:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 text-left">
          <div className="flex gap-3 items-start flex-1">
            <div className="p-2.5 bg-[#F4F1EE] border border-[#1A1A1A]/10 shrink-0">
              <Cookie className="w-5 h-5 text-red-700" />
            </div>
            <div className="space-y-2">
              <h3 className="font-sans font-bold text-stone-900 text-sm md:text-base leading-snug">
                Сайт использует cookie и обрабатывает данные
              </h3>
              <p className="font-sans text-xs md:text-sm leading-relaxed text-stone-600">
                Мы используем файлы cookie и сервисы аналитики для корректной работы сайта, обработки заявок, анализа посещаемости и улучшения сервиса. Нажимая «Согласен», вы подтверждаете согласие на использование cookie, обработку данных и условия документов сайта.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-sans text-[10px] uppercase tracking-[0.16em] font-bold">
                <button onClick={onPrivacyOpen} className="text-red-700 hover:text-red-800 underline underline-offset-4 cursor-pointer">
                  Политика конфиденциальности
                </button>
                <button onClick={onAgreementOpen} className="text-red-700 hover:text-red-800 underline underline-offset-4 cursor-pointer">
                  Пользовательское соглашение
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={acceptCookies}
            className="bg-red-700 hover:bg-red-800 text-white font-sans text-[10px] uppercase tracking-[0.18em] font-bold px-6 py-3 rounded-none transition cursor-pointer shrink-0"
          >
            Согласен
          </button>
        </div>
      </div>
    </div>
  );
}
