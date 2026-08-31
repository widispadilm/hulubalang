import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const CUSTOMER_COOKIE = 'pss_customer_session';
export const ADMIN_COOKIE = 'pss_admin_session';

const JWT_SECRET = process.env.JWT_SECRET || 'hulubalang_super_secret_jwt_key_12345';

export interface SessionUser {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function signToken(payload: { id: string; email: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

// Customer Session Helpers
export async function getCustomerSession(): Promise<{ token: string; user: SessionUser } | null> {
  const store = await cookies();
  const token = store.get(CUSTOMER_COOKIE)?.value;
  if (!token) return null;

  const user = verifyToken(token);
  if (!user) return null;

  return { token, user };
}

export async function setCustomerSession(token: string) {
  const store = await cookies();
  store.set(CUSTOMER_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearCustomerSession() {
  const store = await cookies();
  store.delete(CUSTOMER_COOKIE);
}

// Admin / Internal Session Helpers
export async function getAdminSession(): Promise<{ token: string; user: SessionUser } | null> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return null;

  const user = verifyToken(token);
  if (!user) return null;

  return { token, user };
}

export async function setAdminSession(token: string) {
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
