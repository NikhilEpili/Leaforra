# Leaforra Deployment Guide (Vercel + SendGrid + MySQL)

## 1) Prerequisites
- A Vercel account
- A SendGrid account
- A MySQL database
- A verified sender email in SendGrid (for `SENDGRID_FROM_EMAIL`)

## 2) Configure Environment Variables in Vercel
In your Vercel project settings, add:

- `SENDGRID_API_KEY` = your SendGrid API key
- `SENDGRID_FROM_EMAIL` = verified sender address in SendGrid
- `CONTACT_EMAIL` = `contact@leaforra.com`
- `MYSQL_URL` = your MySQL connection string
- `VITE_SELLER_WHATSAPP_NUMBER` = seller WhatsApp number including country code

## 3) Deploy
- Import this repo into Vercel
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

Vercel will automatically host:
- Frontend app from Vite
- Serverless contact endpoint from `api/contact.js`

## 4) Verify
1. Open the deployed site
2. Go to About -> Get in Touch
3. Send a message
4. Confirm admin inbox receives the email at `CONTACT_EMAIL`

## 5) Local Development (optional)
To test serverless functions locally, use Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

Create a local `.env.local` from `.env.example` and fill values before testing.
