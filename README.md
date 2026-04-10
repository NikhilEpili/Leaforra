# Leaforra

Leaforra is a Vite + React app with serverless API routes for:
- User registration and login (email + password)
- Contact form email via SendGrid
- My Garden owned plants persistence in MySQL

## Tech Stack
- Frontend: React + Vite
- Backend API: Serverless functions (`api/*.js`) and Vite dev middleware
- Database: MySQL
- Email: SendGrid

## 1) Prerequisites
- Node.js 18+
- npm
- MySQL server (local or cloud)
- SendGrid account (for contact form emails)

## 2) Install Dependencies
```bash
npm install
```

## 3) Configure Environment Variables
Create/edit `.env` in project root:

```dotenv
# Frontend (safe to expose)
VITE_SELLER_WHATSAPP_NUMBER=918624046649
VITE_CONTACT_EMAIL=contact@leaforra.com

# Backend/Serverless (do not expose publicly)
MYSQL_URL=mysql://username:password@host:3306/database
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_sender@example.com
CONTACT_EMAIL=contact@leaforra.com
```

Notes:
- `SENDGRID_FROM_EMAIL` must be a verified sender in SendGrid.
- `MYSQL_URL` must point to a reachable MySQL database.

## 4) Set Up MySQL
You can use either local MySQL or a cloud provider.

### Option A: Local MySQL
1. Install MySQL server.
2. Create a database:
```sql
CREATE DATABASE leaforra;
```
3. Create a user (optional) and grant permissions:
```sql
CREATE USER 'leaforra_user'@'%' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON leaforra.* TO 'leaforra_user'@'%';
FLUSH PRIVILEGES;
```
4. Set `MYSQL_URL`:
```dotenv
MYSQL_URL=mysql://leaforra_user:strong_password@localhost:3306/leaforra
```

### Option B: Cloud MySQL
Use your provider's connection string format:
```dotenv
MYSQL_URL=mysql://user:password@your-host:3306/your_database
```

## 5) How MySQL Is Linked to the Website
The integration is already wired in code:

- Database layer:
  - `api/lib/userStore.js`
- Auth endpoints:
  - `api/register.js`
  - `api/login.js`
- Owned plants endpoint:
  - `api/user-plants.js`
- Frontend auth/data calls:
  - `src/app/auth.ts`
- My Garden sync:
  - `src/app/pages/MyGardenPage.tsx`

Flow:
1. User registers in UI.
2. Frontend calls `/api/register`.
3. Backend hashes password and stores user in MySQL.
4. User logs in via `/api/login`.
5. My Garden reads/writes owned plants via `/api/user-plants`.

## 6) Run Locally
```bash
npm run dev
```

Open the app in browser (default Vite URL).

Important:
- In local dev, API routes are handled by Vite middleware in `vite.config.ts`.
- MySQL and SendGrid env vars must be present before starting dev server.

## 7) Build
```bash
npm run build
```

## 8) Deploy (Vercel)
1. Import repo into Vercel.
2. Add env vars in Project Settings:
   - `MYSQL_URL`
   - `SENDGRID_API_KEY`
   - `SENDGRID_FROM_EMAIL`
   - `CONTACT_EMAIL`
   - `VITE_SELLER_WHATSAPP_NUMBER`
   - `VITE_CONTACT_EMAIL`
3. Build command: `npm run build`
4. Output directory: `dist`

Serverless API functions in `api/` will run on Vercel.

## 9) Troubleshooting
- `POST /api/contact 500`:
  - Check SendGrid key and verified sender email.
- Registration/Login errors:
  - Check `MYSQL_URL` and database connectivity.
- No plant ownership persistence:
  - Verify `MYSQL_URL` and user record creation in MySQL.

## Security Notes
- Never commit real secrets in `.env`.
- Rotate keys immediately if exposed.
- Keep `SENDGRID_API_KEY` and database credentials only in environment settings.
