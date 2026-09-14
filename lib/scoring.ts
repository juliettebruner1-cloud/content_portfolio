import { Project, VisitorIntent, Industry } from "@/types";

/**
 * Deterministic relevance-ranking engine.
 *
 * relevance = intentWeight + industryWeight + featuredWeight
 *           + performanceWeight + recencyWeight
 *
 * Every weight is configurable below. Raw view count is intentionally
 * capped by a log curve and given a modest share of the total so a
 * strategically excellent 300K-view piece can still outrank a random
 * 3M-view piece for a recruiter or strategist — per the design brief,
 * views should never fully dominate relevance.
 */
export interface ScoringWeights {
  intent: number;
  industry: number;
  featured: number;
  performance: number;
  recency: number;
}

export const defaultWeights: ScoringWeights = {
  intent: 45,
  industry: 15,
  featured: 10,
  performance: 20,
  recency: 10,
};

const intentScoreKey: Record<Exclude<VisitorIntent, "explore">, keyof Project> = {
  brand: "brandScore",
  recruiter: "recruiterScore",
  strategy: "strategyScore",
  creator: "creatorScore",
  editorial: "editorialScore",
};

function intentComponent(project: Project, intent: VisitorIntent): number {
  if (intent === "explore") {
    const scores = [
      project.brandScore,
      project.recruiterScore,
      project.strategyScore,
      project.creatorScore,
      project.editorialScore,
    ];
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }
  const key = intentScoreKey[intent];
  return (project[key] as number) ?? 0;
}

function industryComponent(project: Project, industry?: Industry): number {
  if (!industry) return 50; // neutral when no industry filter is active
  return project.industries.includes(industry) ? 100 : 0;
}

function performanceComponent(project: Project, maxViews: number): number {
  const views = project.metrics.views ?? 0;
  if (maxViews <= 0 || views <= 0) return 0;
  // log scale so a single viral outlier can't flatten the rest of the curve
  return (Math.log10(views + 1) / Math.log10(maxViews + 1)) * 100;
}

function recencyComponent(project: Project, now: number): number {
  const ageMs = now - new Date(project.date).getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  const twoYears = 730;
  const clamped = Math.max(0, Math.min(twoYears, ageDays));
  return 100 - (clamped / twoYears) * 100;
}

export interface RankOptions {
  intent: VisitorIntent;
  industry?: Industry;
  weights?: Partial<ScoringWeights>;
}

export function scoreProject(
  project: Project,
  allProjects: Project[],
  options: RankOptions,
  now: number = Date.now()
): number {
  const w = { ...defaultWeights, ...options.weights };
  const maxViews = Math.max(1, ...allProjects.map((p) => p.metrics.views ?? 0));

  const intent = intentComponent(project, options.intent) / 100;
  const industry = industryComponent(project, options.industry) / 100;
  const featured = project.featured ? 1 : 0;
  const performance = performanceComponent(project, maxViews) / 100;
  const recency = recencyComponent(project, now) / 100;

  return (
    intent * w.intent +
    industry * w.industry +
    featured * w.featured +
    performance * w.performance +
    recency * w.recency
  );
}

export function rankProjects(
  allProjects: Project[],
  options: RankOptions,
  now: number = Date.now()
): Project[] {
  return [...allProjects].sort(
    (a, b) =>
      scoreProject(b, allProjects, options, now) - scoreProject(a, allProjects, options, now)
  );
}

/** CONTENT SIGNALS — pattern badges derived from supplied metadata only. */
export interface ContentSignal {
  label: string;
  projectId: string;
}

export function getContentSignals(projects: Project[]): ContentSignal[] {
  const signals: ContentSignal[] = [];

  const withMetric = (key: keyof NonNullable<Project["metrics"]>) =>
    projects.filter((p) => typeof p.metrics[key] === "number");

  const top = (key: keyof NonNullable<Project["metrics"]>, label: string) => {
    const pool = withMetric(key);
    if (pool.length === 0) return;
    const winner = pool.reduce((a, b) => ((b.metrics[key] as number) > (a.metrics[key] as number) ? b : a));
    signals.push({ label, projectId: winner.id });
  };

  top("shares", "Most Shared");
  top("saves", "Most Saved");
  top("followersGained", "Fastest Growth");
  top("completionRate", "Strongest Hook");

  const storytelling = projects
    .filter((p) => p.categories.includes("Storytelling"))
    .sort((a, b) => b.creatorScore + b.editorialScore - (a.creatorScore + a.editorialScore))[0];
  if (storytelling) signals.push({ label: "Best Storytelling", projectId: storytelling.id });

  const brandFit = [...projects].sort((a, b) => b.brandScore - a.brandScore)[0];
  if (brandFit) signals.push({ label: "Best Brand Fit", projectId: brandFit.id });

  return signals;
}

/** Simple metadata search across title, description, categories, skills, brand. */
export function searchProjects(projects: Project[], query: string): Project[] {
  const q = query.trim().toLowerCase();
  if (!q) return projects;
  return projects.filter((p) => {
    const haystack = [
      p.title,
      p.description,
      p.brand ?? "",
      p.campaign ?? "",
      ...p.categories,
      ...p.skills,
      ...p.industries,
      p.platform,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
