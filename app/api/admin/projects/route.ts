import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { addProject, deleteProject, getSubmittedProjects, StorageNotConnectedError, NewVideoInput } from "@/lib/projectStore";
import { allCategories } from "@/data/content";
import { fetchTikTokThumbnail } from "@/lib/oembed";

const PLATFORMS = ["TikTok", "Instagram", "YouTube", "Other"] as const;

function isValidInput(body: unknown): body is NewVideoInput {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  if (typeof b.url !== "string" || !b.url.trim()) return false;
  if (typeof b.title !== "string" || !b.title.trim()) return false;
  if (typeof b.platform !== "string" || !PLATFORMS.includes(b.platform as (typeof PLATFORMS)[number])) return false;
  if (!Array.isArray(b.categories) || b.categories.length === 0) return false;
  if (!b.categories.every((c) => (allCategories as readonly string[]).includes(c as string))) return false;
  if (typeof b.goodFor !== "object" || b.goodFor === null) return false;
  return true;
}

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projects = await getSubmittedProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!isValidInput(body)) {
    return NextResponse.json(
      { error: "Missing or invalid fields — a link, title, platform, and at least one category are required." },
      { status: 400 }
    );
  }

  try {
    const thumbnail =
      body.platform === "TikTok" ? (await fetchTikTokThumbnail(body.url)) ?? undefined : undefined;
    const project = await addProject({ ...body, thumbnail });
    return NextResponse.json({ project });
  } catch (err) {
    if (err instanceof StorageNotConnectedError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Something went wrong saving that." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  try {
    await deleteProject(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof StorageNotConnectedError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Something went wrong deleting that." }, { status: 500 });
  }
}
