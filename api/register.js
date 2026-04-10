import bcrypt from 'bcryptjs';
import { createUser, ensureUserSchema, getUserByEmail } from './lib/userStore.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    await ensureUserSchema();

    const { name, email, password } = req.body || {};
    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '');

    if (!cleanName || !cleanEmail || !cleanPassword) {
      res.status(400).json({ error: 'Name, email, and password are required.' });
      return;
    }

    if (cleanPassword.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters.' });
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
    if (!isEmailValid) {
      res.status(400).json({ error: 'Enter a valid email address.' });
      return;
    }

    const existingUser = await getUserByEmail(process.env, cleanEmail);
    if (existingUser) {
      res.status(409).json({ error: 'An account with this email already exists.' });
      return;
    }

    const passwordHash = await bcrypt.hash(cleanPassword, 10);
    const user = await createUser(process.env, {
      name: cleanName,
      email: cleanEmail,
      passwordHash,
    });

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        ownedPlants: user.owned_plants || [],
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    const message = error instanceof Error ? error.message : 'Unable to register user.';
    res.status(500).json({ error: message });
  }
}
