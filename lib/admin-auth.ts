/**
 * Signs and verifies the admin panel's session cookie.
 *
 * The admin panel (per the brief) is a single shared password, not a
 * Supabase-authenticated account, so we can't use Supabase Auth sessions for
 * it. Instead we issue a small signed, expiring token and store it in an
 * httpOnly cookie.
 *
 * Implemented with the Web Crypto API (`crypto.subtle`) rather than Node's
 * `crypto` module because this file is imported from middleware.ts, which
 * runs on the Edge Runtime - Node's `crypto` module isn't available there,
 * but Web Crypto is available in both the Edge Runtime and modern Node.
 */

export const ADMIN_COOKIE_NAME = 'admin_session';
export const ADMIN_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();

function requireSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      'ADMIN_SESSION_SECRET is missing or too short. Set a random 32+ character value.'
    );
  }
  return secret;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function fromHex(hex: string): Uint8Array<ArrayBuffer> {
  if (!/^[0-9a-f]+$/i.test(hex) || hex.length % 2 !== 0) return new Uint8Array(0);
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/** Creates a fresh signed token to store in the admin_session cookie. */
export async function createAdminSessionToken(): Promise<string> {
  const expiresAt = Date.now() + ADMIN_COOKIE_MAX_AGE_SECONDS * 1000;
  const payload = String(expiresAt);
  const key = await getHmacKey(requireSecret());
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return `${payload}.${toHex(signature)}`;
}

/** Verifies a token from the admin_session cookie. */
export async function verifyAdminCookie(cookieValue: string | undefined | null): Promise<boolean> {
  if (!cookieValue) return false;
  const [payload, signatureHex] = cookieValue.split('.');
  if (!payload || !signatureHex) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  try {
    const key = await getHmacKey(requireSecret());
    return await crypto.subtle.verify('HMAC', key, fromHex(signatureHex), encoder.encode(payload));
  } catch {
    return false;
  }
}

/**
 * Constant-time-ish password check: hash both sides with SHA-256 first so a
 * plain `===` on the digests doesn't leak early-exit timing about the secret.
 */
export async function checkAdminPassword(candidate: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !candidate) return false;

  const [candidateDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(candidate)),
    crypto.subtle.digest('SHA-256', encoder.encode(expected)),
  ]);

  return toHex(candidateDigest) === toHex(expectedDigest);
}
