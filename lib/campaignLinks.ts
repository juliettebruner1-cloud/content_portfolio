import { Industry, VisitorIntent } from "@/types";

/**
 * Maps clean, memorable URLs (/work/beauty, /work/nyc, /work/social-strategy)
 * to an industry or intent filter over the SAME portfolio database — no
 * content is duplicated per link. Add an alias here to mint a new
 * campaign-specific landing page instantly.
 */
export const INDUSTRY_SLUGS: Record<string, Industry> = {
  beauty: "Beauty",
  fashion: "Fashion",
  wellness: "Wellness",
  lifestyle: "Lifestyle",
  hospitality: "Hospitality",
  nyc: "NYC / Events",
  events: "NYC / Events",
};

export const INTENT_SLUGS: Record<string, VisitorIntent> = {
  "social-strategy": "strategy",
  strategy: "strategy",
  brand: "brand",
  recruiter: "recruiter",
  editorial: "editorial",
  creator: "creator",
};

export function resolveCampaignSlug(
  slug: string
): { type: "industry"; industry: Industry } | { type: "intent"; intent: VisitorIntent } | null {
  const lower = slug.toLowerCase();
  if (INDUSTRY_SLUGS[lower]) return { type: "industry", industry: INDUSTRY_SLUGS[lower] };
  if (INTENT_SLUGS[lower]) return { type: "intent", intent: INTENT_SLUGS[lower] };
  return null;
}
