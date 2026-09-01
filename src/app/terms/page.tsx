import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for zorga.co.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms" updated="September 2026">
      <p>
        {site.legalLine}. Website: {site.domain}. By using this website you accept these terms.
      </p>

      <h2 className="t-h3 pt-4">Purpose of this website</h2>
      <p>
        zorga.co presents Zorga and a selection of platform concepts it has developed. The content is for general
        information. It is not professional advice, and nothing here is an offer. There is no guarantee that any
        concept described is available for licensing, partnership or execution. Content may change at any time.
      </p>

      <h2 className="t-h3 pt-4">Intellectual property</h2>
      <p>
        The content of this website, including the Zorga identity, copy and the platform concepts described, is the
        intellectual property of Zorga unless stated otherwise. Concepts presented as Zorga-originated were developed
        by Zorga. The status of each is stated on its entry. Browsing this website grants no licence to use any of it.
      </p>
      <p>
        Third-party names, logos and marks shown on this website belong to their respective owners. Nothing on this
        website implies endorsement by, or an official relationship with, any government, institution or organisation
        unless explicitly stated.
      </p>

      <h2 className="t-h3 pt-4">Acceptable use</h2>
      <p>
        Do not use this website, or its contact form, to send unlawful, abusive or automated bulk content, or to
        attempt to disrupt the site.
      </p>

      <h2 className="t-h3 pt-4">External links</h2>
      <p>Links to external websites are provided for convenience. Zorga is not responsible for their content.</p>

      <h2 className="t-h3 pt-4">Liability</h2>
      <p>
        The website is provided as is. To the extent permitted by law, Zorga accepts no liability for loss arising
        from use of, or reliance on, this website.
      </p>

      <h2 className="t-h3 pt-4">Governing law</h2>
      <p>These terms are governed by applicable laws relating to the operator of this website.</p>

      <h2 className="t-h3 pt-4">Changes and contact</h2>
      <p>
        These terms may be updated; the date above reflects the latest revision. Questions about them can be sent
        through the contact form on the home page.
      </p>
    </LegalShell>
  );
}
