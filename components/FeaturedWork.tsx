"use client";

import Link from "next/link";
import { projects } from "@/data/content";
import { rankProjects } from "@/lib/scoring";
import { useIntent } from "@/context/IntentContext";
import { PortfolioGrid } from "./PortfolioGrid";
import { VISITOR_INTENTS } from "@/types";

export function FeaturedWork() {
  const { intent, industry } = useIntent();
  const ranked = rankProjects(projects, {
    intent: intent ?? "explore",
    industry: industry ?? undefined,
  }).slice(0, 4);

  const label = VISITOR_INTENTS.find((i) => i.value === intent)?.label;

  return (
    <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          {label && (
            <p className="label mb-2 text-taupe">
              Curated for: {label.toUpperCase()}
              {industry ? ` / ${industry.toUpperCase()}` : ""}
            </p>
          )}
          <h2 className="font-serif text-display-2 text-ivory">Selected Work</h2>
        </div>
        <Link href="/work" data-cursor="nav" className="label border hairline px-5 py-3 text-taupe hover:text-ivory">
          View All Work →
        </Link>
      </div>

      <PortfolioGrid
        projects={ranked}
        emptyMessage={
          projects.length === 0
            ? "New work is on the way — check back soon."
            : undefined
        }
      />
    </section>
  );
}
