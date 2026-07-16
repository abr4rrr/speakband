import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  checkAdminPassword,
  createAdminSessionToken,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE_SECONDS,
} from '@/lib/admin-auth';

export const runtime = 'nodejs';

const loginSchema = z.object({ password: z.string().min(1) });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  const isValid = await checkAdminPassword(parsed.data.password);
  if (!isValid) {
    // Small fixed delay to blunt naive brute-force attempts against a
    // single shared password.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return NextResponse.json({ error: 'invalid_password' }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}
