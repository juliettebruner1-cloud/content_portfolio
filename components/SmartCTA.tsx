"use client";

import Link from "next/link";
import { useIntent } from "@/context/IntentContext";
import { VisitorIntent } from "@/types";

const CTA_MAP: Record<VisitorIntent, { label: string; href: string }> = {
  brand: { label: "Start a Partnership →", href: "/contact" },
  recruiter: { label: "View Résumé →", href: "/resume" },
  creator: { label: "See The Work →", href: "/work" },
  strategy: { label: "Explore Case Studies →", href: "/work" },
  editorial: { label: "Read Selected Work →", href: "/writing" },
  explore: { label: "See The Work →", href: "/work" },
};

export function SmartCTA({ className }: { className?: string }) {
  const { intent } = useIntent();
  const cta = CTA_MAP[intent ?? "explore"];

  return (
    <Link
      href={cta.href}
      data-cursor="nav"
      className={
        className ??
        "label inline-block border hairline bg-ivory px-8 py-4 text-ink hover:bg-stone"
      }
    >
      {cta.label}
    </Link>
  );
}
