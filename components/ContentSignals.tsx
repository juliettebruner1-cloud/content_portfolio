"use client";

import { useState } from "react";
import { Project } from "@/types";
import { getContentSignals } from "@/lib/scoring";
import { VideoModal } from "./VideoModal";

export function ContentSignals({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const signals = getContentSignals(projects);

  if (signals.length === 0) return null;

  return (
    <section>
      <p className="label mb-6 text-taupe">Content Signals</p>
      <div className="grid grid-cols-2 gap-px overflow-hidden border hairline sm:grid-cols-3">
        {signals.map((signal) => {
          const project = projects.find((p) => p.id === signal.projectId);
          if (!project) return null;
          return (
            <button
              key={signal.label}
              type="button"
              onClick={() => setSelected(project)}
              className="flex flex-col gap-3 border-b border-r hairline bg-ink p-5 text-left hover:bg-charcoal"
            >
              <span className="label text-taupe">{signal.label}</span>
              <span className="font-serif text-base text-ivory leading-snug">{project.title}</span>
            </button>
          );
        })}
      </div>
      <VideoModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
