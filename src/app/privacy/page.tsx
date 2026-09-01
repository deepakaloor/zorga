import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How zorga.co handles personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy" updated="September 2026">
      <p>
        This website is operated by Zorga, United Arab Emirates (&ldquo;Zorga&rdquo;, &ldquo;we&rdquo;). It explains
        what information zorga.co collects and how it is used. We aim to handle personal information responsibly.
      </p>

      <h2 className="t-h3 pt-4">What we collect</h2>
      <p>
        If you send a message through the contact form, we receive the details you enter: your name, organisation,
        work email, country (if supplied) and your message. We do not ask for more than we need to respond.
      </p>
      <p>
        Our hosting infrastructure may record standard technical logs, such as IP address and browser type, for
        security, abuse prevention and rate limiting of the contact form.
      </p>

      <h2 className="t-h3 pt-4">How it is used</h2>
      <p>
        Contact details are used only to respond to your enquiry and to continue that conversation. They are not sold,
        rented or shared for marketing.
      </p>

      <h2 className="t-h3 pt-4">Service providers</h2>
      <p>
        The website is served through hosting and content-delivery providers, and contact messages are delivered to us
        by an email delivery provider. These providers process data on our behalf to operate the site and may do so in
        other countries.
      </p>

      <h2 className="t-h3 pt-4">Cookies and analytics</h2>
      <p>
        The site does not currently use non-essential tracking cookies and does not load third-party advertising or
        analytics trackers. If this changes, this policy will be updated first.
      </p>

      <h2 className="t-h3 pt-4">Retention</h2>
      <p>
        Contact messages are kept for as long as needed to handle the enquiry and any conversation that follows, then
        deleted.
      </p>

      <h2 className="t-h3 pt-4">Your choices</h2>
      <p>
        To ask what information we hold about you, or to have it corrected or deleted, use the contact form on the
        home page. We will respond to reasonable requests.
      </p>

      <h2 className="t-h3 pt-4">Changes</h2>
      <p>This policy may be updated as the website evolves. The date above reflects the latest revision.</p>
    </LegalShell>
  );
}
