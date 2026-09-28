import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://shoplink365.com/", changeFrequency: "daily", priority: 1 },
    { url: "https://shoplink365.com/reviews", changeFrequency: "daily", priority: 0.8 },
    { url: "https://shoplink365.com/guides", changeFrequency: "weekly", priority: 0.7 },
    { url: "https://shoplink365.com/about", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://shoplink365.com/contact", changeFrequency: "yearly", priority: 0.3 },
  ];
}
