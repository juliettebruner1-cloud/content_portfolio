import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form handler — currently a stub that validates and logs the
 * submission. To receive these for real, wire in an email provider
 * (Resend, Postmark, SendGrid) or forward to a CRM here. Needs an API
 * key set as an environment variable (see .env.example) — never commit
 * that key to the repo.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  console.info("[contact] submission received", {
    inquiry: body.inquiry,
    hasEmail: Boolean(body.email),
  });

  // TODO: send via your email provider once CONTACT_EMAIL_API_KEY is set.
  // if (process.env.CONTACT_EMAIL_API_KEY) { ... }

  return NextResponse.json({ ok: true });
}
