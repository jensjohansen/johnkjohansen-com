import type { MetadataRoute } from "next";
import { getAllPostMeta } from "@/lib/blog";

const BASE = "https://johnkjohansen.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/services/fractional-cto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/cofounder-cto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/mvp-build`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/tech-transformation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly",
    priority: post.featured ? 0.85 : 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
