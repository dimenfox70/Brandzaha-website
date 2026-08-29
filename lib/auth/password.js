import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

// Node-only (scrypt) — import this only from server actions / route handlers, never from middleware.
export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || '').split(':');
  if (!salt || !hash) return false;
  const hashBuf = Buffer.from(hash, 'hex');
  const candidate = scryptSync(password, salt, hashBuf.length);
  return candidate.length === hashBuf.length && timingSafeEqual(candidate, hashBuf);
}
