/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Server, Shield, Terminal, Globe, Award, Copy, Check, Info } from 'lucide-react';

export default function DeploymentGuide() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const dockerfileContent = `# Этап 1: Сборка статических файлов
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Этап 2: Запуск легковесного веб-сервера
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
# Копируем наш файл конфигурации
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`;

  const dockerComposeContent = `version: '3.8'

services:
  bc_krasnoselskaya_site:
    build: .
    container_name: bc_site_container
    restart: always
    ports:
      # Запускаем сайт внутри контейнера, пробрасывая наружу на порт 8085
      # Это защитит его от конфликтов с существующими сайтами
      - "8085:80"
    environment:
      - NODE_ENV=production`;

  const nginxConfContent = `server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Кеширование статики для ускорения загрузки
    location ~* \\.(?:ico|css|js|gif|jpe?g|png|svg|woff2?|eot|ttf|otf|webp)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}`;

  const reverseProxyContent = `server {
    listen 80;
    # Укажите ваш зарегистрированный домен здесь:
    server_name bc-krasnoselskaya.ru www.bc-krasnoselskaya.ru;

    location / {
        # Перенаправляем все запросы в наш изолированный контейнер (порт 8085)
        proxy_pass http://127.0.0.1:8085;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`;

  return (
    <div className="bg-white border border-[#1A1A1A]/10 rounded-none shadow-none p-6 md:p-10 max-w-5xl mx-auto my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-6 mb-8">
        <div className="text-left">
          <span className="text-[10px] font-sans font-bold text-red-700 uppercase tracking-[0.22em] border border-red-700/30 px-4 py-2 bg-[#F4F1EE] rounded-none inline-block">
            Инрукция IT-Контент-Менеджера
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mt-3 tracking-tight">
            Развертывание на виртуальном сервере <span className="font-serif italic font-black text-red-700">(VPS)</span>
          </h2>
          <p className="text-stone-500 font-sans text-xs md:text-sm mt-1">
            Понятное пошаговое руководство по изолированной установке сайта, даже если у вас нет опыта программирования.
          </p>
        </div>
        <div className="flex items-center gap-2 text-stone-750 bg-[#F4F1EE] border border-[#1A1A1A]/10 px-4 py-2.5 rounded-none text-[10px] font-sans font-bold uppercase tracking-wider self-start md:self-auto shrink-0">
          <Server className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Ubuntu 22.04 / 24.04</span>
        </div>
      </div>

      {/* Intro block */}
      <div className="bg-red-50/20 border border-red-750/15 rounded-none p-5 mb-8 flex items-start gap-3.5 text-left">
        <Shield className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-serif font-bold italic text-stone-900 text-sm">Принцип Изоляции (Защита от конфликтов):</h4>
          <p className="text-stone-605 font-sans text-xs leading-relaxed mt-1">
            Поскольку на вашем сервере уже работают другие сайты (например, базы данных, старые лендинги или панели управления),
            мы будем устанавливать этот сайт внутри специальной изолированной среды — <strong className="text-stone-900 font-bold">Docker-контейнера</strong>. 
            Это как виртуальный плотный сейф внутри сервера: сайт живет своей автономной жизнью, не видит остальные процессы, не мешает им и не даёт сломать существующие сервисы.
          </p>
        </div>
      </div>

      <div className="space-y-10 text-left">
        {/* Step 1 */}
        <section className="relative pl-8 border-l-2 border-stone-300">
          <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#1A1A1A] text-white rounded-none flex items-center justify-center font-mono text-xs font-bold">
            1
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg italic">
            Шаг 1: Аренда сервера и подготовка
          </h3>
          <p className="text-stone-600 font-sans text-xs md:text-sm mt-1.5 leading-relaxed">
            Приобретите VPS (например, у популярных надежных провайдеров РФ: <em className="not-italic font-bold text-stone-850">RuVds, Timeweb Cloud, SpaceWeb или Reg.ru</em>).
          </p>
          <ul className="list-disc list-inside text-stone-500 font-sans text-xs mt-2 space-y-1.5 pl-2 leading-relaxed">
            <li>При создании сервера выберите операционную систему <strong className="text-stone-800">Ubuntu 22.04 LTS</strong> или <strong className="text-stone-800">24.04 LTS</strong>.</li>
            <li>Рекомендуемые минимальные характеристики: <strong className="text-stone-800">1 ядро CPU, 1 ГБ оперативной памяти (RAM)</strong> и 15 ГБ диска SSD. Цена такого сервера составляет всего 150-300 рублей/месяц.</li>
            <li>Провайдер пришлет вам на почту IP-адрес сервера, логин (<code className="font-mono bg-stone-100 text-[#1A1A1A] px-1 py-0.5">root</code>) и временный пароль.</li>
          </ul>
        </section>

        {/* Step 2 */}
        <section className="relative pl-8 border-l-2 border-stone-300">
          <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#1A1A1A] text-white rounded-none flex items-center justify-center font-mono text-xs font-bold">
            2
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg italic">
            Шаг 2: Первое подключение к вашему серверу
          </h3>
          <p className="text-stone-600 font-sans text-xs md:text-sm mt-1.5 leading-relaxed">
            Для управления сервером вам понадобится терминал. Скачайте бесплатную программу <strong className="text-stone-800">Termius</strong> (для Windows/Mac) или встроенную <strong className="text-stone-800">PuTTY</strong>, запустите ее и введите данные вашего сервера:
          </p>
          <div className="bg-[#1A1A1A] text-stone-300 font-mono text-xs rounded-none p-4 my-3 overflow-x-auto relative shadow-none">
            <span className="text-stone-400 text-[9px] absolute right-3 top-2 border border-stone-800 rounded-none px-1.5 py-0.5 uppercase tracking-wider">Terminal</span>
            <div className="text-emerald-400"># Подключиться к серверу (вместо 123.45.67.89 вставьте IP вашего сервера):</div>
            <div>ssh root@123.45.67.89</div>
            <div className="text-stone-500 mt-2"># Нажмите Enter, введите 'yes' при согласии и введите ваш пароль от провайдера (он вводится скрыто, без звездочек)</div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="relative pl-8 border-l-2 border-stone-300">
          <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#1A1A1A] text-white rounded-none flex items-center justify-center font-mono text-xs font-bold">
            3
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg italic">
            Шаг 3: Установка изолированной среды (Docker)
          </h3>
          <p className="text-stone-600 font-sans text-xs md:text-sm mt-1.5 leading-relaxed">
            Вы вошли на сервер. Не бойтесь черного экрана. Давайте установим Docker одной командой. Скопируйте строчку ниже, вставьте её в терминал правой кнопкой мыши и нажмите <strong className="text-stone-800">Enter</strong>:
          </p>

          <div className="bg-[#1A1A1A] text-stone-300 font-mono text-xs rounded-none p-4 my-3 overflow-x-auto relative">
            <div className="flex justify-between items-center mb-2 border-b border-stone-800 pb-2">
              <span className="text-stone-400 text-[10px]">Команда для терминала</span>
              <button
                onClick={() => handleCopy('curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh', 'dev-docker')}
                className="text-white hover:text-red-300 transition flex items-center gap-1 text-[9px] bg-stone-900 px-2 py-1 rounded-none border border-stone-800 uppercase tracking-wider font-sans font-bold cursor-pointer"
              >
                {copiedText === 'dev-docker' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedText === 'dev-docker' ? 'Скопировано!' : 'Копировать'}
              </button>
            </div>
            <div className="text-amber-400">curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh</div>
            <div className="text-stone-500 mt-2"># Эта команда сама скачает и настроит изоляцию Docker на сервере. Время выполнения: около 1 минуты.</div>
          </div>
        </section>

        {/* Step 4 */}
        <section className="relative pl-8 border-l-2 border-stone-300">
          <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#1A1A1A] text-white rounded-none flex items-center justify-center font-mono text-xs font-bold">
            4
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg italic">
            Шаг 4: Развертывание файлов сайта
          </h3>
          <p className="text-stone-600 font-sans text-xs md:text-sm mt-1.5 leading-relaxed">
            Создайте папку для сайта на сервере и перейдите в неё:
          </p>
          <div className="bg-[#1A1A1A] text-stone-300 font-mono text-xs rounded-none p-4 my-3 overflow-x-auto">
            <div>mkdir -p /root/bc-site && cd /root/bc-site</div>
          </div>
          <p className="text-stone-600 font-sans text-xs md:text-sm mt-3 leading-relaxed">
            Внутри папки создайте три вспомогательных файла, которые будут говорить Docker, как именно построить сайт. Из нашего сайта вы можете просто скопировать их готовое наполнение:
          </p>

          {/* Config Tabs inside guide */}
          <div className="mt-4 border border-[#1A1A1A]/10 rounded-none overflow-hidden">
            <div className="bg-[#F4F1EE] border-b border-[#1A1A1A]/10 px-4 py-2.5 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-stone-800 uppercase tracking-wider">Файл: Dockerfile</span>
              <button
                onClick={() => handleCopy(dockerfileContent, 'guide-df')}
                className="text-red-700 hover:text-red-900 transition flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-widest"
              >
                {copiedText === 'guide-df' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedText === 'guide-df' ? 'Скопировано!' : 'Копировать код'}
              </button>
            </div>
            <pre className="bg-[#1A1A1A] text-stone-300 font-mono text-[11px] p-4 overflow-x-auto max-h-56 leading-normal text-left">
              {dockerfileContent}
            </pre>
          </div>

          <div className="mt-4 border border-[#1A1A1A]/10 rounded-none overflow-hidden">
            <div className="bg-[#F4F1EE] border-b border-[#1A1A1A]/10 px-4 py-2.5 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-stone-800 uppercase tracking-wider">Файл: docker-compose.yml</span>
              <button
                onClick={() => handleCopy(dockerComposeContent, 'guide-dc')}
                className="text-red-700 hover:text-red-900 transition flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-widest"
              >
                {copiedText === 'guide-dc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedText === 'guide-dc' ? 'Скопировано!' : 'Копировать код'}
              </button>
            </div>
            <pre className="bg-[#1A1A1A] text-stone-300 font-mono text-[11px] p-4 overflow-x-auto max-h-56 leading-normal text-left">
              {dockerComposeContent}
            </pre>
          </div>

          <div className="mt-4 border border-[#1A1A1A]/10 rounded-none overflow-hidden">
            <div className="bg-[#F4F1EE] border-b border-[#1A1A1A]/10 px-4 py-2.5 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-stone-800 uppercase tracking-wider">Файл: nginx.conf</span>
              <button
                onClick={() => handleCopy(nginxConfContent, 'guide-nc')}
                className="text-red-700 hover:text-red-900 transition flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-widest"
              >
                {copiedText === 'guide-nc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedText === 'guide-nc' ? 'Скопировано!' : 'Копировать код'}
              </button>
            </div>
            <pre className="bg-[#1A1A1A] text-stone-300 font-mono text-[11px] p-4 overflow-x-auto max-h-56 leading-normal text-left">
              {nginxConfContent}
            </pre>
          </div>

          <p className="text-stone-650 font-sans text-xs md:text-sm mt-4 leading-relaxed">
            Скопировав файлы проекта с репозитория на сервер, запустите сборку и запуск сайта одной простой командой:
          </p>
          <div className="bg-[#1A1A1A] text-stone-300 font-mono text-xs rounded-none p-4 my-3 overflow-x-auto text-amber-500 font-bold">
            docker compose up -d --build
          </div>
          <p className="text-stone-500 font-sans text-xs leading-relaxed">
            Эта команда соберет сайт за Вас и запустит его на порту <strong className="text-stone-800">8085</strong>. Теперь он полностью обособлен и изолирован!
          </p>
        </section>

        {/* Step 5 */}
        <section className="relative pl-8 border-l-2 border-stone-300">
          <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#1A1A1A] text-white rounded-none flex items-center justify-center font-mono text-xs font-bold">
            5
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg italic animate-none">
            Шаг 5: Проброс домена (Проксирование Nginx)
          </h3>
          <p className="text-stone-605 font-sans text-xs md:text-sm mt-1.5 leading-relaxed">
            Чтобы сайт открывался по красивому доменному имени (например, <code className="font-mono bg-stone-100 text-[#1A1A1A] px-1 py-0.5">bc-krasnoselskaya.ru</code>), а не по IP-адресу, настройте главный веб-сервер Nginx на самом сервере в качестве перенаправителя (Reverse Proxy).
          </p>
          <p className="text-stone-600 font-sans text-xs md:text-sm mt-2 leading-relaxed">
            Создайте или дополните конфигурационный файл Nginx на хост-сервере (обычно расположен в <code className="font-mono bg-stone-100 text-stone-700 px-1 py-0.5">/etc/nginx/sites-available/bc.conf</code>):
          </p>

          <div className="mt-4 border border-[#1A1A1A]/10 rounded-none overflow-hidden text-left">
            <div className="bg-[#F4F1EE] border-b border-[#1A1A1A]/10 px-4 py-2.5 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-stone-800 uppercase tracking-wider">Конфиг проксирования Nginx (хост)</span>
              <button
                onClick={() => handleCopy(reverseProxyContent, 'guide-rp')}
                className="text-red-700 hover:text-red-900 transition flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-widest"
              >
                {copiedText === 'guide-rp' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedText === 'guide-rp' ? 'Скопировано!' : 'Копировать код'}
              </button>
            </div>
            <pre className="bg-[#1A1A1A] text-stone-300 font-mono text-[11px] p-4 overflow-x-auto max-h-56 leading-normal text-left">
              {reverseProxyContent}
            </pre>
          </div>
        </section>

        {/* Step 6 */}
        <section className="relative pl-8 border-l-2 border-stone-300">
          <div className="absolute -left-[14px] top-0 w-6 h-6 bg-[#1A1A1A] text-white rounded-none flex items-center justify-center font-mono text-xs font-bold">
            6
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg italic">
            Шаг 6: Получение бесплатного SSL-сертификата (HTTPS)
          </h3>
          <p className="text-stone-600 font-sans text-xs md:text-sm mt-1.5 leading-relaxed">
            Чтобы сайт открывался по защищенному протоколу с замочком, установите бесплатный сертификат Let's Encrypt:
          </p>
          <div className="bg-[#1A1A1A] text-stone-300 font-mono text-xs rounded-none p-4 my-3 overflow-x-auto space-y-1 text-left">
            <div className="text-stone-500"># Устанавливаем инструмент Certbot</div>
            <div className="text-amber-400">apt update && apt install certbot python3-certbot-nginx -y</div>
            <div className="text-stone-500 mt-2 font-bold"># Вытаскиваем сертификат и настраиваем автопродление</div>
            <div className="text-amber-400">certbot --nginx -d bc-krasnoselskaya.ru -d www.bc-krasnoselskaya.ru</div>
          </div>
          <p className="text-stone-500 font-sans text-xs leading-relaxed">
            Certbot сам внесет все изменения и автоматически допишет безопасные порты (443) в Nginx. Всё готово! Сайт надежно живет в собственной изоляции, не мешая вашему серверу.
          </p>
        </section>
      </div>

      <div className="border-t border-[#1A1A1A]/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#F4F1EE] border border-[#1A1A1A]/10 rounded-none">
            <Award className="w-5 h-5 text-red-700" />
          </div>
          <div>
            <h5 className="font-serif font-bold italic text-stone-900 text-sm">Гарантированная стабильность</h5>
            <p className="text-stone-400 font-sans text-xs">Все зависимости «упакованы» внутрь контейнера и не изменятся со временем.</p>
          </div>
        </div>
        <button 
          onClick={() => window.print()}
          className="text-xs uppercase font-sans tracking-widest font-bold text-stone-700 hover:text-stone-900 border border-[#1A1A1A]/10 hover:border-[#1A1A1A] py-3.5 px-6 rounded-none transition cursor-pointer bg-white"
        >
          Печать инструкции
        </button>
      </div>
    </div>
  );
}
