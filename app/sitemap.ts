import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

// Served at /sitemap.xml. Add new public pages here.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/portfolio", priority: 0.8 },
    { path: "/about", priority: 0.7 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
