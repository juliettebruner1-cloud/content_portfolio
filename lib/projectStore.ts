import { Redis } from "@upstash/redis";
import { Project, Category, Platform } from "@/types";
import { projects as staticProjects } from "@/data/content";

const STORE_KEY = "portfolio:submitted-projects";

/**
 * Accepts either Vercel's own "KV" env var names or the ones Upstash's
 * Vercel Marketplace integration uses — whichever pair actually shows
 * up once a database is connected in the Vercel Storage tab.
 */
function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/**
 * A tiny, file-based fallback so `npm run dev` and this admin flow work
 * out of the box on a laptop with no database connected yet. This file
 * is gitignored and NEVER used on Vercel (a real deploy without a
 * connected database instead surfaces a clear "storage not connected"
 * error — Vercel's filesystem is read-only/ephemeral in production, so
 * silently falling back there would look like it worked and then lose
 * every submission on the next deploy).
 */
import { promises as fs } from "fs";
import path from "path";

const LOCAL_STORE_PATH = path.join(process.cwd(), ".data", "submitted-projects.json");
const isVercel = Boolean(process.env.VERCEL);

async function readLocalStore(): Promise<Project[]> {
  try {
    const raw = await fs.readFile(LOCAL_STORE_PATH, "utf-8");
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

async function writeLocalStore(projects: Project[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_STORE_PATH), { recursive: true });
  await fs.writeFile(LOCAL_STORE_PATH, JSON.stringify(projects, null, 2), "utf-8");
}

export class StorageNotConnectedError extends Error {
  constructor() {
    super(
      "No database is connected yet. In your Vercel project, go to the Storage tab, create a Redis database, and connect it to this project — see the README."
    );
    this.name = "StorageNotConnectedError";
  }
}

async function readSubmitted(): Promise<Project[]> {
  const redis = getRedisClient();
  if (redis) {
    const stored = await redis.get<Project[]>(STORE_KEY);
    return stored ?? [];
  }
  if (!isVercel) return readLocalStore();
  return [];
}

async function writeSubmitted(projects: Project[]): Promise<void> {
  const redis = getRedisClient();
  if (redis) {
    await redis.set(STORE_KEY, projects);
    return;
  }
  if (!isVercel) {
    await writeLocalStore(projects);
    return;
  }
  throw new StorageNotConnectedError();
}

/** Every project on the site: what's submitted through /admin, newest first, then the static sample/seed list (empty by default). */
export async function getAllProjects(): Promise<Project[]> {
  const submitted = await readSubmitted();
  return [...submitted, ...staticProjects];
}

export interface NewVideoInput {
  url: string;
  title: string;
  description?: string;
  platform: Platform;
  categories: Category[];
  brand?: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  featured?: boolean;
  goodFor: {
    brand: boolean;
    recruiter: boolean;
    creator: boolean;
    strategy: boolean;
    editorial: boolean;
  };
}

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "video"}-${Math.random().toString(36).slice(2, 6)}`;
}

function scoreFor(checked: boolean): number {
  return checked ? 80 : 45;
}

export function buildProject(input: NewVideoInput): Project {
  const now = new Date().toISOString().slice(0, 10);
  return {
    id: `u-${Date.now()}`,
    slug: slugify(input.title),
    title: input.title,
    description: input.description?.trim() || input.title,
    platform: input.platform,
    url: input.url,
    date: now,
    metrics: {
      views: input.views,
      likes: input.likes,
      comments: input.comments,
      shares: input.shares,
    },
    contentType: input.platform === "YouTube" ? "long-form-video" : "short-form-video",
    categories: input.categories,
    skills: [],
    industries: [],
    brand: input.brand?.trim() || undefined,
    featured: Boolean(input.featured),
    brandScore: scoreFor(input.goodFor.brand),
    recruiterScore: scoreFor(input.goodFor.recruiter),
    strategyScore: scoreFor(input.goodFor.strategy),
    creatorScore: scoreFor(input.goodFor.creator),
    editorialScore: scoreFor(input.goodFor.editorial),
    lastUpdated: now,
  };
}

export async function addProject(input: NewVideoInput): Promise<Project> {
  const project = buildProject(input);
  const current = await readSubmitted();
  await writeSubmitted([project, ...current]);
  return project;
}

export async function deleteProject(id: string): Promise<void> {
  const current = await readSubmitted();
  await writeSubmitted(current.filter((p) => p.id !== id));
}

export async function getSubmittedProjects(): Promise<Project[]> {
  return readSubmitted();
}
