import { WritingPiece } from "@/types";

/**
 * EDIT ME — the editorial/writing portfolio. `publication` should name
 * where a piece actually ran; use "Journal" for self-published essays.
 * Never attribute a piece to an outlet that didn't publish it. The two
 * essays below are sample content (`isPlaceholder: true`) self-published
 * under "Journal" — replace with real bylines and clips.
 */
export const writing: WritingPiece[] = [
  {
    id: "w1",
    slug: "on-algorithm-fatigue",
    title: "On Algorithm Fatigue",
    excerpt:
      "We didn't get tired of the algorithm. We got tired of watching ourselves get good at it.",
    body:
      "We didn't get tired of the algorithm. We got tired of watching ourselves get good at it — the small, private calculations that happen before you post anything: is this the right length, the right hour, the right amount of vulnerable. Somewhere in the last few years, the audience and the platform became the same audience, and we started making things for both at once, whether we meant to or not.\n\nThe interesting shift isn't that people are leaving. It's that the ones staying have started performing their own fatigue — the tired-of-content content, the 'I don't know why I'm posting this' caption — as if naming the exhaustion is its own kind of currency. Which, of course, it is.",
    publication: "Journal",
    date: "2024-06-01",
    category: "Culture",
    featured: true,
    isPlaceholder: true,
  },
  {
    id: "w2",
    slug: "the-trend-translation-problem",
    title: "The Trend Translation Problem",
    excerpt:
      "Most creators run out of ideas the moment a trend runs out of novelty. The ones who don't were never relying on the novelty in the first place.",
    body:
      "Most creators run out of ideas the moment a trend runs out of novelty. The ones who don't were never relying on the novelty in the first place — they were using the trend's shape to say something that had nothing to do with the trend.\n\nThis is a harder skill to teach than 'jump on trends early,' because it requires actually having a point of view before the trend arrives, and then waiting — sometimes past the point where it feels comfortable — for the right shape to say it in.",
    publication: "Journal",
    date: "2023-07-10",
    category: "Strategy",
    featured: false,
    isPlaceholder: true,
  },
];

export function getWritingBySlug(slug: string): WritingPiece | undefined {
  return writing.find((w) => w.slug === slug);
}
