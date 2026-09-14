import { PrivateOpportunityLink } from "@/types";

/**
 * EDIT ME — private, shareable opportunity links. Add an entry here and
 * the site serves it at /for/<slug> with a tailored intro and curated
 * project list, without needing a database. Ships empty.
 *
 * Example:
 * {
 *   slug: "acme-co",
 *   recipientName: "Acme Co.",
 *   intro: "A few pieces most relevant to what we discussed.",
 *   intent: "brand",
 *   industry: "Beauty",
 *   projectIds: ["p2", "p6"], // optional — omit to use normal ranking
 * }
 */
export const privateLinks: PrivateOpportunityLink[] = [];

export function getPrivateLinkBySlug(slug: string): PrivateOpportunityLink | undefined {
  return privateLinks.find((l) => l.slug === slug);
}
