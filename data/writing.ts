import { WritingPiece } from "@/types";

/**
 * EDIT ME — the editorial/writing portfolio. `publication` should name
 * where a piece actually ran; use "Journal" for self-published essays.
 * Never attribute a piece to an outlet that didn't publish it. Ships
 * empty — the Writing page shows a plain notice until a real piece is
 * added here.
 */
export const writing: WritingPiece[] = [];

export function getWritingBySlug(slug: string): WritingPiece | undefined {
  return writing.find((w) => w.slug === slug);
}
