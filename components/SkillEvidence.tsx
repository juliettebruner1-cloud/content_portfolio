"use client";

import { useState } from "react";
import Link from "next/link";
import { skills } from "@/data/skills";
import { projects } from "@/data/content";

export function SkillEvidence() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y hairline border-y hairline">
      {skills.map((skill) => {
        const evidence = projects.filter((p) => skill.evidenceProjectIds.includes(p.id));
        const isOpen = openId === skill.id;
        if (evidence.length === 0) return null;
        return (
          <div key={skill.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : skill.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="font-serif text-lg text-ivory sm:text-xl">{skill.name}</span>
              <span className="label text-taupe">
                {isOpen ? "Hide" : `See ${evidence.length} project${evidence.length > 1 ? "s" : ""}`}{" "}
                →
              </span>
            </button>
            {isOpen && (
              <ul className="grid gap-2 pb-6 sm:grid-cols-2">
                {evidence.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={p.caseStudySlug ? `/work/${p.caseStudySlug}` : `/work?project=${p.slug}`}
                      className="block border hairline px-4 py-3 text-sm text-stone hover:border-ivory hover:text-ivory"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
