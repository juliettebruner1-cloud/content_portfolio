"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/types";
import { formatCompactNumber, formatFullDate } from "@/lib/utils";
import { WhyItWorked } from "./WhyItWorked";
import { track } from "@/lib/analytics";

export function VideoModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    track({ name: "video_opened", projectId: project.id });
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/90 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto border hairline bg-ink"
          >
            <div className="flex items-start justify-between border-b hairline px-6 py-4">
              <div>
                <p className="label text-taupe">
                  {project.platform} &middot; {formatFullDate(project.date)}
                </p>
                <h2 id="video-modal-title" className="mt-1 font-serif text-2xl text-ivory">
                  {project.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="label border hairline px-3 py-2 text-taupe hover:text-ivory"
                aria-label="Close"
              >
                Close
              </button>
            </div>

            <div className="space-y-8 px-6 py-6">
              <p className="text-sm leading-relaxed text-stone">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.categories.map((c) => (
                  <span key={c} className="label border hairline px-2 py-1 text-taupe">
                    {c}
                  </span>
                ))}
              </div>

              {Object.values(project.metrics).some(Boolean) && (
                <div className="grid grid-cols-3 gap-4 border-y hairline py-6 sm:grid-cols-5">
                  {project.metrics.views && <Stat label="Views" value={formatCompactNumber(project.metrics.views)} />}
                  {project.metrics.engagementRate && (
                    <Stat label="Engagement" value={`${project.metrics.engagementRate}%`} />
                  )}
                  {project.metrics.shares && <Stat label="Shares" value={formatCompactNumber(project.metrics.shares)} />}
                  {project.metrics.saves && <Stat label="Saves" value={formatCompactNumber(project.metrics.saves)} />}
                  {project.metrics.followersGained && (
                    <Stat label="Followers" value={`+${formatCompactNumber(project.metrics.followersGained)}`} />
                  )}
                </div>
              )}

              {project.audienceInsight && (
                <p className="font-serif text-lg italic leading-snug text-ivory text-balance">
                  &ldquo;{project.audienceInsight}&rdquo;
                </p>
              )}

              {project.whyItWorked && <WhyItWorked data={project.whyItWorked} />}

              <div className="flex flex-wrap gap-4 pt-2">
                {project.caseStudySlug && (
                  <Link
                    href={`/work/${project.caseStudySlug}`}
                    data-cursor="view"
                    className="label border hairline px-4 py-3 text-ivory hover:bg-ivory hover:text-ink"
                  >
                    View Full Case Study →
                  </Link>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label border hairline px-4 py-3 text-taupe hover:text-ivory"
                  >
                    View on {project.platform} →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-serif text-2xl text-ivory">{value}</p>
      <p className="label mt-1 text-taupe">{label}</p>
    </div>
  );
}
