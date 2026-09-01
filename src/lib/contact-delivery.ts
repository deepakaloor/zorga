/**
 * Contact delivery integration point.
 *
 * Isolated on purpose: the UI and validation never depend on a provider.
 * Configure ONE of the following in the environment:
 *
 *   RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL)
 *   CONTACT_WEBHOOK_URL   — any HTTPS endpoint that accepts JSON POST
 *
 * If nothing is configured, delivery throws NotConfiguredError and the API
 * reports that honestly instead of pretending the message was sent.
 */
export interface ContactMessage {
  name: string;
  organisation: string;
  email: string;
  message: string;
  country?: string;
  interest?: string;
  receivedAt: string;
}

export class NotConfiguredError extends Error {
  constructor() {
    super("Contact delivery is not configured");
    this.name = "NotConfiguredError";
  }
}

export function isDeliveryConfigured() {
  return Boolean(
    (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) || process.env.CONTACT_WEBHOOK_URL,
  );
}

export async function deliverContactMessage(m: ContactMessage): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (resendKey && to) {
    const from = process.env.CONTACT_FROM_EMAIL ?? "Zorga Website <onboarding@resend.dev>";
    const text = [
      `Name: ${m.name}`,
      `Organisation: ${m.organisation}`,
      `Work email: ${m.email}`,
      m.country ? `Country: ${m.country}` : null,
      m.interest ? `Engagement interest: ${m.interest}` : null,
      "",
      "What are you trying to build?",
      m.message,
      "",
      `Received: ${m.receivedAt}`,
      "Source: https://zorga.co",
    ]
      .filter((l) => l !== null)
      .join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: m.email,
        subject: `New Zorga website enquiry — ${m.organisation || m.name}`,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return;
  }

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "zorga.co", ...m }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return;
  }

  throw new NotConfiguredError();
}
