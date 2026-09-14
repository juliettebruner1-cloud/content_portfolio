"use client";

import { useState } from "react";
import { Project } from "@/types";
import { formatCompactNumber } from "@/lib/utils";
import { track } from "@/lib/analytics";

export function CompareTool({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  const [aId, setAId] = useState<string>("");
  const [bId, setBId] = useState<string>("");

  const a = projects.find((p) => p.id === aId);
  const b = projects.find((p) => p.id === bId);

  const rows: { label: string; get: (p: Project) => string }[] = [
    { label: "Hook", get: (p) => p.whyItWorked?.hook ?? "—" },
    { label: "Format", get: (p) => p.contentType.replace(/-/g, " ") },
    { label: "Topic", get: (p) => p.categories.join(", ") },
    { label: "Views", get: (p) => (p.metrics.views ? formatCompactNumber(p.metrics.views) : "—") },
    {
      label: "Engagement",
      get: (p) => (p.metrics.engagementRate ? `${p.metrics.engagementRate}%` : "—"),
    },
    { label: "Objective", get: (p) => p.objective ?? "—" },
  ];

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="label text-taupe underline decoration-dotted underline-offset-4 hover:text-ivory"
      >
        Compare two pieces of work →
      </button>
    );
  }

  return (
    <div className="border hairline p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="label text-taupe">Compare My Work</p>
        <button type="button" onClick={() => setOpen(false)} className="label text-taupe hover:text-ivory">
          Close
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <select
          value={aId}
          onChange={(e) => {
            setAId(e.target.value);
            if (bId) track({ name: "compare_used", projectIds: [e.target.value, bId] });
          }}
          className="border hairline bg-ink px-3 py-2 text-sm text-ivory"
        >
          <option value="">Select first piece…</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
        <select
          value={bId}
          onChange={(e) => {
            setBId(e.target.value);
            if (aId) track({ name: "compare_used", projectIds: [aId, e.target.value] });
          }}
          className="border hairline bg-ink px-3 py-2 text-sm text-ivory"
        >
          <option value="">Select second piece…</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {a && b && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="label border-b hairline py-3 text-left text-taupe"> </th>
                <th className="label border-b hairline py-3 text-left text-ivory">{a.title}</th>
                <th className="label border-b hairline py-3 text-left text-ivory">{b.title}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="label border-b hairline py-3 pr-4 text-taupe">{row.label}</td>
                  <td className="border-b hairline py-3 pr-4 text-stone">{row.get(a)}</td>
                  <td className="border-b hairline py-3 text-stone">{row.get(b)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
