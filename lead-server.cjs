const express = require('express');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.LEAD_SERVER_PORT || 3001);
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(express.json({ limit: '128kb' }));

function valueOrDash(value) {
  if (value === undefined || value === null || value === '') return '—';
  return String(value).trim();
}

function formatLead(lead) {
  const office = lead.officeNumber ? `№${lead.officeNumber}` : 'не выбран';

  return [
    'Новая заявка с сайта krasnoyard.ru',
    '',
    `Номер заявки: ${valueOrDash(lead.id)}`,
    `Компания / ИП: ${valueOrDash(lead.companyName)}`,
    `Контактное лицо: ${valueOrDash(lead.contactName)}`,
    `Телефон: ${valueOrDash(lead.phone)}`,
    `Email: ${valueOrDash(lead.email)}`,
    '',
    `Офис: ${office}`,
    `Желаемая площадь: ${valueOrDash(lead.areaRange)}`,
    `Дата въезда: ${valueOrDash(lead.rentDate)}`,
    '',
    `Комментарий: ${valueOrDash(lead.comments)}`,
    '',
    `Дата отправки: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
  ].join('\n');
}

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/lead', async (req, res) => {
  try {
    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Telegram settings are missing');
      return res.status(500).json({ ok: false, error: 'telegram_not_configured' });
    }

    const lead = req.body || {};

    if (!lead.contactName || !lead.phone) {
      return res.status(400).json({ ok: false, error: 'name_and_phone_required' });
    }

    const telegramUrl = ['https://api', 'telegram', 'org'].join('.') + '/bot' + BOT_TOKEN + '/sendMessage';

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: formatLead(lead),
        disable_web_page_preview: true,
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok || !payload.ok) {
      console.error('Telegram send failed', payload);
      return res.status(502).json({ ok: false, error: 'telegram_send_failed' });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error('Lead send failed', error);
    res.status(500).json({ ok: false, error: 'lead_send_failed' });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Lead server is listening on http://127.0.0.1:${PORT}`);
});
