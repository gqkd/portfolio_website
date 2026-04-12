// Netlify Function: send-cv
// Sends the CV to the requested email via Gmail (nodemailer).
// You receive a BCC copy of every send → your Gmail inbox is the download log.
//
// Required env vars (Netlify → Site settings → Environment variables):
//   GMAIL_USER         — your Gmail address, e.g. giuq01692@gmail.com
//   GMAIL_APP_PASSWORD — App Password from Google Account → Security → App passwords
//   SITE_URL           — e.g. https://name-surname.com (no trailing slash)

const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://thebiomedicalgeek.com',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST')   return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  let email;
  try { ({ email } = JSON.parse(event.body)); }
  catch { return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid body' }) }; }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email address' }) };
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, SITE_URL} = process.env;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: `"Giulio Quaglia - Cloud Engineer" <${GMAIL_USER}>`,
      to: email,
      bcc: GMAIL_USER,
      subject: 'Giulio Quaglia — CV',
      html: `
        <p style="font-family:monospace;color:#8B949E;font-size:12px;margin-bottom:24px">// cv download</p>
        <p>Hi,</p>
        <p>Thanks for your interest. You can download my CV at the link below:</p>
        <p style="margin:24px 0">
          <a href="${SITE_URL}/CV_Giulio_Quaglia_DataEng.pdf"
             style="background:#00D4FF;color:#0D1117;padding:10px 20px;text-decoration:none;font-family:monospace;font-size:13px;display:inline-block">
            Download CV ↓
          </a>
        </p>
        <p style="color:#8B949E;font-size:13px">
          Giulio Quaglia<br>
          <a href="${SITE_URL}" style="color:#8B949E">${SITE_URL.replace('https://', '')}</a>
        </p>
      `,
    });
  } catch (err) {
    console.error('Mail error:', err);
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Failed to send email. Please try again.' }) };
  }

  return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
};
