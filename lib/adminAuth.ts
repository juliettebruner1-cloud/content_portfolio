import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const TOKEN_PAYLOAD = "authenticated";

function getPassword(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

/** True once ADMIN_PASSWORD is set in the environment — the /admin page
 * shows a clear setup notice instead of a login form until it is. */
export function isAdminConfigured(): boolean {
  return Boolean(getPassword());
}

export function verifyPassword(candidate: string): boolean {
  const real = getPassword();
  if (!real) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(real);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** The cookie value is an HMAC keyed by the admin password, so it never
 * reveals the password itself and can't be forged without knowing it. */
export function createSessionToken(): string {
  const password = getPassword();
  if (!password) throw new Error("ADMIN_PASSWORD is not set");
  return createHmac("sha256", password).update(TOKEN_PAYLOAD).digest("hex");
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const password = getPassword();
  if (!password) return false;
  const expected = createSessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}
