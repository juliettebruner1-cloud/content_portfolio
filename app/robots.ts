import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://juliettebruner.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/for/", "/api/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
