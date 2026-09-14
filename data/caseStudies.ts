import { CaseStudy } from "@/types";

/**
 * EDIT ME — full-length case studies for standout projects. Not every
 * project needs one; link a case study to a project via
 * `project.caseStudySlug` matching `caseStudy.slug`. Ships empty — add
 * an entry once you have a real project in data/content.ts worth
 * writing one up for.
 */
export const caseStudies: CaseStudy[] = [];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
