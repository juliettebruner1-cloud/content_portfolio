"use client";

import { useState } from "react";
import { Project } from "@/types";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";

export function PortfolioGrid({
  projects,
  emptyMessage = "Nothing matches yet — try another filter.",
}: {
  projects: Project[];
  emptyMessage?: string;
}) {
  const [selected, setSelected] = useState<Project | null>(null);

  if (projects.length === 0) {
    return <p className="label py-16 text-center text-taupe">{emptyMessage}</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => (
          <VideoCard key={project.id} project={project} onOpen={setSelected} />
        ))}
      </div>
      <VideoModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
