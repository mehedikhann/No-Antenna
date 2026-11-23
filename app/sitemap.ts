import type { MetadataRoute } from "next";

const siteUrl = "https://www.noantenna.com";

// lastModified is set only where the date is known. Add new pages here when they are published.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/web-and-mobile-app-development` },
    { url: `${siteUrl}/blog` },
    { url: `${siteUrl}/blog/beyond-the-box-custom-software-business-automation`, lastModified: "2026-11-16" },
    { url: `${siteUrl}/privacy` },
    { url: `${siteUrl}/terms` },
  ];
}
