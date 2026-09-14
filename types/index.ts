/**
 * Central type definitions for the portfolio's data layer.
 * Every /data file is typed against these interfaces so content
 * can be edited without touching component code.
 */

export type VisitorIntent =
  | "brand"
  | "recruiter"
  | "creator"
  | "strategy"
  | "editorial"
  | "explore";

export const VISITOR_INTENTS: {
  value: VisitorIntent;
  label: string;
  description: string;
}[] = [
  { value: "brand", label: "Brand Partnership", description: "I want to collaborate or sponsor content" },
  { value: "recruiter", label: "Hiring / Marketing", description: "I'm evaluating her for a role or project" },
  { value: "creator", label: "Content Creation", description: "I want to see the work itself" },
  { value: "strategy", label: "Social Strategy", description: "I care about the thinking behind the work" },
  { value: "editorial", label: "Editorial / Writing", description: "I'm here for the writing" },
  { value: "explore", label: "Just Exploring", description: "Show me everything" },
];

export type Platform = "TikTok" | "Instagram" | "YouTube" | "Article" | "Other";

export type ContentType =
  | "short-form-video"
  | "reel"
  | "carousel"
  | "long-form-video"
  | "campaign"
  | "photo-story"
  | "article";

export type Category =
  | "Viral"
  | "Fashion"
  | "Beauty"
  | "Wellness"
  | "NYC"
  | "Lifestyle"
  | "Storytelling"
  | "Branded"
  | "Strategy"
  | "Editorial";

export type Industry =
  | "Fashion"
  | "Beauty"
  | "Wellness"
  | "Lifestyle"
  | "Hospitality"
  | "NYC / Events";

/** The "Why It Worked" breakdown — the site's signature analytical feature. */
export interface WhyItWorked {
  hook: string;
  insight: string;
  creative: string;
  distribution: string;
  takeaway: string;
}

export interface ProjectMetrics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  followersGained?: number;
  engagementRate?: number;
  completionRate?: number;
}

/**
 * A single piece of work — a video, campaign, or content package.
 * Scoring fields (brandScore..editorialScore) are 0-100 and drive the
 * deterministic relevance engine in lib/scoring.ts. Set them honestly;
 * they are the only "invented" numbers on the site and should reflect
 * how well a piece genuinely serves that audience, not a metric.
 */
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  platform: Platform;
  url?: string;
  embedUrl?: string;
  thumbnail?: string;
  date: string; // ISO date
  metrics: ProjectMetrics;
  contentType: ContentType;
  categories: Category[];
  skills: string[];
  industries: Industry[];
  brand?: string;
  campaign?: string;
  objective?: string;
  audienceInsight?: string;
  strategy?: string;
  execution?: string;
  results?: string;
  lessons?: string;
  whyItWorked?: WhyItWorked;
  featured: boolean;
  brandScore: number;
  recruiterScore: number;
  strategyScore: number;
  creatorScore: number;
  editorialScore: number;
  lastUpdated: string; // ISO date
  caseStudySlug?: string; // links to a full CaseStudy, if one exists
  /** True for seed/demo content shipped with the template. Shows a small
   * "sample" tag so it's never mistaken for a real result. Set to false
   * (or delete the field) once real content replaces it. */
  isPlaceholder?: boolean;
}

export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  projectId: string;
  title: string;
  subtitle: string;
  coverImage?: string;
  context: string;
  insight: string;
  idea: string;
  execution: string;
  contentDescription: string;
  performanceStats: { label: string; value: string }[];
  whyItWorked: WhyItWorked;
  whatILearned: string;
  industries: Industry[];
}

export interface ExperienceRole {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string; // omit for "present"
  owned: string[];
  impact: string[];
  skills: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: "Strategy" | "Creative" | "Analytics" | "Writing" | "Business";
  evidenceProjectIds: string[];
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  type: "partnership" | "collaboration" | "employer";
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company?: string;
}

export interface WritingPiece {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body?: string;
  publication: string;
  date: string;
  category: string;
  url?: string;
  featured: boolean;
  isPlaceholder?: boolean;
}

export interface PressFeature {
  id: string;
  type: "publication" | "article" | "appearance" | "event" | "podcast" | "feature";
  title: string;
  outlet: string;
  date: string;
  url?: string;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  detail?: string;
  visible: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CurrentlyItem {
  label: string;
  value: string;
}

/** A private, shareable opportunity link — e.g. /for/company-name. */
export interface PrivateOpportunityLink {
  slug: string;
  recipientName: string;
  intro: string;
  intent: VisitorIntent;
  industry?: Industry;
  projectIds?: string[]; // if set, shows only these; otherwise uses normal ranking
}
