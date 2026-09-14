import { MetadataRoute } from "next";
import { projects } from "@/data/content";
import { caseStudies } from "@/data/caseStudies";
import { writing } from "@/data/writing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://juliettebruner.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/about", "/writing", "/resume", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const caseStudyRoutes = caseStudies.map((c) => ({
    url: `${siteUrl}/work/${c.slug}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects
    .filter((p) => !caseStudies.some((c) => c.slug === p.slug))
    .map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      lastModified: new Date(p.lastUpdated),
    }));

  const writingRoutes = writing.map((w) => ({
    url: `${siteUrl}/writing/${w.slug}`,
    lastModified: new Date(w.date),
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...projectRoutes, ...writingRoutes];
}
