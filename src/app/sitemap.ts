import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { conceptPageIds } from "@/data/concepts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...conceptPageIds.map((id) => ({
      url: `${site.url}/concepts/${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
