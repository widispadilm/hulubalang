import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'pss_customer_session';

export interface SessionUser {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export function decodeToken(token: string): SessionUser | null {
  try {
    const payload = token.split('.')[1];
    const json = Buffer.from(payload, 'base64url').toString('utf-8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function getSession(): Promise<{ token: string; user: SessionUser } | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const user = decodeToken(token);
  if (!user || user.exp * 1000 < Date.now()) return null;

  return { token, user };
}

export async function setSession(token: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
