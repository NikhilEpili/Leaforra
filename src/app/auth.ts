export interface RegisteredUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export const AUTH_STORAGE_KEY = 'leaforra.auth.user';

export function getRegisteredUser(): RegisteredUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved) as RegisteredUser;
  } catch {
    return null;
  }
}

export function saveRegisteredUser(user: RegisteredUser) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearRegisteredUser() {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isValidIndianPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  const normalized = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(normalized);
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type UserPayload = {
  id: number;
  name: string;
  email: string;
  ownedPlants?: string[];
};

async function parseJsonResponse(response: Response) {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error || 'Request failed.');
  }
  if (!payload) {
    throw new Error("Invalid response from server. Backend might not be running.");
  }
  return payload;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function registerUser(params: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: params.name,
      email: params.email,
      password: params.password,
    }),
  });

  const payload = await parseJsonResponse(response);
  const user = payload.user as UserPayload;
  const profile: RegisteredUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: params.phone,
  };
  saveRegisteredUser(profile);
  return {
    profile,
    ownedPlants: user.ownedPlants || [],
  };
}

export async function loginUser(params: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const payload = await parseJsonResponse(response);
  const user = payload.user as UserPayload;
  const previous = getRegisteredUser();
  const profile: RegisteredUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: previous?.email === user.email ? previous.phone : undefined,
  };
  saveRegisteredUser(profile);

  return {
    profile,
    ownedPlants: user.ownedPlants || [],
  };
}

export async function fetchOwnedPlants(userId: number) {
  const response = await fetch(`${API_BASE_URL}/api/user-plants?userId=${encodeURIComponent(String(userId))}`);
  const payload = await parseJsonResponse(response);
  return Array.isArray(payload.ownedPlants) ? payload.ownedPlants as string[] : [];
}

export async function persistOwnedPlants(userId: number, ownedPlants: string[]) {
  const response = await fetch(`${API_BASE_URL}/api/user-plants`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, ownedPlants }),
  });

  const payload = await parseJsonResponse(response);
  return Array.isArray(payload.ownedPlants) ? payload.ownedPlants as string[] : ownedPlants;
}
