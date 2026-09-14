import { Project } from "@/types";

/**
 * EDIT ME — this is the entire portfolio database. Every video, reel, and
 * campaign on the site is one object in this array. To add a new piece:
 *
 *   1. Copy the shape of the example below (or an existing object once
 *      you have more than one).
 *   2. Give it a unique `id` and `slug`.
 *   3. Paste the real TikTok/Instagram URL into `url` (and `embedUrl` if
 *      you have the platform's embed link).
 *   4. Fill in whatever metrics you actually have from that account —
 *      leave the rest out entirely rather than guessing.
 *   5. Set the four *Score fields honestly (0-100): how well does this
 *      piece serve a brand, a recruiter, a strategist, a fellow creator,
 *      or a reader? These numbers — not raw views — drive how content
 *      re-sorts itself for each visitor. See lib/scoring.ts.
 *
 * This array is intentionally EMPTY. Nothing appears on the site's
 * work pages until you add a real piece here — no sample or invented
 * content ships with this build. There is no way to auto-import videos
 * from TikTok or Instagram; each one is added by hand, one object at a
 * time, from your own account (https://www.tiktok.com/@juliettebruner
 * and https://www.instagram.com/juliettebruner).
 *
 * Example (delete the `isPlaceholder` line once this is a real video):
 *
 * {
 *   id: "p1",
 *   slug: "my-first-video",
 *   title: "Video Title",
 *   description: "One or two sentences about it.",
 *   platform: "TikTok",
 *   url: "https://www.tiktok.com/@juliettebruner/video/...",
 *   date: "2024-08-01",
 *   metrics: { views: 500000 },
 *   contentType: "short-form-video",
 *   categories: ["Beauty"],
 *   skills: ["Copywriting"],
 *   industries: ["Beauty"],
 *   featured: false,
 *   brandScore: 70, recruiterScore: 60, strategyScore: 65, creatorScore: 80, editorialScore: 30,
 *   lastUpdated: "2024-08-01",
 * }
 */
export const projects: Project[] = [];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const allCategories = [
  "Viral",
  "Fashion",
  "Beauty",
  "Wellness",
  "NYC",
  "Lifestyle",
  "Storytelling",
  "Branded",
  "Strategy",
  "Editorial",
] as const;
