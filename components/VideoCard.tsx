"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";
import { formatCompactNumber, formatDate } from "@/lib/utils";

function PlatformGlyph({ platform }: { platform: Project["platform"] }) {
  return <span className="label text-taupe">{platform}</span>;
}

/** Typographic poster used when no real thumbnail exists yet — keeps the
 * grid visually resolved without ever faking a photo. */
function PosterFallback({ project, badge }: { project: Project; badge?: string }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-charcoal p-5">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(244,241,235,0.08), transparent 60%), radial-gradient(circle at 80% 70%, rgba(167,161,154,0.1), transparent 55%)",
        }}
      />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PlatformGlyph platform={project.platform} />
          {badge && (
            <span className="label border hairline px-2 py-0.5 text-taupe">{badge}</span>
          )}
        </div>
        <span className="text-taupe">✦</span>
      </div>
      <p className="relative font-serif text-xl leading-tight text-ivory sm:text-2xl">
        {project.title}
      </p>
    </div>
  );
}

export function VideoCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const badge = project.isPlaceholder ? "Sample" : project.featured ? "Featured" : undefined;

  return (
    <motion.button
      type="button"
      data-cursor="play"
      onClick={() => onOpen(project)}
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col text-left"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden border hairline">
        {project.thumbnail ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.thumbnail}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "inset 0 0 70px 18px rgba(0,0,0,0.4)" }}
            />
            {badge && (
              <span className="label absolute left-3 top-3 border hairline bg-black/70 px-2 py-1 text-ivory">
                {badge}
              </span>
            )}
          </>
        ) : (
          <PosterFallback project={project} badge={badge} />
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-base text-ivory leading-snug">{project.title}</h3>
          <p className="label mt-1 text-taupe">
            {project.categories.slice(0, 2).join(" / ")}
          </p>
        </div>
        {project.metrics.views && (
          <span className="whitespace-nowrap text-sm text-stone">
            {formatCompactNumber(project.metrics.views)} views
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-taupe">{formatDate(project.date)}</p>
    </motion.button>
  );
}
