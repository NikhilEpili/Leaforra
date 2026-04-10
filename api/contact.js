import sgMail from '@sendgrid/mail';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function sendJson(res, statusCode, payload) {
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));
  res.status(statusCode).json(payload);
}

function getSendGridErrorMessage(error) {
  const statusCode = error?.code || error?.response?.statusCode;
  const providerMessage = error?.response?.body?.errors?.[0]?.message;

  if (providerMessage) {
    return providerMessage;
  }

  if (statusCode === 401 || statusCode === 403) {
    return 'SendGrid authentication failed. Check SENDGRID_API_KEY and sender verification.';
  }

  return 'Failed to send message through SendGrid.';
}

export default async function handler(req, res) {
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const toEmail = (process.env.CONTACT_EMAIL || 'contact@leaforra.com').trim();
  const fromEmail = (process.env.SENDGRID_FROM_EMAIL || '').trim();

  if (!apiKey || !fromEmail) {
    sendJson(res, 500, { error: 'Email service is not configured on the server.' });
    return;
  }

  const { name, email, message } = req.body || {};
  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim();
  const cleanMessage = String(message || '').trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    sendJson(res, 400, { error: 'Name, email, and message are required.' });
    return;
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
  if (!isValidEmail) {
    sendJson(res, 400, { error: 'Enter a valid email address.' });
    return;
  }

  try {
    sgMail.setApiKey(apiKey);

    await sgMail.send({
      to: toEmail,
      from: fromEmail,
      replyTo: cleanEmail,
      subject: `Leaforra Contact: ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${cleanMessage.replace(/\n/g, '<br/>')}</p>
      `,
    });

    sendJson(res, 200, { success: true });
  } catch (error) {
    console.error('SendGrid error:', error);
    sendJson(res, 500, { error: getSendGridErrorMessage(error) });
  }
}
