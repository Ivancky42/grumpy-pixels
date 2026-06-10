import type { MetadataRoute } from "next";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/work`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...industries.map((industry) => ({
      url: `${site.url}/web-design/${industry.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
