import { defineConfig } from 'vite'
import { loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import sgMail from '@sendgrid/mail'
import bcrypt from 'bcryptjs'
import {
  createUser,
  ensureUserSchema,
  getOwnedPlantsByUserId,
  getUserByEmail,
  updateOwnedPlantsByUserId,
} from './api/lib/userStore.js'

async function parseRequestBody(req: any) {
  const body = await new Promise<string>((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk: string) => {
      raw += chunk
    })
    req.on('end', () => resolve(raw))
    req.on('error', reject)
  })

  return JSON.parse(body || '{}')
}

function sendJson(res: any, statusCode: number, payload: unknown) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function getSendGridErrorMessage(error: any) {
  const statusCode = error?.code || error?.response?.statusCode
  const providerMessage = error?.response?.body?.errors?.[0]?.message

  if (providerMessage) {
    return providerMessage
  }

  if (statusCode === 401 || statusCode === 403) {
    return 'SendGrid authentication failed. Check SENDGRID_API_KEY and sender verification.'
  }

  return 'Failed to send message through SendGrid.'
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
      {
        name: 'dev-sendgrid-contact-api',
        configureServer(server) {
          server.middlewares.use('/api/register', async (req, res, next) => {
            if (req.method !== 'POST') {
              next()
              return
            }

            try {
              await ensureUserSchema(env)
              const payload = await parseRequestBody(req)
              const cleanName = String(payload.name || '').trim()
              const cleanEmail = String(payload.email || '').trim().toLowerCase()
              const cleanPassword = String(payload.password || '')

              if (!cleanName || !cleanEmail || !cleanPassword) {
                sendJson(res, 400, { error: 'Name, email, and password are required.' })
                return
              }

              if (cleanPassword.length < 8) {
                sendJson(res, 400, { error: 'Password must be at least 8 characters.' })
                return
              }

              const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
              if (!isEmailValid) {
                sendJson(res, 400, { error: 'Enter a valid email address.' })
                return
              }

              const existingUser = await getUserByEmail(env, cleanEmail)
              if (existingUser) {
                sendJson(res, 409, { error: 'An account with this email already exists.' })
                return
              }

              const passwordHash = await bcrypt.hash(cleanPassword, 10)
              const user = await createUser(env, {
                name: cleanName,
                email: cleanEmail,
                passwordHash,
              })

              if (!user) {
                sendJson(res, 500, { error: 'Unable to register user.' })
                return
              }

              sendJson(res, 201, {
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  ownedPlants: user.owned_plants || [],
                },
              })
            } catch (error) {
              console.error('Dev register middleware error:', error)
              sendJson(res, 500, {
                error: error instanceof Error ? error.message : 'Unable to register user.',
              })
            }
          })

          server.middlewares.use('/api/login', async (req, res, next) => {
            if (req.method !== 'POST') {
              next()
              return
            }

            try {
              await ensureUserSchema(env)
              const payload = await parseRequestBody(req)
              const cleanEmail = String(payload.email || '').trim().toLowerCase()
              const cleanPassword = String(payload.password || '')

              if (!cleanEmail || !cleanPassword) {
                sendJson(res, 400, { error: 'Email and password are required.' })
                return
              }

              const user = await getUserByEmail(env, cleanEmail)
              if (!user) {
                sendJson(res, 401, { error: 'Invalid email or password.' })
                return
              }

              const isValidPassword = await bcrypt.compare(cleanPassword, user.password_hash)
              if (!isValidPassword) {
                sendJson(res, 401, { error: 'Invalid email or password.' })
                return
              }

              sendJson(res, 200, {
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  ownedPlants: user.owned_plants || [],
                },
              })
            } catch (error) {
              console.error('Dev login middleware error:', error)
              sendJson(res, 500, { error: 'Unable to log in.' })
            }
          })

          server.middlewares.use('/api/user-plants', async (req, res, next) => {
            if (req.method !== 'GET' && req.method !== 'PUT') {
              next()
              return
            }

            try {
              await ensureUserSchema(env)

              if (req.method === 'GET') {
                const requestUrl = new URL(req.url || '', 'http://localhost')
                const userId = Number(requestUrl.searchParams.get('userId'))

                if (!Number.isFinite(userId)) {
                  sendJson(res, 400, { error: 'Valid userId is required.' })
                  return
                }

                const ownedPlants = await getOwnedPlantsByUserId(env, userId)
                if (ownedPlants === null) {
                  sendJson(res, 404, { error: 'User not found.' })
                  return
                }

                sendJson(res, 200, { ownedPlants })
                return
              }

              const payload = await parseRequestBody(req)
              const userId = Number(payload.userId)
              const ownedPlants = payload.ownedPlants

              if (!Number.isFinite(userId) || !Array.isArray(ownedPlants)) {
                sendJson(res, 400, { error: 'userId and ownedPlants[] are required.' })
                return
              }

              const arePlantIdsValid = ownedPlants.every((plantId: unknown) => typeof plantId === 'string')
              if (!arePlantIdsValid) {
                sendJson(res, 400, { error: 'ownedPlants must contain string IDs.' })
                return
              }

              const updatedPlants = await updateOwnedPlantsByUserId(env, userId, ownedPlants)
              if (updatedPlants === null) {
                sendJson(res, 404, { error: 'User not found.' })
                return
              }

              sendJson(res, 200, { ownedPlants: updatedPlants })
            } catch (error) {
              console.error('Dev user-plants middleware error:', error)
              sendJson(res, 500, { error: 'Unable to process plant ownership request.' })
            }
          })

          server.middlewares.use('/api/contact', async (req, res, next) => {
            if (req.method === 'OPTIONS') {
              res.setHeader('Access-Control-Allow-Origin', '*')
              res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
              res.statusCode = 200
              res.end()
              return
            }

            if (req.method !== 'POST') {
              next()
              return
            }

            const apiKey = env.SENDGRID_API_KEY
            const fromEmail = (env.SENDGRID_FROM_EMAIL || '').trim()
            const toEmail = (env.CONTACT_EMAIL || 'contact@leaforra.com').trim()

            if (!apiKey || !fromEmail) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Email service is not configured on the server.' }))
              return
            }

            try {
              const body = await new Promise<string>((resolve, reject) => {
                let raw = ''
                req.on('data', (chunk) => {
                  raw += chunk
                })
                req.on('end', () => resolve(raw))
                req.on('error', reject)
              })

              const payload = JSON.parse(body || '{}')
              const cleanName = String(payload.name || '').trim()
              const cleanEmail = String(payload.email || '').trim()
              const cleanMessage = String(payload.message || '').trim()

              if (!cleanName || !cleanEmail || !cleanMessage) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Name, email, and message are required.' }))
                return
              }

              const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
              if (!isValidEmail) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Enter a valid email address.' }))
                return
              }

              sgMail.setApiKey(apiKey)
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
              })

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (error) {
              console.error('SendGrid dev middleware error:', error)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: getSendGridErrorMessage(error) }))
            }
          })
        },
      },
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },
    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
