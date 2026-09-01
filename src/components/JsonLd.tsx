import { site } from "@/lib/site";

/** Legitimate structured data only: Organization + WebSite. */
export function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: `${site.url}/logos/zorga-icon.svg`,
      description: site.description,
      email: "swaroop@zorga.co",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.url,
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
