import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://johnkjohansen.com/sitemap.xml",
    host: "https://johnkjohansen.com",
  };
}
