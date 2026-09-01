import { NextResponse } from "next/server";
import { deliverContactMessage, NotConfiguredError } from "@/lib/contact-delivery";

export const runtime = "nodejs";

/* ---------------- validation & sanitisation ---------------- */
const LIMITS = { name: 120, organisation: 160, email: 200, message: 4000, country: 80, interest: 60 } as const;

const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(CONTROL, "").replace(/\s+/g, " ").trim().slice(0, max);
}
function cleanMultiline(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(CONTROL, "").replace(/\r\n?/g, "\n").trim().slice(0, max);
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ---------------- rate limiting (per instance) ---------------- */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) return true;
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return false;
}

export async function POST(req: Request) {
  const ip =
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages from this connection. Please try again later." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Spam protection: honeypot + minimum time-to-submit
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }); // silently accept, never deliver
  }
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    return NextResponse.json({ ok: false, error: "Please take a moment and try again." }, { status: 400 });
  }

  const name = clean(body.name, LIMITS.name);
  const organisation = clean(body.organisation, LIMITS.organisation);
  const email = clean(body.email, LIMITS.email).toLowerCase();
  const message = cleanMultiline(body.message, LIMITS.message);
  const country = clean(body.country, LIMITS.country);
  const interest = clean(body.interest, LIMITS.interest);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (organisation.length < 2) errors.organisation = "Please enter your organisation.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid work email.";
  if (message.length < 12) errors.message = "Tell us a little more about what you are trying to build.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    await deliverContactMessage({
      name,
      organisation,
      email,
      message,
      country: country || undefined,
      interest: interest || undefined,
      receivedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof NotConfiguredError) {
      return NextResponse.json(
        { ok: false, error: "Contact submissions will be enabled at launch." },
        { status: 503 },
      );
    }
    console.error("[contact] delivery failed", err);
    return NextResponse.json(
      { ok: false, error: "We could not send your message. Please try again shortly." },
      { status: 502 },
    );
  }
}
