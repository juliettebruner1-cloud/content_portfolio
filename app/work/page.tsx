"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { projects } from "@/data/content";
import { allCategories } from "@/data/content";
import { rankProjects, searchProjects } from "@/lib/scoring";
import { useIntent } from "@/context/IntentContext";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { ContentFilter } from "@/components/ContentFilter";
import { SearchWork } from "@/components/SearchWork";
import { CompareTool } from "@/components/CompareTool";
import { VISITOR_INTENTS } from "@/types";

function WorkPageInner() {
  const { intent, industry, hasChosen, reset } = useIntent();
  const params = useSearchParams();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const label = VISITOR_INTENTS.find((i) => i.value === intent)?.label;
  const spotlightSlug = params.get("project");

  const filtered = useMemo(() => {
    let result = rankProjects(projects, {
      intent: intent ?? "explore",
      industry: industry ?? undefined,
    });
    if (category !== "All") {
      result = result.filter((p) => p.categories.includes(category as (typeof allCategories)[number]));
    }
    result = searchProjects(result, query);
    return result;
  }, [intent, industry, category, query]);

  useEffect(() => {
    if (spotlightSlug) {
      const el = document.getElementById(`project-${spotlightSlug}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [spotlightSlug]);

  return (
    <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
      <p className="label mb-3 text-taupe">The Work</p>
      <h1 className="font-serif text-display-2 text-ivory">Selected Work</h1>

      {hasChosen && (
        <div className="mt-6 flex flex-wrap items-center gap-4 border hairline px-5 py-4">
          <p className="label text-ivory">
            Curated for: {label?.toUpperCase()}
            {industry ? ` / ${industry.toUpperCase()}` : ""}
          </p>
          <button type="button" onClick={reset} className="label text-taupe underline hover:text-ivory">
            Reset View
          </button>
        </div>
      )}

      <div className="mt-10 space-y-6">
        <SearchWork value={query} onChange={setQuery} />
        <ContentFilter categories={allCategories} active={category} onChange={setCategory} />
      </div>

      <div className="mt-10">
        <PortfolioGrid projects={filtered} />
      </div>

      <div className="mt-16 border-t hairline pt-10">
        <CompareTool projects={projects} />
      </div>
    </div>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkPageInner />
    </Suspense>
  );
}
