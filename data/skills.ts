import { Skill } from "@/types";

/**
 * EDIT ME — the "show, don't tell" skills section. Each skill links to
 * the project ids (from content.ts) that prove it, so a recruiter can
 * click a competency and see the actual work behind it instead of a
 * progress bar. Keep `evidenceProjectIds` in sync as projects change.
 */
export const skills: Skill[] = [
  {
    id: "content-strategy",
    name: "Content Strategy",
    category: "Strategy",
    evidenceProjectIds: ["p1", "p2", "p4", "p6", "p7"],
  },
  {
    id: "copywriting",
    name: "Copywriting",
    category: "Writing",
    evidenceProjectIds: ["p1", "p4", "p6", "p9"],
  },
  {
    id: "audience-psychology",
    name: "Audience Psychology",
    category: "Strategy",
    evidenceProjectIds: ["p2", "p4", "p6"],
  },
  {
    id: "creative-direction",
    name: "Creative Direction",
    category: "Creative",
    evidenceProjectIds: ["p1", "p3", "p5", "p7"],
  },
  {
    id: "cultural-analysis",
    name: "Cultural / Trend Analysis",
    category: "Strategy",
    evidenceProjectIds: ["p4", "p6", "p9"],
  },
  {
    id: "brand-partnership",
    name: "Brand Partnership Development",
    category: "Business",
    evidenceProjectIds: ["p1", "p7", "p8"],
  },
  {
    id: "performance-reporting",
    name: "Performance Reporting",
    category: "Analytics",
    evidenceProjectIds: ["p8"],
  },
  {
    id: "editing",
    name: "Editing & Production",
    category: "Creative",
    evidenceProjectIds: ["p2", "p3", "p5"],
  },
];
